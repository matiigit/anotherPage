/* SET MY HTML */
$(document).ready(function () {
    var tablero = document.getElementById("tablero");
    var texto = '';

    for (var i = 0; i < 9; i++) {
        var index = 0;
        texto += '<div class="square' + i + '">';
        for (var j = 0; j < 9; j++) {
            texto += '<input class="cell' + index + '"' + 'type="number"></input>';
            index++;
        }
        texto += '</div>';
        tablero.innerHTML = texto;
    }

    $("#validate").hide();
    $(".difficult").hide();

    setMatrix();
})

/* SET MY MATRIX TABLE */
var table = [];
function setMatrix () {
    var row = [[],[],[],[],[],[],[],[],[]];
    var square = [];

    for (var i = 0; i < 9; i++) {
        var text = '#tablero > .square' + i + ' *';
        square.push($(text));
    }

    for (var j = 0; j <= 6; j = j+3) {
        for (var i = 0; i < 3; i++) {
            row[j].push(square[j][i]);
            row[j+1].push(square[j][i+3]);
            row[j+2].push(square[j][i+6])
            
        }

        for (var i = 0; i < 3; i++) {
            row[j].push(square[j+1][i]);
            row[j+1].push(square[j+1][i+3]);
            row[j+2].push(square[j+1][i+6]);

        }

        for (var i = 0; i < 3; i++) {
            row[j].push(square[j+2][i]);
            row[j+1].push(square[j+2][i+3]);
            row[j+2].push(square[j+2][i+6]);
        }
    }

    for (var i = 0; i < 9; i++) {
        table.push(row[i]);
    }
}

/* VALIDATE FUNCTION */
function validate (num, pos) {
    // CHECK ROW 
    for (var i = 0; i < table[0].length; i++) {
        if (table[pos[0]][i].value == num && i != pos[1]) {
            return false;    
        }
    }

    // CHECK COLUMN
    for (var i = 0; i < table[0].length; i++) {
        if (table[i][pos[1]].value == num && i != pos[0]) {
            return false;
        }
    }

    // CHECK BOX
    box_x = Math.trunc(pos[1] / 3) * 3;
    box_y = Math.trunc(pos[0] / 3) * 3;
    
    for (var i = box_y; i < (box_y + 3); i++) {
        for (var j = box_x; j < (box_x + 3); j++) {
            if (table[i][j].value == num && i != pos[0] && j != pos[1]) {
                return false
            }
        }
    }

    return true
}

/* PUT NUMBERS IN TABLE */
function getRandom (min, max) {
    return parseInt(Math.random() * (max - min) + min)
}

function drawNumbers (cant) {
    var start = Math.trunc(getRandom(0, 9) / 3) * 3
    var copy = []
    var random = getRandom(1, 3)

    // Por fila
    for (var i = 0; i < table[0].length; i++) {
        copy.push(table[start][i].value) // Guardo los valores de fila inicio
        table[start][i].value = table[start + random][i].value    // Cambio los valores de mi fila final con los de inicio 
        table[start + random][i].value = copy[i] // Pongo los valores de mi fila inicio en la fila final
    }

    copy = []
    // Por columna
    for (var i = 0; i < table[0].length; i++) {
        copy.push(table[i][start].value)
        table[i][start].value = table[i][start + random].value
        table[i][start + random].value = copy[i]
    }
}

function clearTable () {
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[0].length; j++) {
            table[i][j].value = ""
            table[i][j].disabled = true
            table[i][j].style.color = "red"
        }
    }
}

/* SET MY GAME */
$("#newGame").click(function () {
    $("#newGame").hide();
    $("#validate").hide();
    $("#validate").html("VALIDAR");
    $(".difficult").show();
    clearTable()
})

$(".difficult").click(function () {
    solve()
    var cant = 0;

    if (this.textContent === "EASY" ) {
        cant = 36;
    } else if (this.textContent === "MEDIUM") {
        cant = 49;
    } else  if (this.textContent === "DARK SOULS") {
        cant = 61; 
    } else {
        cant = 63;
    }
    
    for (var i = 0; i < 5; i++) {
        drawNumbers()
    }

    while (cant >= 0) {
        var x = getRandom(0,9)
        var y = getRandom(0,9)

        if (table[x][y].value !== "") {
            table[x][y].value = ""
            table[x][y].disabled = false
            table[x][y].style.color = "blue"
            cant--
        }
    }
    
    $(".difficult").hide();
    $("#validate").show();
    $("#newGame").show();
})

$("#validate").click(function () {
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[0].length; j++) {
            if (!validate(table[i][j].value, [i,j])) {
                $("#validate").html("PERDISTE CRACK")
                return
            }
        }
    }
    $("#validate").html("GANASTE")
})


/*
    SUDOKU BACKTRACKING
*/

function findEmpty () {
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[0].length; j++) {
            if (table[i][j].value == "") {
                return [i,j]
            }
        }
    }
    return false
}

function solve () {
    var terna = findEmpty()

    if (!terna) {
        return true
    
    } else {
        for (var i = 1; i < 10; i++) {

            if (validate(i, terna)) {
                table[terna[0]][terna[1]].value = i

                if (solve()) {
                    return true
                }

                table[terna[0]][terna[1]].value = ""
            }
        }
    }

    return false
}
