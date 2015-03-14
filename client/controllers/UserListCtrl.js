angular
  .module("clientApp")
  .controller("UserListController", UserListController);

UserListController.$inject = ['UserService'];

function UserListController(userService) {
  
  var vm = this;
  
  var userPromise = userService.get();
  
  userPromise
    .then(function(data){
    vm.userList = data;
  })
    .catch(function(error) {
    console.log("ERROR");
  });
}