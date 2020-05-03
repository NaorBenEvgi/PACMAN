class Pacman {
    constructor(context) {
        this.context = context;
        this.directions = {
            "up": 1,
            "down": 2,
            "left": 3,
            "right": 4
        }
    }

    draw(center, direction) {
        const context = this.context;
        let start;
        let end;
        let eye;

        // Body
        context.beginPath();
        console.log(direction);
        if (this.directions.left == direction) {
            start = Math.PI * 1.15;
            end = Math.PI * 0.85;
            eye = {
                x: center.x - 5,
                y: center.y - 15

            }
        }
        else if (this.directions.right == direction) {
            start = Math.PI * 0.15;
            end = Math.PI * 1.85;
            eye = {
                x: center.x + 5,
                y: center.y - 15

            }
        }
        else if (this.directions.up == direction) {
            start = Math.PI * 1.65;
            end = Math.PI * 1.35;
            eye = {
                x: center.x - 15,
                y: center.y - 5

            }
        }
        else {
            start = Math.PI * 0.65;
            end = Math.PI * 0.35;
            eye = {
                x: center.x + 15,
                y: center.y - 5

            }
        }
        context.arc(center.x, center.y, 30, start, end); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();

        // Eye 
        context.beginPath();
        context.arc(eye.x, eye.y, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
    }
}

