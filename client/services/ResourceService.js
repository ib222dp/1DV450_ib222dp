angular
    .module("clientApp")
    .factory('ResourceService', ResourceService);

ResourceService.$inject = ['$http', 'API', '$rootScope'];

function ResourceService($http, API, $rootScope) {

 return function (collectionName) {
  
    var Resource = function(data) {
      angular.extend(this, data);
    }
    
    Resource.getCollection = function() {
        var req = {
            method: 'GET',
            url: API.url +collectionName,
            headers: {
                'Accept': API.format,
                'X-ApiKey': API.key,
            }
        };
      
        return $http(req).then(function(response) {
          var result = [];
   
          angular.forEach(response.data, function(value, key) {
            result[key] = new Resource(value); 
          });
     
          return result;
        });
    };
  
    Resource.getSingle = function(obj) {
        var url;
      url = API.url +obj.instanceName +"/" + obj.id;
       
        var req = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': API.format,
                'X-ApiKey': API.key
            }
        };
      
        return $http(req).success(function(response) {
          return response;
        });
    };
   
    Resource.delete = function(obj) {
      var url;
      url = API.url +obj.instanceName +"/" + obj.id;
 
        var req = {
            method: 'DELETE',
            url: url,
            headers: {
                'Accept': API.format,
                'X-ApiKey': API.key,
                'Authorization': 'Bearer ' + $rootScope.token
            }
        };
      
        return $http(req).success(function(response) {
          return response;
        });
    };
   
     Resource.update = function(obj, attr) {
      var url;
      url = API.url +obj.instanceName +"/" + obj.id;
 
        var req = {
            method: 'PUT',
            url: url,
            headers: {
                'Accept': API.format,
                'X-ApiKey': API.key,
                'Authorization': 'Bearer ' + $rootScope.token
            },
            data: attr
        };
      
        return $http(req).success(function(response) {
          return response;
        });
    };
   
    Resource.create = function(obj, attr) {
       var url;
      url = API.url +obj.instanceName;
      
        var req = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': API.format,
                'X-ApiKey': API.key,
                'Authorization' : 'Bearer ' + $rootScope.token
            },
            data : attr
          };
          return $http(req).success(function(response){
            return response;
          });
      };
   return Resource;
 }
}