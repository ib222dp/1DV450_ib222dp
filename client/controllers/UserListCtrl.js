angular
  .module("clientApp")
  .controller("UserListController", UserListController);

UserListController.$inject = ['UserService'];

function UserListController(userService) {
  var vm = this;
  
  userService.get().then(function(data) {
    console.log(data);
    vm.userList = data;
  });
}