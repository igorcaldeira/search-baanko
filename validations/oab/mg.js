var request = require("request");

class MG {

	static checkStatusMG(partner, callback) {

		this.registrationCode = '';
		this.inscription = '';
		this.registrationNumber = '';
		if(partner.cpf) {
			this.registrationCode = partner.cpf;
		}
		if(partner.partnerNumber) {
			this.inscription = partner.partnerNumber;
		} else if(partner.oabnumber) {
			this.inscription = partner.oabnumber;
		}
		if(isNaN(this.inscription[this.inscription.length - 1])) {
			this.registrationNumber = this.inscription[this.inscription.length - 1];
			this.inscription = this.inscription.slice(0, this.inscription.length - 1);
		}

		var postData = "<?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'>"+
			"<soapenv:Header/>"+
				"<soapenv:Body>"+
					"<soapenv:AulacpcWebServiceConsultaInscritosEmdia>"+
						"<Cpf xsi:type='xsd:string'>" + this.registrationCode + "</Cpf>"+
						"<NrinscrAdv xsi:type='xsd:string'>" + this.inscription + "</NrinscrAdv>"+
						"<DccPlNrInscr xsi:type='xsd:string'>" + this.registrationNumber + "</DccPlNrInscr>"+
					"</soapenv:AulacpcWebServiceConsultaInscritosEmdia>"+
				"</soapenv:Body>"+
			"</soapenv:Envelope>";

		request.post({
			url: 'http://www.esamg.org.br:8014/webrun/webservices/WSAServices.jws',
			headers: {
				'SOAPAction': ' ',
				'Content-Type': 'text/xml'
			},
			body: postData
			}, function(error, response, body) {
				var returnDate = response.body;

				if(returnDate.indexOf('<AulacpcWebServiceConsultaInscritosEmdiaReturn xsi:type="xsd:long">0</AulacpcWebServiceConsultaInscritosEmdiaReturn>') > 0) {
					callback({ type: 'S', response: 'Existe na base de dados da OAB/MG e não possui débito.', found: 'S'});
				} else if(returnDate.indexOf('<AulacpcWebServiceConsultaInscritosEmdiaReturn xsi:type="xsd:long">1</AulacpcWebServiceConsultaInscritosEmdiaReturn>') > 0) {
					callback({ type: 'E', response: 'Existe na base de dados da OAB/MG, porém está em débito.', found: 'S'});
				} else if(returnDate.indexOf('<AulacpcWebServiceConsultaInscritosEmdiaReturn xsi:type="xsd:long">2</AulacpcWebServiceConsultaInscritosEmdiaReturn>') > 0) {
					callback({ type: 'E', response: 'Não encontrados na base de dados da OAB/MG.', found: 'N'});
				} else {
					callback({ type: 'E', response: 'Erro não identificado.', found: 'N'});
				}
		});
	}
}


// MG.checkStatusMG({ cpf: '01511030623', partnerNumber: '165613'}, function(data) {
// 	console.log(data);
// });

module.exports = MG;