angular
  .module("clientApp")
  .controller("MapController", MapController);
              
MapController.$inject = ['$scope', 'AttractionService'];

function MapController ($scope, attractionService){
  
  //Hämtar turistattraktioner för att visas på kartan (ngMap injekteras i app.js)
  var attractionPromise = attractionService.get();
  attractionPromise
    .then(function(data){
    $scope.attractionList = data;
  })
    .catch(function(error) {
    console.log(error);
  });
}