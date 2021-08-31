export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoIcon = document.querySelectorAll('.video-icon');
  const videoVolume = document.querySelector('.video-volume');
  const videoFullscreen = document.querySelector('.video-fullscreen');
  

  //функци ясмены иконки

  const toggleIcon = () => {
      if (videoPlayer.paused) {
          videoButtonPlay.classList.remove('fa-pause');
          videoButtonPlay.classList.add('fa-play');
      } else {
          videoButtonPlay.classList.add('fa-pause');
          videoButtonPlay.classList.remove('fa-play');
      }
  }

// функция паузы и запуска
  const toggleplay = (event) => {
      event.preventDefault();
      if (videoPlayer.paused) {
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      } 
  };

// функция стоп
  const stopPlay = () => {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
  };
// добавляет ноль в прогресс
  const addZero = n => n < 10 ? '0'+ n : n;

  const changeValue = () => {
      const valueVolume = videoVolume.value;
      videoPlayer.volume = valueVolume / 100;
  };
  
  videoPlayer.addEventListener('click', toggleplay);
  videoButtonPlay.addEventListener('click', toggleplay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
       const currentTime = videoPlayer.currentTime;
       const duration = videoPlayer.duration;

       videoProgress.value = (currentTime / duration) * 100;

       let minutePassed = Math.floor(currentTime / 60);
       let secondsPassed = Math.floor(currentTime % 60);

       let minuteTotal = Math.floor(duration / 60);
       let secondsTotal = Math.floor(duration % 60);

       videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
       videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
 
  });

  videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
  });

  videoVolume.addEventListener('input', changeValue);

  videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
        videoPlayer.controls = true;
  });

  videoPlayer.addEventListener('volumechange', () => {
      videoVolume.value = Math.round(videoPlayer.volume * 100);
  });

  videoPlayer.addEventListener('fullscreenchange', () => {
      if(document.fullscreen){
         videoPlayer.controls = true;
      } else {
         videoPlayer.controls = false;
      }
  });

    changeValue();

    videoPlayerInit.stop = () => {
        videoPlayer.pause();
        toggleIcon();
    };

};