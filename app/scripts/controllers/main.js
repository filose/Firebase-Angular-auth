'use strict';

app.controller('MainCtrl', function ($scope, Auth){

  $scope.user = Auth.user;

});
