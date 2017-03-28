var express = require('express');
var request = require("request");
const qs = require('qs');
var router = express.Router();
const https = require('https');
var	url = require('../../url');

router.post('/savePax', function(req, res) {
	var data = req.body;

	data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
	data = qs.stringify(data);
	request.post({
		url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/savePax',
		form: data
		}, function(err, httpResponse, body){
			res.send(JSON.parse(httpResponse.body));
		}
	);

});

router.post('/loadPax', function(req, res) {
	var data = req.body;

	if(typeof data != 'object') {
		data = JSON.parse(data);
	}

	data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
	data = qs.stringify(data);
	request.post({
		url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/loadPax',
		form: data
		}, function(err, httpResponse, body){
			res.send(JSON.parse(httpResponse.body));
		}
	);

});

module.exports = router;
