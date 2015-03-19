angular
.module('tagListDirective', []) 
.directive('tld', function() {  
  return {
    restrict: 'E',  
    replace: true,  
    scope: {
      dirTagLinks: '@'      
    },
    template: htmlTemplate, 
    link: function(scope, iElement, iAttrs, ctrl) {
     
      scope.getTags() 
        .success(function() {   }) 
        .error(function() { });  
    },                                                     
    controller: ['$scope', '$http', function($scope, $http) { 
                                                             
      $scope.getTags = function() {
       
         var req = {
            method: 'GET',
            url: "http://jolly-good-highgarden-94-186247.euw1.nitrousbox.com/tags",
            headers: {
                'Accept': 'application/json',
                'X-ApiKey': "ec5e58d004bcbde0b409bd90593cc28f"
            }
        };
        
        return $http(req).success(function(tags) { 
         $scope.dirTagLinks = tags; 
        }).error(function(error) {
        
        });
      }
    }]
  }
}
);

var htmlTemplate  =  '<tr data-ng-repeat="tag in dirTagLinks">';
htmlTemplate      += '<td>{{tag.name | uppercase }}</td>';          
htmlTemplate      += '<td><a data-ng-href="/tags/{{tag.id}}">More info</a></td>';
htmlTemplate      += '</tr>';