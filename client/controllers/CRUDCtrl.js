angular
  .module("clientApp")
  .controller("CRUDController", CRUDController);

CRUDController.$inject = ['$http', '$rootScope', '$routeParams', 'UserService', 'AttractionService'];
  
function CRUDController($http, $rootScope, $routeParams, userService, attractionService) { 
  
  var vm = this;
  vm.isLoggedIn = $rootScope.isLoggedIn;
  
  //Hämtar en inloggad användare
  if($rootScope.isLoggedIn){
    var userPromise = userService.getUser($rootScope.user_id);
    userPromise.then(function(data){
      vm.username = data.username;
      vm.attractions = data.attractions;
    }).catch(function(error){
      vm.message = error;
    })
  } else {
    vm.message = "You are not logged in.";
  }
  
  //Tar bort en turistattraktion
  if($rootScope.isLoggedIn){
    vm.deleteAttraction = function(id) {
      var deletePromise = attractionService.deleteAttraction(id);
      deletePromise.then(function(data){
        vm.message = "The tourist attraction has been deleted.";
        var userPromise = userService.getUser($rootScope.user_id);
        userPromise.then(function(data){
          vm.username = data.username;
          vm.attractions = data.attractions;
        }).catch(function(error){
          vm.message = error;
        })
      }).catch(function(error){
        vm.message = error;
      })
    }
  } else {
    vm.message = "You are not logged in.";
  }
  
}