var request = require("request");
var qs = require("qs");

class ES {

	static checkStatusES(partner, callback) {

		this.inscription = '';
		this.cpf = '';
		if(partner.partnerNumber) {
			this.inscription = partner.partnerNumber;
		} else if(partner.oabnumber) {
			this.inscription = partner.oabnumber;
		}
		if(partner.cpf) {
			this.cpf = partner.cpf;
		}

		this.inscription = this.inscription.replace('-', '');

		request.post({
			url: 'http://138.197.79.64/oab-es-webservice/application/index.php?rota=/validate',
			form: qs.stringify({ partnerNumber: this.inscription, cpf: this.cpf })
			}, function(error, response, body) {

				var returnDate = JSON.parse(response.body);

				if(returnDate.message.type == 'S') {
					callback({ type: 'S', found: 'S'});
				} else if(returnDate.message.type == 'I') {
					callback({ type: 'E', response: 'Existe na base de dados, porém está em débito.', found: 'S'});
				} else if(returnDate.message.type == 'E') {
					callback({ type: 'E', response: returnDate.message.text, found: 'N'});
				} else {
					callback({ type: 'E', response: 'Erro não identificado.', found: 'N'});
				}
		});
	}
}

// ES.checkStatusES({ partnerNumber: '22086', cpf: '13128524700'}, function(data) {
// 	console.log(data);
// });

module.exports = ES;
