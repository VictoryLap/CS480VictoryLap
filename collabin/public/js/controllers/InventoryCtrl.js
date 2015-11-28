// public/js/controllers/InventoryCtrl.js
angular.module('InventoryCtrl', []).controller('InventoryController', function($scope) {

    $scope.items = [
        {'owner': 'mathagoris',
            'name': '70m Rope',
            'quantity': 2,
            'image': '../images/70mrope.jpeg'},
        {'owner': 'crisrealTheSecurityGod',
            'name': 'Nuts',
            'quantity': 7,
            'image': '../images/nuts.jpeg'}
    ];

    $scope.inventories = [
        {'name': 'Inventory 1'},
        {'name': 'Inventory 2'},
        {'name': 'Inventory 3'},
        {'name': 'Inventory 4'},
        {'name': 'Inventory 5'},
        {'name': 'Inventory 6'}

    ];

    $scope.collaborators = [
        {'name': 'mathagoris'},
        {'name': 'crisraelTheSecurityGod'},
        {'name': 'emilycup'}
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
