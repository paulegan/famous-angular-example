'use strict';

angular.module('example-app')
  .controller('SplashCtrl', function($state, $timeout) {
    // XXX: Would fetch auth/user data off network here
    $timeout(function () { $state.go('itemlist'); }, 1000);
  });
