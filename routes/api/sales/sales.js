var express = require('express');
var request = require("request");
const qs = require('qs');
var router = express.Router();
const url = require('../../url');

router.post('/historic', function(req, res) {
	var data = req.body;

	if(typeof data.loginData != 'object') {
		data.loginData = JSON.parse(data.loginData);
	}

	data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
	data = qs.stringify(data);
	request.post({
		url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/historic',
		form: data
		}, function(err, httpResponse, body){
			res.send(JSON.parse(httpResponse.body));
	});
});

router.post('/credits', function(req, res) {
	var data = req.body;

	data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
	data = qs.stringify(data);
	request.post({
		url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/checkCredit',
		form: data
		}, function(err, httpResponse, body){
			res.send(JSON.parse(httpResponse.body));
	});
});

module.exports = router;
