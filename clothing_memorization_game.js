// Memorization Game for clothing in English

// Clothing data
const clothingItems = [
    { id: 'shirt', english: 'Shirt', russian: 'Рубашка' },
    { id: 'pants', english: 'Pants', russian: 'Брюки' },
    { id: 'dress', english: 'Dress', russian: 'Платье' },
    { id: 'skirt', english: 'Skirt', russian: 'Юбка' },
    { id: 'jacket', english: 'Jacket', russian: 'Куртка' },
    { id: 'coat', english: 'Coat', russian: 'Пальто' },
    { id: 'hat', english: 'Hat', russian: 'Шляпа' },
    { id: 'shoes', english: 'Shoes', russian: 'Обувь' },
    { id: 'socks', english: 'Socks', russian: 'Носки' },
    { id: 'gloves', english: 'Gloves', russian: 'Перчатки' },
    { id: 'scarf', english: 'Scarf', russian: 'Шарф' },
    { id: 't-shirt', english: 'T‑shirt', russian: 'Футболка' }
];

// Game state
let currentQuestion = 1;
const totalQuestions = clothingItems.length;
let score = 0;
let timerInterval = null;
let seconds = 0;
let correctItem = null;
let gameActive = true;
let usedItems = [];

// DOM elements
const clothingDisplay = document.getElementById('clothing-display');
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
    usedItems = [];
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

// Get a random item that hasn't been used yet
function getRandomUnusedItem() {
    const availableItems = clothingItems.filter(item => !usedItems.includes(item.id));
    if (availableItems.length === 0) return null;
    const randomIndex = getRandomInt(0, availableItems.length - 1);
    return availableItems[randomIndex];
}

// Generate a question with options
function generateQuestion() {
    if (!gameActive) return;
    
    // Get a random unused item
    correctItem = getRandomUnusedItem();
    if (!correctItem) {
        endGame();
        return;
    }
    
    usedItems.push(correctItem.id);
    
    // Display the Russian translation
    clothingDisplay.textContent = correctItem.russian;
    clothingDisplay.style.background = 'linear-gradient(135deg, #9b59b6, #8e44ad)';
    
    // Create array of wrong options (all items except correct one)
    const wrongItems = clothingItems.filter(item => item.id !== correctItem.id);
    
    // Shuffle wrong items and pick 3
    const shuffledWrong = [...wrongItems].sort(() => Math.random() - 0.5).slice(0, 3);
    
    // Combine correct and wrong options
    const options = [correctItem, ...shuffledWrong];
    
    // Shuffle the options
    options.sort(() => Math.random() - 0.5);
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    options.forEach(item => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = item.english;
        button.dataset.id = item.id;
        button.addEventListener('click', () => checkAnswer(item.id));
        optionsContainer.appendChild(button);
    });
    
    // Update UI
    updateQuestionCounter();
}

// Check the selected answer
function checkAnswer(selectedId) {
    if (!gameActive) return;
    
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
        
        if (btn.dataset.id === correctItem.id) {
            btn.classList.add('correct');
        } else if (btn.dataset.id === selectedId && selectedId !== correctItem.id) {
            btn.classList.add('incorrect');
        }
    });
    
    if (selectedId === correctItem.id) {
        score++;
        updateScore();
        feedbackElement.textContent = `✅ Правильно! ${correctItem.english} - ${correctItem.russian}`;
        feedbackElement.className = 'feedback correct';
    } else {
        const selectedItem = clothingItems.find(item => item.id === selectedId);
        feedbackElement.textContent = `❌ Неправильно. Правильный ответ: ${correctItem.english} (${correctItem.russian})`;
        feedbackElement.className = 'feedback incorrect';
    }
    
    gameActive = false;
    nextButton.style.display = 'inline-block';
}

// Move to next question
function nextQuestion() {
    if (currentQuestion >= totalQuestions) {
        endGame();
        return;
    }
    
    currentQuestion++;
    gameActive = true;
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    generateQuestion();
}

// End the game
function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = `Игра завершена! Ваш результат: ${score} из ${totalQuestions} (${percentage}%)`;
    
    if (percentage === 100) {
        message += ' 🎉 Отличный результат! Вы знаете всю одежду!';
    } else if (percentage >= 80) {
        message += ' 👍 Хорошая работа!';
    } else if (percentage >= 60) {
        message += ' 😊 Неплохо, но можно лучше!';
    } else {
        message += ' 📚 Потренируйтесь ещё!';
    }
    
    feedbackElement.textContent = message;
    feedbackElement.className = 'feedback';
    
    // Show restart button prominently
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