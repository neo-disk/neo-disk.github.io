const THRESHOLD_DEFAULT = 1.0;
const DURATION_DEFAULT = 1.0;
const DELAY_DEFAULT = 0.2;

const screens = document.querySelectorAll('[data-animate]');

let elTop;
let windowHeight;

const returnAnimatePoint = (el, threshold) => {
  elTop = el.getBoundingClientRect().top;
  windowHeight = window.innerHeight;
  return windowHeight / threshold - elTop;
};

const trackingScreenBlock = () => {
  screens.forEach((screen) => {
    const threshold = screen.dataset.animateThreshold ? parseFloat(screen.dataset.animateThreshold) : THRESHOLD_DEFAULT;
    const duration = screen.dataset.animateDuration ? parseFloat(screen.dataset.animateDuration) : DURATION_DEFAULT;
    const delay = screen.dataset.animateDelay ? parseFloat(screen.dataset.animateDelay) : DELAY_DEFAULT;

    const items = screen.querySelectorAll('.fib');

    if (returnAnimatePoint(screen, threshold) > 0 && !screen.classList.contains('show')) {
      items.forEach((item, index) => {
        item.style.animationDuration = `${duration}s`;
        item.style.animationDelay = `${index * delay}s`;
      });

      requestAnimationFrame(() => {
        screen.classList.add('show');
      });
    }
  });
};

const initAnimation = () => {
  if (!screens.length) {
    return;
  }

  trackingScreenBlock();
  window.addEventListener('scroll', trackingScreenBlock);
  window.addEventListener('orientationchange', trackingScreenBlock);
};

export {initAnimation};
