// Функция для проверки, виден ли футер в области просмотра
function isFooterVisible() {
    const footer = document.querySelector('.footer-kids');
    if (!footer) return false;
    
    const rect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Футер считается видимым, если его верхняя часть находится в пределах видимой области
    return rect.top <= windowHeight && rect.bottom >= 0;
}

// Функция для обновления позиции кнопки
function updateScrollButtonPosition() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) return;
    
    if (isFooterVisible()) {
        scrollButton.classList.add('footer-visible');
    } else {
        scrollButton.classList.remove('footer-visible');
    }
}

// Обработчики событий
window.addEventListener('scroll', updateScrollButtonPosition);
window.addEventListener('resize', updateScrollButtonPosition);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', updateScrollButtonPosition);