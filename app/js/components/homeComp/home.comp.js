'use strict';

function HomeCompCtrl( $scope, $rootScope, APIService ){
	let compCtrl = this;

	angular.extend(compCtrl, {
		$onInit: function( ){
			APIService.startRoot();
		}
	});
}

module.exports = {
	templateUrl: '../app/js/components/homeComp/home.comp.html',
	controller: HomeCompCtrl
}