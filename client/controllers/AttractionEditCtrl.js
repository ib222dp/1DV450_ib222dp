angular
  .module("clientApp")
  .controller("AttractionEditController", AttractionEditController);

AttractionEditController.$inject = ['$routeParams', 'AttractionService'];

function AttractionEditController($routeParams, attractionService) {
   
  var vm = this;
  
  vm.updateAttraction = function() {
    
      var address = {'address' : vm.address};
      var updatePromise = attractionService.updateAttraction($routeParams.id, address);
  updatePromise.then(function(data){
   vm.message = "Turistattraktionen har uppdaterats";
  }).catch(function(error){
    vm.message = error;
    console.log(error);
  })
  };  
}