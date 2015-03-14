angular
  .module("clientApp")
  .controller("TagListController", TagListController);

TagListController.$inject = ['TagService'];

function TagListController(tagService) {
  
  var vm = this;
  
  var tagPromise = tagService.get();
  
  tagPromise
    .then(function(data){
    vm.tagList = data;
  })
    .catch(function(error) {
    console.log("ERROR");
  });
}