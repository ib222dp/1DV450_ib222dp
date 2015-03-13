angular
  .module('clientApp', ['ngRoute', 'LocalStorageModule', 'ngMap'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
        templateUrl: 'partials/map.html',
        controller: 'MapController',
        controllerAs: 'mapctrl'
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
        when('/users', {
          templateUrl: 'partials/user-list.html',
          controller: 'UserListController',
          controllerAs: 'users'
        }).
        when('/tags', {
          templateUrl: 'partials/tag-list.html',
          controller: 'TagListController',
          controllerAs: 'tags'
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
      'usersKey'   : 'u',
      'tagsKey'    : 't'
    });