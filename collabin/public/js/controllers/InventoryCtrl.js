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
    $scope.inventory = [];
    //$scope.items = [];

    Inventory.get()
        .success(function (data) {
            $scope.inventories = data;
            $scope.inventory = $scope.inventories[0];
            $scope.items = [];
            $scope.inventory.items.forEach(function (element, index, array) {
                console.log(element);
                Item.getByID(element)
                    .success(function (itemData) {
                        $scope.items.push(itemData);
                    });
            });
        });


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

                    // clear the form so our user is ready to enter another
                    $scope.inventory.name = null;
                });
        }
    }

    // CREATE ITEM =====================================================
    $scope.createItem = function () {

        // validate the formData to make sure that something is there if form is empty, nothing will happen
        // people can't just hold enter to keep adding the same to-do anymore
        if (!$.isEmptyObject($scope.item)) {

            // call the create function from our service (returns a promise object)
            Item.create($scope.item)

                // if successful creation, call our get function to get all the new todos
                .success(function (data) {
                    Inventory.getByID("565be7c72a59ac09608d58e5")
                        .success(function (inventoryData) {
                            $scope.inventory = inventoryData;
                            $scope.inventory.items.push(data);
                            Inventory.update($scope.inventory._id, $scope.inventory)

                                .success(function () {
                                // it added yay!
                            });
                        });

                    // clear the form so our user is ready to enter another
                    $scope.item.name = null;
                    $scope.item.quantity = null;
                });
        }
    }

}]);
