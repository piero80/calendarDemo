exports.inject = function(app) {
  // require('./../directives/TestDirective').inject(app);
  app.controller('ContactController', exports.controller);
  return exports.controller;
};
exports.controller = function($scope) {

  $scope.contact = "CONTACT";

};