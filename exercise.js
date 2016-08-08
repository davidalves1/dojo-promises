var fs = require('fs');

function read() {
	return new Promise((resolve, reject) => {
		fs.readFile('./bd_names.txt', 'utf8', (err, data) => {
			if (err)
				reject();
			else
		  		resolve(data);
		});
	}); 
}

function getData(data) {
	return new Promise((resolve, reject) => {
		var arr = data.split("\n");
		
		resolve({
			title: arr.shift().split("|"),
			records: arr
		});
	});
}

function showData(data) {
	return new Promise((resolve, reject) => {
		var records = data.records;
		var titles = data.title;

		var res = records.map((elem, titles) => {
			var arr = elem.split("|");
			var t0 = titles[0];
			var t1 = titles[1];
			var t2 = titles[2];
			var response = {}

			response.t0[0] = arr[0];
			response.t1[1] = arr[1];
			response.t2[2] = arr[2];

			return response;
		});

		resolve(res);
	});
}

read()
	.then(getData)
	.then(showData)
	.then((response) => console.log(response))
	.catch(() => console.log('Erro.'));