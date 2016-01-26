(function() {
	'use strict';
	angular.module('app')
	.factory('MinionFactory', MinionFactory);

	function MinionFactory($http, $q) {
		var o = {};

		o.createMinion = function(minion){
			console.log(minion);
			var q = $q.defer();
			$http.post('/api/minion/', minion).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		return o;
	}
})();
