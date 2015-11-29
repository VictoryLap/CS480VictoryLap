// public/js/controllers/MainCtrl.js

angular.module('MainCtrl', []).controller('MainController', ['$scope', '$http', 'User', function($scope, $http, User) {


	$scope.user = {};
	$scope.tagline = 'An inventory for everyone';

    $scope.newUser = function() {

        /*
        User.findOne({ //Find at least one user
            userName: $scope.user.userName;
        } function (err, user) {
            if(!user) { //No users in collection
                !!!User.create stuff goes here
            }
        };


        */

		//Should check if username exists
		//if(User.get($scope.user.userName) == null)
		User.create($scope.user)
				.success(function() {
					$scope.user = {};
				});
	};
		
}]);
