class DrawableObjects{
    x=120;
    y=280;
    img;
    height=150;
    width=100;
    imageCache={};
    currentImage=0;

    /**
     * this function is used to load an image
     * @param {string} path the img path
     */
    loadImage(path){
        this.img= new Image();
        this.img.src=path
    }
    
    /**
     * this function is used to draw objects on canvas
     * @param {context} ctx 
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    /**
     * this function is used to load images
     * @param {Array} arr ['img/image1.png','img/image2.png'...]
     */
        loadImages(arr){
            arr.forEach(path => {
                let img= new Image();
                img.src=path;
                this.imageCache[path]=img
            });
        }

        drawFrame(ctx){
            if(this instanceof Chicken){
                ctx.beginPath();
                ctx.linewidth='5';
                ctx.strokeStyle='blue';
                ctx.rect( this.x, this.y, this.width,this.height);
                ctx.stroke();
            }
    
        }
}