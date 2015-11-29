// public/js/controllers/MainCtrl.js

angular.module('MainCtrl', []).controller('MainController', ['$scope', '$http', 'User', function($scope, $http, User) {


	$scope.user = {};
	$scope.tagline = 'An inventory for everyone';
	//var dbModels = require('../../../app/models/dbModels');


    $scope.newUser = function() {

        //var dbModels = require('../../../app/models/dbModels');
		/*
		var user = {
			userName: username,
			firstName: first,
			lastName: last,
			email: email,
			password: password
		}; */

		//if(!$.isEmptyObject($scope.user)) {
		User.create($scope.user)
		//			.success(function() {
		//				$scope.user = {};
		//			});

		//}
	};
		
}]);
