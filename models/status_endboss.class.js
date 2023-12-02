class StatusBarBoss extends DrawableObjects{
    IMAGES=[
        'img/7_statusbars/2_statusbar_endboss/blue.png',
    ];

    constructor(){
        super()
        this.loadImage(this.IMAGES[0]);
        this.x=2600;
        this.y=0;
        this.height=60;
        this.width=200;
    }

}