'use strict';

function TreeCompCtrl( $scope, APIService ){
	let compCtrl = this;

	angular.extend(compCtrl, {
		nodes: APIService.nodes,
		values: [
		  {
		    "name": "Top Level",
		    "parent": "null",
		    "gain": "0",
		    "probability": "0",
		    "expected_value": "0",
		    "route": [],
		    "children": [
		      {
		        "name": "Level 2: A",
		        "parent": "Top Level",
		        "gain": "0",
		        "probability": "0",
		        "expected_Value": "0",
		        "route": [],
		        "children": [
		          {
		            "name": "Son of A",
		            "parent": "Level 2: A",
		            "gain": "0",
		            "probability": "0",
		            "expected_Value": "0",
		            "route": [],
		            "children": []
		          },
		          {
		            "name": "Daughter of A",
		            "parent": "Level 2: A",
		            "gain": "0",
		            "probability": "0",
		            "expected_Value": "0",
		            "route": [],
		            "children": []
		          }
		        ]
		      },
		      {
		        "name": "Level 2: B",
		        "parent": "Top Level",
		        "gain": "0",
		        "probability": "0",
		        "expected_Value": "0",
		        "route": [],
		        "children": []
		      }
		    ]
		  }
		],

		$onInit: function( ) {
			console.log(compCtrl);
			console.log(d3.select('#content'));
			console.log(d3);
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