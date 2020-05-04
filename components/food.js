
class Food {
    constructor(context, position, type, color) {
        this.context = context;
        this.color = color;
        this.type = type;
        this.center = {
            x: position[0],
            y: position[1]
        }
    }

    type() {
        return this.type
    }

    draw(size) {
        context.beginPath();
        context.arc(this.center.x, this.center.y, size, 0, 2 * Math.PI); // circle
        context.fillStyle = this.color; //color
        context.fill();
    }



}

