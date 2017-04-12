var mongoose = require('mongoose');

var DeckSchema = new mongoose.Schema({
	hero: {type: mongoose.Schema.Types.ObjectId, ref: 'Hero'},
	cards: Array,
	name: String
});

mongoose.model("Deck", DeckSchema);