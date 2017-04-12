(function() {
	'use strict';
	angular.module('app')
	.factory('CardFactory', CardFactory);

	function CardFactory($http, $q) {
		var o = {};

		// function getAuth() {
		// 	var auth = {
		// 		headers: {
		// 			Authorization: "Bearer " + localStorage.getItem("token")
		// 		}
		// 	}
		// 	return auth;
		// }

		// Minions
		o.createMinion = function(minion){
			var q = $q.defer();
			$http.post('/api/card/minion/', minion).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		// o.getMinion = function() {
		// 	var q = $q.defer();
		// 	$http.get('/api/card/minion/').success(function(res) {
		// 		q.resolve(res);
		// 	});
		// 	return q.promise;
		// };

		o.getMinion = function() {
			var q = $q.defer();
			$http.get('/api/card/minion/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		// Spells
		o.createSpell = function(spell) {
			var q = $q.defer();
			$http.post('/api/card/spell/', spell).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}; 

		o.getSpell = function() {
			var q = $q.defer();
			$http.get('/api/card/spell').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		// Weapons
		o.createWeapon = function(weapon){
			var q = $q.defer();
			$http.post('/api/card/weapon/', weapon).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getWeapon = function() {
			var q = $q.defer();
			$http.get('/api/card/weapon/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		return o;
	}
})();
