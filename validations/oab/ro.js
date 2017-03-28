var request = require("request");
var qs = require("qs");
var sql = require("mssql");

const dbconfig = {
	user: 'cobra',
	password: 'cobra1234',
	server: '201.2.56.202',
	database: 'implanta_OABRO'
};

class RO {

	static check(partner, callback) {

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
		var self = this;

		sql.connect(dbconfig, function (err) {
			if (err) {
				return callback({ type: 'E', response: 'Erro de conexão com a base OAB.', found: 'N'});
			}

			// create Request object
			var request = new sql.Request();

			var query = "select * from profissionais where cpf = '" + self.cpf + "' and RegistroConselhoAtual = '" + self.inscription + "'";
			// query to the database and get the records
			request.query(query, function (err, recordset) {

				if (err) {
					return callback({ type: 'E', response: 'Erro de conexão com a base OAB.', found: 'N'});
				}

				// send records as a response
				// console.log(recordset);
				if(recordset.length > 0) {
					return callback({ type: 'S', found: 'S'});
				} else {
					return callback({ type: 'E', response: 'Não encontrado.', found: 'N'});
				}

			});
		});

	}
}

// RO.check({ partnerNumber: '4277', cpf: '6509802120'}, function(data) {
// 	console.log(data);
// });

module.exports = RO;