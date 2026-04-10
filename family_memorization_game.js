// Memorization Game for family words (English -> Russian)

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

const wordIds = Object.keys(wordData);
const englishWords = wordIds.map(id => wordData[id].english);
const russianWords = wordIds.map(id => wordData[id].russian);

// Game state
let studiedCount = 0;
let testScore = 0;
let timerInterval = null;
let seconds = 0;
let currentWordIndex = 0;
let testMode = false;
let testQuestions = [];
let currentTestQuestion = 0;
let testCorrectAnswer = null;

// DOM elements
const wordDisplay = document.getElementById('word-display');
const translationDisplay = document.getElementById('translation-display');
const studiedCountElement = document.getElementById('studied-count');
const testScoreElement = document.getElementById('test-score');
const timerElement = document.getElementById('timer');
const showTranslationBtn = document.getElementById('show-translation-btn');
const nextWordBtn = document.getElementById('next-word-btn');
const startTestBtn = document.getElementById('start-test-btn');
const studyArea = document.getElementById('study-area');
const testArea = document.getElementById('test-area');
const testQuestionElement = document.getElementById('test-question');
const testOptionsContainer = document.getElementById('test-options');
const testFeedbackElement = document.getElementById('test-feedback');
const finalScoreElement = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Initialize game
function initGame() {
    studiedCount = 0;
    testScore = 0;
    seconds = 0;
    currentWordIndex = 0;
    testMode = false;
    testQuestions = [];
    currentTestQuestion = 0;
    updateStudiedCount();
    updateTestScore();
    startTimer();
    showStudyMode();
    loadCurrentWord();
    finalScoreElement.style.display = 'none';
}

// Start timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update studied count
function updateStudiedCount() {
    studiedCountElement.textContent = `${studiedCount} / 12`;
}

// Update test score
function updateTestScore() {
    testScoreElement.textContent = testScore;
}

// Load current word for study
function loadCurrentWord() {
    if (currentWordIndex >= wordIds.length) {
        // All words studied
        wordDisplay.textContent = 'Все слова изучены!';
        translationDisplay.textContent = 'Нажмите "Начать тест"';
        showTranslationBtn.disabled = true;
        nextWordBtn.disabled = true;
        startTestBtn.disabled = false;
        return;
    }
    const wordId = wordIds[currentWordIndex];
    const word = wordData[wordId];
    wordDisplay.textContent = word.english;
    translationDisplay.textContent = '???';
    showTranslationBtn.disabled = false;
    nextWordBtn.disabled = false;
}

// Show translation
function showTranslation() {
    const wordId = wordIds[currentWordIndex];
    const word = wordData[wordId];
    translationDisplay.textContent = word.russian;
    if (studiedCount <= currentWordIndex) {
        studiedCount++;
        updateStudiedCount();
    }
}

// Move to next word
function nextWord() {
    currentWordIndex++;
    loadCurrentWord();
}

// Switch to test mode
function startTest() {
    testMode = true;
    studyArea.style.display = 'none';
    testArea.style.display = 'block';
    // Prepare test questions (random selection of 10 words)
    const shuffled = [...wordIds].sort(() => Math.random() - 0.5).slice(0, 10);
    testQuestions = shuffled;
    currentTestQuestion = 0;
    loadTestQuestion();
}

// Load a test question
function loadTestQuestion() {
    if (currentTestQuestion >= testQuestions.length) {
        endTest();
        return;
    }
    const wordId = testQuestions[currentTestQuestion];
    const word = wordData[wordId];
    testQuestionElement.textContent = `Как переводится слово "${word.english}"?`;
    testCorrectAnswer = word.russian;

    // Generate options (correct + 3 random wrong)
    const wrongOptions = russianWords.filter(r => r !== word.russian);
    const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [word.russian, ...shuffledWrong];
    shuffleArray(options);

    // Clear previous options
    testOptionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'test-option-btn';
        button.textContent = option;
        button.addEventListener('click', () => checkTestAnswer(option, button));
        testOptionsContainer.appendChild(button);
    });

    testFeedbackElement.textContent = '';
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Check test answer
function checkTestAnswer(selected, button) {
    const allButtons = document.querySelectorAll('.test-option-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });

    if (selected === testCorrectAnswer) {
        button.classList.add('correct');
        testScore++;
        updateTestScore();
        testFeedbackElement.textContent = 'Правильно! 👍';
        testFeedbackElement.style.color = '#2ecc71';
    } else {
        button.classList.add('wrong');
        allButtons.forEach(btn => {
            if (btn.textContent === testCorrectAnswer) {
                btn.classList.add('correct');
            }
        });
        testFeedbackElement.textContent = `Неправильно. Правильный ответ: ${testCorrectAnswer}`;
        testFeedbackElement.style.color = '#e74c3c';
    }

    // Move to next question after delay
    setTimeout(() => {
        currentTestQuestion++;
        loadTestQuestion();
    }, 1500);
}

// End test
function endTest() {
    testArea.style.display = 'none';
    finalScoreElement.style.display = 'block';
    finalScoreElement.innerHTML = `<strong>Тест завершен!</strong><br>Ваш счет: ${testScore} из ${testQuestions.length}<br>Затраченное время: ${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
    finalScoreElement.style.color = '#1a535c';
    clearInterval(timerInterval);
}

// Show study mode
function showStudyMode() {
    studyArea.style.display = 'block';
    testArea.style.display = 'none';
    finalScoreElement.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    showTranslationBtn.addEventListener('click', showTranslation);
    nextWordBtn.addEventListener('click', nextWord);
    startTestBtn.addEventListener('click', startTest);
    restartBtn.addEventListener('click', initGame);
});