'use strict';

angular.module('example-app')
  .controller('ItemListCtrl', function($scope, $rootScope, $state, $famous, $controller, AppConfig, ItemService) {
    var query = $state.params.q || 'example';
    var scrollViewNode = null;

    $scope.headerSize = 50;
    $scope.title = 'Items matching "' + query + '"';

    ItemService.getList({text: query}, function (items) {
      $scope.items = items;
      scrollViewNode = $famous.find('#itemScrollView')[0].renderNode;
      if ($rootScope.selectedItem) {
        scrollViewNode.setPosition($rootScope.selectedItem.scrollPosition);
      }
    });

    $scope.itemClickHandler = function (event, itemId) {
      var surface = $famous.find('#item' + itemId)[0];
      var index = surface.index || 0;
      var scrollOffset = $scope.headerSize - scrollViewNode.getAbsolutePosition();
      var size = surface.renderNode.getSize();
      var position = [0, scrollOffset + index * size[1]];
      $rootScope.selectedItem = {
        id: itemId,
        index: index,
        size: size,
        position: position,
        scrollPosition: scrollViewNode.getAbsolutePosition()
      };
      $state.go('itemdetail', {item: itemId});
    };

    $scope.scrollEventHandler = new $famous['famous/core/EventHandler']();

    angular.extend(this, $controller('BaseCtrl', {$scope: $scope, $famous: $famous, AppConfig: AppConfig}));
  });
