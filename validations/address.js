var express = require('express');
var request = require("request");
var router = express.Router();

router.get('/zipCode', function(req, res) {
	var data = req.query;

	var responseClient = { status: 'error', data: {}};
	try {
		data.zipCode = data.zipCode.split('-');
		request
			.get('https://viacep.com.br/ws/' + data.zipCode[0] + data.zipCode[1] + '/json/', function (error, response, body) {
				if(body.indexOf('Bad Request') > 0) {
					responseClient.status = 'error';
				} else {
					var data = JSON.parse(body);
					if(data.erro) {
						responseClient.status = 'error';
					} else {
						responseClient.status = 'success';
						responseClient.data = data;
					}
				}
				res.send(responseClient);
			});
	} catch(e) {
		res.send(responseClient);
	}

});

module.exports = router;