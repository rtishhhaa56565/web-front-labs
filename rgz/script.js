// Показываем/скрываем кнопку "Наверх"
window.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Плавная прокрутка для кнопки "Наверх"
document.querySelectorAll('.back-to-top').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Работа с новостями (раскрытие/скрытие полного текста)
document.addEventListener('DOMContentLoaded', function() {
    const newsToggles = document.querySelectorAll('.news-toggle');
    
    newsToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const newsCard = this.closest('.news-card');
            const newsFull = newsCard.querySelector('.news-full');
            
            if (newsFull.style.display === 'block') {
                newsFull.style.display = 'none';
                this.textContent = 'Показать полностью';
            } else {
                newsFull.style.display = 'block';
                this.textContent = 'Скрыть';
            }
        });
    });
    
    // Анимация для таймлайна
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});