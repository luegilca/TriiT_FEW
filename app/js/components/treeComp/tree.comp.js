'use strict';

function TreeCompCtrl( $scope, APIService ){
	let compCtrl = this;

	angular.extend(compCtrl, {
		values: APIService.values,
		newNode: null,

		$onInit: function( ) {
			compCtrl.newNode = {};
		},

		validateFields: function(){
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

		postNode: function( ){
			if( compCtrl.validateFields( ) ) {
				compCtrl.newNode.parent = document.getElementById("parentId").value;
				APIService.postNodes( compCtrl.newNode )
					.then( function success(response){
						toastr.success('New scenario added.', 'Success');
						$('#myModal').modal('hide');
						$route.reload();
					}, function error(response){
						console.log(response.data);
						toastr.error('Can\'t create new scenario', 'Error');
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