const play = (ronda = 0) => {

	let lista = ['piedra', 'papel', 'tijera'];
	let indice = Math.floor(Math.random()*3)
	let bot = lista[indice];
	let player = prompt('¿piedra, papel o tijera?');
	let playerCounter = 0
	let botCounter = 0

	if (player == bot) console.log(`Empate`)

	if (player == 'piedra' && bot == 'tijera') {
		console.log(`${player} le gana a ${bot}. Player gana`)
		playerCounter ++
	}

	else if (player == 'piedra' && bot == 'papel') {
		console.log(`${bot} le gana a ${player}. Bot gana`)
		botCounter++
	}

	else if (player == 'papel' && bot == 'piedra') {
		console.log(`${player} le gana a ${bot}. Player gana`)
		playerCounter++
	}

	else if (player == 'papel' && bot == 'tijera') {
		console.log(`${bot} le gana a ${player}. Bot gana`)
		botCounter++
	}

	else if (player == 'tijera' && bot == 'piedra') {
		console.log(`${bot} le gana a ${player}. Bot gana`)
		botCounter++
	}

	else if (player == 'tijera' && bot == 'papel') {
		console.log(`${player} le gana a ${bot}. Player gana`)
		playerCounter++
	}

	ronda++

	if (ronda < 3 || playerCounter === botCounter) play(ronda)

	else if (playerCounter > botCounter) console.log('PLAYER GANO')

	else console.log('BOT GANO')
}

play(undefined)