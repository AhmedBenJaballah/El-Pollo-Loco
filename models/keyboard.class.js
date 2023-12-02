class Keyboard{
    LEFT=false;
    RIGHT=false;
    UP=false;
    DOWN=false;
    SPACE=false;
    D=false;

    constructor(){
       setTimeout(() => {
        this.mobile();
       }, 1000);
    }

    mobile(){
        document.getElementById('leftT').addEventListener('touchstart',(e)=>{
            e.preventDefault();
            this.LEFT=true
        })
        document.getElementById('leftT').addEventListener('touchend',(e)=>{
            e.preventDefault();
            this.LEFT=false
        })
        document.getElementById('rightT').addEventListener('touchstart',(e)=>{
            e.preventDefault();
            this.RIGHT=true
        })
        document.getElementById('rightT').addEventListener('touchend',(e)=>{
            e.preventDefault();
            this.RIGHT=false
        })
        document.getElementById('throwT').addEventListener('touchstart',(e)=>{
            e.preventDefault();
            this.D=true
        })
        document.getElementById('throwT').addEventListener('touchend',(e)=>{
            e.preventDefault();
            this.D=false
        })
        document.getElementById('upT').addEventListener('touchstart',(e)=>{
            e.preventDefault();
            this.SPACE=true
        })
        document.getElementById('upT').addEventListener('touchend',(e)=>{
            e.preventDefault();
            this.SPACE=false
        })
    }
}

