angular
  .module("clientApp")
  .factory('AttractionService', AttractionService);

  AttractionService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q', '$rootScope'];
  
  function AttractionService(Resource, LocalStorage, LS, $q, $rootScope) {
    
    var Attraction = Resource('attractions');
    
    return {
      
      //Hämtar alla turistattraktioner
      get:function() {
        
        var items = LocalStorage.get(LS.attractionsKey);
        var deferred = $q.defer();
        
        if(!items) {
          Attraction.getCollection().then(function(data){
            LocalStorage.set(LS.attractionsKey, data);
            deferred.resolve(data);
          });
        }
        else {
          deferred.resolve(items);
        }
        return deferred.promise;
      },
      
      //Hämtar en enskild turistattraktion
      getAttraction:function(id) {
        
        var deferred = $q.defer();
        var promise;
        var obj = {'instanceName' : 'attractions', 'id' : id};
        
        promise = Attraction.getSingle(obj);
        
        promise.success(function(data){
          var localStorageKey = LS.attractionsKey +"." +data.id
          LocalStorage.set(localStorageKey, data);
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