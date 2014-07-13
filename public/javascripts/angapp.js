var App = angular.module('App', [
  'AppController',
  'PhysData',
  'BarChart1.directive',
  'ngRoute',
  'xml',
  'ui.bootstrap'
]);

 
App.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider.
      when('/', {
        templateUrl: 'public/views/home.html',
        controller: 'homeCTRL'
      }).
      otherwise({
        redirectTo: '/'
      });

  }]);




