'use strict';

app.controller('NavCtrl', function ($scope, $location, Auth){

  $scope.signedIn = function(){
    return Auth.$getAuth();
  };

  $scope.logout = function(){
    Auth.$unauth();
    console.log('Logged out');
    $location.path('/login');
  };

});