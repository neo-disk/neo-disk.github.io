/* eslint-disable no-undef */

const initYandexMap = () => {

  let map = document.querySelector('#yandex-map');
  const dealersList = document.querySelector('.dealers-list');
  if (map) {
    // eslint-disable-next-line no-inner-declarations
    function init() {
      let coordinates = [55.80938875440895, 37.83219349867248];
      let dealers = dealersList.querySelectorAll('.dealers-list__item');

      // eslint-disable-next-line no-unused-vars
      let yandexMap = new ymaps.Map('yandex-map', {
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


      dealers.forEach((dealer) => {
        dealer.addEventListener('click', (e) => {
          e.preventDefault();

          const mapHeader = document.querySelector('.dealers__map-header');
          if (mapHeader) {
            document.querySelector('.dealers__image-wrapper img').src = dealer.dataset.logo;
            document.querySelector('.dealers__image-wrapper img').setAttribute('width', dealer.dataset.logow);
            document.querySelector('.dealers__image-wrapper img').setAttribute('height', dealer.dataset.logoh);
            document.querySelector('.dealers__contact--phone a').href = dealer.dataset.phonehref;
            document.querySelector('.dealers__contact--phone a').innerHTML = dealer.dataset.phone;
            document.querySelector('.dealers__contact--mail a').href = dealer.dataset.emailhref;
            document.querySelector('.dealers__contact--mail a').innerHTML = dealer.dataset.email;
          }

          let longitude = dealer.dataset.longitude;
          let latitude = dealer.dataset.latitude;
          coordinates = [Number(longitude), Number(latitude)];


          if (!yandexMap) {
            yandexMap.panTo(coordinates, {flying: 10});
            placemark = new ymaps.Placemark(coordinates);
            yandexMap.geoObjects.add(placemark);
          } else {
            yandexMap.panTo(coordinates, {flying: 10});
            placemark.geometry.setCoordinates(coordinates);
          }
        });
      });
    }

    // eslint-disable-next-line no-undef
    ymaps.ready(init);
  }
};

export {
  initYandexMap
};
