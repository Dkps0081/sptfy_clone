console.log("Welcome to spotify");
//initialise the variables
let songIndex = 1;
//let index = document.getElementById('index');
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let mastersongname = document.getElementById("mastersongname");


let songs = [
    { songname: "Burjkhalifa", filepath: "song/1.mp3", coverpath: "cover/1.jpg" },
    { songname: "chain apko mila", filepath: "song/2.mp3", coverpath: "cover/2.jpg" },
    { songname: "Dilade ghar-good news", filepath: "song/3.mp3", coverpath: "cover/3.jpg" },
    { songname: "coca cola", filepath: "song/4.mp3", coverpath: "cover/4.jpg" },
    { songname: "Let me love you", filepath: "song/5.mp3", coverpath: "cover/5.jpg" },
    { songname: "Nachenge sari rat", filepath: "song/5.mp3", coverpath: "cover/6.jpg" },
    { songname: "O-Antava-Mava", filepath: "song/5.mp3", coverpath: "cover/7.jpg" }
]

//setting the names and images of each song
songItems.forEach((element, i) => {
        //console.log(element, i)
        element.getElementsByTagName("img")[0].src = songs[i].coverpath;
        element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
        //element.getElementsByClassName("timestamp")[0].innerText = songs[i].duration;
    })
    //make all pause icons to play icon in case of music stops
const makeallplays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

//handle play/pause click
masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    })
    //listen to events
audioElement.addEventListener('timeupdate', () => {
    //console.log('timeupdate');
    //update progress bar
    progress = parseInt(audioElement.currentTime / audioElement.duration * 100);
    //console.log(progress);
    myProgressbar.value = progress;

})

myProgressbar.addEventListener('change', () => {
    audioElement.currentTime = myProgressbar.value * audioElement.duration / 100;
})


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        //console.log(e.target);
        songIndex = parseInt(e.target.id);
        //console.log(Index);
        makeallplays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `song/${songIndex}.mp3`;
        mastersongname.innerText = songs[songIndex - 1].songname;
        //console.log(mastersongname.innerText);
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 1;
    } else {
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    mastersongname.innerText = songs[songIndex - 1].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 7;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    mastersongname.innerText = songs[songIndex - 1].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})