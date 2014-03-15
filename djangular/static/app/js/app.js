'use strict';


angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]).
config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/products', {templateUrl: '/static/app/partials/product_list.html', controller: 'ProductsListCtrl'});
    $routeProvider.when('/categories', {templateUrl: '/static/app/partials/category_list.html', controller: 'CategoryListCtrl'});
    $routeProvider.otherwise({redirectTo: '/products'});
}]);

