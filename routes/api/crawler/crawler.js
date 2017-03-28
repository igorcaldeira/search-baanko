var express = require('express');
var request = require("request");
const qs = require('qs');
var router = express.Router();

router.post('/find', function(req, res) {
	var data = req.body;
	try {

		var hashid = '';
		if(req.headers.hashid) {
			hashid = req.headers.hashid;
		}

		if(typeof data.data != 'object') {
			data.data = JSON.parse(data.data);
		}
		if(typeof data.loginData != 'object') {
			data.loginData = JSON.parse(data.loginData);
		}
		if(typeof data.companhias_aereas != 'object') {
			data.companhias_aereas = JSON.parse(data.companhias_aereas);
		}

		if(typeof data.data.adults != "number") {
			data.data.adults = JSON.parse(data.data.adults);
		}
		if(typeof data.data.children != "number") {
			data.data.children = JSON.parse(data.data.children);
		}
		if(typeof data.data.babies != "number") {
			data.data.babies = JSON.parse(data.data.babies);
		}

		request.post({
			url: 'http://flights.srm.systems:4000/api/crawler/find',
			headers: {
				'hashid': hashid
			},
			form: data
		}, function(error, response, body) {
			if(response) {
				res.send(response.body);
			} else {
				res.send(error);
			}
		});
	} catch(e) {
		console.log(e);
	}
});

module.exports = router;
