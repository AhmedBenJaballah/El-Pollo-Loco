class ThrowableObjects extends MovableObjects{

rotateImage=['img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
]
groundImage=['img/6_salsa_bottle/1_salsa_bottle_on_ground.png']
brokenImage=['img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
             'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
             'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
             'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
             'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
             'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
]
splash=false;

constructor(x,y){
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.rotateImage)
    this.loadImages(this.groundImage);
    this.loadImages(this.brokenImage);
    this.x=x;
    this.y=y;
    this.height=60;
    this.width=50;
    this.throw();
    this.bottleImg();
}

applyGravity(){
    setInterval(() => {
        if(this.isAboveGround() || this.speedY > 0 )
        {
            if(this.y<=380){
                this.y-=this.speedY;
                this.speedY-=this.acceleration;
                console.log(this.y)
            }
        }
    }, 1000/25);
}


isBottleOnGround(){

    
}

bottleImg(){
    setInterval(() => {

        if(this.splash){
            this.playAnimation(this.brokenImage)
        }
        else if(this.y>380){
            this.playAnimation(this.groundImage)
        }
        else{
            this.playAnimation(this.rotateImage)
        }
    }, 50);
}



throw(){
    this.speedY=20;
    this.applyGravity();
    setInterval(() => {
        if(this.speedY>-25){
            this.x+=5;
        }
    }, 20);
}
}