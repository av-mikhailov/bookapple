document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Логика изменения шапки при прокрутке ---
    const header = document.querySelector('#header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();


    // --- 2. Логика мобильного меню ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('#navbar');
    const navClose = document.querySelector('.mobile-nav-close');
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';
    document.body.appendChild(backdrop);

    const openMenu = () => {
        navbar.classList.add('navbar-mobile-active');
        backdrop.classList.add('backdrop-active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { navClose.focus(); }, 100);
    };

    const closeMenu = () => {
        navbar.classList.remove('navbar-mobile-active');
        backdrop.classList.remove('backdrop-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
    };

    navToggle.addEventListener('click', openMenu);
    navClose.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);


    // --- 3. Таймер обратного отсчета фестиваля ---
    const targetDate = new Date('September 23, 2026 09:00:00').getTime();
    function getPluralWord(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) return five;
        n %= 10;
        if (n === 1) return one;
        if (n >= 2 && n <= 4) return two;
        return five;
    }

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;
        const daysEl = document.getElementById('timer-days');
        const hoursEl = document.getElementById('timer-hours');
        const minutesEl = document.getElementById('timer-minutes');
        const secondsEl = document.getElementById('timer-seconds');
        const labelDays = document.getElementById('label-days');
        const labelHours = document.getElementById('label-hours');
        const labelMinutes = document.getElementById('label-minutes');
        const labelSeconds = document.getElementById('label-seconds');

        if (difference < 0) return;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;

        if (labelDays) labelDays.innerText = getPluralWord(days, 'день', 'дня', 'дней');
        if (labelHours) labelHours.innerText = getPluralWord(hours, 'час', 'часа', 'часов');
        if (labelMinutes) labelMinutes.innerText = getPluralWord(minutes, 'минута', 'минуты', 'минут');
        if (labelSeconds) labelSeconds.innerText = getPluralWord(seconds, 'секунда', 'секунды', 'секунд');
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();


    // --- 4. Инициализация счетчиков PureCounter ---
    if (typeof PureCounter !== 'undefined') {
        new PureCounter();
    }


    // --- 5. Инициализация слайдера ГОСТЕЙ Swiper (A11y-совместимая) ---
    if (typeof Swiper !== 'undefined') {
        new Swiper('.guests-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: false, // ОТКЛЮЧИЛИ LOOP: предотвращает клавиатурные ловушки!
            watchSlidesProgress: true, // Игнорирует невидимые слайды при навигации
            a11y: {
                enabled: true, // Включили встроенный модуль доступности
                prevSlideMessage: 'Предыдущий гость',
                nextSlideMessage: 'Следующий гость',
            },
            navigation: {
                nextEl: '.btn-guests-next',
                prevEl: '.btn-guests-prev',
            },
            breakpoints: {
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            }
        });
    }


    // --- 6. Инициализация слайдера НОВОСТЕЙ Swiper (A11y-совместимая) ---
    if (typeof Swiper !== 'undefined') {
        new Swiper('.news-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: false, // ОТКЛЮЧИЛИ LOOP для предотвращения бесконечного tabbing-цикла
            watchSlidesProgress: true,
            a11y: {
                enabled: true,
                prevSlideMessage: 'Предыдущая новость',
                nextSlideMessage: 'Следующая новость',
            },
            navigation: {
                nextEl: '.btn-news-next',
                prevEl: '.btn-news-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 }
            }
        });
    }


    // --- 7. Логика кнопки "Наверх" (БЕЗ РЕШЕТКИ В URL) ---
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        const toggleBackToTop = () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        };

        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();

        // Скроллим через JS с отменой дефолтного перехода (решетка больше не появится)
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Отменяем дописывание # в URL
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Плавная нативная прокрутка
            });
        });
    }
});