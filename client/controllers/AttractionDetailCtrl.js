angular
  .module("clientApp")
  .controller("AttractionDetailController", AttractionDetailController);

AttractionDetailController.$inject = ['$routeParams', 'AttractionService'];

function AttractionDetailController($routeParams, attractionService) {

  var vm = this;
  
  var attractionPromise = attractionService.getAttraction($routeParams.id);
  attractionPromise.then(function(data){
    vm.name = data.name;
  }).catch(function(error){
    vm.message = error;
    console.log("Error: " +error);
  })

  

}