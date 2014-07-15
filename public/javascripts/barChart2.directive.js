angular.module('BarChart2.directive', [])
  .directive('barChart2', ['$window', '$q', function($window, $q) {

  return {
    restrict: 'EAC',
    replace: true,
    scope: {
          data: '=',
          onClick: '&'
    },
    controller: function ($scope, $element, $attrs) {

    },
    template: '<div id="container2" style="margin: 0 auto">not working</div>',
    link: function(scope, element, attrs) {

      scope.$watch('data', function(newVals, oldVals) {

        return scope.render(newVals);
        }, true);


      scope.render = function(data) {

        var search = (Object.keys(data)[0]);


        var chart = new Highcharts.Chart({
          chart: {
            type: 'column',
            renderTo: 'container2'
          },
          title: {
              text: 'Status Chart: '+ search
          },
          subtitle: {
              text: 'Source: clinicaltrial.gov'
          },
          xAxis: {
            categories: data[search].name ,
            labels: {
                    rotation: -45
                  }
          },
          yAxis: {
              min: 0,
              title: {
                  text: '# of Studies',
              
              }
          },
          series: [{
            name: 'Status',
            data: data[search].data
            }],
          plotOptions: {
              series: {
                  dataLabels: {
                      enabled: true,
                      format: '{point.y}'
                  },
                  point: {
                      events: {
                        click: function() {
                            scope.onClick({item : this.category});
                        }
                      },
                  }
                },
              column: {
                  shadow: false,
                  pointPadding: 0.2,
                  borderWidth: 0,
                  groupPadding: 0

              }
          }
        });
      };
    }
  };
}]);