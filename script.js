const anatomyImages = [
    { src: 'https://example.com/images/heart.jpg', correctAnswer: 'Heart' },
    { src: 'https://example.com/images/liver.jpg', correctAnswer: 'Liver' },
    { src: 'https://example.com/images/femur.jpg', correctAnswer: 'Femur' },
    // Add more images and answers here
];

let score = 0;
let timeLeft = 60;
let timerId;
let currentImageIndex = 0;

const anatomyImage = document.getElementById('anatomy-image');
const answerInput = document.getElementById('answer-input');
const submitAnswerButton = document.getElementById('submit-answer');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const startButton = document.getElementById('start-button');

function loadNextImage() {
    if (currentImageIndex < anatomyImages.length) {
        anatomyImage.src = anatomyImages[currentImageIndex].src;
        answerInput.value = '';
    } else {
        clearInterval(timerId);
        alert('Congratulations! You completed the quiz with a score of ' + score);
        anatomyImage.src = '';
    }
}

function startGame() {
    score = 0;
    timeLeft = 60;
    currentImageIndex = 0;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
    loadNextImage();

    timerId = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerId);
            alert('Time is up! Your score is ' + score);
            anatomyImage.src = ''; // Clear the image when time is up
        }
    }, 1000);
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = anatomyImages[currentImageIndex].correctAnswer.toLowerCase();

    if (userAnswer === correctAnswer) {
        score++;
        scoreDisplay.textContent = score;
    }

    currentImageIndex++;
    loadNextImage();
}

submitAnswerButton.addEventListener('click', checkAnswer);
startButton.addEventListener('click', startGame);