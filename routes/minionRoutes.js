var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Minion = mongoose.model('Minion');
var jwt = require('express-jwt');

// var auth = jwt({
// 	userProperty: 'payload',
// 	secret: '_secret_sauce'
// });

router.post('/', function(req, res) {
	var minion = new Minion(req.body);
	//console.log(minion);
	minion.save(function(err, result) {
		console.log(minion)
		if(err) return res.status(500).send({err: "Issues with server"});
		if(!result) return res.status(400).send({err: "Could not create"});
		res.send();
	})
});

module.exports = router;