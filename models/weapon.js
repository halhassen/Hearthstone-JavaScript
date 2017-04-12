var mongoose = require('mongoose');

var WeaponSchema = new mongoose.Schema({
	durability: Number,
	damage: Number,
	cost: Number,
	name: String,
	classH: {type: mongoose.Schema.Types.ObjectId, ref: 'Hero'},
	effect: String,
	rarity: String,
	count: Number
});

mongoose.model('Weapon', WeaponSchema);