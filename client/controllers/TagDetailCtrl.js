angular
  .module("clientApp")
  .controller("TagDetailController", TagDetailController);

TagDetailController.$inject = ['$routeParams', 'TagService'];

function TagDetailController($routeParams, tagService) {

  var vm = this;
  
  var tagPromise = tagService.getTag($routeParams.id);
  tagPromise.then(function(data){
    vm.name = data.name;
    vm.attractions = data.attractions;
  }).catch(function(error){
    vm.message = error;
    console.log(error);
  })
}