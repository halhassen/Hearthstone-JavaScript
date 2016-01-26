(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(MinionFactory) {
		var vm = this;
    vm.deck = [];
    vm.hand = [];

    vm.createMinion = function(health, damage, cost, rarity, name, type, classH, art, flavor, sound, effect) {
      vm.minion = {
        health: health,
        damage: damage,
        cost: cost,
        rarity: rarity,
        name: name,
        type: type,
        classH: classH,
        art: art,
        flavor: flavor,
        sound: sound,
        effect: effect
      };
      vm.deck.push(vm.minion);
      console.log(vm.deck)
      MinionFactory.createMinion(vm.minion).then(function(res) {
        console.log(res);

      })
    };



    function Weapon(durability, damage, cost, classH, effect, rarity) {
    this.durability = durability;
    this.damage = damage;
    this.cost = cost;
    this.classH = classH;
    this.effect = effect;
    this.rarity = rarity;
    }

function Spell(cost, classH, effect, rarity, damage, target, art, sound, flavor) {
    this.cost = cost;
    this.classH = classH;
    this.effect = effect;
    this.rarity = rarity;
    //possibly categorize spells into damage vs. no-damage?
    this.damage = damage;
    this.target = target; //boolean for target or AOE spell
    this.art = art;
    this.sound = sound;
    this.flavor = flavor;
}

  //sample minions
 vm.createMinion(2, 1, 2, "Common", "Annoy-o-Tron", "Mechanical", "Neutral", "PH", "HELLO HELLO",  "SH", "Divine Shield, Taunt" );
 vm.createMinion(3, 2, 2, "Common", "Gilbin Stalker", "Normal", "Neutral", "PH", "Slippery!", "SH", "Stealth" );

  var fireball = new Spell(4, "Mage", "Deal 6 damage to the target", "Common", 6, "PH", "SH", "pew pew");

    //Effects
    // reduce the use of for looping so it doesnt have to it everytime a minion is
    // attacked, redundant and slow. It also stops when it finds first effect.
    // Make more dynamic
    var divineShield = function(minion) {
    var divineDef = minion.effect.split(",");
      for(var i = 0; i < divineDef.length; i++) {
         if(divineDef[i] === "Divine Shield") {
          console.log("DS");
        }
        
        else if(divineDef[i] === "Taunt") {
            console.log("T")
          }
      }
  };

var battlecry = function(minion) {
    //battlecry targettable or not
}

//divineShield(annoy);

var cardDraw = function cardDraw (player, amount) {
//    if(deck.length === 0) {
//        console.log("fatigue!");
//        return;
//    }
   //make sure randomizer doesn't pick same card!
   var cardPick =  Math.floor((Math.random() * deck.length) + 1);
   var drawnCard = deck.splice(cardPick); //removes from deck
   console.log(deck);
    for(var key in drawnCard) {
       var handCard = drawnCard[key];
       hand.push(handCard);
       document.getElementById("hand").innerHTML += "<div class='card col-md-3'>"
            + handCard.name + "</div>";
      console.log(hand);
   }
};

$("#cardDraw").click(function() {
    cardDraw();
});

var gameStart = function(player1, player2) {
  var coinFlip =  Math.random();
    if(coinFlip >= .5) {
        //player1
        console.log("player1");
        document.getElementById("starter").innerHTML = "player1";
       // [1, 2, 3, 4, 5, 6, 7].forEach(cardDraw());
    }
    else {
        //player2
        console.log("player2");
         document.getElementById("starter").innerHTML = "player2";
    }
};

//who goes first?
$("#coinFlip").click(function() {
    console.log('okay')
    gameStart();
})

function player1 () {

}

function player2 () {

}

	}
})();
