

class Board {

    constructor(context, numberOfFood, numberOfMonsters, numberOfWalls) {
        this.size = 10;
        this.board = this.initBoard(this.size);
        this.context = context;
        this.foodRemain;
        this.initWalls(numberOfWalls);
        this.putPacman();
        this.spreadingFood(numberOfFood);
        this.pacmanPosition;
        this.numberOfMonsters = numberOfMonsters;
        this.monsters = this.initMonsters();
        this.food = [];
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
        return [
            new Monster(this.context, { x: 0, y: 0 }),
            new Monster(this.context, { x: 540, y: 0 }),
            new Monster(this.context, { x: 0, y: 540 }),
            new Monster(this.context, { x: 540, y: 540 })
        ];
    }

    initWalls(numberOfWalls) {

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
        const emptyCell = this.findRandomEmptyCell();
        this.board[emptyCell[0]][emptyCell[1]] = new Pacman(this.context, 4);
        this.pacmanPosition = emptyCell;
    }

    spreadingFood(numberOfFood) {
        let foodRemain5 = Math.floor(numberOfFood * 0.6);
        let foodRemain15 = Math.floor(numberOfFood * 0.3);
        let foodRemain25 = Math.floor(numberOfFood * 0.1);
        this.foodRemain = foodRemain5 + foodRemain15 + foodRemain25;
        while (this.foodRemain > 0) {
            let emptyCell = this.findRandomEmptyCell();
            if (foodRemain5 > 0) {
                this.board[emptyCell[0]][emptyCell[1]] = new Food(this.context, emptyCell, 'small', 'black', 5); //TODO: Change food color
                foodRemain5--;
                this.foodRemain--;
                continue;
            }
            if (foodRemain15 > 0) {
                this.board[emptyCell[0]][emptyCell[1]] = new Food(this.context, emptyCell, 'medium', 'blue', 10);
                foodRemain15--;
                this.foodRemain--;
                continue;
            }
            if (foodRemain25 > 0) {
                this.board[emptyCell[0]][emptyCell[1]] = new Food(this.context, emptyCell, 'large', 'red', 15);
                foodRemain25--;
                this.foodRemain--;
                continue;
            }
        }
    }

    clearBoard() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw() {
        this.clearBoard();
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

        const score = this.calculateScore();
        this.board[this.pacmanPosition[0]][this.pacmanPosition[1]] = new Pacman(this.context, key);
        return score;
    }


    isMonsterThere(i){
        // check if monsters other then i in array there
    }


    updateMonstersPosition() {
        let score = 0;
        for (var i = 0; i < this.numberOfMonsters; i++) {
            let xMonster = this.monsters[i].position.x / 60;
            let yMonster = this.monsters[i].position.y / 60;

            if(yMonster === this.pacmanPosition[1] && xMonster === this.pacmanPosition[0])
            {
                score =- 10; //lose
                break;
            }

            // the monster in the same row
            else if (yMonster === this.pacmanPosition[1]) {
                if (xMonster > this.pacmanPosition[0] && this.board[xMonster - 1][yMonster].type() != 'wall') { // monster on the right
                    this.monsters[i].position.x = this.monsters[i].position.x - 60;
                } else if (xMonster < this.pacmanPosition[0] && this.board[xMonster + 1][yMonster].type() != 'wall') { // monster on the left
                    this.monsters[i].position.x = this.monsters[i].position.x + 60;
                } else if (this.board[xMonster][yMonster + 1].type() != 'wall') { // wall!!
                    this.monsters[i].position.y = this.monsters[i].position.y + 60;
                } else if (this.board[xMonster][yMonster - 1].type() != 'wall') {
                    this.monsters[i].position.y = this.monsters[i].position.y - 60;
                }
            }
            // the monster in the same col
            else if (xMonster === this.pacmanPosition[0]) {
                if (yMonster > this.pacmanPosition[1] && this.board[xMonster][yMonster - 1].type() != 'wall') { // monster on the right
                    this.monsters[i].position.y = this.monsters[i].position.y - 60;
                } else if (yMonster < this.pacmanPosition[1] && this.board[xMonster][yMonster + 1].type() != 'wall') {
                    this.monsters[i].position.y = this.monsters[i].position.y + 60;
                } else if (this.board[xMonster + 1][yMonster].type() != 'wall') { // wall!!
                    this.monsters[i].position.x = this.monsters[i].position.x + 60;
                } else if (this.board[xMonster - 1][yMonster].type() != 'wall') {
                    this.monsters[i].position.x = this.monsters[i].position.x - 60;
                }
            }
            //the monster below the pacman 
            else if (yMonster > this.pacmanPosition[1] && yMonster > 0 && this.board[xMonster][yMonster - 1].type() != 'wall') {
                this.monsters[i].position.y = this.monsters[i].position.y - 60;
            }
            //the monster above the pacman 
            else if (yMonster < this.pacmanPosition[1] && yMonster < 9 && this.board[xMonster][yMonster + 1].type() != 'wall') {
                this.monsters[i].position.y = this.monsters[i].position.y + 60;
            }
            //the monster on the left of the pacman 
            else if (xMonster > this.pacmanPosition[0] && xMonster > 0 && this.board[xMonster - 1][yMonster].type() != 'wall') {
                this.monsters[i].position.x = this.monsters[i].position.x - 60;
            }
            //the monster on the right of the pacman 
            else if (xMonster < this.pacmanPosition[0] && xMonster < 9 && this.board[xMonster + 1][yMonster].type() != 'wall') {
                this.monsters[i].position.x = this.monsters[i].position.x + 60;
            }
        }
        return score;
    }


    calculateScore() {
        if (this.board[this.pacmanPosition[0]][this.pacmanPosition[1]].type() == 'small' || this.board[this.pacmanPosition[0]][this.pacmanPosition[1]].type() == 'medium' || this.board[this.pacmanPosition[0]][this.pacmanPosition[1]].type() == 'large') {
            this.foodRemain--;
            return this.board[this.pacmanPosition[0]][this.pacmanPosition[1]].size
        }
        return 0;
    }
}