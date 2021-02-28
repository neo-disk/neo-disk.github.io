function activatePartners() {
  const partnersElement = document.querySelector('.partners');

  let myMap = null;
  let lastActiveItem = null;

  function deactivatePartnersItem(itemElement) {
    itemElement.classList.remove('partners-list__item--active');
  }

  function activatePartnersItem(itemElement) {
    if (lastActiveItem) {
      deactivatePartnersItem(lastActiveItem);
    }
    itemElement.classList.add('partners-list__item--active');
    lastActiveItem = itemElement;
  }

  if (partnersElement) {
    const dealersButtonElement = partnersElement.querySelector('.partners__all-dealers-btn');
    const mapButtonElement = partnersElement.querySelector('.partners__map-btn');
    const itemElements = partnersElement.querySelectorAll('.partners-list__item');
    const arrowElements = partnersElement.querySelectorAll('.partners-list__arrow-button');
    const moreDetailsBackElements = partnersElement.querySelectorAll('.partners-list__more-details-back');
    const mapElement = partnersElement.querySelector('.partners__map');
    const headerElement = document.querySelector('.header');
    const buttonsElement = partnersElement.querySelector('.partners__main-buttons');
    const footerElement = document.querySelector('.footer');

    const initMap = () => {
      myMap = new ymaps.Map('partners__map', {
        center: [+itemElements[0].dataset.xCoordinate, +itemElements[0].dataset.yCoordinate],
        zoom: 15,
      });

      itemElements.forEach(function (itemElement) {
        myMap.geoObjects.add(new ymaps.Placemark([+itemElement.dataset.xCoordinate, +itemElement.dataset.yCoordinate], {
          balloonContent: itemElement.dataset.title,
        }, {
          preset: 'islands#dotIcon',
          iconColor: '#f33131',
        }));
      });
    };
    ymaps.ready(initMap);

    dealersButtonElement.onclick = () => {
      mapButtonElement.classList.remove('partners__main-button--active');
      dealersButtonElement.classList.add('partners__main-button--active');

      mapElement.classList.remove('partners__map--mobile-shown');

      if (lastActiveItem) {
        deactivatePartnersItem(lastActiveItem);
        lastActiveItem = null;
      }
    };

    mapButtonElement.onclick = () => {
      dealersButtonElement.classList.remove('partners__main-button--active');
      mapButtonElement.classList.add('partners__main-button--active');

      mapElement.classList.add('partners__map--mobile-shown');
    };

    arrowElements.forEach(function (arrowElement) {
      const itemElement = arrowElement.closest('.partners-list__item');

      arrowElement.onclick = function () {
        if (itemElement !== lastActiveItem) {
          activatePartnersItem(itemElement);
          myMap.setCenter([+itemElement.dataset.xCoordinate, +itemElement.dataset.yCoordinate]);
        } else {
          deactivatePartnersItem(lastActiveItem);
          lastActiveItem = null;
        }
      };
    });

    moreDetailsBackElements.forEach(function (moreDetailsBackElement) {
      moreDetailsBackElement.onclick = () => {
        if (lastActiveItem) {
          deactivatePartnersItem(lastActiveItem);
          lastActiveItem = null;
        }
      };
    });

    const setListMapVariables = () => {
      const headerHeight = headerElement ? headerElement.offsetHeight : 0;
      const buttonsHeight = buttonsElement ? buttonsElement.offsetHeight : 0;
      const totalTop = headerHeight + buttonsHeight;
      const footerHeight = footerElement ? footerElement.offsetHeight : 0;

      partnersElement.style.setProperty('--fixedTop', totalTop + 'px');
      partnersElement.style.setProperty('--footerHeight', footerHeight + 'px');
      partnersElement.style.setProperty('--buttonsHeight', buttonsHeight + 'px');
      partnersElement.style.setProperty('--headerHeight', headerHeight + 'px');
    };

    setListMapVariables();
    window.addEventListener('resize', setListMapVariables);
  }
}

activatePartners();
