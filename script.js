const cards = document.querySelectorAll('.card');
let matched = 0;
let points = 0;
let time = 0;
let timePerMatch = 0;
let startTime;
let endTime;
let cardOne, cardTwo;
let disableDeck = false;
let timerInterval; 
function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        if (!startTime) {
            startTime = new Date();
            timerInterval = setInterval(updateTime, 1000); 
        }

        clickedCard.classList.add('flip');
        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('.back-view img').src,
            cardTwoImg = cardTwo.querySelector('.back-view img').src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        points += 10;

        if (matched == 8) {
            endTime = new Date();
            clearInterval(timerInterval);
            calculateTimePerMatch();
            
        }

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        disableDeck = false;
        updatePoints();
    } else {
        setTimeout(() => {
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400);
        setTimeout(() => {
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            cardOne = cardTwo = '';
            disableDeck = false;
        }, 1200);
    }
}

function updatePoints() {
    document.getElementById('pointCount').textContent = points;
}

function updateTime() {
    time++;
    document.getElementById('timer').textContent = time;
}

function calculateTimePerMatch() {
    timePerMatch = (endTime - startTime) / (matched * 1000); // in seconds
    document.getElementById('timePerMatch').textContent = `Time per match: ${timePerMatch.toFixed(2)} seconds`;
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = '';
    clearInterval(timerInterval); // Clear any existing interval
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
    cards.forEach((card, i) => {
        card.classList.remove('flip');
        let imgTag = card.querySelector('.back-view img');
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener('click', flipCard);
    });
}


function refreshGame() {
  shuffleCard();
  resetGame();
}

function resetGame() {
  matched = 0;
  points = 0;
  time = 0;
  timePerMatch = 0;
  startTime = null;
  endTime = null;
  clearInterval(timerInterval);
  updatePoints();
  document.getElementById('timer').textContent = time;
  document.getElementById('timePerMatch').textContent = 'Time per match: 0 seconds';
}


shuffleCard();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});
