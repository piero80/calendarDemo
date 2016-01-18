exports.inject = function(app) {
  app.controller('MainController', exports.controller);
  return exports.controller;
};

exports.controller = function($scope, Events) {
  $scope.events = Events;
  $scope.eventSources = [];
  $scope.showModal = false;

  $scope.openDialog = function (date) {
    $scope.showModal = !$scope.showModal;
    $scope.title = date.title;
  };

  $scope.uiConfig = {
    calendar:{
      height: 450,
      editable: true,
      header:{
        left: 'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      eventClick:function( date, jsEvent, view){
        $scope.openDialog(date);
      }
    }
  };

  Events.getEvents(function(data){
    $scope.eventSources.push(data);
  });
   
  
};