const neoDiskVideoProperties = {
  src: "video/neo-disk.mp4",
  width: "814",
  height: "457",
  type: "video/mp4",
  mute: "muted"
}

function renderVideoElement(containerElement) {
  const videoEl = document.createElement('video');

  videoEl.width = neoDiskVideoProperties.width;
  videoEl.height = neoDiskVideoProperties.height;
  // videoEl.poster= neoDiskVideoProperties.poster
  videoEl.loop = true
  videoEl.autoplay = true
  videoEl.muted = true
  videoEl.playsinline = true;
  videoEl.controls = true;
  videoEl.className = 'video__player';

  videoEl.onloadeddata = () => {
    const loader = document.querySelector('.video__loader');
    function showVideo() {
      loader.classList.add('video__loader--hidden');
      videoEl.classList.add('visible');
    }

    showVideo();
  }

  containerElement.appendChild(videoEl);

  const sourceEl = document.createElement('source');

  sourceEl.type = neoDiskVideoProperties.type;
  sourceEl.src = neoDiskVideoProperties.src;

  videoEl.appendChild(sourceEl);

  // function showOverlay() {
  //   const overlay = document.querySelector('.video__overlay');
  //   overlay.classList.remove('hidden')
  //
  //   const turnSoundOnEl = overlay.querySelector('.on');
  //   const turnSoundOffEl = overlay.querySelector('.off');
  //
  //   turnSoundOnEl.onclick = () => {
  //     // videoEl.removeAttribute("muted");
  //     videoEl.setAttribute('muted', false);
  //     turnSoundOnEl.classList.add('hidden')
  //     turnSoundOffEl.classList.remove('hidden')
  //   }
  //
  //   turnSoundOffEl.onclick = () => {
  //     // videoEl.removeAttribute("muted");
  //     videoEl.setAttribute('muted', true);
  //     turnSoundOffEl.classList.add('hidden');
  //     turnSoundOnEl.classList.remove('hidden');
  //   }
  // }
  //
  // showOverlay();
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
