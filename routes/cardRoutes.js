var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Minion = mongoose.model('Minion');
var Hand = mongoose.model("Hand");
var Spell = mongoose.model("Spell");
var jwt = require('express-jwt');

// var auth = jwt({
// 	userProperty: 'payload',
// 	secret: '_secret_sauce'
// });

// Minions
router.post('/minion', function(req, res) {
	var minion = new Minion(req.body);
	minion.id = minion._id;
	// console.log(minion);
	minion.save(function(err, result) {
		console.log(minion);
		if(err) return res.status(500).send({err: "Issues with server"});
		if(!result) return res.status(400).send({err: "Could not create minion"});
		res.send();
	})
});

router.get('/minion/:id', function(req, res) {
	var minionId = req.params.id;
	console.log(minionId);
	Minion.findOne({_id: minionId})
	.exec(function(err, minions) {
		if(err) return res.status(500).send({err: "error getting all minions"});
		if(!minions) return res.status(400).send({err: "minions do not exist"});
		res.send(minions);
	});
});

// Spells
router.post('/spell', function(req, res) {
	var spell = new Spell(req.body);
	spell.id = spell._id
	// console.log(spell);
	spell.save(function(err, result) {
		if(err) return res.status(500).send({err: "Issues with server"});
		if(!result) return res.status(400).send({err: "Could not create spell"});
		res.send();
	})
});

router.get('/spell', function(req, res) {
	Spell.find({})
	.exec(function(err, spells) {
		if(err) return res.status(500).send({err: "error getting all minions"});
		if(!spells) return res.status(400).send({err: "spells do not exist"});
		res.send(spells);
	});
});

// Weapons
router.post('/weapon', function(req, res) {
	var weapon = new Weapon(req.body);
	weapon.id = minion._id
	console.log(minion);
	weapon.save(function(err, result) {
		if(err) return res.status(500).send({err: "Issues with server"});
		if(!result) return res.status(400).send({err: "Could not create weapon"});
		res.send();
	})
});

router.get('/weapon', function(req, res) {
	Weapon.find({})
	.exec(function(err, weapons) {
		if(err) return res.status(500).send({err: "error getting all minions"});
		if(!weapons) return res.status(400).send({err: "weapons do not exist"});
		res.send(weapons);
	});
});

module.exports = router;