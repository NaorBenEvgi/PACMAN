
class Wall {
    constructor(context) {
        this.context = context;
    }

    draw(center) {
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = "grey"; //color
        context.fill();
    }
}

