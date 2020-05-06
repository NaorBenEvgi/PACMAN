var bonusImg = new Image();
bonusImg.src = 'resources/bonus-removebg-preview.png'

class Bonus {

    constructor(context, position) {
        this.context = context;
        this.position = position;
    }

    draw() {
        this.context.drawImage(bonusImg, this.position.x,this.position.y, 60, 60);
    }
}




