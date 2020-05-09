
class Wall {
    constructor(context) {
        this.context = context;
    }

    draw(center) {
        this.context.beginPath();
        this.context.rect(center.x - 30, center.y - 30, 60, 60);
        this.context.fillStyle = "grey"; //color
        this.context.fill();
    }

    type() {
        return 'wall';
    }
}

