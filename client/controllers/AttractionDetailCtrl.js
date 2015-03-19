angular
  .module("clientApp")
  .controller("AttractionDetailController", AttractionDetailController);

AttractionDetailController.$inject = ['$routeParams', 'AttractionService'];

function AttractionDetailController($routeParams, attractionService) {

  var vm = this;
  
  //Anropar AttractionService för att hämta den begärda turistattraktionen
  var attractionPromise = attractionService.getAttraction($routeParams.id);
  attractionPromise.then(function(data){
    vm.address = data.address;
    vm.tags = data.tags;
  }).catch(function(error){
    vm.message = error;
  })
}