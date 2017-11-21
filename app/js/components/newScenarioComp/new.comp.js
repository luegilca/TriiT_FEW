'use strict';

function NewScenarioCompCtrl( APIService ) {
	let compCtrl = this;

	angular.extend(compCtrl, {

	});
}

module.exports = {
	templateUrl: '../app/js/components/newScenarioComp/new.comp.html',
	controller: NewScenarioCompCtrl,
	bindings: {
		values: '<'
	}
}