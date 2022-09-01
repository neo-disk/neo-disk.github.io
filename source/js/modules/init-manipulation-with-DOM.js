const initManipulationWithDOM = () => {
  const dealersList = document.querySelector('.dealers-list');
  const dealersMap = document.querySelector('.dealers__map');


  if (dealersList && dealersMap) {

    const startManipulation = () => {
      let dealers = dealersList.querySelectorAll('.dealers-list__item');
      let currentMobileWidth = window.innerWidth;

      if (currentMobileWidth < 768) {

        dealers.forEach((dealer) => {
          if (dealer.classList.contains('is-active')) {
            dealer.appendChild(dealersMap);
          }

          dealer.addEventListener('click', (e) => {
            e.preventDefault();

            dealer.appendChild(dealersMap);
          });
        });

        dealersMap.style.maxWidth = (currentMobileWidth - 40) + 'px';
      }

      if (currentMobileWidth < 551) {

        dealers.forEach((dealer) => {
          if (dealer.classList.contains('is-active')) {
            dealer.appendChild(dealersMap);
          }

          dealer.addEventListener('click', (e) => {
            e.preventDefault();

            dealer.appendChild(dealersMap);
          });
        });

        dealersMap.style.maxWidth = (currentMobileWidth - 40) + 'px';
      }
      if (currentMobileWidth > 768) {
        document.querySelector('.dealers').appendChild(dealersMap);
        dealersMap.style.maxWidth = 100 + '%';
      }
    };

    startManipulation();
    window.addEventListener('resize', startManipulation);
    window.addEventListener('load', startManipulation);
  }

};

export {initManipulationWithDOM};
