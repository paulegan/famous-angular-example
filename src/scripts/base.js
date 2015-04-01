'use strict';

angular.module('example-app')
  .controller('BaseCtrl', function($scope, $famous, AppConfig) {
    var Transitionable = $famous['famous/transitions/Transitionable'];

    $scope.viewTransition = new Transitionable(0);

    $scope.viewEnterAnimation = function ($done) {
      $scope.viewTransition.set(1, {duration: AppConfig.viewTransitionDuration}, $done);
    };

    $scope.viewLeaveAnimation = function ($done) {
      $scope.viewTransition.set(0, {duration: AppConfig.viewTransitionDuration}, $done);
    };
  });
