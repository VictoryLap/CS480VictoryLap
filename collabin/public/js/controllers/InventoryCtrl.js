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

angular.module('InventoryCtrl', []).controller('InventoryController', ['$scope', '$http', 'Inventory', 'Item', function ($scope, $http, Inventory, Item) {


    var init = function() {
        // declaring variables that will be used during api calls
        $scope.inventories = [];
        $scope.inventoryName = "Inventory Name";
        $scope.inventory = null;
        $scope.items = [];
        $scope.selctedId = null;

        Inventory.get()
            .success(function (inventoriesData) {
                $scope.inventories = inventoriesData;
                console.log($scope.inventories);
                if($scope.inventories.length !== 0) {
                    $scope.inventory = $scope.inventories[0];
                    $scope.inventoryName = $scope.inventory.name;
                    $scope.inventory.items.forEach(function (element) {
                        Item.getByID(element)
                            .success(function (itemData) {
                                $scope.items.push(itemData);
                            });
                    });
                }
            });
    }
    init();


    // CREATE INVENTORY =============================================
    // when submitting the add form, send the text to the node API
    $scope.createInventory = function () {

        // validate the formData to make sure that something is there if form is empty, nothing will happen
        // people can't just hold enter to keep adding the same to-do anymore
        if (!$.isEmptyObject($scope.inv)) {

            // call the create function from our service (returns a promise object)
            Inventory.create($scope.inv)

                // if successful creation, call our get function to get all the new todos
                .success(function (inventoryID) {
                    Inventory.getByID(inventoryID)
                        .success(function(inventoryData) {
                            $scope.inventories.push(inventoryData);
                            $scope.inventory = inventoryData;
                            $scope.inventoryName = $scope.inventory.name;
                            $scope.switchInventory($scope.inventory._id);
                        });

                    // clear the form so our user is ready to enter another
                    $scope.inv.name = null;
                });
        }
    }

    // REMOVE INVENTORY ================================================
    // this method will be called when the (-) is clicked
    $scope.removeInventory = function (inventoryID) {

        Inventory.getByID(inventoryID)
            .success(function (inv) {
                inv.items.forEach(function (itemID) {
                    console.log(itemID);
                    Item.delete(itemID)
                        .success(function() {

                        });
                });
            });
        $scope.items = [];
        // delete data from database
        Inventory.delete(inventoryID)
            // if successful creation,
            .success(function () {

            });

        Inventory.get()
            .success(function(inventories) {
                $scope.inventories = inventories;
                $scope.inventory = null;
                $scope.inventoryName = 'Inventory Name';
                if(inventories.length !== 0){
                    $scope.inventory = inventories[0];
                    $scope.inventoryName = $scope.inventory.name;
                    $scope.switchInventory($scope.inventory._id);
                }
            });
    }

    // SWITCH INVENTORIES ==============================================
    // this method switches to an inventory when it is clicked on the
    // sidebar
    $scope.switchInventory = function (inventoryID) {
        $scope.fillItemPage(inventoryID);
    }

    $scope.fillItemPage = function (inventoryID) {
        Inventory.getByID(inventoryID)
            .success(function (inv) {
                $scope.items = [];
                $scope.inventory = inv;
                if($scope.inventory !== null) {
                    $scope.inventoryName = $scope.inventory.name;
                    $scope.inventory.items.forEach(function (itemID) {
                        Item.getByID(itemID)
                            .success(function (itemData) {
                                $scope.items.push(itemData);
                            });
                    });
                } else {
                    $scope.inventoryName = "Inventory Name";
                }
            });
    }

    // CREATE ITEM =====================================================
    $scope.createItem = function () {

        // validate the formData to make sure that something is there if form is empty, nothing will happen
        // people can't just hold enter to keep adding the same to-do anymore
        if (!$.isEmptyObject($scope.item)) {
            console.log($scope.item);
            // call the create function from our service (returns a promise object)
            Item.create($scope.item)
                // if successful creation, call our get function to get all the new todos
                .success(function (itemData) {
                    Inventory.getByID($scope.inventory._id)
                        .success(function (inv) {
                            inv.items.push(itemData._id);
                            $scope.items.push(itemData);
                            Inventory.update(inv._id, inv)
                                .success(function () {
                                    $scope.item.name = null;
                                    $scope.item.quantity = null;
                                });
                        });
                    //$scope.inventory.items.push(itemData._id); //Fails here
                    //$scope.items.push(itemData);
                    //console.log($scope.inventory);
                    //Inventory.update($scope.inventory._id, $scope.inventory)
                    //    .success(function () {
                    //        // clear the form so our user is ready to enter another
                    //        $scope.item.name = null;
                    //        $scope.item.quantity = null;
                    //    });
                });


        }
    }

    // REMOVE ITEM =========================================================
    // this method will be called when the 'Remove' button is clicked
    $scope.removeItem = function (itemID) {

        // delete item from database
        Item.delete(itemID)
            .success(function () {
                var index = $scope.inventory.items.indexOf(itemID);
                $scope.inventory.items.splice(index, 1);
                Inventory.update($scope.inventory._id, $scope.inventory)
                    .success(function (inventoryData) {
                        $scope.inventory = inventoryData;
                        $scope.switchInventory($scope.inventory._id);
                    });
            });
    }

    // EDIT ITEM ==============================================================
    // this method will be called when the 'Edit' button is clicked

    $scope.openModal = function(data) {
        $scope.selectedId = data;
        $('#editItemModal').modal('show');
    }

    $scope.editItem = function (itemID) {
        console.log(itemID)
        console.log($scope.item.name)
        $scope.item.name = data.name;
        $scope.item.quantity = data.name;

        // update item in database
        Item.update(data, $scope.item)
            .success(function () {

             });

    }

}]);
