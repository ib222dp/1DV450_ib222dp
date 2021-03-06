angular
  .module("clientApp")
  .controller("UserListController", UserListController);

UserListController.$inject = ['UserService'];

function UserListController(userService) {
  
  var vm = this;
  
  //Anropar UserService för att hämta alla användare
  var userPromise = userService.get();
  userPromise
    .then(function(data){
    vm.userList = data;
  })
    .catch(function(error) {
    vm.message = error;
  });
}