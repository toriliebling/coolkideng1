// Memorization Game for everyday phrases (Russian -> English)

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

const phraseIds = Object.keys(phraseData);
const englishPhrases = phraseIds.map(id => phraseData[id].english);
const russianPhrases = phraseIds.map(id => phraseData[id].russian);

// Game state
let currentQuestion = 1;
const totalQuestions = 10;
let score = 0;
let timerInterval = null;
let seconds = 0;
let correctAnswer = null;
let gameActive = true;

// DOM elements
const phraseDisplay = document.getElementById('phrase-display');
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

    // Clear previous options
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';

    // Pick a random phrase
    const randomIndex = getRandomInt(0, phraseIds.length - 1);
    const phraseId = phraseIds[randomIndex];
    const phrase = phraseData[phraseId];
    correctAnswer = phrase.english;

    // Display Russian translation
    phraseDisplay.textContent = phrase.russian;

    // Generate answer options (correct + 3 random incorrect)
    let options = [correctAnswer];
    while (options.length < 4) {
        const randomEnglish = englishPhrases[getRandomInt(0, englishPhrases.length - 1)];
        if (!options.includes(randomEnglish)) {
            options.push(randomEnglish);
        }
    }
    options = shuffleArray(options);

    // Create option buttons
    options.forEach(english => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = english;
        button.addEventListener('click', () => handleAnswer(english));
        optionsContainer.appendChild(button);
    });
}

// Handle answer selection
function handleAnswer(selectedEnglish) {
    if (!gameActive) return;

    // Disable all buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedEnglish && selectedEnglish !== correctAnswer) {
            btn.classList.add('wrong');
        }
    });

    // Check correctness
    if (selectedEnglish === correctAnswer) {
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
    optionsContainer.innerHTML = '';
    phraseDisplay.textContent = '🎉';
    feedbackElement.textContent = `Игра завершена! Ваш счет: ${score} из ${totalQuestions}. Время: ${timerElement.textContent}.`;
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