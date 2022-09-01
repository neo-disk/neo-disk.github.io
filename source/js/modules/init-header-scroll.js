const initHeaderScroll = () => {
  const body = document.body;
  const header = document.querySelector('.header');
  const scrollUp = 'scroll-up';
  const scrollDown = 'scroll-down';
  const catalogList = document.querySelector('.main-nav__catalog-list');
  const additionalList = document.querySelector('.additional-nav-list');
  let lastScroll = 0;

  if (!header) {
    return;
  }

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      body.classList.remove(scrollUp);
      header.classList.remove('header--shadow');
      return;
    }

    if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
      // down
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
      header.classList.remove('header--shadow');
      catalogList.classList.remove('main-nav__catalog-list--visible');
      additionalList.classList.remove('additional-nav-list--visible');
    } else if (
      currentScroll < lastScroll &&
      body.classList.contains(scrollDown)
    ) {
      // up
      body.classList.remove(scrollDown);
      body.classList.add(scrollUp);
      header.classList.add('header--shadow');
    }
    lastScroll = currentScroll;
  });
};

export {initHeaderScroll};
