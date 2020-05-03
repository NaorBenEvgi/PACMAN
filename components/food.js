
class Food {
    constructor(context) {
        this.context = context;
    }

    draw(center, color) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = color; //color
        context.fill();
    }
}

