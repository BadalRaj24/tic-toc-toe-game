let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = ""; // "player" or "computer"

function setGameMode(mode) {
    gameMode = mode;
    resetGame();
}

function handleClick(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        updateBoard();
        checkWinner();
        
        if (gameMode === "computer" && gameActive && currentPlayer === "O") {
            setTimeout(computerMove, 500);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function computerMove() {
    let emptyCells = board.map((cell, i) => (cell === "" ? i : null)).filter(i => i !== null);
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = "O";
        updateBoard();
        checkWinner();
        currentPlayer = "X";
    }
}

function updateBoard() {
    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("status").textContent = `Player ${board[a]} Wins!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById("status").textContent = "It's a Tie!";
        gameActive = false;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("status").textContent = "";
    updateBoard();
}
