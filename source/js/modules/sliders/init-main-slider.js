const initMainSlider = () => {
  const slider = document.querySelector('.main-swiper');

  // eslint-disable-next-line no-unused-vars
  const swiper = new window.Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: '.main-swiper__pagination',
      dynamicBullets: false,
      type: 'bullets',
      clickable: true,

      bulletElement: 'button',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  });
};

export {initMainSlider};
