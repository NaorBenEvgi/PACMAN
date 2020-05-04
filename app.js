var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var direction = 4;
var monsterAmount = 3; //should be a var
var monsterImg = new Image();
monsterImg.src = 'resources/monster.png'

$(document).ready(function () {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50; //should be a var
	var food_remain_5 = Math.floor(food_remain * 0.6);
	var food_remain_15 = Math.floor(food_remain * 0.3);
	var food_remain_25 = Math.floor(food_remain * 0.1);
	food_remain = food_remain_5 + food_remain_15 + food_remain_25;

	var monsterAmount = 3; //should be a var
	let wallsAmount = 100 - monsterAmount - food_remain;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			board[i][j] = 0;
		}
	}


	//creating walls
	var indexWallA = [1, 8, 1, 8, 3, 6, 3, 6, 4, 5, 4, 5, 4, 5, 0, 9, 0, 9, 2, 7, 2, 7, 1, 8, 1, 8];
	var indexWallB = [1, 1, 8, 8, 5, 5, 6, 6, 6, 6, 2, 2, 3, 3, 4, 4, 5, 5, 1, 1, 8, 8, 2, 2, 7, 7];

	for (var i = 0; i < indexWallA.length; i++) {
		if (wallsAmount > 0) {
			board[indexWallA[i]][indexWallB[i]] = 4;
			wallsAmount--;
		}
	}

	//placing pacman
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 2;
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];	
	pacman_remain--;

	//spreading the food
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (food_remain_5 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 5;
			food_remain_5--;
			food_remain--;
			continue;
		}
		if(food_remain_15 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 15;
			food_remain_15--;
			food_remain--;
			continue;
		  }
		  if(food_remain_25 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 25;
			food_remain_25--;
			food_remain--;
			continue;
		  }
	}
	
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 150);
}


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 10);
	var j = Math.floor(Math.random() * 10);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 10);
		j = Math.floor(Math.random() * 10);
	}
	return [i, j];
}

function GetKeyPressed() {
	// up
	if (keysDown[38]) {
		return 1;
	}

	// down
	if (keysDown[40]) {
		return 2;
	}

	// left
	if (keysDown[37]) {
		return 3;
	}

	// right
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				new Pacman(context).draw(center, direction);
			} else if (board[i][j] == 5) { //small food
				new Food(context).draw(center, 3, "black") //change the color to var
			} else if (board[i][j] == 15) { //medium food
				new Food(context).draw(center, 5, "red") //change the color to var
			} else if (board[i][j] == 25) { //big food
				new Food(context).draw(center, 10, "blue") //change the color to var
			} else if (board[i][j] == 4) {
				new Wall(context).draw(center);
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed() || false && direction;
	direction = x || direction;
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}

	updateScore();
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	Draw();
	new Monster(context, monsterAmount).draw(monsterImg);
	if (score == 50) { //change to var
		window.clearInterval(interval);
		window.alert("Game completed");
	}
}

function updateScore(){
	if(board[shape.i][shape.j] == 5 || board[shape.i][shape.j] == 15 || board[shape.i][shape.j] == 25){
		score += board[shape.i][shape.j];
		food_remain--;
	}
}