const menu = document.querySelector(".menu");
const game = document.querySelector(".game");
const nameInput = document.querySelector("#name-input");
let score = 0;

document.getElementById("play").addEventListener("click", play);

function play() {
    if (nameInput.value.trim() === "") {
        alert("Please enter your name to play!");
        return;
    }
    menu.style.display = "none";
    game.style.display = "flex";

    add2ToBoard();
    add2ToBoard();

    document.getElementById("name").textContent = nameInput.value;

    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase(); // Convert to lowercase to handle WASD easily
        if (key === 'arrowup' || key === 'w') {
            console.log('Moving Up');
            moveUp();
            mergeUp();
            document.getElementById("score").textContent = "Score: " + score;
            add2ToBoard();
        } else if (key === 'arrowdown' || key === 's') {
            console.log('Moving Down');
            moveDown();
            mergeDown();
            document.getElementById("score").textContent = "Score: " + score;
            add2ToBoard();
        } else if (key === 'arrowleft' || key === 'a') {
            console.log('Moving Left');
            moveLeft();
            mergeLeft();
            document.getElementById("score").textContent = "Score: " + score;
            add2ToBoard();
        } else if (key === 'arrowright' || key === 'd') {
            console.log('Moving Right');
            moveRight();
            mergeRight();
            document.getElementById("score").textContent = "Score: " + score;
            add2ToBoard();
        }

        if (checkWin()) {
            document.getElementById("score").textContent = "You Win! Final Score: " + score;
            alert("Congratulations! You've won the game with a score of " + score + "!");
            location.reload(); // Reload the page to restart the game
        }

    });
}

// game

const board = [
    [document.getElementById("btn1"), document.getElementById("btn2"), document.getElementById("btn3"), document.getElementById("btn4")],
    [document.getElementById("btn5"), document.getElementById("btn6"), document.getElementById("btn7"), document.getElementById("btn8")],
    [document.getElementById("btn9"), document.getElementById("btn10"), document.getElementById("btn11"), document.getElementById("btn12")],
    [document.getElementById("btn13"), document.getElementById("btn14"), document.getElementById("btn15"), document.getElementById("btn16")]
  ];

function add2ToBoard() {  
    let randomRow = Math.floor(Math.random() * 4);
    let randomCol = Math.floor(Math.random() * 4);

    if (board[randomRow][randomCol].textContent === "") {
        board[randomRow][randomCol].textContent = "2";
    } else {
        add2ToBoard();
    }
   
}

function moveLeft() {
    for (let r = 0; r < board.length; r++) {
        for (let i = 0; i < board.length; i++) {
            for (let c = 1; c < board[0].length; c++) {
                if (board[r][c - 1].textContent === "") {
                    board[r][c - 1].textContent = board[r][c].textContent;
                    board[r][c].textContent = "";
                    board[r][c - 1].style.backgroundColor = "black";
                }
                board[r][c - 1].style.backgroundColor = "white";
            }
        }
    }
}

function moveRight() {
    for (let r = 0; r < board.length; r++) {
        for (let i = 0; i < board.length; i++) {
            for (let c = 0; c < board[0].length - 1; c++) {
                if (board[r][c + 1].textContent === "") {
                    board[r][c + 1].textContent = board[r][c].textContent;
                    board[r][c].textContent = "";
                }
            }
        }
    }
}

function moveUp() {
    for (let c = 0; c < board[0].length; c++) {
        for (let i = 0; i < board.length; i++) {
            for (let r = 1; r < board.length; r++) {
                if (board[r - 1][c].textContent === "") {
                    board[r - 1][c].textContent = board[r][c].textContent;
                    board[r][c].textContent = "";
                }
            }
        }
    }
}

function moveDown() {
    for (let c = 0; c < board[0].length; c++) {
        for (let i = 0; i < board.length; i++) {
            for (let r = 0; r < board.length - 1; r++) {
                if (board[r + 1][c].textContent === "") {
                    board[r + 1][c].textContent = board[r][c].textContent;
                    board[r][c].textContent = "";
                }
            }
        }
    }
}

function mergeLeft() {
    for (let r = 0; r < board.length; r++) {
        for (let c = 1; c < board[0].length; c++) {
            if (board[r][c].textContent === board[r][c - 1].textContent && board[r][c].textContent !== "") {
                let mergedValue = parseInt(board[r][c].textContent) * 2;
                score += mergedValue;
                board[r][c - 1].textContent = mergedValue.toString();
                board[r][c].textContent = "";
            }
        }
    }
}

function mergeRight() {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length - 1; c++) {
            if (board[r][c].textContent === board[r][c + 1].textContent && board[r][c].textContent !== "") {
                let mergedValue = parseInt(board[r][c].textContent) * 2;
                score += mergedValue;
                board[r][c + 1].textContent = mergedValue.toString();
                board[r][c].textContent = "";
            }
        }
    }
}

function mergeUp() {
    for (let c = 0; c < board[0].length; c++) {
        for (let r = 1; r < board.length; r++) {
            if (board[r][c].textContent === board[r - 1][c].textContent && board[r][c].textContent !== "") {
                let mergedValue = parseInt(board[r][c].textContent) * 2;
                score += mergedValue;
                board[r - 1][c].textContent = mergedValue.toString();
                board[r][c].textContent = "";
            }
        }
    }
}

function mergeDown() {
    for (let c = 0; c < board[0].length; c++) {
        for (let r = 0; r < board.length - 1; r++) {
            if (board[r][c].textContent === board[r + 1][c].textContent && board[r][c].textContent !== "") {
                let mergedValue = parseInt(board[r][c].textContent) * 2;
                score += mergedValue;
                board[r + 1][c].textContent = mergedValue.toString();
                board[r][c].textContent = "";
            }
        }
    }
}

function checkWin() {
    let count = 0;
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            if (board[r][c].textContent === "32") {
                return true;
            } else if (board[r][c].textContent === "") {
                count++;
            }
        }
    }
    return (count === 16);
}
