let w = 'w';
let r = 'r';
let y = 'y';

let player1 = r;
let player2 = y;

let turn = player1;

let h;
let l;

let map = [];

let rows = 9;
let columns = 9;

function initializeMap() {
    for(i=0;i<rows;i++) {
        map[i] = [];
        for(j=0;j<columns;j++) {
            map[i][j] = w;
        }
    }
}

function showMap() {
    let elementMap = document.querySelector("#map");

    let html = "<table border=0 cellspacing=0 cellpadding=0'>";
 
 
    for(i=0;i<map.length;i++)
    {
    html+="<tr>";
        for(j=0;j<map[0].length;j++)
        {
        switch(map[i][j]) {
            case w:
                html+="<td>";
                html+="<div class='box' onclick='play(this)' row=" + i + " col=" + j + "></div>";
                html+="</td>";
                break;
            case r:
                html+="<td>";
                html+="<div class='box red' onclick='play(this)' row=" + i + " col=" + j + "></div>";
                html+="</td>";
                break;
            case y:
                html+="<td>";
                html+="<div class='box yellow' onclick='play(this)' row=" + i + " col=" + j + "></div>";
                html+="</td>";
                break;
            }
        }
    html+="</tr>";
    }  
     
    html+="</table>";
    elementMap.innerHTML = html;
}

function sessionStart() {
    initializeMap();
    showMap();
}

function checkTurn() {
    if (!turn) {
        askColors()
        askTurn()
    } else {
        if (turn == player1) {
            turn = player2
        } else {
            turn = player1
        }
    }
}

function checkCol(x) {
    for (i=map.length-1;i>=0;i--) {
        if (map[i][x] == w) {
            map[i][x] = turn;
            break;
        }
    }
}

function play(test) {
    let x = test.getAttribute('col');
    let y = test.getAttribute('row');
    checkCol(x);
    showMap();
    checkTurn();
}