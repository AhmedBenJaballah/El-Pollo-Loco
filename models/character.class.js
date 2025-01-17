class Character extends MovableObjects{

    height=280;
    y=80;
    speed=10;
    world;
    walking_sound= new Audio('audio/walk.mp3');
    jumping_sound= new Audio('audio/jump.mp3');
    hurt_sound= new Audio('audio/hurt.mp3');
    dead_sound= new Audio('audio/dead.mp3');

    IMAGES_SLEEP=[
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    IMAGES_WAIT=[
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_WALKING=[
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING=[
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD=[
       ' img/2_character_pepe/5_dead/D-51.png',
       ' img/2_character_pepe/5_dead/D-52.png',
       ' img/2_character_pepe/5_dead/D-53.png',
       ' img/2_character_pepe/5_dead/D-54.png',
       ' img/2_character_pepe/5_dead/D-55.png',
       ' img/2_character_pepe/5_dead/D-56.png',
       ' img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT=[
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    lastInteractionTime = new Date()
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_WAIT);
        this.applyGravity();
        this.animate();
    }


    /**
     * this function is used to animate pepe
     */
    animate(){
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) this.pepeMoveRight();
            if(this.world.keyboard.LEFT && this.x > 0) this.pepeMoveLeft();
            this.world.camera_x= -this.x +100;
            if(this.world.keyboard.SPACE && !this.isAboveGround()) this.pepeJump();
        }, 1000/60);
        setInterval(() => {
            if (Date.now() - this.lastInteractionTime > 10000) this.playAnimation(this.IMAGES_SLEEP);
            else if(this.isDead())this.pepeDead();
            else if(this.isHurt())this.pepeHurt();
            else if(this.isAboveGround())this.playAnimation(this.IMAGES_JUMPING);
            else if(this.world.keyboard.RIGHT||this.world.keyboard.LEFT ) this.pepeWalk();
            else this.playAnimation(this.IMAGES_WAIT)
        }, 100);
    }
    
    /**
     * this function is used so pepe can jump
     */
    jump(){
        this.speedY=20;
    }

    /**
     * this function is used to make pepe move right
     */
    pepeMoveRight(){
        this.moveRight();
        this.otherDirection= false;
        if(isSoundPlaying) this.walking_sound.play();
        this.lastInteractionTime = new Date();
    }

    /**
     * this function is used to make pepe move left
     */
    pepeMoveLeft(){
        this.moveLeft();
        this.otherDirection= true;
        if(isSoundPlaying) this.walking_sound.play();
        this.lastInteractionTime = new Date();
    }

    /**
     * this function is used to make pepe jump
     */
    pepeJump(){
        this.jump();
        if(isSoundPlaying)this.jumping_sound.play();
        this.lastInteractionTime = new Date();
    }

    /**
     * this funcion is used to animate pepe if he dies
     */
    pepeDead(){
        this.playAnimation(this.IMAGES_DEAD);
        if(isSoundPlaying) this.dead_sound.play();  
    }

    /**
     * this function is used to animate pepe  if he is hurt
     */
    pepeHurt(){
        this.playAnimation(this.IMAGES_HURT);
        if(isSoundPlaying) this.hurt_sound.play();
    }

    /**
     * this function is used to make pepe walk
     */
    pepeWalk(){
            this.playAnimation(this.IMAGES_WALKING);
            if(isSoundPlaying) {this.walking_sound.play()}
    }
}