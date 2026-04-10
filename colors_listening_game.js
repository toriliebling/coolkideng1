// Listening Game for colors in English

const colors = [
    { id: 'red', english: 'Red', russian: 'Красный' },
    { id: 'orange', english: 'Orange', russian: 'Оранжевый' },
    { id: 'yellow', english: 'Yellow', russian: 'Жёлтый' },
    { id: 'green', english: 'Green', russian: 'Зелёный' },
    { id: 'blue', english: 'Blue', russian: 'Синий' },
    { id: 'purple', english: 'Purple', russian: 'Фиолетовый' },
    { id: 'pink', english: 'Pink', russian: 'Розовый' },
    { id: 'brown', english: 'Brown', russian: 'Коричневый' },
    { id: 'black', english: 'Black', russian: 'Чёрный' },
    { id: 'white', english: 'White', russian: 'Белый' },
    { id: 'gray', english: 'Gray', russian: 'Серый' },
    { id: 'cyan', english: 'Cyan', russian: 'Голубой' }
];

// Game state
let currentQuestion = 1;
const totalQuestions = colors.length;
let score = 0;
let timerInterval = null;
let seconds = 0;
let correctColor = null;
let gameActive = true;
let usedColors = [];

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
    usedColors = [];
    updateScore();
    updateQuestionCounter();
    startTimer();
    generateQuestion();
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
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

// Speak a color using pre-recorded audio files
function speakColor(color) {
    // Сопоставление идентификаторов цветов с именами файлов
    const audioFiles = {
        'red': 'pronunciation_en_red.mp3',
        'orange': 'pronunciation_en_orange.mp3',
        'yellow': 'pronunciation_en_yellow.mp3',
        'green': 'pronunciation_en_green.mp3',
        'blue': 'pronunciation_en_blue.mp3',
        'purple': 'pronunciation_en_purple.mp3',
        'pink': 'pronunciation_en_pink.mp3',
        'brown': 'pronunciation_en_brown.mp3',
        'black': 'pronunciation_en_black.mp3',
        'white': 'pronunciation_en_white.mp3',
        'gray': 'pronunciation_en_gray.mp3',
        'cyan': 'pronunciation_en_cyan.mp3'
    };

    const fileName = audioFiles[color.id];
    if (!fileName) {
        console.error('Аудиофайл для цвета', color.id, 'не найден');
        return;
    }

    const audioPath = `sounds_sounds_words/sounds_color/${fileName}`;
    const audio = new Audio(audioPath);

    audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
    });
}

// Get a random color that hasn't been used yet
function getRandomUnusedColor() {
    const availableColors = colors.filter(color => !usedColors.includes(color.id));
    if (availableColors.length === 0) {
        // If all colors have been used, reset usedColors
        usedColors = [];
        return colors[getRandomInt(0, colors.length - 1)];
    }
    const randomIndex = getRandomInt(0, availableColors.length - 1);
    return availableColors[randomIndex];
}

// Generate a question
function generateQuestion() {
    if (!gameActive) return;

    // Clear previous options
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    nextButton.style.display = 'none';

    // Select a random color that hasn't been used yet
    correctColor = getRandomUnusedColor();
    usedColors.push(correctColor.id);

    // Create an array of possible answers (correct + 2 random wrong ones)
    const wrongColors = colors.filter(color => color.id !== correctColor.id);
    const shuffledWrong = wrongColors.sort(() => 0.5 - Math.random()).slice(0, 2);
    const answerOptions = [correctColor, ...shuffledWrong];
    
    // Shuffle the answer options
    answerOptions.sort(() => 0.5 - Math.random());

    // Create option buttons
    answerOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.russian;
        button.dataset.colorId = option.id;
        button.onclick = () => checkAnswer(option.id);
        optionsContainer.appendChild(button);
    });

    // Update play button to speak the current color
    playButton.onclick = () => speakColor(correctColor);

    updateQuestionCounter();
}

// Check the selected answer
function checkAnswer(selectedColorId) {
    if (!gameActive) return;

    // Disable all buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.colorId === correctColor.id) {
            btn.classList.add('correct');
        } else if (btn.dataset.colorId === selectedColorId && selectedColorId !== correctColor.id) {
            btn.classList.add('incorrect');
        }
    });

    // Check if answer is correct
    if (selectedColorId === correctColor.id) {
        score++;
        updateScore();
        feedbackElement.textContent = 'Правильно! ✓';
        feedbackElement.className = 'feedback correct';
    } else {
        feedbackElement.textContent = `Неправильно. Правильный ответ: ${correctColor.russian}`;
        feedbackElement.className = 'feedback incorrect';
    }

    // Show next button or finish game
    if (currentQuestion < totalQuestions) {
        nextButton.style.display = 'inline-block';
    } else {
        finishGame();
    }
}

// Move to next question
function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        generateQuestion();
        nextButton.style.display = 'none';
    } else {
        finishGame();
    }
}

// Finish the game
function finishGame() {
    gameActive = false;
    clearInterval(timerInterval);
    
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = `Игра завершена! Ваш результат: ${score} из ${totalQuestions} (${percentage}%)`;
    
    if (percentage === 100) {
        message += ' 🎉 Отличный результат! Вы знаете все цвета!';
    } else if (percentage >= 80) {
        message += ' 👍 Хорошая работа!';
    } else if (percentage >= 60) {
        message += ' 😊 Неплохо, но можно лучше!';
    } else {
        message += ' 📚 Потренируйтесь ещё!';
    }
    
    feedbackElement.textContent = message;
    feedbackElement.className = 'feedback';
    
    // Hide question area
    if (questionArea) questionArea.style.display = 'none';
    
    // Show restart button prominently
    nextButton.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    playButton.addEventListener('click', () => {
        if (correctColor) {
            speakColor(correctColor);
        }
    });
    
    nextButton.addEventListener('click', nextQuestion);
    
    restartButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        initGame();
    });
});

// Prevent speech synthesis from being blocked by browser
window.addEventListener('beforeunload', () => {
    if (timerInterval) clearInterval(timerInterval);
    window.speechSynthesis.cancel();
});