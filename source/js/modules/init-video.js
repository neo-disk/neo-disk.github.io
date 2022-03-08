const initVideo = () => {
  const video = document.querySelector('.video');

  if (!video) {
    return;
  }

  const loader = document.querySelector('.video__loader');
  const videoPlayer = document.querySelector('.video__player');
  function showVideo() {
    loader.classList.add('video__loader--hidden');
    videoPlayer.classList.add('visible');
  }
  setTimeout(showVideo, 1000);
};

export {initVideo};
