let playerCredits = 7;
let computerCredits = 7;
let playerDiceValue1 = 0;
let playerDiceValue2 = 0;
let computerDiceValue1 = 0;
let computerDiceValue2 = 0;
let userChoice = null;

const showRulesButton = document.querySelector('.showRules');
const rulesDiv = document.querySelector('.rules');

showRulesButton.addEventListener('click', () => {
    rulesDiv.classList.toggle('hidden');
});

const goBtn = document.querySelector('.go-button');
goBtn.addEventListener('click', computerTurn);

const diceBtn = document.querySelector('.dice-button');
diceBtn.addEventListener('click', playerTurn);

const highBtn = document.querySelector('.higher-button');
highBtn.addEventListener('click', () => setUserChoice('hoger'));

const lowerBtn = document.querySelector('.lower-button');
lowerBtn.addEventListener('click', () => setUserChoice('lower'));

const sameBtn = document.querySelector('.same-button');
sameBtn.addEventListener('click', () => setUserChoice('same'));

const reBtn = document.querySelector('.re');
reBtn.addEventListener('click', () => reYesBtn.classList.toggle('hidden'));

const reYesBtn = document.querySelector('.re-yes');
reYesBtn.addEventListener('click', resetGame);

const message = document.querySelector('.message-box');
const dicePlayer1 = document.querySelector('.player-dice-one');
const dicePlayer2 = document.querySelector('.player-dice-two');
const diceCom1 = document.querySelector('.computer-dice-one');
const diceCom2 = document.querySelector('.computer-dice-two');
let creditsCom = document.querySelector('.computer-credits');
let creditsSpeler = document.querySelector('.player-credits');
let winner = document.querySelector('.winner');

creditsSpeler.innerHTML = playerCredits;
creditsCom.innerHTML = computerCredits;

sameBtn.disabled = true;
diceBtn.disabled = true;
highBtn.disabled = true;
lowerBtn.disabled = true;

// Reset the game
function resetGame() {
    playerCredits = 7;
    computerCredits = 7;
    alert('Het spel wordt gereset');
    updateCredits();
    reYesBtn.classList.toggle('hidden');
}

// Function to update the credit display
function updateCredits() {
    creditsSpeler.innerHTML = playerCredits;
    creditsCom.innerHTML = computerCredits;
}

// Render dice value based on the number
function renderDice(diceElement, value) {
    const diceSymbols = ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;'];
    diceElement.innerHTML = diceSymbols[value - 1];
}

// Computer's turn: generate dice values and display them
function computerTurn() {
    computerDiceValue1 = Math.floor(Math.random() * 6) + 1;
    computerDiceValue2 = Math.floor(Math.random() * 6) + 1;

    renderDice(diceCom1, computerDiceValue1);
    renderDice(diceCom2, computerDiceValue2);

    message.innerHTML = 'Kies hoger of lager';

    goBtn.disabled = true;
    highBtn.disabled = false;
    lowerBtn.disabled = false;
    sameBtn.disabled = false;
}

// Player's turn: generate dice values and display them
function playerTurn() {
    playerDiceValue1 = Math.floor(Math.random() * 6) + 1;
    playerDiceValue2 = Math.floor(Math.random() * 6) + 1;

    renderDice(dicePlayer1, playerDiceValue1);
    renderDice(dicePlayer2, playerDiceValue2);

    checkWinner();
    goBtn.disabled = false;
}

// Check who won based on the user's choice
function checkWinner() {
    let playerTotal = playerDiceValue1 + playerDiceValue2;
    let computerTotal = computerDiceValue1 + computerDiceValue2;

    if (userChoice === 'hoger' && playerTotal > computerTotal) {
        playerCredits += 1;
        computerCredits -= 1;
        message.innerHTML = 'Je wint!';
    } else if (userChoice === 'hoger' && playerTotal < computerTotal) {
        playerCredits -= 1;
        computerCredits += 1;
        message.innerHTML = 'Je hebt verloren!';
    } else if (userChoice === 'lower' && playerTotal < computerTotal) {
        playerCredits += 1;
        computerCredits -= 1;
        message.innerHTML = 'Je wint!';
    } else if (userChoice === 'lower' && playerTotal > computerTotal) {
        playerCredits -= 1;
        computerCredits += 1;
        message.innerHTML = 'Je hebt verloren!';
    } else if (userChoice === 'same' && playerTotal === computerTotal) {
        playerCredits += 2;
        computerCredits -= 2;
        message.innerHTML = 'Je wint!';
    } else if (userChoice === 'same') {
        playerCredits -= 1;
        computerCredits += 1;
        message.innerHTML = 'Je hebt verloren!';
    }

    if (playerCredits <= 0 || computerCredits <= 0) {
        alert('Er is geen credits meer, het spel wordt gereset.');
        resetGame();
    }

    updateCredits();
}

// Set the user's choice for higher, lower, or same
function setUserChoice(choice) {
    userChoice = choice;

    highBtn.disabled = true;
    lowerBtn.disabled = true;
    sameBtn.disabled = true;
    diceBtn.disabled = false;
    message.innerHTML = 'Gooi jouw dobbelsteen';
}
