document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация хедера при прокрутке
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 15, 35, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Функциональность FAQ аккордеона
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Закрываем все остальные элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем активный элемент
            item.classList.toggle('active');
        });
    });

    // Активируем первый элемент FAQ по умолчанию
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }

    // Простая анимация для карточек с функциями
    const featureCards = document.querySelectorAll('.feature-card');
    
    function checkVisibility() {
        featureCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8);
            
            if (isVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Инициализация карточек
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Проверяем видимость при загрузке и прокрутке
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();

    // Анимация для серверных точек
    const serverPoints = document.querySelectorAll('.server-point');

    // Добавляем случайную задержку для пульсации
    serverPoints.forEach(point => {
        const delay = Math.random() * 2;
        const pulse = point.querySelector('.point-pulse');
        pulse.style.animationDelay = `${delay}s`;
    });

    // Обновление данных серверов в реальном времени
    function updateServerStats() {
        serverPoints.forEach(point => {
            // Генерируем случайные изменения в пинге и нагрузке
            let ping = parseInt(point.getAttribute('data-ping'));
            let load = parseInt(point.getAttribute('data-load'));
            
            // Случайное колебание пинга ±5ms
            ping = ping + (Math.random() * 10 - 5);
            ping = Math.round(ping);
            if (ping < 20) ping = 20;
            
            // Случайное колебание нагрузки ±2%
            load = load + (Math.random() * 4 - 2);
            load = Math.round(load);
            if (load < 10) load = 10;
            if (load > 90) load = 90;
            
            // Обновляем атрибуты
            point.setAttribute('data-ping', `${ping}ms`);
            point.setAttribute('data-load', `${load}%`);
            
            // Обновляем текст в тултипе
            const tooltip = point.querySelector('.server-tooltip');
            const pingText = tooltip.querySelector('p:nth-child(2)');
            const loadText = tooltip.querySelector('p:nth-child(3)');
            
            pingText.textContent = `Пинг: ${ping}ms`;
            loadText.textContent = `Нагрузка: ${load}%`;
        });
    }

    // Обновляем статистику каждые 5 секунд
    setInterval(updateServerStats, 5000);
}); 