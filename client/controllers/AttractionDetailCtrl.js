angular
  .module("clientApp")
  .controller("AttractionDetailController", AttractionDetailController);

AttractionDetailController.$inject = ['$routeParams', 'AttractionService'];

function AttractionDetailController($routeParams, attractionService) {

  var vm = this;
  
  var attractionPromise = attractionService.getAttraction($routeParams.id);
  attractionPromise.then(function(data){
    vm.address = data.address;
  }).catch(function(error){
    vm.message = error;
    console.log("Error: " +error);
  })
}