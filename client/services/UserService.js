angular
  .module("clientApp")
  .factory('UserService', UserService); 

UserService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

function UserService(Resource, LocalStorage, LS, $q) {
  var User = Resource('users');
  return {
    get:function() {
      var items = LocalStorage.get(LS.usersKey);
      var deferred = $q.defer();
      
      if(!items) {
        User.getCollection().then(function(data){
          LocalStorage.set(LS.usersKey, data);
          deferred.resolve(data);
        });
      }
      else {
        deferred.resolve(items);
      }
      return deferred.promise;
    },
    
    getUser:function(id) {
      
      var deferred = $q.defer();
      
      var promise;
      var obj = {'instanceName' : 'users', 'id' : id};
      promise = User.getSingle(obj);
      
      promise.success(function(data){
        var localStorageKey = LS.usersKey +"." +data.id
        LocalStorage.set(localStorageKey, data);
        deferred.resolve(data);
      }).catch(function(){
        deferred.reject("Something went wrong with the call");
      });
      
      return deferred.promise;
    },
  };
}