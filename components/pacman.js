class Pacman {
    constructor(context, startPositon) {
        this.context = context;
        this.center = {
            x: startPositon[0],
            y: startPositon[1]
        };
        this.directions = {
            "up": 1,
            "down": 2,
            "left": 3,
            "right": 4
        }
    }

    move(){}

    draw(direction) {
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
                x: this.center.x - 5,
                y: this.center.y - 15

            }
        }
        else if (this.directions.right == direction) {
            start = Math.PI * 0.15;
            end = Math.PI * 1.85;
            eye = {
                x: this.center.x + 5,
                y: this.center.y - 15

            }
        }
        else if (this.directions.up == direction) {
            start = Math.PI * 1.65;
            end = Math.PI * 1.35;
            eye = {
                x: this.center.x - 15,
                y: this.center.y - 5

            }
        }
        else {
            start = Math.PI * 0.65;
            end = Math.PI * 0.35;
            eye = {
                x: this.center.x + 15,
                y: this.center.y - 5

            }
        }
        context.arc(this.center.x, this.center.y, 30, start, end); // half circle
        context.lineTo(this.center.x, this.center.y);
        context.fillStyle = pac_color; //color
        context.fill();

        // Eye 
        context.beginPath();
        context.arc(eye.x, eye.y, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
    }
}

