const promoSlider = document.querySelector('.promo__slider');

if (promoSlider) {
  // eslint-disable-next-line no-undef
  let swiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 7000,
      disableOnInteraction: true,
    },

    navigation: {
      nextEl: '.promo__navigation .navigation-arrow--next',
      prevEl: '.promo__navigation .navigation-arrow--prev',
    },
  });

  window.addEventListener('resize', function () {
    swiper.update();
  });
}
