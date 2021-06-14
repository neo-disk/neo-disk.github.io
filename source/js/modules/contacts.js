function activateContacts() {
  const containerElement = document.querySelector('#contacts__map');

  if (!containerElement) {
    return;
  }

  let myMap = null;

  const initMap = () => {
    myMap = new ymaps.Map('contacts__map', {
      center: [56.080422, 37.054005],
      zoom: 15,
    });

    myMap.geoObjects.add(new ymaps.Placemark([56.080422, 37.054005], {
      balloonContent: 'НЕО-ДИСК',
    }, {
      preset: 'islands#dotIcon',
      iconColor: '#f33131',
    }));
  };
  ymaps.ready(initMap);

  const headerElement = document.querySelector('.header');
  const footerElement = document.querySelector('.footer');

  const setListMapVariables = () => {
    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
    const footerHeight = footerElement ? footerElement.offsetHeight : 0;

    containerElement.style.setProperty('--footerHeight', footerHeight + 'px');
    containerElement.style.setProperty('--headerHeight', headerHeight + 'px');
  };

  setListMapVariables();
  window.addEventListener('resize', setListMapVariables);
}

activateContacts();
