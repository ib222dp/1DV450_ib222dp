angular
  .module("clientApp")
  .factory('UserService', UserService); // register the recipe for teh service

  // We need PlayerResource for calling the API
  // localStorageService is an third part service for handling web storage
  // LocalStorageConstants is some constants defined in app.js
  // $q is an angular module for handling promises
  // OBS! No need to do this row but I like to se all dependencies in a nice list
  UserService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

  // Here is the definition of the service
  function UserService(resourceService, localStorage, LS, $q) {
    var User = resourceService('users');
    return {
      get:function() {
        // check if we have it in localstorage - Pretty clumpsy handling but just for example
        var items = localStorage.get(LS.usersKey);

        // Define a promise...this will be used later
        var deferred = $q.defer();

        // If we dont have stuff in localstorage we get it from the API (should maybe have som timestamp for stale problems)
        if(!items) {
          
          // make the call to the api - Get all returns a promise and success will be called if $http succeed
          User.getCollection().then(function(data){

            
            // set the data in LS
            localStorage.set(LS.usersKey, data);
           

            // resolve the data to the caller - They have a promise and now we deliver the response
            deferred.resolve(data);

          });

        }
        else {
          console.log("Getting all the users from the cache");
         // var deferred = $q.defer();
          deferred.resolve(items);
          //return deferred.promise;
        }

        // return the promise to the caller
        return deferred.promise;
      }
    };
  }
        