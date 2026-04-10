// Функция для воспроизведения произношения числа из аудиофайлов
function playNumberSound(number, event) {
    // Создаем mapping между числами и именами файлов
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

    // Создаем и воспроизводим аудио
    const audio = new Audio(`numberssound/${audioFile}`);
    audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
    });

    // Визуальная обратная связь
    const button = event?.target;
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }
}

// Возвращает английское слово для числа
function getNumberWord(num) {
    const words = {
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
    return words[num] || num.toString();
}

// Возвращает русский перевод числа
function getNumberTranslation(num) {
    const translations = {
        1: 'один',
        2: 'два',
        3: 'три',
        4: 'четыре',
        5: 'пять',
        6: 'шесть',
        7: 'семь',
        8: 'восемь',
        9: 'девять',
        10: 'десять'
    };
    return translations[num] || '';
}

// Данные о числах (факты и примеры)
const numberData = {
    1: {
        fact: 'Число 1 обозначает единичность, начало счета.',
        examples: [
            'One apple – одно яблоко',
            'One book – одна книга',
            'One day – один день'
        ]
    },
    2: {
        fact: 'Число 2 символизирует пару, двойственность.',
        examples: [
            'Two cats – два кота',
            'Two eyes – два глаза',
            'Two hands – две руки'
        ]
    },
    3: {
        fact: 'Число 3 часто встречается в сказках и поговорках.',
        examples: [
            'Three bears – три медведя',
            'Three little pigs – три поросенка',
            'Three colors – три цвета'
        ]
    },
    4: {
        fact: 'Число 4 ассоциируется с квадратом, стабильностью.',
        examples: [
            'Four seasons – четыре времени года',
            'Four legs of a chair – четыре ножки стула',
            'Four wheels of a car – четыре колеса машины'
        ]
    },
    5: {
        fact: 'Число 5 — это количество пальцев на одной руке.',
        examples: [
            'Five fingers – пять пальцев',
            'Five senses – пять чувств',
            'Five stars – пять звезд'
        ]
    },
    6: {
        fact: 'Число 6 считается совершенным числом в математике.',
        examples: [
            'Six sides of a cube – шесть сторон куба',
            'Six strings on a guitar – шесть струн гитары',
            'Six eggs – шесть яиц'
        ]
    },
    7: {
        fact: 'Число 7 часто считается счастливым.',
        examples: [
            'Seven days in a week – семь дней в неделе',
            'Seven colors of the rainbow – семь цветов радуги',
            'Seven wonders of the world – семь чудес света'
        ]
    },
    8: {
        fact: 'Число 8 символизирует бесконечность (перевернутый знак бесконечности).',
        examples: [
            'Eight legs of a spider – восемь ног паука',
            'Eight planets in the Solar System – восемь планет в Солнечной системе',
            'Eight notes in an octave – восемь нот в октаве'
        ]
    },
    9: {
        fact: 'Число 9 — это квадрат числа 3.',
        examples: [
            'Nine lives of a cat – девять жизней кошки',
            'Nine months of pregnancy – девять месяцев беременности',
            'Nine players in a baseball team – девять игроков в бейсбольной команде'
        ]
    },
    10: {
        fact: 'Число 10 — основа десятичной системы счисления.',
        examples: [
            'Ten fingers – десять пальцев',
            'Ten commandments – десять заповедей',
            'Ten years – десять лет'
        ]
    }
};

// Функция для открытия попапа с информацией о числе
function showNumberPopup(number, cardElement) {
    const data = numberData[number];
    if (!data) return;

    document.getElementById('popup-number').textContent = number;
    document.getElementById('popup-number-word').textContent = getNumberWord(number).charAt(0).toUpperCase() + getNumberWord(number).slice(1);
    document.getElementById('popup-fact').textContent = data.fact;

    const examplesList = document.getElementById('popup-examples');
    examplesList.innerHTML = '';
    data.examples.forEach(example => {
        const li = document.createElement('li');
        li.textContent = example;
        examplesList.appendChild(li);
    });


    const popup = document.getElementById('number-popup');
    popup.style.display = 'flex';

    // Позиционирование попапа рядом с карточкой (опционально)
    if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const section = document.querySelector('.numbers-section');
        const sectionRect = section.getBoundingClientRect();

        // Центрируем попап по горизонтали относительно карточки
        let left = cardRect.left + (cardRect.width - popupRect.width) / 2;
        left = Math.max(10, Math.min(left, window.innerWidth - popupRect.width - 10));

        // Размещаем под карточкой, если места достаточно, иначе над
        let top = cardRect.bottom + 10;
        if (top + popupRect.height > window.innerHeight - 10) {
            top = cardRect.top - popupRect.height - 10;
        }
        top = Math.max(10, Math.min(top, window.innerHeight - popupRect.height - 10));

        popup.style.position = 'fixed';
        popup.style.top = top + 'px';
        popup.style.left = left + 'px';
    }
}

// Функция для закрытия попапа
function closeNumberPopup() {
    const popup = document.getElementById('number-popup');
    popup.style.display = 'none';
}

// Закрытие попапа при клике вне его содержимого
window.addEventListener('click', function(event) {
    const popup = document.getElementById('number-popup');
    if (event.target === popup) {
        closeNumberPopup();
    }
});

// Обработчики для карточек чисел (открытие попапа при клике на карточку)
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.number-card');
    cards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Если клик был по кнопке воспроизведения, не открываем попап
            if (event.target.classList.contains('number-btn')) {
                return;
            }
            const number = parseInt(this.getAttribute('data-number'));
            showNumberPopup(number, this);
        });
    });
});

// ==================== ИГРА "СОПОСТАВЛЕНИЕ" ====================

let gameTimer = null;
let gameSeconds = 0;
let gameMoves = 0;
let gamePairsFound = 0;
let gameCards = [];
let flippedCards = [];
let canFlip = true;

// DOM элементы
const timerElement = document.getElementById('timer') || document.getElementById('game-timer');
const matchedPairsElement = document.getElementById('matched-pairs') || document.getElementById('game-pairs');
const totalPairsElement = document.getElementById('total-pairs');
const attemptsElement = document.getElementById('attempts') || document.getElementById('game-moves');
const feedbackElement = document.getElementById('feedback');
const checkButton = document.getElementById('check-btn');

// Данные для карточек: русское слово и его английский перевод
const cardData = [
    { id: 1, type: 'russian', content: 'Один', match: 'One' },
    { id: 2, type: 'english', content: 'One', match: 'Один' },
    { id: 3, type: 'russian', content: 'Два', match: 'Two' },
    { id: 4, type: 'english', content: 'Two', match: 'Два' },
    { id: 5, type: 'russian', content: 'Три', match: 'Three' },
    { id: 6, type: 'english', content: 'Three', match: 'Три' },
    { id: 7, type: 'russian', content: 'Четыре', match: 'Four' },
    { id: 8, type: 'english', content: 'Four', match: 'Четыре' },
    { id: 9, type: 'russian', content: 'Пять', match: 'Five' },
    { id: 10, type: 'english', content: 'Five', match: 'Пять' },
    { id: 11, type: 'russian', content: 'Шесть', match: 'Six' },
    { id: 12, type: 'english', content: 'Six', match: 'Шесть' },
    { id: 13, type: 'russian', content: 'Семь', match: 'Seven' },
    { id: 14, type: 'english', content: 'Seven', match: 'Семь' },
    { id: 15, type: 'russian', content: 'Восемь', match: 'Eight' },
    { id: 16, type: 'english', content: 'Eight', match: 'Восемь' },
    { id: 17, type: 'russian', content: 'Девять', match: 'Nine' },
    { id: 18, type: 'english', content: 'Nine', match: 'Девять' },
    { id: 19, type: 'russian', content: 'Десять', match: 'Ten' },
    { id: 20, type: 'english', content: 'Ten', match: 'Десять' }
];

// Запуск игры
function startMatchingGame() {
    // Показать модальное окно
    document.getElementById('matching-game-modal').style.display = 'flex';
    // Инициализация игры
    initGame();
    // Запуск таймера
    startTimer();
}

// Закрытие игры
function closeMatchingGame() {
    document.getElementById('matching-game-modal').style.display = 'none';
    stopTimer();
    resetGame();
}

// Перезапуск игры
function restartMatchingGame() {
    resetGame();
    initGame();
    startTimer();
}

// Инициализация игры: создание карточек
function initGame() {
    const grid = document.getElementById('matching-grid');
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
        
        const front = document.createElement('div');
        front.className = 'card-front';
        front.textContent = '?';
        
        const back = document.createElement('div');
        back.className = 'card-back';
        back.textContent = card.type === 'english' ? card.content.toUpperCase() : card.content;
        
        cardElement.appendChild(front);
        cardElement.appendChild(back);
        
        cardElement.addEventListener('click', () => flipCard(cardElement));
        grid.appendChild(cardElement);
    });

    // Привязываем кнопку "Проверить"
    if (checkButton) {
        checkButton.addEventListener('click', checkIncorrectMatches);
    }
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
    
    if (content1 === match2 && content2 === match1) {
        // Совпадение
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            canFlip = true;
            gamePairsFound++;
            updateStats();
            
            // Показать позитивный фидбэк
            if (feedbackElement) {
                feedbackElement.textContent = `✅ Правильно! Найдена пара: ${content1} - ${content2}`;
                feedbackElement.className = 'feedback correct';
            }
            
            checkWin();
        }, 500);
    } else {
        // Не совпало
        if (feedbackElement) {
            feedbackElement.textContent = '❌ Неправильная пара. Попробуйте ещё раз!';
            feedbackElement.className = 'feedback incorrect';
        }
        
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
            // Очистить фидбэк через секунду
            setTimeout(() => {
                if (feedbackElement) {
                    feedbackElement.textContent = '';
                    feedbackElement.className = 'feedback';
                }
            }, 1000);
        }, 1000);
    }
}

// Проверка победы
function checkWin() {
    if (gamePairsFound === 10) {
        stopTimer();
        if (feedbackElement) {
            feedbackElement.textContent = `🎉 Поздравляем! Вы нашли все пары за ${gameSeconds} секунд и ${gameMoves} попыток.`;
            feedbackElement.className = 'feedback correct';
        }
        setTimeout(() => {
            alert(`Поздравляем! Вы нашли все пары за ${gameSeconds} секунд и ${gameMoves} попыток.`);
        }, 300);
    }
}

// Обновление статистики
function updateStats() {
    if (attemptsElement) attemptsElement.textContent = gameMoves;
    if (matchedPairsElement) matchedPairsElement.textContent = gamePairsFound;
    if (totalPairsElement) totalPairsElement.textContent = '10';
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
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (timerElement) timerElement.textContent = timeString;
}

// Сброс игры
function resetGame() {
    stopTimer();
    gameSeconds = 0;
    gameMoves = 0;
    gamePairsFound = 0;
    flippedCards = [];
    canFlip = true;
    updateStats();
    updateTimerDisplay();
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
        if (feedbackElement) {
            feedbackElement.textContent = 'Неправильные пары выделены красным';
            feedbackElement.className = 'feedback incorrect';
        }
    } else {
        if (feedbackElement) {
            feedbackElement.textContent = 'Все открытые карточки правильные!';
            feedbackElement.className = 'feedback correct';
        }
    }
}

// Заглушки для других игр
function startCountingGame() {
    window.location.href = 'counting_game.html';
}

function startListeningGame() {
    window.location.href = 'listening_game.html';
}