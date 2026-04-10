// JavaScript для страницы pronouns.htmlpik

document.addEventListener('DOMContentLoaded', function() {
    console.log('Pronouns page JavaScript loaded');
    // Инициализация всех интерактивных элементов
    initSoundButtons();
    initDragAndDrop();
    initQuiz();
});

// 1. Воспроизведение звуков для местоимений
function initSoundButtons() {
    console.log('Initializing sound buttons');
    const soundButtons = document.querySelectorAll('.sound-btn');
    console.log('Found', soundButtons.length, 'sound buttons');
    
    soundButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Sound button clicked:', this.getAttribute('data-sound'));
            const pronoun = this.getAttribute('data-sound');
            playSound(pronoun);
            // Визуальная обратная связь
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

function playSound(pronoun) {
    console.log('Воспроизведение звука для местоимения:', pronoun);
    
    // Определяем имя файла на основе местоимения
    const pronounLower = pronoun.toLowerCase();
    const filename = `pronunciation_en_${pronounLower}.mp3`;
    const audioPath = `sounds_sounds_words/pronouns_sounds/${filename}`;
    
    // Пытаемся воспроизвести аудиофайл
    const audio = new Audio(audioPath);
    audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
        // Если аудио не удалось воспроизвести, используем синтезированную речь
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(pronoun);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        } else {
            alert('Произношение: ' + pronoun);
        }
    });
}

// 2. Drag-and-drop сопоставление
function initDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const checkButton = document.getElementById('check-matching');
    const resultElement = document.getElementById('matching-result');
    
    // Если на странице нет элементов drag-and-drop, выходим
    if (dragItems.length === 0 || dropZones.length === 0 || !checkButton || !resultElement) {
        console.log('Drag-and-drop elements not found, skipping initialization');
        return;
    }
    
    // Соответствие местоимений и переводов
    const correctPairs = {
        'I': 'я',
        'you': 'ты/вы',
        'he': 'он',
        'she': 'она',
        'it': 'оно',
        'we': 'мы',
        'they': 'они'
    };
    
    let draggedItem = null;
    
    // События для перетаскиваемых элементов
    dragItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            draggedItem = this;
            this.classList.add('dragging');
            e.dataTransfer.setData('text/plain', this.getAttribute('data-pronoun'));
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            draggedItem = null;
        });
    });
    
    // События для зон сброса
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        zone.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            if (draggedItem) {
                const pronoun = draggedItem.getAttribute('data-pronoun');
                const translation = this.getAttribute('data-translation');
                
                // Проверяем, есть ли уже элемент в зоне
                const existing = this.querySelector('.drag-item');
                if (existing) {
                    // Возвращаем существующий элемент в контейнер
                    document.querySelector('.drag-container').appendChild(existing);
                }
                
                // Помещаем перетащенный элемент в зону
                this.appendChild(draggedItem);
                draggedItem.style.margin = '0';
                
                // Сохраняем данные для проверки
                this.setAttribute('data-matched-pronoun', pronoun);
            }
        });
    });
    
    // Проверка результатов
    checkButton.addEventListener('click', function() {
        let correctCount = 0;
        const total = dropZones.length;
        
        dropZones.forEach(zone => {
            const matchedPronoun = zone.getAttribute('data-matched-pronoun');
            const correctTranslation = zone.getAttribute('data-translation');
            
            if (matchedPronoun && correctPairs[matchedPronoun] === correctTranslation) {
                correctCount++;
                zone.style.backgroundColor = '#06d6a0';
                zone.style.boxShadow = '0 4px 0 #05b38a';
            } else {
                zone.style.backgroundColor = '#ff6b6b';
                zone.style.boxShadow = '0 4px 0 #d32f2f';
            }
        });
        
        // Отображение результата
        if (correctCount === total) {
            resultElement.textContent = `Отлично! Все ${total} сопоставлений верны!`;
            resultElement.className = 'result correct';
        } else {
            resultElement.textContent = `Правильно ${correctCount} из ${total}. Попробуйте ещё раз!`;
            resultElement.className = 'result incorrect';
        }
        
        // Показываем правильные ответы
        setTimeout(() => {
            dropZones.forEach(zone => {
                zone.style.backgroundColor = '';
                zone.style.boxShadow = '';
            });
        }, 3000);
    });
}

// 3. Квиз с выбором формы глагола
function initQuiz() {
    console.log('Initializing pronouns quiz');
    const optionButtons = document.querySelectorAll('.option-btn');
    const checkQuizButton = document.getElementById('check-quiz');
    const quizResultElement = document.getElementById('quiz-result');
    
    // Правильные ответы для каждого упражнения (по id упражнения)
    const correctAnswers = {
        'exercise1': 'am',
        'exercise2': 'is',
        'exercise3': 'are'
    };
    
    let userAnswers = {};
    
    // Обработка выбора варианта
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const exerciseElement = this.closest('.exercise');
            const exerciseId = exerciseElement.id;
            
            // Снимаем выделение с других кнопок этого упражнения
            exerciseElement.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Выделяем выбранную кнопку
            this.classList.add('selected');
            userAnswers[exerciseId] = this.getAttribute('data-correct');
            
            // Сразу показываем обратную связь (опционально)
            const feedback = exerciseElement.querySelector('.feedback');
            if (feedback) {
                const isCorrect = userAnswers[exerciseId] === correctAnswers[exerciseId];
                if (isCorrect) {
                    feedback.textContent = 'Правильно! ✓';
                    feedback.style.color = '#4ecdc4';
                } else {
                    feedback.textContent = 'Неверно. Попробуйте ещё раз.';
                    feedback.style.color = '#ff6b6b';
                }
            }
        });
    });
    
    // Проверка всех ответов
    checkQuizButton.addEventListener('click', function() {
        let correctCount = 0;
        const total = Object.keys(correctAnswers).length;
        
        // Проверяем каждое упражнение
        for (const [exerciseId, correctAnswer] of Object.entries(correctAnswers)) {
            const exerciseElement = document.getElementById(exerciseId);
            if (!exerciseElement) continue;
            
            const userAnswer = userAnswers[exerciseId];
            const options = exerciseElement.querySelectorAll('.option-btn');
            const feedback = exerciseElement.querySelector('.feedback');
            
            // Сбрасываем стили
            options.forEach(option => {
                option.classList.remove('correct', 'incorrect');
            });
            
            // Подсвечиваем правильный ответ
            options.forEach(option => {
                if (option.getAttribute('data-correct') === correctAnswer) {
                    option.classList.add('correct');
                }
                if (option.getAttribute('data-correct') === userAnswer && userAnswer !== correctAnswer) {
                    option.classList.add('incorrect');
                }
            });
            
            // Обновляем feedback
            if (feedback) {
                if (userAnswer === correctAnswer) {
                    feedback.textContent = 'Правильно! ✓';
                    feedback.style.color = '#4ecdc4';
                    correctCount++;
                } else {
                    feedback.textContent = `Неверно. Правильный ответ: ${correctAnswer}`;
                    feedback.style.color = '#ff6b6b';
                }
            }
        }
        
        // Отображение общего результата
        if (correctCount === total) {
            quizResultElement.textContent = `Превосходно! Все ${total} ответов верны! 🎉`;
            quizResultElement.className = 'result correct';
        } else {
            quizResultElement.textContent = `Правильно ${correctCount} из ${total}. Изучите материал ещё раз!`;
            quizResultElement.className = 'result incorrect';
        }
        
        // Прокрутка к результату
        quizResultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Сброс через 5 секунд (опционально)
        setTimeout(() => {
            optionButtons.forEach(btn => {
                btn.classList.remove('selected', 'correct', 'incorrect');
            });
            userAnswers = {};
            quizResultElement.textContent = '';
            quizResultElement.className = 'result';
            
            // Сброс feedback
            document.querySelectorAll('.feedback').forEach(fb => {
                fb.textContent = '';
            });
        }, 5000);
    });
}

// Дополнительная функция: случайное перемешивание элементов
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}