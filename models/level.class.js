class Level{
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    coin;

    constructor(enemies,clouds,backgroundObjects,coin){
        this.enemies=enemies;
        this.clouds=clouds;
        this.backgroundObjects=backgroundObjects;
        this.coin=coin;
    }
}