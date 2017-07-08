window.addEventListener("load", function(){

  video = document.getElementById('video');

  playButton = document.getElementById('play-button');

  pbarContainer = document.getElementById("pbar-container");  
  pbar = document.getElementById('pbar');

  timeField = document.getElementById('time-field');

  soundButton = document.getElementById('sound-button');
  sbarContainer = document.getElementById('sbar-container');
  sbar = document.getElementById('sbar');
  fullscreenButton = document.getElementById("fullscreen-button");
  screenButton = document.getElementById("screen-button");
  pauseScreen = document.getElementById("screen");

  video.load();
  video.addEventListener("canplay", function(){
      playButton.addEventListener("click", playOrPause, false);
      pbarContainer.addEventListener("click", skip, false);
      soundButton.addEventListener("click", muteOrUnmute, false);
      sbarContainer.addEventListener("click", changeVolume, false);
      fullscreenButton.addEventListener("click", fullscreen, false);
      screenButton.addEventListener("click", playOrPause, false);
      updatePlayer();
  }, false);

}, false);


  function playOrPause(){
    if(video.paused){
      video.play();
      playButton.src = "images/pause.png";
      update = setInterval(updatePlayer, 30); //Call updatePlayer for every 30 milli seconds

      screenButton.src = "images/replay.png";
      pauseScreen.style.display = 'none';
    }
    else{
      video.pause();
      playButton.src = "images/play.png";
      window.clearInterval(update);

      screenButton.src = "images/play.png";
      pauseScreen.style.display = 'block';
    }
  }

  function updatePlayer() {
    var percentage = (video.currentTime / video.duration) * 100;
    pbar.style.width = percentage + '%';
    timeField.innerText = getFormattedTime();
    if(video.ended) {
      window.clearInterval(update);
      playButton.src = "images/replay.png"

      screenButton.src = "images/replay.png";
      pauseScreen.style.display = 'block';
    }
    else if (video.paused) {
      playButton.src = "images/play.png";
      screenButton.src = "images/play.png";
    }
  }

  function skip(ev) {
    var mouseX = ev.pageX - pbarContainer.offsetLeft; 
    var width = window.getComputedStyle(pbarContainer).getPropertyValue("width");
    width = parseFloat(width.substr(0, width.length - 2)); 
      
    video.currentTime = (mouseX / width) * video.duration; 

    updatePlayer();
  }

  function getFormattedTime() {
    // min : sec
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds / 60);
  
    if (minutes > 0)
      seconds -= minutes * 60;

    if (seconds.toString().length == 1)
      seconds = '0' + seconds;

    var  totSeconds = Math.round(video.duration);
    var totMinutes = Math.floor(totSeconds / 60);

    if (totMinutes > 0)
      totSeconds -= (totMinutes * 60); 

    if (totSeconds.toString().length == 1)
      totSeconds = '0' + totSeconds;

    var strFormattedTimeStr = minutes + ":"  + seconds + " / " + totMinutes + ":" + totSeconds;
    return strFormattedTimeStr;
  }

  function muteOrUnmute() {
      if (!video.muted) {
        video.muted = true;
        soundButton.src = "images/mute.png";
        sbar.style.display = "none";
      }
      else {
        video.muted = false;
        soundButton.src = "images/sound.png";
        sbar.style.display = "block";
      }
  }

  function changeVolume(ev) {
      var mouseX = ev.pageX - sbarContainer.offsetLeft;
      var width = window.getComputedStyle(sbarContainer).getPropertyValue("width");
      width = parseFloat(width.substr(0, width.length - 2));

      video.volume = (mouseX / width); // If (mouseX / width) is 0, then it is no volume.  It (mouseX / width) is 1, then it is high volume.
      sbar.style.width = (mouseX / width) * 100 + '%';

      if(video.muted){
        video.muted = false;
        soundButton.src = "images/sound.png";
        sbar.style.display = "block";
      }
  }

  function fullscreen() {
    if(video.requestFullscreen) { 
        video.requestFullscreen();
    }
    else if(video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
    else if(video.mozkitRequestFullscreen) {
        video.mozkitRequestFullscreen();
    }
    else if(video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
  }