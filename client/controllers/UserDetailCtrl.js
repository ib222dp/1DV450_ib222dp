angular
  .module("clientApp")
  .controller("UserDetailController", UserDetailController);

UserDetailController.$inject = ['$routeParams', 'UserService'];

function UserDetailController($routeParams, userService) {

  var vm = this;
  
  var userPromise = userService.getUser($routeParams.id);
  userPromise.then(function(data){
    vm.username = data.username;
    vm.attractions = data.attractions;
  }).catch(function(error){
    vm.message = error;
    console.log("Error: " +error);
  })
}