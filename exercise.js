'use strict';

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
		var arr = data.split(/\r?\n/);
		
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

		var res = records.map((elem) => {
			var arr = elem.split("|");

			var response = {};

			arr.map((value, key) => {
				response[titles[key]] = value;
			});

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