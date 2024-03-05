console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Back to december - Taylor Swift", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
    {songName: "Midnight Rain - Taylor Swift", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
    {songName: "The Night we Met", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Wanna be yours", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Delicate - Taylor Swift", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Slut! - Taylor Swift", filePath: "songs/2.mp3", coverPath: "covers/6.jpeg"},
    {songName: "Treat You Better", filePath: "songs/2.mp3", coverPath: "covers/7.jpeg"},
    {songName: "Ye Tune Kya Kiya", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Husn", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Rewrite the Star", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        updateNowPlayingScreen(songs[songIndex]); // Update Now Playing Screen with current song information
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateNowPlayingScreen(songs[songIndex]); // Update Now Playing Screen with current song information
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateNowPlayingScreen(songs[songIndex]); // Update Now Playing Screen with current song information
})

// Function to update Now Playing Screen with current song information
function updateNowPlayingScreen(songs) {
    let albumArtElement = document.querySelector('.nowPlayingScreen .albumArt img');
    albumArtElement.src = songs.coverPath; // Update album art image source

    let songTitleElement = document.querySelector('.nowPlayingScreen .songTitle');
    songTitleElement.textContent = songs.songName;

    let artistAlbumElement = document.querySelector('.nowPlayingScreen .artistAlbum');
    artistAlbumElement.textContent = `${songs.artist} - ${songs.album}`;
}

// Add an event listener to the "Show Lyrics" button
document.getElementById('showLyricsBtn').addEventListener('click', function() {
    // Get the ID of the currently playing song
    var currentlyPlayingSongId = "BackToDecember";

    // Construct the ID of the lyrics div based on the currently playing song ID
    var lyricsId = 'lyrics-' + currentlyPlayingSongId;

    // Get the lyrics div corresponding to the currently playing song
    var lyricsDiv = document.getElementById(lyricsId);

    // If the lyrics div exists, display it
    if (lyricsDiv) {
        // Toggle the visibility of the lyrics div
        lyricsDiv.classList.toggle('hidden');
    }
});

function toggleLyrics() {
    const lyricsContainer = document.getElementById("lyricsContainer");
    if (lyricsContainer.classList.contains('hidden')) {
        lyricsContainer.classList.remove('hidden');
    } else {
        lyricsContainer.classList.add('hidden');
    }
}
