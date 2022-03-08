const initYandexMapResize = () => {
  const dealersList = document.querySelector('.dealers-list');
  const dealersMap = document.querySelector('.dealers__map');

  if (dealersList && dealersMap) {
    const yandexMapHeader = dealersMap.querySelector('.dealers__map-header');
    const yandexMap = dealersMap.querySelector('.yandex-map');

    const resize = () => {
      if (window.innerWidth > 767) {
        let dealersListHeight = dealersList.offsetHeight;
        let yandexMapHeaderHeight = yandexMapHeader.offsetHeight;

        yandexMap.style.maxHeight = dealersListHeight - yandexMapHeaderHeight + 'px';
      } else if (window.innerWidth <= 767) {
        // yandexMap.style.maxHeight = 100 + '%';
        // yandexMap.style.maxWeight = 100 + '%';
        // dealersMap.style.maxWeight = 100 + '%';
        // location.reload();
      }
    };

    window.addEventListener('load', resize);
    window.addEventListener('resize', resize);
  }

};

export {initYandexMapResize};
