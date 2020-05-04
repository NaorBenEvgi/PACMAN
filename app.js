var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var monsterInterval;
var direction = 4;
var monsterAmount = 3; //should be a var
var food_remain = 50; //should be a var
let wallsAmount = 100 - monsterAmount - food_remain;

var monsterImg = new Image();
monsterImg.src = 'resources/monster.png'

$(document).ready(function () {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	board = new Board(context, food_remain, monsterAmount, wallsAmount);
	score = 0;
	start_time = new Date();

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
	monsterInterval = setInterval(updateMonstersPosition, 650);
}

function updateMonstersPosition(){
	const addScore = board.updateMonstersPosition();
	score += addScore;
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
	// clearBoard();
	lblScore.value = score;
	lblTime.value = time_elapsed;
	board.draw();
}

function UpdatePosition() {
	var x = GetKeyPressed();
	let addScore = 0;
	if(x) 
	{
		addScore = board.updatePacmanPosition(x);
	}

	this.score += addScore;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	Draw();
	if (score == 500) { //change to var
		window.clearInterval(interval);
		window.alert("Game completed");
	}
}
