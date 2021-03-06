'use strict';

function TreeCompCtrl( $scope, $state, $stateParams, $timeout, APIService ){
	let compCtrl = this;

	angular.extend(compCtrl, {
		values: APIService.values,
		newNode: null,
		deleteCandidates: null,
		deleted: null,
		results: null,

		$onInit: function( ) {
			compCtrl.newNode = {};
			$('#myModal').modal('hide');
			$('#infoModal').modal('hide');
			$('#resultModal').modal('hide');

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
		},

		deleteNode: function( ){
			if( compCtrl.deleted == null ){
				toastr.error('You must select one of the scenarios', 'Error');
			}
			else if( !compCtrl.deleteCandidates.includes(parseInt(compCtrl.deleted))) {
				toastr.error( compCtrl.deleted + ' is not a delete candidate', 'Error');
			}
			else {
				APIService.deleteNode(compCtrl.deleted)
				.then( function success(response){
					$('#infoModal').modal('hide');
					toastr.success('Scenario deleted', 'Success');
					compCtrl.reload();
				}, function error(response){
					toastr.error(response.data.Error, 'Can\'t delete scenario');
				});
			}			
		},

		getResults: function( ){
			APIService.getResults( )
				.then( function success(response){
					compCtrl.results = response.data.Option;
					compCtrl.results += " with an expected profit of: " + response.data.Gain; 
					$('#resultModal').modal('show');
				}, function error(response){
					toastr.error(response.data.Error, 'Error');
					console.log(response.data);
				});
		},

		candidates: function( ){
			APIService.candidates( )
				.then( function success(response){
					compCtrl.deleteCandidates = response.data.nodes;
				}, function error(response){
					toastr.error('Can\'t get the scenario candidates to delete.', 'Error');
					console.log(response.data);
				});
			$('#infoModal').modal('show');
			compCtrl.deleted = null;
		},

		clearTree: function( ) {
			APIService.clearTree( )
				.then( function success(response){
					toastr.info('The tre is now empty', 'Success');
					APIService.startRoot();
					compCtrl.reload();
				}, function error(response){
					toastr.error('Can\'t clar the tre.', 'Error');
					console.log(response.data);
				})
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