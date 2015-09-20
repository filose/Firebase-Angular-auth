'use strict';
/* global app:true */
/* exported app */

var app = angular
  .module('fbAuthApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .run(function($rootScope, $location){
    $rootScope
      .$on('$routeChangeError', function(event, next, previous, error){
        if(error === 'AUTH_REQUIRED'){
          $location.path('/login');
        }
      });
  })
  .config(function ($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          'currentAuth': function(Auth){
            return Auth.$requireAuth();
          }
        }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
        resolve: {
          'currentAuth': function(Auth){
            return Auth.$waitForAuth();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        resolve: {
          'currentAuth': function(Auth){
            return Auth.$waitForAuth();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE_URL', 'https://ADD-YOUR-FIREBASE-URL-HERE.firebaseio.com/');
