const statusDisplay = document.querySelector('.game--status');
let gameActive = true;
let currentPlayer = 'X';
let gameState = ['','','','','','','','',''];

const winningMessage = () => `el jugador ${currentPlayer} ha ganado`;
const drawMessage = () => `El juego terminó en empate`;
const currentPlayerTurn = () => `le toca a la ${currentPlayer}`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {

	gameState[clickedCellIndex] = currentPlayer;
	currentPlayer == 'X'? 
	clickedCell.style.backgroundImage = "url('./images/x.png')" :
	clickedCell.style.backgroundImage = "url('./images/o.png')";
}

function handlePlayerChange() {
	currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
	statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRoundWon() {
	// body...
}

function handleResultValidation() {

	const winningConditions = [
		[0,1,2], [3,4,5], 
		[6,7,8], [0,3,6], 
		[1,4,7], [2,5,8], 
		[0,4,8], [2,4,6], 
	]

	let roundWon = false;

	for (let i = 0; i <= 7; i++) {
		const winCondition = winningConditions[i];
		let a = gameState[winCondition[0]];
		let b = gameState[winCondition[1]];
		let c = gameState[winCondition[2]];

		if (a === "" || b === "" || c === "") {
			continue;
		}

		if (a == b && b == c) {

			let cells = document.querySelectorAll('.cell');
				cells[winCondition[0]].style.backgroundColor = 'green';
				cells[winCondition[1]].style.backgroundColor = 'green';
				cells[winCondition[2]].style.backgroundColor = 'green';

			roundWon = true;
			break;
		}
	}

	if (roundWon) {
		statusDisplay.innerHTML = winningMessage();
		gameActive = false;
		return;
	}

	let roundDraw = !gameState.includes("");
	if (roundDraw) {
		statusDisplay.innerHTML = drawMessage();
		gameActive = false;
		return;
	}
	handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {

	let clickedCell = clickedCellEvent.target;

	let cells = document.querySelectorAll('.cell');

	const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

	if(gameState[clickedCellIndex] !== "" || !gameActive) {
		return;
	}

	handleCellPlayed(clickedCell, clickedCellIndex);
	handleResultValidation();
}

function handleRestartGame() {

	gameActive = true;
	currentPlayer = 'X';
	gameState = ['','','','','','','','',''];
	statusDisplay.innerHTML = currentPlayerTurn();
	document.querySelectorAll('.cell').forEach(cell => cell.style.background = "");
}

function handleCellMouseOver() {
	if (this.style.backgroundImage == "" && gameActive) {
		this.style.backgroundColor = "rgba(204, 204, 204, 1)";
		this.style.cursor = "pointer";
	}
}

function handleCellMouseOut() {

	this.style.cursor = "initial";

	if (this.style.backgroundColor != "green") {
		this.style.backgroundColor = "initial";
	}
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('mouseover', handleCellMouseOver));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('mouseout', handleCellMouseOut));
document.querySelector('.reset').addEventListener('click', handleRestartGame);