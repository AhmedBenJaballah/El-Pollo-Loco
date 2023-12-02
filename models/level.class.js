class Level{
    boss;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    coin;

    constructor(boss,enemies,clouds,backgroundObjects,coin){
        this.boss=boss
        this.enemies=enemies;
        this.clouds=clouds;
        this.backgroundObjects=backgroundObjects;
        this.coin=coin;
    }
}