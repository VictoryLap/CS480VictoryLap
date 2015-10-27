// public/js/controllers/NerdCtrl.js
var NerdCtrl = angular.module('NerdCtrl', []);
NerdCtrl.controller('NerdController', function($scope) {

    $scope.inventory = [
    	{'name': 'Full rack of boobies',
    	 'amount': 2},
    	{'name': 'Rack of Nuts',
    	 'amount': 1},
    	{'name': 'Harness',
    	 'amount': 2},
    	{'name': '70m Rope',
    	 'amount': 2},
    	{'name': 'GriGri',
    	 'amount': 0},
    	{'name': 'Stoke',
    	 'amount': 9000}

    ];  

    $scope.orderProp = 'name';
    $scope.orderType = "Amount";
    $scope.sortOrder = function() {
        if($scope.orderProp == 'amount') {
            $scope.orderProp = 'name';
            $scope.orderType = "Amount";
        } else {
            $scope.orderProp = 'amount';
            $scope.orderType = 'Alphabetic';
        }
    };
});
