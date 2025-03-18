document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.querySelector('.restart');
    const winningMessage = document.querySelector('.winning-message');
    const playerXInput = document.querySelector('.my-input');
    const playerOInput = document.querySelector('.my-input2');

    let currentPlayer = 'X';
    let gameBoard = Array(9).fill('');
    let gameActive = true;

    // Voeg event listeners toe aan de cellen
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });

    // Voeg event listener toe voor opnieuw spelen
    restartButton.addEventListener('click', restartGame);

    // Behandel het klikken op een cel
    function handleCellClick(cell) {
        const index = cell.dataset.index;
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.style.backgroundColor = currentPlayer === 'X' ? '#0606f0' : '#f00606';
            cell.style.color = 'white';

            if (checkWinner()) {
                displayWinner();
                gameActive = false;
            } else if (!gameBoard.includes('')) {
                displayTie();
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    // Controleer of er een winnaar is
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontaal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticaal
            [0, 4, 8], [2, 4, 6]              // diagonaal
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    // Toon de winnaar
    function displayWinner() {
        const name = currentPlayer === 'X' ? playerXInput.value || 'Speler X' : playerOInput.value || 'Speler O';
        winningMessage.textContent = `${name} wint!`;
    }

    // Toon gelijkspel
    function displayTie() {
        winningMessage.textContent = 'Het is een gelijkspel!';
    }

    // Herstart het spel
    function restartGame() {
        currentPlayer = 'X';
        gameBoard.fill('');
        gameActive = true;
        winningMessage.textContent = '';

        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = 'black';
        });
    }
});
