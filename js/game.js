let canvas;
let world;
let keyboard = new Keyboard();
let startSound= new Audio('audio/start.mp3');
let isSoundPlaying = true;

/**
 * initialisation function
 */
function init(){
    canvas=document.getElementById("canvas");    
}

window.addEventListener('keydown',(e)=>{
    if(e.keyCode==39){
        keyboard.RIGHT=true;
    }
    if(e.keyCode==37){
        keyboard.LEFT=true;
    }
    if(e.keyCode==38){
        keyboard.UP=true;
    }
    if(e.keyCode==40){
        keyboard.DOWN=true;
    }
    if(e.keyCode==32){
        keyboard.SPACE=true;
    }

    if(e.keyCode==68){
        keyboard.D=true;
    }
})

window.addEventListener('keyup',(e)=>{
    if(e.keyCode==39){
        keyboard.RIGHT=false;
    }
    if(e.keyCode==37){
        keyboard.LEFT=false;
    }
    if(e.keyCode==38){
        keyboard.UP=false;
    }
    if(e.keyCode==40){
        keyboard.DOWN=false;
    }
    if(e.keyCode==32){
        keyboard.SPACE=false;
    }
    if(e.keyCode==68){
        keyboard.D=false;
    }
})

/**
 * this function is used to play music
 */
function playAndRepeat() {
    startSound.play(); 
    if(isSoundPlaying) setTimeout(playAndRepeat, startSound.duration * 1000);
}

/**
 * this function is used to start he game
 */
function startGame() {
    if(isSoundPlaying)playAndRepeat()
    let canvas = document.getElementById('canvas');
    let start = document.getElementById('start');
    let startBtn = document.getElementById('startBtn');
    initLevel();
    world= new World(canvas,keyboard,isSoundPlaying);
        setTimeout(() => {
            start.style.display='none';
            startBtn.style.display='none';
            canvas.style.display='block';
        }, 50);
}

/**
 * this function is used to toggle the music sound and icon
 */
function toggleSound() {
    let soundIcon = document.getElementById("soundIcon");
    if (soundIcon.classList.contains("bi-volume-up-fill")) {
        soundIcon.classList.remove("bi-volume-up-fill");
        soundIcon.classList.add("bi-volume-mute-fill");
    } else {
        soundIcon.classList.remove("bi-volume-mute-fill");
        soundIcon.classList.add("bi-volume-up-fill");
    }
    if (isSoundPlaying) pauseSound();
    else playSound();
}

/**
 * this function is used to play the music
 */
function playSound() {
    isSoundPlaying = true;
    startSound.play();
    startSound.muted = false;
}

/**
 * this function is used to pause the function
 */
function pauseSound() {
    isSoundPlaying = false;
    startSound.pause();
    startSound.muted = true;
}
