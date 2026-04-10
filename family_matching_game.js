// Matching Game for family words (English - Russian)

// Данные слов из family.js
const wordData = {
    'mother': {
        english: 'Mother',
        russian: 'Мама'
    },
    'father': {
        english: 'Father',
        russian: 'Папа'
    },
    'sister': {
        english: 'Sister',
        russian: 'Сестра'
    },
    'brother': {
        english: 'Brother',
        russian: 'Брат'
    },
    'grandmother': {
        english: 'Grandmother',
        russian: 'Бабушка'
    },
    'grandfather': {
        english: 'Grandfather',
        russian: 'Дедушка'
    },
    'aunt': {
        english: 'Aunt',
        russian: 'Тётя'
    },
    'uncle': {
        english: 'Uncle',
        russian: 'Дядя'
    },
    'cousin': {
        english: 'Cousin',
        russian: 'Двоюродный брат/сестра'
    },
    'son': {
        english: 'Son',
        russian: 'Сын'
    },
    'daughter': {
        english: 'Daughter',
        russian: 'Дочь'
    },
    'family': {
        english: 'Family',
        russian: 'Семья'
    }
};

// Создаем массив карточек: каждая пара - английское слово и русский перевод
const cardData = [];
Object.keys(wordData).forEach((id, index) => {
    const word = wordData[id];
    // Карточка с английским текстом
    cardData.push({
        id: index * 2,
        type: 'english',
        content: word.english,
        match: word.russian,
        pairId: id
    });
    // Карточка с русским переводом
    cardData.push({
        id: index * 2 + 1,
        type: 'russian',
        content: word.russian,
        match: word.english,
        pairId: id
    });
});

// Игровые переменные
let gameTimer = null;
let gameSeconds = 0;
let gameMoves = 0;
let gamePairsFound = 0;
let gameCards = [];
let flippedCards = [];
let canFlip = true;

// DOM элементы
const grid = document.getElementById('matching-grid');
const timerElement = document.getElementById('game-timer');
const movesElement = document.getElementById('game-moves');
const pairsElement = document.getElementById('game-pairs');

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initGame();
    startTimer();
});

// Инициализация игры: создание карточек
function initGame() {
    grid.innerHTML = '';
    // Перемешиваем карточки
    const shuffled = [...cardData].sort(() => Math.random() - 0.5);
    gameCards = shuffled;
    flippedCards = [];
    canFlip = true;
    gameMoves = 0;
    gamePairsFound = 0;
    updateStats();
    
    // Создаем карточки
    shuffled.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'game-card';
        cardElement.dataset.id = card.id;
        cardElement.dataset.type = card.type;
        cardElement.dataset.content = card.content;
        cardElement.dataset.match = card.match;
        cardElement.dataset.pairId = card.pairId;
        
        const front = document.createElement('div');
        front.className = 'card-front';
        front.textContent = '?';
        
        const back = document.createElement('div');
        back.className = 'card-back';
        back.textContent = card.content;
        
        cardElement.appendChild(front);
        cardElement.appendChild(back);
        
        cardElement.addEventListener('click', () => flipCard(cardElement));
        grid.appendChild(cardElement);
    });
}

// Переворот карточки
function flipCard(card) {
    if (!canFlip) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        gameMoves++;
        updateStats();
        checkMatch();
    }
}

// Проверка совпадения
function checkMatch() {
    const [card1, card2] = flippedCards;
    const content1 = card1.dataset.content;
    const content2 = card2.dataset.content;
    const match1 = card1.dataset.match;
    const match2 = card2.dataset.match;
    const pairId1 = card1.dataset.pairId;
    const pairId2 = card2.dataset.pairId;
    
    if (pairId1 === pairId2) {
        // Совпадение (одна и та же пара)
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            canFlip = true;
            gamePairsFound++;
            updateStats();
            checkWin();
        }, 500);
    } else {
        // Не совпало
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// Проверка победы
function checkWin() {
    if (gamePairsFound === 12) {
        stopTimer();
        setTimeout(() => {
            alert(`Поздравляем! Вы нашли все пары за ${gameSeconds} секунд и ${gameMoves} ходов.`);
        }, 300);
    }
}

// Обновление статистики
function updateStats() {
    movesElement.textContent = gameMoves;
    pairsElement.textContent = `${gamePairsFound} / 12`;
}

// Таймер
function startTimer() {
    stopTimer();
    gameSeconds = 0;
    updateTimerDisplay();
    gameTimer = setInterval(() => {
        gameSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(gameSeconds / 60);
    const seconds = gameSeconds % 60;
    timerElement.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Перезапуск игры
function restartMatchingGame() {
    stopTimer();
    initGame();
    startTimer();
}

// Подсказка (показывает все карточки на 2 секунды)
function giveHint() {
    if (!canFlip) return;
    const cards = document.querySelectorAll('.game-card:not(.flipped):not(.matched)');
    cards.forEach(card => card.classList.add('flipped'));
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flipped'));
    }, 2000);
}