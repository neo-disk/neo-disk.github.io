const initSlider = () => {
  const sliders = document.querySelectorAll('[data-slider]');

  if (sliders) {
    sliders.forEach((slider) => {

      // eslint-disable-next-line no-unused-vars
      const swiper = new window.Swiper(slider, {
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 0,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

    });
  }
};

export {initSlider};
