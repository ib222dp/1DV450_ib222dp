angular
  .module("clientApp")
  .controller("CRUDController", CRUDController);

CRUDController.$inject = ['$http', '$rootScope', 'UserService', 'AttractionService', '$routeParams'];
  
function CRUDController($http, $rootScope, userService, attractionService, $routeParams) { 
  
  var vm = this;
  
  var userPromise = userService.getUser($rootScope.user_id);
  userPromise.then(function(data){
    vm.username = data.username;
    vm.attractions = data.attractions;
  }).catch(function(error){
    vm.message = error;
  })
  
  vm.deleteAttraction = function(id) {
      var deletePromise = attractionService.deleteAttraction(id);
  deletePromise.then(function(data){
   vm.message = "Turistattraktionen har tagits bort";
  }).catch(function(error){
    vm.message = error;
  })
};  
}