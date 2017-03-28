var mongoose = require('mongoose');
var businessPartner = require('app_businesspartner');

var AppBusinesspartnerOAB = mongoose.model('AppBusinesspartnerOAB', {
	autoIndexId: true,
	businessPartner_id: businessPartner,
	oabNumber: String
});

module.exports = AppBusinesspartner;