
class Wall {
    constructor(context, startPosition) {
        this.context = context;
        this.position = {
            x: startPosition[0],
            y: startPosition[1]
        };
    }

    draw() {
        context.beginPath();
        context.rect(this.position.x - 30, this.position.y - 30, 60, 60);
        context.fillStyle = "grey"; //color
        context.fill();
    }

    type() {
        return 'wall';
    }
}

