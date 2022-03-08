const initReadMore = () => {
  const readMoreButton = document.querySelector('.read-more');
  if (readMoreButton) {
    const text = document.querySelector('.shop-content-text');

    readMoreButton.addEventListener('click', (e) => {
      e.preventDefault();
      text.classList.add('show-more');
      readMoreButton.style.display = 'none';
    });
  }
};
export {initReadMore};
