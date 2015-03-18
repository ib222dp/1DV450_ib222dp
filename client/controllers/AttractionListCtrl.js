angular
  .module("clientApp")
  .controller("AttractionListController", AttractionListController);

AttractionListController.$inject = ["AttractionService"];

function AttractionListController(attractionService) {
 
  var vm = this;

  var attractionPromise = attractionService.get();

  attractionPromise
      .then(function(data){
        vm.attractionList = data;
      })
      .catch(function(error) {
        vm.message = error;
        console.log(error);
      });
}