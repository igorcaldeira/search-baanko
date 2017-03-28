var request = require("request");
var md5 = require('md5');

class GiganteDeVantagens {

	static checkStatus(partner, callback) {

		this.inscription = '';
		if(partner.matricula) {
			this.inscription = partner.matricula;
		}

		var postData = "<?xml version='1.0' encoding='utf-8'?>"+
		"<soapenv:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:mes='http://tempuri.org/society-ws-parceiros/message/'>"+
			"<soapenv:Header/>"+
			"<soapenv:Body>"+
				"<mes:ConsultarDadosDoSocio soapenv:encodingStyle='http://schemas.xmlsoap.org/soap/encoding/'>"+
					"<tcMatricula xsi:type='xsd:string'>" + this.inscription + "</tcMatricula>"+
					"<tcMatriculaParceiro xsi:type='xsd:string'>99037268</tcMatriculaParceiro>"+
				"</mes:ConsultarDadosDoSocio>"+
			"</soapenv:Body>"+
		"</soapenv:Envelope>";

		request.post({
			url: 'http://200.215.222.79/society-ws-parceiros/society-ws-parceiros.WSDL',
			headers: {
				'Content-Type': 'text/xml',
				'SOAPAction': 'http://tempuri.org/society-ws-parceiros/action/SocietyParceirosWS.ConsultarDadosDoSocio'
			},
			body: postData
			}, function(error, response, body) {
				var returnDate = response.body;

				if(returnDate.indexOf('&lt;situacao&gt;Em dia&lt;/situacao&gt;') > 0) {
					callback({ type: 'S', response: 'Existe na base de dados da GIGANTE e status Ativo.', found: 'S'});
				} else if(returnDate.indexOf('&lt;situacao&gt;') > 0) {
					callback({ type: 'E', response: 'Existe na base de dados da GIGANTE e status Em Debito.', found: 'S'});
				} else {
					callback({ type: 'E', response: 'Erro não identificado.', found: 'N'});
				}
		});
	}
}

// GiganteDeVantagens.checkStatus({ matricula: '25320100'}, function(data) {
// 	console.log(data);
// });

module.exports = GiganteDeVantagens;
