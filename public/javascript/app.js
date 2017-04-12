(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: '/templates/home.html',
			controller: 'GameController as vm'
		}).state('CardLibrary', {
			url: '/card-database',
			templateUrl: '/templates/cardlibrary.html',
			controller: 'CardController as vm'
		}).state('GameStart', {
			url: '/game-start',
			templateUrl: '/templates/gamestart.html',
			controller: 'GameController as vm'
		});
		$urlRouterProvider.otherwise('/');
		
	}
})();
