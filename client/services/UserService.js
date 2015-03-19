angular
  .module("clientApp")
  .factory('UserService', UserService); 

UserService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

function UserService(Resource, LocalStorage, LS, $q) {
  
  var User = Resource('users');
  
  return {
    
    //Hämtar alla användare
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
    
    //Hämtar en enskild användare
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
        deferred.reject("Something went wrong, try again");
      });
      
      return deferred.promise;
    }
    
  };
}