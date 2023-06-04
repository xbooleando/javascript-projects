let archivo = document.querySelector('.archivo');

archivo.addEventListener("change", (e) => {
	for (let file of archivo.files) {
		leerArchivo(file);
	}
});

const leerArchivo = ar => {
	if (ar.type == 'image/png' || ar.type == 'image/jpeg') leerImagen(ar)

	else {
		const reader = new FileReader();
		reader.readAsText(ar);
		reader.addEventListener('load', (e) => console.log(JSON.parse(e.srcElement.result)))
	}
}

const leerImagen = ar => {
	 //LEER IMAGENES CREANDO NODOS:
	const reader = new FileReader();
	reader.readAsDataURL(ar);
	reader.addEventListener('load', (e) => {
		let image = document.createElement('img')
		image.src = e.target.result; 
		let fragment = new DocumentFragment();
		fragment.appendChild(image);
		document.querySelector('.resultado').appendChild(fragment);
	});
}

// LEER IMAGENES SIN CREAR NODOS
	// const reader = new FileReader();
	// reader.readAsDataURL(ar);
	// reader.addEventListener('load', (e) => {
	// 	let newImg = `<img src="${e.target.result}" alt="jaja">`;
	// 	document.querySelector('.resultado').innerHTML += newImg;
	// });