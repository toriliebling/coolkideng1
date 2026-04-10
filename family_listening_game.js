// Listening Game for family words (English -> Russian)

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
let currentQuestion = 1;
const totalQuestions = 10;
let score = 0;
let timerInterval = null;
let seconds = 0;
let correctWord = null;
let gameActive = true;

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
    updateScore();
    updateQuestionCounter();
    startTimer();
    generateQuestion();
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
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

// Generate a random question
function generateQuestion() {
    if (!gameActive) return;

    // Pick a random word
    const randomId = wordIds[Math.floor(Math.random() * wordIds.length)];
    const word = wordData[randomId];
    correctWord = word;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Create an array of possible wrong answers (russian translations of other words)
    const wrongOptions = russianWords.filter(r => r !== word.russian);
    const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 3); // pick 3 wrong

    // Combine correct and wrong options, then shuffle
    const options = [word.russian, ...shuffledWrong];
    shuffleArray(options);

    // Create buttons for each option
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, button));
        optionsContainer.appendChild(button);
    });

    // Enable play button
    playButton.onclick = () => playWordSound(randomId);
    playButton.disabled = false;
    playButton.style.opacity = '1';
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Play word sound using Web Speech API
function playWordSound(wordId) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = wordData[wordId].english;
    speech.lang = 'en-US';
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
}

// Check selected answer
function checkAnswer(selected, button) {
    if (!gameActive) return;

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });

    if (selected === correctWord.russian) {
        // Correct
        score++;
        updateScore();
        button.classList.add('correct');
        feedbackElement.textContent = 'Правильно! 👍';
        feedbackElement.style.color = '#2ecc71';
    } else {
        // Wrong
        button.classList.add('wrong');
        // Highlight correct button
        allButtons.forEach(btn => {
            if (btn.textContent === correctWord.russian) {
                btn.classList.add('correct');
            }
        });
        feedbackElement.textContent = `Неправильно. Правильный ответ: ${correctWord.russian}`;
        feedbackElement.style.color = '#e74c3c';
    }

    // Show next button
    nextButton.style.display = 'inline-block';
    gameActive = false;
}

// Move to next question
function nextQuestion() {
    if (currentQuestion >= totalQuestions) {
        endGame();
        return;
    }

    currentQuestion++;
    updateQuestionCounter();
    gameActive = true;
    generateQuestion();
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
}

// End game
function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    const timeSpent = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
    feedbackElement.innerHTML = `<strong>Игра окончена!</strong><br>Ваш счет: ${score} из ${totalQuestions}<br>Затраченное время: ${timeSpent}`;
    feedbackElement.style.color = '#1a535c';
    optionsContainer.innerHTML = '';
    playButton.disabled = true;
    playButton.style.opacity = '0.5';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', initGame);
});