var AppController = angular.module('AppController', ['PhysData','ui.bootstrap']);
 
AppController.controller('homeCTRL', ['$scope', '$http', 'xmlParser', 'physData',
  function ($scope, $http, xmlParser, physData) {
    $scope.search= 'stroke AND brain';
    $scope.dataResults = {};
    $scope.dataResults[$scope.search] = {'name':[], 'data':[]};
    $scope.chart2Data = {};
    $scope.currStatus = null;
    $scope.currCondition = null;
    $scope.chart2Data[$scope.currStatus] = {'name':[], 'data':[]};
    $scope.searchTotal = 0;
    $scope.range = [1, 2, 3, 4, 5];
    $scope.gridData = [];

    $scope.showClickData = false;
    $scope.showGrid = false;
    $scope.error = false;

    function makeDataRequest(searchParam, range){
      $scope.error = false;
      $scope.showClickData = false;
      $scope.showGrid = false;
      var data = {};

    /////Makes API call and modifies results for first chart data/////////
      physData.getData(searchParam, range).then(function(results){
        data[searchParam.toUpperCase()] = {'name':[], 'data':[]};
        if(results === 'ERROR'){
          $scope.error = true;

        }
        $scope.searchTotal = results[1];
        $scope.results = results[0];
        for (var key in results[0]){
          data[searchParam.toUpperCase()].name.push(key);
          data[searchParam.toUpperCase()].data.push(results[0][key].count);
        }
        $scope.dataResults = data;
      });
      $scope.$apply();
    }

    $scope.submitSearch = function(selected){
      $scope.search = selected;
      makeDataRequest(selected, $scope.range);
    };

    ////////Pagination functions///////////////////
    $scope.nextPage = function(){
      for (var i = 0; i < $scope.range.length; i++) {
        $scope.range[i] += 5;
      }
      makeDataRequest($scope.search, $scope.range);
    };
    $scope.prevPage = function(){
      for (var i = 0; i < $scope.range.length; i++) {
        $scope.range[i] -= 5;
      }
      makeDataRequest($scope.search, $scope.range);
    };

    /////////Modifies data for chart 2 //////////

    $scope.chart1OnClick = function(item){
      $scope.currStatus = item;
      var data = {};
      data[item] = {'name':[], 'data':[]};
      var chart2 = {};
      for (var i = 0; i < $scope.results[item].length; i++) {
        var article = $scope.results[item][i];
        article.condList = {};
        var cond = article.condition_summary.split('; ');
        for (var j = 0; j < cond.length; j++) {
          article.condList[cond[j]] = true;
          if(chart2[cond[j]]){
            chart2[cond[j]] += 1;
          }else{
            chart2[cond[j]] = 1;
          }
        }
      }
      for (var key in chart2){
        data[item].name.push(key);
        data[item].data.push(chart2[key]);
      }
      $scope.showClickData = true;
      $scope.chart2Data = data;
      $scope.$apply();
    };

    //////modifies data for grid///////////

    $scope.chart2OnClick = function(item){
      $scope.showGrid = true;
      var grid = [];
      $scope.currCondition = item;
      var group = $scope.results[$scope.currStatus];
      for (var i = 0; i < group.length; i++) {
        if(group[i].condList[item]){
          grid.push(group[i]);
        }
      }
      $scope.gridData = grid;
      $scope.$apply();

    };

    ////////functions for close buttons///////
    $scope.hideGrid = function(){
      $scope.showGrid = false;
      $scope.$apply();
    };
    $scope.hideChart = function(){
      $scope.showClickData = false;
      $scope.$apply();
    };

    makeDataRequest($scope.search, $scope.range);

    
}]);