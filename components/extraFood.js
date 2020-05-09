
class ExtraFood {
    constructor(context, position, extraFoodType) {
        this.context = context;
        this.extraFoodType = extraFoodType;
        this.center = {
            x: position[0],
            y: position[1]
        }
    }

    type() {
        return this.extraFoodType
    }

    draw(center) {
        if (this.extraFoodType === 'time') {
            this.context.drawImage(timeImg, this.center.x * 60, this.center.y * 60, 60, 60);
        }
        if (this.extraFoodType === 'life') {
            this.context.drawImage(lifeImg, this.center.x * 60, this.center.y * 60, 60, 60);
        }
    }


}

