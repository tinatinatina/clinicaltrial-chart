angular.module('BarChart1.directive', [])
  .directive('barChart1', ['$window', '$q', function($window, $q) {

  return {
    restrict: 'C',
    replace: true,
    scope: {
          data: '=',
          label: "@",
          onClick: '&'
    },
    controller: function ($scope, $element, $attrs) {
      console.log(2);

    },
    template: '<div id="container" style="margin: 0 auto">not working</div>',
    link: function(scope, element, attrs) {
      window.onresize = function(){
        scope.$apply();
      };

      scope.$watch(function() {
        return angular.element($window)[0].innerWidth;
      }, function() {
        scope.render(scope.data);
      });
      scope.$watch('data', function(newVals, oldVals) {
        return scope.render(newVals);
        }, true);


      scope.render = function(data) {
            console.log('dataResults', data);
            var search = (Object.keys(data)[0]);
            console.log('data.data', data[search].data);
        var chart = new Highcharts.Chart({
          chart: {
            type: 'column',
            renderTo: 'container'
          },
          title: {
              text: 'Status Chart: '+ search
          },
          subtitle: {
              text: 'Source: clinicaltrial.gov'
          },
          xAxis: {
            categories: data[search].name 
          },
          yAxis: {
              min: 0,
              title: {
                  text: '# of Studies'
              }
          },
          series: [{data: data[search].data}],
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0
              }
          }
        });
      };
    }
  };
}]);