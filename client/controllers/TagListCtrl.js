angular
  .module("clientApp")
  .controller("TagListController", TagListController);

TagListController.$inject = ['TagService'];

function TagListController(tagService) {
  var vm = this;
  
  tagService.get().then(function(data) {
    console.log(data);
    vm.tagList = data;
  });
}