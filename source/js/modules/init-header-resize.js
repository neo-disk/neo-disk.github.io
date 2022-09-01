const initHeaderResize = () => {
  const header = document.querySelector('.header');

  if (!header) {
    return;
  }
  if (window.innerWidth > 1919) {
    const resize = () => {
      let headerHeight = header.offsetHeight;
      const main = document.querySelector('main');

      main.style.marginTop = headerHeight + 'px';
    };

    window.addEventListener('load', resize);
    window.addEventListener('resize', resize);
  }
};

export {initHeaderResize};
