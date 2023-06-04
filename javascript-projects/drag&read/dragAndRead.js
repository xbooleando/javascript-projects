let content = 'Arrastre elementos aquí';
let zone    = document.querySelector('.zona');

zone.addEventListener('dragover', e => {
	e.preventDefault();
	changeStyle(e.target, '', '#444')
});

zone.addEventListener('dragleave', e => {
	e.preventDefault();
	changeStyle(e.target, content, '#888')
});

zone.addEventListener('drop', e => {
	e.preventDefault();
	changeStyle(e.target, content, '#888')
	load(e.dataTransfer.files[0]);
});

const changeStyle = (obj, content, color) => {
	zone.textContent = content;
	zone.style.borderColor = color
}

const loadFile = ar => {
	document.querySelector('.result').innerHTML = '';

	const reader = new FileReader();
	reader.readAsText(ar);
	reader.addEventListener('load', e => {
		document.querySelector('.result').textContent = e.target.result;
	})
}

const loadImage = ar => {
	document.querySelector('.result').innerHTML = '';

	const reader = new FileReader();
	reader.readAsDataURL(ar);
	reader.addEventListener('load', e => {
		let url = URL.createObjectURL(ar);
		let image = document.createElement('IMG');
		image.setAttribute('src', url);
		document.querySelector('.result').appendChild(image);
	})
}

const load = ar => {
	if (ar.type == 'image/jpeg' || ar.type == 'image/png') loadImage(ar);
	else  if (ar.type == 'video/mp4') loadVideo(ar);
	else loadFile(ar)
}

const loadVideo = ar => {
	document.querySelector('.result').innerHTML = '';

	const reader = new FileReader();
	reader.readAsArrayBuffer(ar);

	reader.addEventListener('progress', e => {
		let carga = Math.round(e.loaded/ar.size * 100) + '%';
		console.log(carga);
		let loadBar = document.querySelector('.loadBar');
		loadBar.textContent = carga;
		loadBar.style.width = carga;
	})
	reader.addEventListener('load', e => {
		let vid = new Blob([new Uint8Array(e.target.result)], {type : 'video/mp4'});
		let url = URL.createObjectURL(vid);
		let video = document.createElement('VIDEO');
		video.setAttribute('src', url);
		video.setAttribute('controls', '');
		document.querySelector('.result').appendChild(video);
		video.play();
		video.loop = true;
	});

	reader.addEventListener('loadend', e => {
		document.querySelector('.loadBar').style.backgroundColor = '#00bf00';
	})
}