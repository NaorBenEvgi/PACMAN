const MAX_MONSTER_AMOUNT = 4;
var monsterImg = new Image();
monsterImg.src = 'resources/monster.png'

class Monster {

    constructor(context, position) {
        this.context = context;
        this.position = position;
    }

    draw() {
        this.context.drawImage(monsterImg, this.position.x,this.position.y, 60, 60);
    }
}




