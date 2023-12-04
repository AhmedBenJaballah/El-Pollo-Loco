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
    
    setWorld(){
        this.character.world= this
    }

    run(){
        setInterval(() => {
            //this.checkCollisions();
            this.checkMoney();
            this.checkThrowObject();
            this.checkBottle();
            this.checkBottleHitChicken();
            this.checkBottelHitBoss();
            this.gameOver();
        }, 200);

        //let isCollisionCheckRunning = false;  // Variable, um zu überprüfen, ob die Kollisionsüberprüfung bereits läuft

        setInterval(() => {
           // if (!isCollisionCheckRunning) {
                //isCollisionCheckRunning = true;  // Markiere, dass die Kollisionsüberprüfung läuft
                this.checkCollisions();
                //isCollisionCheckRunning = false;  // Setze die Markierung zurück, wenn die Überprüfung abgeschlossen ist
           // }
        }, 20);
    }

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
   
    
    bottleDesappearChicken(throwableObject,throwableIndex){
        throwableObject.splash=true;
        if(isSoundPlaying) this.splashSound.play();
        setTimeout(() => {
            this.ctx.clearRect(throwableObject.x, throwableObject.y, throwableObject.width, throwableObject.height);
            this.throwableObject.splice(throwableIndex, 1);
        }, 100);
    }

    differentChickenBottle(throwableObject,enemy,enemyIndex){
        throwableObject.hitChicken= true;
        this.brokenBottle+=1
        enemy.chickenEnergie=0
        setTimeout(() => {
            this.ctx.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
            this.level.enemies.splice(enemyIndex, 1);
        }, 1000);
    }

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

    bottleDesappearBoss(throwableObject,throwableIndex){
        throwableObject.splash=true;
        if(isSoundPlaying) this.splashSound.play();

        setTimeout(() => {
        this.ctx.clearRect(throwableObject.x, throwableObject.y, throwableObject.width, throwableObject.height);
        this.throwableObject.splice(throwableIndex, 1);
        }, 100);
    }

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

    checkCollisions() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.y + this.character.height >= 375 && this.character.y + this.character.height <= 420 && !this.character.isHurt() && this.character.x >= enemy.x - 50 && this.character.x <= enemy.x + 50) {
                    enemy.chickenEnergie = 0;
                    console.log('c' + enemyIndex);
                    this.character.jump();
    
                    setTimeout(() => {
                        console.log('d' + enemyIndex);
                        const index = this.level.enemies.indexOf(enemy); // Finde den aktuellen Index des Feindes
                        if (index !== -1) {
                            this.ctx.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
                            this.level.enemies.splice(index, 1);  // Lösche den zuvor markierten Feind
                        }
                    }, 1000);
                } else {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            }
        });
    }
    
    
    
    checkMoney(){
        this.level.coin.forEach((coin, index) => {
            if(this.character.isColliding(coin)){
                this.character.collect();
                if(isSoundPlaying) this.collectMoneySound.play();
                this.coinbar.setPercentageCoin(this.character.money);
                this.ctx.clearRect(coin.x, coin.y, coin.x + coin.width, coin.y + coin.height);
                this.level.coin.splice(index, 1);
            }
        });
    }

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


    gameOver(){
        if(this.level.boss.length==0 || this.character.isDead()){
            let game =new GameOver(this.character.x-100);
            setTimeout(() => {
                this.over.push(game);
            }, 500);
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }
    }

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

        this.addToMap(this.character);
        
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.boss);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.over);

        this.ctx.translate(-this.camera_x,0)

        let self=this
        requestAnimationFrame( function(){
            self.draw();
        })
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo)
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)
        if(mo.otherDirection){
            this.flipImageBack(mo)
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width,0);
        this.ctx.scale(-1,1);
        mo.x=mo.x * -1;
    }

    flipImageBack(mo){
        this.ctx.restore();
        mo.x=mo.x * -1;
    }
}