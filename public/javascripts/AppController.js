var AppController = angular.module('AppController', ['PhysData','ui.bootstrap']);
 
AppController.controller('homeCTRL', ['$scope', '$http', 'xmlParser', 'physData',
  function ($scope, $http, xmlParser, physData) {
    $scope.search= 'stroke AND brain';
    $scope.dataResults = {};
    $scope.dataResults[$scope.search] = {'name':[], 'data':[]};
    var searchTotal = 0;
    var range = [1, 2, 3, 4, 5];
    function makeDataRequest(searchParam, range){
      physData.getData(searchParam, range).then(function(results){
        $scope.dataResults = {};
        $scope.dataResults[searchParam.toUpperCase()] = {'name':[], 'data':[]};
        console.log(results);
        searchTotal = results[1];
        $scope.results = results[0];
        for (var key in results[0]){
          // var data = {'name':key, 'data':results[0][key].count};
          $scope.dataResults[searchParam.toUpperCase()].name.push(key);
          $scope.dataResults[searchParam.toUpperCase()].data.push(results[0][key].count);
        }

      });
    }
    $scope.submitSearch = function(selected){
      range = [1, 2, 3, 4, 5];
      $scope.search = selected;
      makeDataRequest(selected, range);
    };
    $scope.nextPage = function(){
      for (var i = 0; i < range.length; i++) {
        range[i] += 5;
      }
      makeDataRequest($scope.search, range);
    };
    $scope.prevPage = function(){
      for (var i = 0; i < range.length; i++) {
        range[i] -= 5;
      }
      makeDataRequest($scope.search, range);
    };

    makeDataRequest($scope.search, range);
    
}]);