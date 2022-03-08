import {iosVhFix} from './utils/ios-vh-fix';
import {mobileMenu, randomizeCircle} from './modules/mobile-menu';
import {initAdditionalMenu} from './modules/init-additional-menu';
import {initSlider} from './modules/sliders/init-slider';
import {initMainSlider} from './modules/sliders/init-main-slider';
import {initReadMore} from './modules/init-read-more';
import {initCustomMap} from './modules/init-custom-map';
import {initDealersList} from './modules/init-dealers-list';
import {initYandexMap} from './modules/init-yandex-map';
import {initAnimation} from './modules/init-animation';
import {initVideo} from './modules/init-video';
import {initMainMap} from './modules/init-main-map';
import {initHeaderScroll} from './modules/init-header-scroll';
import {initHeaderResize} from './modules/init-header-resize';
import {initYandexMapResize} from './modules/init-yandex-map-resize';
import {initManipulationWithDOM} from './modules/init-manipulation-with-DOM';


// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  initAnimation();
  initHeaderResize();
  iosVhFix();
  randomizeCircle();
  mobileMenu();
  initMainSlider();
  initHeaderScroll();
  initVideo();
  initAdditionalMenu();


  window.addEventListener('load', () => {
    initSlider();
    initReadMore();
    initCustomMap();
    initDealersList();
    initYandexMap();
    initMainMap();
    initYandexMapResize();
    initManipulationWithDOM();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✔️

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
