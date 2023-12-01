class StatusBarBottle extends DrawableObjects{
    IMAGES=[
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];
    
    percetageBottle=5;

    constructor(){
        super()
        this.loadImages(this.IMAGES);
        this.x=40;
        this.y=80;
        this.height=60;
        this.width=200;
        this.setPercentageBottle(5);
    }

    setPercentageBottle(percetageBottle){
        this.percetageBottle=percetageBottle;
        let path=this.IMAGES[this.resolveImageIndex()];
        this.img=this.imageCache[path];
    }
    
    resolveImageIndex(){
        if(this.percetageBottle==5){
            return 5
        }
        else if(this.percetageBottle == 4){
            return 4
        }
        else if(this.percetageBottle == 3){
            return 3
        }
        else if(this.percetageBottle == 2){
            return 2
        }
        else if(this.percetageBottle == 1){
            return 1
        }
        else {
            return 0
        }
    }
}