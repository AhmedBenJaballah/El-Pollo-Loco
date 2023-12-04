class MovableObjects extends DrawableObjects{

    speed=0.15;
    otherDirection= false;
    speedY=0;
    acceleration=1;
    energy=100;
    lastHit=0;
    lastCollect=0;
    money=0;
    bottleAmount=10;
    lastBottleCollect=0;
    

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0)
            {
                this.y-=this.speedY;
                this.speedY-=this.acceleration
            }
        }, 1000/25);
    }

    isAboveGround(){
        if(this instanceof ThrowableObjects){
            return true
        } else
        {
            return this.y < 180
        }
    }

    isColliding(mo){
        return this.x+ this.width> mo.x &&
        this.y +this.height > mo.y &&
        this.x <mo.x &&
        this.y< mo.y + mo.height;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    moveRight(){
        this.x += this.speed;
    }

    playAnimation(images){ 
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img=this.imageCache[path];
        this.currentImage++;
    }

    jump(){
        this.speedY=20;
    }

    hit(){
        this.energy-=1
       if(this.energy<0){
        this.energy=0
       }
       else{
        this.lastHit= new Date().getTime();
       }
    }

    collect(){
        this.money+=1;
        this.lastCollect= new Date().getTime();  
    }

    collectBottle(){
        this.bottleAmount+=1;
        this.lastBottleCollect= new Date().getTime();  
    }

    throwBottle(){
        this.bottleAmount-=1;
        this.lastBottleCollect= new Date().getTime();  
    }

    isDead(){
        return this.energy==0
    }

    isHurt(){
        let timepassed=new Date().getTime()-this.lastHit;
        timepassed =timepassed/1000;
        return timepassed <1
    }

    isCollecting(){
        let timepassed=new Date().getTime()-this.lastCollect;
        timepassed =timepassed/1000;
        return timepassed <1
    }
    
    isCollectingBottle(){
        let timepassed=new Date().getTime()-this.lastBottleCollect;
        timepassed =timepassed/1000;
        return timepassed <1
    }
}