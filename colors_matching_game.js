// Matching Game for colors (English - Russian)

// Color data
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
let selectedCards = [];
let matchedPairs = 0;
let totalPairs = colors.length;
let attempts = 0;
let gameActive = true;
let timerInterval = null;
let seconds = 0;
let cards = [];

// DOM elements
const gameGrid = document.getElementById('game-grid');
const matchedPairsElement = document.getElementById('matched-pairs');
const totalPairsElement = document.getElementById('total-pairs');
const attemptsElement = document.getElementById('attempts');
const timerElement = document.getElementById('timer');
const feedbackElement = document.getElementById('feedback');
const checkButton = document.getElementById('check-btn');
const restartButton = document.getElementById('restart-btn');

// Initialize game
function initGame() {
    // Reset game state
    selectedCards = [];
    matchedPairs = 0;
    attempts = 0;
    gameActive = true;
    seconds = 0;
    
    // Clear game grid
    gameGrid.innerHTML = '';
    
    // Create cards array (english + russian)
    cards = [];
    colors.forEach(color => {
        // English card
        cards.push({
            id: color.id,
            type: 'english',
            text: color.english,
            matched: false
        });
        // Russian card
        cards.push({
            id: color.id,
            type: 'russian',
            text: color.russian,
            matched: false
        });
    });
    
    // Shuffle cards
    shuffleArray(cards);
    
    // Create card elements
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.type}`;
        cardElement.dataset.index = index;
        cardElement.dataset.id = card.id;
        cardElement.dataset.type = card.type;
        cardElement.textContent = card.text;
        
        cardElement.addEventListener('click', () => selectCard(cardElement, index));
        gameGrid.appendChild(cardElement);
    });
    
    // Update UI
    updateStats();
    startTimer();
    feedbackElement.textContent = 'Найдите все пары цветов!';
    feedbackElement.className = 'feedback';
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

// Update statistics
function updateStats() {
    matchedPairsElement.textContent = matchedPairs;
    totalPairsElement.textContent = totalPairs;
    attemptsElement.textContent = attempts;
}

// Select a card
function selectCard(cardElement, index) {
    if (!gameActive) return;
    
    const card = cards[index];
    
    // Check if card is already matched or selected
    if (card.matched || selectedCards.includes(index)) {
        return;
    }
    
    // Add to selected cards
    selectedCards.push(index);
    cardElement.classList.add('selected');
    
    // If two cards are selected, check for match
    if (selectedCards.length === 2) {
        attempts++;
        updateStats();
        
        const [firstIndex, secondIndex] = selectedCards;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];
        
        // Check if cards match (same id, different types)
        if (firstCard.id === secondCard.id && firstCard.type !== secondCard.type) {
            // Match found
            cards[firstIndex].matched = true;
            cards[secondIndex].matched = true;
            matchedPairs++;
            
            // Update card appearance
            document.querySelector(`.card[data-index="${firstIndex}"]`).classList.add('matched');
            document.querySelector(`.card[data-index="${secondIndex}"]`).classList.add('matched');
            
            feedbackElement.textContent = `Правильно! Найдена пара: ${firstCard.text} - ${secondCard.text}`;
            feedbackElement.className = 'feedback correct';
            
            // Check if game is complete
            if (matchedPairs === totalPairs) {
                finishGame();
            }
        } else {
            // No match
            feedbackElement.textContent = 'Неверная пара. Попробуйте ещё раз!';
            feedbackElement.className = 'feedback incorrect';
            
            // Flip cards back after delay
            setTimeout(() => {
                document.querySelector(`.card[data-index="${firstIndex}"]`).classList.remove('selected');
                document.querySelector(`.card[data-index="${secondIndex}"]`).classList.remove('selected');
            }, 1000);
        }
        
        // Clear selected cards after delay
        setTimeout(() => {
            selectedCards = [];
        }, 1000);
    } else if (selectedCards.length === 1) {
        feedbackElement.textContent = 'Выберите вторую карточку';
        feedbackElement.className = 'feedback';
    }
}

// Finish the game
function finishGame() {
    gameActive = false;
    clearInterval(timerInterval);
    
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    let message = `🎉 Поздравляем! Вы нашли все ${totalPairs} пар за ${attempts} попыток и ${timeString} минут!`;
    
    if (attempts <= totalPairs * 1.5) {
        message += ' Отличный результат!';
    } else if (attempts <= totalPairs * 2) {
        message += ' Хорошая работа!';
    } else {
        message += ' Потренируйтесь ещё!';
    }
    
    feedbackElement.textContent = message;
    feedbackElement.className = 'feedback correct';
}

// Check for incorrect pairs (highlight them)
function checkIncorrectPairs() {
    if (!gameActive) return;
    
    // Find all unmatched cards
    const unmatchedCards = [];
    cards.forEach((card, index) => {
        if (!card.matched) {
            unmatchedCards.push(index);
        }
    });
    
    if (unmatchedCards.length === 0) {
        feedbackElement.textContent = 'Все пары найдены правильно!';
        feedbackElement.className = 'feedback correct';
        return;
    }
    
    // Highlight unmatched cards
    unmatchedCards.forEach(index => {
        const cardElement = document.querySelector(`.card[data-index="${index}"]`);
        cardElement.style.boxShadow = '0 0 0 4px #f1c40f';
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            cardElement.style.boxShadow = '';
        }, 2000);
    });
    
    feedbackElement.textContent = `Осталось найти ${unmatchedCards.length / 2} пар`;
    feedbackElement.className = 'feedback';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    checkButton.addEventListener('click', checkIncorrectPairs);
    
    restartButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        initGame();
    });
});

// Prevent timer from running after page unload
window.addEventListener('beforeunload', () => {
    if (timerInterval) clearInterval(timerInterval);
});