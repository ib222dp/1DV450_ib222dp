angular
  .module("clientApp")
  .controller("AttractionListController", AttractionListController);

AttractionListController.$inject = ["AttractionService"];

function AttractionListController(attractionService) {
 
  var vm = this;

  //Anropar AttractionService för att hämta alla turistattraktioner
  var attractionPromise = attractionService.get();
  attractionPromise
    .then(function(data){
    vm.attractionList = data;
  })
    .catch(function(error) {
    vm.message = error;
  });
}