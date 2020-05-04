const MAX_MONSTER_AMOUNT = 4;

class Monster {

    constructor(context, monstersAmount) {
        this.context = context;
        this.monstersAmount = monstersAmount;
        this.monsters = new Array(MAX_MONSTER_AMOUNT);
        this.initiate();
    }

    draw(img) {
        for (var i = 0; i < this.monstersAmount; i++) {
            context.drawImage(img, this.monsters[i].x, this.monsters[i].y, 60, 60);
        }
    }

    initiate() {
        //first monster
        this.monsters[0] = new Object();
        this.monsters[0].x = 0;
        this.monsters[0].y = 0;

        //second monster
        this.monsters[1] = new Object();
        this.monsters[1].x = 540;
        this.monsters[1].y = 0;

        //third monster
        this.monsters[2] = new Object();
        this.monsters[2].x = 0;
        this.monsters[2].y = 540;

        //forth monster
        this.monsters[3] = new Object();
        this.monsters[3].x = 540;
        this.monsters[3].y = 540;
    }


}




