class Chicken extends MovableObjects{

    y=370;
    height=60;
    width=80;
    chickenEnergie=1;
    hitChicken=false;
    dead_chicken_sound=new Audio('audio/dead_chicken.mp3');
    
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
            this.x=400 +Math.random()*2000;
            this.speed=0.15 + Math.random() * 0.5
            this.animate();
        }
    
       /**
        * this function is used to animate the enemies
        */
        animate(){
            const clear =setInterval(() => {
              this.moveLeft();
              }, 1000/60);
            setInterval(() => {
                    if(this.chickenEnergie==0) this.chickenIsDead(clear);
                    else if (this.chickenEnergie==1) this.playAnimation(this.IMAGES_WALKING);      
            }, 200);
        }
        
        /**
         * this function is used to undraw the killed enemy
         * @param {Interval} clear 
         */
        chickenIsDead(clear){
            this.playAnimation(this.IMAGES_DEAD);
            if(isSoundPlaying) this.dead_chicken_sound.play();
            this.chickenEnergie=-1
            clearInterval(clear);  
        }
    }