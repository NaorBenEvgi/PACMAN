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
	// board = new Array();
	board = new Board(food_remain, monsterAmount, wallsAmount);
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
		for (var j = 0; j < 10; j++) {
			board[i][j] = 0;
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

function clearBoard() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function Draw() {
	clearBoard();
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
			} else if (typeof board[i][j] === 'Wall') {
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
	new Monster(context, monsterAmount).move(shape, board);
	new Monster(context, monsterAmount).draw();
	if (score == 50) { //change to var
		window.clearInterval(interval);
		window.alert("Game completed");
	}
}

function updateScore(){
	if(board[shape.i][shape.j] == 5 || board[shape.i][shape.j] == 15 || board[shape.i][shape.j] == 25){
		this.score += board[shape.i][shape.j];
		this.food_remain--;
	}
}