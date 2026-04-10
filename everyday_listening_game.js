// Listening Game for everyday phrases (English -> Russian)

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
let correctPhrase = null;
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

// Speak a phrase using audio files from everydaysounds
function speakPhrase(englishText) {
    // Map English text to phrase ID
    const textToId = {
        'Hello': 'hello',
        'How are you': 'how-are-you',
        'Good morning': 'good-morning',
        'Good afternoon': 'good-afternoon',
        'Good evening': 'good-evening',
        'Good night': 'good-night',
        'Thank you': 'thank-you',
        'You are welcome': 'you-are-welcome',
        'Sorry': 'sorry',
        'Excuse me': 'excuse-me',
        'Yes': 'yes',
        'No': 'no',
        'Please': 'please',
        'What is your name': 'what-is-your-name',
        'My name is': 'my-name-is',
        'Nice to meet you': 'nice-to-meet-you'
    };
    
    const phraseId = textToId[englishText];
    if (!phraseId) {
        console.error('Phrase ID not found for text:', englishText);
        return;
    }
    
    // Map phrase ID to audio file
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
    correctPhrase = phrase.russian;

    // Generate answer options (correct + 3 random incorrect)
    let options = [correctPhrase];
    while (options.length < 4) {
        const randomRussian = russianPhrases[getRandomInt(0, russianPhrases.length - 1)];
        if (!options.includes(randomRussian)) {
            options.push(randomRussian);
        }
    }
    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);

    // Create option buttons
    options.forEach(russian => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = russian;
        button.addEventListener('click', () => handleAnswer(russian));
        optionsContainer.appendChild(button);
    });

    // Speak the phrase after a short delay
    setTimeout(() => speakPhrase(phrase.english), 500);
}

// Handle answer selection
function handleAnswer(selectedRussian) {
    if (!gameActive) return;

    // Disable all buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctPhrase) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedRussian && selectedRussian !== correctPhrase) {
            btn.classList.add('wrong');
        }
    });

    // Check correctness
    if (selectedRussian === correctPhrase) {
        score++;
        updateScore();
        feedbackElement.textContent = 'Правильно! (Correct!)';
        feedbackElement.style.color = '#2ecc71';
    } else {
        feedbackElement.textContent = `Неправильно. Правильный ответ: ${correctPhrase}.`;
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
    feedbackElement.textContent = `Игра завершена! Ваш счет: ${score} из ${totalQuestions}. Время: ${timerElement.textContent}.`;
    feedbackElement.style.color = '#1a535c';
    nextButton.style.display = 'none';
    if (questionArea) questionArea.style.display = 'none';
}

// Event listeners
playButton.addEventListener('click', () => {
    if (correctPhrase) {
        // Find the English phrase for the current correct answer
        const phraseId = phraseIds.find(id => phraseData[id].russian === correctPhrase);
        if (phraseId) {
            speakPhrase(phraseData[phraseId].english);
        }
    }
});
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    initGame();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initGame);