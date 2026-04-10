// Matching Game for clothing (English - Russian)

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
let selectedCards = [];
let matchedPairs = 0;
let totalPairs = clothingItems.length;
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
    clothingItems.forEach(item => {
        // English card
        cards.push({
            id: item.id,
            type: 'english',
            text: item.english,
            matched: false
        });
        // Russian card
        cards.push({
            id: item.id,
            type: 'russian',
            text: item.russian,
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
        
        // Create front and back content
        const front = document.createElement('div');
        front.className = 'front';
        front.textContent = '?';
        
        const back = document.createElement('div');
        back.className = 'back';
        back.textContent = card.text;
        
        cardElement.appendChild(front);
        cardElement.appendChild(back);
        
        cardElement.addEventListener('click', () => selectCard(cardElement, index));
        gameGrid.appendChild(cardElement);
    });
    
    // Update UI
    updateStats();
    startTimer();
    feedbackElement.textContent = 'Найдите все пары одежды!';
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
    
    // Ignore if card is already matched, flipped, or if two cards are already selected
    if (card.matched || cardElement.classList.contains('flipped') || selectedCards.length >= 2) {
        return;
    }
    
    // Flip the card
    cardElement.classList.add('flipped');
    selectedCards.push({ element: cardElement, index, card });
    
    // If two cards are selected, check for match
    if (selectedCards.length === 2) {
        attempts++;
        updateStats();
        
        const card1 = selectedCards[0];
        const card2 = selectedCards[1];
        
        // Check if cards match (same id, different types)
        if (card1.card.id === card2.card.id && card1.card.type !== card2.card.type) {
            // Match found
            cards[card1.index].matched = true;
            cards[card2.index].matched = true;
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            
            matchedPairs++;
            updateStats();
            
            feedbackElement.textContent = `✅ Правильно! Найдена пара: ${card1.card.text} - ${card2.card.text}`;
            feedbackElement.className = 'feedback correct';
            
            selectedCards = [];
            
            // Check if game is complete
            if (matchedPairs === totalPairs) {
                endGame();
            }
        } else {
            // No match
            feedbackElement.textContent = '❌ Неправильная пара. Попробуйте ещё раз!';
            feedbackElement.className = 'feedback incorrect';
            
            // Flip cards back after delay
            setTimeout(() => {
                card1.element.classList.remove('flipped');
                card2.element.classList.remove('flipped');
                selectedCards = [];
            }, 1500);
        }
    } else {
        // Only one card selected
        feedbackElement.textContent = 'Выберите вторую карточку';
        feedbackElement.className = 'feedback';
    }
}

// Check for incorrect matches (helper function for check button)
function checkIncorrectMatches() {
    if (!gameActive) return;
    
    const allCards = document.querySelectorAll('.card');
    let incorrectFound = false;
    
    allCards.forEach(cardElement => {
        const index = parseInt(cardElement.dataset.index);
        const card = cards[index];
        
        if (!card.matched && cardElement.classList.contains('flipped')) {
            cardElement.style.boxShadow = '0 0 10px 3px #e74c3c';
            incorrectFound = true;
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                cardElement.style.boxShadow = '';
            }, 3000);
        }
    });
    
    if (incorrectFound) {
        feedbackElement.textContent = 'Неправильные пары выделены красным';
        feedbackElement.className = 'feedback incorrect';
    } else {
        feedbackElement.textContent = 'Все открытые карточки правильные!';
        feedbackElement.className = 'feedback correct';
    }
}

// End the game
function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    let message = `🎉 Поздравляем! Вы нашли все ${totalPairs} пар за ${timeString} и ${attempts} попыток!`;
    
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

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    checkButton.addEventListener('click', checkIncorrectMatches);
    
    restartButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        initGame();
    });
});

// Prevent timer from running after page unload
window.addEventListener('beforeunload', () => {
    if (timerInterval) clearInterval(timerInterval);
});