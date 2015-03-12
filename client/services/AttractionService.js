/*
This service is for handling the players in web storage
We could read directly from localstorage or get it from the server via ResourceService
*/
angular
  .module("clientApp")
  .factory('AttractionService', AttractionService); // register the recipe for teh service

  // We need PlayerResource for calling the API
  // localStorageService is an third part service for handling web storage
  // LocalStorageConstants is some constants defined in app.js
  // $q is an angular module for handling promises
  AttractionService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

  // Here is the definition of teh service
  function AttractionService(Resource, LocalStorage, LS, $q) {
        
    // Here we create the Object from the ResourceService - Just tell the resource name
    var Attraction = Resource('attractions');
    return {
      get:function() {
        // check if we have it in localstorage - Pretty clumpsy handling so far but just for example
        var items = LocalStorage.get(LS.attractionsKey);

        // Define a promise...this will be returned to caller to register on
        var deferred = $q.defer();

        // If we dont have stuff in localstorage we get it from the API (should maybe have som timestamp for stale problems)
        if(!items) {
          
          // make the call to the api - Get all returns a promise and success will be called if $http succeed
          Attraction.getCollection().then(function(data){
            // set the data in LS - Just dump it
            LocalStorage.set(LS.attractionsKey, data);
            // resolve the data to the caller - They have a promise and now we deliver the response
            deferred.resolve(data);
          });
        }
        else {
          console.log("Getting all the attractions from the cache");
          deferred.resolve(items);
        }
        // return the promise to the caller
        return deferred.promise;
      },
      
      // This gets an single player
      getAttraction:function(id) {
        // get the specific player in sessionStorage (we have save all in a bigg array)
        var items = LocalStorage.get(LS.attractionsKey);
        var item = false;

        // check if we have the one with the id in web storage
        if(items) {
          items.forEach(function(obj, index){
            if(obj.id.toString() === id) {
              item = obj; // update item and return
              return true;
            }
          });
        }

        // Create a promise
        var deferred = $q.defer();
        // If we dont have stuff in localstorage we get it
        var promise;
        // We have the item and kan use the HATEOAS, namely the url in the item-object (the players direct url)
        if(item) {
          console.log(item);
          // make the call to the api with the item -> will use the url in the object
          promise = Attraction.getSingle({'url' : item.ref.href});
        }
        else {
          // we trying to get a player but dont have the url - maybe bookmarked in a browser?
          // ignore HATEOAS...it may work if the api is persistant with the url /players/:id
          var obj = {'instanceName' : 'attractions', 'id' : id};
          promise = Attraction.getSingle('attractions', obj);
        }
        // When the call has been made and everything is good (indepentet from how we call the API)
        promise.success(function(data){

          // set the single player in the LS (could have a lot more information than the representation in the list) 
          var localStorageKey = LS.attractionsKey +"." +data.id
          LocalStorage.set(localStorageKey, data);

          // resolve the data to the caller
          deferred.resolve(data);

        }).catch(function(){
          // If something went wrong we have to reject the promise (the caller will catch an error)
          deferred.reject("Something went wrong with the call");
        });

        // return the promise to the caller (this is returned before we got data - async)
        return deferred.promise;
      },
      saveAttraction:function(data) {
        
        data = { "attraction":
                  {
                      "name": "From AngularJS",
                    
                  }
              }
        var promise = Attraction.save('attractions', data).then(function(data) {
          console.log(data);
        });
        return promise;
      }
    
    };
  }