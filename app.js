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
var lifes = 5;
var monsterAmount; //should be a var
let food_remain; //should be a var
var wallsAmount;
let smallFoodColor = 'red';
let mediumFoodColor = 'blue';
let largeFoodColor = 'black';
var gameTime;
var username;
var lblScore = document.getElementById("lblScore");
var lblTime = document.getElementById("lblTime");
var lblLifes = document.getElementById("lblLifes");
var backgroundMusic;

var monsterImg = new Image();
monsterImg.src = 'resources/monster.png'

const mapButtonToDiv = {
	'#homeMenu': '#welcomeDiv',
	'#loginMenu': '#loginDiv',
	'#registerMenu': '#registerDiv',
	//'#aboutMenu': '#loginDiv',
	'#registerWelcome': '#registerDiv',
	'#loginWelcome': '#loginDiv',
	'#loginButton': '#loginDiv',
}


$(document).ready(function () {
	context = canvas.getContext("2d");
	$('.content').hide();
	$('#welcomeDiv').show(1000);
	/*
	$('#loginButton').click(function () {
		console.log('login pressed');
		Start();
	});
	*/
})


function Start() {

	wallsAmount = 100 - food_remain - 1;
	backgroundMusic = new Audio("resources/sounds/Pac-man_theme_remix.mp3");
	backgroundMusic.play();
	board = new Board(context, food_remain, monsterAmount, wallsAmount, smallFoodColor, mediumFoodColor, largeFoodColor);
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

function updateMonstersPosition() {
	const addScore = board.updateMonstersPosition();
	console.log(addScore);
	if (addScore === -10) {
		this.pacmanWasEaten();
	}
	score += addScore;
}

function pacmanWasEaten() {
	lifes--;
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	Draw();
	backgroundMusic.pause();
	const deathMusic = new Audio("resources/sounds/pacman_death.wav");
	setTimeout(function () {
		deathMusic.play();
	}, 10);
	setTimeout(function () { backgroundMusic.play(); }, 1700);
	if (lifes === 0) {
		var lostMusic = new sound("resources/sounds/Booing-sound-effect.mp3");
		setTimeout(function () { lostMusic.play(); }, 10);
		setTimeout(function () { backgroundMusic.pause(); }, 1700);
		//end game
	} else {
		setTimeout(function () {
			board.putPacman();
			board.initMonsters();
			interval = setInterval(UpdatePosition, 150);
			monsterInterval = setInterval(updateMonstersPosition, 650);
		}, 1700);
	}

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
	lblTime.value = gameTime - time_elapsed;
	lblLifes.value = lifes;
	board.draw();
}

function UpdatePosition() {
	var x = GetKeyPressed();
	let addScore = 0;
	if (x) {
		addScore = board.updatePacmanPosition(x);
	}
	this.score += addScore;
	if (addScore === -10) {
		return this.pacmanWasEaten();
	}
	var currentTime = new Date();
	time_elapsed = Math.floor((currentTime - start_time) / 1000);
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	Draw();
	if (score == 500) { //should delete
		window.clearInterval(interval);
		window.alert("Game completed");
	}
}

/****************** jQuery ******************/
//DB for users
let DataBase = [];
DataBase.push({ user: 'a', password: 'a' });
/*
$(function () {
	$('.content').hide();
	$('#welcomeDiv').show(1000);
});
*/
/*Welcome Screen*/
$('#registerWelcome').on('click', function () {
	$('#welcomeDiv').hide(500);
	$(".loginForm").val('');
	$('#registerDiv').show(500);
});
$('#loginWelcome').on('click', function () {
	$('#welcomeDiv').hide(500);
	$(".loginForm").val('');
	$('#loginDiv').show(500);
});

/*Menu*/
$('#homeMenu').on('click', function () {
	$('.content').hide();
	$('#welcomeDiv').show(1000);
});
$('#loginMenu').on('click', function () {
	$('.content').hide();
	$(".loginForm").val('');
	$('#loginDiv').show(500);
});
$('#registerMenu').on('click', function () {
	$('.content').hide();
	$(".loginForm").val('');
	$('#register').show(500);
});


/*Register Form*/

/*Login Screen*/
$('#loginButton').on('click', function (event) {
	event.preventDefault();
	event.stopPropagation();
	var loginAttributes = document.getElementsByClassName("loginForm");
	var inputUsername = loginAttributes[0].value;
	var inputPassword = loginAttributes[1].value;
	let checkUser = DataBase.find(o => o.user === inputUsername);
	if (checkUser != -1 && checkUser.password == inputPassword) {
		username = inputUsername;
		$('#loginDiv').hide();
		$('#gameSettingsDiv').show();
	}
	else {
		alert("Incorrect username or password, try again :)");

	}

});

/*Start Game*/
$('#startGameButton').on('click', function (event) {
	event.preventDefault();
	event.stopPropagation();
	var formInputs = $('.gameInputs');
	food_remain = formInputs[0].value; //validate
	smallFoodColor = formInputs[1].value;
	mediumFoodColor = formInputs[2].value;
	largeFoodColor = formInputs[3].value;
	gameTime = parseInt(formInputs[4].value);
	monsterAmount = parseInt($('#selectAmountOfMonsters').val());
	$('#gameSettingsDiv').hide();
	$('#gameDiv').show();
	Start();

});