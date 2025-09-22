const dealerDiv = document.querySelector('.dealer-cards');
const dealerScoreDiv = document.querySelector('.dealer-score');
const playerDiv = document.querySelector('.player-cards');
const playerScoreDiv = document.querySelector('.player-score');
const pointsIn = document.querySelector('.player-points-in input');
const playBtn = document.querySelector('.play');
const hitBtn = document.querySelector('.hit');
const standBtn = document.querySelector('.stand');
const message = document.querySelector('.message');
const playerPointsDiv = document.querySelector('.player-points');

let playerPoints = 0;
let dealerPoints = 0;
let playerCards = [];
let dealerCards = [];
let betAmount = 0;
let cash = 50


playerScoreDiv.textContent =  playerPoints;
dealerScoreDiv.textContent =  dealerPoints;
playerPointsDiv.textContent =  cash;

hitBtn.style.display = 'none';
standBtn.style.display = 'none';

playBtn.addEventListener('click', startGame);
hitBtn.addEventListener('click', hitCard);
standBtn.addEventListener('click', standCard);

function drawCard() {
    return Math.floor(Math.random() * 10) + 1; 
}


function renderCardImage(container, value, type) {
    let suffix = value;
    let filename = `cards/C${suffix}.jpg`;

    const img = document.createElement('img');
    img.src = filename;
    img.classList.add('card-img');

    container.appendChild(img);

    // kleine delay zodat transition werkt
    setTimeout(() => {
        img.classList.add('show');
    }, 50);
}

function calculateHandValue(cards) {
    let total = 0;
    let aces = 0;

    cards.forEach(card => {
        if (card === 1) { 
            total += 11; 
            aces++; 
        } else if (card >= 11 && card <= 13) {
            total += 10; 
        } else {
            total += card;
        }
    });

    while (total > 21 && aces > 0) {
        total -= 10; 
        aces--;
    }

    return total;
}

function startGame() {
    betAmount = Number(pointsIn.value);

    if (betAmount <= 0 || betAmount > cash) {
        message.textContent = "Zet een geldig bedrag!";
        return;
    }

    pointsIn.disabled = true;
    playBtn.style.display = 'none';
    message.textContent = "";

    playerCards = [drawCard(), drawCard()];
    dealerCards = [drawCard()];

    playerDiv.innerHTML = '';
    dealerDiv.innerHTML = '';

    playerCards.forEach(c => renderCardImage(playerDiv, c, 'player'));
    dealerCards.forEach(c => renderCardImage(dealerDiv, c, 'dealer'));

    playerScoreDiv.textContent = calculateHandValue(playerCards);
    dealerScoreDiv.textContent = calculateHandValue(dealerCards);

    hitBtn.style.display = 'inline-block';
    standBtn.style.display = 'inline-block';
}

function hitCard() {
    const newCard = drawCard();
    playerCards.push(newCard);
    renderCardImage(playerDiv, newCard, 'player');

    const total = calculateHandValue(playerCards);
    playerScoreDiv.textContent = total;

    if (total > 21) {
        message.textContent = "Busted! Dealer wint!";
        playerPoints -= betAmount;
        endRound();
    }
}

function standCard() {
    hitBtn.style.display = 'none';
    standBtn.style.display = 'none';
    dealerPlay();
}

function dealerPlay() {
    let dealerTotal = calculateHandValue(dealerCards);
    dealerScoreDiv.textContent = dealerTotal;

    function drawNextCard() {
        if (dealerTotal < 17) {
            const newCard = drawCard();
            dealerCards.push(newCard);
            renderCardImage(dealerDiv, newCard, 'dealer');

            dealerTotal = calculateHandValue(dealerCards);
            dealerScoreDiv.textContent = dealerTotal;

            setTimeout(drawNextCard, 1000); // wacht 1 seconde en pak dan nog een kaart
        } else {
            // dealer stopt, bepaal de winnaar
            determineWinner();
        }
    }

    // start na 1 seconde
    setTimeout(drawNextCard, 1000);
}

function determineWinner() {
    const playerTotal = calculateHandValue(playerCards);
    const dealerTotal = calculateHandValue(dealerCards);

    if (playerTotal > 21) {
        message.textContent = "Busted! Dealer wint!";
        cash -= betAmount;
    } else if (dealerTotal > 21) {
        message.textContent = "Dealer busted! Jij wint!";
        cash += betAmount;
    } else if (playerTotal > dealerTotal) {
        message.textContent = "Jij wint!";
        cash += betAmount;
    } else if (playerTotal < dealerTotal) {
        message.textContent = "Dealer wint!";
        cash -= betAmount;
    } else {
        message.textContent = "Gelijkspel!";
    }

    endRound();
}

function endRound() {
    playerPointsDiv.textContent = cash;
    hitBtn.style.display = 'none';
    standBtn.style.display = 'none';
    playBtn.style.display = 'inline-block';
    pointsIn.disabled = false;
    pointsIn.value = '';
    playerCards = [];
    dealerCards = [];
}
if (cash <= 0) {
    cash.textContent = "iets teveel gegokt.";
    }