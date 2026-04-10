// Matching Game for everyday phrases (English - Russian)

// Данные фраз из everyday.js
const phraseData = {
    'hello': {
        english: 'Hello',
        russian: 'Привет'
    },
    'how-are-you': {
        english: 'How are you',
        russian: 'Как дела?'
    },
    'good-morning': {
        english: 'Good morning',
        russian: 'Доброе утро'
    },
    'good-afternoon': {
        english: 'Good afternoon',
        russian: 'Добрый день'
    },
    'good-evening': {
        english: 'Good evening',
        russian: 'Добрый вечер'
    },
    'good-night': {
        english: 'Good night',
        russian: 'Спокойной ночи'
    },
    'thank-you': {
        english: 'Thank you',
        russian: 'Спасибо'
    },
    'you-are-welcome': {
        english: 'You are welcome',
        russian: 'Пожалуйста'
    },
    'sorry': {
        english: 'Sorry',
        russian: 'Извините'
    },
    'excuse-me': {
        english: 'Excuse me',
        russian: 'Простите'
    },
    'yes': {
        english: 'Yes',
        russian: 'Да'
    },
    'no': {
        english: 'No',
        russian: 'Нет'
    },
    'please': {
        english: 'Please',
        russian: 'Пожалуйста'
    },
    'what-is-your-name': {
        english: 'What is your name',
        russian: 'Как тебя зовут?'
    },
    'my-name-is': {
        english: 'My name is',
        russian: 'Меня зовут...'
    },
    'nice-to-meet-you': {
        english: 'Nice to meet you',
        russian: 'Приятно познакомиться'
    }
};

// Функция для воспроизведения звука фразы
function playPhraseSound(phraseId) {
    const audioMap = {
        'hello': 'pronunciation_en_hello.mp3',
        'how-are-you': 'pronunciation_en_how_are_you_.mp3',
        'good-morning': 'pronunciation_en_good_morning.mp3',
        'good-afternoon': 'pronunciation_en_good_afternoon.mp3',
        'good-evening': 'pronunciation_en_good_evening.mp3',
        'good-night': 'pronunciation_en_good_night.mp3',
        'thank-you': 'pronunciation_en_thank_you.mp3',
        'you-are-welcome': 'pronunciation_en_you_are_welcome.mp3',
        'sorry': 'pronunciation_en_sorry.mp3',
        'excuse-me': 'pronunciation_en_excuse_me.mp3',
        'yes': 'yes.mp3',
        'no': 'no.mp3',
        'please': 'pronunciation_en_please.mp3',
        'what-is-your-name': 'pronunciation_en_what_is_your_name_.mp3',
        'my-name-is': 'pronunciation_en_my_name_is_....mp3',
        'nice-to-meet-you': 'pronunciation_en_nice_to_meet_you.mp3'
    };
    
    const audioFile = audioMap[phraseId];
    if (!audioFile) {
        console.error('Audio file not found for phrase:', phraseId);
        return;
    }
    
    const audioPath = `sounds_sounds_words/everydaysounds/${audioFile}`;
    const audio = new Audio(audioPath);
    audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
    });
}

// Создаем массив карточек: каждая пара - английская фраза и русский перевод
const cardData = [];
Object.keys(phraseData).forEach((id, index) => {
    const phrase = phraseData[id];
    // Карточка с английским текстом
    cardData.push({
        id: index * 2,
        type: 'english',
        content: phrase.english,
        match: phrase.russian,
        pairId: id
    });
    // Карточка с русским переводом
    cardData.push({
        id: index * 2 + 1,
        type: 'russian',
        content: phrase.russian,
        match: phrase.english,
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
const grid = document.getElementById('game-grid');
const timerElement = document.getElementById('timer');
const matchedPairsElement = document.getElementById('matched-pairs');
const totalPairsElement = document.getElementById('total-pairs');
const attemptsElement = document.getElementById('attempts');
const feedbackElement = document.getElementById('feedback');
const checkButton = document.getElementById('check-btn');

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initGame();
    startTimer();
    
    // Добавляем обработчик для кнопки "Проверить"
    if (checkButton) {
        checkButton.addEventListener('click', checkIncorrectMatches);
    }
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
            
            // Показать позитивный фидбэк
            feedbackElement.textContent = `✅ Правильно! Найдена пара: ${content1} - ${content2}`;
            feedbackElement.className = 'feedback correct';
            
            checkWin();
        }, 500);
    } else {
        // Не совпало
        feedbackElement.textContent = '❌ Неправильная пара. Попробуйте ещё раз!';
        feedbackElement.className = 'feedback incorrect';
        
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
            // Очистить фидбэк через секунду
            setTimeout(() => {
                feedbackElement.textContent = '';
                feedbackElement.className = 'feedback';
            }, 1000);
        }, 1000);
    }
}

// Проверка победы
function checkWin() {
    if (gamePairsFound === 12) {
        stopTimer();
        feedbackElement.textContent = `🎉 Поздравляем! Вы нашли все пары за ${gameSeconds} секунд и ${gameMoves} попыток.`;
        feedbackElement.className = 'feedback correct';
        setTimeout(() => {
            alert(`Поздравляем! Вы нашли все пары за ${gameSeconds} секунд и ${gameMoves} попыток.`);
        }, 300);
    }
}

// Обновление статистики
function updateStats() {
    attemptsElement.textContent = gameMoves;
    matchedPairsElement.textContent = gamePairsFound;
    totalPairsElement.textContent = '12';
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

// Проверка неправильных совпадений (функция для кнопки "Проверить")
function checkIncorrectMatches() {
    if (!canFlip) return;
    
    const allCards = document.querySelectorAll('.game-card');
    let incorrectFound = false;
    
    allCards.forEach(cardElement => {
        if (!cardElement.classList.contains('matched') && cardElement.classList.contains('flipped')) {
            cardElement.style.boxShadow = '0 0 10px 3px #e74c3c';
            incorrectFound = true;
            
            // Убрать выделение через 3 секунды
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