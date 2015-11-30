// public/js/services/UserService.js
angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // get all users
        get : function() {
            return $http.get('/api/users');
        },

        // get user by id
        getByID : function(id) {
            return $http.get('/api/users/' + id);
        },

        // call to get a user by userName
        getByUserName : function(userName) {
            return $http.get('/api/users/userName/' + userName);
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
