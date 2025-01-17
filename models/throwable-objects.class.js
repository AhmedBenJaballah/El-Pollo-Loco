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
hitBoss= false;
throw_sound= new Audio('audio/throw.mp3');

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

/**
 * this function is used to attract the bottle to the ground
 */
applyGravityB(){
    setInterval(() => {
        if(this.isAboveGround() || this.speedY > 0 )
        {
            if(this.y<=380){
                this.y-=this.speedY;
                this.speedY-=this.acceleration;
            }
        }
    }, 1000/25);
}

/**
 * this function is used to check the right bottle image
 */
bottleImg(){
    setInterval(() => {
        if(this.splash) this.playAnimation(this.brokenImage)
        else if(this.y>380) this.playAnimation(this.groundImage)
        else this.playAnimation(this.rotateImage)
    }, 50);
}

/**
 * this function is used to throw bottels
 */
throw(){
    this.speedY=20;
    this.applyGravityB();
    setInterval(() => {
        if(this.speedY>-25){
            this.x+=5;
        }
    }, 20);
    if(isSoundPlaying) this.throw_sound.play(); 
}
}