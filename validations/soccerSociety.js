var GiganteDeVantagens = require("./soccer/giganteVantagens");

class SoccerSociety {

	static check(partner, callback) {
		if(partner.agreement == 'giganteDeVantagens') {
			SoccerSociety.checkGiganteDeVantagens(partner, function(data) {
				callback(data);
			});
		}
	}

	static checkGiganteDeVantagens(partner, callback) {
		GiganteDeVantagens.checkStatus(partner, function(data) {
			callback(data);
		});
	}
}

// SoccerSociety.check({ matricula: '99037268', senha: '161205', agreement: 'giganteDeVantagens'}, function(data) {
// 	console.log(data);
// });

module.exports = SoccerSociety;