class StatusBarBoss extends MovableObjects{
   
        IMAGES=[
            'img/7_statusbars/2_statusbar_endboss/0.png',
            'img/7_statusbars/2_statusbar_endboss/20.png',
            'img/7_statusbars/2_statusbar_endboss/40.png',
            'img/7_statusbars/2_statusbar_endboss/60.png',
            'img/7_statusbars/2_statusbar_endboss/80.png',
            'img/7_statusbars/2_statusbar_endboss/100.png',
        ];

        reachedEndLeft = false;
        reachedEndRight = false;
        percetageBoss=5;

    
        constructor(){
            super()
            this.loadImages(this.IMAGES);
            this.x=2600;
            this.y=0;
            this.speed=10;
            this.height=60;
            this.width=200;
            this.setPercentageBoss(5);
            this.animate2();
            
        }

        //endBossEnergy=world.level.boss[0].bossEnergie
    
        /**
         * this function is used to adjust the status bar of endboss
         * @param {int} percetageBoss 
         */
        setPercentageBoss(percetageBoss){
            this.percetageBoss=percetageBoss;
            let path=this.IMAGES[this.resolveImageIndex()];
            this.img=this.imageCache[path];
        }
        
        /**
         * this function is used to get the right img
         * @returns 
         */
        resolveImageIndex(){
            if(this.percetageBoss==5){
                return 5
            }
            else if(this.percetageBoss == 4){
                return 4
            }
            else if(this.percetageBoss == 3){
                return 3
            }
            else if(this.percetageBoss == 2){
                return 2
            }
            else if(this.percetageBoss == 1){
                return 1
            }
            else {
                this.reachedEndLeft = true;
                this.reachedEndRight = true;
                return 0
            }
        }

        /**
         * this function is used to animate the endboss statusbar
         */
        animate(){
            setInterval(() => {
                    if(world.level.boss[0]){
                        if(world.level.boss[0].bossEnergie==5)this.statusMove();
                        else if(world.level.boss[0].bossEnergie==4){
                            this.reachedEndLeft = true;
                            this.reachedEndRight = true;
                            this.moveLeft();
                            this.speed=20;}
                        else if( world.level.boss[0].bossEnergie==2 || world.level.boss[0].bossEnergie==1 ||  world.level.boss[0].bossEnergie==3 ){
                            this.reachedEndLeft = true;
                            this.reachedEndRight = true;
                            this.moveLeft();
                            this.speed=40;
                        }
                    }
            }, 100);
        }

        firstContact=false;

        animate2(){
            setInterval(() => {
                if(world.level.boss[0]){
                if(world.character.x>2200 && !this.firstContact) this.firstContact=true
                else if(this.firstContact && (world.level.boss[0].bossEnergie==5 || world.level.boss[0].bossEnergie==4 )){
                    this.moveLeft();
                    this.speed=20;}
                else if( world.level.boss[0].bossEnergie==2 || world.level.boss[0].bossEnergie==1 ||  world.level.boss[0].bossEnergie==3 ){
                    this.moveLeft();
                    this.speed=25;}
                }
            }, 100);
        }
    
        /**
         * this function is used to make the statusbar move
         */
        statusMove() {
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