let ronda = 0
let playerCounter = 0
let botCounter = 0

const selectElement = (e) => {

	let player = e.target.getAttribute('id')

	if (ronda < 3 || playerCounter == botCounter)
		[ronda, playerCounter, botCounter] = play(ronda, player, playerCounter, botCounter)
}

const play = (ronda, player, playerCounter, botCounter) => {

	let status = document.querySelector('.status')
	let display = document.querySelector('span')
	let lista = ['rock', 'paper', 'scissor'];
	let indice = Math.floor(Math.random()*3)
	let bot = lista[indice];

	if (player == bot) {
		status.textContent = `Empate`;
		playerCounter++;
		botCounter++;
		display.textContent = `${playerCounter}:${botCounter}`
	}

	if (player == 'rock' && bot == 'scissor') {
		status.textContent = `${player} defeat ${bot}. Player wins`;
		playerCounter++;
		display.textContent = `${playerCounter}:${botCounter}`
	}

	else if (player == 'rock' && bot == 'paper') {
		status.textContent = `${bot} defeat ${player}. Bot wins`;
		botCounter++
		display.textContent = `${playerCounter}:${botCounter}`
	}

	else if (player == 'paper' && bot == 'rock') {
		status.textContent = `${player} defeat ${bot}. Player wins`;
		playerCounter++
		display.textContent = `${playerCounter}:${botCounter}`
	}

	else if (player == 'paper' && bot == 'scissor') {
		status.textContent = `${bot} defeat ${player}. Bot wins`;
		botCounter++
		display.textContent = `${playerCounter}:${botCounter}`
	}

	else if (player == 'scissor' && bot == 'rock') {
		status.textContent = `${bot} defeat ${player}. Bot wins`;
		botCounter++
		display.textContent = `${playerCounter}:${botCounter}`
	}

	else if (player == 'scissor' && bot == 'paper') {
		status.textContent = `${player} defeat ${bot}. Player wins`;
		playerCounter++
		display.textContent = `${playerCounter}:${botCounter}`
	}

	ronda++

	if (ronda >= 3 && playerCounter != botCounter){
		
		if (playerCounter > botCounter) {
			status.innerHTML += (`<h3>PLAYER WON</h3>`)
			display.innerHTML = `<span style="color:green">${playerCounter}</span>:<span style="color:darkred">${botCounter}</span>`
		}
		else {
			status.innerHTML += (`<h3>BOT WON</h3>`)
			display.innerHTML = `<span style="color:darkred">${playerCounter}</span>:<span style="color:green">${botCounter}</span>`
		}
		ronda = 0; playerCounter = 0; botCounter = 0
	}

	return [ronda, playerCounter, botCounter]
}

let select = document.querySelectorAll('.image');

select.forEach(element => element.addEventListener('click', selectElement))