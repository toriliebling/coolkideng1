// Функция для воспроизведения произношения фразы из аудиофайлов
function playPhraseSound(phraseId) {
    // Карта соответствия ID фраз и имен аудиофайлов
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
        console.error('Аудиофайл не найден для фразы:', phraseId);
        return;
    }

    const audioPath = `sounds_sounds_words/everydaysounds/${audioFile}`;
    const audio = new Audio(audioPath);

    // Визуальная обратная связь
    const button = event?.target;
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }

    audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
    });
}

// Возвращает английский текст для фразы
function getPhraseText(id) {
    const phrases = {
        'hello': 'Hello',
        'how-are-you': 'How are you',
        'good-morning': 'Good morning',
        'good-afternoon': 'Good afternoon',
        'good-evening': 'Good evening',
        'good-night': 'Good night',
        'thank-you': 'Thank you',
        'you-are-welcome': 'You are welcome',
        'sorry': 'Sorry',
        'excuse-me': 'Excuse me',
        'yes': 'Yes',
        'no': 'No',
        'please': 'Please',
        'what-is-your-name': 'What is your name',
        'my-name-is': 'My name is',
        'nice-to-meet-you': 'Nice to meet you'
    };
    return phrases[id] || id;
}

// Возвращает русский перевод фразы
function getPhraseTranslation(id) {
    const translations = {
        'hello': 'Привет',
        'how-are-you': 'Как дела?',
        'good-morning': 'Доброе утро',
        'good-afternoon': 'Добрый день',
        'good-evening': 'Добрый вечер',
        'good-night': 'Спокойной ночи',
        'thank-you': 'Спасибо',
        'you-are-welcome': 'Пожалуйста',
        'sorry': 'Извините',
        'excuse-me': 'Простите',
        'yes': 'Да',
        'no': 'Нет',
        'please': 'Пожалуйста',
        'what-is-your-name': 'Как тебя зовут?',
        'my-name-is': 'Меня зовут...',
        'nice-to-meet-you': 'Приятно познакомиться'
    };
    return translations[id] || '';
}

// Данные о фразах (факты и примеры)
const phraseData = {
    'hello': {
        fact: 'Базовая фраза для приветствия.',
        examples: [
            'Hello, my name is Anna.',
            'Hello, how are you?',
            'Hello, nice to meet you.'
        ]
    },
    'how-are-you': {
        fact: 'Вопрос о самочувствии или настроении.',
        examples: [
            'How are you today?',
            'How are you feeling?',
            'How are you doing?'
        ]
    },
    'good-morning': {
        fact: 'Приветствие, используемое до полудня.',
        examples: [
            'Good morning, everyone!',
            'Good morning, teacher.',
            'Good morning, have a nice day.'
        ]
    },
    'good-afternoon': {
        fact: 'Приветствие, используемое после полудня до вечера.',
        examples: [
            'Good afternoon, ladies and gentlemen.',
            'Good afternoon, may I help you?',
            'Good afternoon, the meeting starts at 2 PM.'
        ]
    },
    'good-evening': {
        fact: 'Приветствие, используемое вечером.',
        examples: [
            'Good evening, welcome to the party.',
            'Good evening, how was your day?',
            'Good evening, the show begins at 8.'
        ]
    },
    'good-night': {
        fact: 'Фраза для пожелания спокойной ночи.',
        examples: [
            'Good night, sleep well.',
            'Good night, see you tomorrow.',
            'Good night, sweet dreams.'
        ]
    },
    'thank-you': {
        fact: 'Выражение благодарности.',
        examples: [
            'Thank you for your help.',
            'Thank you very much.',
            'Thank you, I appreciate it.'
        ]
    },
    'you-are-welcome': {
        fact: 'Ответ на благодарность.',
        examples: [
            'You are welcome, anytime.',
            'You are welcome, glad to help.',
            'You are welcome, no problem.'
        ]
    },
    'sorry': {
        fact: 'Извинение за ошибку или причинённое неудобство.',
        examples: [
            'Sorry, I am late.',
            'Sorry, I did not mean to hurt you.',
            'Sorry, could you repeat that?'
        ]
    },
    'excuse-me': {
        fact: 'Фраза для привлечения внимания или извинения.',
        examples: [
            'Excuse me, where is the restroom?',
            'Excuse me, could you pass the salt?',
            'Excuse me, I need to go.'
        ]
    },
    'yes': {
        fact: 'Утвердительный ответ.',
        examples: [
            'Yes, I agree.',
            'Yes, that is correct.',
            'Yes, please.'
        ]
    },
    'no': {
        fact: 'Отрицательный ответ.',
        examples: [
            'No, thank you.',
            'No, I do not think so.',
            'No, that is not right.'
        ]
    },
    'please': {
        fact: 'Вежливая просьба.',
        examples: [
            'Please, help me.',
            'Please, come in.',
            'Please, be quiet.'
        ]
    },
    'what-is-your-name': {
        fact: 'Вопрос для знакомства.',
        examples: [
            'What is your name?',
            'What is your first name?',
            'What is your full name?'
        ]
    },
    'my-name-is': {
        fact: 'Представление себя.',
        examples: [
            'My name is Alex.',
            'My name is Maria.',
            'My name is John Smith.'
        ]
    },
    'nice-to-meet-you': {
        fact: 'Фраза для выражения удовольствия от знакомства.',
        examples: [
            'Nice to meet you!',
            'Nice to meet you too.',
            'Nice to meet you, glad to see you.'
        ]
    }
};

// Функция для открытия попапа с информацией о фразе
function showPhrasePopup(phraseId, cardElement) {
    const data = phraseData[phraseId];
    if (!data) return;

    document.getElementById('popup-phrase').textContent = getPhraseText(phraseId);
    document.getElementById('popup-phrase-english').textContent = getPhraseText(phraseId);
    document.getElementById('popup-translation').textContent = getPhraseTranslation(phraseId);
    document.getElementById('popup-fact').textContent = data.fact;

    const examplesList = document.getElementById('popup-examples');
    examplesList.innerHTML = '';
    data.examples.forEach(example => {
        const li = document.createElement('li');
        li.textContent = example;
        examplesList.appendChild(li);
    });

    const popup = document.getElementById('phrase-popup');
    popup.style.display = 'flex';

    // Позиционирование попапа рядом с карточкой (опционально)
    if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const section = document.querySelector('.everyday-section');
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
function closePhrasePopup() {
    const popup = document.getElementById('phrase-popup');
    popup.style.display = 'none';
}

// Закрытие попапа при клике вне его содержимого
window.addEventListener('click', function(event) {
    const popup = document.getElementById('phrase-popup');
    if (event.target === popup) {
        closePhrasePopup();
    }
});

// Обработчики для карточек фраз (открытие попапа при клике на карточку)
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.phrase-card');
    cards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Если клик был по кнопке воспроизведения, не открываем попап
            if (event.target.classList.contains('phrase-btn')) {
                return;
            }
            const phraseId = this.getAttribute('data-phrase');
            showPhrasePopup(phraseId, this);
        });
    });
});