/* eslint-disable no-undef */

const initMainMap = () => {

  let map = document.querySelector('#map');
  if (map) {
    // eslint-disable-next-line no-inner-declarations
    function init() {
      const coordinates = [56.080354, 37.054002];

      // eslint-disable-next-line no-unused-vars
      let yandexMap = new ymaps.Map('map', {
        // eslint-disable-next-line object-shorthand
        center: coordinates,
        zoom: 16,
      });

      let placemark = new ymaps.Placemark(coordinates, {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/content/placemark.png',
        iconImageSize: [50, 50],
        iconImageOffset: [-25, -50],
      });

      yandexMap.geoObjects.add(placemark);
    }

    // eslint-disable-next-line no-undef
    ymaps.ready(init);
  }
};

export {initMainMap};
