const dealerDiv = document.querySelector('.dealer-cards');
const dealerScoreDiv = document.querySelector('.dealer-score');
const playerDiv = document.querySelector('.player-cards');
const playerSplitDiv = document.querySelector('.player-cards-split');
const playerScoreDiv = document.querySelector('.player-score');
const splitScoreDiv = document.querySelector('.player-score-split');
const pointsIn = document.querySelector('.player-points-in input');
const playBtn = document.querySelector('.play');
const doubleBtn = document.querySelector('.double');
const hitBtn = document.querySelector('.hit');
const splitBtn = document.querySelector('.split');
const standBtn = document.querySelector('.stand');
const message = document.querySelector('.message');
const playerPointsDiv = document.querySelector('.player-points');

let playerPoints = 0;
let dealerPoints = 0;
let playerCards = [];
let splitCards = [];
let dealerCards = [];
let betAmount = 0;
let cash = 50


playerScoreDiv.textContent =  playerPoints;
dealerScoreDiv.textContent =  dealerPoints;
playerPointsDiv.textContent =  cash;

hitBtn.style.display = 'none';
standBtn.style.display = 'none';
doubleBtn.style.display = 'none';
splitBtn.style.display = 'none';

playBtn.addEventListener('click', startGame);
hitBtn.addEventListener('click', hitCard);
standBtn.addEventListener('click', standCard);
doubleBtn.addEventListener('click', double);
splitBtn.addEventListener('click', splitcards);

function drawCard() {
    return Math.floor(Math.random() * 10) + 1; 
}

function double() {
    if (cash > betAmount + betAmount ) {
        doubleBtn.style.display = 'none';
        doubleplay();
        
    } else {
        message.textContent = "Je hebt niet genoeg punten om te verdubbelen!";
    }
}

function doubleplay() {
    doubleBtn.style.display = 'none';
    betAmount *= 2;
    pointsIn.value = betAmount;
    hitCard();}


function split() {
    if (playerCards[0] === playerCards[1] && cash >= betAmount * 2) {
    

    } 
    
}
function splitcards() {
    splitBtn.style.display = 'none';
    splitCards.push (playerCards.pop());
    playerDiv.innerHTML = playerCards();
    renderCardImage();
}

function renderCardImage(container, value, type) {
    let suffix = value;
    let filename = `cards/C${suffix}.jpg`;

    const img = document.createElement('img');
    img.src = filename;
    img.classList.add('card-img');

    container.appendChild(img);

   
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
    doubleBtn.style.display = 'inline-block';
    split();
      console.log(playerCards);
}

function hitCard() {
    
    const newCard = drawCard();
    playerCards.push(newCard);
    renderCardImage(playerDiv, newCard, 'player');

    const total = calculateHandValue(playerCards);
    playerScoreDiv.textContent = total;

    if (total > 21) {
        message.textContent = "Busted! Dealer wint!";
       
        determineWinner();
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
