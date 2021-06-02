#!/usr/bin/env /usr/local/bin/node

var bodyParser = require('body-parser');
var express = require('express');
var process = require('process');

var port = process.env.PORT || 8080;

var app = express();

var _queriedTickers = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/stocks/:stockTicker', function(req, res) {
	
	if (!req.params.stockTicker) {
		res.status(404).send(JSON.stringify({error: 'Ticker required.'}));
		return;
	}
	
	var ticker = req.params.stockTicker;
	if (!/^[a-zA-Z()]{1,4}$/.test(ticker)) {
		res.status(404).send(JSON.stringify({error: 'Invalid ticker.'}));
		return;	
	}

	if (!_queriedTickers[ticker]) {
		var seedPrice = 10 + (250 * Math.random());
		var seedOpen = seedPrice * (1 + (0.5 - Math.random()) / 10);
		var seedIntradayMax = seedOpen * (1 + (Math.random() / 10));
		var seedIntradayMin = seedOpen * (1 - (Math.random() / 10));
		var seedVolume = 1000000 * 10 * (1 + Math.random());
		_queriedTickers[ticker] = {
			price: seedPrice,
			open: seedOpen,
			intradayMax: seedIntradayMax,
			intradayMin: seedIntradayMin,
			intradayVolume: seedVolume,
			peRatio: 15 * Math.random(),
			marketCap: 1000000000 * 50 * (1 + Math.random()),
			fiftyTwoWeekMax: seedIntradayMax * (1 + (Math.random() / 10)),
			fiftyTwoWeekMin: seedIntradayMin * (1 - (Math.random() / 10)),
			averageVolume: seedVolume * (1 - (Math.random() / 10)),
			dividendYield: Math.max(0, (0.8 - Math.random()) / 10)
		};
	}

	var priceDelta = (1 + (0.5 - Math.random()) / 100);
	var newPrice = _queriedTickers[ticker].price * priceDelta;
	_queriedTickers[ticker].price = newPrice;
	_queriedTickers[ticker].peRatio += priceDelta;
	_queriedTickers[ticker].marketCap *= priceDelta;
	_queriedTickers[ticker].dividendYield /= priceDelta;
	if (_queriedTickers[ticker].intradayMin > newPrice) _queriedTickers[ticker].intradayMin = newPrice;
	if (_queriedTickers[ticker].intradayMax < newPrice) _queriedTickers[ticker].intradayMax = newPrice;
	if (_queriedTickers[ticker].fiftyTwoWeekMin > newPrice) _queriedTickers[ticker].fiftyTwoWeekMin = newPrice;
	if (_queriedTickers[ticker].fiftyTwoWeekMax < newPrice) _queriedTickers[ticker].fiftyTwoWeekMax = newPrice;

	res.status(200).send(JSON.stringify(_queriedTickers[ticker]));
});

app.get('*', function(req, res) {
	console.log(new Date() + ': Received GET request: ' + JSON.stringify([req.params, req.body]));
	res.status(404).send(JSON.stringify({error: 'Unknown resource requested.'}));
});

app.post('*', function(req, res) {
	console.log(new Date() + ': Received POST request: ' + JSON.stringify([req.params, req.body]));
	res.status(404).send(JSON.stringify({error: 'Unknown resource requested.'}));
});

var server = app.listen(port, function() {
	console.log('sample client listening at http://' + server.address().address + ':' + server.address().port);
});

