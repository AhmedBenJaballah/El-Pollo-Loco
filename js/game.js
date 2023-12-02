let canvas;
let world;
let keyboard = new Keyboard();
let startSound= new Audio('audio/start.mp3');
let isSoundPlaying = true;


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

function playAndRepeat() {
    startSound.play(); 
    if(isSoundPlaying) setTimeout(playAndRepeat, startSound.duration * 1000);
}

function startGame() {
    if(isSoundPlaying)playAndRepeat()
    let canvas = document.getElementById('canvas');
    let start = document.getElementById('start');
    initLevel();
    world= new World(canvas,keyboard,isSoundPlaying);
        setTimeout(() => {
            start.style.display='none';
            canvas.style.display='block';
        }, 50);
}

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

function playSound() {
    isSoundPlaying = true;
    startSound.play();
    startSound.muted = false;
}

function pauseSound() {
    isSoundPlaying = false;
    startSound.pause();
    startSound.muted = true;
}
