class Chicken extends MovableObjects{

y=360;
height=60;
width=80;
chickenEnergie=1
IMAGES_WALKING=[
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
]

IMAGES_DEAD=[
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
]

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x=200 +Math.random()*1500;
        this.speed=0.15 + Math.random() * 0.5
        this.animate();
    }

   
    animate(){
        const x=setInterval(() => {
          this.moveLeft();
          }, 1000/60);
        setInterval(() => {
                if(this.chickenEnergie==0){
                    this.playAnimation(this.IMAGES_DEAD);
                    clearInterval(x);
                }
                else{
                    this.playAnimation(this.IMAGES_WALKING);
                   
                }
        }, 200);
    }
    
}