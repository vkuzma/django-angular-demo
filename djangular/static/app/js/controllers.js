'use strict';

var prepareModelForTastypie = function(model) {
    for(var key in model) {
        if(typeof(model[key]) == "object" && model[key].resource_uri)
            model[key] = model[key].resource_uri;
    }
    delete model.id
    return model;
}

var ItemControlleAbstract = function($scope, $http, options) {
    $scope.request_delete = function(model) {
        model._delete_enable = true;
    };

    $scope.abort_delete = function(model) {
        model._delete_enable = false;
    };

    $scope.delete = function(model) {
        $http.delete(model.resource_uri).success(function() {
            $scope.buildList();
        });
    };

    $scope.update = function(model) {
        $http.put(model.resource_uri + '?format=json', prepareModelForTastypie(model)).success(function(data) {
            $scope.model = data;
            console.log($scope.model);
            $scope.model._enable_edit = false;
        }).error(function(result) {
            model._enable_edit = false;
        });
    };

    $scope.edit = function(model) {
        if(model._enable_edit) {
            model._enable_edit = false;
        }
        else {
            model._enable_edit = true;
            $scope.new_model = angular.copy(model);
            $scope.$broadcast('focusOn');
        }
    };
};


angular.module('myApp.controllers', []).
    controller('ProductsListCtrl',
        ['$scope', '$http',
        function($scope, $http) {
            $scope.buildList = function() {
            $http.get('/api/product/?format=json').success(function(data) {
                $scope.object_list = data.objects;
                });
            };
            $scope.buildList();

            // get all categories
            $http.get('api/category/?format=json').success(function(data) {
                $scope.categories = data.objects;
                $scope.category = $scope.categories[0];
            });

            // init default values of new product
            var initProduct = function() {
                $scope.new_product = {
                    stock: 1,
                    price: 1.00
                };
            };
            initProduct();

            $scope.add = function() {
                if($scope.add_product_form.$valid) {
                    $scope.new_product.category = $scope.category.resource_uri;
                    $http.post('/api/product/?format=json', $scope.new_product).success(function(data) {
                        $scope.buildList();
                        $scope.error = null;
                        initProduct();
                    }).error(function(msg) {
                        $scope.error = msg.error_message;
                    });
                }
            };

    }])
    .controller('ProductItemCtrl', ['$scope', '$http',
        function($scope, $http) {
            ItemControlleAbstract($scope, $http);

    }])
    .controller('CategoryListCtrl', ['$scope', '$http',
        function($scope, $http) {

            $scope.buildList = function() {
            $http.get('/api/category/?format=json').success(function(data) {
                $scope.object_list = data.objects;
                });
            };
            $scope.buildList();

            $scope.add = function() {
                if($scope.add_category_form.$valid) {
                    $http.post('/api/category/?format=json', $scope.new_category).success(function(data) {
                        $scope.buildList();
                        $scope.error = null;
                    }).error(function(msg) {
                        $scope.error = msg.error_message;
                    });
                }
            };

    }])
    .controller('CategoryItemCtrl', ['$scope', '$http',
        function($scope, $http) {
            ItemControlleAbstract($scope, $http);
    }]);


function NavController($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}