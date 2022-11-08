const music_container = document.getElementById("music-container");
const play_btn = document.getElementById("play");
const prev_btn = document.getElementById("prev");
const next_btn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progress_container = document.getElementById("progress-container");
const title = document.querySelector(".title");
const cover = document.getElementById("cover");
const curr_time = document.querySelector("#currTime");
const dur_time = document.querySelector("#durTime");

const songs = ["hey", "summer", "ukulele"];

// Keep track of song
let song_index = 1;

// Initially load song details into DOM
const loadSong = (song) => {
  title.innerText = song;
  audio.src = `assets/music/${song}.mp3`;
  cover.src = `assets/images/${song}.jpg`;
};

loadSong(songs[song_index]);

play_btn.addEventListener("click", () => {
  const isPlaying = music_container.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

const playSong = () => {
  music_container.classList.add("play");
  play_btn.querySelector("i.fas").classList.remove("fa-play");
  play_btn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
};

const pauseSong = () => {
  music_container.classList.remove("play");
  play_btn.querySelector("i.fas").classList.add("fa-play");
  play_btn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
};

const prevSong = () => {
   song_index--;
   if (song_index < 0) {
       song_index = songs.length - 1;
   }
   loadSong(songs[song_index]);
   playSong();
};

const nextSong = () => {
   song_index++;
   if (song_index > songs.length - 1) {
         song_index = 0;
   }
   loadSong(songs[song_index]);
   playSong();
};

const updateProgress = (e) => {
   const { duration, currentTime } = e.srcElement;
   const progressPercent = (currentTime / duration) * 100;
   progress.style.width = `${progressPercent}%`;
};

const setProgress = function(e) {
   const width = this.clientWidth;
   const clickX = e.offsetX;
   const duration = audio.duration;

   audio.currentTime = (clickX / width) * duration;
};

prev_btn.addEventListener('click', prevSong);
next_btn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress_container.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);