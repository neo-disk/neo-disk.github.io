import {FocusLock} from '../utils/focus-lock';
import {ScrollLock} from '../utils/scroll-lock';

const focusLock = new FocusLock();
const scrollLock = new ScrollLock();

const mobileMenu = () => {
  const header = document.querySelector('.header');
  const blackout = document.querySelector('.blackout');
  const burger = document.querySelector('.header__burger');
  const catalogList = document.querySelector('.main-nav__catalog-list');
  const brushesLink = document.querySelector('.main-nav__catalog-link--brushes');
  const additionalList = document.querySelector('.additional-nav-list');

  const EscapeKey = {
    FULL_NAME: 'Escape',
    ABBREVIATED: 'Esc',
  };

  // Для проверки наличия шапки
  if (!header) {
    return;
  }

  // Работает при наличии кнопки-бургера
  if (burger) {
    const mainNav = document.querySelector('.main-nav');

    // Функция закрытия мобильного меню
    const closeMenu = () => {
      burger.classList.add('header__burger--closed');
      burger.classList.remove('header__burger--opened');
      mainNav.classList.remove('main-nav--opened');
      blackout.classList.remove('blackout--visible');

      focusLock.unlock();
      scrollLock.enableScrolling();
      closeAdditionalMenu();
      closeStaffMenu();

      if (brushesLink.classList.contains('main-nav__catalog-link--hidden')) {
        brushesLink.classList.remove('main-nav__catalog-link--hidden');
        brushesLink.classList.add('main-nav__catalog-link--show');
      }

      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onEmptySpaceClick);
    };

    // Функция открытия мобильного меню
    const openMenu = () => {
      burger.classList.remove('header__burger--closed');
      burger.classList.add('header__burger--opened');
      mainNav.classList.add('main-nav--opened');
      blackout.classList.add('blackout--visible');

      focusLock.lock('.main-nav--opened');
      scrollLock.disableScrolling();
      openAdditionalMenu();
      document.querySelector('.main-nav__link:first-of-type').blur();

      document.addEventListener('keydown', onEscPress);
      document.addEventListener('click', onEmptySpaceClick);

      if (window.innerWidth < 1024) {
        header.style.position = 'fixed';
      }
    };

    // Открывает меню со щетками
    const toggleStaffMenu = (evt) => {
      if (window.innerWidth < 1024) {
        evt.preventDefault();
        additionalList.classList.toggle('additional-nav-list--mobile');
        brushesLink.classList.toggle('main-nav__catalog-link--show');
        brushesLink.classList.toggle('main-nav__catalog-link--hidden');
      }
    };

    // закрывает меню со щетками
    const closeStaffMenu = () => {
      additionalList.classList.remove('additional-nav-list--mobile');
      brushesLink.classList.toggle('main-nav__catalog-link--hidden');
      brushesLink.classList.toggle('main-nav__catalog-link--show');
    };

    // Функция закрытия мобильного меню по нажатию клавиши escape
    const onEscPress = (evt) => {
      if (evt.key === EscapeKey.FULL_NAME || evt.key === EscapeKey.ABBREVIATED) {
        closeMenu();
      }
    };

    // Функция закрытия мобильного меню при клике за его пределами
    const onEmptySpaceClick = (evt) => {
      if (evt.target === document.querySelector('.blackout')) {
        closeMenu();
      }
    };

    // Функция показа дополнительного меню для мобильного разрешения
    const openAdditionalMenu = () => {
      if (window.innerWidth < 1024) {
        catalogList.classList.add('main-nav__catalog-list--mobile');
      }
    };

    // Функция закрытия дополнительного меню для мобильного разрешения
    const closeAdditionalMenu = () => {
      catalogList.classList.remove('main-nav__catalog-list--mobile');
    };

    // Функция отвечающая, за переключения состояний бургера
    const toggleMobileMenu = (evt) => {
      evt.preventDefault();

      if (burger.classList.contains('header__burger--closed')) {
        openMenu();
      } else {
        closeMenu();
      }
    };

    // Отвечает за закрытие мобильного меню, если разрешение больше 1023
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1023 && mainNav.classList.contains('main-nav--opened')) {
        closeMenu();
      }
    });

    if (window.innerWidth < 1024) {
      brushesLink.addEventListener('click', toggleStaffMenu);
      brushesLink.addEventListener('touchend', toggleStaffMenu);
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) {
        brushesLink.addEventListener('click', toggleStaffMenu);
        brushesLink.addEventListener('touchend', toggleStaffMenu);
      }
    });

    burger.addEventListener('click', toggleMobileMenu);
  }
};

const randomizeCircle = () => {
  const logos = document.querySelectorAll('.logo');

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomNumber = getRandomIntInclusive(0, 360);

  logos.forEach((logo) => {
    logo.style.transform = 'rotate(' + randomNumber + 'deg)';
    document.querySelector('#circles').style.opacity = '1';
  });
};

export {mobileMenu, randomizeCircle};
