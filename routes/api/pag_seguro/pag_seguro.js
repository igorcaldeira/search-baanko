var express = require('express');
var request = require("request");
var qs = require('qs');
const querystring = require('querystring');
var jwt = require('jsonwebtoken');
var router = express.Router();

var OABValidation = require('../../../validations/OABValidation');
var SoccerSociety = require('../../../validations/soccerSociety');
var PortoSeguro = require('../../../validations/portoSeguro');

var PassengerValidation = require('../../../validations/passenger');
var	url = require('../../url');

router.post('/getLastId', function(req, res) {
	var data = req.body;

	var agreement = data.loginData.agreement;
	if(req.headers.hashid) {
		hashid = req.headers.hashid;
		try {
			agreement = jwt.decode(hashid).agreement;
		} catch(err) {
			// err
		}
	}

	request.post({
		url: url.payment + 'pagamento-idealMilhas/backend/application/index.php?rota=/App/getLastId',
		form: qs.stringify({hashId: '79fbe9b577f0a4e31bae4753449dfd4c', login: data.loginData})
		}, function(error, response, body) {
			res.send({message: {type: "SUCECSS", description: '' }, dataset: JSON.parse(response.body).dataset.sessionId});
	});
});

router.post('/generateBilling', function(req, res) {
	var data = req.body;

	if(typeof data.cardInfo != 'object') {
		data.cardInfo = JSON.parse(data.cardInfo);
	}
	if(typeof data.departureFlights != 'object') {
		data.departureFlights = JSON.parse(data.departureFlights);

	}
	if(Array.isArray(data.departureFlights)) {
		let flights = [];
		for(let i in data.departureFlights) {
			flights.push(data.departureFlights[i].flight);
		}
		data.departureFlights = undefined;
		data.listFlights = flights;
	}
	if(typeof data.loginData != 'object') {
		data.loginData = JSON.parse(data.loginData);
	}
	if(typeof data.pagSeguro != 'object') {
		data.pagSeguro = JSON.parse(data.pagSeguro);
	}
	if(typeof data.pax != 'object') {
		data.pax = JSON.parse(data.pax);
	}
	if(typeof data.pricing != 'object') {
		data.pricing = JSON.parse(data.pricing);
	}
	if(data.returnFlights) {
		if(typeof data.returnFlights != 'object') {
			data.returnFlights = JSON.parse(data.returnFlights);
		}
	}
	if(typeof data.selectedInstallment != 'object') {
		data.selectedInstallment = JSON.parse(data.selectedInstallment);
	}

	if(checkTime()) {
		try {
			if (validatePax(data.pax)) {
				res.status(500).send({ message: { type: 'E', text: 'Favor preencher os dados dos passageiros corretamente.' }});
			} else {

				var agreement = data.loginData.agreement;
				if(req.headers.hashid) {
					hashid = req.headers.hashid;
					try {
						agreement = jwt.decode(hashid).agreement;
					} catch(err) {
						// err
					}
				}

				if(agreement == 'oabmg' || agreement == 'oabpa' || agreement == 'oabes' || agreement == 'oabmt' || agreement == 'oabrs' || agreement == 'caace' || agreement == 'caaro') {
					OABValidation.check(data.loginData, function(response) {
						if(response.type == 'S') {
							var postData = { hashId: '79fbe9b577f0a4e31bae4753449dfd4c'};
							postData.cardInfo = data.cardInfo;
							postData.departureFlights = data.departureFlights;
							postData.loginData = data.loginData;
							postData.pagSeguro = data.pagSeguro;
							postData.pax = data.pax;
							postData.pricing = data.pricing;
							postData.returnFlights = data.returnFlights;
							postData.selectedInstallment = data.selectedInstallment;

							if(data.listFlights) {
								postData.listFlights = data.listFlights;
							}

							if(data.credits) {
								if(typeof data.credits != 'object') {
									data.credits = JSON.parse(data.credits);
								}
								postData.credits = data.credits;
							}
							postData = qs.stringify(postData);

							request.post({
								url: url.payment + 'pagamento-idealMilhas/backend/application/index.php?rota=/App/generateBilling',
								form: postData
								}, function(error, response, body) {
									res.send(JSON.parse(response.body));
							});
						} else {
							res.status(500).send({ message: { type: 'E', text: 'Encontramos um problema no seu cadastro, favor entrar em contato com a OAB.' } });
						}
					});
				} else {

					var postData = { hashId: '79fbe9b577f0a4e31bae4753449dfd4c'};
					postData.cardInfo = data.cardInfo;
					postData.departureFlights = data.departureFlights;
					postData.loginData = data.loginData;
					postData.pagSeguro = data.pagSeguro;
					postData.pax = data.pax;
					postData.pricing = data.pricing;
					postData.returnFlights = data.returnFlights;
					postData.selectedInstallment = data.selectedInstallment;
					
					if(data.listFlights) {
						postData.listFlights = data.listFlights;
					}

					if(data.credits) {
						if(typeof data.credits != 'object') {
							data.credits = JSON.parse(data.credits);
						}
						postData.credits = data.credits;
					}
					postData = qs.stringify(postData);

					request.post({
						url: url.payment + 'pagamento-idealMilhas/backend/application/index.php?rota=/App/generateBilling',
						form: postData
						}, function(error, response, body) {
							console.log(response.body);
							res.send(JSON.parse(response.body));
					});
				};
			}
		} catch(e) {
			res.status(500).send({ message: { type: 'E', text: 'Erro interno, favor entrar em contato.' }});
		}
	} else {
		res.status(500).send({ message: { type: 'E', text: 'Os bilhetes podem ser comprados nos seguintes horários: \r\n\r\n Dias de semana: 09:00 ás 02:00, \r\n Aos Sábados: 09:00 ás 20:00, \r\n Aos domingos: 10:00 ás 18:00.' }});
	}
});

router.post('/onlineDebitOrder', function(req, res) {
	var data = req.body;

	if(typeof data.cardInfo != 'object') {
		data.cardInfo = JSON.parse(data.cardInfo);
	}
	if(typeof data.departureFlights != 'object') {
		data.departureFlights = JSON.parse(data.departureFlights);

	}
	if(Array.isArray(data.departureFlights)) {
		let flights = [];
		for(let i in data.departureFlights) {
			flights.push(data.departureFlights[i].flight);
		}
		data.departureFlights = undefined;
		data.listFlights = flights;
	}
	if(typeof data.loginData != 'object') {
		data.loginData = JSON.parse(data.loginData);
	}
	if(typeof data.pagSeguro != 'object') {
		data.pagSeguro = JSON.parse(data.pagSeguro);
	}
	if(typeof data.pax != 'object') {
		data.pax = JSON.parse(data.pax);
	}
	if(typeof data.pricing != 'object') {
		data.pricing = JSON.parse(data.pricing);
	}
	if(data.returnFlights) {
		if(typeof data.returnFlights != 'object') {
			data.returnFlights = JSON.parse(data.returnFlights);
		}
	}
	if(typeof data.selectedInstallment != 'object') {
		data.selectedInstallment = JSON.parse(data.selectedInstallment);
	}

	if(checkTime()) {
		try {
			if (validatePax(data.pax)) {
				res.status(500).send({ message: { type: 'E', text: 'Favor preencher os dados dos passageiros corretamente.' }});
			} else {

				var hashid = '';
				var loginData = '';
				var agreement = data.loginData.agreement;
				if(req.headers.hashid) {
					hashid = req.headers.hashid;
					try {
						agreement = jwt.decode(hashid).agreement;
					} catch(err) {
						// err
					}
				}

				var postData = { hashId: '79fbe9b577f0a4e31bae4753449dfd4c'};
				postData.cardInfo = data.cardInfo;
				postData.departureFlights = data.departureFlights;
				postData.loginData = data.loginData;
				postData.pagSeguro = data.pagSeguro;
				postData.pax = data.pax;
				postData.pricing = data.pricing;
				postData.returnFlights = data.returnFlights;
				postData.selectedInstallment = data.selectedInstallment;

				if(data.listFlights) {
					postData.listFlights = data.listFlights;
				}

				if(data.credits) {
					if(typeof data.credits != 'object') {
						data.credits = JSON.parse(data.credits);
					}
					postData.credits = data.credits;
				}
				postData = qs.stringify(postData);

				request.post({
					url: url.payment + 'pagamento-idealMilhas/backend/application/index.php?rota=/App/onlineDebitOrder',
					form: postData
					}, function(error, response, body) {
						res.send(JSON.parse(response.body));
				});
			}
		} catch(e) {
			res.status(500).send({ message: { type: 'E', text: 'Erro interno, favor entrar em contato.' }});
		}
	} else {
		res.status(500).send({ message: { type: 'E', text: 'Os bilhetes podem ser comprados nos seguintes horários: \r\n\r\n Dias de semana: 09:00 ás 02:00, \r\n Aos Sábados: 09:00 ás 20:00, \r\n Aos domingos: 10:00 ás 18:00.' }});
	}
});

router.post('/generateTransfer', function(req, res) {
	var data = req.body;

	if(checkTime()) {
		try {
			if (validatePax(data.pax)) {
				res.status(500).send({ message: { type: 'E', text: 'Favor preencher os dados dos passageiros corretamente.' }});
			} else {

				var hashid = '';
				var loginData = '';
				if(req.headers.hashid) {
					var hashid = req.headers.hashid;
					loginData = jwt.decode(hashid);
				}

				var postData = { hashId: '79fbe9b577f0a4e31bae4753449dfd4c'};
				postData.departureFlights = data.departureFlights;
				postData.loginData = loginData;
				postData.pax = data.pax;
				postData.pricing = data.pricing;
				postData.returnFlights = data.returnFlights;

				if(data.listFlights) {
					postData.listFlights = data.listFlights;
				}

				if(data.credits) {
					postData.credits = data.credits;
				}
				postData = qs.stringify(postData);

				request.post({
					url: url.payment + 'pagamento-idealMilhas/backend/application/index.php?rota=/App/generateTransfer',
					form: postData
					}, function(error, response, body) {
						res.send(JSON.parse(response.body));
				});

			}
		} catch(e) {
			console.log(e);
			res.status(500).send({ message: { type: 'E', text: 'Erro interno, favor entrar em contato.' }});
		}
	} else {
		res.status(500).send({ message: { type: 'E', text: 'Os bilhetes podem ser comprados nos seguintes horários: \r\n\r\n Dias de semana: 09:00 ás 02:00, \r\n Aos Sábados: 09:00 ás 20:00, \r\n Aos domingos: 10:00 ás 18:00.' }});
	}
});

router.post('/loadInstallments', function(req, res) {
	var data = req.body;

	data.hashId = '79fbe9b577f0a4e31bae4753449dfd4c';
	data = qs.stringify(data);

	request.post({
		url: url.payment + 'pagamento-idealMilhas/backend/application/index.php?rota=/App/loadInstallments',
		form: data
		}, function(error, response, body) {
			res.send(response.body);
	});
});

router.post('/status/change', function(req, res) {
	var data = req.body;

	var body = querystring.stringify({
		'email': 'ti@idealmilhas.com.br',
		'token': '911BD8325B3F479281FAA1632679848B'
	});

	request({
		url: 'https://ws.pagseguro.uol.com.br/v3/transactions/notifications/' + req.body.notificationCode + '?' + body,
		method: 'GET'
		}, function(error, response, body) {
			if(response.body.indexOf('<status>3</status>') >= 0) {
				var updateFile = {
					'hashId': '79fbe9b577f0a4e31bae4753449dfd4c',
					'orderId': response.body.slice(response.body.indexOf('<item><id>') + 10, response.body.indexOf('<item><id>') + 11)
				};
				request.post({
					url: 'https://159.203.84.12/idealMilhas/backend/application/index.php?rota=/App/updateBilling',
					form: querystring.stringify(updateFile)
					}, function(error, response, body) {
				});
			}
			res.send({message: {type: "SUCECSS", description: 'OK'}});
	});
});

router.post('/checkFlights', function(req, res) {
	var data = req.body;

	// brasilia time validation
	if(checkTime()) {
		if(typeof data.departureFlights != 'object') {
			data.departureFlights = JSON.parse(data.departureFlights);
		}

		if(data.returnFlights) {
			if(typeof data.returnFlights != 'object') {
				data.returnFlights = JSON.parse(data.returnFlights);
			}
		}

		// flights departure time validation
		if(validateFlights(data.departureFlights) && validateFlights(data.returnFlights)) {

			if(typeof data.loginData != 'object') {
				data.loginData = JSON.parse(data.loginData);
			}

			var agreement = data.loginData.agreement;
			if(req.headers.hashid) {
				hashid = req.headers.hashid;
				try {
					agreement = jwt.decode(hashid).agreement;
				} catch(err) {
					// err
				}
			}

			if(agreement == 'oabmg' || agreement == 'oabpa' || agreement == 'oabes' || agreement == 'oabmt' || agreement == 'oabrs' || agreement == 'caace' || agreement == 'caaro') {
				OABValidation.check(data.loginData, function(response) {
					if(response.type == 'S') {
						res.send({message: {type: "SUCECSS", description: '' }, dataset: ''});
					} else {
						res.status(500).send({ message: { type: 'E' }, text: 'Encontramos um problema no seu cadastro, favor entrar em contato com a OAB.' });
					}
				});
			} else if(agreement == 'portoSeguroCartoes') {
				PortoSeguro.check(data.loginData, function(response) {
					if(response.type == 'S') {
						res.send({message: {type: "SUCECSS", description: '' }, dataset: ''});
					} else {
						res.status(500).send({ message: { type: 'E' }, text: response.response });
					}
				});
			} else if(agreement == 'giganteDeVantagens') {
				SoccerSociety.check(data.loginData, function(response) {
					if(response.type == 'S') {
						res.send({message: {type: "SUCECSS", description: '' }, dataset: ''});
					} else {
						res.status(500).send({ message: { type: 'E' }, text: 'Encontramos um problema no seu cadastro, favor entrar em contato com a Gigante De Vantangens.' });
					}
				});
			}  else {
				res.send({message: {type: "SUCECSS", description: '' }, dataset: ''});
			}
		} else {
			res.status(500).send({ message: { type: 'E' }, text: 'Os Vôos devem ter a data de embarque superior ao dia atual.' });
		}

	} else {
		res.status(500).send({ message: { type: 'E' }, text: 'Os bilhetes podem ser comprados nos seguintes horários: \r\n\r\n Dias de semana: 09:00 ás 02:00, \r\n Aos Sábados: 09:00 ás 20:00, \r\n Aos domingos: 10:00 ás 18:00.' });
	}
});

function validatePax(paxArray) {
	for(var i in paxArray) {
		if(PassengerValidation.checkPassenger(paxArray[i])) {
			return true;
		}
	}
}

function checkTime() {
	var date = new Date();
	date.setUTCHours(date.getUTCHours() - 3);

	if( ((date.getDay() == 0 && (date.getUTCHours() < 10 || date.getUTCHours() >= 18)) || // sunday
		(date.getDay() == 6 && (date.getUTCHours() < 9 || date.getUTCHours() >= 22)) || // saturday
		((date.getDay() > 0 && date.getDay() < 6) && (date.getUTCHours() >= 2 && date.getUTCHours() < 9)) )  ) { // week
		return false;
	}
	return true;
}

function validateFlights(flight) {
	try {

		if(flight != undefined) {
			let flightDate = flight.Embarque;
			let days = flightDate.split(' ')[0];
			days = days.split('/');

			// building date
			let data = new Date(days[2], parseInt(days[1]) - 1, days[0], flightDate.split(' ')[1].split(':')[0], flightDate.split(' ')[1].split(':')[1], 0, 0);

			let currentDate = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), 0, 0, 0, 0);
			currentDate.setDate(currentDate.getDate() + 1);

			if(data < currentDate) {
				return false;
			}
		}

	} catch(e) {
		console.log(e);
	}
	return true;
}

module.exports = router;