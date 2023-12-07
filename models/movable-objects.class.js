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
    
    /**
     * this function is used after jump to get back on the ground
     */
    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0)
            {
                this.y-=this.speedY;
                this.speedY-=this.acceleration
            }
        }, 1000/25);
    }

    /**
     * this function is used to check is pepe is above the ground
     * @returns 
     */
    isAboveGround(){
        if(this instanceof ThrowableObjects){
            return true
        } else
        {
            return this.y < 150
        }
    }

    /**
     * this function is used to check if two movable objects are colliding or not
     * @param {object} mo 
     * @returns 
     */
    isColliding (mo) {
        return  (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
                (this.y + 0+ this.height) >= mo.y &&
                (this.y + 0) <= (mo.y + mo.height)
    }

        /**
     * this function is used to check if two movable objects are colliding or not
     * @param {object} mo 
     * @returns 
     */
        isCollidingMoney (mo) {
            return  (this.x-80 + this.width) >= mo.x && (this.x+80) <= (mo.x + mo.width) && 
                    (this.y -80+ this.height) >= mo.y &&
                    (this.y  -80) <= (mo.y + mo.height)
        }
    
    /**
     * this function is used to move object left
     */
    moveLeft(){
        this.x -= this.speed;
    }

    /**
     * this function is used to move objects right
     */
    moveRight(){
        this.x += this.speed;
    }

    /**
     * this function is used to make images look like an animation
     * @param {array} images 
     */
    playAnimation(images){ 
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img=this.imageCache[path];
        this.currentImage++;
    }

    /**
     * this function is used to make object jump
     */
    jump(){
        this.speedY=20;
    }

    /**
     * this function is used to decrease pepe energie
     */
    hit(){
        this.energy-=1
       if(this.energy<0){
        this.energy=0
       }
       else{
        this.lastHit= new Date().getTime();
       }
    }

    /**
     * this function is used to collect coins
     */
    collect(){
        this.money+=1;
        this.lastCollect= new Date().getTime();  
    }

    /**
     * this function is used to collect bottels
     */
    collectBottle(){
        this.bottleAmount+=1;
        this.lastBottleCollect= new Date().getTime();  
    }

    /**
     * this function is used to decrease the amount of bottles
     */
    throwBottle(){
        this.bottleAmount-=1;
        this.lastBottleCollect= new Date().getTime();  
    }

    /**
     * this function is used to check if pepe is dead
     * @returns 
     */
    isDead(){
        return this.energy==0
    }

    /**
     * this function is used to check if pepe is hurt
     * @returns 
     */
    isHurt(){
        let timepassed=new Date().getTime()-this.lastHit;
        timepassed =timepassed/1000;
        return timepassed <1
    }

    /**
     * this function is used to check if pepe collected coins
     * @returns 
     */
    isCollecting(){
        let timepassed=new Date().getTime()-this.lastCollect;
        timepassed =timepassed/1000;
        return timepassed <1
    }

     /**
     * this function is used to check if pepe collected bottells
     * @returns 
     */
    isCollectingBottle(){
        let timepassed=new Date().getTime()-this.lastBottleCollect;
        timepassed =timepassed/1000;
        return timepassed <1
    }
}