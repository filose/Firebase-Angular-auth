'use strict';

app.controller('AuthCtrl', function($scope, $location, Auth, currentAuth){

  if(currentAuth){
    $location.path('/');
  }

  $scope.login = function(email, pass){
    Auth.$authWithPassword({
      email: email,
      password: pass
    })
      .then(function(){
        $location.path('/');
      })
      .catch(function(err){
        console.log(err);
      });
  };

  $scope.register = function(username, email, pass){

    Auth.$createUser({
      email: email,
      password: pass
    })
      // Build user profile
      .then(function(authData){
        Auth.createProfile(username, authData);
      })
      // Login
      .then(function(){
        $scope.login(email, pass);
      })
      .catch(function(err){
        console.log(err);
      });
  };



});