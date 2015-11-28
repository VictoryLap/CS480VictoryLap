// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // inventories page that will use the InventoryController
        .when('/inventories', {
            templateUrl: 'views/inventory.html',
            controller: 'InventoryController'
        })

        .when('/profile', {
            templateUrl: 'views/editProfile.html',
            controller: 'editProfileController'
        });

    $locationProvider.html5Mode(true);

}]);
