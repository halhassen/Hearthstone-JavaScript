var mongoose = require('mongoose');

var MinionSchema = new mongoose.Schema({
	health: Number,
	damage: Number,
	cost: Number,
	rarity: String,
	name: String,
	type: String,
	classH: {type: mongoose.Schema.Types.ObjectId, ref: 'Hero'},
	art: String,
	sound: String,
	effect: String,
	count: Number,
	isMinion: String
 // {
 // 	battlecry: Boolean,
 // 	deathrattle: Boolean,
 // 	windfury: Boolean,
 // 	divineshield: Boolean,
 // 	taunt: Boolean,
 // 	combo: Boolean,
 // 	overload: Boolean,
 // 	charge: Boolean,
 // 	discover: Boolean,
 // 	chooseOne: Boolean,
 // 	stealth: Boolean,
 // 	inspire: Boolean,
 // 	joust: Boolean,
 // 	targettable: Boolean
 // }
});

mongoose.model('Minion', MinionSchema);

