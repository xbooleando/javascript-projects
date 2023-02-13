"use strict";

function modifyNote(e){//recibe como parametro un evento
	
	let modifiedNote = e.target.textContent;// esto es  solo para evitar que la tecla
	e.target.textContent = modifiedNote;// "Enter" haga un salto de linea no deseado

	//guarda el entry en la database
	putEntry( parseInt(e.target.getAttribute('id')), e.target.textContent);
	e.target.blur();
}

function createNote(e, lastNote, DBEntry, DBKey){//recibe como parametro un evento,
	//la ultima nota, la nota guardada en DB y el indice de dicha nota

	let paragraph = document.createElement('P');

	if(e.type == 'success') {// si la base de datos se leyó con exito
		paragraph.textContent = DBEntry;
		paragraph.setAttribute('id', DBKey);
		paragraph.setAttribute('spellCheck', 'false')
	}

	else {// si se presiona el boton +
		if (e.target.classList.contains('add')) {
			paragraph.textContent = lastNote.textContent;
		}

		else {// si se presiona "Enter"
			paragraph.textContent = e.target.textContent;
		}
		addEntry(paragraph.textContent);//se añade la nota a la DB

		if (e.target.previousSibling.previousSibling !== null) {//si ya existe una nota anterior en pantalla
			let previousAttribute = parseInt(e.target.previousSibling.previousSibling.getAttribute('id'));
			paragraph.setAttribute('id', previousAttribute + 1);// se le agrega el (id de la nota anterior +1)
		}
		else paragraph.setAttribute('id', 1);//si no hay notas anteriores
	}

	paragraph.setAttribute('contenteditable', '');
	paragraph.classList.add('newnote');

	let line = document.createElement('HR');//se crea una linea

	let fragment = document.createDocumentFragment();//un fragmento para guardar parrafo y linea,												//una linea y otro p pero vacio
		fragment.appendChild(paragraph);
		fragment.appendChild(line);
		
		lastNote.parentNode.insertBefore(fragment, lastNote);//se agrega al elemento objetivo
		lastNote.innerHTML = 'Nueva nota';
		lastNote.scrollIntoView();//esto es para que haga scroll cuando halla overflow

	if (e.type != 'success') {//si no se leyó la DB
		if (e.target.classList.contains('add')) {
			lastNote.innerHTML = '';
			lastNote.focus();
		}

		else lastNote.blur();
	}
}

function deleteNote(e){
	if (e.target.classList.contains('newnote')) {

		deleteEntry(parseInt(e.target.getAttribute('id')));

		let line = e.target.nextSibling;

		line.parentNode.removeChild(e.target);
		line.parentNode.removeChild(line);
	}
}

//////////////////////////////////////////////////////////
//a partir de acá vienen las funciones que manejan la base de datos

const IDBRequest = indexedDB.open('ronbase', 1);

IDBRequest.addEventListener('upgradeneeded', () => {
	const db = IDBRequest.result;
	db.createObjectStore('notas', {autoIncrement : true});
});

const operateTransaction = (mode) => {
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction('notas', mode);
	const objectStore = IDBtransaction.objectStore('notas');
	IDBtransaction.addEventListener('complete', () => {});
	return objectStore
}

function addEntry(entry) {
	const objectStore = operateTransaction('readwrite');
	objectStore.add(entry);
}

const readEntries = () => {
	
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction('notas');
	const objectStore = IDBtransaction.objectStore('notas');
	const cursor = objectStore.openCursor();
	cursor.addEventListener('success', e => {

		let lastNote = document.querySelector('.lastnote');//se seleccionan las notas

		if (cursor.result) {
			createNote(e, lastNote, cursor.result.value, cursor.result.key);
			cursor.result.continue()
		}
		else console.log('datos leidos')
	})
}

const putEntry = (key, entry) => {
	const objectStore = operateTransaction('readwrite')
	objectStore.put(entry, key);
}

const deleteEntry = key => {
	const objectStore = operateTransaction('readwrite');
	objectStore.delete(key);
}

/////////////////////////////////////////////////////
// el codigo empieza a ejecutarse a partir de aquí
	
let container = document.querySelector('.container');//se selecciona el contenedor de notas

container.addEventListener('click', e => {//se dispara cuando se hace click en 'Nueva nota'

	let lastNote = document.querySelector('.lastnote');//se seleccionan las notas

	if (e.target.classList.contains('lastnote')) {
		if (e.target.textContent === '' || e.target.textContent === 'Nueva nota') {
			e.target.textContent = '';
		}
	}

	else if (e.target.classList.contains('add')) {//funcionalidad del boton +

		if (lastNote.textContent == 'Nueva nota'|| lastNote.textContent == '') {
			lastNote.textContent = '';//se quita el texto
			lastNote.focus();//se enfoca la ultima nota
		}

		else createNote(e, lastNote);
	}

	else {//si se presiona afuera de las notas o afuera del boton
		
		if (lastNote.textContent === '') {//se selecciona la ultima nota
			lastNote.textContent = 'Nueva nota';
		}
		else if (lastNote.textContent != 'Nueva nota') {//si está editada
			lastNote.style.color = '#000';//pues se pone el texto negro
		}
	}
})

container.addEventListener('keyup', e => {

	let lastNote = document.querySelector('.lastnote');

	if (e.target.classList.contains('newnote')) {
		if (event.key === 'Enter') {
			if (e.target.textContent !== '') modifyNote(e);
			else deleteNote(e);
		}
	}
	else if (e.target.classList.contains('lastnote')) {
		if (event.key == 'Enter') {
			if (e.target.textContent !== '') createNote(e, lastNote);
		}
	}
});

container.addEventListener('focusout', e => {
	if (e.target.classList.contains('modified') && e.target.textContent === '') {
		deleteNote(e);
	}
});

IDBRequest.addEventListener('success', () => {
	readEntries();
})