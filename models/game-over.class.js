class GameOver extends MovableObjects{
    width=720;
    height=480;
    y=0;
    
    constructor(x){
        super().loadImage('img/9_intro_outro_screens/game_over/game over!.png')
        this.x=x
    }

}