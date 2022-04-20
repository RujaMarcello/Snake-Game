const board = document.getElementById("table");
let snakeSize = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }];
var directionLine = 0;
var directionColumn = 1;
var addLines = 4;
var addColumn = 0;
var score = 0;
var speedSnake = 250;
document.getElementById("score").textContent = "🍎 " + score;

function generateTable() {
    for (let line = 0; line < 10; ++line) {
        let row = board.insertRow(line);
        for (let column = 0; column < 10; ++column) {
            var cell = row.insertCell(column);
            cell.width = 75;
            cell.height = 75;
            cell.style.fontSize = "xx-large"
            cell.style.backgroundColor = "#62fc03";
        }
    }
    generateApples();
    setInterval(snakeGame, speedSnake);
}

document.addEventListener('keyup', snakeMove);

function generateApples() {
    let line = Math.floor(Math.random() * 9);
    let column = Math.floor(Math.random() * 9);
    if (board.rows[line].cells[column].style.backgroundColor !== "#fc03cf") {
        board.rows[line].cells[column].textContent = "🍎";
    } else {
        generateApples();
    }
}

function snakeMove(keyPressed) {
    if (keyPressed.keyCode === 37) {
        directionLine = 0;
        directionColumn = -1;
    } else if (keyPressed.keyCode === 38) {
        directionLine = -1;
        directionColumn = 0;
    } else if (keyPressed.keyCode === 39) {
        directionLine = 0;
        directionColumn = +1;
    } else if (keyPressed.keyCode === 40) {
        directionLine = 1;
        directionColumn = 0;
    }
}

function checkLose() {
    if (directionColumn + addColumn < 0 || directionLine + addLines < 0 || directionLine + addLines > 9 || directionColumn + addColumn > 9 ||
        board.rows[directionLine + addLines].cells[directionColumn + addColumn].getAttribute("snake") == "true") {
        clearInterval(0);
        return 1;
    }
}

function snakeGame() {
    if (checkLose() == 1) {
        document.getElementById("win").textContent = "YOU LOSE";
        return clearInterval(0);
    }
    board.rows[snakeSize[0].x].cells[snakeSize[0].y].style.backgroundColor = "#62fc03";
    board.rows[snakeSize[0].x].cells[snakeSize[0].y].setAttribute("snake", "false");
    if (board.rows[addLines].cells[addColumn].textContent === "🍎") {
        ++score;
        speedSnake += 10;
        document.getElementById("score").textContent = "🍎 " + score;
        board.rows[addLines].cells[addColumn].textContent = "";
        generateApples();
        snakeSize.push({ x: addLines, y: addColumn });
    }

    addColumn += directionColumn;
    addLines += directionLine;
    board.rows[addLines].cells[addColumn].style.backgroundColor = "#fc03cf";
    board.rows[addLines].cells[addColumn].setAttribute("snake", "true");
    snakeSize.shift();
    snakeSize.push({ x: addLines, y: addColumn });
}