

class Board {

    constructor(context, numberOfFood, numberOfMonsters, numberOfWalls) {
        this.size = 10;
        this.board = this.initBoard(this.size);
        this.context = context;
        this.foodRemain;
        this.initWalls(numberOfWalls);
        this.putPacman();
        this.spreadingFood(numberOfFood);
        this.pacman;
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

    initWalls(numberOfWalls) {

        //creating walls
        const indexWallA = [1, 8, 1, 8, 3, 6, 3, 6, 4, 5, 4, 5, 4, 5, 0, 9, 0, 9, 2, 7, 2, 7, 1, 8, 1, 8];
        const indexWallB = [1, 1, 8, 8, 5, 5, 6, 6, 6, 6, 2, 2, 3, 3, 4, 4, 5, 5, 1, 1, 8, 8, 2, 2, 7, 7];
        const walls = Math.min(indexWallA.length, numberOfWalls);
        console.log(walls);

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

    draw() {
        console.log(this.board);
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.board[i][j].draw({ x: i * 60 + 30, y: j * 60 + 30 });
            }
        }
    }

    putPacman() {
        const emptyCell = this.findRandomEmptyCell();
        this.board[emptyCell[0]][emptyCell[1]] = new Pacman(this.context, emptyCell, 4);

        // WTF
        shape.i = emptyCell[0];
        shape.j = emptyCell[1];
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
}