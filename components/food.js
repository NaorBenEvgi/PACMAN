
class Food {
    constructor(context, position, foodType, color, size) {
        this.context = context;
        this.color = color;
        this.size = size;
        this.foodType = foodType;
        this.center = {
            x: position[0],
            y: position[1]
        }
    }

    type() {
        return this.foodType
    }

    draw(center) {
        this.context.beginPath();
        this.context.arc(center.x, center.y, this.size, 0, 2 * Math.PI); // circle
        this.context.fillStyle = this.color; //color
        this.context.fill();
    }



}

