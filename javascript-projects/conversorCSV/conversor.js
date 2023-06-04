const jsonForm = document.querySelector('#jsonform');
const csvForm = document.querySelector('#csvform');
const bConvert = document.querySelector('#bConvert');

bConvert.addEventListener('click', e => convertJSONtoCSV())

function convertJSONtoCSV() {
	let json
	let keys = [];
	let values = [];

	try {
		json = JSON.parse(jsonForm.value)
	}
	catch(error) {
		alert('Formato incorrecto')
		throw new Error('formato Incorrecto')
	}

	if (Array.isArray(json)) {

		json.forEach(item => {
			const nKeys = Object.keys(item);

			if (keys.length == 0) keys = [...nKeys];

			else if (nKeys.length != keys.length) {
				throw new Error('Number of keys are different')
			}
			else console.log('Ok')

			const row = keys.map(k => item[k]);

			values.push([...row]);
		});
		console.log(keys, values);
		values.unshift(keys);
		const text = values.join('\n');
		csvForm.value = text;
	}
	else alert('No es un arreglo de objetos');
}
