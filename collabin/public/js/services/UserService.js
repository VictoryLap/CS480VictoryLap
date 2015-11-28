// public/js/services/InventoryService.js
angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to get a user
        get : function(id) {
            return $http.get('/api/users/' + id);
        },

        // call to create a new user
        create : function(userData) {
            return $http.post('/api/users', userData);
        },

        // call to update a user
        update : function(id, userData) {
            return $http.put('/api/users/' + id, userData);
        },

        // call to delete a user
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }
    }

}]);