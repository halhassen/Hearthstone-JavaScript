var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Spell = mongoose.model('Spell');
var Hand = mongoose.model("Hand");
var Deck = mongoose.model("Deck");
var jwt = require('express-jwt');

// var auth = jwt({
// 	userProperty: 'payload',
// 	secret: '_secret_sauce'
// });

//------------Creating a Deck------------
router.post('/', function(req, res) {
	var deck = new Deck(req.body);
	console.log(deck);
	deck.cards = req.body;
	deck.id = deck._id;
	console.log(deck.cards);
	deck.save(function(err, result) {
		if(err) return res.status(500).send({err: "Issues with server"});
		if(!result) return res.status(400).send({err: "Could not create deck"});
		res.send(deck);
	});
});

//------------Getting a Deck------------
router.get('/', function(req, res) {
	Deck.find({})
	.exec(function(err, decks) {
		if(err) return res.status(500).send({err: "error getting all minions"});
		if(!decks) return res.status(400).send({err: "decks do not exist"});
		res.send(decks);
	})
})

// add auth later
//------------Editing a Deck------------
router.put('/:id', function(req, res) {
	console.log(req.body);
	Deck.update({_id: req.body._id}, req.body)
	.exec(function(err, deck) {
		if(err) return res.status(500).send({err: "Error getting deck to edit"});
		if(!deck) return res.status(400).send({err: "Deck to edit does not exist"});
		res.send(req.body);
	});
});

// add auth later
//------------Deleting a Deck------------
router.delete('/:id', function(req, res) {
	Deck.remove({_id: req._id})
	.exec(function(err, deck) {
		if(err) return res.status(500).send({err: "Error with deleting the deck"});
		if(!deck) return res.status(400).send({err: "Deck does not exist"});
		res.send();
	});
});



// router.get('/league', function(req, res) {
// 	League.find({})
// 	.populate({
// 		path: 'admin',
// 		model: 'User',
// 		select: 'name username'
// 	})
// 	.exec(function(err, league) {
// 		if(err) return res.status(500).send({err: "Error getting all leagues"});
// 		if(!league) return res.status(400).send({err: "Leagues do not exist"});
// 		res.send(league);
// 	});
// });

// router.get('/league/:id', function(req, res) {
// 	var leagueId = req.params.id;
// 	League.findOne({_id: leagueId})
// 	.populate({
// 		path: 'teams',
// 		model: 'Team',
// 		select: 'name logo'
// 	})
// 	.exec(function(err, league){
// 		if(err) return res.status(500).send({err: "Error inside the server"});
// 		if(!league) return res.status(400).send({err: "That league does not exist"});
// 		res.send(league);
// 	});
// });

module.exports = router;