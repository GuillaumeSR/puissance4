let w = 'w';
let r = 'r';
let y = 'y';
let g = 'g';
let b = 'b';

let red = r;
let yellow = y;
let green = g;
let blue = b;

let player1 = red;
let player2 = yellow;

let turn = player2;

let h;
let l;

let map = [];

let rows = 6;
document.getElementById('rows').value = rows;
let columns = 7;
document.getElementById('columns').value = columns;

let win = false;
let draw = false;

let timer;
let minutes = 0;
let seconds = 0;

function initializeMap() {
    map = [];
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
            case g:
                html+="<td>";
                html+="<div class='box green' onclick='play(this)' row=" + i + " col=" + j + "></div>";
                html+="</td>";
                break;
            case b:
                html+="<td>";
                html+="<div class='box blue' onclick='play(this)' row=" + i + " col=" + j + "></div>";
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
    // askColors();
    // askTurn();
    win = false;
    draw = false;
}

function startGame() {
    win = false;
    draw = false;
    boardSize();
    initializeMap();
    showMap();
    startChronometer();
}

function boardSize() {
    rowsTest = document.getElementById('rows').value;
    columnsTest = document.getElementById('columns').value;
    if (rowsTest !== '') {
        rows = document.getElementById('rows').value;
    }
    if (columnsTest !== '') {
        columns = document.getElementById('columns').value;
    }
}

function resetBoard() {
    document.getElementById('rows').value = 6;
    document.getElementById('columns').value = 7;
    win = false;
    draw = false;
    boardSize();
    initializeMap();
    showMap();
    resetChronometer();
}

function nextTurn() {
    if (turn == player1) {
        turn = player2
    } else {
        turn = player1
    }
}

function checkCol(x) {
    for (i=map.length-1;i>=0;i--) {
        if (map[i][x] == w) {
            map[i][x] = turn;
            showMap();
            checkRowWin();
            checkColWin();
            checkDiagWin();
            checkWin();
            checkForDraw();
            checkDraw();
            nextTurn();
            break;
        }
    }
}

function play(test) {
    let x = test.getAttribute('col');
    let y = test.getAttribute('row');
    checkCol(x);
}

function askColors() {
    player1 = prompt("What color do you want between red, yellow, green and blue ?")
    player2 = prompt("What color do you want between red, yellow, green and blue ?")
    while (player1 == player2) {
        player2 = prompt("Please choose another color between red, yellow, green and blue ?")
    }
}

function askTurn() {
    turn = prompt("Which player will begin the game ? player1 or player2 ?")
    console.log(turn)
}

function checkWin() {
    if (win == true) {
        if (turn == player1) {
            stopChronometer();
            alert("Well played ! Player 1 as won !")
        } else {
            stopChronometer();
            alert("Well played ! Player 2 as won !")
        }
    }
}

function checkForDraw() {
    for (let c = 0; c < map[0].length; c++) {
        if (map[0][c] === w) {
            return;
        }
    }
    draw = true;
}

function checkDraw() {
    if (win == true) {
        return;
    } else {
        if (draw == true) {
            stopChronometer();
            alert("Well played all but no winner this time !")
        }
    }
    
}

function checkRowWin() {
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length - 3; c++) {
            if (map[r][c] !== w && map[r][c] === map[r][c + 1] && map[r][c] === map[r][c + 2] && map[r][c] === map[r][c + 3]) {
                win = true;
            }
        }
    }
}

function checkColWin() {
    for (let r = 0; r < map.length - 3; r++) {
        for (let c = 0; c < map[0].length; c++) {
            if (map[r][c] !== w && map[r][c] === map[r + 1][c] && map[r][c] === map[r + 2][c] && map[r][c] === map[r + 3][c]) {
                win = true;
            }
        }
    }
}

function checkDiagWin() {
    for (let r = 3; r < map.length; r++) {
        for (let c = 0; c < map[0].length - 3; c++) {
            if (map[r][c] !== w && map[r][c] === map[r - 1][c + 1] && map[r][c] === map[r - 2][c + 2] && map[r][c] === map[r - 3][c + 3]) {
                win = true;
            }
        }
    }
    for (let r = 0; r < map.length - 3; r++) {
        for (let c = 0; c < map[0].length - 3; c++) {
            if (map[r][c] !== w && map[r][c] === map[r + 1][c + 1] && map[r][c] === map[r + 2][c + 2] && map[r][c] === map[r + 3][c + 3]) {
                win = true;
            }
        }
    }
}

function startChronometer() {
    console.log('jyfu');
    timer = setInterval(function() {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        displayTime();
    }, 1000);
}

function stopChronometer() {
    clearInterval(timer);
}

function resetChronometer() {
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
    displayTime();
}

function displayTime() {
    const timerDisplay = document.getElementById('timer');
    let time = minutes + ":" + seconds;
    timerDisplay.textContent = time;
}

sessionStart()

// function checkRowWin() {
//     for (j=0;j<map[0].length;j++) {
//         let rp1 = 0;
//         let rp2 = 0;
//         for (i=map.length-1;i>=0;i--) {
//             if (map[i][j] != w) {
//                 if (map[i][j] == player1) {
//                     rp1 += 1;
//                     rp2 = 0;
//                     if (rp1 == 4) {
//                         win = true;
//                         break;
//                     }
//                 } else if (map[i][j] == player2) {
//                     rp2 += 1;
//                     rp1 = 0;
//                     if (rp2 == 4) {
//                         win = true;
//                         break;
//                     }
//                 }
//             } else {
//                 rp1 = 0;
//                 rp2 = 0;
//             }
//         }
//     }
// }

// function checkColWin() {
//     for (j=0;j<map[0].length;j++) {
//         let cp1 = 0;
//         let cp2 = 0;
//         for (i=map.length-1;i>=0;i--) {
//             if (map[i][j] != w) {
//                 if (map[i][j] == player1) {
//                     cp1 += 1;
//                     cp2 = 0;
//                     if (cp1 == 4) {
//                         win = true;
//                         break;
//                     }
//                 } else if (map[i][j] == player2) {
//                     cp2 += 1;
//                     cp1 = 0;
//                     if (cp2 == 4) {
//                         win = true;
//                         break;
//                     }
//                 }
//             } else {
//                 cp1 = 0;
//                 cp2 = 0;
//             }
//         }
//     }
// }

// function checkDiagWinTest() {
//     for (z=0;z<8;z++) {
//         console.log(z)
//         let dp1 = 0;
//         let dp2 = 0;
//         let j = map[0].length;
//         let i = 0;
//         for (m=0;m<map.length-z;m++) {
//             if (map[i][j] != w) {
//                 if (map[i][j] == player1) {
//                     dp1 += 1;
//                     dp2 = 0;
//                     console.log(dp1);
//                     if (dp1 == 4) {
//                         win = true;
//                         break;
//                     }
//                 } else if (map[i][j] == player2) {
//                     dp2 += 1;
//                     dp1 = 0;
//                     console.log(dp2);
//                     if (dp2 == 4) {
//                         win = true;
//                         break;
//                     }
//                 }
//             } else {
//                 j -= 1;
//                 i += 1;
//             }
//         }
//     for (z=1;z<map[0].length;z++) {
//         let dp1 = 0;
//         let dp2 = 0;
//         let j = map[0].length;
//         let i = 0;
//     }
//     }
// }