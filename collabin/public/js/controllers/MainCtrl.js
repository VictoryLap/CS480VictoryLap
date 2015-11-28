// public/js/controllers/MainCtrl.js

angular.module('MainCtrl', []).controller('MainController', ['$scope', '$http', 'Users', function($scope, $http, Users) {


	//$scope.formData = {};
	$scope.tagline = 'An inventory for everyone';
	//var dbModels = require('../../../app/models/dbModels');


    $scope.newUser = function(first, last, username, email, password) {

        //var dbModels = require('../../../app/models/dbModels');
		var user = {
			userName: username,
			firstName: first,
			lastName: last,
			email: email,
			password: password
		};

		if(!$.isEmptyObject(user)) {
			user.create(user)
					.success(function() {
						user = {};
					});

		}
	};
		
}]);
