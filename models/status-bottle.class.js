class StatusBarBottle extends DrawableObjects{
    IMAGES=[
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];
    
    percetageBottle=10;

    constructor(){
        super()
        this.loadImages(this.IMAGES);
        this.x=40;
        this.y=80;
        this.height=60;
        this.width=200;
        this.setPercentageBottle(10);
    }

    /**
     * this function is used to get the right img
     * @returns 
     */
    setPercentageBottle(percetageBottle){
        this.percetageBottle=percetageBottle;
        let path=this.IMAGES[this.resolveImageIndex()];
        this.img=this.imageCache[path];
    }
    
    /**
     * this function is used to adjust the statusbar of the bottels
     * @param {int} percetageBottle 
     */
    resolveImageIndex(){
        if(this.percetageBottle==10 || this.percetageBottle==9){
            return 5
        }
        else if(this.percetageBottle == 8 || this.percetageBottle==7){
            return 4
        }
        else if(this.percetageBottle == 6 || this.percetageBottle==5){
            return 3
        }
        else if(this.percetageBottle == 4 || this.percetageBottle==3){
            return 2
        }
        else if(this.percetageBottle == 2 || this.percetageBottle==1){
            return 1
        }
        else {
            return 0
        }
    }
}