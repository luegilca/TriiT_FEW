'use strict';

function TreeCompCtrl( $scope, $state, $stateParams, $timeout, APIService ){
	let compCtrl = this;

	angular.extend(compCtrl, {
		values: APIService.values,
		newNode: null,

		$onInit: function( ) {
			compCtrl.newNode = {};
			$('#myModal').modal('hide');
		},

		validateFields: function() {
			if( compCtrl.newNode.name == null ){
				toastr.error('New scenario name can\'t be empty', 'Error');
				return false;
			}
			else if( compCtrl.newNode.probability <= 0 || compCtrl.newNode.probability > 100 ) {
				toastr.error('Probabilities must be betweeen 1 and 100, else leave the field empty', 'Error');
				return false;	
			}
			return true;
		},

		reload: function() {
			$timeout(function(){
				$state.go('tree', {}, {reload: true});
			}, 200);			
		},

		postNode: function( ){
			if( compCtrl.validateFields( ) ) {
				compCtrl.newNode.parent = document.getElementById("parentId").value;
				APIService.postNodes( compCtrl.newNode )
					.then( function success(response){							
						$('#myModal').modal('hide');
						toastr.success('New scenario added.', 'Success');
						compCtrl.newNode = {};						
						compCtrl.reload();						
					}, function error(response){
						toastr.error(response.data.Error, 'Can\'t create new scenario');
					});
			}			
		}
	});
}

module.exports = {
	templateUrl: '../app/js/components/treeComp/tree.comp.html',
	controller: TreeCompCtrl,
	bindings: {
		values: '<'
	}
}