class World{

    character = new Character();
    level=level1;
    canvas;
    ctx;
    keyboard;
    camera_x=0;
    statusbar= new StatusBar();
    coinbar= new StatusBarCoin();
    bottlebar= new StatusBarBottle();
    bossbar= new StatusBarBoss();
    brokenBottle=0
    throwableObject= [];
    collectMoneySound= new Audio('audio/collect_coin.mp3');
    collectBottleSound= new Audio('audio/collect_bottle.mp3');
    splashSound=new Audio('audio/splash.mp3');
    over=[];
    isSoundPlaying;
      
    constructor(canvas,keyboard,isSoundPlaying){
        this.ctx= canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard=keyboard
        this.isSoundPlaying=isSoundPlaying
        this.draw();
        this.setWorld();
        this.run();
    }
    
    /**
     * this function is used to init the world
     */
    setWorld(){
        this.character.world= this
    }

    /**
     * this function is used to check pepe aniamations
     */
    run(){
        setInterval(() => {
            this.checkCollisionsBoss();            
            this.checkBottle();
            this.checkBottleHitChicken();
            this.checkBottelHitBoss();
            this.gameOver();
        }, 200);
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
        }, 100);
        setInterval(() => {
            this.checkMoney();  
        }, 20);
    }

    /**
     * this function is used to check if bottle hit enemy
     */
    checkBottleHitChicken() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.throwableObject.length > 0) {
                this.throwableObject.forEach((throwableObject, throwableIndex) => {
                    if (enemy.isColliding(throwableObject)&& throwableObject.y<=380) {
                        this.bottleDesappearChicken(throwableObject,throwableIndex)
                        if(!throwableObject.hitChicken) this.differentChickenBottle(throwableObject,enemy,enemyIndex);
                    }
                });
            }
        });
    }
   
    /**
     * this function is used to make bottel splash and desapear if enemy is hit
     * @param {object} throwableObject 
     * @param {int} throwableIndex 
     */
    bottleDesappearChicken(throwableObject,throwableIndex){
        throwableObject.splash=true;
        if(isSoundPlaying) this.splashSound.play();
        setTimeout(() => {
            this.ctx.clearRect(throwableObject.x, throwableObject.y, throwableObject.width, throwableObject.height);
            this.throwableObject.splice(throwableIndex, 1);
        }, 100);
    }

    /**
     * this function is used to check if the bottle is a different bottle than the splashed one
     * @param {object} throwableObject 
     * @param {object} enemy 
     * @param {int} enemyIndex 
     */
    differentChickenBottle(throwableObject,enemy,enemyIndex){
        throwableObject.hitChicken= true;
        this.brokenBottle+=1
        enemy.chickenEnergie=0
        setTimeout(() => {
            this.ctx.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
            this.level.enemies.splice(enemyIndex, 1);
        }, 1000);
    }

    /**
     * this function isused to check if bottle hit boss
     */
    checkBottelHitBoss(){
        this.level.boss.forEach((boss1, bossIndex) => {
            if (this.throwableObject.length > 0) {
                this.throwableObject.forEach((throwableObject, throwableIndex) => {
                    if (boss1.isColliding(throwableObject) && throwableObject.y<=380) {
                        this.bottleDesappearBoss(throwableObject,throwableIndex);
                        if(!throwableObject.hitBoss) this.differentBottle(throwableObject,boss1,bossIndex);
                    }
                });
            }
        });
    }

    /**
     * this function is used to make bottle desappear if boss is hit
     */
    bottleDesappearBoss(throwableObject,throwableIndex){
        throwableObject.splash=true;
        if(isSoundPlaying) this.splashSound.play();
        setTimeout(() => {
        this.ctx.clearRect(throwableObject.x, throwableObject.y, throwableObject.width, throwableObject.height);
        this.throwableObject.splice(throwableIndex, 1);
        }, 100);
    }

    /**
     * this function is used to check if the bottle is different after hitting boss
     * @param {object} throwableObject 
     * @param {object} boss1 
     * @param {int} bossIndex 
     */
    differentBottle(throwableObject,boss1,bossIndex){
        throwableObject.hitBoss=true;
        this.brokenBottle+=1
        boss1.bossEnergie-=1
        this.bossbar.setPercentageBoss(boss1.bossEnergie)
        if( boss1.bossEnergie==0){
            setTimeout(() => {
                    this.ctx.clearRect(boss1.x, boss1.y, boss1.width, boss1.height);
                    this.level.boss.splice(bossIndex, 1);       
            }, 1500);
        }
    }

    /**
     * this function is used to check is pepe is colliding with enemies
     */
    checkCollisions() {
        this.level.enemies.forEach(async (enemy, enemyIndex) => {
            if (this.character.isColliding(enemy)) {
                if (this.isAboveChicken(enemy)== true) {
                    enemy.chickenEnergie = 0;
                    this.character.jump();
                    await this.findAndDeletEnemy(enemy)
                } else {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * this function is used to check if pepe is above enemy
     * @param {object} enemy 
     * @returns 
     */
    isAboveChicken(enemy){
        return this.character.y + this.character.height >= 300 && this.character.y + this.character.height <= 420  && this.character.x >= enemy.x - 100 && this.character.x <= enemy.x + 100 && !this.character.isHurt()
    }

    /**
     * this function is used to delete the killed enemy
     * @param {object} enemy 
     */
    async findAndDeletEnemy(enemy){
        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy); 
            if (index !== -1) {
                this.ctx.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
                this.level.enemies.splice(index, 1);  
            }
        }, 800);
    }

    /**
     * this function is used to check if pepe is hit by endboss
     */
    checkCollisionsBoss() {
        this.level.boss.forEach((boss) => {
            if (this.character.isColliding(boss)) {
                    this.character.energy-=100
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
        });
    }
    
    /**
     * this function is used to collect money
     */
    checkMoney(){
        this.level.coin.forEach((coin, index) => {
            if(this.character.isCollidingMoney(coin)){
                this.character.collect();
                if(isSoundPlaying) this.collectMoneySound.play();
                this.coinbar.setPercentageCoin(this.character.money);
                this.ctx.clearRect(coin.x, coin.y, coin.x + coin.width, coin.y + coin.height);
                this.level.coin.splice(index, 1);
            }
        });
    }

    /**
     * this function is used to collect the bottels on the ground
     */
    checkBottle(){
            if(this.throwableObject.length>0){
                this.throwableObject.forEach((throwableObject, index) => {
                    if(this.character.isColliding(this.throwableObject[index])){
                       this.ctx.clearRect(this.throwableObject[index].x, this.throwableObject[index].y, this.throwableObject[index].x + this.throwableObject[index].width, this.throwableObject[index].y + this.throwableObject[index].height);
                       this.throwableObject.splice(index, 1);
                        this.character.collectBottle();
                        if(isSoundPlaying) this.collectBottleSound.play();
                        this.bottlebar.setPercentageBottle(this.character.bottleAmount);
                    }
                });

            }
    }

    /**
     * this function is used to throw bottels
     */
    checkThrowObject(){     
        if(this.keyboard.D){
            this.character.lastInteractionTime = new Date();
            if(this.throwableObject.length<(10-this.brokenBottle)){
                let bottle= new ThrowableObjects(this.character.x+100,this.character.y+100)
                this.throwableObject.push(bottle)
                this.character.throwBottle();
                this.bottlebar.setPercentageBottle(this.character.bottleAmount);
            }
        }
    }

    /**
     * this function is used for endscreen
     */
    gameOver() {
        if (this.level.boss.length == 0 || this.character.isDead()) {
            setTimeout(() => {
                this.clearAllIntervals();
                this.showGameOverScreen();
            }, 500);
        }
    }
    
    /**
     * this shos the end screen
     */
    showGameOverScreen() {
            let game = new GameOver(this.character.x - 100);
            setInterval(() => {
                this.over.push(game);
                this.draw()
            }, 200);
            setTimeout(() => {window.location.reload()}, 2500);
    }
    
    /**
     * this function is used to clear every intervall in the game
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
      }

    /**
     * this function is used to draw every element
     */
    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.ctx.translate(this.camera_x,0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x,0);
        this.addToMap(this.statusbar)
        this.ctx.translate(this.camera_x,0);

        this.ctx.translate(-this.camera_x,0);
        this.addToMap(this.coinbar)
        this.ctx.translate(this.camera_x,0);

        this.ctx.translate(-this.camera_x,0);
        this.addToMap(this.bottlebar)
        this.ctx.translate(this.camera_x,0);

        this.addToMap(this.bossbar)
        
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.boss);
        this.addToMap(this.character);
       
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.over);

        this.ctx.translate(-this.camera_x,0)

        let self=this
        requestAnimationFrame( function(){
            self.draw();
        })
    }

    /**
     * this function is used to display images/objects
     * @param {object} objects 
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    /**
     * this function is used to add objects to the map
     * @param {object} mo 
     */
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo)
        }
        mo.draw(this.ctx)
        //mo.drawFrame(this.ctx)
        if(mo.otherDirection){
            this.flipImageBack(mo)
        }
    }

    /**
     * this function is used to flip pepe image
     * @param {object} mo 
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width,0);
        this.ctx.scale(-1,1);
        mo.x=mo.x * -1;
    }

    /**
     * this function is used to flip pepe image back
     * @param {object} mo 
     */
    flipImageBack(mo){
        this.ctx.restore();
        mo.x=mo.x * -1;
    }
}