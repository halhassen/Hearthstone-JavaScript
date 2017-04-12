var mongoose = require('mongoose');

var HeroSchema = new mongoose.Schema({
	health: Number,
	classMinions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Minion'}],
	classSpells: [{type: mongoose.Schema.Types.ObjectId, ref: 'Spell'}],
	classWeapons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'}],
	name: String,
	isMinion: String,
	class: String
});

mongoose.model("Hero", HeroSchema);