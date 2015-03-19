angular
  .module("clientApp")
  .factory('TagService', TagService);

TagService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

function TagService(Resource, LocalStorage, LS, $q) {
  
  var Tag = Resource('tags');
  return {
    get:function() {
      var items = LocalStorage.get(LS.tagsKey);
      var deferred = $q.defer();
      
      if(!items) {
        Tag.getCollection().then(function(data){
          LocalStorage.set(LS.tagsKey, data);
          deferred.resolve(data);
        });
      }
      else {
        deferred.resolve(items);
      }
      return deferred.promise;
    },
    
    getTag:function(id) {
      
      var deferred = $q.defer();
      
      var promise;
      var obj = {'instanceName' : 'tags', 'id' : id};
      promise = Tag.getSingle(obj);
      
      promise.success(function(data){
        var localStorageKey = LS.tagsKey +"." +data.id
        LocalStorage.set(localStorageKey, data);
        deferred.resolve(data);
      }).catch(function(){
        deferred.reject("Something went wrong, try again");
      });
      
      return deferred.promise;
    },
    
    saveTag:function(data) {
      
      data = { "tag":
              {
                "name": "From AngularJS"
              }
             }
      var promise = Tag.save('tags', data).then(function(data) {
        console.log(data);
      });
      return promise;
    }
  };
}
  
