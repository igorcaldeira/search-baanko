var MG = require("./oab/mg");
var PA = require("./oab/pa");
var ES = require("./oab/es");
var MT = require("./oab/mt");
var RS = require("./oab/rs");
var CE = require("./oab/ce");
var RO = require("./oab/ro");

class OABValidation {

	static check(partner, callback) {
		if(partner.agreement == 'oabmg' || !partner.agreement) {
			OABValidation.checkMG(partner, function(data) {
				callback(data);
			});
		} else if(partner.agreement == 'oabpa') {
			OABValidation.checkPA(partner, function(data) {
				callback(data);
			});
		} else if(partner.agreement == 'oabes') {
			OABValidation.checkES(partner, function(data) {
				callback(data);
			});
		} else if(partner.agreement == 'oabmt') {
			OABValidation.checkMT(partner, function(data) {
				callback(data);
			});
		} else if(partner.agreement == 'oabrs') {
			OABValidation.checkRS(partner, function(data) {
				callback(data);
			});
		} else if(partner.agreement == 'caace') {
			OABValidation.checkCE(partner, function(data) {
				callback(data);
			});
		} else if(partner.agreement == 'caaro') {
			OABValidation.checkRO(partner, function(data) {
				callback(data);
			});
		}
	}

	static checkMG(partner, callback) {
		MG.checkStatusMG(partner, function(data) {
			callback(data);
		});
	}

	static checkPA(partner, callback) {
		PA.checkStatusPA(partner, function(data) {
			callback(data);
		});
	}

	static checkES(partner, callback) {
		ES.checkStatusES(partner, function(data) {
			callback(data);
		});
	}

	static checkMT(partner, callback) {
		MT.checkStatusMT(partner, function(data) {
			callback(data);
		});
	}

	static checkRS(partner, callback) {
		RS.check(partner, function(data) {
			callback(data);
		});
	}

	static checkCE(partner, callback) {
		CE.check(partner, function(data) {
			callback(data);
		});
	}

	static checkRO(partner, callback) {
		RO.check(partner, function(data) {
			callback(data);
		});
	}
}

// OABValidation.check({ partnerNumber: '416', cpf: '13358391', agreement: 'caace'}, function(data) {
// 	console.log(data);
// });

// RS.check({ partnerNumber: '2256'}, function(data) {
// 	console.log(data);
// });

module.exports = OABValidation;