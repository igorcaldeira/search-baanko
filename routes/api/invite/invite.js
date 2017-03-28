var express = require('express');
var request = require("request");
const qs = require('qs');
var router = express.Router();
const https = require('https');
var OABValidation = require('../../../validations/OABValidation');
var	url = require('../../url');

router.post('/sendInvite', function(req, res) {
	var data = req.body;

	if(typeof data.loginData != 'object') {
		data.loginData = JSON.parse(data.loginData);
	}
	if(typeof data.inviteData != 'object') {
		data.inviteData = JSON.parse(data.inviteData);
	}

	data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
	data = qs.stringify(data);
	request.post({
		url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/sendInvite',
		form: data
		}, function(err, httpResponse, body){
			res.send(JSON.parse(httpResponse.body));
		}
	);

});

// router.get('/inv', function(req, res) {
// 	res.redirect("https://www.voelegal.com.br?i="+req.query.i);
// 	// res.redirect("http://localhost:3000?i="+req.query.i);
// });

router.get('/inv', function(req, res) {
	res.redirect("https://www.voelegal.com.br?i="+req.query.i+"&a="+req.query.a);
	// res.redirect("http://localhost:4000?i="+req.query.i+"&a="+req.query.a);
});


module.exports = router;
