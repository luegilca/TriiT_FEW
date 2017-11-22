module.exports = function APIService( $http, $rootScope, $timeout, $state, backURL) {
	let service = this;
	angular.extend(service, {

		broadcast: function(event){
			$timeout(function(){
			    $rootScope.$broadcast(event);
			}, 500);
		},

		getNodes: function( ){
			return $http.get( backURL.url + 'nodes')
				.then( function success(response){
					return response.data;
				}, function error(response){
					console.log(response);
				})
		},

		postNodes: function( data ) {
			return $http.post( backURL.url + 'nodes', data );
		},

		deleteNode: function( id ) {
			return $http.delete( backURL.url + "nodes/" + id );
		},

		candidates: function( ){
			return $http.get( backURL.url + 'can');
		},

		getResults: function( ){
			return $http.get( backURL.url + 'results');
		}
	})
}