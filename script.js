const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (board.includes('') === false) {
        statusText.textContent = 'Draw!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            computerMove();
        }
    }
};

const checkWin = () => {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const computerMove = () => {
    let availableCells = [];
    board.forEach((cell, index) => {
        if (cell === '') availableCells.push(index);
    });

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (board.includes('') === false) {
        statusText.textContent = 'Draw!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
