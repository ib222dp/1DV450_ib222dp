angular
  .module("clientApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ['$http', '$rootScope'];

function LoginController($http, $rootScope) {
  var vm = this;                               
  $rootScope.isLoggedIn = false;
  
  vm.login = function() {
    var data = {'email' : vm.email, 'password': vm.password};
    var url = "http://jolly-good-highgarden-94-186247.euw1.nitrousbox.com/login"
    var config = {
      headers: {
        "X-ApiKey" : "ec5e58d004bcbde0b409bd90593cc28f",
        "Accept" : "application/json"
      }
    }
    
    var promise = $http.post(url, data, config);
    promise.success(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      console.log(config)
      $rootScope.token = data.auth_token;
      $rootScope.user_id = data.user_id;
      $rootScope.isLoggedIn = true;
    });
    
    promise.error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      console.log(config)
      $rootScope.token = data.error;
      $rootScope.isLoggedIn = false;
    });
  };
}