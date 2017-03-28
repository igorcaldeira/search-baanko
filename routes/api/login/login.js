var express = require('express');
var request = require("request");
const querystring = require('querystring');
const qs = require('qs');
var router = express.Router();
const https = require('https');

var OABValidation = require('../../../validations/OABValidation');
var SoccerSociety = require('../../../validations/soccerSociety');
var PortoSeguro = require('../../../validations/portoSeguro');

const url = require('../../url');

router.post('/login', function(req, res) {

	var data = req.body;
	data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
	data = querystring.stringify(data);
	request.post({
		url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/login',
		form: data
		}, function(err, httpResponse, body){
			res.send(JSON.parse(httpResponse.body));
	});
});

router.post('/register', function(req, res) {
	var data = req.body;

	try {
		if(data.agreement == 'oabmg' || data.agreement == 'oabpa' || data.agreement == 'oabes' || data.agreement == 'oabmt'  || data.agreement == 'oabrs' || data.agreement == 'caace' || data.agreement == 'caaro') {

			OABValidation.check(data, function(response) {
				if(response.found == 'N') {
					res.send({ message: { type: 'E', text: response.response }});
				} else  {
					data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
					data = querystring.stringify(data);
					request.post({
						url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/saveUserApp',
						form: data
						}, function(err, httpResponse, body){
							res.send(JSON.parse(httpResponse.body));
					});
				}
			});
		} else if(data.agreement == 'giganteDeVantagens') {

			SoccerSociety.check(data, function(response) {
				if(response.found == 'N') {
					res.send({ message: { type: 'E', text: response.response }});
				} else  {
					data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
					data = querystring.stringify(data);
					request.post({
						url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/saveUserApp',
						form: data
						}, function(err, httpResponse, body){
							res.send(JSON.parse(httpResponse.body));
					});
				}
			});
		} else if(data.agreement == 'portoSeguroCartoes') {

			PortoSeguro.check(data, function(response) {
				if(response.found == 'N') {
					res.send({ message: { type: 'E', text: response.response }});
				} else  {
					data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
					data = querystring.stringify(data);
					request.post({
						url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/saveUserApp',
						form: data
						}, function(err, httpResponse, body){
							res.send(JSON.parse(httpResponse.body));
					});
				}
			});
		} else {
			data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
			data = querystring.stringify(data);
			request.post({
				url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/saveUserApp',
				form: data
				}, function(err, httpResponse, body){
					res.send(JSON.parse(httpResponse.body));
			});
		}
	
	} catch(e) {
		console.log(e);
	}
});

router.post('/termOfUse', function(req, res) {
	var data = req.body;

	try {
	
		data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
		data = qs.stringify(data);
		request.post({
			url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/termOfUse',
			form: data
			}, function(err, httpResponse, body){
				res.send(JSON.parse(httpResponse.body));
		});
	} catch(e) {
		console.log(e);
	}
});

router.post('/changePassword', function(req, res) {

	try {

		var data = req.body;
		data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
		data = querystring.stringify(data);
		request.post({
			url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/changePassword',
			form: data
			}, function(err, httpResponse, body){
				res.send(JSON.parse(httpResponse.body));
		});
	} catch(e) {
		console.log(e);
	}
});

router.post('/resendPassword', function(req, res) {
	var data = req.body;
	try {

		data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
		data = qs.stringify(data);
		request.post({
			url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/resendPassword',
			form: data
			}, function(err, httpResponse, body){
				res.send(JSON.parse(httpResponse.body));
		});

	} catch(e) {
		console.log(e);
	}
});

router.post('/checkoutInfo', function(req, res) {

	try {
		var data = req.body;
		if(typeof data.loginData != 'object') {
			data.loginData = JSON.parse(data.loginData);
		}

		data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
		data = qs.stringify(data);
		request.post({
			url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/loadCheckoutInfo',
			form: data
			}, function(err, httpResponse, body){
				res.send(JSON.parse(httpResponse.body));
		});
	} catch(e) {
		console.log(e);
	}
});

router.post('/loadProfile', function(req, res) {
	try {
		var data = req.body;

		if(typeof data.loginData != "object") {
			data.loginData = JSON.parse(data.loginData);
		}

		data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
		data = qs.stringify(data);
		request.post({
			url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/loadProfile',
			form: data
			}, function(err, httpResponse, body){
				res.send(JSON.parse(httpResponse.body));
		});
	} catch(e) {
		console.log(e);
	}
});

router.post('/saveProfile', function(req, res) {
	try {
		var data = req.body;

		if(typeof data.loginData != "object") {
			data.loginData = JSON.parse(data.loginData);
		}
		if(typeof data.profile != "object") {
			data.profile = JSON.parse(data.profile);
		}

		data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
		data = qs.stringify(data);
		request.post({
			url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/saveProfile',
			form: data
			}, function(err, httpResponse, body){
				res.send(JSON.parse(httpResponse.body));
		});
	} catch(e) {
		console.log(e);
	}
});

router.post('/saveInfo', function(req, res) {
	try {
		var data = req.body;

		if(typeof data.loginData != "object") {
			data.loginData = JSON.parse(data.loginData);
		}
		if(typeof data.selectedInfo != "object") {
			data.selectedInfo = JSON.parse(data.selectedInfo);
		}

		data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
		data = qs.stringify(data);
		request.post({
			url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/saveInfo',
			form: data
			}, function(err, httpResponse, body){
				res.send(JSON.parse(httpResponse.body));
		});
	} catch(e) {
		console.log(e);
	}
});

router.post('/removeInfo', function(req, res) {
	try {
		var data = req.body;

		if(typeof data.loginData != "object") {
			data.loginData = JSON.parse(data.loginData);
		}
		if(typeof data.info != "object") {
			data.info = JSON.parse(data.info);
		}

		data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
		data = qs.stringify(data);
		request.post({
			url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/removeInfo',
			form: data
			}, function(err, httpResponse, body){
				res.send(JSON.parse(httpResponse.body));
		});
	} catch(e) {
		console.log(e);
	}
});

router.post('/loginData', function(req, res) {
	try {
		var data = req.body;
		data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
		data = qs.stringify(data);
		request.post({
			url: url.management + 'idealmilhas/backend/application/index.php?rota=/App/loginData',
			form: data
			}, function(err, httpResponse, body){
				res.send(JSON.parse(httpResponse.body));
		});
	} catch(e) {
		console.log(e);
	}
});

module.exports = router;
