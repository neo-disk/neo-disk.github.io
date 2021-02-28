function isTouchDevice() {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
}

function setHeaderScripts() {
  const header = document.querySelector('.header');
  const mainNavElement = document.querySelector('.header .main-nav');
  const mainNavOpenElement = document.querySelector('.header .main-nav__open');
  const mainNavCloseElement = document.querySelector('.header .main-nav__close');
  const mainNavWrapperElement = document.querySelector('.header .main-nav__wrapper');
  const secondLevelWrapperElements = document.querySelectorAll('.header .main-nav__second-level-wrapper');
  const secondLevelItemElements = document.querySelectorAll('.header .main-nav__second-level-item');
  const thirdLevelLinks = document.querySelectorAll('.header .main-nav__third-level-link')

  let lastActiveSecondLevel = null;
  let activated = false;
  let thirdLevelTimer = null;
  let lastType = null;

  const ListenersTypes = {
    CLICK: 'click',
    HOVER: 'hover',
  };

  function determinListenersType() {
    if (isTouchDevice() || window.innerWidth < 768) {
      return ListenersTypes.CLICK;
    } else {
      return ListenersTypes.HOVER;
    }
  }

  function adjustHeight(secondLevelItemElement, reset) {
    const secondLevelListElement = secondLevelItemElement.closest('.main-nav__second-level-list');
    const thirdLevelLIstElement = secondLevelItemElement.querySelector('.main-nav__third-level-list');

    secondLevelListElement.style.minHeight = '0';

    if (thirdLevelLIstElement) {
      thirdLevelLIstElement.style.minHeight = '0';

      if (window.innerWidth >= 768 && !reset) {
        const seconLevelListHeight = secondLevelListElement.offsetHeight;
        const thirdLevelListHeight = thirdLevelLIstElement.offsetHeight;

        if (thirdLevelListHeight > seconLevelListHeight) {
          secondLevelListElement.style.minHeight = thirdLevelListHeight + 'px';
        } else {
          thirdLevelLIstElement.style.minHeight = seconLevelListHeight + 'px';
        }
      }
    }
  }

  // function resetSecondLevelHeight() {
  //   secondLevelWrapperElements.forEach(function (secondLevelWrapperElement) {
  //     const secondLevelListElement = secondLevelWrapperElement.querySelector('.main-nav__second-level-list');

  //     secondLevelListElement.style.minHeight = '0';
  //   });
  // }

  function procesShowThirdLevel(secondLevelItemElement) {
    if (secondLevelItemElement.classList.contains('main-nav__second-level-item--with-submenu')) {
      const secondLevelWrapperElement = secondLevelItemElement.closest('.main-nav__second-level-wrapper');

      secondLevelWrapperElement.classList.add('main-nav__second-level-wrapper--third-level-active');
      secondLevelItemElement.classList.add('main-nav__second-level-item--active');
      adjustHeight(secondLevelItemElement);

      lastActiveSecondLevel = secondLevelItemElement;
      activated = true;
    }
  }

  function hideThirdLevel(secondLevelItemElement) {
    const secondLevelWrapperElement = secondLevelItemElement.closest('.main-nav__second-level-wrapper');

    secondLevelWrapperElement.classList.remove('main-nav__second-level-wrapper--third-level-active');
    secondLevelItemElement.classList.remove('main-nav__second-level-item--active');

    adjustHeight(secondLevelItemElement, true);
  }

  function clickHandler(evt) {
    if (mainNavCloseElement === evt.target || mainNavCloseElement.contains(evt.target) || !(mainNavWrapperElement === evt.target || mainNavWrapperElement.contains(evt.target))) {
      mainNavElement.classList.remove('main-nav--mobile-active');
    }
    if (mainNavOpenElement === evt.target || mainNavOpenElement.contains(evt.target)) {
      mainNavElement.classList.add('main-nav--mobile-active');
    }

    secondLevelWrapperElements.forEach(function (secondLevelWrapperElement) {
      const firstLevelItemElement = secondLevelWrapperElement.closest('.main-nav__item');
      const firstLevelLinkElement = firstLevelItemElement.querySelector('.main-nav__link');

      if (firstLevelItemElement === evt.target || firstLevelItemElement.contains(evt.target)) {
        if ((firstLevelLinkElement === evt.target || firstLevelLinkElement.contains(evt.target)) && window.innerWidth >= 768) {
          evt.preventDefault();
        }
        secondLevelWrapperElement.classList.add('main-nav__second-level-wrapper--shown');
      } else {
        secondLevelWrapperElement.classList.remove('main-nav__second-level-wrapper--shown');
      }
    });

    secondLevelItemElements.forEach(function (secondLevelItemElement) {
      const secondLevelLinkElement = secondLevelItemElement.querySelector('.main-nav__second-level-link');
      const thirdLevelListElement = secondLevelItemElement.querySelector('.main-nav__third-level-list');

      if (secondLevelItemElement.classList.contains('main-nav__second-level-item--with-submenu') && (secondLevelLinkElement === evt.target || secondLevelLinkElement.contains(evt.target))) {
        evt.preventDefault();
      }

      if (thirdLevelListElement && (thirdLevelListElement === evt.target || thirdLevelListElement.contains(evt.target))) {
        activated = true;
      } else if ((secondLevelItemElement === evt.target || secondLevelItemElement.contains(evt.target)) && secondLevelItemElement !== lastActiveSecondLevel) {
        if (lastActiveSecondLevel) {
          hideThirdLevel(lastActiveSecondLevel);
        }
        procesShowThirdLevel(secondLevelItemElement);
      } else if (secondLevelItemElement === lastActiveSecondLevel) {
        hideThirdLevel(secondLevelItemElement);
      }
    });

    if (!activated) {
      lastActiveSecondLevel = null;
    }
    activated = false;
  }

  function setClickListeners() {
    document.addEventListener('click', clickHandler);
  }

  function removeClickListeners() {
    document.removeEventListener('click', clickHandler);
  }

  function setHoverListeners() {
    secondLevelItemElements.forEach(function (secondLevelItemElement) {
      secondLevelItemElement.onmouseenter = function () {
        if (thirdLevelTimer) {
          clearTimeout(thirdLevelTimer);
        }
        thirdLevelTimer = setTimeout(function () {
          if (lastActiveSecondLevel) {
            hideThirdLevel(lastActiveSecondLevel);
          }
          procesShowThirdLevel(secondLevelItemElement);
        }, 300);
      };
      secondLevelItemElement.onmouseleave = function () {
        if (thirdLevelTimer) {
          clearTimeout(thirdLevelTimer);
        }
        thirdLevelTimer = setTimeout(function () {
          if (lastActiveSecondLevel) {
            hideThirdLevel(lastActiveSecondLevel);
          }
          lastActiveSecondLevel = null;
        }, 300);
      };
    });
  }

  function removeHoverListeners() {
    secondLevelItemElements.forEach(function (secondLevelItemElement) {
      secondLevelItemElement.onmouseenter = null;
      secondLevelItemElement.onmouseleave = null;
    });
  }

  function setFocusListeners() {
    secondLevelWrapperElements.forEach(function (secondLevelWrapperElement) {
      const firstLevelItemElement = secondLevelWrapperElement.closest('.main-nav__item');
      const firstLevelLinkElement = firstLevelItemElement.querySelector('.main-nav__link');

      firstLevelLinkElement.onfocus = () => {
        secondLevelWrapperElement.classList.add('main-nav__second-level-wrapper--shown');
      };
      firstLevelLinkElement.onblur = () => {
        secondLevelWrapperElement.classList.remove('main-nav__second-level-wrapper--shown');
      };
    });

    secondLevelItemElements.forEach(function (secondLevelItemElement) {
      const secondLevelWrapperElement = secondLevelItemElement.closest('.main-nav__second-level-wrapper');
      const secondLevelLinkElement = secondLevelItemElement.querySelector('.main-nav__second-level-link');

      secondLevelLinkElement.onfocus = () => {
        secondLevelWrapperElement.classList.add('main-nav__second-level-wrapper--shown');
        procesShowThirdLevel(secondLevelItemElement);
      };
      secondLevelLinkElement.onblur = () => {
        secondLevelWrapperElement.classList.remove('main-nav__second-level-wrapper--shown');
        hideThirdLevel(secondLevelItemElement);
        lastActiveSecondLevel = null;
      };
    });

    thirdLevelLinks.forEach(function (thirdLevelLink) {
      const secondLevelWrapperElement = thirdLevelLink.closest('.main-nav__second-level-wrapper');
      const secondLevelItemElement = thirdLevelLink.closest('.main-nav__second-level-item');

      thirdLevelLink.onfocus = () => {
        secondLevelWrapperElement.classList.add('main-nav__second-level-wrapper--shown');
        procesShowThirdLevel(secondLevelItemElement);
      };
      thirdLevelLink.onblur = () => {
        secondLevelWrapperElement.classList.remove('main-nav__second-level-wrapper--shown');
        hideThirdLevel(secondLevelItemElement);
        lastActiveSecondLevel = null;
      };
    });
  }

  function removeFocusListeners() {
    const linkElements = header.querySelectorAll('.main-nav__link, .main-nav__second-level-link, .main-nav__third-level-link');

    linkElements.forEach(function (linkElement) {
      linkElement.onfocus = null;
      linkElement.onblur = null;
    });
  }

  function setListeners(type) {
    if (type === ListenersTypes.CLICK) {
      removeHoverListeners();
      removeFocusListeners();
      setClickListeners();
    } else if (type === ListenersTypes.HOVER) {
      removeClickListeners();
      setHoverListeners();
      setFocusListeners();
    }
  }

  if (header) {
    setListeners(determinListenersType());
    document.addEventListener('click', function (evt) {
      secondLevelWrapperElements.forEach(function (secondLevelWrapperElement) {
        if (!(secondLevelWrapperElement === evt.target || secondLevelWrapperElement.contains(evt.target))) {
          secondLevelWrapperElement.classList.remove('main-nav__second-level-wrapper--shown');
        }
      });
    });

    window.addEventListener('resize', function () {
      const type = determinListenersType();

      if (type !== lastType) {
        setListeners(type);
      }
      lastType = type;
    });
  }
}

export {setHeaderScripts};
