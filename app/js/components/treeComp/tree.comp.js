'use strict';

function TreeCompCtrl( $scope, $rootScope, APIService ){
	let compCtrl = this;

	angular.extend(compCtrl, {
		nodes: APIService.nodes,

		$onInit: function( ) {
			alert(compCtrl.nodes);
		}
	});
}

module.exports = {
	templateUrl: '../app/js/components/treeComp/tree.comp.html',
	controller: TreeCompCtrl,
	bindings: {
		nodes: '<'
	}
}