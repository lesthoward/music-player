const musicContainer = document.querySelector('.music')
// Audio and images
const audio = document.querySelector('.music__audio');
const image = document.querySelector('.music__img');
const musicName = document.querySelector('.music__name')
// Player buttons
const btnPlay = document.querySelector('.music__play');
const btnPrev = document.querySelector('.music__prev');
const btnNext = document.querySelector('.music__next');
// Progress bar
const progressWrapper = document.querySelector('.music__progressbar');
const progress = document.querySelector('.music__progress');

// Songs and indexes
const songs = ['hey', 'summer', 'ukulele']
let songIndex = 0

// No cargar el loadSong en play para guardar el tiempo actual de la música, de otro modo, cada vez que se ejecuta "playSong" se cargaría el src y por lo tanto desde el segundo 0
loadSong ()
function loadSong () {
    musicName.innerText = songs[songIndex]
    audio.src = `./music/${songs[songIndex]}.mp3`
    image.src = `./images/${songs[songIndex]}.jpg`
}


function nextSong () {
    songIndex++
    console.log(songIndex);

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    audio.src = `./music/${songs[songIndex]}.mp3`
    image.src = `./images/${songs[songIndex]}.jpg`
    loadSong () 
    playSound ()
}



function prevSound () {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    audio.src = `./music/${songs[songIndex]}.mp3`
    image.src = `./images/${songs[songIndex]}.jpg`
    loadSong ()
    playSound ()
}


function playSound () {
    if (audio.paused) {
        musicContainer.classList.add('music--play')
        btnPlay.className = 'music__play fas fa-play'
        audio.play()
    } else {
        btnPlay.className = 'music__play fas fa-pause'
        musicContainer.classList.remove('music--play')
        audio.pause()
    }
}

// Arrojar todos los eventos desde el elemento padre
musicContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('music__play')) {
        playSound ()
    }

    if (e.target.classList.contains('music__prev')) {
        prevSound ()
    }

    if (e.target.classList.contains('music__next')) {
        nextSong ()
    }
})

audio.addEventListener('ended', () => nextSong())


function formatTime () {
    const timeString = (audio.currentTime / 60).toString()
    const firstCharacter = timeString.charAt(0)
    const afterString = timeString.slice(2, 4)
    return firstCharacter + ':' + afterString
}

function updateProgress(audioTarget) {
    const time = document.querySelector('.music__time');
    const { currentTime, duration } = audioTarget.target
    const progressPercent = (currentTime / duration) * 100
    progress.style.width =   progressPercent + '%'
    // console.log((currentTime / 60).toString());

    time.textContent = formatTime ()
}

audio.addEventListener('timeupdate', updateProgress)

function setProgress (e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
    
}

progressWrapper.addEventListener('click', setProgress )
