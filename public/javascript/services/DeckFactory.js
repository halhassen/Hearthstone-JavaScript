(function() {
	'use strict';
	angular.module('app')
	.factory('DeckFactory', DeckFactory);

	function DeckFactory($http, $q) {
		var o = {};

		o.createDeck = function(deck) {
			console.log(deck);
			var q = $q.defer();
			$http.post('/api/deck/', deck).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getDeck = function(deck) {
			console.log(deck);
			var q = $q.defer();
			$http.get('/api/deck/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		} 

			/*	o.getLeague = function(id) {
			var q = $q.defer();
			$http.get('/api/views/league/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}
		o.getLeagues = function() {
			var q = $q.defer();
			$http.get('/api/views/league/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}; */

		return o;
	}
})();

//reassign routes?