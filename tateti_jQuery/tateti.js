var turn = true;
var scoreX = 1;
var scoreY = 1;
var scoreDraw = 1;
var draw = 0;


function setTable () {
    table = $(".tateti > button")

    for (var i = 0; i < table.length; i++) {
        table[i].style.color = "transparent";
        table[i].textContent = i;
        table[i].disabled = false;
    }
}

$(document).ready(function(){
    setTable()
})

function putEntry (object) {
    if (turn) {
        object.innerHTML = "X";
        object.style.color = "grey";
        turn = false;
    } else {
        object.innerHTML = "O";
        object.style.color = "#0892d0";
        turn = true;
    }

    object.disabled = true;
} 

function whoWin (object) {
    return (object[0].textContent === object[1].textContent && object[0].textContent === object[2].textContent) ? true
        : (object[0].textContent === object[3].textContent && object[0].textContent === object[6].textContent) ? true
        : (object[0].textContent === object[4].textContent && object[0].textContent === object[8].textContent) ? true
        : (object[2].textContent === object[5].textContent && object[2].textContent === object[8].textContent) ? true
        : (object[2].textContent === object[4].textContent && object[2].textContent === object[6].textContent) ? true
        : (object[4].textContent === object[3].textContent && object[4].textContent === object[5].textContent) ? true
        : (object[4].textContent === object[1].textContent && object[4].textContent === object[7].textContent) ? true
        : (object[6].textContent === object[7].textContent && object[6].textContent === object[8].textContent) ? true
        : false;
}

function setScore (object) {
    if (object === "X") {
        $(".score > #scoreX").text(scoreX);
        scoreX++;
    } else if (object === "O") {
        $(".score > #scoreY").text(scoreY);
        scoreY++;
    } else {
        $(".score > #scoreDraw").text(scoreDraw);
        scoreDraw++;
    }
}

$(".tateti > button").click(function() {
    putEntry(this);
    draw++;

    if ( whoWin($(".tateti > button")) ) {
        setScore(this.textContent);
        alert("WINNER " + this.textContent);
    } else if (draw == 9) {
        setScore("Y");
        alert("EMPATE");
    }
})

$(".controls > #newGame").click(function() {
    setTable();
    turn = true;
    scoreX = 1;
    scoreY = 1;
    scoreDraw = 1;
    draw = 0;

    $(".score > #scoreX").text(0);
    $(".score > #scoreY").text(0);
    $(".score > #scoreDraw").text(0);
})

$(".controls > #reset").click(function() {
    setTable();
    draw = 0;

    if (turn) {
        turn = false;
    } else {
        turn = true;
    }
    
    alert("Comienza el ultimo jugador.")
})