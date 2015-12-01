// public/js/controllers/MainCtrl.js

angular.module('MainCtrl', []).controller('MainController', ['$scope', '$http', 'User', function($scope, $http, User) {


	$scope.suser = {};
	$scope.tagline = 'An inventory for everyone';

	$scope.loginUser = function () {
		var loginUser = {
			username: $scope.luser.userName,
			password: $scope.luser.password
		}
		User.login(loginUser)
				.success(function() {
					$scope.luser = {};
				});
	}

    $scope.newUser = function() {


        //User.findOne({ //Find at least one user
        //    userName: $scope.user.userName;
        //} function (err, user) {
        //    if(!user) { //No users in collection
        //        User.create //stuff goes here
        //    }
        //};

		//Should check if username exists
		//if(User.get($scope.user.userName) == null)
		User.create($scope.suser)
				.success(function() {
					$scope.user = null;
				});
	};
		
}]);
