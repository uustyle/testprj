'use strict';

var myApp = angular.module('MyApp',['ui.router']);

myApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home',{
    url:'/',
    views:{
      panel:{
        templateUrl:'../html/home.html'
      }
    }
  }).state('sub',{
    url:'/sub',
    views:{
      panel:{
        templateUrl:'../html/sub.html'
      }
    }
  });
}])
.constant('configuration', {
    // apiUrl変数を定義する
    apiUrl: 'http://localhost:9000'
  })
;
