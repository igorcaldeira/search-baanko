var mongoose = require('mongoose');

var AppBusinesspartner = mongoose.model('AppBusinesspartner', {
	autoIndexId: true,
	name: String,
	email: String,
	password: String,
	register_date: Date
});

module.exports = AppBusinesspartner;