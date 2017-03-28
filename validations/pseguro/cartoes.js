var request = require("request");
var qs = require("qs");

class CARTOES {

	static check(partner, callback) {
		this.validBims = ['484635', '412177', '415274', '415275', '446690', '536380', '536537', '532930'];

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

		if(this.validBims.indexOf(this.inscription) < 0) {
			return callback({ type: 'E', found: 'N', response: 'Cartão Porto Seguro deve ser usado para validação'});
		}

		request.get({
			url: 'https://core-sa.smark.io/clients/portofalecom/is_valid_customer?identification_number1=' + this.cpf
			}, function(error, response, body) {

				// error in the request shold validate only bin
				// this is to avoid generalized locks if the link changes or ends
				if(error) {
					return callback({ type: 'S', found: 'S'});
				}

				var returnDate = JSON.parse(response.body);
				if(returnDate.message == 'OK') {
					callback({ type: 'S', found: 'S'});
				} else if(returnDate.message == 'Customer not found.') {
					callback({ type: 'E', response: 'Não encontrado.', found: 'N'});
				} else {
					callback({ type: 'E', response: 'Erro não identificado.', found: 'N'});
				}
		});
	}
}

// CARTOES.check({ partnerNumber: '412177', cpf: '13128524700'}, function(data) {
// 	console.log(data);
// });

module.exports = CARTOES;
