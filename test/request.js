const chai = require('chai');
var request = require("request");
var qs = require("qs");
const expect = chai.expect;

var server = require("../servers/server.js");

var OABValidation = require('../validations/OABValidation');
var SoccerSociety = require('../validations/soccerSociety');

const hashId = '79fbe9b577f0a4e31bae4753449dfd4c';

describe('request api', function() {
	this.timeout(15000);
	
	// voe legal login
	it('Should return success when attempting to sign in', (done) => {
		request.post({
			url: 'http://localhost:3000/api/login/login',
			form: { email: 'ti@idealmilhas.com.br', password: '123' }
			}, function(error, response, body) {
				var dataResponse = JSON.parse(response.body);

				expect(response.statusCode).to.equal(200);
				expect(dataResponse.message.type).equals('S');
				done();
		});
	});

	// OAB MG validation
	it('Should return success when attempting validate oab mg', (done) => {
		OABValidation.check({ agreement: 'oabmg', cpf: '05004472688', partnerNumber: '158444' }, function(response) {
			expect(response.found).equals('S');
			done();
		});
	});

	// Gigante de Vantagens validation
	it('Should return success when attempting validate gigante de vantagens', (done) => {
		SoccerSociety.check({ agreement: 'giganteDeVantagens', matricula: '25320100' }, function(response) {
			expect(response.found).equals('S');
			done();
		});
	});

	// Gigante de Vantagens validation
	it('Should return success when attempting validate oab es', (done) => {
		OABValidation.check({ agreement: 'oabes', partnerNumber: '22086', cpf: '13128524700' }, function(response) {
			expect(response.found).equals('S');
			done();
		});
	});

	// voe legal flights search
	it('Should return success when attempting search flights', (done) => {
		var data = {
			"companhias_aereas": ["azul"],
			"data": {
				"trip":0,
				"from": {
					"iataCode":"BHZ",
					"name":"Belo Horizonte",
					"international":"0"
				},
				"to": {
					"iataCode":"GRU",
					"international":"0"
				},
				"departureDate":"23/02/2017",
				"returnDate":"23/02/2017",
				"adults":1,
				"children":0,
				"babies":0
			}
		};

		request.post({
			url: 'http://localhost:3000/api/crawler/find',
			form: data
			}, function(error, response, body) {
				var dataResponse = JSON.parse(response.body);

				expect(response.statusCode).to.equal(200);
				expect(dataResponse.results.Status.Sucesso).equals(true);
				done();
		});
	});

	// voe legal pagseguro session
	it('Should return success when attempting open a PagSeguro session', (done) => {
		request.post({
			url: 'http://localhost:3000/api/pag_seguro/getLastId',
			form: { loginData: { agreement: 'voelegal'} }
			}, function(error, response, body) {
				var dataResponse = JSON.parse(response.body);

				expect(response.statusCode).to.equal(200);
				expect(dataResponse.message.type).equals('SUCECSS');
				done();
		});
	});

});