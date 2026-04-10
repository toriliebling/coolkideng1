// JavaScript для страницы plural.html

document.addEventListener('DOMContentLoaded', function() {
    console.log('Plural page JavaScript loaded');
    // Инициализация всех интерактивных элементов
    initSoundButtons();
    initQuiz();
    initDragAndDrop();
});

// 1. Воспроизведение звуков для слов
function initSoundButtons() {
    console.log('Initializing sound buttons');
    const soundButtons = document.querySelectorAll('.sound-btn');
    console.log('Found', soundButtons.length, 'sound buttons');
    
    soundButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Sound button clicked:', this.getAttribute('data-sound'));
            const word = this.getAttribute('data-sound');
            playSound(word);
            // Визуальная обратная связь
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

function playSound(word) {
    console.log('Воспроизведение звука для слова:', word);
    
    // Попытка воспроизвести аудиофайл из папки manysounds
    const audioPath = `sounds_sounds_words/manysounds/pronunciation_en_${word}.mp3`;
    const audio = new Audio(audioPath);
    
    audio.addEventListener('canplaythrough', function() {
        console.log('Аудиофайл найден, воспроизводим:', audioPath);
    });
    
    audio.addEventListener('error', function(e) {
        console.log('Аудиофайл не найден или ошибка загрузки:', audioPath, e);
        // Fallback: синтезированная речь
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        } else {
            alert('Произношение: ' + word);
        }
    });
    
    // Попытка воспроизведения
    audio.play().catch(function(error) {
        console.log('Ошибка воспроизведения аудио:', error);
        // Если воспроизведение не удалось, используем синтез речи
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    });
}

// 2. Упражнение с вводом текста
function initQuiz() {
    console.log('Initializing input-based quiz');
    const checkButtons = document.querySelectorAll('.quiz-item .check-btn');
    const checkAllButton = document.getElementById('check-all');
    const resultElement = document.getElementById('quiz-result');
    
    // Проверка одного ответа
    checkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const correctAnswer = this.getAttribute('data-answer');
            const input = document.getElementById(targetId);
            const feedback = document.getElementById('feedback' + targetId.slice(-1));
            
            if (!input || !feedback) return;
            
            const userAnswer = input.value.trim().toLowerCase();
            const normalizedCorrect = correctAnswer.toLowerCase();
            
            // Очистка предыдущих классов
            feedback.classList.remove('correct', 'incorrect');
            
            if (userAnswer === normalizedCorrect) {
                feedback.textContent = 'Правильно! ✓';
                feedback.classList.add('correct');
                input.style.borderColor = '#4ecdc4';
                input.style.backgroundColor = '#f0fff4';
            } else {
                feedback.textContent = `Неверно. Правильный ответ: ${correctAnswer}`;
                feedback.classList.add('incorrect');
                input.style.borderColor = '#ff6b6b';
                input.style.backgroundColor = '#fff0f0';
            }
        });
    });
    
    // Проверка всех ответов
    checkAllButton.addEventListener('click', function() {
        console.log('Checking all answers');
        let correctCount = 0;
        const totalQuestions = checkButtons.length;
        
        // Проверить каждый вопрос
        checkButtons.forEach(button => {
            const targetId = button.getAttribute('data-target');
            const correctAnswer = button.getAttribute('data-answer');
            const input = document.getElementById(targetId);
            const feedback = document.getElementById('feedback' + targetId.slice(-1));
            
            if (!input || !feedback) return;
            
            const userAnswer = input.value.trim().toLowerCase();
            const normalizedCorrect = correctAnswer.toLowerCase();
            
            // Очистка предыдущих классов
            feedback.classList.remove('correct', 'incorrect');
            
            if (userAnswer === normalizedCorrect) {
                correctCount++;
                feedback.textContent = 'Правильно! ✓';
                feedback.classList.add('correct');
                input.style.borderColor = '#4ecdc4';
                input.style.backgroundColor = '#f0fff4';
            } else {
                feedback.textContent = `Неверно. Правильный ответ: ${correctAnswer}`;
                feedback.classList.add('incorrect');
                input.style.borderColor = '#ff6b6b';
                input.style.backgroundColor = '#fff0f0';
            }
        });
        
        // Отображение общего результата
        if (correctCount === totalQuestions) {
            resultElement.textContent = `Отлично! Все ${totalQuestions} ответа правильные! 🎉`;
            resultElement.className = 'result success';
        } else if (correctCount > 0) {
            resultElement.textContent = `Хорошо! Правильных ответов: ${correctCount} из ${totalQuestions}. Продолжайте тренироваться!`;
            resultElement.className = 'result';
        } else {
            resultElement.textContent = `Пока не всё правильно. Попробуйте ещё раз!`;
            resultElement.className = 'result error';
        }
        
        // Прокрутка к результату
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    
    // Обработка нажатия Enter в поле ввода
    const inputs = document.querySelectorAll('.quiz-item input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const button = this.nextElementSibling;
                if (button && button.classList.contains('check-btn')) {
                    button.click();
                }
            }
        });
    });
}

// Вспомогательная функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Функция для перемешивания drag-items внутри drag-column
function shuffleDragItems() {
    const dragColumn = document.querySelector('.drag-column');
    if (!dragColumn) return;
    
    const dragItems = Array.from(dragColumn.querySelectorAll('.drag-item'));
    if (dragItems.length === 0) return;
    
    // Перемешиваем массив
    const shuffledItems = shuffleArray([...dragItems]);
    
    // Удаляем все элементы из колонки
    dragItems.forEach(item => item.remove());
    
    // Добавляем обратно в перемешанном порядке
    shuffledItems.forEach(item => dragColumn.appendChild(item));
    
    console.log('Drag items shuffled');
    return shuffledItems;
}

// 3. Drag-and-drop сопоставление
function initDragAndDrop() {
    console.log('Initializing drag and drop');
    const dropZones = document.querySelectorAll('.drop-zone');
    const checkButton = document.getElementById('check-matching');
    const resultElement = document.getElementById('matching-result');
    
    let draggedItem = null;
    
    // Перемешиваем drag-items при инициализации
    let dragItems = shuffleDragItems();
    // Если shuffleDragItems не вернул элементы (например, если DOM изменился), получаем заново
    if (!dragItems || dragItems.length === 0) {
        dragItems = document.querySelectorAll('.drag-item');
    }
    
    // События для перетаскиваемых элементов
    dragItems.forEach(item => {
        item.setAttribute('draggable', 'true');
        
        item.addEventListener('dragstart', function(e) {
            console.log('Drag started:', this.textContent);
            draggedItem = this;
            this.classList.add('dragging');
            e.dataTransfer.setData('text/plain', this.getAttribute('data-target'));
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
            this.classList.add('hover');
        });
        
        zone.addEventListener('dragleave', function() {
            this.classList.remove('hover');
        });
        
        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('hover');
            console.log('Drop on:', this.textContent);
            
            if (draggedItem) {
                const target = draggedItem.getAttribute('data-target');
                const accept = this.getAttribute('data-accept');
                console.log('Dragged item target:', target, 'Drop zone accept:', accept);
                
                // Проверяем, правильное ли сопоставление
                if (target === accept) {
                    console.log('Correct match!');
                    this.textContent = draggedItem.textContent + ' → ' + this.textContent;
                    this.classList.add('correct');
                    this.classList.remove('incorrect');
                    draggedItem.style.visibility = 'hidden';
                } else {
                    console.log('Incorrect match');
                    this.classList.add('incorrect');
                    setTimeout(() => {
                        this.classList.remove('incorrect');
                    }, 1000);
                }
            } else {
                console.log('No dragged item');
            }
        });
    });
    
    // Проверка всех сопоставлений
    checkButton.addEventListener('click', function() {
        const correctZones = document.querySelectorAll('.drop-zone.correct');
        const totalZones = dropZones.length;
        
        if (correctZones.length === totalZones) {
            resultElement.textContent = 'Отлично! Все сопоставления правильные! 🎉';
            resultElement.className = 'result success';
        } else {
            resultElement.textContent = `Правильно сопоставлено: ${correctZones.length} из ${totalZones}. Попробуйте ещё раз!`;
            resultElement.className = 'result error';
        }
        
        // Прокрутка к результату
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    
    // Сброс игры
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Сбросить игру';
    resetButton.className = 'check-btn';
    resetButton.style.marginLeft = '10px';
    resetButton.style.backgroundColor = '#6c757d';
    resetButton.addEventListener('click', function() {
        // Восстанавливаем видимость всех drag-items
        document.querySelectorAll('.drag-item').forEach(item => {
            item.style.visibility = 'visible';
        });
        
        // Сбрасываем drop-zones
        dropZones.forEach(zone => {
            zone.textContent = zone.getAttribute('data-accept');
            zone.classList.remove('correct', 'incorrect', 'hover');
        });
        
        // Перемешиваем drag-items заново
        shuffleDragItems();
        // Обновляем ссылку на dragItems
        dragItems = document.querySelectorAll('.drag-item');
        
        resultElement.textContent = '';
        resultElement.className = 'result';
        console.log('Game reset and reshuffled');
    });
    
    checkButton.parentNode.insertBefore(resetButton, checkButton.nextSibling);
}

// Дополнительная функция для произвольного слова
function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}