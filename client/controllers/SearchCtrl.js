angular
  .module("clientApp")
  .controller("SearchController", SearchController);

SearchController.$inject = ['$http'];

function SearchController($http) {
  
  var vm = this;
  
  //Gör en request till API:et när användaren klickar på Search-knappen
  vm.search = function () {
    var url = "http://jolly-good-highgarden-94-186247.euw1.nitrousbox.com/attractions"
    var config = {
      headers: {
        "X-ApiKey" : "ec5e58d004bcbde0b409bd90593cc28f",
        "Accept" : "application/json"
      },
      params: {
        "address" : vm.searchword
      }
    }
    
    var promise = $http.get(url, config);
    promise.success(function(data, status, headers, config) {
      vm.attractionList = data;
    });
    promise.error(function(data, status, headers, config) {
      vm.message = "Something went wrong, try again";
    });
  };
}