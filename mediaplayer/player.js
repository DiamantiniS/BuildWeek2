const audio = document.getElementById("song");
const playPauseButton = document.querySelector(".play-pause");
const volumeControl = document.getElementById('volume-control');
const currentTimeSpan = document.querySelector('.progress-container span:first-child');
const durationSpan = document.querySelector('.progress-container span:last-child');

playPauseButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    playPauseButton.classList.remove("fa-play");
    playPauseButton.classList.add("fa-pause");
  } else {
    audio.pause();
    playPauseButton.classList.remove("fa-pause");
    playPauseButton.classList.add("fa-play");
  }
});

audio.addEventListener("timeupdate", function () {
  const progress = (audio.currentTime / audio.duration) * 100;
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = progress + "%";
});

volumeControl.addEventListener('input', function() {
    audio.volume = volumeControl.value;
});


audio.addEventListener('timeupdate', () => {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);

    const formattedTime = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    currentTimeSpan.textContent = formattedTime;
});

audio.addEventListener('loadedmetadata', () => {
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);

    const formattedDuration = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

    durationSpan.textContent = formattedDuration;
});