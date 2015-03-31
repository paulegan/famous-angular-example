'use strict';

angular.module('example-app')
  .controller('ItemDetailCtrl', function($scope, $state, ItemService) {
    ItemService.getItem({'photo_id': $state.params.item}, function (item) {
      $scope.item = item;
    });
  });
