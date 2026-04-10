// Функция для воспроизведения произношения цвета через предзаписанные аудиофайлы
function playColorSound(colorId, buttonElement) {
    // Сопоставление идентификаторов цветов с именами файлов
    const audioFiles = {
        'red': 'pronunciation_en_red.mp3',
        'orange': 'pronunciation_en_orange.mp3',
        'yellow': 'pronunciation_en_yellow.mp3',
        'green': 'pronunciation_en_green.mp3',
        'blue': 'pronunciation_en_blue.mp3',
        'purple': 'pronunciation_en_purple.mp3',
        'pink': 'pronunciation_en_pink.mp3',
        'brown': 'pronunciation_en_brown.mp3',
        'black': 'pronunciation_en_black.mp3',
        'white': 'pronunciation_en_white.mp3',
        'gray': 'pronunciation_en_gray.mp3',
        'cyan': 'pronunciation_en_cyan.mp3'
    };

    const fileName = audioFiles[colorId];
    if (!fileName) {
        console.error('Аудиофайл для цвета', colorId, 'не найден');
        return;
    }

    const audioPath = `sounds_sounds_words/sounds_color/${fileName}`;
    const audio = new Audio(audioPath);

    // Визуальная обратная связь
    if (buttonElement) {
        buttonElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            buttonElement.style.transform = '';
        }, 200);
    }

    audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
    });
}

// Возвращает английский текст для цвета
function getColorText(id) {
    const colors = {
        'red': 'Red',
        'orange': 'Orange',
        'yellow': 'Yellow',
        'green': 'Green',
        'blue': 'Blue',
        'purple': 'Purple',
        'pink': 'Pink',
        'brown': 'Brown',
        'black': 'Black',
        'white': 'White',
        'gray': 'Gray',
        'cyan': 'Cyan'
    };
    return colors[id] || id;
}

// Возвращает русский перевод цвета
function getColorTranslation(id) {
    const translations = {
        'red': 'Красный',
        'orange': 'Оранжевый',
        'yellow': 'Жёлтый',
        'green': 'Зелёный',
        'blue': 'Синий',
        'purple': 'Фиолетовый',
        'pink': 'Розовый',
        'brown': 'Коричневый',
        'black': 'Чёрный',
        'white': 'Белый',
        'gray': 'Серый',
        'cyan': 'Голубой'
    };
    return translations[id] || '';
}

// Данные о цветах (факты и примеры)
const colorData = {
    'red': {
        fact: 'Цвет крови, огня и страсти.',
        examples: [
            'The apple is red.',
            'Red is the color of love.',
            'Stop signs are red.'
        ]
    },
    'orange': {
        fact: 'Цвет апельсина и заката.',
        examples: [
            'The pumpkin is orange.',
            'Orange is a warm color.',
            'Tigers have orange fur.'
        ]
    },
    'yellow': {
        fact: 'Цвет солнца и радости.',
        examples: [
            'The sun is yellow.',
            'Bananas are yellow.',
            'Yellow flowers are bright.'
        ]
    },
    'green': {
        fact: 'Цвет природы и роста.',
        examples: [
            'Grass is green.',
            'Green means go.',
            'Frogs are green.'
        ]
    },
    'blue': {
        fact: 'Цвет неба и моря.',
        examples: [
            'The sky is blue.',
            'Blue jeans are popular.',
            'The ocean is blue.'
        ]
    },
    'purple': {
        fact: 'Цвет королевской власти и магии.',
        examples: [
            'Grapes can be purple.',
            'Purple is a mix of red and blue.',
            'Lavender flowers are purple.'
        ]
    },
    'pink': {
        fact: 'Цвет нежности и романтики.',
        examples: [
            'Cotton candy is pink.',
            'Pink flowers are beautiful.',
            'Piglets are pink.'
        ]
    },
    'brown': {
        fact: 'Цвет земли и дерева.',
        examples: [
            'Chocolate is brown.',
            'Bears are brown.',
            'Tree trunks are brown.'
        ]
    },
    'black': {
        fact: 'Цвет ночи и элегантности.',
        examples: [
            'The night sky is black.',
            'Black cats are mysterious.',
            'Tuxedos are often black.'
        ]
    },
    'white': {
        fact: 'Цвет снега и чистоты.',
        examples: [
            'Snow is white.',
            'White clouds are fluffy.',
            'The polar bear is white.'
        ]
    },
    'gray': {
        fact: 'Цвет облаков и камней.',
        examples: [
            'Elephants are gray.',
            'Gray is a neutral color.',
            'Rocks can be gray.'
        ]
    },
    'cyan': {
        fact: 'Цвет морской волны и неба в ясный день.',
        examples: [
            'Turquoise is a shade of cyan.',
            'Cyan is a bright blue-green.',
            'Some birds have cyan feathers.'
        ]
    }
};

// Функция для открытия попапа с информацией о цвете (если попап есть)
function showColorPopup(colorId, cardElement) {
    const data = colorData[colorId];
    if (!data) return;

    // Если попап существует, заполняем его
    const popup = document.getElementById('color-popup');
    if (!popup) return;

    document.getElementById('popup-color').textContent = getColorText(colorId);
    document.getElementById('popup-color-english').textContent = getColorText(colorId);
    document.getElementById('popup-translation').textContent = getColorTranslation(colorId);
    document.getElementById('popup-fact').textContent = data.fact;

    const examplesList = document.getElementById('popup-examples');
    if (examplesList) {
        examplesList.innerHTML = '';
        data.examples.forEach(example => {
            const li = document.createElement('li');
            li.textContent = example;
            examplesList.appendChild(li);
        });
    }

    // Установка цвета образца
    const sample = document.getElementById('popup-sample');
    if (sample) {
        sample.style.backgroundColor = getColorHex(colorId);
    }

    popup.style.display = 'flex';

    // Позиционирование попапа рядом с карточкой (опционально)
    if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const section = document.querySelector('.colors-section');
        const sectionRect = section ? section.getBoundingClientRect() : null;

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
function closeColorPopup() {
    const popup = document.getElementById('color-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Возвращает HEX-код цвета
function getColorHex(id) {
    const hexes = {
        'red': '#ff0000',
        'orange': '#ffa500',
        'yellow': '#ffff00',
        'green': '#008000',
        'blue': '#0000ff',
        'purple': '#800080',
        'pink': '#ffc0cb',
        'brown': '#a52a2a',
        'black': '#000000',
        'white': '#ffffff',
        'gray': '#808080',
        'cyan': '#00ffff'
    };
    return hexes[id] || '#cccccc';
}

// Закрытие попапа при клике вне его содержимого
window.addEventListener('click', function(event) {
    const popup = document.getElementById('color-popup');
    if (popup && event.target === popup) {
        closeColorPopup();
    }
});

// Обработчики для карточек цветов (открытие попапа при клике на карточку)
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.color-card');
    cards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Если клик был по кнопке воспроизведения, не открываем попап
            if (event.target.classList.contains('color-btn')) {
                return;
            }
            const colorId = this.getAttribute('data-color');
            showColorPopup(colorId, this);
        });
    });
});