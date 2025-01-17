class Endboss extends MovableObjects{

    height=400;
    width=250;
    y=60;
    bossEnergie=5;
    reachedEndLeft = false;
    reachedEndRight = false;
    firstContact=false;
    angry_boss_sound=new Audio('audio/angry_boss.mp3');
    dead_boss_sound=new Audio('audio/dead_boss.mp3');

    IMAGES_WALKING=[
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_Hurt=[
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD=[
            'img/4_enemie_boss_chicken/5_dead/G24.png',
            'img/4_enemie_boss_chicken/5_dead/G25.png',
            'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    IMAGES_ATTAK=[
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_Hurt);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTAK);
        this.x=2600;
        this.speed=10;
        this.animate2();
    }

    firstContact=false;


    animate(){
        setInterval(() => {
            if(this.bossEnergie==5)this.bossMove();
            else if(this.bossEnergie==4){
                this.playAnimation(this.IMAGES_ATTAK)
                this.reachedEndLeft = true;
                this.reachedEndRight = true;
                this.moveLeft();
                this.speed=20;}
            else if( this.bossEnergie==2 || this.bossEnergie==1 ||  this.bossEnergie==3 ){
                this.bossHurt();
                this.reachedEndLeft = true;
                this.reachedEndRight = true;
                this.moveLeft();
                this.speed=40;}
            else if(this.bossEnergie==0){
                this.bossDead();
                this.bossEnergie=-1;}
        }, 100);
    }

    /**
     * this function is used to animate the endboss
     */
    animate2(){
        setInterval(() => {
            if(world.character.x>2200 && !this.firstContact) this.firstContact=true
            else if(this.firstContact && (this.bossEnergie==5 || this.bossEnergie==4 )){
                this.playAnimation(this.IMAGES_ATTAK)
                this.moveLeft();
                this.speed=20;}
            else if( this.bossEnergie==2 || this.bossEnergie==1 ||  this.bossEnergie==3 ){
                this.bossHurt();
                this.moveLeft();
                this.speed=25;}
            else if(this.bossEnergie==0){
                this.bossDead();
                this.bossEnergie=-1;}
            else if(this.bossEnergie==5) this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }

    /**
     * this function is used to animate endboss if he is hurt
     */
    bossHurt(){
        this.playAnimation(this.IMAGES_Hurt);
        if(isSoundPlaying) this.angry_boss_sound.play();
    }

    /**
     * this function is used to animate endboss if he dies
     */
    bossDead(){
        for (let i = 0; i < this.IMAGES_DEAD.length; i++) {
            let path = this.IMAGES_DEAD[i];
            this.img=this.imageCache[path];
             if(i==2 && isSoundPlaying) this.dead_boss_sound.play(); 
        }
    }

    /**
     * this function  is used to make endboss move left and right
     */
    bossMove() {
        if (this.x >= 2350 && !this.reachedEndLeft) {
            this.moveLeft();
            if (this.x <= 2350) {
                this.reachedEndLeft = true;
                this.reachedEndRight = false;
            }
        } else if (this.x <= 2550 && !this.reachedEndRight) {
            this.moveRight();
            if (this.x >= 2550) {
                this.reachedEndRight = true;
                this.reachedEndLeft = false;
            }
        }
    }


    
    
    
}