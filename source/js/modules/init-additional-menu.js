const initAdditionalMenu = () => {
  const catalogLink = document.querySelector('.main-nav__link--shop');
  const catalogList = document.querySelector('.main-nav__catalog-list');
  const supportsTouch = ('ontouchstart' in document.documentElement);

  if (catalogList) {
    const brushes = document.querySelector('.main-nav__catalog-item--brushes');
    const brushesLink = document.querySelector('.main-nav__catalog-link--brushes');
    const additionalList = document.querySelector('.additional-nav-list');

    const openCatalogList = () => {
      catalogList.classList.add('main-nav__catalog-list--visible');
    };

    const closeCatalogList = () => {
      catalogList.classList.remove('main-nav__catalog-list--visible');
      closeAdditionalList();
    };

    const openAdditionalList = () => {
      additionalList.classList.add('additional-nav-list--visible');
    };

    const closeAdditionalList = () => {
      additionalList.classList.remove('additional-nav-list--visible');
    };

    if (supportsTouch) {
      catalogLink.addEventListener('click', openCatalogList);
      catalogLink.addEventListener('touchend', openCatalogList);

      if (document.contains(brushesLink) && window.innerWidth > 1023) {
        brushesLink.addEventListener('click', openAdditionalList);
        brushesLink.addEventListener('touchend', openAdditionalList);

        window.addEventListener('resize', () => {
          if (window.innerWidth < 1024) {
            brushesLink.removeEventListener('click', openAdditionalList);
            brushesLink.removeEventListener('touchend', openAdditionalList);
          }
        });
      }

      window.addEventListener('resize', () => {
        if (document.contains(brushesLink) && window.innerWidth > 1023) {
          brushesLink.addEventListener('click', openAdditionalList);
          brushesLink.addEventListener('touchend', openAdditionalList);
        }
        if (window.innerWidth < 1024) {
          closeAdditionalList();
          closeCatalogList();
        }
      });

      document.addEventListener('click', (evt) => {
        if (evt.target !== brushesLink && evt.target !== additionalList && evt.target !== catalogLink && evt.target !== catalogList) {
          closeCatalogList();
        }
      });
    } else {
      brushesLink.addEventListener('mouseenter', function () {
        if (window.innerWidth > 1023) {
          openAdditionalList();
        }
      });

      brushes.addEventListener('mouseleave', function (evt) {
        if (evt.relatedTarget === additionalList) {
          openAdditionalList();
        }

        const brushesLinks = document.querySelectorAll('.main-nav__catalog-link');

        brushesLinks.forEach((link) => {
          if (evt.relatedTarget === link) {
            closeAdditionalList();
          }

          if (evt.target === link) {
            closeAdditionalList();
          }
        });
      });

      additionalList.addEventListener('mouseleave', closeAdditionalList);

      if (catalogLink) {
        catalogLink.addEventListener('mouseout', function (evt) {
          if (evt.relatedTarget !== catalogList) {
            closeCatalogList();
          }
        });

        catalogLink.addEventListener('mouseover', openCatalogList);
        catalogLink.addEventListener('focus', openCatalogList);
      }

      catalogList.addEventListener('mouseleave', closeCatalogList);
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) {
        closeCatalogList();
      }
    });
  }
};

export {initAdditionalMenu};
