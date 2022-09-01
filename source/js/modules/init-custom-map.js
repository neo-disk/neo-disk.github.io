const initCustomMap = () => {
  const map = document.querySelector('#custom-map');
  if (map) {
    const tooltip = map.querySelector('.tooltip');
    const paths = map.querySelectorAll('path');
    paths.forEach((path) => {
      path.addEventListener('mousemove', (e) => {
        let self = e.currentTarget;
        tooltip.innerText = self.dataset.title;
        tooltip.style.display = 'block';
        tooltip.style.left = (e.x - 20) + 'px';
        tooltip.style.top = (e.y - 40) + 'px';
      });

      path.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });
    });
  }

};

export {initCustomMap};
