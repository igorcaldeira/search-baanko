var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require("request");
const querystring = require('querystring');
const url = require('../routes/url');

//https server certificate

// if(url.port == 443) {
// 	var https = require('https');
// 	var fs = require("fs");
// 	var privateKey = fs.readFileSync( '/etc/letsencrypt/live/voelegal.com.br-0001/privkey.pem' );
// 	var certificate = fs.readFileSync( '/etc/letsencrypt/live/voelegal.com.br-0001/fullchain.pem' );
// }


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// var login = require('../routes/api/login/login.js');
// var pagSeguro = require('../routes/api/pag_seguro/pag_seguro.js');
// var crawler = require('../routes/api/crawler/crawler.js');
// var sales = require('../routes/api/sales/sales.js');
// var invite = require('../routes/api/invite/invite.js');
// var pax = require('../routes/api/pax/pax.js');
// var addressValidation = require('../validations/address.js');

var app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );

// app.use('/api/login', login);
// app.use('/api/pag_seguro', pagSeguro);
// app.use('/api/crawler', crawler);
// app.use('/api/sales', sales);
// app.use('/api/invite', invite);
// app.use('/api/pax', pax);
// app.use('/api/addressValidation', addressValidation);

app.use(express.static(__dirname + './../front/'));
app.use(express.static(__dirname + './../front/src'));
app.use(express.static(__dirname + './../front/src/app'));
app.use(express.static(__dirname + './../front/dist'));

app.route('/').get(function(req, res){
	res.sendFile(__dirname + './../front/src/index.html');
});

app.listen(process.env.PORT || 5000, function(){
	console.log('listening on *:'+url.port);
});