angular.module('PhysData', [])
  .service('physData', function($http, $q, xmlParser) {
    $http.defaults.useXDomain = true;
    var getData = function(args, range){
      var deferred = $q.defer();
      var tag = '';
      if(args !== ""){
        tag = args.split(" ").join("+");
      }
      $q.all([
        $http({
        method: 'GET',
        url:"http://www.corsproxy.com/clinicaltrial.gov/ct2/results?term="+tag+"&Search=Searc&displayxml=true&pg="+range[0],
        responseType: 'application/xml'
        }),
        $http({
        method: 'GET',
        url:"http://www.corsproxy.com/clinicaltrial.gov/ct2/results?term="+tag+"&Search=Searc&displayxml=true&pg="+range[1],
        responseType: 'application/xml'
        }),
        $http({
        method: 'GET',
        url:"http://www.corsproxy.com/clinicaltrial.gov/ct2/results?term="+tag+"&Search=Searc&displayxml=true&pg="+range[2],
        responseType: 'application/xml'
        }),
        $http({
        method: 'GET',
        url:"http://www.corsproxy.com/clinicaltrial.gov/ct2/results?term="+tag+"&Search=Searc&displayxml=true&pg="+range[3],
        responseType: 'application/xml'
        }),
        $http({
        method: 'GET',
        url:"http://www.corsproxy.com/clinicaltrial.gov/ct2/results?term="+tag+"&Search=Searc&displayxml=true&pg="+range[4],
        responseType: 'application/xml'
        })
      ])
      .then(function(responses) {
        var combined = {};
        var x2js = new X2JS();
        var searchCountJSON = x2js.xml_str2json(responses[0].data);
        var searchCount = searchCountJSON.search_results._count;
        for (var i = 0; i < responses.length; i++) {
          var json = x2js.xml_str2json(responses[i].data);
          var studies = json.search_results.clinical_study;
          for (var j = 0; j < studies.length; j++) {
            var study = studies[j];
            var studyText = study.status.__text;
            if(combined[studyText]){
              combined[studyText].push(study);
              combined[studyText].count++;
            }else{
              combined[studyText] = [study];
              combined[studyText].count = 1;
            }
          }
        }
          console.log('request complete');
            deferred.resolve([combined, searchCount]);
      });
      return deferred.promise;
    };
  return {getData: getData};
});