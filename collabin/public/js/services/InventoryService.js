// public/js/services/InventoryService.js
angular.module('InventoryService', []).factory('Inventory', ['$http', function($http) {

    return {
        // call to get all inventories
        get : function() {
            return $http.get('/api/inventories');
        },

        // call to get an inventory by id
        getByID : function(id) {
            return $http.get('/api/inventories/' + id);
        },

        // call to create a new inventory
        create : function(inventoryData) {
            return $http.post('/api/inventories', inventoryData);
        },

        // call to update an inventory
        update : function(id, inventoryData) {
            return $http.put('/api/inventories/' + id, inventoryData);
        },

        // call to delete an inventory
        delete : function(id) {
            return $http.delete('/api/inventories/' + id);
        }
    }       

}]);
