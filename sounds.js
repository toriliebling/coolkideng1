// Функция для воспроизведения звука через HTML5 audio
function playSound(letter, buttonElement) {
    const audioElement = document.getElementById(`audio-${letter}`);
    if (audioElement) {
        audioElement.currentTime = 0; // Перемотка в начало
        audioElement.play().catch(e => {
            console.log("Аудио не может быть воспроизведено:", e);
        });
    } else {
        // Если аудио элемент не найден
        alert(`Произношение буквы ${letter}.`);
    }
    
    // Визуальная обратная связь
    if (buttonElement) {
        buttonElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            buttonElement.style.transform = '';
        }, 200);
    }
}

// Данные о животных для каждой буквы (название и факт на русском)
const animalData = {
    'A': { name: 'Antelope', fact: 'Антилопы — быстрые травоядные животные, обитающие в саваннах Африки.' },
    'B': { name: 'Bear', fact: 'Медведи впадают в зимнюю спячку, их сердцебиение замедляется до 8 ударов в минуту.' },
    'C': { name: 'Cat', fact: 'Кошки могут поворачивать уши на 180 градусов и слышать ультразвук.' },
    'D': { name: 'Dolphin', fact: 'Дельфины спят с одним открытым глазом, чтобы оставаться начеку.' },
    'E': { name: 'Elephant', fact: 'Слоны — самые крупные наземные животные, их хобот содержит около 40 000 мышц.' },
    'F': { name: 'Fox', fact: 'Лисы используют магнитное поле Земли для охоты, чтобы точнее прыгать на добычу.' },
    'G': { name: 'Giraffe', fact: 'Жирафы имеют самую длинную шею среди животных, но у них всего семь шейных позвонков, как у человека.' },
    'H': { name: 'Hedgehog', fact: 'Ёжики рождаются с мягкими иголками, которые твердеют через несколько часов после рождения.' },
    'I': { name: 'Iguana', fact: 'Игуаны могут находиться под водой до 30 минут благодаря способности замедлять сердцебиение.' },
    'J': { name: 'Jaguar', fact: 'Ягуары — самые крупные кошки в Америке, они отличные пловцы и охотятся на крокодилов.' },
    'K': { name: 'Kangaroo', fact: 'Кенгуру не умеют ходить назад, их мощные ноги приспособлены только для прыжков вперёд.' },
    'L': { name: 'Lion', fact: 'Львы — единственные кошки, которые живут группами, называемыми прайдами.' },
    'M': { name: 'Monkey', fact: 'Обезьяны используют инструменты, например, камни, чтобы разбивать орехи.' },
    'N': { name: 'Narwhal', fact: 'Нарвалы известны своим длинным бивнем, который на самом деле является зубом, достигающим 3 метров.' },
    'O': { name: 'Octopus', fact: 'Осьминоги имеют три сердца, синюю кровь и могут менять цвет и текстуру кожи за секунды.' },
    'P': { name: 'Penguin', fact: 'Пингвины могут пить морскую воду благодаря специальным железам, фильтрующим соль.' },
    'Q': { name: 'Quokka', fact: 'Квокка известна как «самое счастливое животное» из-за своей улыбки.' },
    'R': { name: 'Rhinoceros', fact: 'Носороги могут развивать скорость до 50 км/ч, несмотря на свой большой вес.' },
    'S': { name: 'Snake', fact: 'Змеи чувствуют запах языком, собирая частицы воздуха и передавая их в орган Якобсона.' },
    'T': { name: 'Tiger', fact: 'Полоски на шкуре тигра уникальны, как отпечатки пальцев у человека.' },
    'U': { name: 'Unicorn', fact: 'Единороги — мифические существа, символизирующие чистоту и волшебство, часто изображаются с рогом, обладающим целительной силой.' },
    'V': { name: 'Vulture', fact: 'Стервятники обладают острым зрением и могут обнаружить падаль с высоты нескольких километров.' },
    'W': { name: 'Whale', fact: 'Синий кит — самое большое животное из когда-либо существовавших на Земле.' },
    'X': { name: 'Xenops', fact: 'Ксенопс — маленькая птица, которая использует инструменты, чтобы доставать насекомых из коры.' },
    'Y': { name: 'Yak', fact: 'Яки могут выживать в высокогорных районах Гималаев, где мало кислорода.' },
    'Z': { name: 'Zebra', fact: 'Полоски зебры уникальны для каждой особи и помогают отпугивать насекомых.' }
};

// Картинки животных для каждой буквы
const animalImages = {
    'A': 'antilope.jpg',
    'B': 'bear.jpg',
    'C': 'cat.jpg',
    'D': 'dolphin.png',
    'E': 'elepant.jpg',
    'F': 'fox.jpg',
    'G': 'giraffe.jpg',
    'H': 'hedgehog.jpg',
    'I': 'iguana.jpg',
    'J': 'jaguar.jpg',
    'K': 'kanguru.jpg',
    'L': 'lion.jpg',
    'M': 'monkey.jpg',
    'N': 'narwhal.jpg',
    'O': 'octopus.jpg',
    'P': 'penguin.jpg',
    'Q': 'quokka.jpg',
    'R': 'rino.jpg',
    'S': 'snake.jpg',
    'T': 'tiger.jpg',
    'U': 'unicorn.jpg',
    'V': 'vulture.jpg',
    'W': 'whale.jpg',
    'X': 'xsenops.jpg',
    'Y': 'yak.jpg',
    'Z': 'zebra.jpg'
};

// Функция для открытия попапа с животным
function showAnimalPopup(letter, buttonElement) {
    const data = animalData[letter];
    if (!data) return;
    
    document.getElementById('popup-letter').textContent = letter;
    document.getElementById('popup-animal-name').textContent = data.name;
    document.getElementById('popup-fact').textContent = data.fact;
    // Устанавливаем картинку животного
    const imageName = animalImages[letter];
    if (imageName) {
        document.getElementById('popup-image').src = `images/animals/${imageName}`;
    }
    
    const popup = document.getElementById('animal-popup');
    // Позиционируем попап над или под кнопкой в зависимости от доступного места
    if (buttonElement) {
        // Временно показываем попап невидимым, чтобы измерить его размеры
        popup.style.display = 'block';
        popup.style.visibility = 'hidden';
        
        const buttonRect = buttonElement.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const section = document.querySelector('.alphabet-section');
        const sectionRect = section.getBoundingClientRect();
        
        // Относительные координаты кнопки внутри секции
        const buttonTop = buttonRect.top - sectionRect.top;
        const buttonLeft = buttonRect.left - sectionRect.left;
        const buttonHeight = buttonRect.height;
        const buttonWidth = buttonRect.width;
        
        // Доступное пространство сверху и снизу
        const spaceAbove = buttonTop;
        const spaceBelow = sectionRect.height - (buttonTop + buttonHeight);
        
        let top, left;
        const horizontalCenter = buttonLeft + (buttonWidth - popupRect.width) / 2;
        left = Math.max(0, Math.min(horizontalCenter, sectionRect.width - popupRect.width));
        
        // Выбираем позицию: сверху, если достаточно места, иначе снизу
        const margin = 10;
        if (spaceAbove >= popupRect.height + margin) {
            // Помещаем над кнопкой
            top = buttonTop - popupRect.height - margin;
        } else {
            // Помещаем под кнопкой
            top = buttonTop + buttonHeight + margin;
        }
        
        // Ограничиваем, чтобы попап не выходил за границы секции
        top = Math.max(0, Math.min(top, sectionRect.height - popupRect.height));
        
        popup.style.top = top + 'px';
        popup.style.left = left + 'px';
        popup.style.visibility = 'visible';
    } else {
        popup.style.display = 'block';
    }
}

// Функция для закрытия попапа
function closeAnimalPopup() {
    const popup = document.getElementById('animal-popup');
    popup.style.display = 'none';
}

// Закрытие попапа при клике вне его содержимого
window.addEventListener('click', function(event) {
    const popup = document.getElementById('animal-popup');
    if (event.target === popup) {
        closeAnimalPopup();
    }
});

// Обновляем обработчики кнопок букв, чтобы показывать попап вместе со звуком
function playSoundAndShowAnimal(letter, buttonElement) {
    playSound(letter, buttonElement);
    showAnimalPopup(letter, buttonElement);
}

// ==================== РАЗДЕЛ ЗВУКОВ ====================

// Данные о звуках английского языка
const soundsData = [
    {
        id: 'sound-iː',
        symbol: 'iː',
        type: 'vowel',
        exampleWord: 'bee',
        exampleTranscription: '[biː]',
        translation: 'пчела',
        audioSoundId: 'audio-sound-iː',
        audioWordId: 'audio-word-bee'
    },
    {
        id: 'sound-ɪ',
        symbol: 'ɪ',
        type: 'vowel',
        exampleWord: 'sit',
        exampleTranscription: '[sɪt]',
        translation: 'сидеть',
        audioSoundId: 'audio-sound-ɪ',
        audioWordId: 'audio-word-sit'
    },
    {
        id: 'sound-e',
        symbol: 'e',
        type: 'vowel',
        exampleWord: 'bed',
        exampleTranscription: '[bed]',
        translation: 'кровать',
        audioSoundId: 'audio-sound-e',
        audioWordId: 'audio-word-bed'
    },
    {
        id: 'sound-æ',
        symbol: 'æ',
        type: 'vowel',
        exampleWord: 'cat',
        exampleTranscription: '[kæt]',
        translation: 'кот',
        audioSoundId: 'audio-sound-æ',
        audioWordId: 'audio-word-cat'
    },
    {
        id: 'sound-ɑː',
        symbol: 'ɑː',
        type: 'vowel',
        exampleWord: 'car',
        exampleTranscription: '[kɑː]',
        translation: 'машина',
        audioSoundId: 'audio-sound-ɑː',
        audioWordId: 'audio-word-car'
    },
    {
        id: 'sound-ɔː',
        symbol: 'ɔː',
        type: 'vowel',
        exampleWord: 'saw',
        exampleTranscription: '[sɔː]',
        translation: 'пила',
        audioSoundId: 'audio-sound-ɔː',
        audioWordId: 'audio-word-saw'
    },
    {
        id: 'sound-ʊ',
        symbol: 'ʊ',
        type: 'vowel',
        exampleWord: 'put',
        exampleTranscription: '[pʊt]',
        translation: 'положить',
        audioSoundId: 'audio-sound-ʊ',
        audioWordId: 'audio-word-put'
    },
    {
        id: 'sound-uː',
        symbol: 'uː',
        type: 'vowel',
        exampleWord: 'boot',
        exampleTranscription: '[buːt]',
        translation: 'ботинок',
        audioSoundId: 'audio-sound-uː',
        audioWordId: 'audio-word-boot'
    },
    {
        id: 'sound-ʌ',
        symbol: 'ʌ',
        type: 'vowel',
        exampleWord: 'love',
        exampleTranscription: '[lʌv]',
        translation: 'любовь',
        audioSoundId: 'audio-sound-ʌ',
        audioWordId: 'audio-word-love'
    },
    {
        id: 'sound-ɜː',
        symbol: 'ɜː',
        type: 'vowel',
        exampleWord: 'bird',
        exampleTranscription: '[bɜːd]',
        translation: 'птица',
        audioSoundId: 'audio-sound-ɜː',
        audioWordId: 'audio-word-bird'
    },
    {
        id: 'sound-ə',
        symbol: 'ə',
        type: 'vowel',
        exampleWord: 'human',
        exampleTranscription: '[ˈhjuːmən]',
        translation: 'человек',
        audioSoundId: 'audio-sound-ə',
        audioWordId: 'audio-word-human'
    },
    {
        id: 'sound-eɪ',
        symbol: 'eɪ',
        type: 'vowel',
        exampleWord: 'day',
        exampleTranscription: '[deɪ]',
        translation: 'день',
        audioSoundId: 'audio-sound-eɪ',
        audioWordId: 'audio-word-day'
    },
    {
        id: 'sound-aɪ',
        symbol: 'aɪ',
        type: 'vowel',
        exampleWord: 'eye',
        exampleTranscription: '[aɪ]',
        translation: 'глаз',
        audioSoundId: 'audio-sound-aɪ',
        audioWordId: 'audio-word-eye'
    },
    {
        id: 'sound-ɔɪ',
        symbol: 'ɔɪ',
        type: 'vowel',
        exampleWord: 'boy',
        exampleTranscription: '[bɔɪ]',
        translation: 'мальчик',
        audioSoundId: 'audio-sound-ɔɪ',
        audioWordId: 'audio-word-boy'
    },
    {
        id: 'sound-aʊ',
        symbol: 'aʊ',
        type: 'vowel',
        exampleWord: 'cow',
        exampleTranscription: '[kaʊ]',
        translation: 'корова',
        audioSoundId: 'audio-sound-aʊ',
        audioWordId: 'audio-word-cow'
    },
    {
        id: 'sound-oʊ',
        symbol: 'oʊ',
        type: 'vowel',
        exampleWord: 'go',
        exampleTranscription: '[ɡoʊ]',
        translation: 'идти',
        audioSoundId: 'audio-sound-oʊ',
        audioWordId: 'audio-word-go'
    },
    {
        id: 'sound-ɒ',
        symbol: 'ɒ',
        type: 'vowel',
        exampleWord: 'hot',
        exampleTranscription: '[hɒt]',
        translation: 'горячий',
        audioSoundId: 'audio-sound-ɒ',
        audioWordId: 'audio-word-hot'
    },
    {
        id: 'sound-ɪə',
        symbol: 'ɪə',
        type: 'vowel',
        exampleWord: 'real',
        exampleTranscription: '[rɪəl]',
        translation: 'реальный',
        audioSoundId: 'audio-sound-ɪə',
        audioWordId: 'audio-word-real'
    },
    {
        id: 'sound-eə',
        symbol: 'eə',
        type: 'vowel',
        exampleWord: 'bear',
        exampleTranscription: '[beə]',
        translation: 'медведь',
        audioSoundId: 'audio-sound-eə',
        audioWordId: 'audio-word-bear'
    },
    {
        id: 'sound-ʊə',
        symbol: 'ʊə',
        type: 'vowel',
        exampleWord: 'tour',
        exampleTranscription: '[tʊə]',
        translation: 'тур',
        audioSoundId: 'audio-sound-ʊə',
        audioWordId: 'audio-word-tour'
    },
    {
        id: 'sound-p',
        symbol: 'p',
        type: 'consonant',
        exampleWord: 'pen',
        exampleTranscription: '[pen]',
        translation: 'ручка',
        audioSoundId: 'audio-sound-p',
        audioWordId: 'audio-word-pen'
    },
    {
        id: 'sound-b',
        symbol: 'b',
        type: 'consonant',
        exampleWord: 'bad',
        exampleTranscription: '[bæd]',
        translation: 'плохой',
        audioSoundId: 'audio-sound-b',
        audioWordId: 'audio-word-bad'
    },
    {
        id: 'sound-t',
        symbol: 't',
        type: 'consonant',
        exampleWord: 'tea',
        exampleTranscription: '[tiː]',
        translation: 'чай',
        audioSoundId: 'audio-sound-t',
        audioWordId: 'audio-word-tea'
    },
    {
        id: 'sound-d',
        symbol: 'd',
        type: 'consonant',
        exampleWord: 'dot',
        exampleTranscription: '[dɒt]',
        translation: 'точка',
        audioSoundId: 'audio-sound-d',
        audioWordId: 'audio-word-dot'
    },
    {
        id: 'sound-k',
        symbol: 'k',
        type: 'consonant',
        exampleWord: 'key',
        exampleTranscription: '[kiː]',
        translation: 'ключ',
        audioSoundId: 'audio-sound-k',
        audioWordId: 'audio-word-key'
    },
    {
        id: 'sound-g',
        symbol: 'g',
        type: 'consonant',
        exampleWord: 'got',
        exampleTranscription: '[ɡɒt]',
        translation: 'получил',
        audioSoundId: 'audio-sound-g',
        audioWordId: 'audio-word-got'
    },
    {
        id: 'sound-f',
        symbol: 'f',
        type: 'consonant',
        exampleWord: 'fish',
        exampleTranscription: '[fɪʃ]',
        translation: 'рыба',
        audioSoundId: 'audio-sound-f',
        audioWordId: 'audio-word-fish'
    },
    {
        id: 'sound-v',
        symbol: 'v',
        type: 'consonant',
        exampleWord: 'very',
        exampleTranscription: '[ˈveri]',
        translation: 'очень',
        audioSoundId: 'audio-sound-v',
        audioWordId: 'audio-word-very'
    },
    {
        id: 'sound-θ',
        symbol: 'θ',
        type: 'consonant',
        exampleWord: 'think',
        exampleTranscription: '[θɪŋk]',
        translation: 'думать',
        audioSoundId: 'audio-sound-θ',
        audioWordId: 'audio-word-think'
    },
    {
        id: 'sound-ð',
        symbol: 'ð',
        type: 'consonant',
        exampleWord: 'this',
        exampleTranscription: '[ðɪs]',
        translation: 'этот',
        audioSoundId: 'audio-sound-ð',
        audioWordId: 'audio-word-this'
    },
    {
        id: 'sound-s',
        symbol: 's',
        type: 'consonant',
        exampleWord: 'see',
        exampleTranscription: '[siː]',
        translation: 'видеть',
        audioSoundId: 'audio-sound-s',
        audioWordId: 'audio-word-see'
    },
    {
        id: 'sound-z',
        symbol: 'z',
        type: 'consonant',
        exampleWord: 'zoo',
        exampleTranscription: '[zuː]',
        translation: 'зоопарк',
        audioSoundId: 'audio-sound-z',
        audioWordId: 'audio-word-zoo'
    },
    {
        id: 'sound-ʃ',
        symbol: 'ʃ',
        type: 'consonant',
        exampleWord: 'she',
        exampleTranscription: '[ʃiː]',
        translation: 'она',
        audioSoundId: 'audio-sound-ʃ',
        audioWordId: 'audio-word-she'
    },
    {
        id: 'sound-ʒ',
        symbol: 'ʒ',
        type: 'consonant',
        exampleWord: 'pleasure',
        exampleTranscription: '[ˈpleʒə]',
        translation: 'удовольствие',
        audioSoundId: 'audio-sound-ʒ',
        audioWordId: 'audio-word-pleasure'
    },
    {
        id: 'sound-h',
        symbol: 'h',
        type: 'consonant',
        exampleWord: 'how',
        exampleTranscription: '[haʊ]',
        translation: 'как',
        audioSoundId: 'audio-sound-h',
        audioWordId: 'audio-word-how'
    },
    {
        id: 'sound-m',
        symbol: 'm',
        type: 'consonant',
        exampleWord: 'mum',
        exampleTranscription: '[mʌm]',
        translation: 'мама',
        audioSoundId: 'audio-sound-m',
        audioWordId: 'audio-word-mum'
    },
    {
        id: 'sound-n',
        symbol: 'n',
        type: 'consonant',
        exampleWord: 'no',
        exampleTranscription: '[noʊ]',
        translation: 'нет',
        audioSoundId: 'audio-sound-n',
        audioWordId: 'audio-word-no'
    },
    {
        id: 'sound-ŋ',
        symbol: 'ŋ',
        type: 'consonant',
        exampleWord: 'sing',
        exampleTranscription: '[sɪŋ]',
        translation: 'петь',
        audioSoundId: 'audio-sound-ŋ',
        audioWordId: 'audio-word-sing'
    },
    {
        id: 'sound-l',
        symbol: 'l',
        type: 'consonant',
        exampleWord: 'leg',
        exampleTranscription: '[leɡ]',
        translation: 'нога',
        audioSoundId: 'audio-sound-l',
        audioWordId: 'audio-word-leg'
    },
    {
        id: 'sound-r',
        symbol: 'r',
        type: 'consonant',
        exampleWord: 'red',
        exampleTranscription: '[red]',
        translation: 'красный',
        audioSoundId: 'audio-sound-r',
        audioWordId: 'audio-word-red'
    },
    {
        id: 'sound-j',
        symbol: 'j',
        type: 'consonant',
        exampleWord: 'yes',
        exampleTranscription: '[jes]',
        translation: 'да',
        audioSoundId: 'audio-sound-j',
        audioWordId: 'audio-word-yes'
    },
    {
        id: 'sound-w',
        symbol: 'w',
        type: 'consonant',
        exampleWord: 'we',
        exampleTranscription: '[wiː]',
        translation: 'мы',
        audioSoundId: 'audio-sound-w',
        audioWordId: 'audio-word-we'
    },
    {
        id: 'sound-tʃ',
        symbol: 'tʃ',
        type: 'consonant',
        exampleWord: 'chin',
        exampleTranscription: '[tʃɪn]',
        translation: 'подбородок',
        audioSoundId: 'audio-sound-tʃ',
        audioWordId: 'audio-word-chin'
    },
    {
        id: 'sound-dʒ',
        symbol: 'dʒ',
        type: 'consonant',
        exampleWord: 'gym',
        exampleTranscription: '[dʒɪm]',
        translation: 'спортзал',
        audioSoundId: 'audio-sound-dʒ',
        audioWordId: 'audio-word-gym'
    }
];

// Функция для воспроизведения звука по ID аудио элемента
function playSoundById(audioId, buttonElement) {
    const audioElement = document.getElementById(audioId);
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play().catch(e => {
            console.log("Аудио не может быть воспроизведено:", e);
        });
    } else {
        // Если аудио элемент не найден, можно воспроизвести заглушку или показать сообщение
        console.warn(`Аудио элемент с ID ${audioId} не найден.`);
    }
    
    // Визуальная обратная связь
    if (buttonElement) {
        buttonElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            buttonElement.style.transform = '';
        }, 200);
    }
}

// Функция для воспроизведения примера слова
function playWordById(audioId, buttonElement) {
    playSoundById(audioId, buttonElement);
}

// Инициализация звуков - создание аудио элементов и карточек
function initSounds() {
    const audioContainer = document.getElementById('audio-container-sounds');
    const soundsGrid = document.getElementById('sounds-grid');
    
    if (!audioContainer || !soundsGrid) {
        console.warn('Контейнеры для звуков не найдены.');
        return;
    }
    
    // Очистка (на всякий случай)
    soundsGrid.innerHTML = '';
    
    soundsData.forEach(sound => {
        // Создаем аудио элемент для звука
        const audioSound = document.createElement('audio');
        audioSound.id = sound.audioSoundId;
        audioSound.preload = 'auto';
        const sourceSound = document.createElement('source');
        sourceSound.src = `sounds_sounds_words/${sound.symbol}.mp3`;
        sourceSound.type = 'audio/mpeg';
        audioSound.appendChild(sourceSound);
        audioContainer.appendChild(audioSound);
        
        // Создаем аудио элемент для слова с двумя возможными источниками
        const audioWord = document.createElement('audio');
        audioWord.id = sound.audioWordId;
        audioWord.preload = 'auto';
        
        // Первый источник: простое имя слова
        const sourceWord1 = document.createElement('source');
        sourceWord1.src = `sounds_sounds_words/${sound.exampleWord}.mp3`;
        sourceWord1.type = 'audio/mpeg';
        audioWord.appendChild(sourceWord1);
        
        // Второй источник: с префиксом pronunciation_en_
        const sourceWord2 = document.createElement('source');
        sourceWord2.src = `sounds_sounds_words/pronunciation_en_${sound.exampleWord}.mp3`;
        sourceWord2.type = 'audio/mpeg';
        audioWord.appendChild(sourceWord2);
        
        audioContainer.appendChild(audioWord);
        
        // Создаем карточку
        const card = document.createElement('div');
        card.className = 'sound-card';
        
        const symbol = document.createElement('div');
        symbol.className = 'sound-symbol';
        symbol.textContent = sound.symbol;
        
        const type = document.createElement('div');
        type.className = `sound-type ${sound.type}`;
        type.textContent = sound.type === 'vowel' ? 'Гласный' : 'Согласный';
        
        const example = document.createElement('div');
        example.className = 'sound-example';
        example.textContent = sound.exampleWord;
        
        const transcription = document.createElement('div');
        transcription.className = 'sound-transcription';
        transcription.textContent = sound.exampleTranscription;
        
        const translation = document.createElement('div');
        translation.className = 'sound-translation';
        translation.textContent = sound.translation;
        
        const buttons = document.createElement('div');
        buttons.className = 'sound-buttons';
        
        const btnSound = document.createElement('button');
        btnSound.className = 'sound-btn play-sound';
        btnSound.innerHTML = '🔊 Звук';
        btnSound.onclick = function() {
            playSoundById(sound.audioSoundId, this);
        };
        
        const btnWord = document.createElement('button');
        btnWord.className = 'sound-btn play-word';
        btnWord.innerHTML = '🗣️ Слово';
        btnWord.onclick = function() {
            playSoundById(sound.audioWordId, this);
        };
        
        buttons.appendChild(btnSound);
        buttons.appendChild(btnWord);
        
        card.appendChild(symbol);
        card.appendChild(type);
        card.appendChild(example);
        card.appendChild(transcription);
        card.appendChild(translation);
        card.appendChild(buttons);
        
        soundsGrid.appendChild(card);
    });
    
    console.log(`Загружено ${soundsData.length} звуков.`);
}

// Вызов инициализации при загрузке страницы
window.addEventListener('DOMContentLoaded', initSounds);