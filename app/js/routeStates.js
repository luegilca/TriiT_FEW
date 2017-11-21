'use strict';
module.exports = {
	getStates: function( ) {
		return [
			{
				name: 		'home',
				url: 		'/',
				component: 	'homeComp'
			},
			{
				name: 		'tree',
				url:  		'/tree',
				component: 	'treeComp',
				resolve: {
					values: function( APIService ) {
						return APIService.getNodes( );
					}
				}
			},
			{
				name: 		'tree.newScenario',
				url:  		'/new',
				component: 	'newScenarioComp'
			}
		];
	}
}