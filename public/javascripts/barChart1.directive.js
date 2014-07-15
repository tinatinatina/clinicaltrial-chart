angular.module('BarChart1.directive', ['AppController'])
  .directive('barChart1', ['$window', '$q', function($window, $q) {

  return {
    restrict: 'EAC',
    replace: true,
    scope: {
          data: '=',
          onClick: '&'
    },
    controller: function ($scope, $element, $attrs) {
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

        var search = (Object.keys(data)[0]);

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
          series: [{
            name: 'Status',
            data: data[search].data
            }],
          plotOptions: {
              series: {
                  borderWidth: 0,
                  dataLabels: {
                      enabled: true,
                      format: '{point.y}'
                  },
                  point: {
                      events: {
                        click: function() {
                            scope.onClick({item : this.category});
                        }
                      }
                  }
                },
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