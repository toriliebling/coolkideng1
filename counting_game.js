// Counting Game for numbers 1-10 in English

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

const numberWordsArray = Object.values(numberWords);

// Game state
let currentQuestion = 1;
let totalQuestions = 10;
let score = 0;
let timerInterval = null;
let seconds = 0;
let correctAnswer = null;
let gameActive = true;

// DOM elements
const itemsContainer = document.getElementById('items-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score');
const questionCounterElement = document.getElementById('question-counter');
const timerElement = document.getElementById('timer');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');

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

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate a question
function generateQuestion() {
    if (!gameActive) return;

    // Clear previous items and options
    itemsContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';

    // Generate random number of items (1-10)
    const correctNumber = getRandomInt(1, 10);
    correctAnswer = numberWords[correctNumber];

    // Display items
    for (let i = 0; i < correctNumber; i++) {
        const item = document.createElement('div');
        item.className = 'item';
        const img = document.createElement('img');
        img.src = 'images/eee.png';
        img.alt = 'item';
        item.appendChild(img);
        itemsContainer.appendChild(item);
    }

    // Generate answer options (correct + 3 random incorrect)
    let options = [correctAnswer];
    while (options.length < 4) {
        const randomWord = numberWordsArray[getRandomInt(0, 9)];
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
    }
    options = shuffleArray(options);

    // Create option buttons
    options.forEach(word => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = word;
        button.addEventListener('click', () => handleAnswer(word));
        optionsContainer.appendChild(button);
    });

    // Update question text
    questionText.textContent = `Сколько предметов? (Count the items)`;
}

// Handle answer selection
function handleAnswer(selectedWord) {
    if (!gameActive) return;

    // Disable all buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedWord && selectedWord !== correctAnswer) {
            btn.classList.add('wrong');
        }
    });

    // Check correctness
    if (selectedWord === correctAnswer) {
        score++;
        updateScore();
        feedbackElement.textContent = 'Правильно! (Correct!)';
        feedbackElement.style.color = '#2ecc71';
    } else {
        feedbackElement.textContent = `Неправильно. Правильный ответ: ${correctAnswer}.`;
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
    itemsContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    questionText.textContent = 'Игра завершена!';
    feedbackElement.textContent = `Ваш счет: ${score} из ${totalQuestions}. Время: ${timerElement.textContent}.`;
    feedbackElement.style.color = '#1a535c';
    nextButton.style.display = 'none';
}

// Event listeners
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    initGame();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initGame);