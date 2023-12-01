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
    brokenBottle=0
    throwableObject= [];
  
    constructor(canvas,keyboard){

        this.ctx= canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard=keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    
    setWorld(){
        this.character.world= this
    }


    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkMoney();
            this.checkThrowObject();
            this.checkBottle();
            this.checkBottleHitChicken();
        }, 100);
    }

    checkBottleHitChicken() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.throwableObject.length > 0) {
                this.throwableObject.forEach((throwableObject, throwableIndex) => {
                    if (enemy.isColliding(throwableObject)&& throwableObject.y<=380) {
                        console.log('b');
                        throwableObject.splash=true;

                        setTimeout(() => {
                            this.ctx.clearRect(throwableObject.x, throwableObject.y, throwableObject.width, throwableObject.height);
                        this.throwableObject.splice(throwableIndex, 1);
                        }, 1000);

                        this.brokenBottle+=1
                        enemy.chickenEnergie=0

                        setTimeout(() => {
                            this.ctx.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
                            this.level.enemies.splice(enemyIndex, 1);
                        }, 1000);
                    }
                });
            }
        });
    }
    

    checkPepeAboveChicken(){
       // if(this.character==)
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
    
            //console.log(this.character.y) 185
            //console.log(this.character.height) 280
            //465
            //console.log(enemy.height)60
            //console.log(enemy.y)360
            //420
            // console.log(this.character.y+this.character.height)
            console.log(this.character.speedY)
            
            if (this.character.isColliding(enemy)) {
                if (this.character.y + this.character.height >= 375 && this.character.y + this.character.height <= 420 && !this.character.isHurt()) {
                    console.log('ja');
                    enemy.chickenEnergie = 0;
                    this.character.jump()
                    setTimeout(() => {
                        this.ctx.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
                        this.level.enemies.splice(enemyIndex, 1);
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
                console.log('h')
                this.character.collect();
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
                        console.log('b')
                        this.character.collectBottle();
                        this.bottlebar.setPercentageBottle(this.character.bottleAmount);
                        
                        this.ctx.clearRect(this.throwableObject[index].x, this.throwableObject[index].y, this.throwableObject[index].x + this.throwableObject[index].width, this.throwableObject[index].y + this.throwableObject[index].height);
                        this.throwableObject.splice(index, 1);
                    }
                });
            }
    }

    checkThrowObject(){
        if(this.keyboard.D){
            if(this.throwableObject.length<(5-this.brokenBottle)){
                let bottle= new ThrowableObjects(this.character.x+100,this.character.y+100)
                this.throwableObject.push(bottle)
                this.character.throwBottle();
                this.bottlebar.setPercentageBottle(this.character.bottleAmount);
                console.log(this.character.bottleAmount)
            }
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

        this.addToMap(this.character);
        
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.throwableObject);

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