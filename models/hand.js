var mongoose = require('mongoose');

var HandSchema = new mongoose.Schema({
	cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cards'}],
	maxHand: Number
});

mongoose.model('Hand', HandSchema);