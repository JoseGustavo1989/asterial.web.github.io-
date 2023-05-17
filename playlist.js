const songs = [
  {title: 'All them witches - Elk blood heart', src: './audio/All them witches - Elk blood heart.mp3'},
  {title: 'Best Frenz - Ugly Ending', src: './audio/Best Frenz - Ugly Ending.mp3'},
  {title: 'Billie Eilish - Oxytocin', src: './audio/Billie Eilish - Oxytocin.mp3'},
  {title: 'Clams Casino - I am God', src: './audio/Clams Casino - I am God.mp3'},
  {title: 'Depeche Mode - Soothe My Soul', src: './audio/Depeche Mode - Soothe My Soul.mp3'},
  {title: 'Filter - Hey Man Nice Shot', src: './audio/Filter - Hey Man Nice Shot.mp3'},
  {title: 'Fink - Pilgrim', src: './audio/Fink - Pilgrim.mp3'},
  {title: 'Lord Huron - Meet me in the Woods', src: './audio/Lord Huron - Meet me in the Woods.mp3'},
  {title: 'Lorn - Acid Rain', src: './audio/Lorn - Acid Rain.mp3'},
  {title: 'Massive Attack - Silent Spring', src: './audio/Massive Attack - Silent Spring.mp3'},
  {title: 'My Chemical Mary - Candy Cemetery', src: './audio/My Chemical Mary - Candy Cemetery.wav'},
  {title: 'My Chemical Mary - Romance Cemetery', src: './audio/My Chemical Mary - Romance Cemetery.wav'},
  {title: 'My Chemical Mary - The Summer in the Air', src: './audio/My Chemical Mary - The Summer in the Air.wav'},
  {title: 'Polo & Pan - Dorothy', src: './audio/Polo & Pan - Dorothy.mp3'},
  {title: 'Queens Of The Stone Age - Make It Wit Chu', src: './audio/Queens Of The Stone Age - Make It Wit Chu.mp3'},
  {title: 'Radiohead - The National Anthem', src: './audio/Radiohead - The National Anthem.mp3'},
  {title: 'The Church - Numbers', src: './audio/The Church - Numbers.mp3'},
  {title: 'The Rubens - I will Surely Die', src: './audio/The Rubens - I will Surely Die.mp3'},
  {title: 'The xx - Swept Away', src: './audio/The xx - Swept Away.mp3'},
  {title: 'Two Feet - Devil', src: './audio/Two Feet - Devil.mp3'},
  {title: 'X Ambassadors - Beautiful Liar', src: './audio/X Ambassadors - Beautiful Liar.mp3'},
];

const audio = new Audio();
const playlist = document.getElementById('songs');
const progressContainer = document.querySelector('.progressContainer');
const progress = document.querySelector('.progress');

let currentSongIndex = 0;

function playSong(index) {
  if (index >= 0 && index < songs.length) {
    if (currentSongIndex !== index) {
      currentSongIndex = index;
      audio.src = songs[index].src;
    }
    audio.play();
    document.querySelector('.title').textContent = songs[index].title;
    document.querySelector('.play i').classList.remove('fa-play');
    document.querySelector('.play i').classList.add('fa-pause');
    currentSongIndex = index; // actualizar el índice actual
    
    // Eliminar eventos 'pause' y 'play'
    audio.removeEventListener('pause', updatePlayButton);
    audio.removeEventListener('play', updatePlayButton);

    // Agregar eventos 'pause' y 'play' nuevamente
    audio.addEventListener('pause', updatePlayButton);
    audio.addEventListener('play', updatePlayButton);
  }
}

function nextSong() {
  const nextIndex = (currentSongIndex + 1) % songs.length;
  playSong(nextIndex);
}

function prevSong() {
  const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(prevIndex);
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    document.querySelector('.play i').classList.remove('fa-play');
    document.querySelector('.play i').classList.add('fa-pause');
  } else {
    audio.pause();
    document.querySelector('.play i').classList.remove('fa-pause');
    document.querySelector('.play i').classList.add('fa-play');
  }
  
  // Buscar la canción actual en la matriz de canciones
  const currentSongSrc = audio.src;
  const currentSongIndex = songs.findIndex(song => song.src === currentSongSrc);
  // Establecer el índice actual
  if (currentSongIndex !== -1) {
    currentSongIndex = currentSongIndex;
  }
}

function updatePlayButton() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;

  if (audio.paused) {
    document.querySelector('.play i').classList.remove('fa-pause');
    document.querySelector('.play i').classList.add('fa-play');
  } else {
    document.querySelector('.play i').classList.remove('fa-play');
    document.querySelector('.play i').classList.add('fa-pause');
  }
}

function handleProgressClick(e) {
  const progressBarWidth = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / progressBarWidth) * duration;
}

audio.addEventListener('ended', nextSong);
audio.addEventListener('pause', updatePlayButton);
audio.addEventListener('play', updatePlayButton);
audio.addEventListener('timeupdate', updatePlayButton);
progressContainer.addEventListener('click', handleProgressClick);

function handleProgressClick(e) {
  const progressBarWidth = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  const currentTime = (clickX / progressBarWidth) * duration;
  audio.currentTime = currentTime;
}

playlist.addEventListener('click', e => {
  const index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement);
  playSong(index);
});

document.querySelector('.next').addEventListener('click', nextSong);
document.querySelector('.prev').addEventListener('click', prevSong);
document.querySelector('.play').addEventListener('click', togglePlay);

// Reproducir automáticamente la primera canción al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  audio.addEventListener('canplay', () => {
    audio.play();
  }, { once: true });

  audio.addEventListener('play', () => {
    document.querySelector('.play i').classList.remove('fa-play');
    document.querySelector('.play i').classList.add('fa-pause');
  }, { once: true });

  audio.src = songs[0].src;
});


playSong(0);
