

class Board {

    constructor(context, numberOfFood, numberOfMonsters, numberOfWalls, smallFoodColor, mediumFoodColor, largeFoodColor) {
        this.size = 10;
        this.board = this.initBoard(this.size);
        this.context = context;
        this.foodRemain;
        this.initWalls(numberOfWalls);
        this.putPacman();
        this.spreadingFood(numberOfFood, smallFoodColor, mediumFoodColor, largeFoodColor);
        this.pacmanPosition;
        this.numberOfMonsters = numberOfMonsters;
        this.initMonsters();
        this.food = [];
        this.extraLife = true;
        this.extraTime = true;
    }

    initBoard(size) {
        const board = [];
        for (let i = 0; i < size; ++i) {
            const row = []
            for (let j = 0; j < size; ++j) {
                row.push(new EmptyCell());
            }
            board.push(row);
        }
        return board;
    }

    initMonsters() {
        //first monster
        this.monsters = [
            new Monster(this.context, { x: 0, y: 0 }),
            new Monster(this.context, { x: 540, y: 0 }),
            new Monster(this.context, { x: 0, y: 540 }),
            new Monster(this.context, { x: 540, y: 540 })
        ];
    }

    initWalls(numberOfWalls) {
        console.log(numberOfWalls);
        //creating walls
        const indexWallA = [1, 8, 1, 8, 3, 6, 3, 6, 4, 5, 4, 5, 4, 5, 0, 9, 0, 9, 2, 7, 2, 7, 1, 8, 1, 8];
        const indexWallB = [1, 1, 8, 8, 5, 5, 6, 6, 6, 6, 2, 2, 3, 3, 4, 4, 5, 5, 1, 1, 8, 8, 2, 2, 7, 7];
        const walls = Math.min(indexWallA.length, numberOfWalls);

        for (let i = 0; i < walls; i++) {
            this.board[indexWallA[i]][indexWallB[i]] = new Wall(this.context);
        }
    }

    findRandomEmptyCell() {
        var i = Math.floor(Math.random() * 10);
        var j = Math.floor(Math.random() * 10);
        while (this.board[i][j].type() !== 'empty cell') {
            i = Math.floor(Math.random() * 10);
            j = Math.floor(Math.random() * 10);
        }
        return [i, j];
    }

    putPacman() {
        if(this.pacmanPosition){
            this.board[this.pacmanPosition[0]][this.pacmanPosition[1]] = new EmptyCell();
        }
        let emptyCell = this.findRandomEmptyCell();
        while(this.isCorner(emptyCell)){
            emptyCell = this.findRandomEmptyCell();
        }
        this.board[emptyCell[0]][emptyCell[1]] = new Pacman(this.context, 4);
        this.pacmanPosition = emptyCell;
    }

    isCorner(cell){
        if((cell[0] == 0 && cell[1] == 0) || (cell[0] == 0 && cell[1] == 9) || (cell[0] == 9 && cell[1] == 9) || (cell[0] == 9 && cell[1] == 0)){
            return true;
        }
        return false;
    }

    spreadingFood(numberOfFood, smallFoodColor, mediumFoodColor, largeFoodColor) {
        let foodRemain5 = Math.floor(numberOfFood * 0.6);
        let foodRemain15 = Math.floor(numberOfFood * 0.3);
        let foodRemain25 = Math.floor(numberOfFood * 0.1);
        this.foodRemain = foodRemain5 + foodRemain15 + foodRemain25;
        while (this.foodRemain > 0) {
            let emptyCell = this.findRandomEmptyCell();
            if (foodRemain5 > 0) {
                this.board[emptyCell[0]][emptyCell[1]] = new Food(this.context, emptyCell, 'small', smallFoodColor, 5); 
                foodRemain5--;
                this.foodRemain--;
                continue;
            }
            if (foodRemain15 > 0) {
                this.board[emptyCell[0]][emptyCell[1]] = new Food(this.context, emptyCell, 'medium', mediumFoodColor, 10);
                foodRemain15--;
                this.foodRemain--;
                continue;
            }
            if (foodRemain25 > 0) {
                this.board[emptyCell[0]][emptyCell[1]] = new Food(this.context, emptyCell, 'large', largeFoodColor, 15);
                foodRemain25--;
                this.foodRemain--;
                continue;
            }
        }

        let emptyCell = this.findRandomEmptyCell();
        this.board[emptyCell[0]][emptyCell[1]] = new ExtraFood(this.context, emptyCell, 'time'); 
        emptyCell = this.findRandomEmptyCell();
        this.board[emptyCell[0]][emptyCell[1]] = new ExtraFood(this.context, emptyCell, 'life'); 

    }

    clearBoard() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw() {
        //this.clearBoard();
        canvas.width=canvas.width;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.board[i][j].draw({ x: i * 60 + 30, y: j * 60 + 30 });
            }
        }
        for (let i = 0; i < this.numberOfMonsters; ++i) {
            this.monsters[i].draw();
        }
    }

    updatePacmanPosition(key) {
        let score = this.calculateScore();
        if(score === -10)
        {
            return {score: score, bonus: ''};
        }
        // clear pacmen
        this.board[this.pacmanPosition[0]][this.pacmanPosition[1]] = new EmptyCell();
        // re position pacman
        if (key == 1) {
            if (this.pacmanPosition[1] > 0 && this.board[this.pacmanPosition[0]][this.pacmanPosition[1] - 1].type() !== 'wall') {
                this.pacmanPosition[1]--;
            }
        }
        if (key == 2) {
            if (this.pacmanPosition[1] < 9 && this.board[this.pacmanPosition[0]][this.pacmanPosition[1] + 1].type() !== 'wall') {
                this.pacmanPosition[1]++;
            }
        }
        if (key == 3) {
            if (this.pacmanPosition[0] > 0 && this.board[this.pacmanPosition[0] - 1][this.pacmanPosition[1]].type() !== 'wall') {
                this.pacmanPosition[0]--;
            }
        }
        if (key == 4) {
            if (this.pacmanPosition[0] < 9 && this.board[this.pacmanPosition[0] + 1][this.pacmanPosition[1]].type() !== 'wall') {
                this.pacmanPosition[0]++;
            }
        }

        score = this.calculateScore();
        let bonus = this.calculateBonus();
        this.board[this.pacmanPosition[0]][this.pacmanPosition[1]] = new Pacman(this.context, key);
        return {score: score, bonus: bonus};
    }


    isMonsterThere(x, y) {
        for (var i = 0; i < this.numberOfMonsters; i++) {
            if(this.monsters[i].position.x === x*60 && this.monsters[i].position.y === y*60){
                return true;
            }
        }
        return false;
    }

    isWallThere(x, y) {
        if(this.board[x][y].type() === 'wall'){
            return true;
        }
        return false;
    }


    
    updateMonstersPosition() {
        for (var i = 0; i < this.numberOfMonsters; i++) {
            let xMonster = this.monsters[i].position.x / 60;
            let yMonster = this.monsters[i].position.y / 60;

            // the monster in the same row
            if (yMonster === this.pacmanPosition[1]) {
                if (xMonster > this.pacmanPosition[0] && !this.isWallThere(xMonster - 1, yMonster) && !this.isMonsterThere(xMonster - 1, yMonster)) { // monster on the right
                    this.monsters[i].position.x = this.monsters[i].position.x - 60;
                } else if (xMonster < this.pacmanPosition[0] && !this.isWallThere(xMonster + 1, yMonster) && !this.isMonsterThere(xMonster + 1, yMonster)) { // monster on the left
                    this.monsters[i].position.x = this.monsters[i].position.x + 60;
                } else if (!this.isWallThere(xMonster, yMonster + 1) && !this.isMonsterThere(xMonster, yMonster + 1)) { // wall!!
                    this.monsters[i].position.y = this.monsters[i].position.y + 60;
                } else if (!this.isWallThere(xMonster, yMonster - 1) && !this.isMonsterThere(xMonster, yMonster - 1)) {
                    this.monsters[i].position.y = this.monsters[i].position.y - 60;
                }
            }
            // the monster in the same col
            else if (xMonster === this.pacmanPosition[0]) {
                if (yMonster > this.pacmanPosition[1] && !this.isWallThere(xMonster, yMonster - 1) && !this.isMonsterThere(xMonster, yMonster - 1)) { // monster on the right
                    this.monsters[i].position.y = this.monsters[i].position.y - 60;
                } else if (yMonster < this.pacmanPosition[1] && !this.isWallThere(xMonster, yMonster + 1) && !this.isMonsterThere(xMonster, yMonster + 1)) {
                    this.monsters[i].position.y = this.monsters[i].position.y + 60;
                } else if (!this.isWallThere(xMonster + 1, yMonster) && !this.isMonsterThere(xMonster + 1, yMonster)) { // wall!!
                    this.monsters[i].position.x = this.monsters[i].position.x + 60;
                } else if (!this.isWallThere(xMonster - 1, yMonster) && !this.isMonsterThere(xMonster - 1, yMonster)) {
                    this.monsters[i].position.x = this.monsters[i].position.x - 60;
                }
            }
            //the monster below the pacman 
            else if (yMonster > this.pacmanPosition[1] && yMonster > 0 && !this.isWallThere(xMonster, yMonster - 1) && !this.isMonsterThere(xMonster, yMonster - 1)) {
                this.monsters[i].position.y = this.monsters[i].position.y - 60;
            }
            //the monster above the pacman 
            else if (yMonster < this.pacmanPosition[1] && yMonster < 9 && !this.isWallThere(xMonster, yMonster + 1) && !this.isMonsterThere(xMonster, yMonster + 1)) {
                this.monsters[i].position.y = this.monsters[i].position.y + 60;
            }
            //the monster on the left of the pacman 
            else if (xMonster > this.pacmanPosition[0] && xMonster > 0 && !this.isWallThere(xMonster - 1, yMonster) && !this.isMonsterThere(xMonster - 1, yMonster)) {
                this.monsters[i].position.x = this.monsters[i].position.x - 60;
            }
            //the monster on the right of the pacman 
            else if (xMonster < this.pacmanPosition[0] && xMonster < 9 && !this.isWallThere(xMonster + 1, yMonster) && !this.isMonsterThere(xMonster + 1, yMonster)) {
                this.monsters[i].position.x = this.monsters[i].position.x + 60;
            }
        }
    }


    calculateScore() {
        if(this.isMonsterThere(this.pacmanPosition[0], this.pacmanPosition[1])){
            return -10;
        }
        if (this.board[this.pacmanPosition[0]][this.pacmanPosition[1]].type() == 'small' || this.board[this.pacmanPosition[0]][this.pacmanPosition[1]].type() == 'medium' || this.board[this.pacmanPosition[0]][this.pacmanPosition[1]].type() == 'large') {
            this.foodRemain--;
            console.log("here?");
            return this.board[this.pacmanPosition[0]][this.pacmanPosition[1]].size
        }
        return 0;
    }

    calculateBonus(){
        if (this.board[this.pacmanPosition[0]][this.pacmanPosition[1]].type() == 'life'){
            return 'life';
        }
        if (this.board[this.pacmanPosition[0]][this.pacmanPosition[1]].type() == 'time'){
            return 'time';
        }
    }
}