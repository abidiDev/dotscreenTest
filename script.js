const boardElement = document.getElementById('board');
const currentPlayerElement = document.getElementById('currentPlayer');
const restartButton = document.getElementById('restart');

const rows = 6;
const columns = 7;
let board = [];
let currentPlayer = 'red';
let gameOver = false;

// Initialize board
function createBoard() {
    boardElement.innerHTML = '';
    board = Array(rows).fill(null).map(() => Array(columns).fill(null));
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.column = c;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    // Si le jeu est terminé, ne rien faire
    if (gameOver) return;

    // Récupérer la colonne de la cellule cliquée
    const column = event.target.dataset.column;

    // Trouver la première rangée vide dans la colonne
    let rowIndex;
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][column]) {
            rowIndex = r;
            break;
        }
    }

    // Mettre à jour le tableau avec le jeton du joueur actuel
    board[rowIndex][column] = currentPlayer;

    // Mettre à jour l'interface utilisateur pour afficher le jeton du joueur actuel
    const cell = boardElement.querySelector(`.cell[data-row='${rowIndex}'][data-column='${column}']`);
    cell.classList.add(currentPlayer);

    // Vérifier s'il y a une victoire
    if (checkWin(rowIndex, column)) {
        // Si un joueur a gagné, mettre fin au jeu et afficher le message de victoire
        gameOver = true;
        currentPlayerElement.textContent = currentPlayer.toUpperCase() + ' WINS!';
        return;
    }

    // Passer au joueur suivant
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    currentPlayerElement.textContent = `${currentPlayer.toUpperCase()}'s turn (${currentPlayer === 'red' ? 'Red' : 'Yellow'})`;
}


function checkWin(row, column) {
    const currentPlayerToken = board[row][column];

    // Vérification horizontale
    for (let c = 0; c < columns - 3; c++) {
        if (board[row][c] === currentPlayerToken &&
            board[row][c + 1] === currentPlayerToken &&
            board[row][c + 2] === currentPlayerToken &&
            board[row][c + 3] === currentPlayerToken) {
            return true;
        }
    }

    // Vérification verticale
    for (let r = 0; r < rows - 3; r++) {
        if (board[r][column] === currentPlayerToken &&
            board[r + 1][column] === currentPlayerToken &&
            board[r + 2][column] === currentPlayerToken &&
            board[r + 3][column] === currentPlayerToken) {
            return true;
        }
    }

    // Vérification diagonale (bas droite)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] === currentPlayerToken &&
                board[r + 1][c + 1] === currentPlayerToken &&
                board[r + 2][c + 2] === currentPlayerToken &&
                board[r + 3][c + 3] === currentPlayerToken) {
                return true;
            }
        }
    }

    // Vérification diagonale (bas gauche)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 3; c < columns; c++) {
            if (board[r][c] === currentPlayerToken &&
                board[r + 1][c - 1] === currentPlayerToken &&
                board[r + 2][c - 2] === currentPlayerToken &&
                board[r + 3][c - 3] === currentPlayerToken) {
                return true;
            }
        }
    }

    return false;
}


restartButton.addEventListener('click', () => {
    gameOver = false;
    currentPlayer = 'red';
    currentPlayerElement.textContent = "Player 1's turn (Red)";
    createBoard();
});

// Initialize the game
createBoard();
