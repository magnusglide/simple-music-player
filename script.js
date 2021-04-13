const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const volumeBtn = document.querySelector("#volumeId");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const volume = document.querySelector(".volume");
const progressContainer = document.querySelector(".progress-container");
const volumeContainer = document.querySelector(".volume-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

//Song titles
const songs = [
  "1 Lost Sky  Fearless ptII feat Chris Linton",
  "2 Sub Urban  Cradles",
  "3 DEAF KEV  Invincible",
  "4 Disfigure  Blank",
  "5 Alan Walker  Fade",
  "6 Alan Walker Spectre",
  "7 Cartoon  Why We Lose feat Coleman Trapp",
  "8 Different Heaven  EHDE  My Heart",
  "9 Elektronomia  Sky High",
  "10 Warriyo  Mortals feat Laura Brehm",
];

//Keep track of the songs
let songIndex = 0;
audio.volume = 0.5;
let audioVolumeSave = audio.volume * 100;
let isMuted = false;

//Initially load song into DOM
loadSong(songs[songIndex]);

//Update song details

function loadSong(song) {
  title.innerText = song;
  audio.src = `https://magnusglide.github.io/simple-music-player/music/${song}.mp3`;
  cover.src = `https://magnusglide.github.io/simple-music-player/images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
  const widthV = this.clientWidth;
  const clickXV = e.offsetX;

  audio.volume = clickXV / widthV;
  audioVolumeSave = audio.volume * 100;
  if (volumeBtn.querySelector("i.fas").classList.contains("fa-volume-mute")) {
    volumeBtn.querySelector("i.fas").classList.remove("fa-volume-mute");
    volumeBtn.querySelector("i.fas").classList.add("fa-volume-up");
  }
  volume.style.width = `${audioVolumeSave}%`;
}

function setMuteUnmute() {
  if (volumeBtn.querySelector("i.fas").classList.contains("fa-volume-up")) {
    audio.volume = 0;
    volumeBtn.querySelector("i.fas").classList.remove("fa-volume-up");
    volumeBtn.querySelector("i.fas").classList.add("fa-volume-mute");
  } else {
    audio.volume = audioVolumeSave / 100;
    volumeBtn.querySelector("i.fas").classList.remove("fa-volume-mute");
    volumeBtn.querySelector("i.fas").classList.add("fa-volume-up");
  }
}

//Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

//Volume settings
volumeContainer.addEventListener("click", setVolume);

volumeBtn.addEventListener("click", setMuteUnmute);
