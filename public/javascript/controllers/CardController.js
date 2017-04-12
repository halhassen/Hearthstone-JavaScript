  (function() {
   'use strict';
   angular.module('app')
   .controller('CardController', CardController);

   function CardController(CardFactory, DeckFactory, $state) {
    var vm = this;
    vm.deck = [];
    vm.database = [];
    vm.deckList = [];

    vm.classIcons = [
    { name: "Druid", image: "https://sectorone.eu/wp-content/plugins/deckselect/deckselect-core/img/Druid.png"},
    { name: "Hunter", image: "http://media-hearth.cursecdn.com/attachments/0/150/hunter_4.png"},
    { name: "Mage", image: "http://media-hearth.cursecdn.com/attachments/0/151/mage_13.png"},
    { name: "Paladin", image: "https://sectorone.eu/wp-content/plugins/deckselect/deckselect-core/img/Paladin.png"},
    { name: "Priest", image: "http://media-hearth.cursecdn.com/attachments/0/153/priest_12.png"},    
    { name: "Rogue", image: "https://www.burning-crusade.com/wp-content/uploads/2014/05/rogue_1.png"},
    { name: "Shaman", image: "http://media-hearth.cursecdn.com/attachments/0/155/shaman_5.png"},
    { name: "Warlock", image: "https://sectorone.eu/wp-content/plugins/deckselect/deckselect-core/img/Warlock.png"},
    { name: "Warrior", image: "https://sectorone.eu/wp-content/plugins/deckselect/deckselect-core/img/Warrior.png"}
    ];
    vm.createMinion = function(health, damage, cost, rarity, name, type, classH, art, sound, effect, count, isMinion) {
      var minion = {
        health: health,
        damage: damage,
        cost: cost,
        rarity: rarity,
        name: name,
        type: type,
        classH: classH,
        art: art,
        sound: sound,
        effect: effect,
        count: 0,
        isMinion: isMinion
      };
      vm.database.push(minion);
      CardFactory.createMinion(minion).then(function(res) {
        vm.minion = res;
      })
    };

    // Look at another way of doing "get" that isn't so clunky
    vm.getMinion = function() {
      CardFactory.getMinion().then(function(res) {
        vm.card = res;
      })
    };

    vm.getDeck = function() {
      DeckFactory.getDeck().then(function(res) {
        vm.deck = res;
      })
    };

    vm.createSpell = function(cost, classH, effect, rarity, name, damage, target, art, sound, count) {
      var spell = {
        cost: cost,
        classH: classH,
        effect: effect,
        rarity: rarity,
        name: name,
        damage: damage,
        target: target,
        art: art,
        sound: sound,
        count: 0
      };
      vm.database.push(spell);
      CardFactory.createSpell(spell).then(function(res) {
        vm.spell = res;
      })
    };

    // Are these gets necessary?
    vm.getSpell = function() {
      CardFactory.getSpell().then(function(res) {
        console.log(res);
        vm.card = res;
      });
    };

    vm.createWeapon = function(durability, damage, cost, name, classH, effect, rarity, count) {
      var weapon = { 
        durability: durability,
        damage: damage,
        cost: cost,
        name: name,
        classH: classH,
        effect: effect,
        rarity: rarity,
        count: count
      };
      vm.database.push(weapon);
      CardFactory.createWeapon(weapon).then(function(res) {
        vm.weapon = res;
      });
    };

  //sample cards
  vm.createMinion(2, 1, 2, "Common", "Annoy-o-Tron", "Mechanical", "Neutral", "http://media-hearth.cursecdn.com/avatars/149/30/12181.png",  "SH", "Divine Shield, Taunt", 0, "Minion");
  vm.createMinion(3, 2, 2, "Common", "Gilbin Stalker", "Normal", "Neutral", "http://media-hearth.cursecdn.com/avatars/149/18/12249.png", "SH", "Stealth", 0, "Minion" );
  vm.createSpell(4, "Mage", "Deal 6 damage to the target", "Common", "Fireball", 6, true, "http://media-hearth.cursecdn.com/avatars/147/429/522.png", "SH", 0);
  vm.createMinion(7, 5, 10, "Legendary", "Yogg-Saron, Hope's End", "Normal", "Neutral", "http://media-hearth.cursecdn.com/avatars/289/223/33168.png", "SH", "Battlecry, vm.yoggsaron();", 0, "Minion" );


  // Add mana cost and alphabetical order organization
  vm.addToDeck = function(card) {
    // check if card has been added twice
    // bugs out if you do same card twice then another card
    var duplicateFlag = 0;
    var deckLength = vm.deck.length;
    var legendCheck = false;
    if(deckLength == null) {
      card.count++;
      console.log(card);
      vm.deck.push(card);
      console.log(deckLength)
    }
    // Legendary Check
    if(card.rarity == "Legendary" && card.count == 1) {
      legendCheck = true;
    }

    // Ends function if there are already 2 copies of a card in a deck or max amount
    if(card.count == 2 || legendCheck == true || deckLength == 30) {
      return vm.deck;
    }
    // Assigns a flag to a card if there is one of it, so it just adds to the count property
    for(var i = 0; i < deckLength; i++) {
     if(card.name == vm.deck[i].name) {
      duplicateFlag = 1;
    }
  }
  console.log(duplicateFlag + " dup flag");
  if(duplicateFlag == 1) {
    return card.count++;
  }
  // If no copy of new card exists, add it to the array and increae count from 0 => 1
  else {
    console.log("New card");
    card.count++;
    return vm.deck.push(card);
  }
}

// fix scope for deck addition to consider that the card has been removed!
vm.removeCard = function(card) {
  var deckLength = vm.deck.length;
  console.log(deckLength + " remove");
  console.log(vm.deck);
  for(var j = 0; j <= deckLength; j++) {
    // Deals with empty element at the start of the deck
    if(vm.deck[j] == null) {
      continue;
    }
    // Checks if card is already in deck
    else if(card.name == vm.deck[j].name) {

      console.log("Deck: " + vm.deck[j].name + ". " + "Card: " + card.name);
      // If there are 2 copies of one card, subtracts count by 1
      if(vm.deck[j].count == 2) {
        vm.deck[j].count--;
        console.log(vm.deck[j].name + " " + vm.deck[j].count + " w2th");
      }
      // If there is one copy of one card, subtracts the count to 0 and removes it from the deck
      else {
        vm.deck[j].count--;
        console.log(vm.deck[j].name + " " + vm.deck[j].count + " w1th");
        vm.deck.splice(j, 1);
      }
    }
    else {
      continue;
    }
  }
  console.log(vm.deck);
  console.log(vm.database);
}

vm.submitDeck = function(deck) {
  var deckSubmit = [deck,deck.name];
  console.log(deckSubmit);
  DeckFactory.createDeck(deckSubmit).then(function(res) {
    vm.deck = [];
    // It should then go back to decklist view
    console.log(res);
    vm.newDeck = res;
    vm.deckList.push(vm.newDeck);
    // TEMPORARY FIX TO ADJUST COUNT DATABASE CARDS
    // Checks if card in database exists in deck, and adjusts count to 0 for card in database
    var databaseLength = vm.database.length;
    for(var h = 0; h < databaseLength; h++) {
      if(deck.indexOf(vm.database[h]) > -1) {
        vm.database[h].count = 0;
      }
    };
    console.log(vm.deckList);
  });
};


}
})();
