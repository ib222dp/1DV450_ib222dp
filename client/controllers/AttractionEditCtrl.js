angular
  .module("clientApp")
  .controller("AttractionEditController", AttractionEditController);

AttractionEditController.$inject = ['$routeParams', 'AttractionService', 'TagService', 'filterFilter', '$scope'];

function AttractionEditController($routeParams, attractionService, tagService, filterFilter, $scope) {
   
  var vm = this;
  
  var tagPromise = tagService.get();
  
  tagPromise
    .then(function(data){
    vm.tagList = data;
  })
    .catch(function(error) {
    vm.message = error;
  });
  
  //http://stackoverflow.com/questions/14514461/how-can-angularjs-bind-to-list-of-checkbox-values
  vm.selection = [];

  vm.selectedTags = function selectedTags() {
    return filterFilter(vm.tagList, { selected: true });
  };

  
  vm.updateAttraction = function() {
    
    var log = vm.selectedTags();
    
    var tagArray = [];
    angular.forEach(log, function(value, key) {
      this.push(value.id);
}, tagArray);
 
      var updatePromise = attractionService.updateAttraction($routeParams.id, vm.address, tagArray);
  updatePromise.then(function(data){
   vm.message = "Turistattraktionen har uppdaterats";
  }).catch(function(error){
    vm.message = error;
  })
  };  
}