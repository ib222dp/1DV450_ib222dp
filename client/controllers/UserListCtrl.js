// register the controller to the module
angular
  .module("clientApp")
  .controller("UserListController", UserListController); // registrera med namn, funktion

// inject the service
UserListController.$inject = ['UserService'];

function UserListController(userService) {
  var vm = this;
  
  userService.get().then(function(data) {
    console.log(data);
    vm.userList = data;
  });
}