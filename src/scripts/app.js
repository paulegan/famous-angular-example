'use strict';

angular.module('example-app', ['ui.router', 'ngResource', 'famous.angular'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('splash', {
        url: '/',
        templateUrl: 'partials/splash.html',
        controller: 'SplashCtrl'
      })
      .state('itemlist', {
        url: '/items?q',
        templateUrl: 'partials/itemlist.html',
        controller: 'ItemListCtrl'
      })
      .state('itemdetail', {
        url: '/items/:item',
        templateUrl: 'partials/itemdetail.html',
        controller: 'ItemDetailCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
  .run(function ($rootScope, $window, $sce) {
    var doc = $window.document.documentElement;
    $rootScope.screenSize = [doc.clientWidth, doc.clientHeight];
    $rootScope.Math = $window.Math;

    $rootScope.splashContent = $sce.trustAsHtml($window.document.getElementById('main-view').innerHTML);
  });
