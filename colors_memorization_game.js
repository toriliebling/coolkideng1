// Memorization Game for colors in English

// Color data with actual color values
const colors = [
    { id: 'red', english: 'Red', russian: 'Красный', hex: '#ff0000' },
    { id: 'orange', english: 'Orange', russian: 'Оранжевый', hex: '#ffa500' },
    { id: 'yellow', english: 'Yellow', russian: 'Жёлтый', hex: '#ffff00' },
    { id: 'green', english: 'Green', russian: 'Зелёный', hex: '#008000' },
    { id: 'blue', english: 'Blue', russian: 'Синий', hex: '#0000ff' },
    { id: 'purple', english: 'Purple', russian: 'Фиолетовый', hex: '#800080' },
    { id: 'pink', english: 'Pink', russian: 'Розовый', hex: '#ffc0cb' },
    { id: 'brown', english: 'Brown', russian: 'Коричневый', hex: '#a52a2a' },
    { id: 'black', english: 'Black', russian: 'Чёрный', hex: '#000000' },
    { id: 'white', english: 'White', russian: 'Белый', hex: '#ffffff' },
    { id: 'gray', english: 'Gray', russian: 'Серый', hex: '#808080' },
    { id: 'cyan', english: 'Cyan', russian: 'Голубой', hex: '#00ffff' }
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
const colorDisplay = document.getElementById('color-display');
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
    usedColors = [];
    updateScore();
    updateQuestionCounter();
    startTimer();
    generateQuestion();
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
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

    // Display the color
    colorDisplay.style.backgroundColor = correctColor.hex;
    colorDisplay.style.color = getContrastColor(correctColor.hex);
    colorDisplay.textContent = correctColor.russian;

    // Create an array of possible answers (correct + 2 random wrong ones)
    const wrongColors = colors.filter(color => color.id !== correctColor.id);
    const shuffledWrong = wrongColors.sort(() => 0.5 - Math.random()).slice(0, 2);
    const answerOptions = [correctColor, ...shuffledWrong];
    
    // Shuffle the answer options
    const shuffledOptions = shuffleArray([...answerOptions]);

    // Create option buttons
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.english;
        button.dataset.colorId = option.id;
        button.onclick = () => checkAnswer(option.id);
        optionsContainer.appendChild(button);
    });

    updateQuestionCounter();
}

// Get contrast color (black or white) for text based on background color
function getContrastColor(hexColor) {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for light colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
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
        feedbackElement.textContent = `Правильно! ${correctColor.english} - ${correctColor.russian}`;
        feedbackElement.className = 'feedback correct';
    } else {
        const selectedColor = colors.find(c => c.id === selectedColorId);
        feedbackElement.textContent = `Неправильно. Правильный ответ: ${correctColor.english} (${correctColor.russian})`;
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
    
    // Hide next button
    nextButton.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    nextButton.addEventListener('click', nextQuestion);
    
    restartButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        initGame();
    });
});

// Prevent timer from running after page unload
window.addEventListener('beforeunload', () => {
    if (timerInterval) clearInterval(timerInterval);
});