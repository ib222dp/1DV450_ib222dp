angular
  .module("clientApp")
  .factory('AttractionService', AttractionService);

  AttractionService.$inject = ['ResourceService', '$q', '$rootScope'];
  
  function AttractionService(Resource, $q, $rootScope) {
    
    var Attraction = Resource('attractions');
    
    return {
      
      //Hämtar alla turistattraktioner
      get:function() {
        
        var deferred = $q.defer();
        
        Attraction.getCollection().then(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
      },
      
      //Hämtar en enskild turistattraktion
      getAttraction:function(id) {
        
        var deferred = $q.defer();
        var promise;
        var obj = {'instanceName' : 'attractions', 'id' : id};
        
        promise = Attraction.getSingle(obj);
        
        promise.success(function(data){
          deferred.resolve(data);
        }).catch(function(){
          deferred.reject("Something went wrong, try again");
        });

        return deferred.promise;
      },
      
      //Tar bort en turistattraktion
      deleteAttraction:function(id){
        
        var deferred = $q.defer();
        var promise;
        var obj = {'instanceName' : 'attractions', 'id' : id};
        
        promise = Attraction.delete(obj);
        
        promise.success(function(data){
          deferred.resolve(data);
        }).catch(function(){
          deferred.reject("Something went wrong, try again");
        });

        return deferred.promise;
      },
      
      //Uppdaterar en turistattraktion
      updateAttraction:function(id, address, tagArray){
        
        var deferred = $q.defer();
        var promise;
        var obj = {'instanceName' : 'attractions', 'id' : id};
        var attr = { "attraction":
                     {
                       "address": address,
                       "tag_ids": tagArray
                     }
                    }
        
        promise = Attraction.update(obj, attr);
        
        promise.success(function(data){
          deferred.resolve(data);
        }).catch(function(){
          deferred.reject("Something went wrong, try again");
        });

        return deferred.promise;
      },
      
      //Skapar en turistattraktion
      createAttraction:function(address, tagArray) {
        
        var deferred = $q.defer();
        var promise;
        var obj = {'instanceName' : 'attractions'};
        var attr = { "attraction":
                    {
                      "address": address,
                      "tag_ids": tagArray 
                    }
                   }
        
        promise = Attraction.create(obj, attr);
        
        promise.success(function(data){
          deferred.resolve(data);
        }).catch(function(){
          deferred.reject("Something went wrong, try again");
        });

        return deferred.promise;
      }
    
    };
  }