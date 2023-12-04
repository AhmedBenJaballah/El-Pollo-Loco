class StatusBarCoin extends DrawableObjects{
    IMAGES=[
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
    
    percetageCoin=0;

    constructor(){
        super()
        this.loadImages(this.IMAGES);
        this.x=40;
        this.y=40;
        this.height=60;
        this.width=200;
        this.setPercentageCoin(0);
    }

    /**
     * this function is used to adjust the statusbar of the coins
     * @param {int} percetageCoin 
     */
    setPercentageCoin(percetageCoin){
        this.percetageCoin=percetageCoin;
        let path=this.IMAGES[this.resolveImageIndex()];
        this.img=this.imageCache[path];
    }
    
    /**
     * this function is used to get the right img
     * @returns 
     */
    resolveImageIndex(){
        if(this.percetageCoin > 4){
            return 5
        }
        else if(this.percetageCoin ==4){
            return 4
        }
        else if(this.percetageCoin ==3){
            return 3
        }
        else if(this.percetageCoin ==2){
            return 2
        }
        else if(this.percetage == 1){
            return 1
        }
        else {
            return 0
        }
    }
}