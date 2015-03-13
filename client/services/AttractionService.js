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
          console.log("Getting all the attractions from the cache");
          deferred.resolve(items);
        }
        return deferred.promise;
      },
      
      getAttraction:function(id) {
        var items = LocalStorage.get(LS.attractionsKey);
        var item = false;

        if(items) {
          items.forEach(function(obj, index){
            if(obj.id.toString() === id) {
              item = obj;
              return true;
            }
          });
        }

        var deferred = $q.defer();
   
        var promise;
      
        if(item) {
          console.log(item);
          promise = Attraction.getSingle({'url' : item.ref.href});
        }
        else {
          var obj = {'instanceName' : 'attractions', 'id' : id};
          promise = Attraction.getSingle('attractions', obj);
        }
     
        promise.success(function(data){
          var localStorageKey = LS.attractionsKey +"." +data.id
          LocalStorage.set(localStorageKey, data);
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