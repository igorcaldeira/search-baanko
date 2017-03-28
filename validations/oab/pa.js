var request = require("request");
var qs = require("qs");

class PA {

	static checkStatusPA(partner, callback) {

		this.inscription = '';
		this.email = '';
		if(partner.partnerNumber) {
			this.inscription = partner.partnerNumber;
		} else if(partner.oabnumber) {
			this.inscription = partner.oabnumber;
		}
		if(partner.email) {
			this.email = partner.email;
		}

		this.inscription = this.inscription.replace('-', '');

		request.post({
			url: 'http://138.197.79.64/oab-pa-webservice/application/index.php?rota=/validate',
			form: qs.stringify({ matricula: this.inscription, email: this.email })
			}, function(error, response, body) {

				var returnDate = JSON.parse(response.body);

				if(returnDate.message.type == 'S') {
					callback({ type: 'S', found: 'S'});
				} else if(returnDate.message.type == 'E') {
					callback({ type: 'E', response: returnDate.message.text, found: 'N'});
				} else {
					callback({ type: 'E', response: 'Erro não identificado.', found: 'N'});
				}
		});
	}
}

// PA.checkStatusPA({ partnerNumber: '19905', email: 'tiagoobegomes@yahoo.com.br'}, function(data) {
// 	console.log(data);
// });

module.exports = PA;
