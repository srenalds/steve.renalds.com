var app = angular.module('Renalds', ['ngMaterial','ngSanitize','ngRoute','firebase']);
app.config(['$routeProvider','$locationProvider',
  function ($routeProvider,$locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/Home.html',
        controller: 'RenaldsController'
    }).
      when('/Resume', {
        templateUrl: 'partials/Resume.html',
        controller: 'DataController'
    }).
      when('/WorkHistory', {
        templateUrl: 'partials/WorkHistory.html',
        controller: 'DataController'
    }).
      when('/Interests', {
        templateUrl: 'partials/Interests.html',
        controller: 'RenaldsController'
    }).
      when('/About', {
        templateUrl: 'partials/About.html',
        controller: 'RenaldsController'
    }).
      when('/Links', {
        templateUrl: 'partials/Links.html',
        controller: 'RenaldsController'
    }).
      otherwise({
        redirectTo: '/'
    });
  }
]);

app.config(['$locationProvider', function($location) {
  $location.hashPrefix('!');
}]);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .accentPalette('blue-grey')
      ;
});

app.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);

app.controller('RenaldsController', ['$scope', '$mdSidenav', '$mdDialog', '$location',
  function($scope, $mdSidenav, $mdDialog, $location){

  $scope.showDialog = function(ev,title) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .title(title)
        .content('This information will be made available upon request based on project requirements and need to know.')
        .ariaLabel(title)
        .ok('Thank you!')
        .targetEvent(ev)
    );
  };

  $scope.setRoute = function(route) {
    $location.path(route);
  };

  $scope.showAgency = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .title('Agency Information')
        .content('This information will be made available upon request based on project requirements and need to know.')
        .ariaLabel('Clearance Information')
        .ok('Thank you!')
        .targetEvent(ev)
    );
  };

  $scope.lockRight = true;
  $scope.toggleRight = function() {
    if ($mdSidenav('right').isOpen()) {
      $mdSidenav('right').close();
      $scope.lockRight = false;
    } else {
      $mdSidenav('right').toggle();
      $scope.lockRight= true;
    };
  };

}]);
app.controller('DataController', ['$scope', '$firebaseObject', '$mdSidenav', '$mdDialog', '$location',
  function($scope,$firebaseObject,$mdSidenav, $mdDialog, $location) {
  var url = "https://luminous-heat-7455.firebaseio.com";
  var ref = new Firebase(url);
  $scope.data = $firebaseObject(ref);
  $scope.lockLeft = true;
  $scope.toggleLeft = function() {
    if ($mdSidenav('left').isOpen()) {
      $mdSidenav('left').close();
      $scope.lockLeft = false;
    } else {
      $mdSidenav('left').toggle();
      $scope.lockLeft = true;
    };
  };

  $scope.showDialog = function(ev,title) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .title(title)
        .content('This information will be made available upon request based on project requirements and need to know.')
        .ariaLabel(title)
        .ok('Thank you!')
        .targetEvent(ev)
    );
  };

  $scope.setRoute = function(route) {
    $location.path(route);
  };

}]);
