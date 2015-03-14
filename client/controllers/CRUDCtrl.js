angular
  .module("clientApp")
  .controller("CRUDController", CRUDController);

CRUDController.$inject = ['$http'];
  
function CRUDController($http) { 
  var vm = this;
  var getConfig = {
    headers: {
     "X-ApiKey" : "ec5e58d004bcbde0b409bd90593cc28f",
     "Accept"   : "application/json"
    }
  }
  
  $http.get("http://jolly-good-highgarden-94-186247.euw1.nitrousbox.com/users/:id", getConfig).success(function(data) {
    vm.user = data;
  }).error(function(data, status) {
    console.log(data);
    vm.alert = data.error;
  });
}