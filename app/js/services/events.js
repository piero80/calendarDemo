
exports.inject = function(app) {
  app.factory('Events', exports.factory);
  return exports.factory;
};
exports.factory = function($http) {
  var _urls = {
    events: 'api/events.json'
  };
  function getEvents (callback) {
  	$http.get(_urls.events).success(function(data){
  		callback(data);
  	}).error(function(){
  		console.log('Error');
  	});
  }
  return {
    getEvents: function(data) {
      getEvents(data);
    }
  };
};
