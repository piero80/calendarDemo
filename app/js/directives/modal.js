exports.inject = function(app){
	app.directive('modal', exports.directive);
	return exports.directive;
};
exports.directive = function(){
	return {
		templateUrl:'partials/modal.html', 
		restrict:'E',
        transclude: true,
      	replace:true,
      	scope:true,
      	link: function (scope, element, attrs) {
      	
      	scope.title  = scope.$parent.title;

      	scope.$watch(attrs.visible, function(value){
	        if(value === true){
	          	$(element).modal('show');
	        }
	        else {
	            $(element).modal('hide');
	        }
        });
      }
	};
};