'use strict';

angular.module('example-app')
  .controller('ItemDetailCtrl', function($scope, $state, $famous, $controller, AppConfig, ItemService) {

    ItemService.getItem({'photo_id': $state.params.item}, function (item) {
      $scope.item = item;
    });

    angular.extend(this, $controller('BaseCtrl', {$scope: $scope, $famous: $famous, AppConfig: AppConfig}));
  });
