const neoDiskVideoProperties = {
  src: "video/video-main.mp4",
  width: "814",
  height: "457",
  type: "video/mp4",
  mute: "muted"
}

function renderVideoElement(containerElement) {
  const videoEl = document.createElement('video');

  videoEl.onloadeddata = () => {
    const loader = document.querySelector('.video__loader');

    function showVideo() {
      loader.classList.add('video__loader--hidden');
      videoEl.classList.add('visible');
    }

    showVideo()
  }
  videoEl.width = neoDiskVideoProperties.width
  videoEl.height = neoDiskVideoProperties.height
  videoEl.muted = neoDiskVideoProperties.mute
  // videoEl.poster= neoDiskVideoProperties.poster
  videoEl.loop = true
  videoEl.autoplay = true

  videoEl.className = 'video__player'


  containerElement.appendChild(videoEl)

  const sourceEl = document.createElement('source');

  sourceEl.type = neoDiskVideoProperties.type
  sourceEl.src = neoDiskVideoProperties.src

  videoEl.appendChild(sourceEl)
}

function loadVideo() {
  const containerElement = document.querySelector('.video-container');

  if (!containerElement) {
    return;
  }

  // ожидаем что
  // .video-container {
  //   @include vp-767 {
  //     display: none;
  //   }
  // }
  const isMobile = getComputedStyle(containerElement).display === 'none'

  if(isMobile) {
    return
  }

  const videoEl = document.querySelector('.video__player')

  if(videoEl) {
    return;
  }

  renderVideoElement(containerElement)
}

export { loadVideo };
