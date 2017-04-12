(function() {
	'use strict';
	angular.module('app')
	.controller('GameController', GameController);

	function GameController($state, CardFactory, DeckFactory) {
		var vm = this;
    vm.deck = [];
    vm.deck.length = 30;
    vm.hand = [];
    vm.deadMinions = [];
    // Link for card animation, should code this in the front-end: http://codepen.io/Capse/pen/vLJeBV
    // https://github.com/Julien-Amblard/flyingCard/blob/master/css/core.css


    // To-do
    // Make it asynchronus loading so it all loads before you can do anything. Animated load page?
    // this card draw is all over the place :(

    vm.cardDraw = function(amount) {
      console.log(amount + " cards drawn")
      var cardPick =  Math.floor((Math.random() * vm.deck.length) + 1);
      console.log(cardPick);
      //possibly do a forEach that will draw one card at a time

      //removes drawn card from deck, and adds it to hand
      //fix the below, it doesn't work at all
      console.log(drawnCard);
      var drawnCard = vm.deck.slice(cardPick); 
      for(var key in drawnCard) {
        console.log(drawnCard);
        var handCard = drawnCard[key];
        vm.hand.push(handCard);
        console.log(vm.hand);
      }
      vm.amount = "";
    };


    vm.gameStart = function() {
      var coinFlip =  Math.random();
      if(coinFlip >= .5) {
        console.log("player1");
        document.getElementById("starter").innerHTML = "player1"; 
      }
      else {
        console.log("player2");
        document.getElementById("starter").innerHTML = "player2";
      }
    };

    // Combat
    vm.attack = function(attacker, defender) {
      // Worry about grabbing minion health after function ends?
      // All of these interactions push to server after done 
      // If for attacking hero and attacking minion
      if(defender.isMinion == "Minion") {
        var defenderHealth = defender.health - attacker.damage;
        var attackerHealth = attacker.health - defender.damage;
        if(defenderHealth == 0) {
          vm.deadMinions.push(defender);
        }
        else if(attackerHealth == 0) {
          vm.deadMinions.push(attacker);
        }
      }
      else if(defender.isMinion != "Minion") {
        var heroHealth = defender.health - attacker.damage;
        if(heroHealth == 0) {
          //End Game!
        }
      }
    };

    vm.turnTimer = function() {
      // Countdown however long it's supposed to be

      // return vm.endTurn();
    };

    vm.endTurn = function(player) {
      // Whoever ends turn switches off all action capabilites for themself
      // Reactivated if turnTimer ends or other player endTurn()
    };


    //make rules for combat, including health, damage, effects, 
    //turn (timer, going back and forth, can't act unless your turn)

     //Effects
    // reduce the use of for looping so it doesnt have to it everytime a minion is
    // attacked, redundant and slow. It also stops when it finds first effect.
    // Make more dynamic
    /*vm.yoggsaron = function(spellsCasted) {  
      var spellPack = [];
      var count = 0;
      while(count <= spellsCasted) {
        // randomSpell returns a random ID that will be searched for on the server side
        // And returned as a package of spells
        var randomSpell = Math.ceil(Math.random() * 20);
        count++;
        spellPack.push(randomSpell);
      }
      console.log(spellPack);
      MinionFactory.spellSearch(vm.spellPack).then(function(res) {
        var yoggSpells = spellPack.reduce(function(a, b, index, array) {
          return a;
        });
        // or should this be something else
        return yoggSpells;
      })
    };

    console.log(vm.yoggsaron(5)); */

    vm.actionEffects = function(minion) {
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

  // How will I bring these effects over from one controller to another and interact over here?
  // Taunt is a flag that prevents actions for the other player
  // Have a constantly updating array of minions for each player to cycle through minions and effects


  vm.battlecry = function(minion) {
    // when minion is played
    // battlecry targettable or not
  }

  vm.combo = function(playedCards,comboEffect) {
    // Create array of played cards in a turn toe asily track this
    if(playedCards.length > 0) {
      comboEffect();
    }
    else {
      return null;
    }
  }

}
})();
