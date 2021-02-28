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
  const productImage = product.querySelector('.product__image');

  const setProductBackground = () => {
    let productImageLeft = productImage.getBoundingClientRect().left;
    productBackground.style.setProperty('--backgroundProductWidth', productImageLeft + productImage.offsetWidth + 'px');
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
