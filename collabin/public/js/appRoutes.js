// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        })

        // inventories page that will use the InventoriesController
        .when('/inventories', {
            templateUrl: 'views/inventories.html',
            controller: 'InventoriesController'
        })

        .when('/profile', {
            templateUrl: 'views/editProfile.html',
            controller: 'editProfileController'
        });

    $locationProvider.html5Mode(true);

}]);
