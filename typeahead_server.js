/*
	requires express (sudo npm install express)
	run with sudo node typeahead_server.js
*/

var fs = require('fs');
var express = require('express');
var app = express();

var items = [
	{id: 'test1', value: 'Lions', category: 'felidae'},
	{id: 'test2', value: 'Tigers', category: 'felidae'},
	{id: 'test3', value: 'Panthers', category: 'felidae'},
	{id: 'test4', value: 'Lynx', category: 'felidae'},
	{id: 'test5', value: 'Cheetahs', category: 'felidae'},
	{id: 'test6', value: 'Cougars', category: 'felidae'},
	{id: 'test7', value: 'Leopards', category: 'felidae'},
	{id: 'test8', value: 'Dogs', category: 'canidae'},
	{id: 'test9', value: 'Wolves', category: 'canidae'},
	{id: 'test10', value: 'Foxes', category: 'canidae'},
	{id: 'test11', value: 'Jackals', category: 'canidae'},
];

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.disable('x-powered-by');
app.enable('trust proxy');
app.use(allowCrossDomain);

var server = app.listen(8012, function () {
	console.log('server started');
});

app.get('/bloodhound', function(req, res){
	console.dir(req.url);
	console.dir(req.query);
	for (var query in req.query) {
		if (req.query.hasOwnProperty(query)) {
			findMatches(query, function(matches){
				res.send(matches);
			});
		}
	}
});

function findMatches(q, callback) {
	var matches, substrRegex;
	matches = [];
	substrRegex = new RegExp(q, 'i');
	for (var i = 0; i < items.length; i++) {
		if (substrRegex.test(items[i].value)) {
			matches.push(items[i]);
		}
	}
	callback(matches);
}