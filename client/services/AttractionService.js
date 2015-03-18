angular
  .module("clientApp")
  .factory('AttractionService', AttractionService);

  AttractionService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];
  
  function AttractionService(Resource, LocalStorage, LS, $q) {
    
    var Attraction = Resource('attractions');
    return {
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
          deferred.reject("Something went wrong with the call");
        });

        return deferred.promise;
      },
      
      deleteAttraction:function(id){
          var deferred = $q.defer();
        
        var promise;
        var obj = {'instanceName' : 'attractions', 'id' : id};
        promise = Attraction.delete(obj);
        
        promise.success(function(data){
          deferred.resolve(data);
        }).catch(function(){
          deferred.reject("Something went wrong with the call");
        });

        return deferred.promise;
      },
      
       updateAttraction:function(id, address){
          var deferred = $q.defer();
        
        var promise;
        var obj = {'instanceName' : 'attractions', 'id' : id};
         var attr = { "attraction":
                  {
                      "address": address,
                      "user_id": id
                  }
              }
        promise = Attraction.update(obj, attr);
        
        promise.success(function(data){
          deferred.resolve(data);
        }).catch(function(){
          deferred.reject("Something went wrong with the call");
        });

        return deferred.promise;
      },
      
      saveAttraction:function(data) {
        
        data = { "attraction":
                  {
                      "name": "From AngularJS"
                  }
              }
        var promise = Attraction.save('attractions', data).then(function(data) {
          console.log(data);
        });
        return promise;
      }
    };
  }