(function () {

  'use strict';

  require('angular-route');
  require('angular-animate');

  var app = angular.module('SampleApp', ['ngRoute', 'ngAnimate','ui.calendar','ui.bootstrap']);

  require('./services/events').inject(app);
  require('./directives/modal').inject(app);

  app.config(function ($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "./partials/partial1.html",
          controller: require('./controllers/mainCtrl').inject(app)
        })
        .when("/contact", {
          templateUrl: "./partials/partial2.html",
          controller: require('./controllers/contactCtrl').inject(app)
        })
        .otherwise({
           redirectTo: '/'
        });
    });
  

}());