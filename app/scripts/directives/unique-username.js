'use strict';

app.directive('uniqueUsername', function($firebase, $firebaseObject, FIREBASE_URL){

  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c){
      var ref = new Firebase(FIREBASE_URL + '/users'),
      sync = $firebaseObject(ref);

      sync.$loaded()
        .then(function(users){
          var usernames = [];
          users.forEach(function(user){
            usernames.push(user.name);
          });
          scope.$watch(attrs.ngModel, function(){
            if(usernames.indexOf(this.last) !== -1){
              c.$setValidity('unique', false);
            }else{
              c.$setValidity('unique', true);
            }
          });
        })
        .catch(function(err){
          console.log('Error checking username: ' + err);
        });
    }
  };
});