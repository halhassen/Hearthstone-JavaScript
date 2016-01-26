"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

require('./models/minion');

//mongoose.connect('mongodb://localhost/hs');

app.set('views', './views');
app.engine('.html', require('ejs').renderFile);
app.use(express.static('./public'));
app.use(express.static('./bower_components'));
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var minionRoutes = require('./routes/minionRoutes.js');

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/api/minion/', minionRoutes);

module.exports = app.listen(port, function() {
	console.log('Example app listening at http://localhost:' + port);
});
