const MAX_MONSTER_AMOUNT = 4;
var monsterImg = new Image();
monsterImg.src = 'resources/monster.png'

class Monster {

    constructor(context, monstersAmount) {
        this.context = context;
        this.monstersAmount = monstersAmount;
        this.monsters = new Array(MAX_MONSTER_AMOUNT);
        this.initiate();
    }

    draw() {
        for (var i = 0; i < this.monstersAmount; i++) {
            context.drawImage(monsterImg, this.monsters[i].x, this.monsters[i].y, 60, 60);
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

    move(shape, board) {
        console.log("here");
        for (var i = 0; i < this.monstersAmount; i++) {
            let xMonster = this.monsters[i].x / 60;
            let yMonster = this.monsters[i].y / 60;

            //the monster below the pacman - same colum
            if (xMonster == shape.i && yMonster > shape.j && yMonster > 0 && board[xMonster][yMonster - 1] != 4) {
                this.monsters[i].y = this.monsters[i].y - 60;
                context.drawImage(monsterImg, this.monsters[i].x, this.monsters[i].y, 60, 60);
            }
            //the monster above the pacman - same colum
            else if (xMonster == shape.i && yMonster < shape.j && yMonster < 9 && board[xMonster][yMonster + 1] != 4) {
                this.monsters[i].y = this.monsters[i].y + 60;
                context.drawImage(monsterImg, this.monsters[i].x, this.monsters[i].y, 60, 60);
            }
            //the monster on the left of the pacman - same row
            else if(yMonster == shape.j && xMonster > shape.i && xMonster > 0 && board[xMonster - 1][yMonster] != 4) {
                this.monsters[i].x = this.monsters[i].x - 60;
                context.drawImage(monsterImg, this.monsters[i].x, this.monsters[i].y, 60, 60);
            }
            //the monster on the right of the pacman - same row
            else if(yMonster == shape.j && xMonster < shape.i && xMonster < 9 && board[xMonster + 1][yMonster] != 4) {
                this.monsters[i].x = this.monsters[i].x + 60;
                context.drawImage(monsterImg, this.monsters[i].x, this.monsters[i].y, 60, 60);
            }
        }
    }

}




