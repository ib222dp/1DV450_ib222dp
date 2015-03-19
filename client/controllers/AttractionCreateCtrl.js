angular
  .module("clientApp")
  .controller("AttractionCreateController", AttractionCreateController);

AttractionCreateController.$inject = ['$routeParams', 'AttractionService', 'TagService', 'filterFilter'];

function AttractionCreateController($routeParams, attractionService, tagService, filterFilter) {
   
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
  
  //Skapar en ny turistattraktion
  vm.createAttraction = function() {
    var log = vm.selectedTags();
    var tagArray = [];
    
    //Pushar de valda taggarnas id till tagArray
    angular.forEach(log, function(value, key) {
      this.push(value.id);
    }, tagArray);
    
    //Anropar AttractionService
    var createPromise = attractionService.createAttraction(vm.address, tagArray);
    createPromise.then(function(data){
      vm.message = "The tourist attraction has been created";
    }).catch(function(error){
      vm.message = error;
    })
  };
}