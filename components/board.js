

class Board {

    constructor(context, numberOfFood, numberOfMonsters, numberOfWalls) {
        this.board = this.initBoard(10);
        this.context = context;
        this.initWalls(numberOfWalls);
        this.putPacman();
        this.spreadingFood(numberOfFood);
        this.pacman;
        this.food = [];
    }

    draw() {

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
        var indexWallA = [1, 8, 1, 8, 3, 6, 3, 6, 4, 5, 4, 5, 4, 5, 0, 9, 0, 9, 2, 7, 2, 7, 1, 8, 1, 8];
        var indexWallB = [1, 1, 8, 8, 5, 5, 6, 6, 6, 6, 2, 2, 3, 3, 4, 4, 5, 5, 1, 1, 8, 8, 2, 2, 7, 7];
        const walls = Math.min([indexWallA.length, numberOfWalls]);
        for (var i = 0; i < walls; i++) {
            board[indexWallA[i]][indexWallB[i]] = new Wall(this.context, [indexWallA[i], indexWallB[i]]);
        }
    }

    findRandomEmptyCell() {
        var i = Math.floor(Math.random() * 10);
        var j = Math.floor(Math.random() * 10);
        while (this.board[i][j].type() != 'empty cell') {
            i = Math.floor(Math.random() * 10);
            j = Math.floor(Math.random() * 10);
        }
        return [i, j];
    }


    putPacman() {
        const emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = new Pacman(this.context, emptyCell);

        // WTF
        shape.i = emptyCell[0];
        shape.j = emptyCell[1];
    }

    spreadingFood(numberOfFood) {
        let foodRemain5 = Math.floor(numberOfFood * 0.6);
        let foodRemain15 = Math.floor(numberOfFood * 0.3);
        let foodRemain25 = Math.floor(numberOfFood * 0.1);
        while (numberOfFood > 0) {
            let emptyCell = findRandomEmptyCell(board);
            if (foodRemain5 > 0) {
                board[emptyCell[0]][emptyCell[1]] = new Food(this.context, emptyCell, 'small');
                foodRemain5--;
                food_remain--;
                continue;
            }
            if (foodRemain15 > 0) {
                board[emptyCell[0]][emptyCell[1]] = new Food(this.context, emptyCell, 'medium');
                foodRemain15--;
                food_remain--;
                continue;
            }
            if (foodRemain25 > 0) {
                board[emptyCell[0]][emptyCell[1]] = new Food(this.context, emptyCell, 'large');
                foodRemain25--;
                food_remain--;
                continue;
            }
        }
    }