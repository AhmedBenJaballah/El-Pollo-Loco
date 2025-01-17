class StatusBar extends DrawableObjects{
    IMAGES=[
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];
    
    percetage=100;

    constructor(){
        super()
        this.loadImages(this.IMAGES);
        this.x=40;
        this.y=0;
        this.height=60;
        this.width=200;
        this.setPercentage(100);
    }

    /**
     * this function is used to get the corresponding img
     * @param {int} percetage 
     */
    setPercentage(percetage){
        this.percetage=percetage;
        let path=this.IMAGES[this.resolveImageIndex()];
        this.img=this.imageCache[path];
    }
    
    /**
     * this function is used to get the right img
     * @returns 
     */
    resolveImageIndex(){
        if(this.percetage==100){
            return 5
        }
        else if(this.percetage > 80){
            return 4
        }
        else if(this.percetage > 60){
            return 3
        }
        else if(this.percetage > 40){
            return 2
        }
        else if(this.percetage > 20){
            return 1
        }
        else {
            return 0
        }
    }
}