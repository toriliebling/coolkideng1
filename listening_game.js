// Listening Game for numbers 1-10 in English

const numberWords = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten'
};

// Game state
let currentQuestion = 1;
const totalQuestions = 10;
let score = 0;
let timerInterval = null;
let seconds = 0;
let correctNumber = null;
let gameActive = true;

// DOM elements
const playButton = document.getElementById('play-button');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score');
const questionCounterElement = document.getElementById('question-counter');
const timerElement = document.getElementById('timer');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionArea = document.querySelector('.question-area');

// Initialize game
function initGame() {
    currentQuestion = 1;
    score = 0;
    seconds = 0;
    gameActive = true;
    updateScore();
    updateQuestionCounter();
    startTimer();
    generateQuestion();
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
    if (questionArea) questionArea.style.display = '';
}

// Start timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update score display
function updateScore() {
    scoreElement.textContent = score;
}

// Update question counter
function updateQuestionCounter() {
    questionCounterElement.textContent = `${currentQuestion} / ${totalQuestions}`;
}

// Generate a random integer between min and max inclusive
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Speak a number using audio files from numberssound folder
function speakNumber(number) {
    // Mapping between numbers and audio file names
    const audioFiles = {
        1: 'pronunciation_en_one.mp3',
        2: 'pronunciation_en_two.mp3',
        3: 'pronunciation_en_three.mp3',
        4: 'pronunciation_en_four.mp3',
        5: 'pronunciation_en_five.mp3',
        6: 'pronunciation_en_six.mp3',
        7: 'pronunciation_en_seven.mp3',
        8: 'pronunciation_en_eight.mp3',
        9: 'pronunciation_en_nine.mp3',
        10: 'pronunciation_en_ten.mp3'
    };

    const audioFile = audioFiles[number];
    if (!audioFile) {
        console.error('Аудиофайл для числа', number, 'не найден');
        return;
    }

    // Create and play audio
    const audio = new Audio(`numberssound/${audioFile}`);
    audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
    });
}

// Generate a question
function generateQuestion() {
    if (!gameActive) return;

    // Clear previous options
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';

    // Generate random number (1-10)
    correctNumber = getRandomInt(1, 10);

    // Create digit buttons (1-10)
    for (let i = 1; i <= 10; i++) {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = i;
        button.addEventListener('click', () => handleAnswer(i));
        optionsContainer.appendChild(button);
    }

    // Speak the number after a short delay
    setTimeout(() => speakNumber(correctNumber), 500);
}

// Handle answer selection
function handleAnswer(selectedNumber) {
    if (!gameActive) return;

    // Disable all buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (parseInt(btn.textContent) === correctNumber) {
            btn.classList.add('correct');
        } else if (parseInt(btn.textContent) === selectedNumber && selectedNumber !== correctNumber) {
            btn.classList.add('wrong');
        }
    });

    // Check correctness
    if (selectedNumber === correctNumber) {
        score++;
        updateScore();
        feedbackElement.textContent = 'Правильно! (Correct!)';
        feedbackElement.style.color = '#2ecc71';
    } else {
        feedbackElement.textContent = `Неправильно. Правильный ответ: ${correctNumber}.`;
        feedbackElement.style.color = '#e74c3c';
    }

    // Show next button
    nextButton.style.display = 'inline-block';
}

// Move to next question
function nextQuestion() {
    if (currentQuestion >= totalQuestions) {
        endGame();
        return;
    }
    currentQuestion++;
    updateQuestionCounter();
    generateQuestion();
}

// End game
function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = `Игра завершена! Ваш счет: ${score} из ${totalQuestions}. Время: ${timerElement.textContent}.`;
    feedbackElement.style.color = '#1a535c';
    nextButton.style.display = 'none';
    if (questionArea) questionArea.style.display = 'none';
}

// Event listeners
playButton.addEventListener('click', () => {
    if (correctNumber) {
        speakNumber(correctNumber);
    }
});
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    initGame();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initGame);