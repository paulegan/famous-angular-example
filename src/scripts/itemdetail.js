'use strict';
/*global MouseEvent: true */

angular.module('example-app')
  .controller('ItemDetailCtrl', function($scope, $rootScope, $state, $famous, $timeline, $controller, AppConfig, ItemService) {
    var Easing = $famous['famous/transitions/Easing'];

    // Image header takes up 40% of screen with meta content taking the other 60%
    var headSize = [$rootScope.screenSize[0], Math.floor($rootScope.screenSize[1] * 0.4)];
    var metaSize = [$rootScope.screenSize[0], $rootScope.screenSize[1] - headSize[1]];

    if ($rootScope.selectedItem) {
      // Transition from selectedItem position & size
      var pos = $rootScope.selectedItem.position;
      $scope.viewTranslate = $timeline([
          [0, [pos[0], pos[1], 100], Easing.inQuad],
          [1, [0, 0, 100]]
      ]);
      $scope.headSize = $timeline([
          [0, $rootScope.selectedItem.size],
          [1, headSize]
      ]);
      $scope.metaSize = $timeline([
          [0, [$rootScope.selectedItem.size[0], 0]],
          [1, metaSize]
      ]);
    } else {
      // No transition - stick with fixed position & size
      $scope.viewTranslate = function () {return [0, 0];};
      $scope.headSize = function () {return headSize;};
      $scope.metaSize = function () {return metaSize;};
    }

    ItemService.getItem({'photo_id': $state.params.item}, function (item) {
      $scope.item = item;
    });

    $scope.itemClickHandler = function (event) {
      // activate on custom touch event only
      if (!(event instanceof MouseEvent)) {
        $state.go('itemlist');
      }
    };

    angular.extend(this, $controller('BaseCtrl', {$scope: $scope, $famous: $famous, AppConfig: AppConfig}));
  });
