const promoSlider = document.querySelector('.promo__slider');

if (promoSlider) {
  let swiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
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
