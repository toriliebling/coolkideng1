// Функция для воспроизведения произношения слова через Web Speech API
function playWordSound(wordId) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = getWordText(wordId);
    speech.lang = 'en-US';
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 1;

    // Визуальная обратная связь
    const button = event?.target;
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }

    window.speechSynthesis.speak(speech);
}

// Возвращает английский текст для слова
function getWordText(id) {
    const words = {
        'shirt': 'Shirt',
        'pants': 'Pants',
        'dress': 'Dress',
        'skirt': 'Skirt',
        'jacket': 'Jacket',
        'coat': 'Coat',
        'hat': 'Hat',
        'shoes': 'Shoes',
        'socks': 'Socks',
        'gloves': 'Gloves',
        'scarf': 'Scarf',
        't-shirt': 'T‑shirt'
    };
    return words[id] || id;
}

// Возвращает русский перевод слова
function getWordTranslation(id) {
    const translations = {
        'shirt': 'Рубашка',
        'pants': 'Брюки',
        'dress': 'Платье',
        'skirt': 'Юбка',
        'jacket': 'Куртка',
        'coat': 'Пальто',
        'hat': 'Шляпа',
        'shoes': 'Обувь',
        'socks': 'Носки',
        'gloves': 'Перчатки',
        'scarf': 'Шарф',
        't-shirt': 'Футболка'
    };
    return translations[id] || '';
}

// Данные о словах (факты и примеры)
const wordData = {
    'shirt': {
        fact: 'Предмет одежды для верхней части тела.',
        examples: [
            'I wear a white shirt to school.',
            'This shirt is made of cotton.',
            'He bought a new shirt yesterday.'
        ]
    },
    'pants': {
        fact: 'Одежда, покрывающая ноги и нижнюю часть тела.',
        examples: [
            'These pants are too long.',
            'I need to buy new pants.',
            'She wears black pants to work.'
        ]
    },
    'dress': {
        fact: 'Женская одежда, состоящая из лифа и юбки.',
        examples: [
            'She wore a beautiful dress to the party.',
            'This dress is perfect for summer.',
            'My favorite dress is blue.'
        ]
    },
    'skirt': {
        fact: 'Женская одежда, покрывающая нижнюю часть тела.',
        examples: [
            'She likes to wear a skirt with a blouse.',
            'This skirt is too short.',
            'A long skirt is comfortable.'
        ]
    },
    'jacket': {
        fact: 'Верхняя одежда с рукавами, обычно до талии.',
        examples: [
            'Put on your jacket, it is cold outside.',
            'He has a leather jacket.',
            'This jacket has many pockets.'
        ]
    },
    'coat': {
        fact: 'Тёплая верхняя одежда для холодной погоды.',
        examples: [
            'She wears a coat in winter.',
            'My coat is waterproof.',
            'He hung his coat in the closet.'
        ]
    },
    'hat': {
        fact: 'Головной убор для защиты от солнца или холода.',
        examples: [
            'He wears a hat when it is sunny.',
            'This hat matches my outfit.',
            'She lost her favorite hat.'
        ]
    },
    'shoes': {
        fact: 'Обувь для защиты ног.',
        examples: [
            'I need new running shoes.',
            'These shoes are very comfortable.',
            'She has many pairs of shoes.'
        ]
    },
    'socks': {
        fact: 'Одежда для ног, носимые под обувью.',
        examples: [
            'I wear socks every day.',
            'These socks are warm.',
            'He has colorful socks.'
        ]
    },
    'gloves': {
        fact: 'Одежда для рук, защищающая от холода.',
        examples: [
            'Wear gloves in winter.',
            'These gloves are made of wool.',
            'She lost one glove.'
        ]
    },
    'scarf': {
        fact: 'Длинный кусок ткани, носимый вокруг шеи.',
        examples: [
            'She wears a scarf with her coat.',
            'This scarf is very soft.',
            'A scarf can be a fashion accessory.'
        ]
    },
    't-shirt': {
        fact: 'Лёгкая футболка с короткими рукавами.',
        examples: [
            'I like to wear a T‑shirt and jeans.',
            'This T‑shirt has a cool design.',
            'He bought a souvenir T‑shirt.'
        ]
    }
};

// Функция для открытия попапа с информацией о слове
function showWordPopup(wordId, cardElement) {
    const data = wordData[wordId];
    if (!data) return;

    document.getElementById('popup-word').textContent = getWordText(wordId);
    document.getElementById('popup-word-english').textContent = getWordText(wordId);
    document.getElementById('popup-translation').textContent = getWordTranslation(wordId);
    document.getElementById('popup-fact').textContent = data.fact;

    const examplesList = document.getElementById('popup-examples');
    examplesList.innerHTML = '';
    data.examples.forEach(example => {
        const li = document.createElement('li');
        li.textContent = example;
        examplesList.appendChild(li);
    });

    // Установка изображения (пока заглушка)
    const img = document.getElementById('popup-image');
    img.src = 'images/eee.png'; // можно заменить на разные изображения для слов

    const popup = document.getElementById('word-popup');
    popup.style.display = 'flex';

    // Позиционирование попапа рядом с карточкой (опционально)
    if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const section = document.querySelector('.clothing-section');
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
function closeWordPopup() {
    const popup = document.getElementById('word-popup');
    popup.style.display = 'none';
}

// Закрытие попапа при клике вне его содержимого
window.addEventListener('click', function(event) {
    const popup = document.getElementById('word-popup');
    if (event.target === popup) {
        closeWordPopup();
    }
});

// Обработчики для карточек слов (открытие попапа при клике на карточку)
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.word-card');
    cards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Если клик был по кнопке воспроизведения, не открываем попап
            if (event.target.classList.contains('word-btn')) {
                return;
            }
            const wordId = this.getAttribute('data-word');
            showWordPopup(wordId, this);
        });
    });
});