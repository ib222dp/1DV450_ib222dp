// register the controller to the module
angular
  .module("clientApp")
  .controller("AttractionListController", AttractionListController); // registrera med namn, funktion

// inject the service
AttractionListController.$inject = ['AttractionService'];

function AttractionListController(attractionService) {
 
  var vm = this;

  // call the service get a promise back
  var attractionPromise = attractionService.get();

  // then is called when the function delivers
  attractionPromise
      .then(function(data){
        // put the data om the viewModel - binding it to the view
        vm.attractionList = data;
      })
      .catch(function(error) {
        console.log("ERROR");
      });
}