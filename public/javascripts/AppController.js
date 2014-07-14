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
    var searchTotal = 0;
    var range = [1, 2, 3, 4, 5];
    $scope.gridData = [];

    $scope.showClickData = false;
    $scope.showGrid = false;
    $scope.chart1Loading = false;
    $scope.chart2Loading = false;
    $scope.chart3Loading = false;

    function makeDataRequest(searchParam, range){
      $scope.showClickData = false;
      $scope.showGrid = false;
      var data = {};

      physData.getData(searchParam, range).then(function(results){
        data[searchParam.toUpperCase()] = {'name':[], 'data':[]};
        console.log(results);
        searchTotal = results[1];
        $scope.results = results[0];
        for (var key in results[0]){
          data[searchParam.toUpperCase()].name.push(key);
          data[searchParam.toUpperCase()].data.push(results[0][key].count);
        }
        $scope.dataResults = data;
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

    $scope.chart1OnClick = function(item){
      console.log('chart1click');
      $scope.currStatus = item;
      var data = {}
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
        /* make object with conditions and count 
        simultaneously change condition summary to object lookup
        so when clicked, quick loop to see if article.condition.lookupcond = true. */

      }
      for (var key in chart2){
        data[item].name.push(key);
        data[item].data.push(chart2[key]);
      }
      console.log($scope.chart2Data);
      $scope.chart2Data = data;
      // $scope.chart2Loading = false;
      $scope.showClickData = true;
    };
    $scope.chart2OnClick = function(item){
      var grid = [];
      $scope.currCondition = item;
      var group = $scope.results[$scope.currStatus];
      console.log(group);
      for (var i = 0; i < group.length; i++) {
        if(group[i].condList[item]){
          grid.push(group[i]);
        }
      }
      $scope.gridData = grid;
      $scope.showGrid = true;
    };



    makeDataRequest($scope.search, range);

    
}]);