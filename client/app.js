angular
  .module('clientApp', ['ngRoute', 'LocalStorageModule', 'ngMap', 'tagListDirective'])
  .controller('appCtrl', ['$rootScope', '$location', function ($rootScope, $location) {
    var vm = this;
    vm.isLoggedIn = function () {
      return $rootScope.isLoggedIn;
    }
    
    vm.logout = function () {
      $rootScope.token = null;
      $rootScope.user_id = null;
      $rootScope.isLoggedIn = false;
      $location.path('/');
  }
  }])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController',
        controllerAs: 'loginctrl'
        }).
        when('/attractions', {
          templateUrl: 'partials/attraction-list.html',
          controller: 'AttractionListController',
          controllerAs: 'attractions'
        }).
        when('/attractions/:id', {
          templateUrl: 'partials/attraction-detail.html',
          controller: 'AttractionDetailController',
          controllerAs: 'attraction'
        }).
        when('/attractions/:id/edit', {
          templateUrl: 'partials/attraction-edit.html',
          controller: 'AttractionEditController',
          controllerAs: 'edit'
        }).
        when('/new', {
          templateUrl: 'partials/attraction-new.html',
          controller: 'AttractionCreateController',
          controllerAs: 'create'
        }).
        when('/users', {
          templateUrl: 'partials/user-list.html',
          controller: 'UserListController',
          controllerAs: 'users'
        }).
        when('/users/:id', {
          templateUrl: 'partials/user-detail.html',
          controller: 'UserDetailController',
          controllerAs: 'user'
        }).
       when('/tags', {
          templateUrl: 'partials/tag-list.html',
        }).
        when('/tags/:id', {
          templateUrl: 'partials/tag-detail.html',
          controller: 'TagDetailController',
          controllerAs: 'tag'
        }).
        when('/map', {
         templateUrl: 'partials/map.html',
          controller: 'MapController',
          controllerAs: 'mapctrl'
        }).
        when('/search', {
         templateUrl: 'partials/search.html',
          controller: 'SearchController',
          controllerAs: 'searchctrl'
        }).
       when('/myattractions', {
         templateUrl: 'partials/user-attraction-list.html',
          controller: 'CRUDController',
          controllerAs: 'crud',
          requireLogin: true
        }).
        otherwise({
          redirectTo: '/'
        });
      
      $locationProvider.html5Mode(true);
    }])
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider
          .setPrefix('clientApp')
          .setStorageType('sessionStorage')
          .setNotify(true, true)
    })
    .constant('API', { 
      'key': "ec5e58d004bcbde0b409bd90593cc28f", 
      'url': "http://jolly-good-highgarden-94-186247.euw1.nitrousbox.com/",
      'format': 'application/json'
    })
    .constant('LocalStorageConstants', {
      'attractionsKey' : 'a',
      'tagsKey'    : 't',
      'usersKey'   : 'u'
    });