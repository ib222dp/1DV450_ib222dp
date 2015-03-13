angular
  .module("clientApp")
  .controller("MapController", MapController);

MapController.$inject = ["ngMap", "$scope"]

function MapController(ngMap, $scope){
      
  var vm = this;
  var map;
  
  $scope.$on('mapInitialized', function(evt, evtMap) {
    map = evtMap;
    vm.checkPosition = function(e) {
      console.log(e.latLng);
      var marker = new google.maps.Marker({position: e.latLng, map: map});
      map.panTo(e.latLng);
    };
  });
  return vm;
}