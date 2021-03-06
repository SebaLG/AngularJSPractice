var app = angular.module('projectKimbap', ["ngRoute"]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'components/home.html',
            controller: 'MainController',
            controllerAs: 'controller'
        })
        .when('/coverages', {
            templateUrl: 'components/coverages.html',
            controller: 'MainController',
            controllerAs: 'controller'
        })
        .when('/personalForm', {
            templateUrl: 'components/personalForm.html',
            controller: 'MainController',
            controllerAs: 'controller'
        })
        .when('/summary', {
            templateUrl: 'components/summary.html',
            controller: 'MainController',
            controllerAs: 'controller'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

app.controller('MainController', ['$route', '$routeParams', '$location', "formFactory", "$scope", function($route, $routeParams, $location, formFactory, $scope) {
    this.$route = $route;
    this.$routeParams = $routeParams;
    this.$location = $location;

    var controller = this;

    controller.coverages = [
        { name: "RCA", price: 100, selected: false },
        { name: "Kasko", price: 150, selected: false },
        { name: "Collision", price: 100, selected: false },
        { name: "Fire", price: 9, selected: false }
    ];

    controller.totalPrice = 0

    console.log("TCL: controller.coverages", controller.coverages)

    // method to add an item to the list
    controller.addCoverages = () => {
        console.log("TCL: controller.coverages", controller.coverages)
            // Put the object into storage
        localStorage.setItem('coverages', JSON.stringify(controller.coverages));
        $('#form-coverages').submit();
        $location.path("/personalForm");
    };

    // method to add an item to the list
    controller.calculatePrice = () => {
        controller.totalPrice = 0
        controller.coverages.forEach((coverage, index) => {
            if (coverage.selected) controller.totalPrice = controller.totalPrice + coverage.price;
        });
    };

    $scope.list = [];
    $scope.submit = function() {
        if (formFactory != null) {
            $scope.list = formFactory.getPeople()
        }

        $scope.list.push($scope.model)
        formFactory.setPeople($scope.list)
        console.log(formFactory.getPeople())
    }
}]);

app.factory("formFactory", ["$window", function($window) {
    var result = {
        setPeople: function(value) {
            $window.localStorage.setItem("people", JSON.stringify(value));
        },
        getPeople: function() {
            var list = $window.localStorage.getItem("people")
            return JSON.parse(list)
        }
    }
    return result;
}]);