const header = document.querySelector('header');
const headerContacts = header.querySelector('.header__contacts');
const promo = document.querySelector('.promo');

if (promo) {
  const promoBackground = document.querySelector('.promo__background');

  const setMainBackground = () => {
    let headerContactsProductLeft = headerContacts.getBoundingClientRect().left;
    promoBackground.style.setProperty('--backgroundMainWidth', window.innerWidth - headerContactsProductLeft + 'px');
  };

  setMainBackground();

  window.addEventListener('resize', function () {
    setMainBackground();
  });
}

const product = document.querySelector('.product');
if (product) {
  const productBackground = product.querySelector('.product__background');
  const productImages = product.querySelectorAll('.product__image');
  const productText = product.querySelector('.product__text');
  const productWrapper = product.querySelector('.product__wrapper');

  const productImagesLength = productImages.length.toString();

  productText.style.setProperty('--productImagesLength', productImagesLength);
  productWrapper.style.setProperty('--productImagesLengthMinusOne', (productImages.length - 1).toString());

  const firstImage = productImages[0];
  const setProductBackground = () => {
    let productImageLeft = firstImage.getBoundingClientRect().left;
    productBackground.style.setProperty('--backgroundProductWidth', productImageLeft + firstImage.offsetWidth + 'px');

    let headerContactsProductLeft = headerContacts.getBoundingClientRect().left;
    productBackground.style.setProperty('--headerContactsProduct', window.innerWidth - headerContactsProductLeft + 20 + 'px');
  };

  setProductBackground();

  window.addEventListener('resize', function () {
    setProductBackground();
  });
}

const partners = document.querySelector('.partners');

if (partners) {
  const partnersBackground = document.querySelector('.partners__background');

  const setPartnersBackground = () => {
    let headerContactsProductLeft = headerContacts.getBoundingClientRect().left;
    partnersBackground.style.setProperty('--backgroundPartnersWidth', window.innerWidth - headerContactsProductLeft + 'px');
  };

  setPartnersBackground();

  window.addEventListener('resize', function () {
    setPartnersBackground();
  });
}
