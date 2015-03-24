angular
  .module("clientApp")
  .controller("AttractionEditController", AttractionEditController);

AttractionEditController.$inject = ['$routeParams', '$rootScope', 'AttractionService', 'TagService', 'filterFilter'];

function AttractionEditController($routeParams, $rootScope, attractionService, tagService, filterFilter) {
   
  var vm = this;
  vm.isLoggedIn = $rootScope.isLoggedIn;
  
  //Hämtar taggar för checkbox-listan
   if ($rootScope.isLoggedIn) {
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
       if (!vm.address){
         vm.message = "Please enter an address";
       } else { 
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
       }
     };
   } else {
     vm.message = "You are not logged in.";
   }

}