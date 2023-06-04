let hora = document.querySelector('.hora');
let minutos = document.querySelector('.minutos');
let segundos = document.querySelector('.segundos');

const addzeros = n => {
	if (n.toString().length < 2) return '0'.concat(n);
	return n;
}

const actualizarHora = () => {

let tiempo  = new Date();
let hour    = addzeros(tiempo.getHours());
let minutes = addzeros(tiempo.getMinutes());
let seconds = addzeros(tiempo.getSeconds());

	hora.textContent = hour;
	minutos.textContent = minutes;
	segundos.textContent = seconds;
}

actualizarHora();

setInterval(actualizarHora, 500);