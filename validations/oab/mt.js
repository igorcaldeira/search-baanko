var request = require("request");
var qs = require("qs");

class MT {

	static checkStatusMT(partner, callback) {

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
			url: 'http://servicos.oabmt.org.br:8080/servicosonline/api/v2/verifica-advogado',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Token': 'fbf6e0b90f374eed8bec7f6fce62dc65'
			},
			form: JSON.stringify({ inscricao: this.inscription, cpf: this.cpf })
			}, function(error, response, body) {
				var returnDate = JSON.parse(response.body);

				if(response.statusCode == 200) {
					if(returnDate.retorno == 'adimplente') {
						callback({ type: 'S', found: 'S'});
					} else if(returnDate.retorno == 'inadimplente') {
						callback({ type: 'S', response: 'Existe na base de dados, porém está em débito.', found: 'S'});
					} else {
						callback({ type: 'E', response: returnDate.retorno, found: 'N'});
					}
				} else if(response.statusCode == 400) {
					if(returnDate.erro == 'Inscrição invalida' || returnDate.erro == 'CPF invalido') {
						callback({ type: 'E', response: returnDate.erro, found: 'N'});
					} else {
						callback({ type: 'E', response: 'Erro não identificado.', found: 'N'});
					}
				} else {
					callback({ type: 'E', response: 'Erro não identificado.', found: 'N'});
				}
		});
	}
}

// MT.checkStatusMT({ partnerNumber: '4669', cpf: '26912961720'}, function(data) {
// 	console.log(data);
// });

module.exports = MT;
