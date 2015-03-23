angular
  .module("clientApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ['$http', '$rootScope', '$location', 'LoginService'];

function LoginController($http, $rootScope, $location, loginService) {
  
  var vm = this;                               
  
  vm.login = function (){
    var loginPromise = loginService.loginUser(vm.email, vm.password);
    loginPromise.then(function(data){
      $rootScope.isLoggedIn = true;
      $location.path('/attractions')
    }).catch(function(data){
      vm.message = "Wrong username or password";
      $rootScope.isLoggedIn = false;
    })
  }
}