'use strict';

angular.module('example-app')
  .controller('SplashCtrl', function($scope, $state, $timeout, $famous, $controller, AppConfig) {
    // XXX: Would fetch auth/user data off network here
    $timeout(function () { $state.go('itemlist'); }, 1000);

    angular.extend(this, $controller('BaseCtrl', {$scope: $scope, $famous: $famous, AppConfig: AppConfig}));
    $scope.viewTransition.set(1);
  });
