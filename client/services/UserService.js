angular
  .module("clientApp")
  .factory('UserService', UserService); 

  UserService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

  function UserService(resourceService, localStorage, LS, $q) {
    var User = resourceService('users');
    return {
      get:function() {
        var items = localStorage.get(LS.usersKey);

        var deferred = $q.defer();

        if(!items) {
          User.getCollection().then(function(data){
            localStorage.set(LS.usersKey, data);
            deferred.resolve(data);
          });
        }
        else {
          console.log("Getting all the users from the cache");
          deferred.resolve(items);
        }
        return deferred.promise;
      }
    };
  }