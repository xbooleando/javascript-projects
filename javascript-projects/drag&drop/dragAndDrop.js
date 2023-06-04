const asignarColor = (n, e) => {
	e.dataTransfer.setData('color', getComputedStyle(e.target).backgroundColor);
}

for (let i = 1; i < document.querySelector('.circles').children.length + 1; i++) {
	document.querySelector(`.circle${i}`).addEventListener('dragstart', (e) => asignarColor(i, e,));
}

let zona = document.querySelector('.rectangulo');
zona.addEventListener('dragover', (e) => e.preventDefault());

zona.addEventListener('drop', (e) => {
	let color = e.dataTransfer.getData('color');
	zona.style.backgroundColor = color;
})



