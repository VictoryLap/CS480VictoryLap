// public/js/services/ItemService.js
angular.module('ItemService', []).factory('Item', ['$http', function($http) {

    return {
        // call to get an item
        get : function(id) {
            return $http.get('/api/items/' + id);
        },

        // call to create a new item
        create : function(itemData) {
            return $http.post('/api/items', itemData);
        },

        // call to update an item
        update : function(id, itemData) {
            return $http.put('/api/items/' + id, itemData);
        },

        // call to delete an item
        delete : function(id) {
            return $http.delete('/api/items/' + id);
        }
    }

}]);