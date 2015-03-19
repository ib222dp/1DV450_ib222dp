angular
  .module("clientApp")
  .controller("CRUDController", CRUDController);

CRUDController.$inject = ['$http', '$rootScope', '$routeParams', 'UserService', 'AttractionService'];
  
function CRUDController($http, $rootScope, $routeParams, userService, attractionService) { 
  
  var vm = this;
  
  //Hämtar en inloggad användare
  var userPromise = userService.getUser($rootScope.user_id);
  userPromise.then(function(data){
    vm.username = data.username;
    vm.attractions = data.attractions;
  }).catch(function(error){
    vm.message = error;
  })
  
  //Tar bort en turistattraktion
  vm.deleteAttraction = function(id) {
    var deletePromise = attractionService.deleteAttraction(id);
    deletePromise.then(function(data){
      vm.message = "The tourist attraction has been deleted.";
    }).catch(function(error){
      vm.message = error;
    })
  };
}