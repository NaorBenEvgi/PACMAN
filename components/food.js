
class Food {
    constructor(context) {
        this.context = context;
    }

    draw(center, size, color) {
        context.beginPath();
        context.arc(center.x, center.y, size, 0, 2 * Math.PI); // circle
        context.fillStyle = color; //color
        context.fill();
    }



}

