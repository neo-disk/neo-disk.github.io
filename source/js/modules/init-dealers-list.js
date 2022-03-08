const initDealersList = () => {
  const dealersList = document.querySelector('.dealers-list');

  if (dealersList) {
    let dealers = dealersList.querySelectorAll('.dealers-list__item');

    dealers.forEach((dealer) => {

      dealer.addEventListener('click', (e) => {
        e.preventDefault();

        // eslint-disable-next-line no-shadow
        dealers.forEach((dealer) => {
          if (dealer.classList.contains('is-active')) {
            dealer.classList.remove('is-active');
          }
        });

        dealer.classList.add('is-active');
      });

    });
  }
};

export {initDealersList};
