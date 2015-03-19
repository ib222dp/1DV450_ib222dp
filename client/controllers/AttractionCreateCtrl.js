angular
  .module("clientApp")
  .controller("AttractionCreateController", AttractionCreateController);

AttractionCreateController.$inject = ['$routeParams', 'AttractionService'];

function AttractionCreateController($routeParams, attractionService) {
   
  var vm = this;
  
  vm.createAttraction = function() {
  
      var createPromise = attractionService.createAttraction(vm.address);
  createPromise.then(function(data){
   vm.message = "Turistattraktionen har skapats";
  }).catch(function(error){
    vm.message = error;
    console.log(error);
  })
  };  
}