angular
  .module("clientApp")
  .controller("AttractionEditController", AttractionEditController);

AttractionEditController.$inject = ['$routeParams', 'AttractionService', 'TagService', 'filterFilter'];

function AttractionEditController($routeParams, attractionService, tagService, filterFilter) {
   
  var vm = this;
  
  //Hämtar taggar för checkbox-listan
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

  //Uppdaterar en turistattraktion
  vm.updateAttraction = function() {
    var log = vm.selectedTags();
    var tagArray = [];
    
     //Pushar de valda taggarnas id till tagArray
    angular.forEach(log, function(value, key) {
      this.push(value.id);
    }, tagArray);
    
    //Anropar AttractionService
    var updatePromise = attractionService.updateAttraction($routeParams.id, vm.address, tagArray);
    updatePromise.then(function(data){
      vm.message = "The tourist attraction has been updated";
    }).catch(function(error){
      vm.message = error;
    })
  };
}