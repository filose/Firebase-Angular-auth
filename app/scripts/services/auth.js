'use strict';

app.factory('Auth', function($rootScope, $firebase, $firebaseObject, $firebaseAuth, FIREBASE_URL){

  var authRef = new Firebase(FIREBASE_URL),
      authSync = $firebaseAuth(authRef);

  var usersRef = new Firebase(FIREBASE_URL + '/users'),
      usersSync = $firebaseObject(usersRef);

  var authObj = authSync;

  authObj.user = {};
  authObj.createProfile = function(username, user){
    user.name = username;
    user.createdAt = Date.now();
    usersSync[user.uid] = user;
    usersSync.$save();
  };

  authObj.$onAuth(function(authData){
    if(authData){
      var currentUser = authData;
      usersSync.$loaded()
        .then(function(users){
          currentUser.profile = users[authData.uid];
          angular.copy(currentUser, authObj.user);
        })
        .catch(function(err){
          console.log(err);
        });
    }else{
      angular.copy({}, authObj.user);
    }
  });

  return authObj;

});