var CARTOES = require("./pseguro/cartoes");

class PortoSeguro {

	static check(partner, callback) {
		if(partner.agreement == 'portoSeguroCartoes' || !partner.agreement) {
			PortoSeguro.checkCartoes(partner, function(data) {
				callback(data);
			});
		}
	}

	static checkCartoes(partner, callback) {
		CARTOES.check(partner, function(data) {
			callback(data);
		});
	}
}

// PortoSeguro.checkCartoes({ cpf: '13128524700', partnerNumber: '158444'}, function(data) {
// 	console.log(data);
// });

module.exports = PortoSeguro;