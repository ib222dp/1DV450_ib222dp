angular
  .module("clientApp")
  .service('LoginService', LoginService);

LoginService.$inject = ['$http', '$q', '$rootScope'];

function LoginService ($http, $q, $rootScope) {
  
 
  this.loginUser = function (email, password) {
    var request = {
      url: "http://jolly-good-highgarden-94-186247.euw1.nitrousbox.com/login",
      method: "POST",
      headers: {
        "X-ApiKey" : "ec5e58d004bcbde0b409bd90593cc28f",
        "Accept" : "application/json",
      },
      data: {
        "password" : password,
        "email" : email
      }
    }
    
    return $http(request)
      .success(function(data) {
      $rootScope.token = data.auth_token;
      $rootScope.user_id = data.user_id;
    });
  }

}

