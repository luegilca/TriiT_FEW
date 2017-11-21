'use strict';

let angular = require('angular');
require('@uirouter/angularjs');

let app = angular.module('app', ['ui.router'])

.constant('backURL', {
	url: 'http://localhost:3000/'
})

.config(function($stateProvider, $urlRouterProvider) {
	let states = require('./routeStates').getStates();

	states.forEach(function(state){
		$stateProvider.state(state);
	});

	$urlRouterProvider.when("","/");
	$urlRouterProvider.otherwise("/");
});

require('./app.directive.js')
require('./app.css');
require('./services');
require('./components');