document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector('.board');
    const message = document.getElementById('message');
    const boardSize = 10;
    const shipLengths = [5, 4, 3, 3, 2];
    const ships = [];

    function createBoard() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
        }
    }

    function getRandomDirection() {
        return Math.random() < 0.5 ? 'horizontal' : 'vertical';
    }

    function getRandomStart(length, direction) {
        let start;
        if (direction === 'horizontal') {
            const maxStart = boardSize * boardSize - length;
            do {
                start = Math.floor(Math.random() * maxStart);
            } while (start % boardSize > boardSize - length);
        } else {
            const maxStart = boardSize * (boardSize - length);
            start = Math.floor(Math.random() * maxStart);
        }
        return start;
    }

    function canPlaceShip(start, length, direction) {
        for (let i = 0; i < length; i++) {
            const index = direction === 'horizontal' ? start + i : start + i * boardSize;
            if (index >= boardSize * boardSize || board.children[index].classList.contains('ship')) {
                return false;
            }
        }
        return true;
    }

    function placeShip(length) {
        let placed = false;
        while (!placed) {
            const direction = getRandomDirection();
            const start = getRandomStart(length, direction);
            if (canPlaceShip(start, length, direction)) {
                const ship = [];
                for (let i = 0; i < length; i++) {
                    const index = direction === 'horizontal' ? start + i : start + i * boardSize;
                    board.children[index].classList.add('ship');
                    ship.push(index);
                }
                ships.push(ship);
                placed = true;
            }
        }
    }

    function placeAllShips() {
        shipLengths.forEach(length => placeShip(length));
    }

    function isShipSunk(ship) {
        return ship.every(index => board.children[index].classList.contains('hit'));
    }

    function areAllShipsSunk() {
        return ships.every(isShipSunk);
    }

    function showMessage(text) {
        message.textContent = text;
    }

    function handleCellClick(event) {
        const cell = event.target;
        if (!cell.classList.contains('cell') || cell.classList.contains('hit') || cell.classList.contains('miss')) {
            return;
        }

        if (cell.classList.contains('ship')) {
            cell.classList.add('hit');
            showMessage("Hit!");

            for (const ship of ships) {
                if (ship.includes(parseInt(cell.dataset.index))) {
                    if (isShipSunk(ship)) {
                        showMessage("Je hebt een schip volledig laten zinken!");
                        if (areAllShipsSunk()) {
                            showMessage("Je hebt alle schepen gezonken! Gefeliciteerd!");
                        }
                    }
                    break;
                }
            }
        } else {
            cell.classList.add('miss');
            showMessage("Miss!");
        }
    }

    createBoard();
    placeAllShips();
    board.addEventListener("click", handleCellClick);
});
