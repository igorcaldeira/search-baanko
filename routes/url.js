const management = process.env.URL_SRM || 'https://gestao.srm.systems/';

const payment = process.env.URL_PAG || 'http://payment.srm.systems/';

const port = process.env.URL_PORT || 4000;

const jwtKey = process.env.JWT_KEY || '2017';

module.exports = {
	management: management,
	payment: payment,
	port: port,
	jwtKey: jwtKey
};
