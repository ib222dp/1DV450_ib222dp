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
        console.log(obj);
      
        //if(resourceInfo.hasOwnProperty('url')) {
          //  url = resourceInfo.url;
        //}
        //else if(resourceInfo.hasOwnProperty('instanceName') && resourceInfo.hasOwnProperty('id')) {
            url = API.url +obj.instanceName +"/" + obj.id;
        //}
        //else {
          //return false;
        //}
 
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
      console.log(obj);
      
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
      console.log(obj);
      
      url = API.url +obj.instanceName +"/" + obj.id;
 
        var req = {
            method: 'PUT',
            url: url,
            headers: {
                'Accept': API.format,
                'X-ApiKey': API.key,
                'Authorization': 'Bearer ' + $rootScope.token
            },
            params: attr
        };
      
        return $http(req).success(function(response) {
          return response;
        });
    };
   
    Resource.save = function(collectionName, data) {
        var req = {
            method: 'POST',
            url: API.url +collectionName,
            headers: {
                'Accept': API.format,
                'X-ApiKey': API.key,
                'Authorization' : "hbhj6765g76g77rt7g9g6r56dvv"
            },
            params: {
               
            },
            data : data
          };
          return $http(req).then(function(response){
            return new Resource(response.data);
          });
      };
      return Resource;
 }
};