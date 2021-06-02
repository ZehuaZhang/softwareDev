#!/usr/bin/env /usr/local/bin/node

var bodyParser = require('body-parser');
var express = require('express');
var process = require('process');

var port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', function(req, res) {
	console.log(new Date() + ': Received GET request: ' + JSON.stringify([req.params, req.body]));
	res.status(200).send(JSON.stringify([req.params, req.body]));
});

app.post('*', function(req, res) {
	console.log(new Date() + ': Received POST request: ' + JSON.stringify([req.params, req.body]));
	res.status(200).send(JSON.stringify([req.params, req.body]));
});

var server = app.listen(port, function() {
	console.log('sample client listening at http://' + server.address().address + ':' + server.address().port);
});

