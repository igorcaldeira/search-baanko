var request = require("request");
var qs = require("qs");

class RS {

	static check(partner, callback) {

		this.inscription = '';
		if(partner.partnerNumber) {
			this.inscription = partner.partnerNumber;
		} else if(partner.oabnumber) {
			this.inscription = partner.oabnumber;
		}
		this.inscription = this.inscription.replace('-', '');

		this.login = 'VOELEGAL';
		this.password = 'DOM1N2101B0FF1C7';

		let data = qs.stringify({Login: this.login, Senha: this.password, NumeroOAB: this.inscription});

		request.get({
			url: 'http://caars.dnsalias.com:82/Service.asmx/wsSituacaoAdvogado?' + data
			}, function(error, response, body) {
				var returnDate = response.body;


				if(returnDate.indexOf('"SituacaoAtual": "Adimplente"') > 0) {
					callback({ type: 'S', response: 'Existe na base de dados da OAB e não possui débito.', found: 'S'});

				} else if(returnDate.indexOf('"SituacaoAtual": "Inadimplente"') > 0) {
					callback({ type: 'E', response: 'Existe na base de dados da OAB, porém está em débito.', found: 'S'});

				} else if(returnDate.indexOf('[]') > 0) {
					callback({ type: 'E', response: 'Não encontrados na base de dados da OAB.', found: 'N'});

				} else {
					callback({ type: 'E', response: 'Erro não identificado.', found: 'N'});
				}
		});
	}
}

// RS.check({ partnerNumber: '2214'}, function(data) {
// 	console.log(data);
// });

// RS.check({ partnerNumber: '2212'}, function(data) {
// 	console.log(data);
// });

// RS.check({ partnerNumber: '2256'}, function(data) {
// 	console.log(data);
// });

module.exports = RS;
