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
    handleScroll(); // Проверка при первоначальной загрузке


    // --- 2. Логика мобильного меню (A11y-совместимая) ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('#navbar');
    const navClose = document.querySelector('.mobile-nav-close');
    
    // Создаем элемент подложки динамически, чтобы не засорять HTML
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';
    document.body.appendChild(backdrop);

    const openMenu = () => {
        navbar.classList.add('navbar-mobile-active');
        backdrop.classList.add('backdrop-active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы под меню

        // Установка фокуса на кнопку закрытия для удобства клавиатурного ввода
        setTimeout(() => {
            navClose.focus();
        }, 100);
    };

    const closeMenu = () => {
        navbar.classList.remove('navbar-mobile-active');
        backdrop.classList.remove('backdrop-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Возвращаем скролл страницы
        navToggle.focus();
    };

    // Слушатели событий клика
    navToggle.addEventListener('click', openMenu);
    navClose.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    // Закрытие меню при клике по ссылкам (полезно для одностраничной навигации)
    const navLinks = document.querySelectorAll('.navbar-menu .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('navbar-mobile-active')) {
                closeMenu();
            }
        });
    });

    // Обработка клавиш (Esc для закрытия и удержание фокуса внутри меню)
    document.addEventListener('keydown', (e) => {
        if (!navbar.classList.contains('navbar-mobile-active')) return;

        // Закрытие по нажатию клавиши Esc
        if (e.key === 'Escape') {
            closeMenu();
        }

        // Lock Focus (удерживание клавиши Tab внутри меню)
        if (e.key === 'Tab') {
            const focusableElements = navbar.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    // --- 3. Таймер обратного отсчета фестиваля ---
const targetDate = new Date('September 23, 2026 09:00:00').getTime();

// Функция склонения существительных после числительных
function getPluralWord(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}

const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    // Элементы DOM
    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const secondsEl = document.getElementById('timer-seconds');

    const labelDays = document.getElementById('label-days');
    const labelHours = document.getElementById('label-hours');
    const labelMinutes = document.getElementById('label-minutes');
    const labelSeconds = document.getElementById('label-seconds');

    if (difference < 0) {
        // Если дата прошла
        if (daysEl) daysEl.innerText = "00";
        if (hoursEl) hoursEl.innerText = "00";
        if (minutesEl) minutesEl.innerText = "00";
        if (secondsEl) secondsEl.innerText = "00";
        return;
    }

    // Расчеты времени
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Вывод в HTML с добавлением ведущего нуля
    if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
    if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;

    // Установка правильных окончаний на русском языке
    if (labelDays) labelDays.innerText = getPluralWord(days, 'день', 'дня', 'дней');
    if (labelHours) labelHours.innerText = getPluralWord(hours, 'час', 'часа', 'часов');
    if (labelMinutes) labelMinutes.innerText = getPluralWord(minutes, 'минута', 'минуты', 'минут');
    if (labelSeconds) labelSeconds.innerText = getPluralWord(seconds, 'секунда', 'секунды', 'секунд');
};

// Запуск таймера каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown(); // Первый запуск сразу при загрузке

// --- 4. Инициализация счетчиков PureCounter ---
if (typeof PureCounter !== 'undefined') {
    new PureCounter();
}
    
});