'use strict';

angular.module('example-app')
  .controller('ItemListCtrl', function($scope, $state, $famous, $controller, AppConfig, ItemService) {
    var query = $state.params.q || 'example';

    $scope.title = 'Items matching "' + query + '"';

    ItemService.getList({text: query}, function (items) {
      $scope.items = items;
    });

    $scope.itemClickHandler = function (event, itemId) {
      $state.go('itemdetail', {item: itemId});
    };

    $scope.scrollEventHandler = new $famous['famous/core/EventHandler']();

    angular.extend(this, $controller('BaseCtrl', {$scope: $scope, $famous: $famous, AppConfig: AppConfig}));
  });
