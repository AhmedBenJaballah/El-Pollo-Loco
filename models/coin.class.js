class Coin extends MovableObjects{
    width=150;
    height=150;

    constructor(imagePath,x,y){
        super().loadImage(imagePath);
        this.x=x
        this.y=y;
    }

}