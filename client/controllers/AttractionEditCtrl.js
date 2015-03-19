angular
  .module("clientApp")
  .controller("AttractionEditController", AttractionEditController);

AttractionEditController.$inject = ['$routeParams', 'AttractionService'];

function AttractionEditController($routeParams, attractionService) {
   
  var vm = this;
  
  vm.updateAttraction = function() {
 
      var updatePromise = attractionService.updateAttraction($routeParams.id, vm.address);
  updatePromise.then(function(data){
   vm.message = "Turistattraktionen har uppdaterats";
  }).catch(function(error){
    vm.message = error;
    console.log(error);
  })
  };  
}