// public/js/controllers/InventoryCtrl.js
//angular.module('InventoryCtrl', []).controller('InventoryController', function ($scope) {
//
//    // test static data ===============================================
//    $scope.items = [
//        {
//            'owner': 'mathagoris',
//            'name': '70m Rope',
//            'quantity': 2,
//            'image': '../images/70mrope.jpeg'
//        },
//        {
//            'owner': 'crisrealTheSecurityGod',
//            'name': 'Nuts',
//            'quantity': 7,
//            'image': '../images/nuts.jpeg'
//        }
//    ];
//
//    $scope.inventories = [
//        {'name': 'Inventory 1'},
//        {'name': 'Inventory 2'},
//        {'name': 'Inventory 3'},
//        {'name': 'Inventory 4'},
//        {'name': 'Inventory 5'},
//        {'name': 'Inventory 6'}
//
//    ];
//
//    $scope.collaborators = [
//        {'name': 'mathagoris'},
//        {'name': 'crisraelTheSecurityGod'},
//        {'name': 'emilycup'}
//    ];
//
//    $scope.orderProp = 'name';
//    $scope.orderType = "Amount";
//    $scope.sortOrder = function () {
//        if ($scope.orderProp == 'amount') {
//            $scope.orderProp = 'name';
//            $scope.orderType = "Amount";
//        } else {
//            $scope.orderProp = 'amount';
//            $scope.orderType = 'Alphabetic';
//        }
//    };
//
//});

// CRIS YOU CAN WORK OFF THIS ==========================================================================================

angular.module('InventoryCtrl', []).controller('InventoryController', ['$scope', '$http', 'Inventory', 'Item', function ($scope, $http, Inventory, Item) {

    // declaring variables that will be used during api calls
    $scope.inventory = {};

    $scope.inventories = Inventory.get();
    // CREATE INVENTORY =============================================
    // when submitting the add form, send the text to the node API
    $scope.createInventory = function () {

        // validate the formData to make sure that something is there if form is empty, nothing will happen
        // people can't just hold enter to keep adding the same to-do anymore
        if (!$.isEmptyObject($scope.inventory)) {
            // call the create function from our service (returns a promise object)
            Inventory.create($scope.inventory)

                // if successful creation, call our get function to get all the new todos
                .success(function () {
                    $scope.inventory.name = {}; // clear the form so our user is ready to enter another

                });
        }
    }
}]);
