var mongoose = require('mongoose');

var SpellSchema = new mongoose.Schema({
  cost: Number,
  classH: {type: mongoose.Schema.Types.ObjectId, ref: 'Hero'},
  effect: String, //possibly reference?
  rarity: String,
  name: String,
  //possibly categorize spells into damage vs. no-damage?
  damage: Number,
  target: Boolean, //boolean for target or AOE spell
  art: String,
  sound: String,
  count: Number
});

mongoose.model('Spell', SpellSchema);