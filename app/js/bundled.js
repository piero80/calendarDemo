(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.inject = function(app) {
  // require('./../directives/TestDirective').inject(app);
  app.controller('ContactController', exports.controller);
  return exports.controller;
};
exports.controller = function($scope) {

  $scope.contact = "CONTACT";

};
}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/controllers/contactCtrl.js","/controllers")
},{"buffer":10,"oMfpAn":13}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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
    $scope.title  = data.title;
  });
   
  
};
}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/controllers/mainCtrl.js","/controllers")
},{"buffer":10,"oMfpAn":13}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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
}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/directives/modal.js","/directives")
},{"buffer":10,"oMfpAn":13}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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
        .when("/home", {
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
}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_905da315.js","/")
},{"./controllers/contactCtrl":1,"./controllers/mainCtrl":2,"./directives/modal":3,"./services/events":5,"angular-animate":7,"angular-route":9,"buffer":10,"oMfpAn":13}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){

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

}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/events.js","/services")
},{"buffer":10,"oMfpAn":13}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * @license AngularJS v1.4.8
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

/* jshint ignore:start */
var noop        = angular.noop;
var extend      = angular.extend;
var jqLite      = angular.element;
var forEach     = angular.forEach;
var isArray     = angular.isArray;
var isString    = angular.isString;
var isObject    = angular.isObject;
var isUndefined = angular.isUndefined;
var isDefined   = angular.isDefined;
var isFunction  = angular.isFunction;
var isElement   = angular.isElement;

var ELEMENT_NODE = 1;
var COMMENT_NODE = 8;

var ADD_CLASS_SUFFIX = '-add';
var REMOVE_CLASS_SUFFIX = '-remove';
var EVENT_CLASS_PREFIX = 'ng-';
var ACTIVE_CLASS_SUFFIX = '-active';

var NG_ANIMATE_CLASSNAME = 'ng-animate';
var NG_ANIMATE_CHILDREN_DATA = '$$ngAnimateChildren';

// Detect proper transitionend/animationend event names.
var CSS_PREFIX = '', TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;

// If unprefixed events are not supported but webkit-prefixed are, use the latter.
// Otherwise, just use W3C names, browsers not supporting them at all will just ignore them.
// Note: Chrome implements `window.onwebkitanimationend` and doesn't implement `window.onanimationend`
// but at the same time dispatches the `animationend` event and not `webkitAnimationEnd`.
// Register both events in case `window.onanimationend` is not supported because of that,
// do the same for `transitionend` as Safari is likely to exhibit similar behavior.
// Also, the only modern browser that uses vendor prefixes for transitions/keyframes is webkit
// therefore there is no reason to test anymore for other vendor prefixes:
// http://caniuse.com/#search=transition
if (isUndefined(window.ontransitionend) && isDefined(window.onwebkittransitionend)) {
  CSS_PREFIX = '-webkit-';
  TRANSITION_PROP = 'WebkitTransition';
  TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';
} else {
  TRANSITION_PROP = 'transition';
  TRANSITIONEND_EVENT = 'transitionend';
}

if (isUndefined(window.onanimationend) && isDefined(window.onwebkitanimationend)) {
  CSS_PREFIX = '-webkit-';
  ANIMATION_PROP = 'WebkitAnimation';
  ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';
} else {
  ANIMATION_PROP = 'animation';
  ANIMATIONEND_EVENT = 'animationend';
}

var DURATION_KEY = 'Duration';
var PROPERTY_KEY = 'Property';
var DELAY_KEY = 'Delay';
var TIMING_KEY = 'TimingFunction';
var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';
var ANIMATION_PLAYSTATE_KEY = 'PlayState';
var SAFE_FAST_FORWARD_DURATION_VALUE = 9999;

var ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY;
var ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY;
var TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY;
var TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY;

var isPromiseLike = function(p) {
  return p && p.then ? true : false;
};

function assertArg(arg, name, reason) {
  if (!arg) {
    throw ngMinErr('areq', "Argument '{0}' is {1}", (name || '?'), (reason || "required"));
  }
  return arg;
}

function mergeClasses(a,b) {
  if (!a && !b) return '';
  if (!a) return b;
  if (!b) return a;
  if (isArray(a)) a = a.join(' ');
  if (isArray(b)) b = b.join(' ');
  return a + ' ' + b;
}

function packageStyles(options) {
  var styles = {};
  if (options && (options.to || options.from)) {
    styles.to = options.to;
    styles.from = options.from;
  }
  return styles;
}

function pendClasses(classes, fix, isPrefix) {
  var className = '';
  classes = isArray(classes)
      ? classes
      : classes && isString(classes) && classes.length
          ? classes.split(/\s+/)
          : [];
  forEach(classes, function(klass, i) {
    if (klass && klass.length > 0) {
      className += (i > 0) ? ' ' : '';
      className += isPrefix ? fix + klass
                            : klass + fix;
    }
  });
  return className;
}

function removeFromArray(arr, val) {
  var index = arr.indexOf(val);
  if (val >= 0) {
    arr.splice(index, 1);
  }
}

function stripCommentsFromElement(element) {
  if (element instanceof jqLite) {
    switch (element.length) {
      case 0:
        return [];
        break;

      case 1:
        // there is no point of stripping anything if the element
        // is the only element within the jqLite wrapper.
        // (it's important that we retain the element instance.)
        if (element[0].nodeType === ELEMENT_NODE) {
          return element;
        }
        break;

      default:
        return jqLite(extractElementNode(element));
        break;
    }
  }

  if (element.nodeType === ELEMENT_NODE) {
    return jqLite(element);
  }
}

function extractElementNode(element) {
  if (!element[0]) return element;
  for (var i = 0; i < element.length; i++) {
    var elm = element[i];
    if (elm.nodeType == ELEMENT_NODE) {
      return elm;
    }
  }
}

function $$addClass($$jqLite, element, className) {
  forEach(element, function(elm) {
    $$jqLite.addClass(elm, className);
  });
}

function $$removeClass($$jqLite, element, className) {
  forEach(element, function(elm) {
    $$jqLite.removeClass(elm, className);
  });
}

function applyAnimationClassesFactory($$jqLite) {
  return function(element, options) {
    if (options.addClass) {
      $$addClass($$jqLite, element, options.addClass);
      options.addClass = null;
    }
    if (options.removeClass) {
      $$removeClass($$jqLite, element, options.removeClass);
      options.removeClass = null;
    }
  }
}

function prepareAnimationOptions(options) {
  options = options || {};
  if (!options.$$prepared) {
    var domOperation = options.domOperation || noop;
    options.domOperation = function() {
      options.$$domOperationFired = true;
      domOperation();
      domOperation = noop;
    };
    options.$$prepared = true;
  }
  return options;
}

function applyAnimationStyles(element, options) {
  applyAnimationFromStyles(element, options);
  applyAnimationToStyles(element, options);
}

function applyAnimationFromStyles(element, options) {
  if (options.from) {
    element.css(options.from);
    options.from = null;
  }
}

function applyAnimationToStyles(element, options) {
  if (options.to) {
    element.css(options.to);
    options.to = null;
  }
}

function mergeAnimationOptions(element, target, newOptions) {
  var toAdd = (target.addClass || '') + ' ' + (newOptions.addClass || '');
  var toRemove = (target.removeClass || '') + ' ' + (newOptions.removeClass || '');
  var classes = resolveElementClasses(element.attr('class'), toAdd, toRemove);

  if (newOptions.preparationClasses) {
    target.preparationClasses = concatWithSpace(newOptions.preparationClasses, target.preparationClasses);
    delete newOptions.preparationClasses;
  }

  // noop is basically when there is no callback; otherwise something has been set
  var realDomOperation = target.domOperation !== noop ? target.domOperation : null;

  extend(target, newOptions);

  // TODO(matsko or sreeramu): proper fix is to maintain all animation callback in array and call at last,but now only leave has the callback so no issue with this.
  if (realDomOperation) {
    target.domOperation = realDomOperation;
  }

  if (classes.addClass) {
    target.addClass = classes.addClass;
  } else {
    target.addClass = null;
  }

  if (classes.removeClass) {
    target.removeClass = classes.removeClass;
  } else {
    target.removeClass = null;
  }

  return target;
}

function resolveElementClasses(existing, toAdd, toRemove) {
  var ADD_CLASS = 1;
  var REMOVE_CLASS = -1;

  var flags = {};
  existing = splitClassesToLookup(existing);

  toAdd = splitClassesToLookup(toAdd);
  forEach(toAdd, function(value, key) {
    flags[key] = ADD_CLASS;
  });

  toRemove = splitClassesToLookup(toRemove);
  forEach(toRemove, function(value, key) {
    flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;
  });

  var classes = {
    addClass: '',
    removeClass: ''
  };

  forEach(flags, function(val, klass) {
    var prop, allow;
    if (val === ADD_CLASS) {
      prop = 'addClass';
      allow = !existing[klass];
    } else if (val === REMOVE_CLASS) {
      prop = 'removeClass';
      allow = existing[klass];
    }
    if (allow) {
      if (classes[prop].length) {
        classes[prop] += ' ';
      }
      classes[prop] += klass;
    }
  });

  function splitClassesToLookup(classes) {
    if (isString(classes)) {
      classes = classes.split(' ');
    }

    var obj = {};
    forEach(classes, function(klass) {
      // sometimes the split leaves empty string values
      // incase extra spaces were applied to the options
      if (klass.length) {
        obj[klass] = true;
      }
    });
    return obj;
  }

  return classes;
}

function getDomNode(element) {
  return (element instanceof angular.element) ? element[0] : element;
}

function applyGeneratedPreparationClasses(element, event, options) {
  var classes = '';
  if (event) {
    classes = pendClasses(event, EVENT_CLASS_PREFIX, true);
  }
  if (options.addClass) {
    classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX));
  }
  if (options.removeClass) {
    classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX));
  }
  if (classes.length) {
    options.preparationClasses = classes;
    element.addClass(classes);
  }
}

function clearGeneratedClasses(element, options) {
  if (options.preparationClasses) {
    element.removeClass(options.preparationClasses);
    options.preparationClasses = null;
  }
  if (options.activeClasses) {
    element.removeClass(options.activeClasses);
    options.activeClasses = null;
  }
}

function blockTransitions(node, duration) {
  // we use a negative delay value since it performs blocking
  // yet it doesn't kill any existing transitions running on the
  // same element which makes this safe for class-based animations
  var value = duration ? '-' + duration + 's' : '';
  applyInlineStyle(node, [TRANSITION_DELAY_PROP, value]);
  return [TRANSITION_DELAY_PROP, value];
}

function blockKeyframeAnimations(node, applyBlock) {
  var value = applyBlock ? 'paused' : '';
  var key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;
  applyInlineStyle(node, [key, value]);
  return [key, value];
}

function applyInlineStyle(node, styleTuple) {
  var prop = styleTuple[0];
  var value = styleTuple[1];
  node.style[prop] = value;
}

function concatWithSpace(a,b) {
  if (!a) return b;
  if (!b) return a;
  return a + ' ' + b;
}

var $$rAFSchedulerFactory = ['$$rAF', function($$rAF) {
  var queue, cancelFn;

  function scheduler(tasks) {
    // we make a copy since RAFScheduler mutates the state
    // of the passed in array variable and this would be difficult
    // to track down on the outside code
    queue = queue.concat(tasks);
    nextTick();
  }

  queue = scheduler.queue = [];

  /* waitUntilQuiet does two things:
   * 1. It will run the FINAL `fn` value only when an uncancelled RAF has passed through
   * 2. It will delay the next wave of tasks from running until the quiet `fn` has run.
   *
   * The motivation here is that animation code can request more time from the scheduler
   * before the next wave runs. This allows for certain DOM properties such as classes to
   * be resolved in time for the next animation to run.
   */
  scheduler.waitUntilQuiet = function(fn) {
    if (cancelFn) cancelFn();

    cancelFn = $$rAF(function() {
      cancelFn = null;
      fn();
      nextTick();
    });
  };

  return scheduler;

  function nextTick() {
    if (!queue.length) return;

    var items = queue.shift();
    for (var i = 0; i < items.length; i++) {
      items[i]();
    }

    if (!cancelFn) {
      $$rAF(function() {
        if (!cancelFn) nextTick();
      });
    }
  }
}];

var $$AnimateChildrenDirective = [function() {
  return function(scope, element, attrs) {
    var val = attrs.ngAnimateChildren;
    if (angular.isString(val) && val.length === 0) { //empty attribute
      element.data(NG_ANIMATE_CHILDREN_DATA, true);
    } else {
      attrs.$observe('ngAnimateChildren', function(value) {
        value = value === 'on' || value === 'true';
        element.data(NG_ANIMATE_CHILDREN_DATA, value);
      });
    }
  };
}];

var ANIMATE_TIMER_KEY = '$$animateCss';

/**
 * @ngdoc service
 * @name $animateCss
 * @kind object
 *
 * @description
 * The `$animateCss` service is a useful utility to trigger customized CSS-based transitions/keyframes
 * from a JavaScript-based animation or directly from a directive. The purpose of `$animateCss` is NOT
 * to side-step how `$animate` and ngAnimate work, but the goal is to allow pre-existing animations or
 * directives to create more complex animations that can be purely driven using CSS code.
 *
 * Note that only browsers that support CSS transitions and/or keyframe animations are capable of
 * rendering animations triggered via `$animateCss` (bad news for IE9 and lower).
 *
 * ## Usage
 * Once again, `$animateCss` is designed to be used inside of a registered JavaScript animation that
 * is powered by ngAnimate. It is possible to use `$animateCss` directly inside of a directive, however,
 * any automatic control over cancelling animations and/or preventing animations from being run on
 * child elements will not be handled by Angular. For this to work as expected, please use `$animate` to
 * trigger the animation and then setup a JavaScript animation that injects `$animateCss` to trigger
 * the CSS animation.
 *
 * The example below shows how we can create a folding animation on an element using `ng-if`:
 *
 * ```html
 * <!-- notice the `fold-animation` CSS class -->
 * <div ng-if="onOff" class="fold-animation">
 *   This element will go BOOM
 * </div>
 * <button ng-click="onOff=true">Fold In</button>
 * ```
 *
 * Now we create the **JavaScript animation** that will trigger the CSS transition:
 *
 * ```js
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element, doneFn) {
 *       var height = element[0].offsetHeight;
 *       return $animateCss(element, {
 *         from: { height:'0px' },
 *         to: { height:height + 'px' },
 *         duration: 1 // one second
 *       });
 *     }
 *   }
 * }]);
 * ```
 *
 * ## More Advanced Uses
 *
 * `$animateCss` is the underlying code that ngAnimate uses to power **CSS-based animations** behind the scenes. Therefore CSS hooks
 * like `.ng-EVENT`, `.ng-EVENT-active`, `.ng-EVENT-stagger` are all features that can be triggered using `$animateCss` via JavaScript code.
 *
 * This also means that just about any combination of adding classes, removing classes, setting styles, dynamically setting a keyframe animation,
 * applying a hardcoded duration or delay value, changing the animation easing or applying a stagger animation are all options that work with
 * `$animateCss`. The service itself is smart enough to figure out the combination of options and examine the element styling properties in order
 * to provide a working animation that will run in CSS.
 *
 * The example below showcases a more advanced version of the `.fold-animation` from the example above:
 *
 * ```js
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element, doneFn) {
 *       var height = element[0].offsetHeight;
 *       return $animateCss(element, {
 *         addClass: 'red large-text pulse-twice',
 *         easing: 'ease-out',
 *         from: { height:'0px' },
 *         to: { height:height + 'px' },
 *         duration: 1 // one second
 *       });
 *     }
 *   }
 * }]);
 * ```
 *
 * Since we're adding/removing CSS classes then the CSS transition will also pick those up:
 *
 * ```css
 * /&#42; since a hardcoded duration value of 1 was provided in the JavaScript animation code,
 * the CSS classes below will be transitioned despite them being defined as regular CSS classes &#42;/
 * .red { background:red; }
 * .large-text { font-size:20px; }
 *
 * /&#42; we can also use a keyframe animation and $animateCss will make it work alongside the transition &#42;/
 * .pulse-twice {
 *   animation: 0.5s pulse linear 2;
 *   -webkit-animation: 0.5s pulse linear 2;
 * }
 *
 * @keyframes pulse {
 *   from { transform: scale(0.5); }
 *   to { transform: scale(1.5); }
 * }
 *
 * @-webkit-keyframes pulse {
 *   from { -webkit-transform: scale(0.5); }
 *   to { -webkit-transform: scale(1.5); }
 * }
 * ```
 *
 * Given this complex combination of CSS classes, styles and options, `$animateCss` will figure everything out and make the animation happen.
 *
 * ## How the Options are handled
 *
 * `$animateCss` is very versatile and intelligent when it comes to figuring out what configurations to apply to the element to ensure the animation
 * works with the options provided. Say for example we were adding a class that contained a keyframe value and we wanted to also animate some inline
 * styles using the `from` and `to` properties.
 *
 * ```js
 * var animator = $animateCss(element, {
 *   from: { background:'red' },
 *   to: { background:'blue' }
 * });
 * animator.start();
 * ```
 *
 * ```css
 * .rotating-animation {
 *   animation:0.5s rotate linear;
 *   -webkit-animation:0.5s rotate linear;
 * }
 *
 * @keyframes rotate {
 *   from { transform: rotate(0deg); }
 *   to { transform: rotate(360deg); }
 * }
 *
 * @-webkit-keyframes rotate {
 *   from { -webkit-transform: rotate(0deg); }
 *   to { -webkit-transform: rotate(360deg); }
 * }
 * ```
 *
 * The missing pieces here are that we do not have a transition set (within the CSS code nor within the `$animateCss` options) and the duration of the animation is
 * going to be detected from what the keyframe styles on the CSS class are. In this event, `$animateCss` will automatically create an inline transition
 * style matching the duration detected from the keyframe style (which is present in the CSS class that is being added) and then prepare both the transition
 * and keyframe animations to run in parallel on the element. Then when the animation is underway the provided `from` and `to` CSS styles will be applied
 * and spread across the transition and keyframe animation.
 *
 * ## What is returned
 *
 * `$animateCss` works in two stages: a preparation phase and an animation phase. Therefore when `$animateCss` is first called it will NOT actually
 * start the animation. All that is going on here is that the element is being prepared for the animation (which means that the generated CSS classes are
 * added and removed on the element). Once `$animateCss` is called it will return an object with the following properties:
 *
 * ```js
 * var animator = $animateCss(element, { ... });
 * ```
 *
 * Now what do the contents of our `animator` variable look like:
 *
 * ```js
 * {
 *   // starts the animation
 *   start: Function,
 *
 *   // ends (aborts) the animation
 *   end: Function
 * }
 * ```
 *
 * To actually start the animation we need to run `animation.start()` which will then return a promise that we can hook into to detect when the animation ends.
 * If we choose not to run the animation then we MUST run `animation.end()` to perform a cleanup on the element (since some CSS classes and stlyes may have been
 * applied to the element during the preparation phase). Note that all other properties such as duration, delay, transitions and keyframes are just properties
 * and that changing them will not reconfigure the parameters of the animation.
 *
 * ### runner.done() vs runner.then()
 * It is documented that `animation.start()` will return a promise object and this is true, however, there is also an additional method available on the
 * runner called `.done(callbackFn)`. The done method works the same as `.finally(callbackFn)`, however, it does **not trigger a digest to occur**.
 * Therefore, for performance reasons, it's always best to use `runner.done(callback)` instead of `runner.then()`, `runner.catch()` or `runner.finally()`
 * unless you really need a digest to kick off afterwards.
 *
 * Keep in mind that, to make this easier, ngAnimate has tweaked the JS animations API to recognize when a runner instance is returned from $animateCss
 * (so there is no need to call `runner.done(doneFn)` inside of your JavaScript animation code).
 * Check the {@link ngAnimate.$animateCss#usage animation code above} to see how this works.
 *
 * @param {DOMElement} element the element that will be animated
 * @param {object} options the animation-related options that will be applied during the animation
 *
 * * `event` - The DOM event (e.g. enter, leave, move). When used, a generated CSS class of `ng-EVENT` and `ng-EVENT-active` will be applied
 * to the element during the animation. Multiple events can be provided when spaces are used as a separator. (Note that this will not perform any DOM operation.)
 * * `structural` - Indicates that the `ng-` prefix will be added to the event class. Setting to `false` or omitting will turn `ng-EVENT` and
 * `ng-EVENT-active` in `EVENT` and `EVENT-active`. Unused if `event` is omitted.
 * * `easing` - The CSS easing value that will be applied to the transition or keyframe animation (or both).
 * * `transitionStyle` - The raw CSS transition style that will be used (e.g. `1s linear all`).
 * * `keyframeStyle` - The raw CSS keyframe animation style that will be used (e.g. `1s my_animation linear`).
 * * `from` - The starting CSS styles (a key/value object) that will be applied at the start of the animation.
 * * `to` - The ending CSS styles (a key/value object) that will be applied across the animation via a CSS transition.
 * * `addClass` - A space separated list of CSS classes that will be added to the element and spread across the animation.
 * * `removeClass` - A space separated list of CSS classes that will be removed from the element and spread across the animation.
 * * `duration` - A number value representing the total duration of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `0`
 * is provided then the animation will be skipped entirely.
 * * `delay` - A number value representing the total delay of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `true` is
 * used then whatever delay value is detected from the CSS classes will be mirrored on the elements styles (e.g. by setting delay true then the style value
 * of the element will be `transition-delay: DETECTED_VALUE`). Using `true` is useful when you want the CSS classes and inline styles to all share the same
 * CSS delay value.
 * * `stagger` - A numeric time value representing the delay between successively animated elements
 * ({@link ngAnimate#css-staggering-animations Click here to learn how CSS-based staggering works in ngAnimate.})
 * * `staggerIndex` - The numeric index representing the stagger item (e.g. a value of 5 is equal to the sixth item in the stagger; therefore when a
 * * `stagger` option value of `0.1` is used then there will be a stagger delay of `600ms`)
 * * `applyClassesEarly` - Whether or not the classes being added or removed will be used when detecting the animation. This is set by `$animate` when enter/leave/move animations are fired to ensure that the CSS classes are resolved in time. (Note that this will prevent any transitions from occuring on the classes being added and removed.)
 * * `cleanupStyles` - Whether or not the provided `from` and `to` styles will be removed once
 *    the animation is closed. This is useful for when the styles are used purely for the sake of
 *    the animation and do not have a lasting visual effect on the element (e.g. a colapse and open animation).
 *    By default this value is set to `false`.
 *
 * @return {object} an object with start and end methods and details about the animation.
 *
 * * `start` - The method to start the animation. This will return a `Promise` when called.
 * * `end` - This method will cancel the animation and remove all applied CSS classes and styles.
 */
var ONE_SECOND = 1000;
var BASE_TEN = 10;

var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;
var CLOSING_TIME_BUFFER = 1.5;

var DETECT_CSS_PROPERTIES = {
  transitionDuration:      TRANSITION_DURATION_PROP,
  transitionDelay:         TRANSITION_DELAY_PROP,
  transitionProperty:      TRANSITION_PROP + PROPERTY_KEY,
  animationDuration:       ANIMATION_DURATION_PROP,
  animationDelay:          ANIMATION_DELAY_PROP,
  animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY
};

var DETECT_STAGGER_CSS_PROPERTIES = {
  transitionDuration:      TRANSITION_DURATION_PROP,
  transitionDelay:         TRANSITION_DELAY_PROP,
  animationDuration:       ANIMATION_DURATION_PROP,
  animationDelay:          ANIMATION_DELAY_PROP
};

function getCssKeyframeDurationStyle(duration) {
  return [ANIMATION_DURATION_PROP, duration + 's'];
}

function getCssDelayStyle(delay, isKeyframeAnimation) {
  var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;
  return [prop, delay + 's'];
}

function computeCssStyles($window, element, properties) {
  var styles = Object.create(null);
  var detectedStyles = $window.getComputedStyle(element) || {};
  forEach(properties, function(formalStyleName, actualStyleName) {
    var val = detectedStyles[formalStyleName];
    if (val) {
      var c = val.charAt(0);

      // only numerical-based values have a negative sign or digit as the first value
      if (c === '-' || c === '+' || c >= 0) {
        val = parseMaxTime(val);
      }

      // by setting this to null in the event that the delay is not set or is set directly as 0
      // then we can still allow for zegative values to be used later on and not mistake this
      // value for being greater than any other negative value.
      if (val === 0) {
        val = null;
      }
      styles[actualStyleName] = val;
    }
  });

  return styles;
}

function parseMaxTime(str) {
  var maxValue = 0;
  var values = str.split(/\s*,\s*/);
  forEach(values, function(value) {
    // it's always safe to consider only second values and omit `ms` values since
    // getComputedStyle will always handle the conversion for us
    if (value.charAt(value.length - 1) == 's') {
      value = value.substring(0, value.length - 1);
    }
    value = parseFloat(value) || 0;
    maxValue = maxValue ? Math.max(value, maxValue) : value;
  });
  return maxValue;
}

function truthyTimingValue(val) {
  return val === 0 || val != null;
}

function getCssTransitionDurationStyle(duration, applyOnlyDuration) {
  var style = TRANSITION_PROP;
  var value = duration + 's';
  if (applyOnlyDuration) {
    style += DURATION_KEY;
  } else {
    value += ' linear all';
  }
  return [style, value];
}

function createLocalCacheLookup() {
  var cache = Object.create(null);
  return {
    flush: function() {
      cache = Object.create(null);
    },

    count: function(key) {
      var entry = cache[key];
      return entry ? entry.total : 0;
    },

    get: function(key) {
      var entry = cache[key];
      return entry && entry.value;
    },

    put: function(key, value) {
      if (!cache[key]) {
        cache[key] = { total: 1, value: value };
      } else {
        cache[key].total++;
      }
    }
  };
}

// we do not reassign an already present style value since
// if we detect the style property value again we may be
// detecting styles that were added via the `from` styles.
// We make use of `isDefined` here since an empty string
// or null value (which is what getPropertyValue will return
// for a non-existing style) will still be marked as a valid
// value for the style (a falsy value implies that the style
// is to be removed at the end of the animation). If we had a simple
// "OR" statement then it would not be enough to catch that.
function registerRestorableStyles(backup, node, properties) {
  forEach(properties, function(prop) {
    backup[prop] = isDefined(backup[prop])
        ? backup[prop]
        : node.style.getPropertyValue(prop);
  });
}

var $AnimateCssProvider = ['$animateProvider', function($animateProvider) {
  var gcsLookup = createLocalCacheLookup();
  var gcsStaggerLookup = createLocalCacheLookup();

  this.$get = ['$window', '$$jqLite', '$$AnimateRunner', '$timeout',
               '$$forceReflow', '$sniffer', '$$rAFScheduler', '$animate',
       function($window,   $$jqLite,   $$AnimateRunner,   $timeout,
                $$forceReflow,   $sniffer,   $$rAFScheduler, $animate) {

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    var parentCounter = 0;
    function gcsHashFn(node, extraClasses) {
      var KEY = "$$ngAnimateParentKey";
      var parentNode = node.parentNode;
      var parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);
      return parentID + '-' + node.getAttribute('class') + '-' + extraClasses;
    }

    function computeCachedCssStyles(node, className, cacheKey, properties) {
      var timings = gcsLookup.get(cacheKey);

      if (!timings) {
        timings = computeCssStyles($window, node, properties);
        if (timings.animationIterationCount === 'infinite') {
          timings.animationIterationCount = 1;
        }
      }

      // we keep putting this in multiple times even though the value and the cacheKey are the same
      // because we're keeping an interal tally of how many duplicate animations are detected.
      gcsLookup.put(cacheKey, timings);
      return timings;
    }

    function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {
      var stagger;

      // if we have one or more existing matches of matching elements
      // containing the same parent + CSS styles (which is how cacheKey works)
      // then staggering is possible
      if (gcsLookup.count(cacheKey) > 0) {
        stagger = gcsStaggerLookup.get(cacheKey);

        if (!stagger) {
          var staggerClassName = pendClasses(className, '-stagger');

          $$jqLite.addClass(node, staggerClassName);

          stagger = computeCssStyles($window, node, properties);

          // force the conversion of a null value to zero incase not set
          stagger.animationDuration = Math.max(stagger.animationDuration, 0);
          stagger.transitionDuration = Math.max(stagger.transitionDuration, 0);

          $$jqLite.removeClass(node, staggerClassName);

          gcsStaggerLookup.put(cacheKey, stagger);
        }
      }

      return stagger || {};
    }

    var cancelLastRAFRequest;
    var rafWaitQueue = [];
    function waitUntilQuiet(callback) {
      rafWaitQueue.push(callback);
      $$rAFScheduler.waitUntilQuiet(function() {
        gcsLookup.flush();
        gcsStaggerLookup.flush();

        // DO NOT REMOVE THIS LINE OR REFACTOR OUT THE `pageWidth` variable.
        // PLEASE EXAMINE THE `$$forceReflow` service to understand why.
        var pageWidth = $$forceReflow();

        // we use a for loop to ensure that if the queue is changed
        // during this looping then it will consider new requests
        for (var i = 0; i < rafWaitQueue.length; i++) {
          rafWaitQueue[i](pageWidth);
        }
        rafWaitQueue.length = 0;
      });
    }

    function computeTimings(node, className, cacheKey) {
      var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES);
      var aD = timings.animationDelay;
      var tD = timings.transitionDelay;
      timings.maxDelay = aD && tD
          ? Math.max(aD, tD)
          : (aD || tD);
      timings.maxDuration = Math.max(
          timings.animationDuration * timings.animationIterationCount,
          timings.transitionDuration);

      return timings;
    }

    return function init(element, options) {
      var restoreStyles = {};
      var node = getDomNode(element);
      if (!node
          || !node.parentNode
          || !$animate.enabled()) {
        return closeAndReturnNoopAnimator();
      }

      options = prepareAnimationOptions(options);

      var temporaryStyles = [];
      var classes = element.attr('class');
      var styles = packageStyles(options);
      var animationClosed;
      var animationPaused;
      var animationCompleted;
      var runner;
      var runnerHost;
      var maxDelay;
      var maxDelayTime;
      var maxDuration;
      var maxDurationTime;

      if (options.duration === 0 || (!$sniffer.animations && !$sniffer.transitions)) {
        return closeAndReturnNoopAnimator();
      }

      var method = options.event && isArray(options.event)
            ? options.event.join(' ')
            : options.event;

      var isStructural = method && options.structural;
      var structuralClassName = '';
      var addRemoveClassName = '';

      if (isStructural) {
        structuralClassName = pendClasses(method, EVENT_CLASS_PREFIX, true);
      } else if (method) {
        structuralClassName = method;
      }

      if (options.addClass) {
        addRemoveClassName += pendClasses(options.addClass, ADD_CLASS_SUFFIX);
      }

      if (options.removeClass) {
        if (addRemoveClassName.length) {
          addRemoveClassName += ' ';
        }
        addRemoveClassName += pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX);
      }

      // there may be a situation where a structural animation is combined together
      // with CSS classes that need to resolve before the animation is computed.
      // However this means that there is no explicit CSS code to block the animation
      // from happening (by setting 0s none in the class name). If this is the case
      // we need to apply the classes before the first rAF so we know to continue if
      // there actually is a detected transition or keyframe animation
      if (options.applyClassesEarly && addRemoveClassName.length) {
        applyAnimationClasses(element, options);
      }

      var preparationClasses = [structuralClassName, addRemoveClassName].join(' ').trim();
      var fullClassName = classes + ' ' + preparationClasses;
      var activeClasses = pendClasses(preparationClasses, ACTIVE_CLASS_SUFFIX);
      var hasToStyles = styles.to && Object.keys(styles.to).length > 0;
      var containsKeyframeAnimation = (options.keyframeStyle || '').length > 0;

      // there is no way we can trigger an animation if no styles and
      // no classes are being applied which would then trigger a transition,
      // unless there a is raw keyframe value that is applied to the element.
      if (!containsKeyframeAnimation
           && !hasToStyles
           && !preparationClasses) {
        return closeAndReturnNoopAnimator();
      }

      var cacheKey, stagger;
      if (options.stagger > 0) {
        var staggerVal = parseFloat(options.stagger);
        stagger = {
          transitionDelay: staggerVal,
          animationDelay: staggerVal,
          transitionDuration: 0,
          animationDuration: 0
        };
      } else {
        cacheKey = gcsHashFn(node, fullClassName);
        stagger = computeCachedCssStaggerStyles(node, preparationClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);
      }

      if (!options.$$skipPreparationClasses) {
        $$jqLite.addClass(element, preparationClasses);
      }

      var applyOnlyDuration;

      if (options.transitionStyle) {
        var transitionStyle = [TRANSITION_PROP, options.transitionStyle];
        applyInlineStyle(node, transitionStyle);
        temporaryStyles.push(transitionStyle);
      }

      if (options.duration >= 0) {
        applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;
        var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);

        // we set the duration so that it will be picked up by getComputedStyle later
        applyInlineStyle(node, durationStyle);
        temporaryStyles.push(durationStyle);
      }

      if (options.keyframeStyle) {
        var keyframeStyle = [ANIMATION_PROP, options.keyframeStyle];
        applyInlineStyle(node, keyframeStyle);
        temporaryStyles.push(keyframeStyle);
      }

      var itemIndex = stagger
          ? options.staggerIndex >= 0
              ? options.staggerIndex
              : gcsLookup.count(cacheKey)
          : 0;

      var isFirst = itemIndex === 0;

      // this is a pre-emptive way of forcing the setup classes to be added and applied INSTANTLY
      // without causing any combination of transitions to kick in. By adding a negative delay value
      // it forces the setup class' transition to end immediately. We later then remove the negative
      // transition delay to allow for the transition to naturally do it's thing. The beauty here is
      // that if there is no transition defined then nothing will happen and this will also allow
      // other transitions to be stacked on top of each other without any chopping them out.
      if (isFirst && !options.skipBlocking) {
        blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);
      }

      var timings = computeTimings(node, fullClassName, cacheKey);
      var relativeDelay = timings.maxDelay;
      maxDelay = Math.max(relativeDelay, 0);
      maxDuration = timings.maxDuration;

      var flags = {};
      flags.hasTransitions          = timings.transitionDuration > 0;
      flags.hasAnimations           = timings.animationDuration > 0;
      flags.hasTransitionAll        = flags.hasTransitions && timings.transitionProperty == 'all';
      flags.applyTransitionDuration = hasToStyles && (
                                        (flags.hasTransitions && !flags.hasTransitionAll)
                                         || (flags.hasAnimations && !flags.hasTransitions));
      flags.applyAnimationDuration  = options.duration && flags.hasAnimations;
      flags.applyTransitionDelay    = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions);
      flags.applyAnimationDelay     = truthyTimingValue(options.delay) && flags.hasAnimations;
      flags.recalculateTimingStyles = addRemoveClassName.length > 0;

      if (flags.applyTransitionDuration || flags.applyAnimationDuration) {
        maxDuration = options.duration ? parseFloat(options.duration) : maxDuration;

        if (flags.applyTransitionDuration) {
          flags.hasTransitions = true;
          timings.transitionDuration = maxDuration;
          applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0;
          temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration));
        }

        if (flags.applyAnimationDuration) {
          flags.hasAnimations = true;
          timings.animationDuration = maxDuration;
          temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration));
        }
      }

      if (maxDuration === 0 && !flags.recalculateTimingStyles) {
        return closeAndReturnNoopAnimator();
      }

      if (options.delay != null) {
        var delayStyle = parseFloat(options.delay);

        if (flags.applyTransitionDelay) {
          temporaryStyles.push(getCssDelayStyle(delayStyle));
        }

        if (flags.applyAnimationDelay) {
          temporaryStyles.push(getCssDelayStyle(delayStyle, true));
        }
      }

      // we need to recalculate the delay value since we used a pre-emptive negative
      // delay value and the delay value is required for the final event checking. This
      // property will ensure that this will happen after the RAF phase has passed.
      if (options.duration == null && timings.transitionDuration > 0) {
        flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst;
      }

      maxDelayTime = maxDelay * ONE_SECOND;
      maxDurationTime = maxDuration * ONE_SECOND;
      if (!options.skipBlocking) {
        flags.blockTransition = timings.transitionDuration > 0;
        flags.blockKeyframeAnimation = timings.animationDuration > 0 &&
                                       stagger.animationDelay > 0 &&
                                       stagger.animationDuration === 0;
      }

      if (options.from) {
        if (options.cleanupStyles) {
          registerRestorableStyles(restoreStyles, node, Object.keys(options.from));
        }
        applyAnimationFromStyles(element, options);
      }

      if (flags.blockTransition || flags.blockKeyframeAnimation) {
        applyBlocking(maxDuration);
      } else if (!options.skipBlocking) {
        blockTransitions(node, false);
      }

      // TODO(matsko): for 1.5 change this code to have an animator object for better debugging
      return {
        $$willAnimate: true,
        end: endFn,
        start: function() {
          if (animationClosed) return;

          runnerHost = {
            end: endFn,
            cancel: cancelFn,
            resume: null, //this will be set during the start() phase
            pause: null
          };

          runner = new $$AnimateRunner(runnerHost);

          waitUntilQuiet(start);

          // we don't have access to pause/resume the animation
          // since it hasn't run yet. AnimateRunner will therefore
          // set noop functions for resume and pause and they will
          // later be overridden once the animation is triggered
          return runner;
        }
      };

      function endFn() {
        close();
      }

      function cancelFn() {
        close(true);
      }

      function close(rejected) { // jshint ignore:line
        // if the promise has been called already then we shouldn't close
        // the animation again
        if (animationClosed || (animationCompleted && animationPaused)) return;
        animationClosed = true;
        animationPaused = false;

        if (!options.$$skipPreparationClasses) {
          $$jqLite.removeClass(element, preparationClasses);
        }
        $$jqLite.removeClass(element, activeClasses);

        blockKeyframeAnimations(node, false);
        blockTransitions(node, false);

        forEach(temporaryStyles, function(entry) {
          // There is only one way to remove inline style properties entirely from elements.
          // By using `removeProperty` this works, but we need to convert camel-cased CSS
          // styles down to hyphenated values.
          node.style[entry[0]] = '';
        });

        applyAnimationClasses(element, options);
        applyAnimationStyles(element, options);

        if (Object.keys(restoreStyles).length) {
          forEach(restoreStyles, function(value, prop) {
            value ? node.style.setProperty(prop, value)
                  : node.style.removeProperty(prop);
          });
        }

        // the reason why we have this option is to allow a synchronous closing callback
        // that is fired as SOON as the animation ends (when the CSS is removed) or if
        // the animation never takes off at all. A good example is a leave animation since
        // the element must be removed just after the animation is over or else the element
        // will appear on screen for one animation frame causing an overbearing flicker.
        if (options.onDone) {
          options.onDone();
        }

        // if the preparation function fails then the promise is not setup
        if (runner) {
          runner.complete(!rejected);
        }
      }

      function applyBlocking(duration) {
        if (flags.blockTransition) {
          blockTransitions(node, duration);
        }

        if (flags.blockKeyframeAnimation) {
          blockKeyframeAnimations(node, !!duration);
        }
      }

      function closeAndReturnNoopAnimator() {
        runner = new $$AnimateRunner({
          end: endFn,
          cancel: cancelFn
        });

        // should flush the cache animation
        waitUntilQuiet(noop);
        close();

        return {
          $$willAnimate: false,
          start: function() {
            return runner;
          },
          end: endFn
        };
      }

      function start() {
        if (animationClosed) return;
        if (!node.parentNode) {
          close();
          return;
        }

        var startTime, events = [];

        // even though we only pause keyframe animations here the pause flag
        // will still happen when transitions are used. Only the transition will
        // not be paused since that is not possible. If the animation ends when
        // paused then it will not complete until unpaused or cancelled.
        var playPause = function(playAnimation) {
          if (!animationCompleted) {
            animationPaused = !playAnimation;
            if (timings.animationDuration) {
              var value = blockKeyframeAnimations(node, animationPaused);
              animationPaused
                  ? temporaryStyles.push(value)
                  : removeFromArray(temporaryStyles, value);
            }
          } else if (animationPaused && playAnimation) {
            animationPaused = false;
            close();
          }
        };

        // checking the stagger duration prevents an accidently cascade of the CSS delay style
        // being inherited from the parent. If the transition duration is zero then we can safely
        // rely that the delay value is an intential stagger delay style.
        var maxStagger = itemIndex > 0
                         && ((timings.transitionDuration && stagger.transitionDuration === 0) ||
                            (timings.animationDuration && stagger.animationDuration === 0))
                         && Math.max(stagger.animationDelay, stagger.transitionDelay);
        if (maxStagger) {
          $timeout(triggerAnimationStart,
                   Math.floor(maxStagger * itemIndex * ONE_SECOND),
                   false);
        } else {
          triggerAnimationStart();
        }

        // this will decorate the existing promise runner with pause/resume methods
        runnerHost.resume = function() {
          playPause(true);
        };

        runnerHost.pause = function() {
          playPause(false);
        };

        function triggerAnimationStart() {
          // just incase a stagger animation kicks in when the animation
          // itself was cancelled entirely
          if (animationClosed) return;

          applyBlocking(false);

          forEach(temporaryStyles, function(entry) {
            var key = entry[0];
            var value = entry[1];
            node.style[key] = value;
          });

          applyAnimationClasses(element, options);
          $$jqLite.addClass(element, activeClasses);

          if (flags.recalculateTimingStyles) {
            fullClassName = node.className + ' ' + preparationClasses;
            cacheKey = gcsHashFn(node, fullClassName);

            timings = computeTimings(node, fullClassName, cacheKey);
            relativeDelay = timings.maxDelay;
            maxDelay = Math.max(relativeDelay, 0);
            maxDuration = timings.maxDuration;

            if (maxDuration === 0) {
              close();
              return;
            }

            flags.hasTransitions = timings.transitionDuration > 0;
            flags.hasAnimations = timings.animationDuration > 0;
          }

          if (flags.applyAnimationDelay) {
            relativeDelay = typeof options.delay !== "boolean" && truthyTimingValue(options.delay)
                  ? parseFloat(options.delay)
                  : relativeDelay;

            maxDelay = Math.max(relativeDelay, 0);
            timings.animationDelay = relativeDelay;
            delayStyle = getCssDelayStyle(relativeDelay, true);
            temporaryStyles.push(delayStyle);
            node.style[delayStyle[0]] = delayStyle[1];
          }

          maxDelayTime = maxDelay * ONE_SECOND;
          maxDurationTime = maxDuration * ONE_SECOND;

          if (options.easing) {
            var easeProp, easeVal = options.easing;
            if (flags.hasTransitions) {
              easeProp = TRANSITION_PROP + TIMING_KEY;
              temporaryStyles.push([easeProp, easeVal]);
              node.style[easeProp] = easeVal;
            }
            if (flags.hasAnimations) {
              easeProp = ANIMATION_PROP + TIMING_KEY;
              temporaryStyles.push([easeProp, easeVal]);
              node.style[easeProp] = easeVal;
            }
          }

          if (timings.transitionDuration) {
            events.push(TRANSITIONEND_EVENT);
          }

          if (timings.animationDuration) {
            events.push(ANIMATIONEND_EVENT);
          }

          startTime = Date.now();
          var timerTime = maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime;
          var endTime = startTime + timerTime;

          var animationsData = element.data(ANIMATE_TIMER_KEY) || [];
          var setupFallbackTimer = true;
          if (animationsData.length) {
            var currentTimerData = animationsData[0];
            setupFallbackTimer = endTime > currentTimerData.expectedEndTime;
            if (setupFallbackTimer) {
              $timeout.cancel(currentTimerData.timer);
            } else {
              animationsData.push(close);
            }
          }

          if (setupFallbackTimer) {
            var timer = $timeout(onAnimationExpired, timerTime, false);
            animationsData[0] = {
              timer: timer,
              expectedEndTime: endTime
            };
            animationsData.push(close);
            element.data(ANIMATE_TIMER_KEY, animationsData);
          }

          element.on(events.join(' '), onAnimationProgress);
          if (options.to) {
            if (options.cleanupStyles) {
              registerRestorableStyles(restoreStyles, node, Object.keys(options.to));
            }
            applyAnimationToStyles(element, options);
          }
        }

        function onAnimationExpired() {
          var animationsData = element.data(ANIMATE_TIMER_KEY);

          // this will be false in the event that the element was
          // removed from the DOM (via a leave animation or something
          // similar)
          if (animationsData) {
            for (var i = 1; i < animationsData.length; i++) {
              animationsData[i]();
            }
            element.removeData(ANIMATE_TIMER_KEY);
          }
        }

        function onAnimationProgress(event) {
          event.stopPropagation();
          var ev = event.originalEvent || event;
          var timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now();

          /* Firefox (or possibly just Gecko) likes to not round values up
           * when a ms measurement is used for the animation */
          var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));

          /* $manualTimeStamp is a mocked timeStamp value which is set
           * within browserTrigger(). This is only here so that tests can
           * mock animations properly. Real events fallback to event.timeStamp,
           * or, if they don't, then a timeStamp is automatically created for them.
           * We're checking to see if the timeStamp surpasses the expected delay,
           * but we're using elapsedTime instead of the timeStamp on the 2nd
           * pre-condition since animations sometimes close off early */
          if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
            // we set this flag to ensure that if the transition is paused then, when resumed,
            // the animation will automatically close itself since transitions cannot be paused.
            animationCompleted = true;
            close();
          }
        }
      }
    };
  }];
}];

var $$AnimateCssDriverProvider = ['$$animationProvider', function($$animationProvider) {
  $$animationProvider.drivers.push('$$animateCssDriver');

  var NG_ANIMATE_SHIM_CLASS_NAME = 'ng-animate-shim';
  var NG_ANIMATE_ANCHOR_CLASS_NAME = 'ng-anchor';

  var NG_OUT_ANCHOR_CLASS_NAME = 'ng-anchor-out';
  var NG_IN_ANCHOR_CLASS_NAME = 'ng-anchor-in';

  function isDocumentFragment(node) {
    return node.parentNode && node.parentNode.nodeType === 11;
  }

  this.$get = ['$animateCss', '$rootScope', '$$AnimateRunner', '$rootElement', '$sniffer', '$$jqLite', '$document',
       function($animateCss,   $rootScope,   $$AnimateRunner,   $rootElement,   $sniffer,   $$jqLite,   $document) {

    // only browsers that support these properties can render animations
    if (!$sniffer.animations && !$sniffer.transitions) return noop;

    var bodyNode = $document[0].body;
    var rootNode = getDomNode($rootElement);

    var rootBodyElement = jqLite(
      // this is to avoid using something that exists outside of the body
      // we also special case the doc fragement case because our unit test code
      // appends the $rootElement to the body after the app has been bootstrapped
      isDocumentFragment(rootNode) || bodyNode.contains(rootNode) ? rootNode : bodyNode
    );

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    return function initDriverFn(animationDetails) {
      return animationDetails.from && animationDetails.to
          ? prepareFromToAnchorAnimation(animationDetails.from,
                                         animationDetails.to,
                                         animationDetails.classes,
                                         animationDetails.anchors)
          : prepareRegularAnimation(animationDetails);
    };

    function filterCssClasses(classes) {
      //remove all the `ng-` stuff
      return classes.replace(/\bng-\S+\b/g, '');
    }

    function getUniqueValues(a, b) {
      if (isString(a)) a = a.split(' ');
      if (isString(b)) b = b.split(' ');
      return a.filter(function(val) {
        return b.indexOf(val) === -1;
      }).join(' ');
    }

    function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {
      var clone = jqLite(getDomNode(outAnchor).cloneNode(true));
      var startingClasses = filterCssClasses(getClassVal(clone));

      outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);
      inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);

      clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME);

      rootBodyElement.append(clone);

      var animatorIn, animatorOut = prepareOutAnimation();

      // the user may not end up using the `out` animation and
      // only making use of the `in` animation or vice-versa.
      // In either case we should allow this and not assume the
      // animation is over unless both animations are not used.
      if (!animatorOut) {
        animatorIn = prepareInAnimation();
        if (!animatorIn) {
          return end();
        }
      }

      var startingAnimator = animatorOut || animatorIn;

      return {
        start: function() {
          var runner;

          var currentAnimation = startingAnimator.start();
          currentAnimation.done(function() {
            currentAnimation = null;
            if (!animatorIn) {
              animatorIn = prepareInAnimation();
              if (animatorIn) {
                currentAnimation = animatorIn.start();
                currentAnimation.done(function() {
                  currentAnimation = null;
                  end();
                  runner.complete();
                });
                return currentAnimation;
              }
            }
            // in the event that there is no `in` animation
            end();
            runner.complete();
          });

          runner = new $$AnimateRunner({
            end: endFn,
            cancel: endFn
          });

          return runner;

          function endFn() {
            if (currentAnimation) {
              currentAnimation.end();
            }
          }
        }
      };

      function calculateAnchorStyles(anchor) {
        var styles = {};

        var coords = getDomNode(anchor).getBoundingClientRect();

        // we iterate directly since safari messes up and doesn't return
        // all the keys for the coods object when iterated
        forEach(['width','height','top','left'], function(key) {
          var value = coords[key];
          switch (key) {
            case 'top':
              value += bodyNode.scrollTop;
              break;
            case 'left':
              value += bodyNode.scrollLeft;
              break;
          }
          styles[key] = Math.floor(value) + 'px';
        });
        return styles;
      }

      function prepareOutAnimation() {
        var animator = $animateCss(clone, {
          addClass: NG_OUT_ANCHOR_CLASS_NAME,
          delay: true,
          from: calculateAnchorStyles(outAnchor)
        });

        // read the comment within `prepareRegularAnimation` to understand
        // why this check is necessary
        return animator.$$willAnimate ? animator : null;
      }

      function getClassVal(element) {
        return element.attr('class') || '';
      }

      function prepareInAnimation() {
        var endingClasses = filterCssClasses(getClassVal(inAnchor));
        var toAdd = getUniqueValues(endingClasses, startingClasses);
        var toRemove = getUniqueValues(startingClasses, endingClasses);

        var animator = $animateCss(clone, {
          to: calculateAnchorStyles(inAnchor),
          addClass: NG_IN_ANCHOR_CLASS_NAME + ' ' + toAdd,
          removeClass: NG_OUT_ANCHOR_CLASS_NAME + ' ' + toRemove,
          delay: true
        });

        // read the comment within `prepareRegularAnimation` to understand
        // why this check is necessary
        return animator.$$willAnimate ? animator : null;
      }

      function end() {
        clone.remove();
        outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
        inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
      }
    }

    function prepareFromToAnchorAnimation(from, to, classes, anchors) {
      var fromAnimation = prepareRegularAnimation(from, noop);
      var toAnimation = prepareRegularAnimation(to, noop);

      var anchorAnimations = [];
      forEach(anchors, function(anchor) {
        var outElement = anchor['out'];
        var inElement = anchor['in'];
        var animator = prepareAnchoredAnimation(classes, outElement, inElement);
        if (animator) {
          anchorAnimations.push(animator);
        }
      });

      // no point in doing anything when there are no elements to animate
      if (!fromAnimation && !toAnimation && anchorAnimations.length === 0) return;

      return {
        start: function() {
          var animationRunners = [];

          if (fromAnimation) {
            animationRunners.push(fromAnimation.start());
          }

          if (toAnimation) {
            animationRunners.push(toAnimation.start());
          }

          forEach(anchorAnimations, function(animation) {
            animationRunners.push(animation.start());
          });

          var runner = new $$AnimateRunner({
            end: endFn,
            cancel: endFn // CSS-driven animations cannot be cancelled, only ended
          });

          $$AnimateRunner.all(animationRunners, function(status) {
            runner.complete(status);
          });

          return runner;

          function endFn() {
            forEach(animationRunners, function(runner) {
              runner.end();
            });
          }
        }
      };
    }

    function prepareRegularAnimation(animationDetails) {
      var element = animationDetails.element;
      var options = animationDetails.options || {};

      if (animationDetails.structural) {
        options.event = animationDetails.event;
        options.structural = true;
        options.applyClassesEarly = true;

        // we special case the leave animation since we want to ensure that
        // the element is removed as soon as the animation is over. Otherwise
        // a flicker might appear or the element may not be removed at all
        if (animationDetails.event === 'leave') {
          options.onDone = options.domOperation;
        }
      }

      // We assign the preparationClasses as the actual animation event since
      // the internals of $animateCss will just suffix the event token values
      // with `-active` to trigger the animation.
      if (options.preparationClasses) {
        options.event = concatWithSpace(options.event, options.preparationClasses);
      }

      var animator = $animateCss(element, options);

      // the driver lookup code inside of $$animation attempts to spawn a
      // driver one by one until a driver returns a.$$willAnimate animator object.
      // $animateCss will always return an object, however, it will pass in
      // a flag as a hint as to whether an animation was detected or not
      return animator.$$willAnimate ? animator : null;
    }
  }];
}];

// TODO(matsko): use caching here to speed things up for detection
// TODO(matsko): add documentation
//  by the time...

var $$AnimateJsProvider = ['$animateProvider', function($animateProvider) {
  this.$get = ['$injector', '$$AnimateRunner', '$$jqLite',
       function($injector,   $$AnimateRunner,   $$jqLite) {

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
         // $animateJs(element, 'enter');
    return function(element, event, classes, options) {
      // the `classes` argument is optional and if it is not used
      // then the classes will be resolved from the element's className
      // property as well as options.addClass/options.removeClass.
      if (arguments.length === 3 && isObject(classes)) {
        options = classes;
        classes = null;
      }

      options = prepareAnimationOptions(options);
      if (!classes) {
        classes = element.attr('class') || '';
        if (options.addClass) {
          classes += ' ' + options.addClass;
        }
        if (options.removeClass) {
          classes += ' ' + options.removeClass;
        }
      }

      var classesToAdd = options.addClass;
      var classesToRemove = options.removeClass;

      // the lookupAnimations function returns a series of animation objects that are
      // matched up with one or more of the CSS classes. These animation objects are
      // defined via the module.animation factory function. If nothing is detected then
      // we don't return anything which then makes $animation query the next driver.
      var animations = lookupAnimations(classes);
      var before, after;
      if (animations.length) {
        var afterFn, beforeFn;
        if (event == 'leave') {
          beforeFn = 'leave';
          afterFn = 'afterLeave'; // TODO(matsko): get rid of this
        } else {
          beforeFn = 'before' + event.charAt(0).toUpperCase() + event.substr(1);
          afterFn = event;
        }

        if (event !== 'enter' && event !== 'move') {
          before = packageAnimations(element, event, options, animations, beforeFn);
        }
        after  = packageAnimations(element, event, options, animations, afterFn);
      }

      // no matching animations
      if (!before && !after) return;

      function applyOptions() {
        options.domOperation();
        applyAnimationClasses(element, options);
      }

      return {
        start: function() {
          var closeActiveAnimations;
          var chain = [];

          if (before) {
            chain.push(function(fn) {
              closeActiveAnimations = before(fn);
            });
          }

          if (chain.length) {
            chain.push(function(fn) {
              applyOptions();
              fn(true);
            });
          } else {
            applyOptions();
          }

          if (after) {
            chain.push(function(fn) {
              closeActiveAnimations = after(fn);
            });
          }

          var animationClosed = false;
          var runner = new $$AnimateRunner({
            end: function() {
              endAnimations();
            },
            cancel: function() {
              endAnimations(true);
            }
          });

          $$AnimateRunner.chain(chain, onComplete);
          return runner;

          function onComplete(success) {
            animationClosed = true;
            applyOptions();
            applyAnimationStyles(element, options);
            runner.complete(success);
          }

          function endAnimations(cancelled) {
            if (!animationClosed) {
              (closeActiveAnimations || noop)(cancelled);
              onComplete(cancelled);
            }
          }
        }
      };

      function executeAnimationFn(fn, element, event, options, onDone) {
        var args;
        switch (event) {
          case 'animate':
            args = [element, options.from, options.to, onDone];
            break;

          case 'setClass':
            args = [element, classesToAdd, classesToRemove, onDone];
            break;

          case 'addClass':
            args = [element, classesToAdd, onDone];
            break;

          case 'removeClass':
            args = [element, classesToRemove, onDone];
            break;

          default:
            args = [element, onDone];
            break;
        }

        args.push(options);

        var value = fn.apply(fn, args);
        if (value) {
          if (isFunction(value.start)) {
            value = value.start();
          }

          if (value instanceof $$AnimateRunner) {
            value.done(onDone);
          } else if (isFunction(value)) {
            // optional onEnd / onCancel callback
            return value;
          }
        }

        return noop;
      }

      function groupEventedAnimations(element, event, options, animations, fnName) {
        var operations = [];
        forEach(animations, function(ani) {
          var animation = ani[fnName];
          if (!animation) return;

          // note that all of these animations will run in parallel
          operations.push(function() {
            var runner;
            var endProgressCb;

            var resolved = false;
            var onAnimationComplete = function(rejected) {
              if (!resolved) {
                resolved = true;
                (endProgressCb || noop)(rejected);
                runner.complete(!rejected);
              }
            };

            runner = new $$AnimateRunner({
              end: function() {
                onAnimationComplete();
              },
              cancel: function() {
                onAnimationComplete(true);
              }
            });

            endProgressCb = executeAnimationFn(animation, element, event, options, function(result) {
              var cancelled = result === false;
              onAnimationComplete(cancelled);
            });

            return runner;
          });
        });

        return operations;
      }

      function packageAnimations(element, event, options, animations, fnName) {
        var operations = groupEventedAnimations(element, event, options, animations, fnName);
        if (operations.length === 0) {
          var a,b;
          if (fnName === 'beforeSetClass') {
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'beforeRemoveClass');
            b = groupEventedAnimations(element, 'addClass', options, animations, 'beforeAddClass');
          } else if (fnName === 'setClass') {
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'removeClass');
            b = groupEventedAnimations(element, 'addClass', options, animations, 'addClass');
          }

          if (a) {
            operations = operations.concat(a);
          }
          if (b) {
            operations = operations.concat(b);
          }
        }

        if (operations.length === 0) return;

        // TODO(matsko): add documentation
        return function startAnimation(callback) {
          var runners = [];
          if (operations.length) {
            forEach(operations, function(animateFn) {
              runners.push(animateFn());
            });
          }

          runners.length ? $$AnimateRunner.all(runners, callback) : callback();

          return function endFn(reject) {
            forEach(runners, function(runner) {
              reject ? runner.cancel() : runner.end();
            });
          };
        };
      }
    };

    function lookupAnimations(classes) {
      classes = isArray(classes) ? classes : classes.split(' ');
      var matches = [], flagMap = {};
      for (var i=0; i < classes.length; i++) {
        var klass = classes[i],
            animationFactory = $animateProvider.$$registeredAnimations[klass];
        if (animationFactory && !flagMap[klass]) {
          matches.push($injector.get(animationFactory));
          flagMap[klass] = true;
        }
      }
      return matches;
    }
  }];
}];

var $$AnimateJsDriverProvider = ['$$animationProvider', function($$animationProvider) {
  $$animationProvider.drivers.push('$$animateJsDriver');
  this.$get = ['$$animateJs', '$$AnimateRunner', function($$animateJs, $$AnimateRunner) {
    return function initDriverFn(animationDetails) {
      if (animationDetails.from && animationDetails.to) {
        var fromAnimation = prepareAnimation(animationDetails.from);
        var toAnimation = prepareAnimation(animationDetails.to);
        if (!fromAnimation && !toAnimation) return;

        return {
          start: function() {
            var animationRunners = [];

            if (fromAnimation) {
              animationRunners.push(fromAnimation.start());
            }

            if (toAnimation) {
              animationRunners.push(toAnimation.start());
            }

            $$AnimateRunner.all(animationRunners, done);

            var runner = new $$AnimateRunner({
              end: endFnFactory(),
              cancel: endFnFactory()
            });

            return runner;

            function endFnFactory() {
              return function() {
                forEach(animationRunners, function(runner) {
                  // at this point we cannot cancel animations for groups just yet. 1.5+
                  runner.end();
                });
              };
            }

            function done(status) {
              runner.complete(status);
            }
          }
        };
      } else {
        return prepareAnimation(animationDetails);
      }
    };

    function prepareAnimation(animationDetails) {
      // TODO(matsko): make sure to check for grouped animations and delegate down to normal animations
      var element = animationDetails.element;
      var event = animationDetails.event;
      var options = animationDetails.options;
      var classes = animationDetails.classes;
      return $$animateJs(element, event, classes, options);
    }
  }];
}];

var NG_ANIMATE_ATTR_NAME = 'data-ng-animate';
var NG_ANIMATE_PIN_DATA = '$ngAnimatePin';
var $$AnimateQueueProvider = ['$animateProvider', function($animateProvider) {
  var PRE_DIGEST_STATE = 1;
  var RUNNING_STATE = 2;

  var rules = this.rules = {
    skip: [],
    cancel: [],
    join: []
  };

  function isAllowed(ruleType, element, currentAnimation, previousAnimation) {
    return rules[ruleType].some(function(fn) {
      return fn(element, currentAnimation, previousAnimation);
    });
  }

  function hasAnimationClasses(options, and) {
    options = options || {};
    var a = (options.addClass || '').length > 0;
    var b = (options.removeClass || '').length > 0;
    return and ? a && b : a || b;
  }

  rules.join.push(function(element, newAnimation, currentAnimation) {
    // if the new animation is class-based then we can just tack that on
    return !newAnimation.structural && hasAnimationClasses(newAnimation.options);
  });

  rules.skip.push(function(element, newAnimation, currentAnimation) {
    // there is no need to animate anything if no classes are being added and
    // there is no structural animation that will be triggered
    return !newAnimation.structural && !hasAnimationClasses(newAnimation.options);
  });

  rules.skip.push(function(element, newAnimation, currentAnimation) {
    // why should we trigger a new structural animation if the element will
    // be removed from the DOM anyway?
    return currentAnimation.event == 'leave' && newAnimation.structural;
  });

  rules.skip.push(function(element, newAnimation, currentAnimation) {
    // if there is an ongoing current animation then don't even bother running the class-based animation
    return currentAnimation.structural && currentAnimation.state === RUNNING_STATE && !newAnimation.structural;
  });

  rules.cancel.push(function(element, newAnimation, currentAnimation) {
    // there can never be two structural animations running at the same time
    return currentAnimation.structural && newAnimation.structural;
  });

  rules.cancel.push(function(element, newAnimation, currentAnimation) {
    // if the previous animation is already running, but the new animation will
    // be triggered, but the new animation is structural
    return currentAnimation.state === RUNNING_STATE && newAnimation.structural;
  });

  rules.cancel.push(function(element, newAnimation, currentAnimation) {
    var nO = newAnimation.options;
    var cO = currentAnimation.options;

    // if the exact same CSS class is added/removed then it's safe to cancel it
    return (nO.addClass && nO.addClass === cO.removeClass) || (nO.removeClass && nO.removeClass === cO.addClass);
  });

  this.$get = ['$$rAF', '$rootScope', '$rootElement', '$document', '$$HashMap',
               '$$animation', '$$AnimateRunner', '$templateRequest', '$$jqLite', '$$forceReflow',
       function($$rAF,   $rootScope,   $rootElement,   $document,   $$HashMap,
                $$animation,   $$AnimateRunner,   $templateRequest,   $$jqLite,   $$forceReflow) {

    var activeAnimationsLookup = new $$HashMap();
    var disabledElementsLookup = new $$HashMap();
    var animationsEnabled = null;

    function postDigestTaskFactory() {
      var postDigestCalled = false;
      return function(fn) {
        // we only issue a call to postDigest before
        // it has first passed. This prevents any callbacks
        // from not firing once the animation has completed
        // since it will be out of the digest cycle.
        if (postDigestCalled) {
          fn();
        } else {
          $rootScope.$$postDigest(function() {
            postDigestCalled = true;
            fn();
          });
        }
      };
    }

    // Wait until all directive and route-related templates are downloaded and
    // compiled. The $templateRequest.totalPendingRequests variable keeps track of
    // all of the remote templates being currently downloaded. If there are no
    // templates currently downloading then the watcher will still fire anyway.
    var deregisterWatch = $rootScope.$watch(
      function() { return $templateRequest.totalPendingRequests === 0; },
      function(isEmpty) {
        if (!isEmpty) return;
        deregisterWatch();

        // Now that all templates have been downloaded, $animate will wait until
        // the post digest queue is empty before enabling animations. By having two
        // calls to $postDigest calls we can ensure that the flag is enabled at the
        // very end of the post digest queue. Since all of the animations in $animate
        // use $postDigest, it's important that the code below executes at the end.
        // This basically means that the page is fully downloaded and compiled before
        // any animations are triggered.
        $rootScope.$$postDigest(function() {
          $rootScope.$$postDigest(function() {
            // we check for null directly in the event that the application already called
            // .enabled() with whatever arguments that it provided it with
            if (animationsEnabled === null) {
              animationsEnabled = true;
            }
          });
        });
      }
    );

    var callbackRegistry = {};

    // remember that the classNameFilter is set during the provider/config
    // stage therefore we can optimize here and setup a helper function
    var classNameFilter = $animateProvider.classNameFilter();
    var isAnimatableClassName = !classNameFilter
              ? function() { return true; }
              : function(className) {
                return classNameFilter.test(className);
              };

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    function normalizeAnimationOptions(element, options) {
      return mergeAnimationOptions(element, options, {});
    }

    function findCallbacks(parent, element, event) {
      var targetNode = getDomNode(element);
      var targetParentNode = getDomNode(parent);

      var matches = [];
      var entries = callbackRegistry[event];
      if (entries) {
        forEach(entries, function(entry) {
          if (entry.node.contains(targetNode)) {
            matches.push(entry.callback);
          } else if (event === 'leave' && entry.node.contains(targetParentNode)) {
            matches.push(entry.callback);
          }
        });
      }

      return matches;
    }

    return {
      on: function(event, container, callback) {
        var node = extractElementNode(container);
        callbackRegistry[event] = callbackRegistry[event] || [];
        callbackRegistry[event].push({
          node: node,
          callback: callback
        });
      },

      off: function(event, container, callback) {
        var entries = callbackRegistry[event];
        if (!entries) return;

        callbackRegistry[event] = arguments.length === 1
            ? null
            : filterFromRegistry(entries, container, callback);

        function filterFromRegistry(list, matchContainer, matchCallback) {
          var containerNode = extractElementNode(matchContainer);
          return list.filter(function(entry) {
            var isMatch = entry.node === containerNode &&
                            (!matchCallback || entry.callback === matchCallback);
            return !isMatch;
          });
        }
      },

      pin: function(element, parentElement) {
        assertArg(isElement(element), 'element', 'not an element');
        assertArg(isElement(parentElement), 'parentElement', 'not an element');
        element.data(NG_ANIMATE_PIN_DATA, parentElement);
      },

      push: function(element, event, options, domOperation) {
        options = options || {};
        options.domOperation = domOperation;
        return queueAnimation(element, event, options);
      },

      // this method has four signatures:
      //  () - global getter
      //  (bool) - global setter
      //  (element) - element getter
      //  (element, bool) - element setter<F37>
      enabled: function(element, bool) {
        var argCount = arguments.length;

        if (argCount === 0) {
          // () - Global getter
          bool = !!animationsEnabled;
        } else {
          var hasElement = isElement(element);

          if (!hasElement) {
            // (bool) - Global setter
            bool = animationsEnabled = !!element;
          } else {
            var node = getDomNode(element);
            var recordExists = disabledElementsLookup.get(node);

            if (argCount === 1) {
              // (element) - Element getter
              bool = !recordExists;
            } else {
              // (element, bool) - Element setter
              bool = !!bool;
              if (!bool) {
                disabledElementsLookup.put(node, true);
              } else if (recordExists) {
                disabledElementsLookup.remove(node);
              }
            }
          }
        }

        return bool;
      }
    };

    function queueAnimation(element, event, options) {
      var node, parent;
      element = stripCommentsFromElement(element);
      if (element) {
        node = getDomNode(element);
        parent = element.parent();
      }

      options = prepareAnimationOptions(options);

      // we create a fake runner with a working promise.
      // These methods will become available after the digest has passed
      var runner = new $$AnimateRunner();

      // this is used to trigger callbacks in postDigest mode
      var runInNextPostDigestOrNow = postDigestTaskFactory();

      if (isArray(options.addClass)) {
        options.addClass = options.addClass.join(' ');
      }

      if (options.addClass && !isString(options.addClass)) {
        options.addClass = null;
      }

      if (isArray(options.removeClass)) {
        options.removeClass = options.removeClass.join(' ');
      }

      if (options.removeClass && !isString(options.removeClass)) {
        options.removeClass = null;
      }

      if (options.from && !isObject(options.from)) {
        options.from = null;
      }

      if (options.to && !isObject(options.to)) {
        options.to = null;
      }

      // there are situations where a directive issues an animation for
      // a jqLite wrapper that contains only comment nodes... If this
      // happens then there is no way we can perform an animation
      if (!node) {
        close();
        return runner;
      }

      var className = [node.className, options.addClass, options.removeClass].join(' ');
      if (!isAnimatableClassName(className)) {
        close();
        return runner;
      }

      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;

      // this is a hard disable of all animations for the application or on
      // the element itself, therefore  there is no need to continue further
      // past this point if not enabled
      var skipAnimations = !animationsEnabled || disabledElementsLookup.get(node);
      var existingAnimation = (!skipAnimations && activeAnimationsLookup.get(node)) || {};
      var hasExistingAnimation = !!existingAnimation.state;

      // there is no point in traversing the same collection of parent ancestors if a followup
      // animation will be run on the same element that already did all that checking work
      if (!skipAnimations && (!hasExistingAnimation || existingAnimation.state != PRE_DIGEST_STATE)) {
        skipAnimations = !areAnimationsAllowed(element, parent, event);
      }

      if (skipAnimations) {
        close();
        return runner;
      }

      if (isStructural) {
        closeChildAnimations(element);
      }

      var newAnimation = {
        structural: isStructural,
        element: element,
        event: event,
        close: close,
        options: options,
        runner: runner
      };

      if (hasExistingAnimation) {
        var skipAnimationFlag = isAllowed('skip', element, newAnimation, existingAnimation);
        if (skipAnimationFlag) {
          if (existingAnimation.state === RUNNING_STATE) {
            close();
            return runner;
          } else {
            mergeAnimationOptions(element, existingAnimation.options, options);
            return existingAnimation.runner;
          }
        }

        var cancelAnimationFlag = isAllowed('cancel', element, newAnimation, existingAnimation);
        if (cancelAnimationFlag) {
          if (existingAnimation.state === RUNNING_STATE) {
            // this will end the animation right away and it is safe
            // to do so since the animation is already running and the
            // runner callback code will run in async
            existingAnimation.runner.end();
          } else if (existingAnimation.structural) {
            // this means that the animation is queued into a digest, but
            // hasn't started yet. Therefore it is safe to run the close
            // method which will call the runner methods in async.
            existingAnimation.close();
          } else {
            // this will merge the new animation options into existing animation options
            mergeAnimationOptions(element, existingAnimation.options, newAnimation.options);
            return existingAnimation.runner;
          }
        } else {
          // a joined animation means that this animation will take over the existing one
          // so an example would involve a leave animation taking over an enter. Then when
          // the postDigest kicks in the enter will be ignored.
          var joinAnimationFlag = isAllowed('join', element, newAnimation, existingAnimation);
          if (joinAnimationFlag) {
            if (existingAnimation.state === RUNNING_STATE) {
              normalizeAnimationOptions(element, options);
            } else {
              applyGeneratedPreparationClasses(element, isStructural ? event : null, options);

              event = newAnimation.event = existingAnimation.event;
              options = mergeAnimationOptions(element, existingAnimation.options, newAnimation.options);

              //we return the same runner since only the option values of this animation will
              //be fed into the `existingAnimation`.
              return existingAnimation.runner;
            }
          }
        }
      } else {
        // normalization in this case means that it removes redundant CSS classes that
        // already exist (addClass) or do not exist (removeClass) on the element
        normalizeAnimationOptions(element, options);
      }

      // when the options are merged and cleaned up we may end up not having to do
      // an animation at all, therefore we should check this before issuing a post
      // digest callback. Structural animations will always run no matter what.
      var isValidAnimation = newAnimation.structural;
      if (!isValidAnimation) {
        // animate (from/to) can be quickly checked first, otherwise we check if any classes are present
        isValidAnimation = (newAnimation.event === 'animate' && Object.keys(newAnimation.options.to || {}).length > 0)
                            || hasAnimationClasses(newAnimation.options);
      }

      if (!isValidAnimation) {
        close();
        clearElementAnimationState(element);
        return runner;
      }

      // the counter keeps track of cancelled animations
      var counter = (existingAnimation.counter || 0) + 1;
      newAnimation.counter = counter;

      markElementAnimationState(element, PRE_DIGEST_STATE, newAnimation);

      $rootScope.$$postDigest(function() {
        var animationDetails = activeAnimationsLookup.get(node);
        var animationCancelled = !animationDetails;
        animationDetails = animationDetails || {};

        // if addClass/removeClass is called before something like enter then the
        // registered parent element may not be present. The code below will ensure
        // that a final value for parent element is obtained
        var parentElement = element.parent() || [];

        // animate/structural/class-based animations all have requirements. Otherwise there
        // is no point in performing an animation. The parent node must also be set.
        var isValidAnimation = parentElement.length > 0
                                && (animationDetails.event === 'animate'
                                    || animationDetails.structural
                                    || hasAnimationClasses(animationDetails.options));

        // this means that the previous animation was cancelled
        // even if the follow-up animation is the same event
        if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) {
          // if another animation did not take over then we need
          // to make sure that the domOperation and options are
          // handled accordingly
          if (animationCancelled) {
            applyAnimationClasses(element, options);
            applyAnimationStyles(element, options);
          }

          // if the event changed from something like enter to leave then we do
          // it, otherwise if it's the same then the end result will be the same too
          if (animationCancelled || (isStructural && animationDetails.event !== event)) {
            options.domOperation();
            runner.end();
          }

          // in the event that the element animation was not cancelled or a follow-up animation
          // isn't allowed to animate from here then we need to clear the state of the element
          // so that any future animations won't read the expired animation data.
          if (!isValidAnimation) {
            clearElementAnimationState(element);
          }

          return;
        }

        // this combined multiple class to addClass / removeClass into a setClass event
        // so long as a structural event did not take over the animation
        event = !animationDetails.structural && hasAnimationClasses(animationDetails.options, true)
            ? 'setClass'
            : animationDetails.event;

        markElementAnimationState(element, RUNNING_STATE);
        var realRunner = $$animation(element, event, animationDetails.options);

        realRunner.done(function(status) {
          close(!status);
          var animationDetails = activeAnimationsLookup.get(node);
          if (animationDetails && animationDetails.counter === counter) {
            clearElementAnimationState(getDomNode(element));
          }
          notifyProgress(runner, event, 'close', {});
        });

        // this will update the runner's flow-control events based on
        // the `realRunner` object.
        runner.setHost(realRunner);
        notifyProgress(runner, event, 'start', {});
      });

      return runner;

      function notifyProgress(runner, event, phase, data) {
        runInNextPostDigestOrNow(function() {
          var callbacks = findCallbacks(parent, element, event);
          if (callbacks.length) {
            // do not optimize this call here to RAF because
            // we don't know how heavy the callback code here will
            // be and if this code is buffered then this can
            // lead to a performance regression.
            $$rAF(function() {
              forEach(callbacks, function(callback) {
                callback(element, phase, data);
              });
            });
          }
        });
        runner.progress(event, phase, data);
      }

      function close(reject) { // jshint ignore:line
        clearGeneratedClasses(element, options);
        applyAnimationClasses(element, options);
        applyAnimationStyles(element, options);
        options.domOperation();
        runner.complete(!reject);
      }
    }

    function closeChildAnimations(element) {
      var node = getDomNode(element);
      var children = node.querySelectorAll('[' + NG_ANIMATE_ATTR_NAME + ']');
      forEach(children, function(child) {
        var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME));
        var animationDetails = activeAnimationsLookup.get(child);
        switch (state) {
          case RUNNING_STATE:
            animationDetails.runner.end();
            /* falls through */
          case PRE_DIGEST_STATE:
            if (animationDetails) {
              activeAnimationsLookup.remove(child);
            }
            break;
        }
      });
    }

    function clearElementAnimationState(element) {
      var node = getDomNode(element);
      node.removeAttribute(NG_ANIMATE_ATTR_NAME);
      activeAnimationsLookup.remove(node);
    }

    function isMatchingElement(nodeOrElmA, nodeOrElmB) {
      return getDomNode(nodeOrElmA) === getDomNode(nodeOrElmB);
    }

    function areAnimationsAllowed(element, parentElement, event) {
      var bodyElement = jqLite($document[0].body);
      var bodyElementDetected = isMatchingElement(element, bodyElement) || element[0].nodeName === 'HTML';
      var rootElementDetected = isMatchingElement(element, $rootElement);
      var parentAnimationDetected = false;
      var animateChildren;

      var parentHost = element.data(NG_ANIMATE_PIN_DATA);
      if (parentHost) {
        parentElement = parentHost;
      }

      while (parentElement && parentElement.length) {
        if (!rootElementDetected) {
          // angular doesn't want to attempt to animate elements outside of the application
          // therefore we need to ensure that the rootElement is an ancestor of the current element
          rootElementDetected = isMatchingElement(parentElement, $rootElement);
        }

        var parentNode = parentElement[0];
        if (parentNode.nodeType !== ELEMENT_NODE) {
          // no point in inspecting the #document element
          break;
        }

        var details = activeAnimationsLookup.get(parentNode) || {};
        // either an enter, leave or move animation will commence
        // therefore we can't allow any animations to take place
        // but if a parent animation is class-based then that's ok
        if (!parentAnimationDetected) {
          parentAnimationDetected = details.structural || disabledElementsLookup.get(parentNode);
        }

        if (isUndefined(animateChildren) || animateChildren === true) {
          var value = parentElement.data(NG_ANIMATE_CHILDREN_DATA);
          if (isDefined(value)) {
            animateChildren = value;
          }
        }

        // there is no need to continue traversing at this point
        if (parentAnimationDetected && animateChildren === false) break;

        if (!rootElementDetected) {
          // angular doesn't want to attempt to animate elements outside of the application
          // therefore we need to ensure that the rootElement is an ancestor of the current element
          rootElementDetected = isMatchingElement(parentElement, $rootElement);
          if (!rootElementDetected) {
            parentHost = parentElement.data(NG_ANIMATE_PIN_DATA);
            if (parentHost) {
              parentElement = parentHost;
            }
          }
        }

        if (!bodyElementDetected) {
          // we also need to ensure that the element is or will be apart of the body element
          // otherwise it is pointless to even issue an animation to be rendered
          bodyElementDetected = isMatchingElement(parentElement, bodyElement);
        }

        parentElement = parentElement.parent();
      }

      var allowAnimation = !parentAnimationDetected || animateChildren;
      return allowAnimation && rootElementDetected && bodyElementDetected;
    }

    function markElementAnimationState(element, state, details) {
      details = details || {};
      details.state = state;

      var node = getDomNode(element);
      node.setAttribute(NG_ANIMATE_ATTR_NAME, state);

      var oldValue = activeAnimationsLookup.get(node);
      var newValue = oldValue
          ? extend(oldValue, details)
          : details;
      activeAnimationsLookup.put(node, newValue);
    }
  }];
}];

var $$AnimateAsyncRunFactory = ['$$rAF', function($$rAF) {
  var waitQueue = [];

  function waitForTick(fn) {
    waitQueue.push(fn);
    if (waitQueue.length > 1) return;
    $$rAF(function() {
      for (var i = 0; i < waitQueue.length; i++) {
        waitQueue[i]();
      }
      waitQueue = [];
    });
  }

  return function() {
    var passed = false;
    waitForTick(function() {
      passed = true;
    });
    return function(callback) {
      passed ? callback() : waitForTick(callback);
    };
  };
}];

var $$AnimateRunnerFactory = ['$q', '$sniffer', '$$animateAsyncRun',
                      function($q,   $sniffer,   $$animateAsyncRun) {

  var INITIAL_STATE = 0;
  var DONE_PENDING_STATE = 1;
  var DONE_COMPLETE_STATE = 2;

  AnimateRunner.chain = function(chain, callback) {
    var index = 0;

    next();
    function next() {
      if (index === chain.length) {
        callback(true);
        return;
      }

      chain[index](function(response) {
        if (response === false) {
          callback(false);
          return;
        }
        index++;
        next();
      });
    }
  };

  AnimateRunner.all = function(runners, callback) {
    var count = 0;
    var status = true;
    forEach(runners, function(runner) {
      runner.done(onProgress);
    });

    function onProgress(response) {
      status = status && response;
      if (++count === runners.length) {
        callback(status);
      }
    }
  };

  function AnimateRunner(host) {
    this.setHost(host);

    this._doneCallbacks = [];
    this._runInAnimationFrame = $$animateAsyncRun();
    this._state = 0;
  }

  AnimateRunner.prototype = {
    setHost: function(host) {
      this.host = host || {};
    },

    done: function(fn) {
      if (this._state === DONE_COMPLETE_STATE) {
        fn();
      } else {
        this._doneCallbacks.push(fn);
      }
    },

    progress: noop,

    getPromise: function() {
      if (!this.promise) {
        var self = this;
        this.promise = $q(function(resolve, reject) {
          self.done(function(status) {
            status === false ? reject() : resolve();
          });
        });
      }
      return this.promise;
    },

    then: function(resolveHandler, rejectHandler) {
      return this.getPromise().then(resolveHandler, rejectHandler);
    },

    'catch': function(handler) {
      return this.getPromise()['catch'](handler);
    },

    'finally': function(handler) {
      return this.getPromise()['finally'](handler);
    },

    pause: function() {
      if (this.host.pause) {
        this.host.pause();
      }
    },

    resume: function() {
      if (this.host.resume) {
        this.host.resume();
      }
    },

    end: function() {
      if (this.host.end) {
        this.host.end();
      }
      this._resolve(true);
    },

    cancel: function() {
      if (this.host.cancel) {
        this.host.cancel();
      }
      this._resolve(false);
    },

    complete: function(response) {
      var self = this;
      if (self._state === INITIAL_STATE) {
        self._state = DONE_PENDING_STATE;
        self._runInAnimationFrame(function() {
          self._resolve(response);
        });
      }
    },

    _resolve: function(response) {
      if (this._state !== DONE_COMPLETE_STATE) {
        forEach(this._doneCallbacks, function(fn) {
          fn(response);
        });
        this._doneCallbacks.length = 0;
        this._state = DONE_COMPLETE_STATE;
      }
    }
  };

  return AnimateRunner;
}];

var $$AnimationProvider = ['$animateProvider', function($animateProvider) {
  var NG_ANIMATE_REF_ATTR = 'ng-animate-ref';

  var drivers = this.drivers = [];

  var RUNNER_STORAGE_KEY = '$$animationRunner';

  function setRunner(element, runner) {
    element.data(RUNNER_STORAGE_KEY, runner);
  }

  function removeRunner(element) {
    element.removeData(RUNNER_STORAGE_KEY);
  }

  function getRunner(element) {
    return element.data(RUNNER_STORAGE_KEY);
  }

  this.$get = ['$$jqLite', '$rootScope', '$injector', '$$AnimateRunner', '$$HashMap', '$$rAFScheduler',
       function($$jqLite,   $rootScope,   $injector,   $$AnimateRunner,   $$HashMap,   $$rAFScheduler) {

    var animationQueue = [];
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    function sortAnimations(animations) {
      var tree = { children: [] };
      var i, lookup = new $$HashMap();

      // this is done first beforehand so that the hashmap
      // is filled with a list of the elements that will be animated
      for (i = 0; i < animations.length; i++) {
        var animation = animations[i];
        lookup.put(animation.domNode, animations[i] = {
          domNode: animation.domNode,
          fn: animation.fn,
          children: []
        });
      }

      for (i = 0; i < animations.length; i++) {
        processNode(animations[i]);
      }

      return flatten(tree);

      function processNode(entry) {
        if (entry.processed) return entry;
        entry.processed = true;

        var elementNode = entry.domNode;
        var parentNode = elementNode.parentNode;
        lookup.put(elementNode, entry);

        var parentEntry;
        while (parentNode) {
          parentEntry = lookup.get(parentNode);
          if (parentEntry) {
            if (!parentEntry.processed) {
              parentEntry = processNode(parentEntry);
            }
            break;
          }
          parentNode = parentNode.parentNode;
        }

        (parentEntry || tree).children.push(entry);
        return entry;
      }

      function flatten(tree) {
        var result = [];
        var queue = [];
        var i;

        for (i = 0; i < tree.children.length; i++) {
          queue.push(tree.children[i]);
        }

        var remainingLevelEntries = queue.length;
        var nextLevelEntries = 0;
        var row = [];

        for (i = 0; i < queue.length; i++) {
          var entry = queue[i];
          if (remainingLevelEntries <= 0) {
            remainingLevelEntries = nextLevelEntries;
            nextLevelEntries = 0;
            result.push(row);
            row = [];
          }
          row.push(entry.fn);
          entry.children.forEach(function(childEntry) {
            nextLevelEntries++;
            queue.push(childEntry);
          });
          remainingLevelEntries--;
        }

        if (row.length) {
          result.push(row);
        }

        return result;
      }
    }

    // TODO(matsko): document the signature in a better way
    return function(element, event, options) {
      options = prepareAnimationOptions(options);
      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;

      // there is no animation at the current moment, however
      // these runner methods will get later updated with the
      // methods leading into the driver's end/cancel methods
      // for now they just stop the animation from starting
      var runner = new $$AnimateRunner({
        end: function() { close(); },
        cancel: function() { close(true); }
      });

      if (!drivers.length) {
        close();
        return runner;
      }

      setRunner(element, runner);

      var classes = mergeClasses(element.attr('class'), mergeClasses(options.addClass, options.removeClass));
      var tempClasses = options.tempClasses;
      if (tempClasses) {
        classes += ' ' + tempClasses;
        options.tempClasses = null;
      }

      animationQueue.push({
        // this data is used by the postDigest code and passed into
        // the driver step function
        element: element,
        classes: classes,
        event: event,
        structural: isStructural,
        options: options,
        beforeStart: beforeStart,
        close: close
      });

      element.on('$destroy', handleDestroyedElement);

      // we only want there to be one function called within the post digest
      // block. This way we can group animations for all the animations that
      // were apart of the same postDigest flush call.
      if (animationQueue.length > 1) return runner;

      $rootScope.$$postDigest(function() {
        var animations = [];
        forEach(animationQueue, function(entry) {
          // the element was destroyed early on which removed the runner
          // form its storage. This means we can't animate this element
          // at all and it already has been closed due to destruction.
          if (getRunner(entry.element)) {
            animations.push(entry);
          } else {
            entry.close();
          }
        });

        // now any future animations will be in another postDigest
        animationQueue.length = 0;

        var groupedAnimations = groupAnimations(animations);
        var toBeSortedAnimations = [];

        forEach(groupedAnimations, function(animationEntry) {
          toBeSortedAnimations.push({
            domNode: getDomNode(animationEntry.from ? animationEntry.from.element : animationEntry.element),
            fn: function triggerAnimationStart() {
              // it's important that we apply the `ng-animate` CSS class and the
              // temporary classes before we do any driver invoking since these
              // CSS classes may be required for proper CSS detection.
              animationEntry.beforeStart();

              var startAnimationFn, closeFn = animationEntry.close;

              // in the event that the element was removed before the digest runs or
              // during the RAF sequencing then we should not trigger the animation.
              var targetElement = animationEntry.anchors
                  ? (animationEntry.from.element || animationEntry.to.element)
                  : animationEntry.element;

              if (getRunner(targetElement)) {
                var operation = invokeFirstDriver(animationEntry);
                if (operation) {
                  startAnimationFn = operation.start;
                }
              }

              if (!startAnimationFn) {
                closeFn();
              } else {
                var animationRunner = startAnimationFn();
                animationRunner.done(function(status) {
                  closeFn(!status);
                });
                updateAnimationRunners(animationEntry, animationRunner);
              }
            }
          });
        });

        // we need to sort each of the animations in order of parent to child
        // relationships. This ensures that the child classes are applied at the
        // right time.
        $$rAFScheduler(sortAnimations(toBeSortedAnimations));
      });

      return runner;

      // TODO(matsko): change to reference nodes
      function getAnchorNodes(node) {
        var SELECTOR = '[' + NG_ANIMATE_REF_ATTR + ']';
        var items = node.hasAttribute(NG_ANIMATE_REF_ATTR)
              ? [node]
              : node.querySelectorAll(SELECTOR);
        var anchors = [];
        forEach(items, function(node) {
          var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);
          if (attr && attr.length) {
            anchors.push(node);
          }
        });
        return anchors;
      }

      function groupAnimations(animations) {
        var preparedAnimations = [];
        var refLookup = {};
        forEach(animations, function(animation, index) {
          var element = animation.element;
          var node = getDomNode(element);
          var event = animation.event;
          var enterOrMove = ['enter', 'move'].indexOf(event) >= 0;
          var anchorNodes = animation.structural ? getAnchorNodes(node) : [];

          if (anchorNodes.length) {
            var direction = enterOrMove ? 'to' : 'from';

            forEach(anchorNodes, function(anchor) {
              var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);
              refLookup[key] = refLookup[key] || {};
              refLookup[key][direction] = {
                animationID: index,
                element: jqLite(anchor)
              };
            });
          } else {
            preparedAnimations.push(animation);
          }
        });

        var usedIndicesLookup = {};
        var anchorGroups = {};
        forEach(refLookup, function(operations, key) {
          var from = operations.from;
          var to = operations.to;

          if (!from || !to) {
            // only one of these is set therefore we can't have an
            // anchor animation since all three pieces are required
            var index = from ? from.animationID : to.animationID;
            var indexKey = index.toString();
            if (!usedIndicesLookup[indexKey]) {
              usedIndicesLookup[indexKey] = true;
              preparedAnimations.push(animations[index]);
            }
            return;
          }

          var fromAnimation = animations[from.animationID];
          var toAnimation = animations[to.animationID];
          var lookupKey = from.animationID.toString();
          if (!anchorGroups[lookupKey]) {
            var group = anchorGroups[lookupKey] = {
              structural: true,
              beforeStart: function() {
                fromAnimation.beforeStart();
                toAnimation.beforeStart();
              },
              close: function() {
                fromAnimation.close();
                toAnimation.close();
              },
              classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),
              from: fromAnimation,
              to: toAnimation,
              anchors: [] // TODO(matsko): change to reference nodes
            };

            // the anchor animations require that the from and to elements both have at least
            // one shared CSS class which effictively marries the two elements together to use
            // the same animation driver and to properly sequence the anchor animation.
            if (group.classes.length) {
              preparedAnimations.push(group);
            } else {
              preparedAnimations.push(fromAnimation);
              preparedAnimations.push(toAnimation);
            }
          }

          anchorGroups[lookupKey].anchors.push({
            'out': from.element, 'in': to.element
          });
        });

        return preparedAnimations;
      }

      function cssClassesIntersection(a,b) {
        a = a.split(' ');
        b = b.split(' ');
        var matches = [];

        for (var i = 0; i < a.length; i++) {
          var aa = a[i];
          if (aa.substring(0,3) === 'ng-') continue;

          for (var j = 0; j < b.length; j++) {
            if (aa === b[j]) {
              matches.push(aa);
              break;
            }
          }
        }

        return matches.join(' ');
      }

      function invokeFirstDriver(animationDetails) {
        // we loop in reverse order since the more general drivers (like CSS and JS)
        // may attempt more elements, but custom drivers are more particular
        for (var i = drivers.length - 1; i >= 0; i--) {
          var driverName = drivers[i];
          if (!$injector.has(driverName)) continue; // TODO(matsko): remove this check

          var factory = $injector.get(driverName);
          var driver = factory(animationDetails);
          if (driver) {
            return driver;
          }
        }
      }

      function beforeStart() {
        element.addClass(NG_ANIMATE_CLASSNAME);
        if (tempClasses) {
          $$jqLite.addClass(element, tempClasses);
        }
      }

      function updateAnimationRunners(animation, newRunner) {
        if (animation.from && animation.to) {
          update(animation.from.element);
          update(animation.to.element);
        } else {
          update(animation.element);
        }

        function update(element) {
          getRunner(element).setHost(newRunner);
        }
      }

      function handleDestroyedElement() {
        var runner = getRunner(element);
        if (runner && (event !== 'leave' || !options.$$domOperationFired)) {
          runner.end();
        }
      }

      function close(rejected) { // jshint ignore:line
        element.off('$destroy', handleDestroyedElement);
        removeRunner(element);

        applyAnimationClasses(element, options);
        applyAnimationStyles(element, options);
        options.domOperation();

        if (tempClasses) {
          $$jqLite.removeClass(element, tempClasses);
        }

        element.removeClass(NG_ANIMATE_CLASSNAME);
        runner.complete(!rejected);
      }
    };
  }];
}];

/* global angularAnimateModule: true,

   $$AnimateAsyncRunFactory,
   $$rAFSchedulerFactory,
   $$AnimateChildrenDirective,
   $$AnimateRunnerFactory,
   $$AnimateQueueProvider,
   $$AnimationProvider,
   $AnimateCssProvider,
   $$AnimateCssDriverProvider,
   $$AnimateJsProvider,
   $$AnimateJsDriverProvider,
*/

/**
 * @ngdoc module
 * @name ngAnimate
 * @description
 *
 * The `ngAnimate` module provides support for CSS-based animations (keyframes and transitions) as well as JavaScript-based animations via
 * callback hooks. Animations are not enabled by default, however, by including `ngAnimate` the animation hooks are enabled for an Angular app.
 *
 * <div doc-module-components="ngAnimate"></div>
 *
 * # Usage
 * Simply put, there are two ways to make use of animations when ngAnimate is used: by using **CSS** and **JavaScript**. The former works purely based
 * using CSS (by using matching CSS selectors/styles) and the latter triggers animations that are registered via `module.animation()`. For
 * both CSS and JS animations the sole requirement is to have a matching `CSS class` that exists both in the registered animation and within
 * the HTML element that the animation will be triggered on.
 *
 * ## Directive Support
 * The following directives are "animation aware":
 *
 * | Directive                                                                                                | Supported Animations                                                     |
 * |----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
 * | {@link ng.directive:ngRepeat#animations ngRepeat}                                                        | enter, leave and move                                                    |
 * | {@link ngRoute.directive:ngView#animations ngView}                                                       | enter and leave                                                          |
 * | {@link ng.directive:ngInclude#animations ngInclude}                                                      | enter and leave                                                          |
 * | {@link ng.directive:ngSwitch#animations ngSwitch}                                                        | enter and leave                                                          |
 * | {@link ng.directive:ngIf#animations ngIf}                                                                | enter and leave                                                          |
 * | {@link ng.directive:ngClass#animations ngClass}                                                          | add and remove (the CSS class(es) present)                               |
 * | {@link ng.directive:ngShow#animations ngShow} & {@link ng.directive:ngHide#animations ngHide}            | add and remove (the ng-hide class value)                                 |
 * | {@link ng.directive:form#animation-hooks form} & {@link ng.directive:ngModel#animation-hooks ngModel}    | add and remove (dirty, pristine, valid, invalid & all other validations) |
 * | {@link module:ngMessages#animations ngMessages}                                                          | add and remove (ng-active & ng-inactive)                                 |
 * | {@link module:ngMessages#animations ngMessage}                                                           | enter and leave                                                          |
 *
 * (More information can be found by visiting each the documentation associated with each directive.)
 *
 * ## CSS-based Animations
 *
 * CSS-based animations with ngAnimate are unique since they require no JavaScript code at all. By using a CSS class that we reference between our HTML
 * and CSS code we can create an animation that will be picked up by Angular when an the underlying directive performs an operation.
 *
 * The example below shows how an `enter` animation can be made possible on an element using `ng-if`:
 *
 * ```html
 * <div ng-if="bool" class="fade">
 *    Fade me in out
 * </div>
 * <button ng-click="bool=true">Fade In!</button>
 * <button ng-click="bool=false">Fade Out!</button>
 * ```
 *
 * Notice the CSS class **fade**? We can now create the CSS transition code that references this class:
 *
 * ```css
 * /&#42; The starting CSS styles for the enter animation &#42;/
 * .fade.ng-enter {
 *   transition:0.5s linear all;
 *   opacity:0;
 * }
 *
 * /&#42; The finishing CSS styles for the enter animation &#42;/
 * .fade.ng-enter.ng-enter-active {
 *   opacity:1;
 * }
 * ```
 *
 * The key thing to remember here is that, depending on the animation event (which each of the directives above trigger depending on what's going on) two
 * generated CSS classes will be applied to the element; in the example above we have `.ng-enter` and `.ng-enter-active`. For CSS transitions, the transition
 * code **must** be defined within the starting CSS class (in this case `.ng-enter`). The destination class is what the transition will animate towards.
 *
 * If for example we wanted to create animations for `leave` and `move` (ngRepeat triggers move) then we can do so using the same CSS naming conventions:
 *
 * ```css
 * /&#42; now the element will fade out before it is removed from the DOM &#42;/
 * .fade.ng-leave {
 *   transition:0.5s linear all;
 *   opacity:1;
 * }
 * .fade.ng-leave.ng-leave-active {
 *   opacity:0;
 * }
 * ```
 *
 * We can also make use of **CSS Keyframes** by referencing the keyframe animation within the starting CSS class:
 *
 * ```css
 * /&#42; there is no need to define anything inside of the destination
 * CSS class since the keyframe will take charge of the animation &#42;/
 * .fade.ng-leave {
 *   animation: my_fade_animation 0.5s linear;
 *   -webkit-animation: my_fade_animation 0.5s linear;
 * }
 *
 * @keyframes my_fade_animation {
 *   from { opacity:1; }
 *   to { opacity:0; }
 * }
 *
 * @-webkit-keyframes my_fade_animation {
 *   from { opacity:1; }
 *   to { opacity:0; }
 * }
 * ```
 *
 * Feel free also mix transitions and keyframes together as well as any other CSS classes on the same element.
 *
 * ### CSS Class-based Animations
 *
 * Class-based animations (animations that are triggered via `ngClass`, `ngShow`, `ngHide` and some other directives) have a slightly different
 * naming convention. Class-based animations are basic enough that a standard transition or keyframe can be referenced on the class being added
 * and removed.
 *
 * For example if we wanted to do a CSS animation for `ngHide` then we place an animation on the `.ng-hide` CSS class:
 *
 * ```html
 * <div ng-show="bool" class="fade">
 *   Show and hide me
 * </div>
 * <button ng-click="bool=true">Toggle</button>
 *
 * <style>
 * .fade.ng-hide {
 *   transition:0.5s linear all;
 *   opacity:0;
 * }
 * </style>
 * ```
 *
 * All that is going on here with ngShow/ngHide behind the scenes is the `.ng-hide` class is added/removed (when the hidden state is valid). Since
 * ngShow and ngHide are animation aware then we can match up a transition and ngAnimate handles the rest.
 *
 * In addition the addition and removal of the CSS class, ngAnimate also provides two helper methods that we can use to further decorate the animation
 * with CSS styles.
 *
 * ```html
 * <div ng-class="{on:onOff}" class="highlight">
 *   Highlight this box
 * </div>
 * <button ng-click="onOff=!onOff">Toggle</button>
 *
 * <style>
 * .highlight {
 *   transition:0.5s linear all;
 * }
 * .highlight.on-add {
 *   background:white;
 * }
 * .highlight.on {
 *   background:yellow;
 * }
 * .highlight.on-remove {
 *   background:black;
 * }
 * </style>
 * ```
 *
 * We can also make use of CSS keyframes by placing them within the CSS classes.
 *
 *
 * ### CSS Staggering Animations
 * A Staggering animation is a collection of animations that are issued with a slight delay in between each successive operation resulting in a
 * curtain-like effect. The ngAnimate module (versions >=1.2) supports staggering animations and the stagger effect can be
 * performed by creating a **ng-EVENT-stagger** CSS class and attaching that class to the base CSS class used for
 * the animation. The style property expected within the stagger class can either be a **transition-delay** or an
 * **animation-delay** property (or both if your animation contains both transitions and keyframe animations).
 *
 * ```css
 * .my-animation.ng-enter {
 *   /&#42; standard transition code &#42;/
 *   transition: 1s linear all;
 *   opacity:0;
 * }
 * .my-animation.ng-enter-stagger {
 *   /&#42; this will have a 100ms delay between each successive leave animation &#42;/
 *   transition-delay: 0.1s;
 *
 *   /&#42; As of 1.4.4, this must always be set: it signals ngAnimate
 *     to not accidentally inherit a delay property from another CSS class &#42;/
 *   transition-duration: 0s;
 * }
 * .my-animation.ng-enter.ng-enter-active {
 *   /&#42; standard transition styles &#42;/
 *   opacity:1;
 * }
 * ```
 *
 * Staggering animations work by default in ngRepeat (so long as the CSS class is defined). Outside of ngRepeat, to use staggering animations
 * on your own, they can be triggered by firing multiple calls to the same event on $animate. However, the restrictions surrounding this
 * are that each of the elements must have the same CSS className value as well as the same parent element. A stagger operation
 * will also be reset if one or more animation frames have passed since the multiple calls to `$animate` were fired.
 *
 * The following code will issue the **ng-leave-stagger** event on the element provided:
 *
 * ```js
 * var kids = parent.children();
 *
 * $animate.leave(kids[0]); //stagger index=0
 * $animate.leave(kids[1]); //stagger index=1
 * $animate.leave(kids[2]); //stagger index=2
 * $animate.leave(kids[3]); //stagger index=3
 * $animate.leave(kids[4]); //stagger index=4
 *
 * window.requestAnimationFrame(function() {
 *   //stagger has reset itself
 *   $animate.leave(kids[5]); //stagger index=0
 *   $animate.leave(kids[6]); //stagger index=1
 *
 *   $scope.$digest();
 * });
 * ```
 *
 * Stagger animations are currently only supported within CSS-defined animations.
 *
 * ### The `ng-animate` CSS class
 *
 * When ngAnimate is animating an element it will apply the `ng-animate` CSS class to the element for the duration of the animation.
 * This is a temporary CSS class and it will be removed once the animation is over (for both JavaScript and CSS-based animations).
 *
 * Therefore, animations can be applied to an element using this temporary class directly via CSS.
 *
 * ```css
 * .zipper.ng-animate {
 *   transition:0.5s linear all;
 * }
 * .zipper.ng-enter {
 *   opacity:0;
 * }
 * .zipper.ng-enter.ng-enter-active {
 *   opacity:1;
 * }
 * .zipper.ng-leave {
 *   opacity:1;
 * }
 * .zipper.ng-leave.ng-leave-active {
 *   opacity:0;
 * }
 * ```
 *
 * (Note that the `ng-animate` CSS class is reserved and it cannot be applied on an element directly since ngAnimate will always remove
 * the CSS class once an animation has completed.)
 *
 *
 * ## JavaScript-based Animations
 *
 * ngAnimate also allows for animations to be consumed by JavaScript code. The approach is similar to CSS-based animations (where there is a shared
 * CSS class that is referenced in our HTML code) but in addition we need to register the JavaScript animation on the module. By making use of the
 * `module.animation()` module function we can register the ainmation.
 *
 * Let's see an example of a enter/leave animation using `ngRepeat`:
 *
 * ```html
 * <div ng-repeat="item in items" class="slide">
 *   {{ item }}
 * </div>
 * ```
 *
 * See the **slide** CSS class? Let's use that class to define an animation that we'll structure in our module code by using `module.animation`:
 *
 * ```js
 * myModule.animation('.slide', [function() {
 *   return {
 *     // make note that other events (like addClass/removeClass)
 *     // have different function input parameters
 *     enter: function(element, doneFn) {
 *       jQuery(element).fadeIn(1000, doneFn);
 *
 *       // remember to call doneFn so that angular
 *       // knows that the animation has concluded
 *     },
 *
 *     move: function(element, doneFn) {
 *       jQuery(element).fadeIn(1000, doneFn);
 *     },
 *
 *     leave: function(element, doneFn) {
 *       jQuery(element).fadeOut(1000, doneFn);
 *     }
 *   }
 * }]);
 * ```
 *
 * The nice thing about JS-based animations is that we can inject other services and make use of advanced animation libraries such as
 * greensock.js and velocity.js.
 *
 * If our animation code class-based (meaning that something like `ngClass`, `ngHide` and `ngShow` triggers it) then we can still define
 * our animations inside of the same registered animation, however, the function input arguments are a bit different:
 *
 * ```html
 * <div ng-class="color" class="colorful">
 *   this box is moody
 * </div>
 * <button ng-click="color='red'">Change to red</button>
 * <button ng-click="color='blue'">Change to blue</button>
 * <button ng-click="color='green'">Change to green</button>
 * ```
 *
 * ```js
 * myModule.animation('.colorful', [function() {
 *   return {
 *     addClass: function(element, className, doneFn) {
 *       // do some cool animation and call the doneFn
 *     },
 *     removeClass: function(element, className, doneFn) {
 *       // do some cool animation and call the doneFn
 *     },
 *     setClass: function(element, addedClass, removedClass, doneFn) {
 *       // do some cool animation and call the doneFn
 *     }
 *   }
 * }]);
 * ```
 *
 * ## CSS + JS Animations Together
 *
 * AngularJS 1.4 and higher has taken steps to make the amalgamation of CSS and JS animations more flexible. However, unlike earlier versions of Angular,
 * defining CSS and JS animations to work off of the same CSS class will not work anymore. Therefore the example below will only result in **JS animations taking
 * charge of the animation**:
 *
 * ```html
 * <div ng-if="bool" class="slide">
 *   Slide in and out
 * </div>
 * ```
 *
 * ```js
 * myModule.animation('.slide', [function() {
 *   return {
 *     enter: function(element, doneFn) {
 *       jQuery(element).slideIn(1000, doneFn);
 *     }
 *   }
 * }]);
 * ```
 *
 * ```css
 * .slide.ng-enter {
 *   transition:0.5s linear all;
 *   transform:translateY(-100px);
 * }
 * .slide.ng-enter.ng-enter-active {
 *   transform:translateY(0);
 * }
 * ```
 *
 * Does this mean that CSS and JS animations cannot be used together? Do JS-based animations always have higher priority? We can make up for the
 * lack of CSS animations by using the `$animateCss` service to trigger our own tweaked-out, CSS-based animations directly from
 * our own JS-based animation code:
 *
 * ```js
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element) {
*        // this will trigger `.slide.ng-enter` and `.slide.ng-enter-active`.
 *       return $animateCss(element, {
 *         event: 'enter',
 *         structural: true
 *       });
 *     }
 *   }
 * }]);
 * ```
 *
 * The nice thing here is that we can save bandwidth by sticking to our CSS-based animation code and we don't need to rely on a 3rd-party animation framework.
 *
 * The `$animateCss` service is very powerful since we can feed in all kinds of extra properties that will be evaluated and fed into a CSS transition or
 * keyframe animation. For example if we wanted to animate the height of an element while adding and removing classes then we can do so by providing that
 * data into `$animateCss` directly:
 *
 * ```js
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element) {
 *       return $animateCss(element, {
 *         event: 'enter',
 *         structural: true,
 *         addClass: 'maroon-setting',
 *         from: { height:0 },
 *         to: { height: 200 }
 *       });
 *     }
 *   }
 * }]);
 * ```
 *
 * Now we can fill in the rest via our transition CSS code:
 *
 * ```css
 * /&#42; the transition tells ngAnimate to make the animation happen &#42;/
 * .slide.ng-enter { transition:0.5s linear all; }
 *
 * /&#42; this extra CSS class will be absorbed into the transition
 * since the $animateCss code is adding the class &#42;/
 * .maroon-setting { background:red; }
 * ```
 *
 * And `$animateCss` will figure out the rest. Just make sure to have the `done()` callback fire the `doneFn` function to signal when the animation is over.
 *
 * To learn more about what's possible be sure to visit the {@link ngAnimate.$animateCss $animateCss service}.
 *
 * ## Animation Anchoring (via `ng-animate-ref`)
 *
 * ngAnimate in AngularJS 1.4 comes packed with the ability to cross-animate elements between
 * structural areas of an application (like views) by pairing up elements using an attribute
 * called `ng-animate-ref`.
 *
 * Let's say for example we have two views that are managed by `ng-view` and we want to show
 * that there is a relationship between two components situated in within these views. By using the
 * `ng-animate-ref` attribute we can identify that the two components are paired together and we
 * can then attach an animation, which is triggered when the view changes.
 *
 * Say for example we have the following template code:
 *
 * ```html
 * <!-- index.html -->
 * <div ng-view class="view-animation">
 * </div>
 *
 * <!-- home.html -->
 * <a href="#/banner-page">
 *   <img src="./banner.jpg" class="banner" ng-animate-ref="banner">
 * </a>
 *
 * <!-- banner-page.html -->
 * <img src="./banner.jpg" class="banner" ng-animate-ref="banner">
 * ```
 *
 * Now, when the view changes (once the link is clicked), ngAnimate will examine the
 * HTML contents to see if there is a match reference between any components in the view
 * that is leaving and the view that is entering. It will scan both the view which is being
 * removed (leave) and inserted (enter) to see if there are any paired DOM elements that
 * contain a matching ref value.
 *
 * The two images match since they share the same ref value. ngAnimate will now create a
 * transport element (which is a clone of the first image element) and it will then attempt
 * to animate to the position of the second image element in the next view. For the animation to
 * work a special CSS class called `ng-anchor` will be added to the transported element.
 *
 * We can now attach a transition onto the `.banner.ng-anchor` CSS class and then
 * ngAnimate will handle the entire transition for us as well as the addition and removal of
 * any changes of CSS classes between the elements:
 *
 * ```css
 * .banner.ng-anchor {
 *   /&#42; this animation will last for 1 second since there are
 *          two phases to the animation (an `in` and an `out` phase) &#42;/
 *   transition:0.5s linear all;
 * }
 * ```
 *
 * We also **must** include animations for the views that are being entered and removed
 * (otherwise anchoring wouldn't be possible since the new view would be inserted right away).
 *
 * ```css
 * .view-animation.ng-enter, .view-animation.ng-leave {
 *   transition:0.5s linear all;
 *   position:fixed;
 *   left:0;
 *   top:0;
 *   width:100%;
 * }
 * .view-animation.ng-enter {
 *   transform:translateX(100%);
 * }
 * .view-animation.ng-leave,
 * .view-animation.ng-enter.ng-enter-active {
 *   transform:translateX(0%);
 * }
 * .view-animation.ng-leave.ng-leave-active {
 *   transform:translateX(-100%);
 * }
 * ```
 *
 * Now we can jump back to the anchor animation. When the animation happens, there are two stages that occur:
 * an `out` and an `in` stage. The `out` stage happens first and that is when the element is animated away
 * from its origin. Once that animation is over then the `in` stage occurs which animates the
 * element to its destination. The reason why there are two animations is to give enough time
 * for the enter animation on the new element to be ready.
 *
 * The example above sets up a transition for both the in and out phases, but we can also target the out or
 * in phases directly via `ng-anchor-out` and `ng-anchor-in`.
 *
 * ```css
 * .banner.ng-anchor-out {
 *   transition: 0.5s linear all;
 *
 *   /&#42; the scale will be applied during the out animation,
 *          but will be animated away when the in animation runs &#42;/
 *   transform: scale(1.2);
 * }
 *
 * .banner.ng-anchor-in {
 *   transition: 1s linear all;
 * }
 * ```
 *
 *
 *
 *
 * ### Anchoring Demo
 *
  <example module="anchoringExample"
           name="anchoringExample"
           id="anchoringExample"
           deps="angular-animate.js;angular-route.js"
           animations="true">
    <file name="index.html">
      <a href="#/">Home</a>
      <hr />
      <div class="view-container">
        <div ng-view class="view"></div>
      </div>
    </file>
    <file name="script.js">
      angular.module('anchoringExample', ['ngAnimate', 'ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
          $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController as home'
          });
          $routeProvider.when('/profile/:id', {
            templateUrl: 'profile.html',
            controller: 'ProfileController as profile'
          });
        }])
        .run(['$rootScope', function($rootScope) {
          $rootScope.records = [
            { id:1, title: "Miss Beulah Roob" },
            { id:2, title: "Trent Morissette" },
            { id:3, title: "Miss Ava Pouros" },
            { id:4, title: "Rod Pouros" },
            { id:5, title: "Abdul Rice" },
            { id:6, title: "Laurie Rutherford Sr." },
            { id:7, title: "Nakia McLaughlin" },
            { id:8, title: "Jordon Blanda DVM" },
            { id:9, title: "Rhoda Hand" },
            { id:10, title: "Alexandrea Sauer" }
          ];
        }])
        .controller('HomeController', [function() {
          //empty
        }])
        .controller('ProfileController', ['$rootScope', '$routeParams', function($rootScope, $routeParams) {
          var index = parseInt($routeParams.id, 10);
          var record = $rootScope.records[index - 1];

          this.title = record.title;
          this.id = record.id;
        }]);
    </file>
    <file name="home.html">
      <h2>Welcome to the home page</h1>
      <p>Please click on an element</p>
      <a class="record"
         ng-href="#/profile/{{ record.id }}"
         ng-animate-ref="{{ record.id }}"
         ng-repeat="record in records">
        {{ record.title }}
      </a>
    </file>
    <file name="profile.html">
      <div class="profile record" ng-animate-ref="{{ profile.id }}">
        {{ profile.title }}
      </div>
    </file>
    <file name="animations.css">
      .record {
        display:block;
        font-size:20px;
      }
      .profile {
        background:black;
        color:white;
        font-size:100px;
      }
      .view-container {
        position:relative;
      }
      .view-container > .view.ng-animate {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        min-height:500px;
      }
      .view.ng-enter, .view.ng-leave,
      .record.ng-anchor {
        transition:0.5s linear all;
      }
      .view.ng-enter {
        transform:translateX(100%);
      }
      .view.ng-enter.ng-enter-active, .view.ng-leave {
        transform:translateX(0%);
      }
      .view.ng-leave.ng-leave-active {
        transform:translateX(-100%);
      }
      .record.ng-anchor-out {
        background:red;
      }
    </file>
  </example>
 *
 * ### How is the element transported?
 *
 * When an anchor animation occurs, ngAnimate will clone the starting element and position it exactly where the starting
 * element is located on screen via absolute positioning. The cloned element will be placed inside of the root element
 * of the application (where ng-app was defined) and all of the CSS classes of the starting element will be applied. The
 * element will then animate into the `out` and `in` animations and will eventually reach the coordinates and match
 * the dimensions of the destination element. During the entire animation a CSS class of `.ng-animate-shim` will be applied
 * to both the starting and destination elements in order to hide them from being visible (the CSS styling for the class
 * is: `visibility:hidden`). Once the anchor reaches its destination then it will be removed and the destination element
 * will become visible since the shim class will be removed.
 *
 * ### How is the morphing handled?
 *
 * CSS Anchoring relies on transitions and keyframes and the internal code is intelligent enough to figure out
 * what CSS classes differ between the starting element and the destination element. These different CSS classes
 * will be added/removed on the anchor element and a transition will be applied (the transition that is provided
 * in the anchor class). Long story short, ngAnimate will figure out what classes to add and remove which will
 * make the transition of the element as smooth and automatic as possible. Be sure to use simple CSS classes that
 * do not rely on DOM nesting structure so that the anchor element appears the same as the starting element (since
 * the cloned element is placed inside of root element which is likely close to the body element).
 *
 * Note that if the root element is on the `<html>` element then the cloned node will be placed inside of body.
 *
 *
 * ## Using $animate in your directive code
 *
 * So far we've explored how to feed in animations into an Angular application, but how do we trigger animations within our own directives in our application?
 * By injecting the `$animate` service into our directive code, we can trigger structural and class-based hooks which can then be consumed by animations. Let's
 * imagine we have a greeting box that shows and hides itself when the data changes
 *
 * ```html
 * <greeting-box active="onOrOff">Hi there</greeting-box>
 * ```
 *
 * ```js
 * ngModule.directive('greetingBox', ['$animate', function($animate) {
 *   return function(scope, element, attrs) {
 *     attrs.$observe('active', function(value) {
 *       value ? $animate.addClass(element, 'on') : $animate.removeClass(element, 'on');
 *     });
 *   });
 * }]);
 * ```
 *
 * Now the `on` CSS class is added and removed on the greeting box component. Now if we add a CSS class on top of the greeting box element
 * in our HTML code then we can trigger a CSS or JS animation to happen.
 *
 * ```css
 * /&#42; normally we would create a CSS class to reference on the element &#42;/
 * greeting-box.on { transition:0.5s linear all; background:green; color:white; }
 * ```
 *
 * The `$animate` service contains a variety of other methods like `enter`, `leave`, `animate` and `setClass`. To learn more about what's
 * possible be sure to visit the {@link ng.$animate $animate service API page}.
 *
 *
 * ### Preventing Collisions With Third Party Libraries
 *
 * Some third-party frameworks place animation duration defaults across many element or className
 * selectors in order to make their code small and reuseable. This can lead to issues with ngAnimate, which
 * is expecting actual animations on these elements and has to wait for their completion.
 *
 * You can prevent this unwanted behavior by using a prefix on all your animation classes:
 *
 * ```css
 * /&#42; prefixed with animate- &#42;/
 * .animate-fade-add.animate-fade-add-active {
 *   transition:1s linear all;
 *   opacity:0;
 * }
 * ```
 *
 * You then configure `$animate` to enforce this prefix:
 *
 * ```js
 * $animateProvider.classNameFilter(/animate-/);
 * ```
 *
 * This also may provide your application with a speed boost since only specific elements containing CSS class prefix
 * will be evaluated for animation when any DOM changes occur in the application.
 *
 * ## Callbacks and Promises
 *
 * When `$animate` is called it returns a promise that can be used to capture when the animation has ended. Therefore if we were to trigger
 * an animation (within our directive code) then we can continue performing directive and scope related activities after the animation has
 * ended by chaining onto the returned promise that animation method returns.
 *
 * ```js
 * // somewhere within the depths of the directive
 * $animate.enter(element, parent).then(function() {
 *   //the animation has completed
 * });
 * ```
 *
 * (Note that earlier versions of Angular prior to v1.4 required the promise code to be wrapped using `$scope.$apply(...)`. This is not the case
 * anymore.)
 *
 * In addition to the animation promise, we can also make use of animation-related callbacks within our directives and controller code by registering
 * an event listener using the `$animate` service. Let's say for example that an animation was triggered on our view
 * routing controller to hook into that:
 *
 * ```js
 * ngModule.controller('HomePageController', ['$animate', function($animate) {
 *   $animate.on('enter', ngViewElement, function(element) {
 *     // the animation for this route has completed
 *   }]);
 * }])
 * ```
 *
 * (Note that you will need to trigger a digest within the callback to get angular to notice any scope-related changes.)
 */

/**
 * @ngdoc service
 * @name $animate
 * @kind object
 *
 * @description
 * The ngAnimate `$animate` service documentation is the same for the core `$animate` service.
 *
 * Click here {@link ng.$animate to learn more about animations with `$animate`}.
 */
angular.module('ngAnimate', [])
  .directive('ngAnimateChildren', $$AnimateChildrenDirective)
  .factory('$$rAFScheduler', $$rAFSchedulerFactory)

  .factory('$$AnimateRunner', $$AnimateRunnerFactory)
  .factory('$$animateAsyncRun', $$AnimateAsyncRunFactory)

  .provider('$$animateQueue', $$AnimateQueueProvider)
  .provider('$$animation', $$AnimationProvider)

  .provider('$animateCss', $AnimateCssProvider)
  .provider('$$animateCssDriver', $$AnimateCssDriverProvider)

  .provider('$$animateJs', $$AnimateJsProvider)
  .provider('$$animateJsDriver', $$AnimateJsDriverProvider);


})(window, window.angular);

}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/angular-animate/angular-animate.js","/../../node_modules/angular-animate")
},{"buffer":10,"oMfpAn":13}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
require('./angular-animate');
module.exports = 'ngAnimate';

}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/angular-animate/index.js","/../../node_modules/angular-animate")
},{"./angular-animate":6,"buffer":10,"oMfpAn":13}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * @license AngularJS v1.4.8
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc module
 * @name ngRoute
 * @description
 *
 * # ngRoute
 *
 * The `ngRoute` module provides routing and deeplinking services and directives for angular apps.
 *
 * ## Example
 * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.
 *
 *
 * <div doc-module-components="ngRoute"></div>
 */
 /* global -ngRouteModule */
var ngRouteModule = angular.module('ngRoute', ['ng']).
                        provider('$route', $RouteProvider),
    $routeMinErr = angular.$$minErr('ngRoute');

/**
 * @ngdoc provider
 * @name $routeProvider
 *
 * @description
 *
 * Used for configuring routes.
 *
 * ## Example
 * See {@link ngRoute.$route#example $route} for an example of configuring and using `ngRoute`.
 *
 * ## Dependencies
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 */
function $RouteProvider() {
  function inherit(parent, extra) {
    return angular.extend(Object.create(parent), extra);
  }

  var routes = {};

  /**
   * @ngdoc method
   * @name $routeProvider#when
   *
   * @param {string} path Route path (matched against `$location.path`). If `$location.path`
   *    contains redundant trailing slash or is missing one, the route will still match and the
   *    `$location.path` will be updated to add or drop the trailing slash to exactly match the
   *    route definition.
   *
   *    * `path` can contain named groups starting with a colon: e.g. `:name`. All characters up
   *        to the next slash are matched and stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain named groups starting with a colon and ending with a star:
   *        e.g.`:name*`. All characters are eagerly stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain optional named groups with a question mark: e.g.`:name?`.
   *
   *    For example, routes like `/color/:color/largecode/:largecode*\/edit` will match
   *    `/color/brown/largecode/code/with/slashes/edit` and extract:
   *
   *    * `color: brown`
   *    * `largecode: code/with/slashes`.
   *
   *
   * @param {Object} route Mapping information to be assigned to `$route.current` on route
   *    match.
   *
   *    Object properties:
   *
   *    - `controller` – `{(string|function()=}` – Controller fn that should be associated with
   *      newly created scope or the name of a {@link angular.Module#controller registered
   *      controller} if passed as a string.
   *    - `controllerAs` – `{string=}` – An identifier name for a reference to the controller.
   *      If present, the controller will be published to scope under the `controllerAs` name.
   *    - `template` – `{string=|function()=}` – html template as a string or a function that
   *      returns an html template as a string which should be used by {@link
   *      ngRoute.directive:ngView ngView} or {@link ng.directive:ngInclude ngInclude} directives.
   *      This property takes precedence over `templateUrl`.
   *
   *      If `template` is a function, it will be called with the following parameters:
   *
   *      - `{Array.<Object>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `templateUrl` – `{string=|function()=}` – path or function that returns a path to an html
   *      template that should be used by {@link ngRoute.directive:ngView ngView}.
   *
   *      If `templateUrl` is a function, it will be called with the following parameters:
   *
   *      - `{Array.<Object>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
   *      be injected into the controller. If any of these dependencies are promises, the router
   *      will wait for them all to be resolved or one to be rejected before the controller is
   *      instantiated.
   *      If all the promises are resolved successfully, the values of the resolved promises are
   *      injected and {@link ngRoute.$route#$routeChangeSuccess $routeChangeSuccess} event is
   *      fired. If any of the promises are rejected the
   *      {@link ngRoute.$route#$routeChangeError $routeChangeError} event is fired. The map object
   *      is:
   *
   *      - `key` – `{string}`: a name of a dependency to be injected into the controller.
   *      - `factory` - `{string|function}`: If `string` then it is an alias for a service.
   *        Otherwise if function, then it is {@link auto.$injector#invoke injected}
   *        and the return value is treated as the dependency. If the result is a promise, it is
   *        resolved before its value is injected into the controller. Be aware that
   *        `ngRoute.$routeParams` will still refer to the previous route within these resolve
   *        functions.  Use `$route.current.params` to access the new route parameters, instead.
   *
   *    - `redirectTo` – {(string|function())=} – value to update
   *      {@link ng.$location $location} path with and trigger route redirection.
   *
   *      If `redirectTo` is a function, it will be called with the following parameters:
   *
   *      - `{Object.<string>}` - route parameters extracted from the current
   *        `$location.path()` by applying the current route templateUrl.
   *      - `{string}` - current `$location.path()`
   *      - `{Object}` - current `$location.search()`
   *
   *      The custom `redirectTo` function is expected to return a string which will be used
   *      to update `$location.path()` and `$location.search()`.
   *
   *    - `[reloadOnSearch=true]` - {boolean=} - reload route when only `$location.search()`
   *      or `$location.hash()` changes.
   *
   *      If the option is set to `false` and url in the browser changes, then
   *      `$routeUpdate` event is broadcasted on the root scope.
   *
   *    - `[caseInsensitiveMatch=false]` - {boolean=} - match routes without being case sensitive
   *
   *      If the option is set to `true`, then the particular route can be matched without being
   *      case sensitive
   *
   * @returns {Object} self
   *
   * @description
   * Adds a new route definition to the `$route` service.
   */
  this.when = function(path, route) {
    //copy original route object to preserve params inherited from proto chain
    var routeCopy = angular.copy(route);
    if (angular.isUndefined(routeCopy.reloadOnSearch)) {
      routeCopy.reloadOnSearch = true;
    }
    if (angular.isUndefined(routeCopy.caseInsensitiveMatch)) {
      routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch;
    }
    routes[path] = angular.extend(
      routeCopy,
      path && pathRegExp(path, routeCopy)
    );

    // create redirection for trailing slashes
    if (path) {
      var redirectPath = (path[path.length - 1] == '/')
            ? path.substr(0, path.length - 1)
            : path + '/';

      routes[redirectPath] = angular.extend(
        {redirectTo: path},
        pathRegExp(redirectPath, routeCopy)
      );
    }

    return this;
  };

  /**
   * @ngdoc property
   * @name $routeProvider#caseInsensitiveMatch
   * @description
   *
   * A boolean property indicating if routes defined
   * using this provider should be matched using a case insensitive
   * algorithm. Defaults to `false`.
   */
  this.caseInsensitiveMatch = false;

   /**
    * @param path {string} path
    * @param opts {Object} options
    * @return {?Object}
    *
    * @description
    * Normalizes the given path, returning a regular expression
    * and the original path.
    *
    * Inspired by pathRexp in visionmedia/express/lib/utils.js.
    */
  function pathRegExp(path, opts) {
    var insensitive = opts.caseInsensitiveMatch,
        ret = {
          originalPath: path,
          regexp: path
        },
        keys = ret.keys = [];

    path = path
      .replace(/([().])/g, '\\$1')
      .replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
        var optional = option === '?' ? option : null;
        var star = option === '*' ? option : null;
        keys.push({ name: key, optional: !!optional });
        slash = slash || '';
        return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (star && '(.+?)' || '([^/]+)')
          + (optional || '')
          + ')'
          + (optional || '');
      })
      .replace(/([\/$\*])/g, '\\$1');

    ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
    return ret;
  }

  /**
   * @ngdoc method
   * @name $routeProvider#otherwise
   *
   * @description
   * Sets route definition that will be used on route change when no other route definition
   * is matched.
   *
   * @param {Object|string} params Mapping information to be assigned to `$route.current`.
   * If called with a string, the value maps to `redirectTo`.
   * @returns {Object} self
   */
  this.otherwise = function(params) {
    if (typeof params === 'string') {
      params = {redirectTo: params};
    }
    this.when(null, params);
    return this;
  };


  this.$get = ['$rootScope',
               '$location',
               '$routeParams',
               '$q',
               '$injector',
               '$templateRequest',
               '$sce',
      function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {

    /**
     * @ngdoc service
     * @name $route
     * @requires $location
     * @requires $routeParams
     *
     * @property {Object} current Reference to the current route definition.
     * The route definition contains:
     *
     *   - `controller`: The controller constructor as define in route definition.
     *   - `locals`: A map of locals which is used by {@link ng.$controller $controller} service for
     *     controller instantiation. The `locals` contain
     *     the resolved values of the `resolve` map. Additionally the `locals` also contain:
     *
     *     - `$scope` - The current route scope.
     *     - `$template` - The current route template HTML.
     *
     * @property {Object} routes Object with all route configuration Objects as its properties.
     *
     * @description
     * `$route` is used for deep-linking URLs to controllers and views (HTML partials).
     * It watches `$location.url()` and tries to map the path to an existing route definition.
     *
     * Requires the {@link ngRoute `ngRoute`} module to be installed.
     *
     * You can define routes through {@link ngRoute.$routeProvider $routeProvider}'s API.
     *
     * The `$route` service is typically used in conjunction with the
     * {@link ngRoute.directive:ngView `ngView`} directive and the
     * {@link ngRoute.$routeParams `$routeParams`} service.
     *
     * @example
     * This example shows how changing the URL hash causes the `$route` to match a route against the
     * URL, and the `ngView` pulls in the partial.
     *
     * <example name="$route-service" module="ngRouteExample"
     *          deps="angular-route.js" fixBase="true">
     *   <file name="index.html">
     *     <div ng-controller="MainController">
     *       Choose:
     *       <a href="Book/Moby">Moby</a> |
     *       <a href="Book/Moby/ch/1">Moby: Ch1</a> |
     *       <a href="Book/Gatsby">Gatsby</a> |
     *       <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
     *       <a href="Book/Scarlet">Scarlet Letter</a><br/>
     *
     *       <div ng-view></div>
     *
     *       <hr />
     *
     *       <pre>$location.path() = {{$location.path()}}</pre>
     *       <pre>$route.current.templateUrl = {{$route.current.templateUrl}}</pre>
     *       <pre>$route.current.params = {{$route.current.params}}</pre>
     *       <pre>$route.current.scope.name = {{$route.current.scope.name}}</pre>
     *       <pre>$routeParams = {{$routeParams}}</pre>
     *     </div>
     *   </file>
     *
     *   <file name="book.html">
     *     controller: {{name}}<br />
     *     Book Id: {{params.bookId}}<br />
     *   </file>
     *
     *   <file name="chapter.html">
     *     controller: {{name}}<br />
     *     Book Id: {{params.bookId}}<br />
     *     Chapter Id: {{params.chapterId}}
     *   </file>
     *
     *   <file name="script.js">
     *     angular.module('ngRouteExample', ['ngRoute'])
     *
     *      .controller('MainController', function($scope, $route, $routeParams, $location) {
     *          $scope.$route = $route;
     *          $scope.$location = $location;
     *          $scope.$routeParams = $routeParams;
     *      })
     *
     *      .controller('BookController', function($scope, $routeParams) {
     *          $scope.name = "BookController";
     *          $scope.params = $routeParams;
     *      })
     *
     *      .controller('ChapterController', function($scope, $routeParams) {
     *          $scope.name = "ChapterController";
     *          $scope.params = $routeParams;
     *      })
     *
     *     .config(function($routeProvider, $locationProvider) {
     *       $routeProvider
     *        .when('/Book/:bookId', {
     *         templateUrl: 'book.html',
     *         controller: 'BookController',
     *         resolve: {
     *           // I will cause a 1 second delay
     *           delay: function($q, $timeout) {
     *             var delay = $q.defer();
     *             $timeout(delay.resolve, 1000);
     *             return delay.promise;
     *           }
     *         }
     *       })
     *       .when('/Book/:bookId/ch/:chapterId', {
     *         templateUrl: 'chapter.html',
     *         controller: 'ChapterController'
     *       });
     *
     *       // configure html5 to get links working on jsfiddle
     *       $locationProvider.html5Mode(true);
     *     });
     *
     *   </file>
     *
     *   <file name="protractor.js" type="protractor">
     *     it('should load and compile correct template', function() {
     *       element(by.linkText('Moby: Ch1')).click();
     *       var content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: ChapterController/);
     *       expect(content).toMatch(/Book Id\: Moby/);
     *       expect(content).toMatch(/Chapter Id\: 1/);
     *
     *       element(by.partialLinkText('Scarlet')).click();
     *
     *       content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: BookController/);
     *       expect(content).toMatch(/Book Id\: Scarlet/);
     *     });
     *   </file>
     * </example>
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeStart
     * @eventType broadcast on root scope
     * @description
     * Broadcasted before a route change. At this  point the route services starts
     * resolving all of the dependencies needed for the route change to occur.
     * Typically this involves fetching the view template as well as any dependencies
     * defined in `resolve` route property. Once  all of the dependencies are resolved
     * `$routeChangeSuccess` is fired.
     *
     * The route change (and the `$location` change that triggered it) can be prevented
     * by calling `preventDefault` method of the event. See {@link ng.$rootScope.Scope#$on}
     * for more details about event object.
     *
     * @param {Object} angularEvent Synthetic event object.
     * @param {Route} next Future route information.
     * @param {Route} current Current route information.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeSuccess
     * @eventType broadcast on root scope
     * @description
     * Broadcasted after a route change has happened successfully.
     * The `resolve` dependencies are now available in the `current.locals` property.
     *
     * {@link ngRoute.directive:ngView ngView} listens for the directive
     * to instantiate the controller and render the view.
     *
     * @param {Object} angularEvent Synthetic event object.
     * @param {Route} current Current route information.
     * @param {Route|Undefined} previous Previous route information, or undefined if current is
     * first route entered.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeError
     * @eventType broadcast on root scope
     * @description
     * Broadcasted if any of the resolve promises are rejected.
     *
     * @param {Object} angularEvent Synthetic event object
     * @param {Route} current Current route information.
     * @param {Route} previous Previous route information.
     * @param {Route} rejection Rejection of the promise. Usually the error of the failed promise.
     */

    /**
     * @ngdoc event
     * @name $route#$routeUpdate
     * @eventType broadcast on root scope
     * @description
     * The `reloadOnSearch` property has been set to false, and we are reusing the same
     * instance of the Controller.
     *
     * @param {Object} angularEvent Synthetic event object
     * @param {Route} current Current/previous route information.
     */

    var forceReload = false,
        preparedRoute,
        preparedRouteIsUpdateOnly,
        $route = {
          routes: routes,

          /**
           * @ngdoc method
           * @name $route#reload
           *
           * @description
           * Causes `$route` service to reload the current route even if
           * {@link ng.$location $location} hasn't changed.
           *
           * As a result of that, {@link ngRoute.directive:ngView ngView}
           * creates new scope and reinstantiates the controller.
           */
          reload: function() {
            forceReload = true;
            $rootScope.$evalAsync(function() {
              // Don't support cancellation of a reload for now...
              prepareRoute();
              commitRoute();
            });
          },

          /**
           * @ngdoc method
           * @name $route#updateParams
           *
           * @description
           * Causes `$route` service to update the current URL, replacing
           * current route parameters with those specified in `newParams`.
           * Provided property names that match the route's path segment
           * definitions will be interpolated into the location's path, while
           * remaining properties will be treated as query params.
           *
           * @param {!Object<string, string>} newParams mapping of URL parameter names to values
           */
          updateParams: function(newParams) {
            if (this.current && this.current.$$route) {
              newParams = angular.extend({}, this.current.params, newParams);
              $location.path(interpolate(this.current.$$route.originalPath, newParams));
              // interpolate modifies newParams, only query params are left
              $location.search(newParams);
            } else {
              throw $routeMinErr('norout', 'Tried updating route when with no current route');
            }
          }
        };

    $rootScope.$on('$locationChangeStart', prepareRoute);
    $rootScope.$on('$locationChangeSuccess', commitRoute);

    return $route;

    /////////////////////////////////////////////////////

    /**
     * @param on {string} current url
     * @param route {Object} route regexp to match the url against
     * @return {?Object}
     *
     * @description
     * Check if the route matches the current url.
     *
     * Inspired by match in
     * visionmedia/express/lib/router/router.js.
     */
    function switchRouteMatcher(on, route) {
      var keys = route.keys,
          params = {};

      if (!route.regexp) return null;

      var m = route.regexp.exec(on);
      if (!m) return null;

      for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];

        var val = m[i];

        if (key && val) {
          params[key.name] = val;
        }
      }
      return params;
    }

    function prepareRoute($locationEvent) {
      var lastRoute = $route.current;

      preparedRoute = parseRoute();
      preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route
          && angular.equals(preparedRoute.pathParams, lastRoute.pathParams)
          && !preparedRoute.reloadOnSearch && !forceReload;

      if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) {
        if ($rootScope.$broadcast('$routeChangeStart', preparedRoute, lastRoute).defaultPrevented) {
          if ($locationEvent) {
            $locationEvent.preventDefault();
          }
        }
      }
    }

    function commitRoute() {
      var lastRoute = $route.current;
      var nextRoute = preparedRoute;

      if (preparedRouteIsUpdateOnly) {
        lastRoute.params = nextRoute.params;
        angular.copy(lastRoute.params, $routeParams);
        $rootScope.$broadcast('$routeUpdate', lastRoute);
      } else if (nextRoute || lastRoute) {
        forceReload = false;
        $route.current = nextRoute;
        if (nextRoute) {
          if (nextRoute.redirectTo) {
            if (angular.isString(nextRoute.redirectTo)) {
              $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params)
                       .replace();
            } else {
              $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search()))
                       .replace();
            }
          }
        }

        $q.when(nextRoute).
          then(function() {
            if (nextRoute) {
              var locals = angular.extend({}, nextRoute.resolve),
                  template, templateUrl;

              angular.forEach(locals, function(value, key) {
                locals[key] = angular.isString(value) ?
                    $injector.get(value) : $injector.invoke(value, null, null, key);
              });

              if (angular.isDefined(template = nextRoute.template)) {
                if (angular.isFunction(template)) {
                  template = template(nextRoute.params);
                }
              } else if (angular.isDefined(templateUrl = nextRoute.templateUrl)) {
                if (angular.isFunction(templateUrl)) {
                  templateUrl = templateUrl(nextRoute.params);
                }
                if (angular.isDefined(templateUrl)) {
                  nextRoute.loadedTemplateUrl = $sce.valueOf(templateUrl);
                  template = $templateRequest(templateUrl);
                }
              }
              if (angular.isDefined(template)) {
                locals['$template'] = template;
              }
              return $q.all(locals);
            }
          }).
          then(function(locals) {
            // after route change
            if (nextRoute == $route.current) {
              if (nextRoute) {
                nextRoute.locals = locals;
                angular.copy(nextRoute.params, $routeParams);
              }
              $rootScope.$broadcast('$routeChangeSuccess', nextRoute, lastRoute);
            }
          }, function(error) {
            if (nextRoute == $route.current) {
              $rootScope.$broadcast('$routeChangeError', nextRoute, lastRoute, error);
            }
          });
      }
    }


    /**
     * @returns {Object} the current active route, by matching it against the URL
     */
    function parseRoute() {
      // Match a route
      var params, match;
      angular.forEach(routes, function(route, path) {
        if (!match && (params = switchRouteMatcher($location.path(), route))) {
          match = inherit(route, {
            params: angular.extend({}, $location.search(), params),
            pathParams: params});
          match.$$route = route;
        }
      });
      // No route matched; fallback to "otherwise" route
      return match || routes[null] && inherit(routes[null], {params: {}, pathParams:{}});
    }

    /**
     * @returns {string} interpolation of the redirect path with the parameters
     */
    function interpolate(string, params) {
      var result = [];
      angular.forEach((string || '').split(':'), function(segment, i) {
        if (i === 0) {
          result.push(segment);
        } else {
          var segmentMatch = segment.match(/(\w+)(?:[?*])?(.*)/);
          var key = segmentMatch[1];
          result.push(params[key]);
          result.push(segmentMatch[2] || '');
          delete params[key];
        }
      });
      return result.join('');
    }
  }];
}

ngRouteModule.provider('$routeParams', $RouteParamsProvider);


/**
 * @ngdoc service
 * @name $routeParams
 * @requires $route
 *
 * @description
 * The `$routeParams` service allows you to retrieve the current set of route parameters.
 *
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 *
 * The route parameters are a combination of {@link ng.$location `$location`}'s
 * {@link ng.$location#search `search()`} and {@link ng.$location#path `path()`}.
 * The `path` parameters are extracted when the {@link ngRoute.$route `$route`} path is matched.
 *
 * In case of parameter name collision, `path` params take precedence over `search` params.
 *
 * The service guarantees that the identity of the `$routeParams` object will remain unchanged
 * (but its properties will likely change) even when a route change occurs.
 *
 * Note that the `$routeParams` are only updated *after* a route change completes successfully.
 * This means that you cannot rely on `$routeParams` being correct in route resolve functions.
 * Instead you can use `$route.current.params` to access the new route's parameters.
 *
 * @example
 * ```js
 *  // Given:
 *  // URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
 *  // Route: /Chapter/:chapterId/Section/:sectionId
 *  //
 *  // Then
 *  $routeParams ==> {chapterId:'1', sectionId:'2', search:'moby'}
 * ```
 */
function $RouteParamsProvider() {
  this.$get = function() { return {}; };
}

ngRouteModule.directive('ngView', ngViewFactory);
ngRouteModule.directive('ngView', ngViewFillContentFactory);


/**
 * @ngdoc directive
 * @name ngView
 * @restrict ECA
 *
 * @description
 * # Overview
 * `ngView` is a directive that complements the {@link ngRoute.$route $route} service by
 * including the rendered template of the current route into the main layout (`index.html`) file.
 * Every time the current route changes, the included view changes with it according to the
 * configuration of the `$route` service.
 *
 * Requires the {@link ngRoute `ngRoute`} module to be installed.
 *
 * @animations
 * enter - animation is used to bring new content into the browser.
 * leave - animation is used to animate existing content away.
 *
 * The enter and leave animation occur concurrently.
 *
 * @scope
 * @priority 400
 * @param {string=} onload Expression to evaluate whenever the view updates.
 *
 * @param {string=} autoscroll Whether `ngView` should call {@link ng.$anchorScroll
 *                  $anchorScroll} to scroll the viewport after the view is updated.
 *
 *                  - If the attribute is not set, disable scrolling.
 *                  - If the attribute is set without value, enable scrolling.
 *                  - Otherwise enable scrolling only if the `autoscroll` attribute value evaluated
 *                    as an expression yields a truthy value.
 * @example
    <example name="ngView-directive" module="ngViewExample"
             deps="angular-route.js;angular-animate.js"
             animations="true" fixBase="true">
      <file name="index.html">
        <div ng-controller="MainCtrl as main">
          Choose:
          <a href="Book/Moby">Moby</a> |
          <a href="Book/Moby/ch/1">Moby: Ch1</a> |
          <a href="Book/Gatsby">Gatsby</a> |
          <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
          <a href="Book/Scarlet">Scarlet Letter</a><br/>

          <div class="view-animate-container">
            <div ng-view class="view-animate"></div>
          </div>
          <hr />

          <pre>$location.path() = {{main.$location.path()}}</pre>
          <pre>$route.current.templateUrl = {{main.$route.current.templateUrl}}</pre>
          <pre>$route.current.params = {{main.$route.current.params}}</pre>
          <pre>$routeParams = {{main.$routeParams}}</pre>
        </div>
      </file>

      <file name="book.html">
        <div>
          controller: {{book.name}}<br />
          Book Id: {{book.params.bookId}}<br />
        </div>
      </file>

      <file name="chapter.html">
        <div>
          controller: {{chapter.name}}<br />
          Book Id: {{chapter.params.bookId}}<br />
          Chapter Id: {{chapter.params.chapterId}}
        </div>
      </file>

      <file name="animations.css">
        .view-animate-container {
          position:relative;
          height:100px!important;
          background:white;
          border:1px solid black;
          height:40px;
          overflow:hidden;
        }

        .view-animate {
          padding:10px;
        }

        .view-animate.ng-enter, .view-animate.ng-leave {
          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;

          display:block;
          width:100%;
          border-left:1px solid black;

          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          padding:10px;
        }

        .view-animate.ng-enter {
          left:100%;
        }
        .view-animate.ng-enter.ng-enter-active {
          left:0;
        }
        .view-animate.ng-leave.ng-leave-active {
          left:-100%;
        }
      </file>

      <file name="script.js">
        angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])
          .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
              $routeProvider
                .when('/Book/:bookId', {
                  templateUrl: 'book.html',
                  controller: 'BookCtrl',
                  controllerAs: 'book'
                })
                .when('/Book/:bookId/ch/:chapterId', {
                  templateUrl: 'chapter.html',
                  controller: 'ChapterCtrl',
                  controllerAs: 'chapter'
                });

              $locationProvider.html5Mode(true);
          }])
          .controller('MainCtrl', ['$route', '$routeParams', '$location',
            function($route, $routeParams, $location) {
              this.$route = $route;
              this.$location = $location;
              this.$routeParams = $routeParams;
          }])
          .controller('BookCtrl', ['$routeParams', function($routeParams) {
            this.name = "BookCtrl";
            this.params = $routeParams;
          }])
          .controller('ChapterCtrl', ['$routeParams', function($routeParams) {
            this.name = "ChapterCtrl";
            this.params = $routeParams;
          }]);

      </file>

      <file name="protractor.js" type="protractor">
        it('should load and compile correct template', function() {
          element(by.linkText('Moby: Ch1')).click();
          var content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: ChapterCtrl/);
          expect(content).toMatch(/Book Id\: Moby/);
          expect(content).toMatch(/Chapter Id\: 1/);

          element(by.partialLinkText('Scarlet')).click();

          content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: BookCtrl/);
          expect(content).toMatch(/Book Id\: Scarlet/);
        });
      </file>
    </example>
 */


/**
 * @ngdoc event
 * @name ngView#$viewContentLoaded
 * @eventType emit on the current ngView scope
 * @description
 * Emitted every time the ngView content is reloaded.
 */
ngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];
function ngViewFactory($route, $anchorScroll, $animate) {
  return {
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    link: function(scope, $element, attr, ctrl, $transclude) {
        var currentScope,
            currentElement,
            previousLeaveAnimation,
            autoScrollExp = attr.autoscroll,
            onloadExp = attr.onload || '';

        scope.$on('$routeChangeSuccess', update);
        update();

        function cleanupLastView() {
          if (previousLeaveAnimation) {
            $animate.cancel(previousLeaveAnimation);
            previousLeaveAnimation = null;
          }

          if (currentScope) {
            currentScope.$destroy();
            currentScope = null;
          }
          if (currentElement) {
            previousLeaveAnimation = $animate.leave(currentElement);
            previousLeaveAnimation.then(function() {
              previousLeaveAnimation = null;
            });
            currentElement = null;
          }
        }

        function update() {
          var locals = $route.current && $route.current.locals,
              template = locals && locals.$template;

          if (angular.isDefined(template)) {
            var newScope = scope.$new();
            var current = $route.current;

            // Note: This will also link all children of ng-view that were contained in the original
            // html. If that content contains controllers, ... they could pollute/change the scope.
            // However, using ng-view on an element with additional content does not make sense...
            // Note: We can't remove them in the cloneAttchFn of $transclude as that
            // function is called before linking the content, which would apply child
            // directives to non existing elements.
            var clone = $transclude(newScope, function(clone) {
              $animate.enter(clone, null, currentElement || $element).then(function onNgViewEnter() {
                if (angular.isDefined(autoScrollExp)
                  && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                  $anchorScroll();
                }
              });
              cleanupLastView();
            });

            currentElement = clone;
            currentScope = current.scope = newScope;
            currentScope.$emit('$viewContentLoaded');
            currentScope.$eval(onloadExp);
          } else {
            cleanupLastView();
          }
        }
    }
  };
}

// This directive is called during the $transclude call of the first `ngView` directive.
// It will replace and compile the content of the element with the loaded template.
// We need this directive so that the element content is already filled when
// the link function of another directive on the same element as ngView
// is called.
ngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];
function ngViewFillContentFactory($compile, $controller, $route) {
  return {
    restrict: 'ECA',
    priority: -400,
    link: function(scope, $element) {
      var current = $route.current,
          locals = current.locals;

      $element.html(locals.$template);

      var link = $compile($element.contents());

      if (current.controller) {
        locals.$scope = scope;
        var controller = $controller(current.controller, locals);
        if (current.controllerAs) {
          scope[current.controllerAs] = controller;
        }
        $element.data('$ngControllerController', controller);
        $element.children().data('$ngControllerController', controller);
      }

      link(scope);
    }
  };
}


})(window, window.angular);

}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/angular-route/angular-route.js","/../../node_modules/angular-route")
},{"buffer":10,"oMfpAn":13}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
require('./angular-route');
module.exports = 'ngRoute';

}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/angular-route/index.js","/../../node_modules/angular-route")
},{"./angular-route":8,"buffer":10,"oMfpAn":13}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js","/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer")
},{"base64-js":11,"buffer":10,"ieee754":12,"oMfpAn":13}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js","/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")
},{"buffer":10,"oMfpAn":13}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js","/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754")
},{"buffer":10,"oMfpAn":13}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("oMfpAn"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/process/browser.js","/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/process")
},{"buffer":10,"oMfpAn":13}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9waWV0cm9jb2xhbmdlbG8vcHJvamVjdHMvYW5ndWxhci1ndWxwLWJyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGlldHJvY29sYW5nZWxvL3Byb2plY3RzL2FuZ3VsYXItZ3VscC1icm93c2VyaWZ5LXNlZWQvYXBwL2pzL2NvbnRyb2xsZXJzL2NvbnRhY3RDdHJsLmpzIiwiL1VzZXJzL3BpZXRyb2NvbGFuZ2Vsby9wcm9qZWN0cy9hbmd1bGFyLWd1bHAtYnJvd3NlcmlmeS1zZWVkL2FwcC9qcy9jb250cm9sbGVycy9tYWluQ3RybC5qcyIsIi9Vc2Vycy9waWV0cm9jb2xhbmdlbG8vcHJvamVjdHMvYW5ndWxhci1ndWxwLWJyb3dzZXJpZnktc2VlZC9hcHAvanMvZGlyZWN0aXZlcy9tb2RhbC5qcyIsIi9Vc2Vycy9waWV0cm9jb2xhbmdlbG8vcHJvamVjdHMvYW5ndWxhci1ndWxwLWJyb3dzZXJpZnktc2VlZC9hcHAvanMvZmFrZV85MDVkYTMxNS5qcyIsIi9Vc2Vycy9waWV0cm9jb2xhbmdlbG8vcHJvamVjdHMvYW5ndWxhci1ndWxwLWJyb3dzZXJpZnktc2VlZC9hcHAvanMvc2VydmljZXMvZXZlbnRzLmpzIiwiL1VzZXJzL3BpZXRyb2NvbGFuZ2Vsby9wcm9qZWN0cy9hbmd1bGFyLWd1bHAtYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9hbmd1bGFyLWFuaW1hdGUvYW5ndWxhci1hbmltYXRlLmpzIiwiL1VzZXJzL3BpZXRyb2NvbGFuZ2Vsby9wcm9qZWN0cy9hbmd1bGFyLWd1bHAtYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9hbmd1bGFyLWFuaW1hdGUvaW5kZXguanMiLCIvVXNlcnMvcGlldHJvY29sYW5nZWxvL3Byb2plY3RzL2FuZ3VsYXItZ3VscC1icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGUvYW5ndWxhci1yb3V0ZS5qcyIsIi9Vc2Vycy9waWV0cm9jb2xhbmdlbG8vcHJvamVjdHMvYW5ndWxhci1ndWxwLWJyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvYW5ndWxhci1yb3V0ZS9pbmRleC5qcyIsIi9Vc2Vycy9waWV0cm9jb2xhbmdlbG8vcHJvamVjdHMvYW5ndWxhci1ndWxwLWJyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCIvVXNlcnMvcGlldHJvY29sYW5nZWxvL3Byb2plY3RzL2FuZ3VsYXItZ3VscC1icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIi9Vc2Vycy9waWV0cm9jb2xhbmdlbG8vcHJvamVjdHMvYW5ndWxhci1ndWxwLWJyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCIvVXNlcnMvcGlldHJvY29sYW5nZWxvL3Byb2plY3RzL2FuZ3VsYXItZ3VscC1icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1MUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaitCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuZXhwb3J0cy5pbmplY3QgPSBmdW5jdGlvbihhcHApIHtcbiAgLy8gcmVxdWlyZSgnLi8uLi9kaXJlY3RpdmVzL1Rlc3REaXJlY3RpdmUnKS5pbmplY3QoYXBwKTtcbiAgYXBwLmNvbnRyb2xsZXIoJ0NvbnRhY3RDb250cm9sbGVyJywgZXhwb3J0cy5jb250cm9sbGVyKTtcbiAgcmV0dXJuIGV4cG9ydHMuY29udHJvbGxlcjtcbn07XG5leHBvcnRzLmNvbnRyb2xsZXIgPSBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAkc2NvcGUuY29udGFjdCA9IFwiQ09OVEFDVFwiO1xuXG59O1xufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJvTWZwQW5cIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb250cm9sbGVycy9jb250YWN0Q3RybC5qc1wiLFwiL2NvbnRyb2xsZXJzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuZXhwb3J0cy5pbmplY3QgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgZXhwb3J0cy5jb250cm9sbGVyKTtcbiAgcmV0dXJuIGV4cG9ydHMuY29udHJvbGxlcjtcbn07XG5cbmV4cG9ydHMuY29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZSwgRXZlbnRzKSB7XG4gICRzY29wZS5ldmVudHMgPSBFdmVudHM7XG4gICRzY29wZS5ldmVudFNvdXJjZXMgPSBbXTtcbiAgJHNjb3BlLnNob3dNb2RhbCA9IGZhbHNlO1xuXG4gICRzY29wZS5vcGVuRGlhbG9nID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAkc2NvcGUuc2hvd01vZGFsID0gISRzY29wZS5zaG93TW9kYWw7XG4gICAgJHNjb3BlLnRpdGxlID0gZGF0ZS50aXRsZTtcbiAgfTtcblxuICAkc2NvcGUudWlDb25maWcgPSB7XG4gICAgY2FsZW5kYXI6e1xuICAgICAgaGVpZ2h0OiA0NTAsXG4gICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgIGhlYWRlcjp7XG4gICAgICAgIGxlZnQ6ICdtb250aCBiYXNpY1dlZWsgYmFzaWNEYXkgYWdlbmRhV2VlayBhZ2VuZGFEYXknLFxuICAgICAgICBjZW50ZXI6ICd0aXRsZScsXG4gICAgICAgIHJpZ2h0OiAndG9kYXkgcHJldixuZXh0J1xuICAgICAgfSxcbiAgICAgIGV2ZW50Q2xpY2s6ZnVuY3Rpb24oIGRhdGUsIGpzRXZlbnQsIHZpZXcpe1xuICAgICAgICAkc2NvcGUub3BlbkRpYWxvZyhkYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgRXZlbnRzLmdldEV2ZW50cyhmdW5jdGlvbihkYXRhKXtcbiAgICAkc2NvcGUuZXZlbnRTb3VyY2VzLnB1c2goZGF0YSk7XG4gICAgJHNjb3BlLnRpdGxlICA9IGRhdGEudGl0bGU7XG4gIH0pO1xuICAgXG4gIFxufTtcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwib01mcEFuXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29udHJvbGxlcnMvbWFpbkN0cmwuanNcIixcIi9jb250cm9sbGVyc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbmV4cG9ydHMuaW5qZWN0ID0gZnVuY3Rpb24oYXBwKXtcblx0YXBwLmRpcmVjdGl2ZSgnbW9kYWwnLCBleHBvcnRzLmRpcmVjdGl2ZSk7XG5cdHJldHVybiBleHBvcnRzLmRpcmVjdGl2ZTtcbn07XG5leHBvcnRzLmRpcmVjdGl2ZSA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB7XG5cdFx0dGVtcGxhdGVVcmw6J3BhcnRpYWxzL21vZGFsLmh0bWwnLCBcblx0XHRyZXN0cmljdDonRScsXG4gICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBcdHJlcGxhY2U6dHJ1ZSxcbiAgICAgIFx0c2NvcGU6dHJ1ZSxcbiAgICAgIFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgXHRcbiAgICAgIFx0c2NvcGUudGl0bGUgID0gc2NvcGUuJHBhcmVudC50aXRsZTtcblxuICAgICAgXHRzY29wZS4kd2F0Y2goYXR0cnMudmlzaWJsZSwgZnVuY3Rpb24odmFsdWUpe1xuXHQgICAgICAgIGlmKHZhbHVlID09PSB0cnVlKXtcblx0ICAgICAgICAgIFx0JChlbGVtZW50KS5tb2RhbCgnc2hvdycpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICAgICAgJChlbGVtZW50KS5tb2RhbCgnaGlkZScpO1xuXHQgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cdH07XG59O1xufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJvTWZwQW5cIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9kaXJlY3RpdmVzL21vZGFsLmpzXCIsXCIvZGlyZWN0aXZlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbihmdW5jdGlvbiAoKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHJlcXVpcmUoJ2FuZ3VsYXItcm91dGUnKTtcbiAgcmVxdWlyZSgnYW5ndWxhci1hbmltYXRlJyk7XG5cbiAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdTYW1wbGVBcHAnLCBbJ25nUm91dGUnLCAnbmdBbmltYXRlJywndWkuY2FsZW5kYXInLCd1aS5ib290c3RyYXAnXSk7XG5cbiAgcmVxdWlyZSgnLi9zZXJ2aWNlcy9ldmVudHMnKS5pbmplY3QoYXBwKTtcbiAgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL21vZGFsJykuaW5qZWN0KGFwcCk7XG5cbiAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGxvY2F0aW9uUHJvdmlkZXIsICRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgICAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KCchJyk7XG4gICAgICAvLyByb3V0ZXNcbiAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgIC53aGVuKFwiL2hvbWVcIiwge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFydGlhbHMvcGFydGlhbDEuaHRtbFwiLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvbWFpbkN0cmwnKS5pbmplY3QoYXBwKVxuICAgICAgICB9KVxuICAgICAgICAud2hlbihcIi9jb250YWN0XCIsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIuL3BhcnRpYWxzL3BhcnRpYWwyLmh0bWxcIixcbiAgICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2NvbnRhY3RDdHJsJykuaW5qZWN0KGFwcClcbiAgICAgICAgfSlcbiAgICAgICAgLm90aGVyd2lzZSh7XG4gICAgICAgICAgIHJlZGlyZWN0VG86ICcvJ1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgXG5cbn0oKSk7XG59KS5jYWxsKHRoaXMscmVxdWlyZShcIm9NZnBBblwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2Zha2VfOTA1ZGEzMTUuanNcIixcIi9cIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cbmV4cG9ydHMuaW5qZWN0ID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5mYWN0b3J5KCdFdmVudHMnLCBleHBvcnRzLmZhY3RvcnkpO1xuICByZXR1cm4gZXhwb3J0cy5mYWN0b3J5O1xufTtcbmV4cG9ydHMuZmFjdG9yeSA9IGZ1bmN0aW9uKCRodHRwKSB7XG4gIHZhciBfdXJscyA9IHtcbiAgICBldmVudHM6ICdhcGkvZXZlbnRzLmpzb24nXG4gIH07XG4gIGZ1bmN0aW9uIGdldEV2ZW50cyAoY2FsbGJhY2spIHtcbiAgXHQkaHR0cC5nZXQoX3VybHMuZXZlbnRzKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xuICBcdFx0Y2FsbGJhY2soZGF0YSk7XG4gIFx0fSkuZXJyb3IoZnVuY3Rpb24oKXtcbiAgXHRcdGNvbnNvbGUubG9nKCdFcnJvcicpO1xuICBcdH0pO1xuICB9XG4gIHJldHVybiB7XG4gICAgZ2V0RXZlbnRzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBnZXRFdmVudHMoZGF0YSk7XG4gICAgfVxuICB9O1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJvTWZwQW5cIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9zZXJ2aWNlcy9ldmVudHMuanNcIixcIi9zZXJ2aWNlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qKlxuICogQGxpY2Vuc2UgQW5ndWxhckpTIHYxLjQuOFxuICogKGMpIDIwMTAtMjAxNSBHb29nbGUsIEluYy4gaHR0cDovL2FuZ3VsYXJqcy5vcmdcbiAqIExpY2Vuc2U6IE1JVFxuICovXG4oZnVuY3Rpb24od2luZG93LCBhbmd1bGFyLCB1bmRlZmluZWQpIHsndXNlIHN0cmljdCc7XG5cbi8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbnZhciBub29wICAgICAgICA9IGFuZ3VsYXIubm9vcDtcbnZhciBleHRlbmQgICAgICA9IGFuZ3VsYXIuZXh0ZW5kO1xudmFyIGpxTGl0ZSAgICAgID0gYW5ndWxhci5lbGVtZW50O1xudmFyIGZvckVhY2ggICAgID0gYW5ndWxhci5mb3JFYWNoO1xudmFyIGlzQXJyYXkgICAgID0gYW5ndWxhci5pc0FycmF5O1xudmFyIGlzU3RyaW5nICAgID0gYW5ndWxhci5pc1N0cmluZztcbnZhciBpc09iamVjdCAgICA9IGFuZ3VsYXIuaXNPYmplY3Q7XG52YXIgaXNVbmRlZmluZWQgPSBhbmd1bGFyLmlzVW5kZWZpbmVkO1xudmFyIGlzRGVmaW5lZCAgID0gYW5ndWxhci5pc0RlZmluZWQ7XG52YXIgaXNGdW5jdGlvbiAgPSBhbmd1bGFyLmlzRnVuY3Rpb247XG52YXIgaXNFbGVtZW50ICAgPSBhbmd1bGFyLmlzRWxlbWVudDtcblxudmFyIEVMRU1FTlRfTk9ERSA9IDE7XG52YXIgQ09NTUVOVF9OT0RFID0gODtcblxudmFyIEFERF9DTEFTU19TVUZGSVggPSAnLWFkZCc7XG52YXIgUkVNT1ZFX0NMQVNTX1NVRkZJWCA9ICctcmVtb3ZlJztcbnZhciBFVkVOVF9DTEFTU19QUkVGSVggPSAnbmctJztcbnZhciBBQ1RJVkVfQ0xBU1NfU1VGRklYID0gJy1hY3RpdmUnO1xuXG52YXIgTkdfQU5JTUFURV9DTEFTU05BTUUgPSAnbmctYW5pbWF0ZSc7XG52YXIgTkdfQU5JTUFURV9DSElMRFJFTl9EQVRBID0gJyQkbmdBbmltYXRlQ2hpbGRyZW4nO1xuXG4vLyBEZXRlY3QgcHJvcGVyIHRyYW5zaXRpb25lbmQvYW5pbWF0aW9uZW5kIGV2ZW50IG5hbWVzLlxudmFyIENTU19QUkVGSVggPSAnJywgVFJBTlNJVElPTl9QUk9QLCBUUkFOU0lUSU9ORU5EX0VWRU5ULCBBTklNQVRJT05fUFJPUCwgQU5JTUFUSU9ORU5EX0VWRU5UO1xuXG4vLyBJZiB1bnByZWZpeGVkIGV2ZW50cyBhcmUgbm90IHN1cHBvcnRlZCBidXQgd2Via2l0LXByZWZpeGVkIGFyZSwgdXNlIHRoZSBsYXR0ZXIuXG4vLyBPdGhlcndpc2UsIGp1c3QgdXNlIFczQyBuYW1lcywgYnJvd3NlcnMgbm90IHN1cHBvcnRpbmcgdGhlbSBhdCBhbGwgd2lsbCBqdXN0IGlnbm9yZSB0aGVtLlxuLy8gTm90ZTogQ2hyb21lIGltcGxlbWVudHMgYHdpbmRvdy5vbndlYmtpdGFuaW1hdGlvbmVuZGAgYW5kIGRvZXNuJ3QgaW1wbGVtZW50IGB3aW5kb3cub25hbmltYXRpb25lbmRgXG4vLyBidXQgYXQgdGhlIHNhbWUgdGltZSBkaXNwYXRjaGVzIHRoZSBgYW5pbWF0aW9uZW5kYCBldmVudCBhbmQgbm90IGB3ZWJraXRBbmltYXRpb25FbmRgLlxuLy8gUmVnaXN0ZXIgYm90aCBldmVudHMgaW4gY2FzZSBgd2luZG93Lm9uYW5pbWF0aW9uZW5kYCBpcyBub3Qgc3VwcG9ydGVkIGJlY2F1c2Ugb2YgdGhhdCxcbi8vIGRvIHRoZSBzYW1lIGZvciBgdHJhbnNpdGlvbmVuZGAgYXMgU2FmYXJpIGlzIGxpa2VseSB0byBleGhpYml0IHNpbWlsYXIgYmVoYXZpb3IuXG4vLyBBbHNvLCB0aGUgb25seSBtb2Rlcm4gYnJvd3NlciB0aGF0IHVzZXMgdmVuZG9yIHByZWZpeGVzIGZvciB0cmFuc2l0aW9ucy9rZXlmcmFtZXMgaXMgd2Via2l0XG4vLyB0aGVyZWZvcmUgdGhlcmUgaXMgbm8gcmVhc29uIHRvIHRlc3QgYW55bW9yZSBmb3Igb3RoZXIgdmVuZG9yIHByZWZpeGVzOlxuLy8gaHR0cDovL2Nhbml1c2UuY29tLyNzZWFyY2g9dHJhbnNpdGlvblxuaWYgKGlzVW5kZWZpbmVkKHdpbmRvdy5vbnRyYW5zaXRpb25lbmQpICYmIGlzRGVmaW5lZCh3aW5kb3cub253ZWJraXR0cmFuc2l0aW9uZW5kKSkge1xuICBDU1NfUFJFRklYID0gJy13ZWJraXQtJztcbiAgVFJBTlNJVElPTl9QUk9QID0gJ1dlYmtpdFRyYW5zaXRpb24nO1xuICBUUkFOU0lUSU9ORU5EX0VWRU5UID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCc7XG59IGVsc2Uge1xuICBUUkFOU0lUSU9OX1BST1AgPSAndHJhbnNpdGlvbic7XG4gIFRSQU5TSVRJT05FTkRfRVZFTlQgPSAndHJhbnNpdGlvbmVuZCc7XG59XG5cbmlmIChpc1VuZGVmaW5lZCh3aW5kb3cub25hbmltYXRpb25lbmQpICYmIGlzRGVmaW5lZCh3aW5kb3cub253ZWJraXRhbmltYXRpb25lbmQpKSB7XG4gIENTU19QUkVGSVggPSAnLXdlYmtpdC0nO1xuICBBTklNQVRJT05fUFJPUCA9ICdXZWJraXRBbmltYXRpb24nO1xuICBBTklNQVRJT05FTkRfRVZFTlQgPSAnd2Via2l0QW5pbWF0aW9uRW5kIGFuaW1hdGlvbmVuZCc7XG59IGVsc2Uge1xuICBBTklNQVRJT05fUFJPUCA9ICdhbmltYXRpb24nO1xuICBBTklNQVRJT05FTkRfRVZFTlQgPSAnYW5pbWF0aW9uZW5kJztcbn1cblxudmFyIERVUkFUSU9OX0tFWSA9ICdEdXJhdGlvbic7XG52YXIgUFJPUEVSVFlfS0VZID0gJ1Byb3BlcnR5JztcbnZhciBERUxBWV9LRVkgPSAnRGVsYXknO1xudmFyIFRJTUlOR19LRVkgPSAnVGltaW5nRnVuY3Rpb24nO1xudmFyIEFOSU1BVElPTl9JVEVSQVRJT05fQ09VTlRfS0VZID0gJ0l0ZXJhdGlvbkNvdW50JztcbnZhciBBTklNQVRJT05fUExBWVNUQVRFX0tFWSA9ICdQbGF5U3RhdGUnO1xudmFyIFNBRkVfRkFTVF9GT1JXQVJEX0RVUkFUSU9OX1ZBTFVFID0gOTk5OTtcblxudmFyIEFOSU1BVElPTl9ERUxBWV9QUk9QID0gQU5JTUFUSU9OX1BST1AgKyBERUxBWV9LRVk7XG52YXIgQU5JTUFUSU9OX0RVUkFUSU9OX1BST1AgPSBBTklNQVRJT05fUFJPUCArIERVUkFUSU9OX0tFWTtcbnZhciBUUkFOU0lUSU9OX0RFTEFZX1BST1AgPSBUUkFOU0lUSU9OX1BST1AgKyBERUxBWV9LRVk7XG52YXIgVFJBTlNJVElPTl9EVVJBVElPTl9QUk9QID0gVFJBTlNJVElPTl9QUk9QICsgRFVSQVRJT05fS0VZO1xuXG52YXIgaXNQcm9taXNlTGlrZSA9IGZ1bmN0aW9uKHApIHtcbiAgcmV0dXJuIHAgJiYgcC50aGVuID8gdHJ1ZSA6IGZhbHNlO1xufTtcblxuZnVuY3Rpb24gYXNzZXJ0QXJnKGFyZywgbmFtZSwgcmVhc29uKSB7XG4gIGlmICghYXJnKSB7XG4gICAgdGhyb3cgbmdNaW5FcnIoJ2FyZXEnLCBcIkFyZ3VtZW50ICd7MH0nIGlzIHsxfVwiLCAobmFtZSB8fCAnPycpLCAocmVhc29uIHx8IFwicmVxdWlyZWRcIikpO1xuICB9XG4gIHJldHVybiBhcmc7XG59XG5cbmZ1bmN0aW9uIG1lcmdlQ2xhc3NlcyhhLGIpIHtcbiAgaWYgKCFhICYmICFiKSByZXR1cm4gJyc7XG4gIGlmICghYSkgcmV0dXJuIGI7XG4gIGlmICghYikgcmV0dXJuIGE7XG4gIGlmIChpc0FycmF5KGEpKSBhID0gYS5qb2luKCcgJyk7XG4gIGlmIChpc0FycmF5KGIpKSBiID0gYi5qb2luKCcgJyk7XG4gIHJldHVybiBhICsgJyAnICsgYjtcbn1cblxuZnVuY3Rpb24gcGFja2FnZVN0eWxlcyhvcHRpb25zKSB7XG4gIHZhciBzdHlsZXMgPSB7fTtcbiAgaWYgKG9wdGlvbnMgJiYgKG9wdGlvbnMudG8gfHwgb3B0aW9ucy5mcm9tKSkge1xuICAgIHN0eWxlcy50byA9IG9wdGlvbnMudG87XG4gICAgc3R5bGVzLmZyb20gPSBvcHRpb25zLmZyb207XG4gIH1cbiAgcmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gcGVuZENsYXNzZXMoY2xhc3NlcywgZml4LCBpc1ByZWZpeCkge1xuICB2YXIgY2xhc3NOYW1lID0gJyc7XG4gIGNsYXNzZXMgPSBpc0FycmF5KGNsYXNzZXMpXG4gICAgICA/IGNsYXNzZXNcbiAgICAgIDogY2xhc3NlcyAmJiBpc1N0cmluZyhjbGFzc2VzKSAmJiBjbGFzc2VzLmxlbmd0aFxuICAgICAgICAgID8gY2xhc3Nlcy5zcGxpdCgvXFxzKy8pXG4gICAgICAgICAgOiBbXTtcbiAgZm9yRWFjaChjbGFzc2VzLCBmdW5jdGlvbihrbGFzcywgaSkge1xuICAgIGlmIChrbGFzcyAmJiBrbGFzcy5sZW5ndGggPiAwKSB7XG4gICAgICBjbGFzc05hbWUgKz0gKGkgPiAwKSA/ICcgJyA6ICcnO1xuICAgICAgY2xhc3NOYW1lICs9IGlzUHJlZml4ID8gZml4ICsga2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGtsYXNzICsgZml4O1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUZyb21BcnJheShhcnIsIHZhbCkge1xuICB2YXIgaW5kZXggPSBhcnIuaW5kZXhPZih2YWwpO1xuICBpZiAodmFsID49IDApIHtcbiAgICBhcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdHJpcENvbW1lbnRzRnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIGpxTGl0ZSkge1xuICAgIHN3aXRjaCAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAxOlxuICAgICAgICAvLyB0aGVyZSBpcyBubyBwb2ludCBvZiBzdHJpcHBpbmcgYW55dGhpbmcgaWYgdGhlIGVsZW1lbnRcbiAgICAgICAgLy8gaXMgdGhlIG9ubHkgZWxlbWVudCB3aXRoaW4gdGhlIGpxTGl0ZSB3cmFwcGVyLlxuICAgICAgICAvLyAoaXQncyBpbXBvcnRhbnQgdGhhdCB3ZSByZXRhaW4gdGhlIGVsZW1lbnQgaW5zdGFuY2UuKVxuICAgICAgICBpZiAoZWxlbWVudFswXS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBqcUxpdGUoZXh0cmFjdEVsZW1lbnROb2RlKGVsZW1lbnQpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgIHJldHVybiBqcUxpdGUoZWxlbWVudCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXh0cmFjdEVsZW1lbnROb2RlKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50WzBdKSByZXR1cm4gZWxlbWVudDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGVsbSA9IGVsZW1lbnRbaV07XG4gICAgaWYgKGVsbS5ub2RlVHlwZSA9PSBFTEVNRU5UX05PREUpIHtcbiAgICAgIHJldHVybiBlbG07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uICQkYWRkQ2xhc3MoJCRqcUxpdGUsIGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICBmb3JFYWNoKGVsZW1lbnQsIGZ1bmN0aW9uKGVsbSkge1xuICAgICQkanFMaXRlLmFkZENsYXNzKGVsbSwgY2xhc3NOYW1lKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uICQkcmVtb3ZlQ2xhc3MoJCRqcUxpdGUsIGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICBmb3JFYWNoKGVsZW1lbnQsIGZ1bmN0aW9uKGVsbSkge1xuICAgICQkanFMaXRlLnJlbW92ZUNsYXNzKGVsbSwgY2xhc3NOYW1lKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5QW5pbWF0aW9uQ2xhc3Nlc0ZhY3RvcnkoJCRqcUxpdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5hZGRDbGFzcykge1xuICAgICAgJCRhZGRDbGFzcygkJGpxTGl0ZSwgZWxlbWVudCwgb3B0aW9ucy5hZGRDbGFzcyk7XG4gICAgICBvcHRpb25zLmFkZENsYXNzID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucmVtb3ZlQ2xhc3MpIHtcbiAgICAgICQkcmVtb3ZlQ2xhc3MoJCRqcUxpdGUsIGVsZW1lbnQsIG9wdGlvbnMucmVtb3ZlQ2xhc3MpO1xuICAgICAgb3B0aW9ucy5yZW1vdmVDbGFzcyA9IG51bGw7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVBbmltYXRpb25PcHRpb25zKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGlmICghb3B0aW9ucy4kJHByZXBhcmVkKSB7XG4gICAgdmFyIGRvbU9wZXJhdGlvbiA9IG9wdGlvbnMuZG9tT3BlcmF0aW9uIHx8IG5vb3A7XG4gICAgb3B0aW9ucy5kb21PcGVyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIG9wdGlvbnMuJCRkb21PcGVyYXRpb25GaXJlZCA9IHRydWU7XG4gICAgICBkb21PcGVyYXRpb24oKTtcbiAgICAgIGRvbU9wZXJhdGlvbiA9IG5vb3A7XG4gICAgfTtcbiAgICBvcHRpb25zLiQkcHJlcGFyZWQgPSB0cnVlO1xuICB9XG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5mdW5jdGlvbiBhcHBseUFuaW1hdGlvblN0eWxlcyhlbGVtZW50LCBvcHRpb25zKSB7XG4gIGFwcGx5QW5pbWF0aW9uRnJvbVN0eWxlcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgYXBwbHlBbmltYXRpb25Ub1N0eWxlcyhlbGVtZW50LCBvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gYXBwbHlBbmltYXRpb25Gcm9tU3R5bGVzKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMuZnJvbSkge1xuICAgIGVsZW1lbnQuY3NzKG9wdGlvbnMuZnJvbSk7XG4gICAgb3B0aW9ucy5mcm9tID0gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseUFuaW1hdGlvblRvU3R5bGVzKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMudG8pIHtcbiAgICBlbGVtZW50LmNzcyhvcHRpb25zLnRvKTtcbiAgICBvcHRpb25zLnRvID0gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZUFuaW1hdGlvbk9wdGlvbnMoZWxlbWVudCwgdGFyZ2V0LCBuZXdPcHRpb25zKSB7XG4gIHZhciB0b0FkZCA9ICh0YXJnZXQuYWRkQ2xhc3MgfHwgJycpICsgJyAnICsgKG5ld09wdGlvbnMuYWRkQ2xhc3MgfHwgJycpO1xuICB2YXIgdG9SZW1vdmUgPSAodGFyZ2V0LnJlbW92ZUNsYXNzIHx8ICcnKSArICcgJyArIChuZXdPcHRpb25zLnJlbW92ZUNsYXNzIHx8ICcnKTtcbiAgdmFyIGNsYXNzZXMgPSByZXNvbHZlRWxlbWVudENsYXNzZXMoZWxlbWVudC5hdHRyKCdjbGFzcycpLCB0b0FkZCwgdG9SZW1vdmUpO1xuXG4gIGlmIChuZXdPcHRpb25zLnByZXBhcmF0aW9uQ2xhc3Nlcykge1xuICAgIHRhcmdldC5wcmVwYXJhdGlvbkNsYXNzZXMgPSBjb25jYXRXaXRoU3BhY2UobmV3T3B0aW9ucy5wcmVwYXJhdGlvbkNsYXNzZXMsIHRhcmdldC5wcmVwYXJhdGlvbkNsYXNzZXMpO1xuICAgIGRlbGV0ZSBuZXdPcHRpb25zLnByZXBhcmF0aW9uQ2xhc3NlcztcbiAgfVxuXG4gIC8vIG5vb3AgaXMgYmFzaWNhbGx5IHdoZW4gdGhlcmUgaXMgbm8gY2FsbGJhY2s7IG90aGVyd2lzZSBzb21ldGhpbmcgaGFzIGJlZW4gc2V0XG4gIHZhciByZWFsRG9tT3BlcmF0aW9uID0gdGFyZ2V0LmRvbU9wZXJhdGlvbiAhPT0gbm9vcCA/IHRhcmdldC5kb21PcGVyYXRpb24gOiBudWxsO1xuXG4gIGV4dGVuZCh0YXJnZXQsIG5ld09wdGlvbnMpO1xuXG4gIC8vIFRPRE8obWF0c2tvIG9yIHNyZWVyYW11KTogcHJvcGVyIGZpeCBpcyB0byBtYWludGFpbiBhbGwgYW5pbWF0aW9uIGNhbGxiYWNrIGluIGFycmF5IGFuZCBjYWxsIGF0IGxhc3QsYnV0IG5vdyBvbmx5IGxlYXZlIGhhcyB0aGUgY2FsbGJhY2sgc28gbm8gaXNzdWUgd2l0aCB0aGlzLlxuICBpZiAocmVhbERvbU9wZXJhdGlvbikge1xuICAgIHRhcmdldC5kb21PcGVyYXRpb24gPSByZWFsRG9tT3BlcmF0aW9uO1xuICB9XG5cbiAgaWYgKGNsYXNzZXMuYWRkQ2xhc3MpIHtcbiAgICB0YXJnZXQuYWRkQ2xhc3MgPSBjbGFzc2VzLmFkZENsYXNzO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldC5hZGRDbGFzcyA9IG51bGw7XG4gIH1cblxuICBpZiAoY2xhc3Nlcy5yZW1vdmVDbGFzcykge1xuICAgIHRhcmdldC5yZW1vdmVDbGFzcyA9IGNsYXNzZXMucmVtb3ZlQ2xhc3M7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0LnJlbW92ZUNsYXNzID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVFbGVtZW50Q2xhc3NlcyhleGlzdGluZywgdG9BZGQsIHRvUmVtb3ZlKSB7XG4gIHZhciBBRERfQ0xBU1MgPSAxO1xuICB2YXIgUkVNT1ZFX0NMQVNTID0gLTE7XG5cbiAgdmFyIGZsYWdzID0ge307XG4gIGV4aXN0aW5nID0gc3BsaXRDbGFzc2VzVG9Mb29rdXAoZXhpc3RpbmcpO1xuXG4gIHRvQWRkID0gc3BsaXRDbGFzc2VzVG9Mb29rdXAodG9BZGQpO1xuICBmb3JFYWNoKHRvQWRkLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgZmxhZ3Nba2V5XSA9IEFERF9DTEFTUztcbiAgfSk7XG5cbiAgdG9SZW1vdmUgPSBzcGxpdENsYXNzZXNUb0xvb2t1cCh0b1JlbW92ZSk7XG4gIGZvckVhY2godG9SZW1vdmUsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICBmbGFnc1trZXldID0gZmxhZ3Nba2V5XSA9PT0gQUREX0NMQVNTID8gbnVsbCA6IFJFTU9WRV9DTEFTUztcbiAgfSk7XG5cbiAgdmFyIGNsYXNzZXMgPSB7XG4gICAgYWRkQ2xhc3M6ICcnLFxuICAgIHJlbW92ZUNsYXNzOiAnJ1xuICB9O1xuXG4gIGZvckVhY2goZmxhZ3MsIGZ1bmN0aW9uKHZhbCwga2xhc3MpIHtcbiAgICB2YXIgcHJvcCwgYWxsb3c7XG4gICAgaWYgKHZhbCA9PT0gQUREX0NMQVNTKSB7XG4gICAgICBwcm9wID0gJ2FkZENsYXNzJztcbiAgICAgIGFsbG93ID0gIWV4aXN0aW5nW2tsYXNzXTtcbiAgICB9IGVsc2UgaWYgKHZhbCA9PT0gUkVNT1ZFX0NMQVNTKSB7XG4gICAgICBwcm9wID0gJ3JlbW92ZUNsYXNzJztcbiAgICAgIGFsbG93ID0gZXhpc3Rpbmdba2xhc3NdO1xuICAgIH1cbiAgICBpZiAoYWxsb3cpIHtcbiAgICAgIGlmIChjbGFzc2VzW3Byb3BdLmxlbmd0aCkge1xuICAgICAgICBjbGFzc2VzW3Byb3BdICs9ICcgJztcbiAgICAgIH1cbiAgICAgIGNsYXNzZXNbcHJvcF0gKz0ga2xhc3M7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzcGxpdENsYXNzZXNUb0xvb2t1cChjbGFzc2VzKSB7XG4gICAgaWYgKGlzU3RyaW5nKGNsYXNzZXMpKSB7XG4gICAgICBjbGFzc2VzID0gY2xhc3Nlcy5zcGxpdCgnICcpO1xuICAgIH1cblxuICAgIHZhciBvYmogPSB7fTtcbiAgICBmb3JFYWNoKGNsYXNzZXMsIGZ1bmN0aW9uKGtsYXNzKSB7XG4gICAgICAvLyBzb21ldGltZXMgdGhlIHNwbGl0IGxlYXZlcyBlbXB0eSBzdHJpbmcgdmFsdWVzXG4gICAgICAvLyBpbmNhc2UgZXh0cmEgc3BhY2VzIHdlcmUgYXBwbGllZCB0byB0aGUgb3B0aW9uc1xuICAgICAgaWYgKGtsYXNzLmxlbmd0aCkge1xuICAgICAgICBvYmpba2xhc3NdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIGNsYXNzZXM7XG59XG5cbmZ1bmN0aW9uIGdldERvbU5vZGUoZWxlbWVudCkge1xuICByZXR1cm4gKGVsZW1lbnQgaW5zdGFuY2VvZiBhbmd1bGFyLmVsZW1lbnQpID8gZWxlbWVudFswXSA6IGVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGFwcGx5R2VuZXJhdGVkUHJlcGFyYXRpb25DbGFzc2VzKGVsZW1lbnQsIGV2ZW50LCBvcHRpb25zKSB7XG4gIHZhciBjbGFzc2VzID0gJyc7XG4gIGlmIChldmVudCkge1xuICAgIGNsYXNzZXMgPSBwZW5kQ2xhc3NlcyhldmVudCwgRVZFTlRfQ0xBU1NfUFJFRklYLCB0cnVlKTtcbiAgfVxuICBpZiAob3B0aW9ucy5hZGRDbGFzcykge1xuICAgIGNsYXNzZXMgPSBjb25jYXRXaXRoU3BhY2UoY2xhc3NlcywgcGVuZENsYXNzZXMob3B0aW9ucy5hZGRDbGFzcywgQUREX0NMQVNTX1NVRkZJWCkpO1xuICB9XG4gIGlmIChvcHRpb25zLnJlbW92ZUNsYXNzKSB7XG4gICAgY2xhc3NlcyA9IGNvbmNhdFdpdGhTcGFjZShjbGFzc2VzLCBwZW5kQ2xhc3NlcyhvcHRpb25zLnJlbW92ZUNsYXNzLCBSRU1PVkVfQ0xBU1NfU1VGRklYKSk7XG4gIH1cbiAgaWYgKGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgb3B0aW9ucy5wcmVwYXJhdGlvbkNsYXNzZXMgPSBjbGFzc2VzO1xuICAgIGVsZW1lbnQuYWRkQ2xhc3MoY2xhc3Nlcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJHZW5lcmF0ZWRDbGFzc2VzKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMucHJlcGFyYXRpb25DbGFzc2VzKSB7XG4gICAgZWxlbWVudC5yZW1vdmVDbGFzcyhvcHRpb25zLnByZXBhcmF0aW9uQ2xhc3Nlcyk7XG4gICAgb3B0aW9ucy5wcmVwYXJhdGlvbkNsYXNzZXMgPSBudWxsO1xuICB9XG4gIGlmIChvcHRpb25zLmFjdGl2ZUNsYXNzZXMpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzKG9wdGlvbnMuYWN0aXZlQ2xhc3Nlcyk7XG4gICAgb3B0aW9ucy5hY3RpdmVDbGFzc2VzID0gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBibG9ja1RyYW5zaXRpb25zKG5vZGUsIGR1cmF0aW9uKSB7XG4gIC8vIHdlIHVzZSBhIG5lZ2F0aXZlIGRlbGF5IHZhbHVlIHNpbmNlIGl0IHBlcmZvcm1zIGJsb2NraW5nXG4gIC8vIHlldCBpdCBkb2Vzbid0IGtpbGwgYW55IGV4aXN0aW5nIHRyYW5zaXRpb25zIHJ1bm5pbmcgb24gdGhlXG4gIC8vIHNhbWUgZWxlbWVudCB3aGljaCBtYWtlcyB0aGlzIHNhZmUgZm9yIGNsYXNzLWJhc2VkIGFuaW1hdGlvbnNcbiAgdmFyIHZhbHVlID0gZHVyYXRpb24gPyAnLScgKyBkdXJhdGlvbiArICdzJyA6ICcnO1xuICBhcHBseUlubGluZVN0eWxlKG5vZGUsIFtUUkFOU0lUSU9OX0RFTEFZX1BST1AsIHZhbHVlXSk7XG4gIHJldHVybiBbVFJBTlNJVElPTl9ERUxBWV9QUk9QLCB2YWx1ZV07XG59XG5cbmZ1bmN0aW9uIGJsb2NrS2V5ZnJhbWVBbmltYXRpb25zKG5vZGUsIGFwcGx5QmxvY2spIHtcbiAgdmFyIHZhbHVlID0gYXBwbHlCbG9jayA/ICdwYXVzZWQnIDogJyc7XG4gIHZhciBrZXkgPSBBTklNQVRJT05fUFJPUCArIEFOSU1BVElPTl9QTEFZU1RBVEVfS0VZO1xuICBhcHBseUlubGluZVN0eWxlKG5vZGUsIFtrZXksIHZhbHVlXSk7XG4gIHJldHVybiBba2V5LCB2YWx1ZV07XG59XG5cbmZ1bmN0aW9uIGFwcGx5SW5saW5lU3R5bGUobm9kZSwgc3R5bGVUdXBsZSkge1xuICB2YXIgcHJvcCA9IHN0eWxlVHVwbGVbMF07XG4gIHZhciB2YWx1ZSA9IHN0eWxlVHVwbGVbMV07XG4gIG5vZGUuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY29uY2F0V2l0aFNwYWNlKGEsYikge1xuICBpZiAoIWEpIHJldHVybiBiO1xuICBpZiAoIWIpIHJldHVybiBhO1xuICByZXR1cm4gYSArICcgJyArIGI7XG59XG5cbnZhciAkJHJBRlNjaGVkdWxlckZhY3RvcnkgPSBbJyQkckFGJywgZnVuY3Rpb24oJCRyQUYpIHtcbiAgdmFyIHF1ZXVlLCBjYW5jZWxGbjtcblxuICBmdW5jdGlvbiBzY2hlZHVsZXIodGFza3MpIHtcbiAgICAvLyB3ZSBtYWtlIGEgY29weSBzaW5jZSBSQUZTY2hlZHVsZXIgbXV0YXRlcyB0aGUgc3RhdGVcbiAgICAvLyBvZiB0aGUgcGFzc2VkIGluIGFycmF5IHZhcmlhYmxlIGFuZCB0aGlzIHdvdWxkIGJlIGRpZmZpY3VsdFxuICAgIC8vIHRvIHRyYWNrIGRvd24gb24gdGhlIG91dHNpZGUgY29kZVxuICAgIHF1ZXVlID0gcXVldWUuY29uY2F0KHRhc2tzKTtcbiAgICBuZXh0VGljaygpO1xuICB9XG5cbiAgcXVldWUgPSBzY2hlZHVsZXIucXVldWUgPSBbXTtcblxuICAvKiB3YWl0VW50aWxRdWlldCBkb2VzIHR3byB0aGluZ3M6XG4gICAqIDEuIEl0IHdpbGwgcnVuIHRoZSBGSU5BTCBgZm5gIHZhbHVlIG9ubHkgd2hlbiBhbiB1bmNhbmNlbGxlZCBSQUYgaGFzIHBhc3NlZCB0aHJvdWdoXG4gICAqIDIuIEl0IHdpbGwgZGVsYXkgdGhlIG5leHQgd2F2ZSBvZiB0YXNrcyBmcm9tIHJ1bm5pbmcgdW50aWwgdGhlIHF1aWV0IGBmbmAgaGFzIHJ1bi5cbiAgICpcbiAgICogVGhlIG1vdGl2YXRpb24gaGVyZSBpcyB0aGF0IGFuaW1hdGlvbiBjb2RlIGNhbiByZXF1ZXN0IG1vcmUgdGltZSBmcm9tIHRoZSBzY2hlZHVsZXJcbiAgICogYmVmb3JlIHRoZSBuZXh0IHdhdmUgcnVucy4gVGhpcyBhbGxvd3MgZm9yIGNlcnRhaW4gRE9NIHByb3BlcnRpZXMgc3VjaCBhcyBjbGFzc2VzIHRvXG4gICAqIGJlIHJlc29sdmVkIGluIHRpbWUgZm9yIHRoZSBuZXh0IGFuaW1hdGlvbiB0byBydW4uXG4gICAqL1xuICBzY2hlZHVsZXIud2FpdFVudGlsUXVpZXQgPSBmdW5jdGlvbihmbikge1xuICAgIGlmIChjYW5jZWxGbikgY2FuY2VsRm4oKTtcblxuICAgIGNhbmNlbEZuID0gJCRyQUYoZnVuY3Rpb24oKSB7XG4gICAgICBjYW5jZWxGbiA9IG51bGw7XG4gICAgICBmbigpO1xuICAgICAgbmV4dFRpY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gc2NoZWR1bGVyO1xuXG4gIGZ1bmN0aW9uIG5leHRUaWNrKCkge1xuICAgIGlmICghcXVldWUubGVuZ3RoKSByZXR1cm47XG5cbiAgICB2YXIgaXRlbXMgPSBxdWV1ZS5zaGlmdCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZW1zW2ldKCk7XG4gICAgfVxuXG4gICAgaWYgKCFjYW5jZWxGbikge1xuICAgICAgJCRyQUYoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghY2FuY2VsRm4pIG5leHRUaWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1dO1xuXG52YXIgJCRBbmltYXRlQ2hpbGRyZW5EaXJlY3RpdmUgPSBbZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICB2YXIgdmFsID0gYXR0cnMubmdBbmltYXRlQ2hpbGRyZW47XG4gICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodmFsKSAmJiB2YWwubGVuZ3RoID09PSAwKSB7IC8vZW1wdHkgYXR0cmlidXRlXG4gICAgICBlbGVtZW50LmRhdGEoTkdfQU5JTUFURV9DSElMRFJFTl9EQVRBLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0cnMuJG9ic2VydmUoJ25nQW5pbWF0ZUNoaWxkcmVuJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gJ29uJyB8fCB2YWx1ZSA9PT0gJ3RydWUnO1xuICAgICAgICBlbGVtZW50LmRhdGEoTkdfQU5JTUFURV9DSElMRFJFTl9EQVRBLCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XTtcblxudmFyIEFOSU1BVEVfVElNRVJfS0VZID0gJyQkYW5pbWF0ZUNzcyc7XG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lICRhbmltYXRlQ3NzXG4gKiBAa2luZCBvYmplY3RcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBgJGFuaW1hdGVDc3NgIHNlcnZpY2UgaXMgYSB1c2VmdWwgdXRpbGl0eSB0byB0cmlnZ2VyIGN1c3RvbWl6ZWQgQ1NTLWJhc2VkIHRyYW5zaXRpb25zL2tleWZyYW1lc1xuICogZnJvbSBhIEphdmFTY3JpcHQtYmFzZWQgYW5pbWF0aW9uIG9yIGRpcmVjdGx5IGZyb20gYSBkaXJlY3RpdmUuIFRoZSBwdXJwb3NlIG9mIGAkYW5pbWF0ZUNzc2AgaXMgTk9UXG4gKiB0byBzaWRlLXN0ZXAgaG93IGAkYW5pbWF0ZWAgYW5kIG5nQW5pbWF0ZSB3b3JrLCBidXQgdGhlIGdvYWwgaXMgdG8gYWxsb3cgcHJlLWV4aXN0aW5nIGFuaW1hdGlvbnMgb3JcbiAqIGRpcmVjdGl2ZXMgdG8gY3JlYXRlIG1vcmUgY29tcGxleCBhbmltYXRpb25zIHRoYXQgY2FuIGJlIHB1cmVseSBkcml2ZW4gdXNpbmcgQ1NTIGNvZGUuXG4gKlxuICogTm90ZSB0aGF0IG9ubHkgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IENTUyB0cmFuc2l0aW9ucyBhbmQvb3Iga2V5ZnJhbWUgYW5pbWF0aW9ucyBhcmUgY2FwYWJsZSBvZlxuICogcmVuZGVyaW5nIGFuaW1hdGlvbnMgdHJpZ2dlcmVkIHZpYSBgJGFuaW1hdGVDc3NgIChiYWQgbmV3cyBmb3IgSUU5IGFuZCBsb3dlcikuXG4gKlxuICogIyMgVXNhZ2VcbiAqIE9uY2UgYWdhaW4sIGAkYW5pbWF0ZUNzc2AgaXMgZGVzaWduZWQgdG8gYmUgdXNlZCBpbnNpZGUgb2YgYSByZWdpc3RlcmVkIEphdmFTY3JpcHQgYW5pbWF0aW9uIHRoYXRcbiAqIGlzIHBvd2VyZWQgYnkgbmdBbmltYXRlLiBJdCBpcyBwb3NzaWJsZSB0byB1c2UgYCRhbmltYXRlQ3NzYCBkaXJlY3RseSBpbnNpZGUgb2YgYSBkaXJlY3RpdmUsIGhvd2V2ZXIsXG4gKiBhbnkgYXV0b21hdGljIGNvbnRyb2wgb3ZlciBjYW5jZWxsaW5nIGFuaW1hdGlvbnMgYW5kL29yIHByZXZlbnRpbmcgYW5pbWF0aW9ucyBmcm9tIGJlaW5nIHJ1biBvblxuICogY2hpbGQgZWxlbWVudHMgd2lsbCBub3QgYmUgaGFuZGxlZCBieSBBbmd1bGFyLiBGb3IgdGhpcyB0byB3b3JrIGFzIGV4cGVjdGVkLCBwbGVhc2UgdXNlIGAkYW5pbWF0ZWAgdG9cbiAqIHRyaWdnZXIgdGhlIGFuaW1hdGlvbiBhbmQgdGhlbiBzZXR1cCBhIEphdmFTY3JpcHQgYW5pbWF0aW9uIHRoYXQgaW5qZWN0cyBgJGFuaW1hdGVDc3NgIHRvIHRyaWdnZXJcbiAqIHRoZSBDU1MgYW5pbWF0aW9uLlxuICpcbiAqIFRoZSBleGFtcGxlIGJlbG93IHNob3dzIGhvdyB3ZSBjYW4gY3JlYXRlIGEgZm9sZGluZyBhbmltYXRpb24gb24gYW4gZWxlbWVudCB1c2luZyBgbmctaWZgOlxuICpcbiAqIGBgYGh0bWxcbiAqIDwhLS0gbm90aWNlIHRoZSBgZm9sZC1hbmltYXRpb25gIENTUyBjbGFzcyAtLT5cbiAqIDxkaXYgbmctaWY9XCJvbk9mZlwiIGNsYXNzPVwiZm9sZC1hbmltYXRpb25cIj5cbiAqICAgVGhpcyBlbGVtZW50IHdpbGwgZ28gQk9PTVxuICogPC9kaXY+XG4gKiA8YnV0dG9uIG5nLWNsaWNrPVwib25PZmY9dHJ1ZVwiPkZvbGQgSW48L2J1dHRvbj5cbiAqIGBgYFxuICpcbiAqIE5vdyB3ZSBjcmVhdGUgdGhlICoqSmF2YVNjcmlwdCBhbmltYXRpb24qKiB0aGF0IHdpbGwgdHJpZ2dlciB0aGUgQ1NTIHRyYW5zaXRpb246XG4gKlxuICogYGBganNcbiAqIG5nTW9kdWxlLmFuaW1hdGlvbignLmZvbGQtYW5pbWF0aW9uJywgWyckYW5pbWF0ZUNzcycsIGZ1bmN0aW9uKCRhbmltYXRlQ3NzKSB7XG4gKiAgIHJldHVybiB7XG4gKiAgICAgZW50ZXI6IGZ1bmN0aW9uKGVsZW1lbnQsIGRvbmVGbikge1xuICogICAgICAgdmFyIGhlaWdodCA9IGVsZW1lbnRbMF0ub2Zmc2V0SGVpZ2h0O1xuICogICAgICAgcmV0dXJuICRhbmltYXRlQ3NzKGVsZW1lbnQsIHtcbiAqICAgICAgICAgZnJvbTogeyBoZWlnaHQ6JzBweCcgfSxcbiAqICAgICAgICAgdG86IHsgaGVpZ2h0OmhlaWdodCArICdweCcgfSxcbiAqICAgICAgICAgZHVyYXRpb246IDEgLy8gb25lIHNlY29uZFxuICogICAgICAgfSk7XG4gKiAgICAgfVxuICogICB9XG4gKiB9XSk7XG4gKiBgYGBcbiAqXG4gKiAjIyBNb3JlIEFkdmFuY2VkIFVzZXNcbiAqXG4gKiBgJGFuaW1hdGVDc3NgIGlzIHRoZSB1bmRlcmx5aW5nIGNvZGUgdGhhdCBuZ0FuaW1hdGUgdXNlcyB0byBwb3dlciAqKkNTUy1iYXNlZCBhbmltYXRpb25zKiogYmVoaW5kIHRoZSBzY2VuZXMuIFRoZXJlZm9yZSBDU1MgaG9va3NcbiAqIGxpa2UgYC5uZy1FVkVOVGAsIGAubmctRVZFTlQtYWN0aXZlYCwgYC5uZy1FVkVOVC1zdGFnZ2VyYCBhcmUgYWxsIGZlYXR1cmVzIHRoYXQgY2FuIGJlIHRyaWdnZXJlZCB1c2luZyBgJGFuaW1hdGVDc3NgIHZpYSBKYXZhU2NyaXB0IGNvZGUuXG4gKlxuICogVGhpcyBhbHNvIG1lYW5zIHRoYXQganVzdCBhYm91dCBhbnkgY29tYmluYXRpb24gb2YgYWRkaW5nIGNsYXNzZXMsIHJlbW92aW5nIGNsYXNzZXMsIHNldHRpbmcgc3R5bGVzLCBkeW5hbWljYWxseSBzZXR0aW5nIGEga2V5ZnJhbWUgYW5pbWF0aW9uLFxuICogYXBwbHlpbmcgYSBoYXJkY29kZWQgZHVyYXRpb24gb3IgZGVsYXkgdmFsdWUsIGNoYW5naW5nIHRoZSBhbmltYXRpb24gZWFzaW5nIG9yIGFwcGx5aW5nIGEgc3RhZ2dlciBhbmltYXRpb24gYXJlIGFsbCBvcHRpb25zIHRoYXQgd29yayB3aXRoXG4gKiBgJGFuaW1hdGVDc3NgLiBUaGUgc2VydmljZSBpdHNlbGYgaXMgc21hcnQgZW5vdWdoIHRvIGZpZ3VyZSBvdXQgdGhlIGNvbWJpbmF0aW9uIG9mIG9wdGlvbnMgYW5kIGV4YW1pbmUgdGhlIGVsZW1lbnQgc3R5bGluZyBwcm9wZXJ0aWVzIGluIG9yZGVyXG4gKiB0byBwcm92aWRlIGEgd29ya2luZyBhbmltYXRpb24gdGhhdCB3aWxsIHJ1biBpbiBDU1MuXG4gKlxuICogVGhlIGV4YW1wbGUgYmVsb3cgc2hvd2Nhc2VzIGEgbW9yZSBhZHZhbmNlZCB2ZXJzaW9uIG9mIHRoZSBgLmZvbGQtYW5pbWF0aW9uYCBmcm9tIHRoZSBleGFtcGxlIGFib3ZlOlxuICpcbiAqIGBgYGpzXG4gKiBuZ01vZHVsZS5hbmltYXRpb24oJy5mb2xkLWFuaW1hdGlvbicsIFsnJGFuaW1hdGVDc3MnLCBmdW5jdGlvbigkYW5pbWF0ZUNzcykge1xuICogICByZXR1cm4ge1xuICogICAgIGVudGVyOiBmdW5jdGlvbihlbGVtZW50LCBkb25lRm4pIHtcbiAqICAgICAgIHZhciBoZWlnaHQgPSBlbGVtZW50WzBdLm9mZnNldEhlaWdodDtcbiAqICAgICAgIHJldHVybiAkYW5pbWF0ZUNzcyhlbGVtZW50LCB7XG4gKiAgICAgICAgIGFkZENsYXNzOiAncmVkIGxhcmdlLXRleHQgcHVsc2UtdHdpY2UnLFxuICogICAgICAgICBlYXNpbmc6ICdlYXNlLW91dCcsXG4gKiAgICAgICAgIGZyb206IHsgaGVpZ2h0OicwcHgnIH0sXG4gKiAgICAgICAgIHRvOiB7IGhlaWdodDpoZWlnaHQgKyAncHgnIH0sXG4gKiAgICAgICAgIGR1cmF0aW9uOiAxIC8vIG9uZSBzZWNvbmRcbiAqICAgICAgIH0pO1xuICogICAgIH1cbiAqICAgfVxuICogfV0pO1xuICogYGBgXG4gKlxuICogU2luY2Ugd2UncmUgYWRkaW5nL3JlbW92aW5nIENTUyBjbGFzc2VzIHRoZW4gdGhlIENTUyB0cmFuc2l0aW9uIHdpbGwgYWxzbyBwaWNrIHRob3NlIHVwOlxuICpcbiAqIGBgYGNzc1xuICogLyYjNDI7IHNpbmNlIGEgaGFyZGNvZGVkIGR1cmF0aW9uIHZhbHVlIG9mIDEgd2FzIHByb3ZpZGVkIGluIHRoZSBKYXZhU2NyaXB0IGFuaW1hdGlvbiBjb2RlLFxuICogdGhlIENTUyBjbGFzc2VzIGJlbG93IHdpbGwgYmUgdHJhbnNpdGlvbmVkIGRlc3BpdGUgdGhlbSBiZWluZyBkZWZpbmVkIGFzIHJlZ3VsYXIgQ1NTIGNsYXNzZXMgJiM0MjsvXG4gKiAucmVkIHsgYmFja2dyb3VuZDpyZWQ7IH1cbiAqIC5sYXJnZS10ZXh0IHsgZm9udC1zaXplOjIwcHg7IH1cbiAqXG4gKiAvJiM0Mjsgd2UgY2FuIGFsc28gdXNlIGEga2V5ZnJhbWUgYW5pbWF0aW9uIGFuZCAkYW5pbWF0ZUNzcyB3aWxsIG1ha2UgaXQgd29yayBhbG9uZ3NpZGUgdGhlIHRyYW5zaXRpb24gJiM0MjsvXG4gKiAucHVsc2UtdHdpY2Uge1xuICogICBhbmltYXRpb246IDAuNXMgcHVsc2UgbGluZWFyIDI7XG4gKiAgIC13ZWJraXQtYW5pbWF0aW9uOiAwLjVzIHB1bHNlIGxpbmVhciAyO1xuICogfVxuICpcbiAqIEBrZXlmcmFtZXMgcHVsc2Uge1xuICogICBmcm9tIHsgdHJhbnNmb3JtOiBzY2FsZSgwLjUpOyB9XG4gKiAgIHRvIHsgdHJhbnNmb3JtOiBzY2FsZSgxLjUpOyB9XG4gKiB9XG4gKlxuICogQC13ZWJraXQta2V5ZnJhbWVzIHB1bHNlIHtcbiAqICAgZnJvbSB7IC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjUpOyB9XG4gKiAgIHRvIHsgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuNSk7IH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEdpdmVuIHRoaXMgY29tcGxleCBjb21iaW5hdGlvbiBvZiBDU1MgY2xhc3Nlcywgc3R5bGVzIGFuZCBvcHRpb25zLCBgJGFuaW1hdGVDc3NgIHdpbGwgZmlndXJlIGV2ZXJ5dGhpbmcgb3V0IGFuZCBtYWtlIHRoZSBhbmltYXRpb24gaGFwcGVuLlxuICpcbiAqICMjIEhvdyB0aGUgT3B0aW9ucyBhcmUgaGFuZGxlZFxuICpcbiAqIGAkYW5pbWF0ZUNzc2AgaXMgdmVyeSB2ZXJzYXRpbGUgYW5kIGludGVsbGlnZW50IHdoZW4gaXQgY29tZXMgdG8gZmlndXJpbmcgb3V0IHdoYXQgY29uZmlndXJhdGlvbnMgdG8gYXBwbHkgdG8gdGhlIGVsZW1lbnQgdG8gZW5zdXJlIHRoZSBhbmltYXRpb25cbiAqIHdvcmtzIHdpdGggdGhlIG9wdGlvbnMgcHJvdmlkZWQuIFNheSBmb3IgZXhhbXBsZSB3ZSB3ZXJlIGFkZGluZyBhIGNsYXNzIHRoYXQgY29udGFpbmVkIGEga2V5ZnJhbWUgdmFsdWUgYW5kIHdlIHdhbnRlZCB0byBhbHNvIGFuaW1hdGUgc29tZSBpbmxpbmVcbiAqIHN0eWxlcyB1c2luZyB0aGUgYGZyb21gIGFuZCBgdG9gIHByb3BlcnRpZXMuXG4gKlxuICogYGBganNcbiAqIHZhciBhbmltYXRvciA9ICRhbmltYXRlQ3NzKGVsZW1lbnQsIHtcbiAqICAgZnJvbTogeyBiYWNrZ3JvdW5kOidyZWQnIH0sXG4gKiAgIHRvOiB7IGJhY2tncm91bmQ6J2JsdWUnIH1cbiAqIH0pO1xuICogYW5pbWF0b3Iuc3RhcnQoKTtcbiAqIGBgYFxuICpcbiAqIGBgYGNzc1xuICogLnJvdGF0aW5nLWFuaW1hdGlvbiB7XG4gKiAgIGFuaW1hdGlvbjowLjVzIHJvdGF0ZSBsaW5lYXI7XG4gKiAgIC13ZWJraXQtYW5pbWF0aW9uOjAuNXMgcm90YXRlIGxpbmVhcjtcbiAqIH1cbiAqXG4gKiBAa2V5ZnJhbWVzIHJvdGF0ZSB7XG4gKiAgIGZyb20geyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICogICB0byB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAqIH1cbiAqXG4gKiBALXdlYmtpdC1rZXlmcmFtZXMgcm90YXRlIHtcbiAqICAgZnJvbSB7IC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAqICAgdG8geyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIFRoZSBtaXNzaW5nIHBpZWNlcyBoZXJlIGFyZSB0aGF0IHdlIGRvIG5vdCBoYXZlIGEgdHJhbnNpdGlvbiBzZXQgKHdpdGhpbiB0aGUgQ1NTIGNvZGUgbm9yIHdpdGhpbiB0aGUgYCRhbmltYXRlQ3NzYCBvcHRpb25zKSBhbmQgdGhlIGR1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gaXNcbiAqIGdvaW5nIHRvIGJlIGRldGVjdGVkIGZyb20gd2hhdCB0aGUga2V5ZnJhbWUgc3R5bGVzIG9uIHRoZSBDU1MgY2xhc3MgYXJlLiBJbiB0aGlzIGV2ZW50LCBgJGFuaW1hdGVDc3NgIHdpbGwgYXV0b21hdGljYWxseSBjcmVhdGUgYW4gaW5saW5lIHRyYW5zaXRpb25cbiAqIHN0eWxlIG1hdGNoaW5nIHRoZSBkdXJhdGlvbiBkZXRlY3RlZCBmcm9tIHRoZSBrZXlmcmFtZSBzdHlsZSAod2hpY2ggaXMgcHJlc2VudCBpbiB0aGUgQ1NTIGNsYXNzIHRoYXQgaXMgYmVpbmcgYWRkZWQpIGFuZCB0aGVuIHByZXBhcmUgYm90aCB0aGUgdHJhbnNpdGlvblxuICogYW5kIGtleWZyYW1lIGFuaW1hdGlvbnMgdG8gcnVuIGluIHBhcmFsbGVsIG9uIHRoZSBlbGVtZW50LiBUaGVuIHdoZW4gdGhlIGFuaW1hdGlvbiBpcyB1bmRlcndheSB0aGUgcHJvdmlkZWQgYGZyb21gIGFuZCBgdG9gIENTUyBzdHlsZXMgd2lsbCBiZSBhcHBsaWVkXG4gKiBhbmQgc3ByZWFkIGFjcm9zcyB0aGUgdHJhbnNpdGlvbiBhbmQga2V5ZnJhbWUgYW5pbWF0aW9uLlxuICpcbiAqICMjIFdoYXQgaXMgcmV0dXJuZWRcbiAqXG4gKiBgJGFuaW1hdGVDc3NgIHdvcmtzIGluIHR3byBzdGFnZXM6IGEgcHJlcGFyYXRpb24gcGhhc2UgYW5kIGFuIGFuaW1hdGlvbiBwaGFzZS4gVGhlcmVmb3JlIHdoZW4gYCRhbmltYXRlQ3NzYCBpcyBmaXJzdCBjYWxsZWQgaXQgd2lsbCBOT1QgYWN0dWFsbHlcbiAqIHN0YXJ0IHRoZSBhbmltYXRpb24uIEFsbCB0aGF0IGlzIGdvaW5nIG9uIGhlcmUgaXMgdGhhdCB0aGUgZWxlbWVudCBpcyBiZWluZyBwcmVwYXJlZCBmb3IgdGhlIGFuaW1hdGlvbiAod2hpY2ggbWVhbnMgdGhhdCB0aGUgZ2VuZXJhdGVkIENTUyBjbGFzc2VzIGFyZVxuICogYWRkZWQgYW5kIHJlbW92ZWQgb24gdGhlIGVsZW1lbnQpLiBPbmNlIGAkYW5pbWF0ZUNzc2AgaXMgY2FsbGVkIGl0IHdpbGwgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiBgYGBqc1xuICogdmFyIGFuaW1hdG9yID0gJGFuaW1hdGVDc3MoZWxlbWVudCwgeyAuLi4gfSk7XG4gKiBgYGBcbiAqXG4gKiBOb3cgd2hhdCBkbyB0aGUgY29udGVudHMgb2Ygb3VyIGBhbmltYXRvcmAgdmFyaWFibGUgbG9vayBsaWtlOlxuICpcbiAqIGBgYGpzXG4gKiB7XG4gKiAgIC8vIHN0YXJ0cyB0aGUgYW5pbWF0aW9uXG4gKiAgIHN0YXJ0OiBGdW5jdGlvbixcbiAqXG4gKiAgIC8vIGVuZHMgKGFib3J0cykgdGhlIGFuaW1hdGlvblxuICogICBlbmQ6IEZ1bmN0aW9uXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBUbyBhY3R1YWxseSBzdGFydCB0aGUgYW5pbWF0aW9uIHdlIG5lZWQgdG8gcnVuIGBhbmltYXRpb24uc3RhcnQoKWAgd2hpY2ggd2lsbCB0aGVuIHJldHVybiBhIHByb21pc2UgdGhhdCB3ZSBjYW4gaG9vayBpbnRvIHRvIGRldGVjdCB3aGVuIHRoZSBhbmltYXRpb24gZW5kcy5cbiAqIElmIHdlIGNob29zZSBub3QgdG8gcnVuIHRoZSBhbmltYXRpb24gdGhlbiB3ZSBNVVNUIHJ1biBgYW5pbWF0aW9uLmVuZCgpYCB0byBwZXJmb3JtIGEgY2xlYW51cCBvbiB0aGUgZWxlbWVudCAoc2luY2Ugc29tZSBDU1MgY2xhc3NlcyBhbmQgc3RseWVzIG1heSBoYXZlIGJlZW5cbiAqIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnQgZHVyaW5nIHRoZSBwcmVwYXJhdGlvbiBwaGFzZSkuIE5vdGUgdGhhdCBhbGwgb3RoZXIgcHJvcGVydGllcyBzdWNoIGFzIGR1cmF0aW9uLCBkZWxheSwgdHJhbnNpdGlvbnMgYW5kIGtleWZyYW1lcyBhcmUganVzdCBwcm9wZXJ0aWVzXG4gKiBhbmQgdGhhdCBjaGFuZ2luZyB0aGVtIHdpbGwgbm90IHJlY29uZmlndXJlIHRoZSBwYXJhbWV0ZXJzIG9mIHRoZSBhbmltYXRpb24uXG4gKlxuICogIyMjIHJ1bm5lci5kb25lKCkgdnMgcnVubmVyLnRoZW4oKVxuICogSXQgaXMgZG9jdW1lbnRlZCB0aGF0IGBhbmltYXRpb24uc3RhcnQoKWAgd2lsbCByZXR1cm4gYSBwcm9taXNlIG9iamVjdCBhbmQgdGhpcyBpcyB0cnVlLCBob3dldmVyLCB0aGVyZSBpcyBhbHNvIGFuIGFkZGl0aW9uYWwgbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGVcbiAqIHJ1bm5lciBjYWxsZWQgYC5kb25lKGNhbGxiYWNrRm4pYC4gVGhlIGRvbmUgbWV0aG9kIHdvcmtzIHRoZSBzYW1lIGFzIGAuZmluYWxseShjYWxsYmFja0ZuKWAsIGhvd2V2ZXIsIGl0IGRvZXMgKipub3QgdHJpZ2dlciBhIGRpZ2VzdCB0byBvY2N1cioqLlxuICogVGhlcmVmb3JlLCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucywgaXQncyBhbHdheXMgYmVzdCB0byB1c2UgYHJ1bm5lci5kb25lKGNhbGxiYWNrKWAgaW5zdGVhZCBvZiBgcnVubmVyLnRoZW4oKWAsIGBydW5uZXIuY2F0Y2goKWAgb3IgYHJ1bm5lci5maW5hbGx5KClgXG4gKiB1bmxlc3MgeW91IHJlYWxseSBuZWVkIGEgZGlnZXN0IHRvIGtpY2sgb2ZmIGFmdGVyd2FyZHMuXG4gKlxuICogS2VlcCBpbiBtaW5kIHRoYXQsIHRvIG1ha2UgdGhpcyBlYXNpZXIsIG5nQW5pbWF0ZSBoYXMgdHdlYWtlZCB0aGUgSlMgYW5pbWF0aW9ucyBBUEkgdG8gcmVjb2duaXplIHdoZW4gYSBydW5uZXIgaW5zdGFuY2UgaXMgcmV0dXJuZWQgZnJvbSAkYW5pbWF0ZUNzc1xuICogKHNvIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBgcnVubmVyLmRvbmUoZG9uZUZuKWAgaW5zaWRlIG9mIHlvdXIgSmF2YVNjcmlwdCBhbmltYXRpb24gY29kZSkuXG4gKiBDaGVjayB0aGUge0BsaW5rIG5nQW5pbWF0ZS4kYW5pbWF0ZUNzcyN1c2FnZSBhbmltYXRpb24gY29kZSBhYm92ZX0gdG8gc2VlIGhvdyB0aGlzIHdvcmtzLlxuICpcbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCB0aGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgYW5pbWF0ZWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIHRoZSBhbmltYXRpb24tcmVsYXRlZCBvcHRpb25zIHRoYXQgd2lsbCBiZSBhcHBsaWVkIGR1cmluZyB0aGUgYW5pbWF0aW9uXG4gKlxuICogKiBgZXZlbnRgIC0gVGhlIERPTSBldmVudCAoZS5nLiBlbnRlciwgbGVhdmUsIG1vdmUpLiBXaGVuIHVzZWQsIGEgZ2VuZXJhdGVkIENTUyBjbGFzcyBvZiBgbmctRVZFTlRgIGFuZCBgbmctRVZFTlQtYWN0aXZlYCB3aWxsIGJlIGFwcGxpZWRcbiAqIHRvIHRoZSBlbGVtZW50IGR1cmluZyB0aGUgYW5pbWF0aW9uLiBNdWx0aXBsZSBldmVudHMgY2FuIGJlIHByb3ZpZGVkIHdoZW4gc3BhY2VzIGFyZSB1c2VkIGFzIGEgc2VwYXJhdG9yLiAoTm90ZSB0aGF0IHRoaXMgd2lsbCBub3QgcGVyZm9ybSBhbnkgRE9NIG9wZXJhdGlvbi4pXG4gKiAqIGBzdHJ1Y3R1cmFsYCAtIEluZGljYXRlcyB0aGF0IHRoZSBgbmctYCBwcmVmaXggd2lsbCBiZSBhZGRlZCB0byB0aGUgZXZlbnQgY2xhc3MuIFNldHRpbmcgdG8gYGZhbHNlYCBvciBvbWl0dGluZyB3aWxsIHR1cm4gYG5nLUVWRU5UYCBhbmRcbiAqIGBuZy1FVkVOVC1hY3RpdmVgIGluIGBFVkVOVGAgYW5kIGBFVkVOVC1hY3RpdmVgLiBVbnVzZWQgaWYgYGV2ZW50YCBpcyBvbWl0dGVkLlxuICogKiBgZWFzaW5nYCAtIFRoZSBDU1MgZWFzaW5nIHZhbHVlIHRoYXQgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSB0cmFuc2l0aW9uIG9yIGtleWZyYW1lIGFuaW1hdGlvbiAob3IgYm90aCkuXG4gKiAqIGB0cmFuc2l0aW9uU3R5bGVgIC0gVGhlIHJhdyBDU1MgdHJhbnNpdGlvbiBzdHlsZSB0aGF0IHdpbGwgYmUgdXNlZCAoZS5nLiBgMXMgbGluZWFyIGFsbGApLlxuICogKiBga2V5ZnJhbWVTdHlsZWAgLSBUaGUgcmF3IENTUyBrZXlmcmFtZSBhbmltYXRpb24gc3R5bGUgdGhhdCB3aWxsIGJlIHVzZWQgKGUuZy4gYDFzIG15X2FuaW1hdGlvbiBsaW5lYXJgKS5cbiAqICogYGZyb21gIC0gVGhlIHN0YXJ0aW5nIENTUyBzdHlsZXMgKGEga2V5L3ZhbHVlIG9iamVjdCkgdGhhdCB3aWxsIGJlIGFwcGxpZWQgYXQgdGhlIHN0YXJ0IG9mIHRoZSBhbmltYXRpb24uXG4gKiAqIGB0b2AgLSBUaGUgZW5kaW5nIENTUyBzdHlsZXMgKGEga2V5L3ZhbHVlIG9iamVjdCkgdGhhdCB3aWxsIGJlIGFwcGxpZWQgYWNyb3NzIHRoZSBhbmltYXRpb24gdmlhIGEgQ1NTIHRyYW5zaXRpb24uXG4gKiAqIGBhZGRDbGFzc2AgLSBBIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIENTUyBjbGFzc2VzIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgZWxlbWVudCBhbmQgc3ByZWFkIGFjcm9zcyB0aGUgYW5pbWF0aW9uLlxuICogKiBgcmVtb3ZlQ2xhc3NgIC0gQSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBDU1MgY2xhc3NlcyB0aGF0IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBlbGVtZW50IGFuZCBzcHJlYWQgYWNyb3NzIHRoZSBhbmltYXRpb24uXG4gKiAqIGBkdXJhdGlvbmAgLSBBIG51bWJlciB2YWx1ZSByZXByZXNlbnRpbmcgdGhlIHRvdGFsIGR1cmF0aW9uIG9mIHRoZSB0cmFuc2l0aW9uIGFuZC9vciBrZXlmcmFtZSAobm90ZSB0aGF0IGEgdmFsdWUgb2YgMSBpcyAxMDAwbXMpLiBJZiBhIHZhbHVlIG9mIGAwYFxuICogaXMgcHJvdmlkZWQgdGhlbiB0aGUgYW5pbWF0aW9uIHdpbGwgYmUgc2tpcHBlZCBlbnRpcmVseS5cbiAqICogYGRlbGF5YCAtIEEgbnVtYmVyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgdG90YWwgZGVsYXkgb2YgdGhlIHRyYW5zaXRpb24gYW5kL29yIGtleWZyYW1lIChub3RlIHRoYXQgYSB2YWx1ZSBvZiAxIGlzIDEwMDBtcykuIElmIGEgdmFsdWUgb2YgYHRydWVgIGlzXG4gKiB1c2VkIHRoZW4gd2hhdGV2ZXIgZGVsYXkgdmFsdWUgaXMgZGV0ZWN0ZWQgZnJvbSB0aGUgQ1NTIGNsYXNzZXMgd2lsbCBiZSBtaXJyb3JlZCBvbiB0aGUgZWxlbWVudHMgc3R5bGVzIChlLmcuIGJ5IHNldHRpbmcgZGVsYXkgdHJ1ZSB0aGVuIHRoZSBzdHlsZSB2YWx1ZVxuICogb2YgdGhlIGVsZW1lbnQgd2lsbCBiZSBgdHJhbnNpdGlvbi1kZWxheTogREVURUNURURfVkFMVUVgKS4gVXNpbmcgYHRydWVgIGlzIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRoZSBDU1MgY2xhc3NlcyBhbmQgaW5saW5lIHN0eWxlcyB0byBhbGwgc2hhcmUgdGhlIHNhbWVcbiAqIENTUyBkZWxheSB2YWx1ZS5cbiAqICogYHN0YWdnZXJgIC0gQSBudW1lcmljIHRpbWUgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBkZWxheSBiZXR3ZWVuIHN1Y2Nlc3NpdmVseSBhbmltYXRlZCBlbGVtZW50c1xuICogKHtAbGluayBuZ0FuaW1hdGUjY3NzLXN0YWdnZXJpbmctYW5pbWF0aW9ucyBDbGljayBoZXJlIHRvIGxlYXJuIGhvdyBDU1MtYmFzZWQgc3RhZ2dlcmluZyB3b3JrcyBpbiBuZ0FuaW1hdGUufSlcbiAqICogYHN0YWdnZXJJbmRleGAgLSBUaGUgbnVtZXJpYyBpbmRleCByZXByZXNlbnRpbmcgdGhlIHN0YWdnZXIgaXRlbSAoZS5nLiBhIHZhbHVlIG9mIDUgaXMgZXF1YWwgdG8gdGhlIHNpeHRoIGl0ZW0gaW4gdGhlIHN0YWdnZXI7IHRoZXJlZm9yZSB3aGVuIGFcbiAqICogYHN0YWdnZXJgIG9wdGlvbiB2YWx1ZSBvZiBgMC4xYCBpcyB1c2VkIHRoZW4gdGhlcmUgd2lsbCBiZSBhIHN0YWdnZXIgZGVsYXkgb2YgYDYwMG1zYClcbiAqICogYGFwcGx5Q2xhc3Nlc0Vhcmx5YCAtIFdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc2VzIGJlaW5nIGFkZGVkIG9yIHJlbW92ZWQgd2lsbCBiZSB1c2VkIHdoZW4gZGV0ZWN0aW5nIHRoZSBhbmltYXRpb24uIFRoaXMgaXMgc2V0IGJ5IGAkYW5pbWF0ZWAgd2hlbiBlbnRlci9sZWF2ZS9tb3ZlIGFuaW1hdGlvbnMgYXJlIGZpcmVkIHRvIGVuc3VyZSB0aGF0IHRoZSBDU1MgY2xhc3NlcyBhcmUgcmVzb2x2ZWQgaW4gdGltZS4gKE5vdGUgdGhhdCB0aGlzIHdpbGwgcHJldmVudCBhbnkgdHJhbnNpdGlvbnMgZnJvbSBvY2N1cmluZyBvbiB0aGUgY2xhc3NlcyBiZWluZyBhZGRlZCBhbmQgcmVtb3ZlZC4pXG4gKiAqIGBjbGVhbnVwU3R5bGVzYCAtIFdoZXRoZXIgb3Igbm90IHRoZSBwcm92aWRlZCBgZnJvbWAgYW5kIGB0b2Agc3R5bGVzIHdpbGwgYmUgcmVtb3ZlZCBvbmNlXG4gKiAgICB0aGUgYW5pbWF0aW9uIGlzIGNsb3NlZC4gVGhpcyBpcyB1c2VmdWwgZm9yIHdoZW4gdGhlIHN0eWxlcyBhcmUgdXNlZCBwdXJlbHkgZm9yIHRoZSBzYWtlIG9mXG4gKiAgICB0aGUgYW5pbWF0aW9uIGFuZCBkbyBub3QgaGF2ZSBhIGxhc3RpbmcgdmlzdWFsIGVmZmVjdCBvbiB0aGUgZWxlbWVudCAoZS5nLiBhIGNvbGFwc2UgYW5kIG9wZW4gYW5pbWF0aW9uKS5cbiAqICAgIEJ5IGRlZmF1bHQgdGhpcyB2YWx1ZSBpcyBzZXQgdG8gYGZhbHNlYC5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IGFuIG9iamVjdCB3aXRoIHN0YXJ0IGFuZCBlbmQgbWV0aG9kcyBhbmQgZGV0YWlscyBhYm91dCB0aGUgYW5pbWF0aW9uLlxuICpcbiAqICogYHN0YXJ0YCAtIFRoZSBtZXRob2QgdG8gc3RhcnQgdGhlIGFuaW1hdGlvbi4gVGhpcyB3aWxsIHJldHVybiBhIGBQcm9taXNlYCB3aGVuIGNhbGxlZC5cbiAqICogYGVuZGAgLSBUaGlzIG1ldGhvZCB3aWxsIGNhbmNlbCB0aGUgYW5pbWF0aW9uIGFuZCByZW1vdmUgYWxsIGFwcGxpZWQgQ1NTIGNsYXNzZXMgYW5kIHN0eWxlcy5cbiAqL1xudmFyIE9ORV9TRUNPTkQgPSAxMDAwO1xudmFyIEJBU0VfVEVOID0gMTA7XG5cbnZhciBFTEFQU0VEX1RJTUVfTUFYX0RFQ0lNQUxfUExBQ0VTID0gMztcbnZhciBDTE9TSU5HX1RJTUVfQlVGRkVSID0gMS41O1xuXG52YXIgREVURUNUX0NTU19QUk9QRVJUSUVTID0ge1xuICB0cmFuc2l0aW9uRHVyYXRpb246ICAgICAgVFJBTlNJVElPTl9EVVJBVElPTl9QUk9QLFxuICB0cmFuc2l0aW9uRGVsYXk6ICAgICAgICAgVFJBTlNJVElPTl9ERUxBWV9QUk9QLFxuICB0cmFuc2l0aW9uUHJvcGVydHk6ICAgICAgVFJBTlNJVElPTl9QUk9QICsgUFJPUEVSVFlfS0VZLFxuICBhbmltYXRpb25EdXJhdGlvbjogICAgICAgQU5JTUFUSU9OX0RVUkFUSU9OX1BST1AsXG4gIGFuaW1hdGlvbkRlbGF5OiAgICAgICAgICBBTklNQVRJT05fREVMQVlfUFJPUCxcbiAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IEFOSU1BVElPTl9QUk9QICsgQU5JTUFUSU9OX0lURVJBVElPTl9DT1VOVF9LRVlcbn07XG5cbnZhciBERVRFQ1RfU1RBR0dFUl9DU1NfUFJPUEVSVElFUyA9IHtcbiAgdHJhbnNpdGlvbkR1cmF0aW9uOiAgICAgIFRSQU5TSVRJT05fRFVSQVRJT05fUFJPUCxcbiAgdHJhbnNpdGlvbkRlbGF5OiAgICAgICAgIFRSQU5TSVRJT05fREVMQVlfUFJPUCxcbiAgYW5pbWF0aW9uRHVyYXRpb246ICAgICAgIEFOSU1BVElPTl9EVVJBVElPTl9QUk9QLFxuICBhbmltYXRpb25EZWxheTogICAgICAgICAgQU5JTUFUSU9OX0RFTEFZX1BST1Bcbn07XG5cbmZ1bmN0aW9uIGdldENzc0tleWZyYW1lRHVyYXRpb25TdHlsZShkdXJhdGlvbikge1xuICByZXR1cm4gW0FOSU1BVElPTl9EVVJBVElPTl9QUk9QLCBkdXJhdGlvbiArICdzJ107XG59XG5cbmZ1bmN0aW9uIGdldENzc0RlbGF5U3R5bGUoZGVsYXksIGlzS2V5ZnJhbWVBbmltYXRpb24pIHtcbiAgdmFyIHByb3AgPSBpc0tleWZyYW1lQW5pbWF0aW9uID8gQU5JTUFUSU9OX0RFTEFZX1BST1AgOiBUUkFOU0lUSU9OX0RFTEFZX1BST1A7XG4gIHJldHVybiBbcHJvcCwgZGVsYXkgKyAncyddO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlQ3NzU3R5bGVzKCR3aW5kb3csIGVsZW1lbnQsIHByb3BlcnRpZXMpIHtcbiAgdmFyIHN0eWxlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZhciBkZXRlY3RlZFN0eWxlcyA9ICR3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSB8fCB7fTtcbiAgZm9yRWFjaChwcm9wZXJ0aWVzLCBmdW5jdGlvbihmb3JtYWxTdHlsZU5hbWUsIGFjdHVhbFN0eWxlTmFtZSkge1xuICAgIHZhciB2YWwgPSBkZXRlY3RlZFN0eWxlc1tmb3JtYWxTdHlsZU5hbWVdO1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHZhciBjID0gdmFsLmNoYXJBdCgwKTtcblxuICAgICAgLy8gb25seSBudW1lcmljYWwtYmFzZWQgdmFsdWVzIGhhdmUgYSBuZWdhdGl2ZSBzaWduIG9yIGRpZ2l0IGFzIHRoZSBmaXJzdCB2YWx1ZVxuICAgICAgaWYgKGMgPT09ICctJyB8fCBjID09PSAnKycgfHwgYyA+PSAwKSB7XG4gICAgICAgIHZhbCA9IHBhcnNlTWF4VGltZSh2YWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBieSBzZXR0aW5nIHRoaXMgdG8gbnVsbCBpbiB0aGUgZXZlbnQgdGhhdCB0aGUgZGVsYXkgaXMgbm90IHNldCBvciBpcyBzZXQgZGlyZWN0bHkgYXMgMFxuICAgICAgLy8gdGhlbiB3ZSBjYW4gc3RpbGwgYWxsb3cgZm9yIHplZ2F0aXZlIHZhbHVlcyB0byBiZSB1c2VkIGxhdGVyIG9uIGFuZCBub3QgbWlzdGFrZSB0aGlzXG4gICAgICAvLyB2YWx1ZSBmb3IgYmVpbmcgZ3JlYXRlciB0aGFuIGFueSBvdGhlciBuZWdhdGl2ZSB2YWx1ZS5cbiAgICAgIGlmICh2YWwgPT09IDApIHtcbiAgICAgICAgdmFsID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHN0eWxlc1thY3R1YWxTdHlsZU5hbWVdID0gdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gcGFyc2VNYXhUaW1lKHN0cikge1xuICB2YXIgbWF4VmFsdWUgPSAwO1xuICB2YXIgdmFsdWVzID0gc3RyLnNwbGl0KC9cXHMqLFxccyovKTtcbiAgZm9yRWFjaCh2YWx1ZXMsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgLy8gaXQncyBhbHdheXMgc2FmZSB0byBjb25zaWRlciBvbmx5IHNlY29uZCB2YWx1ZXMgYW5kIG9taXQgYG1zYCB2YWx1ZXMgc2luY2VcbiAgICAvLyBnZXRDb21wdXRlZFN0eWxlIHdpbGwgYWx3YXlzIGhhbmRsZSB0aGUgY29udmVyc2lvbiBmb3IgdXNcbiAgICBpZiAodmFsdWUuY2hhckF0KHZhbHVlLmxlbmd0aCAtIDEpID09ICdzJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgdmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMDtcbiAgICBtYXhWYWx1ZSA9IG1heFZhbHVlID8gTWF0aC5tYXgodmFsdWUsIG1heFZhbHVlKSA6IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIG1heFZhbHVlO1xufVxuXG5mdW5jdGlvbiB0cnV0aHlUaW1pbmdWYWx1ZSh2YWwpIHtcbiAgcmV0dXJuIHZhbCA9PT0gMCB8fCB2YWwgIT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0Q3NzVHJhbnNpdGlvbkR1cmF0aW9uU3R5bGUoZHVyYXRpb24sIGFwcGx5T25seUR1cmF0aW9uKSB7XG4gIHZhciBzdHlsZSA9IFRSQU5TSVRJT05fUFJPUDtcbiAgdmFyIHZhbHVlID0gZHVyYXRpb24gKyAncyc7XG4gIGlmIChhcHBseU9ubHlEdXJhdGlvbikge1xuICAgIHN0eWxlICs9IERVUkFUSU9OX0tFWTtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSArPSAnIGxpbmVhciBhbGwnO1xuICB9XG4gIHJldHVybiBbc3R5bGUsIHZhbHVlXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTG9jYWxDYWNoZUxvb2t1cCgpIHtcbiAgdmFyIGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgcmV0dXJuIHtcbiAgICBmbHVzaDogZnVuY3Rpb24oKSB7XG4gICAgICBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfSxcblxuICAgIGNvdW50OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBlbnRyeSA9IGNhY2hlW2tleV07XG4gICAgICByZXR1cm4gZW50cnkgPyBlbnRyeS50b3RhbCA6IDA7XG4gICAgfSxcblxuICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgZW50cnkgPSBjYWNoZVtrZXldO1xuICAgICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LnZhbHVlO1xuICAgIH0sXG5cbiAgICBwdXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICghY2FjaGVba2V5XSkge1xuICAgICAgICBjYWNoZVtrZXldID0geyB0b3RhbDogMSwgdmFsdWU6IHZhbHVlIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWNoZVtrZXldLnRvdGFsKys7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG4vLyB3ZSBkbyBub3QgcmVhc3NpZ24gYW4gYWxyZWFkeSBwcmVzZW50IHN0eWxlIHZhbHVlIHNpbmNlXG4vLyBpZiB3ZSBkZXRlY3QgdGhlIHN0eWxlIHByb3BlcnR5IHZhbHVlIGFnYWluIHdlIG1heSBiZVxuLy8gZGV0ZWN0aW5nIHN0eWxlcyB0aGF0IHdlcmUgYWRkZWQgdmlhIHRoZSBgZnJvbWAgc3R5bGVzLlxuLy8gV2UgbWFrZSB1c2Ugb2YgYGlzRGVmaW5lZGAgaGVyZSBzaW5jZSBhbiBlbXB0eSBzdHJpbmdcbi8vIG9yIG51bGwgdmFsdWUgKHdoaWNoIGlzIHdoYXQgZ2V0UHJvcGVydHlWYWx1ZSB3aWxsIHJldHVyblxuLy8gZm9yIGEgbm9uLWV4aXN0aW5nIHN0eWxlKSB3aWxsIHN0aWxsIGJlIG1hcmtlZCBhcyBhIHZhbGlkXG4vLyB2YWx1ZSBmb3IgdGhlIHN0eWxlIChhIGZhbHN5IHZhbHVlIGltcGxpZXMgdGhhdCB0aGUgc3R5bGVcbi8vIGlzIHRvIGJlIHJlbW92ZWQgYXQgdGhlIGVuZCBvZiB0aGUgYW5pbWF0aW9uKS4gSWYgd2UgaGFkIGEgc2ltcGxlXG4vLyBcIk9SXCIgc3RhdGVtZW50IHRoZW4gaXQgd291bGQgbm90IGJlIGVub3VnaCB0byBjYXRjaCB0aGF0LlxuZnVuY3Rpb24gcmVnaXN0ZXJSZXN0b3JhYmxlU3R5bGVzKGJhY2t1cCwgbm9kZSwgcHJvcGVydGllcykge1xuICBmb3JFYWNoKHByb3BlcnRpZXMsIGZ1bmN0aW9uKHByb3ApIHtcbiAgICBiYWNrdXBbcHJvcF0gPSBpc0RlZmluZWQoYmFja3VwW3Byb3BdKVxuICAgICAgICA/IGJhY2t1cFtwcm9wXVxuICAgICAgICA6IG5vZGUuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKTtcbiAgfSk7XG59XG5cbnZhciAkQW5pbWF0ZUNzc1Byb3ZpZGVyID0gWyckYW5pbWF0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJGFuaW1hdGVQcm92aWRlcikge1xuICB2YXIgZ2NzTG9va3VwID0gY3JlYXRlTG9jYWxDYWNoZUxvb2t1cCgpO1xuICB2YXIgZ2NzU3RhZ2dlckxvb2t1cCA9IGNyZWF0ZUxvY2FsQ2FjaGVMb29rdXAoKTtcblxuICB0aGlzLiRnZXQgPSBbJyR3aW5kb3cnLCAnJCRqcUxpdGUnLCAnJCRBbmltYXRlUnVubmVyJywgJyR0aW1lb3V0JyxcbiAgICAgICAgICAgICAgICckJGZvcmNlUmVmbG93JywgJyRzbmlmZmVyJywgJyQkckFGU2NoZWR1bGVyJywgJyRhbmltYXRlJyxcbiAgICAgICBmdW5jdGlvbigkd2luZG93LCAgICQkanFMaXRlLCAgICQkQW5pbWF0ZVJ1bm5lciwgICAkdGltZW91dCxcbiAgICAgICAgICAgICAgICAkJGZvcmNlUmVmbG93LCAgICRzbmlmZmVyLCAgICQkckFGU2NoZWR1bGVyLCAkYW5pbWF0ZSkge1xuXG4gICAgdmFyIGFwcGx5QW5pbWF0aW9uQ2xhc3NlcyA9IGFwcGx5QW5pbWF0aW9uQ2xhc3Nlc0ZhY3RvcnkoJCRqcUxpdGUpO1xuXG4gICAgdmFyIHBhcmVudENvdW50ZXIgPSAwO1xuICAgIGZ1bmN0aW9uIGdjc0hhc2hGbihub2RlLCBleHRyYUNsYXNzZXMpIHtcbiAgICAgIHZhciBLRVkgPSBcIiQkbmdBbmltYXRlUGFyZW50S2V5XCI7XG4gICAgICB2YXIgcGFyZW50Tm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgIHZhciBwYXJlbnRJRCA9IHBhcmVudE5vZGVbS0VZXSB8fCAocGFyZW50Tm9kZVtLRVldID0gKytwYXJlbnRDb3VudGVyKTtcbiAgICAgIHJldHVybiBwYXJlbnRJRCArICctJyArIG5vZGUuZ2V0QXR0cmlidXRlKCdjbGFzcycpICsgJy0nICsgZXh0cmFDbGFzc2VzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVDYWNoZWRDc3NTdHlsZXMobm9kZSwgY2xhc3NOYW1lLCBjYWNoZUtleSwgcHJvcGVydGllcykge1xuICAgICAgdmFyIHRpbWluZ3MgPSBnY3NMb29rdXAuZ2V0KGNhY2hlS2V5KTtcblxuICAgICAgaWYgKCF0aW1pbmdzKSB7XG4gICAgICAgIHRpbWluZ3MgPSBjb21wdXRlQ3NzU3R5bGVzKCR3aW5kb3csIG5vZGUsIHByb3BlcnRpZXMpO1xuICAgICAgICBpZiAodGltaW5ncy5hbmltYXRpb25JdGVyYXRpb25Db3VudCA9PT0gJ2luZmluaXRlJykge1xuICAgICAgICAgIHRpbWluZ3MuYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQgPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHdlIGtlZXAgcHV0dGluZyB0aGlzIGluIG11bHRpcGxlIHRpbWVzIGV2ZW4gdGhvdWdoIHRoZSB2YWx1ZSBhbmQgdGhlIGNhY2hlS2V5IGFyZSB0aGUgc2FtZVxuICAgICAgLy8gYmVjYXVzZSB3ZSdyZSBrZWVwaW5nIGFuIGludGVyYWwgdGFsbHkgb2YgaG93IG1hbnkgZHVwbGljYXRlIGFuaW1hdGlvbnMgYXJlIGRldGVjdGVkLlxuICAgICAgZ2NzTG9va3VwLnB1dChjYWNoZUtleSwgdGltaW5ncyk7XG4gICAgICByZXR1cm4gdGltaW5ncztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wdXRlQ2FjaGVkQ3NzU3RhZ2dlclN0eWxlcyhub2RlLCBjbGFzc05hbWUsIGNhY2hlS2V5LCBwcm9wZXJ0aWVzKSB7XG4gICAgICB2YXIgc3RhZ2dlcjtcblxuICAgICAgLy8gaWYgd2UgaGF2ZSBvbmUgb3IgbW9yZSBleGlzdGluZyBtYXRjaGVzIG9mIG1hdGNoaW5nIGVsZW1lbnRzXG4gICAgICAvLyBjb250YWluaW5nIHRoZSBzYW1lIHBhcmVudCArIENTUyBzdHlsZXMgKHdoaWNoIGlzIGhvdyBjYWNoZUtleSB3b3JrcylcbiAgICAgIC8vIHRoZW4gc3RhZ2dlcmluZyBpcyBwb3NzaWJsZVxuICAgICAgaWYgKGdjc0xvb2t1cC5jb3VudChjYWNoZUtleSkgPiAwKSB7XG4gICAgICAgIHN0YWdnZXIgPSBnY3NTdGFnZ2VyTG9va3VwLmdldChjYWNoZUtleSk7XG5cbiAgICAgICAgaWYgKCFzdGFnZ2VyKSB7XG4gICAgICAgICAgdmFyIHN0YWdnZXJDbGFzc05hbWUgPSBwZW5kQ2xhc3NlcyhjbGFzc05hbWUsICctc3RhZ2dlcicpO1xuXG4gICAgICAgICAgJCRqcUxpdGUuYWRkQ2xhc3Mobm9kZSwgc3RhZ2dlckNsYXNzTmFtZSk7XG5cbiAgICAgICAgICBzdGFnZ2VyID0gY29tcHV0ZUNzc1N0eWxlcygkd2luZG93LCBub2RlLCBwcm9wZXJ0aWVzKTtcblxuICAgICAgICAgIC8vIGZvcmNlIHRoZSBjb252ZXJzaW9uIG9mIGEgbnVsbCB2YWx1ZSB0byB6ZXJvIGluY2FzZSBub3Qgc2V0XG4gICAgICAgICAgc3RhZ2dlci5hbmltYXRpb25EdXJhdGlvbiA9IE1hdGgubWF4KHN0YWdnZXIuYW5pbWF0aW9uRHVyYXRpb24sIDApO1xuICAgICAgICAgIHN0YWdnZXIudHJhbnNpdGlvbkR1cmF0aW9uID0gTWF0aC5tYXgoc3RhZ2dlci50cmFuc2l0aW9uRHVyYXRpb24sIDApO1xuXG4gICAgICAgICAgJCRqcUxpdGUucmVtb3ZlQ2xhc3Mobm9kZSwgc3RhZ2dlckNsYXNzTmFtZSk7XG5cbiAgICAgICAgICBnY3NTdGFnZ2VyTG9va3VwLnB1dChjYWNoZUtleSwgc3RhZ2dlcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0YWdnZXIgfHwge307XG4gICAgfVxuXG4gICAgdmFyIGNhbmNlbExhc3RSQUZSZXF1ZXN0O1xuICAgIHZhciByYWZXYWl0UXVldWUgPSBbXTtcbiAgICBmdW5jdGlvbiB3YWl0VW50aWxRdWlldChjYWxsYmFjaykge1xuICAgICAgcmFmV2FpdFF1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgICAgJCRyQUZTY2hlZHVsZXIud2FpdFVudGlsUXVpZXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGdjc0xvb2t1cC5mbHVzaCgpO1xuICAgICAgICBnY3NTdGFnZ2VyTG9va3VwLmZsdXNoKCk7XG5cbiAgICAgICAgLy8gRE8gTk9UIFJFTU9WRSBUSElTIExJTkUgT1IgUkVGQUNUT1IgT1VUIFRIRSBgcGFnZVdpZHRoYCB2YXJpYWJsZS5cbiAgICAgICAgLy8gUExFQVNFIEVYQU1JTkUgVEhFIGAkJGZvcmNlUmVmbG93YCBzZXJ2aWNlIHRvIHVuZGVyc3RhbmQgd2h5LlxuICAgICAgICB2YXIgcGFnZVdpZHRoID0gJCRmb3JjZVJlZmxvdygpO1xuXG4gICAgICAgIC8vIHdlIHVzZSBhIGZvciBsb29wIHRvIGVuc3VyZSB0aGF0IGlmIHRoZSBxdWV1ZSBpcyBjaGFuZ2VkXG4gICAgICAgIC8vIGR1cmluZyB0aGlzIGxvb3BpbmcgdGhlbiBpdCB3aWxsIGNvbnNpZGVyIG5ldyByZXF1ZXN0c1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhZldhaXRRdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHJhZldhaXRRdWV1ZVtpXShwYWdlV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIHJhZldhaXRRdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZVRpbWluZ3Mobm9kZSwgY2xhc3NOYW1lLCBjYWNoZUtleSkge1xuICAgICAgdmFyIHRpbWluZ3MgPSBjb21wdXRlQ2FjaGVkQ3NzU3R5bGVzKG5vZGUsIGNsYXNzTmFtZSwgY2FjaGVLZXksIERFVEVDVF9DU1NfUFJPUEVSVElFUyk7XG4gICAgICB2YXIgYUQgPSB0aW1pbmdzLmFuaW1hdGlvbkRlbGF5O1xuICAgICAgdmFyIHREID0gdGltaW5ncy50cmFuc2l0aW9uRGVsYXk7XG4gICAgICB0aW1pbmdzLm1heERlbGF5ID0gYUQgJiYgdERcbiAgICAgICAgICA/IE1hdGgubWF4KGFELCB0RClcbiAgICAgICAgICA6IChhRCB8fCB0RCk7XG4gICAgICB0aW1pbmdzLm1heER1cmF0aW9uID0gTWF0aC5tYXgoXG4gICAgICAgICAgdGltaW5ncy5hbmltYXRpb25EdXJhdGlvbiAqIHRpbWluZ3MuYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQsXG4gICAgICAgICAgdGltaW5ncy50cmFuc2l0aW9uRHVyYXRpb24pO1xuXG4gICAgICByZXR1cm4gdGltaW5ncztcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW5pdChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgcmVzdG9yZVN0eWxlcyA9IHt9O1xuICAgICAgdmFyIG5vZGUgPSBnZXREb21Ob2RlKGVsZW1lbnQpO1xuICAgICAgaWYgKCFub2RlXG4gICAgICAgICAgfHwgIW5vZGUucGFyZW50Tm9kZVxuICAgICAgICAgIHx8ICEkYW5pbWF0ZS5lbmFibGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIGNsb3NlQW5kUmV0dXJuTm9vcEFuaW1hdG9yKCk7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSBwcmVwYXJlQW5pbWF0aW9uT3B0aW9ucyhvcHRpb25zKTtcblxuICAgICAgdmFyIHRlbXBvcmFyeVN0eWxlcyA9IFtdO1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmF0dHIoJ2NsYXNzJyk7XG4gICAgICB2YXIgc3R5bGVzID0gcGFja2FnZVN0eWxlcyhvcHRpb25zKTtcbiAgICAgIHZhciBhbmltYXRpb25DbG9zZWQ7XG4gICAgICB2YXIgYW5pbWF0aW9uUGF1c2VkO1xuICAgICAgdmFyIGFuaW1hdGlvbkNvbXBsZXRlZDtcbiAgICAgIHZhciBydW5uZXI7XG4gICAgICB2YXIgcnVubmVySG9zdDtcbiAgICAgIHZhciBtYXhEZWxheTtcbiAgICAgIHZhciBtYXhEZWxheVRpbWU7XG4gICAgICB2YXIgbWF4RHVyYXRpb247XG4gICAgICB2YXIgbWF4RHVyYXRpb25UaW1lO1xuXG4gICAgICBpZiAob3B0aW9ucy5kdXJhdGlvbiA9PT0gMCB8fCAoISRzbmlmZmVyLmFuaW1hdGlvbnMgJiYgISRzbmlmZmVyLnRyYW5zaXRpb25zKSkge1xuICAgICAgICByZXR1cm4gY2xvc2VBbmRSZXR1cm5Ob29wQW5pbWF0b3IoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1ldGhvZCA9IG9wdGlvbnMuZXZlbnQgJiYgaXNBcnJheShvcHRpb25zLmV2ZW50KVxuICAgICAgICAgICAgPyBvcHRpb25zLmV2ZW50LmpvaW4oJyAnKVxuICAgICAgICAgICAgOiBvcHRpb25zLmV2ZW50O1xuXG4gICAgICB2YXIgaXNTdHJ1Y3R1cmFsID0gbWV0aG9kICYmIG9wdGlvbnMuc3RydWN0dXJhbDtcbiAgICAgIHZhciBzdHJ1Y3R1cmFsQ2xhc3NOYW1lID0gJyc7XG4gICAgICB2YXIgYWRkUmVtb3ZlQ2xhc3NOYW1lID0gJyc7XG5cbiAgICAgIGlmIChpc1N0cnVjdHVyYWwpIHtcbiAgICAgICAgc3RydWN0dXJhbENsYXNzTmFtZSA9IHBlbmRDbGFzc2VzKG1ldGhvZCwgRVZFTlRfQ0xBU1NfUFJFRklYLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAobWV0aG9kKSB7XG4gICAgICAgIHN0cnVjdHVyYWxDbGFzc05hbWUgPSBtZXRob2Q7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmFkZENsYXNzKSB7XG4gICAgICAgIGFkZFJlbW92ZUNsYXNzTmFtZSArPSBwZW5kQ2xhc3NlcyhvcHRpb25zLmFkZENsYXNzLCBBRERfQ0xBU1NfU1VGRklYKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMucmVtb3ZlQ2xhc3MpIHtcbiAgICAgICAgaWYgKGFkZFJlbW92ZUNsYXNzTmFtZS5sZW5ndGgpIHtcbiAgICAgICAgICBhZGRSZW1vdmVDbGFzc05hbWUgKz0gJyAnO1xuICAgICAgICB9XG4gICAgICAgIGFkZFJlbW92ZUNsYXNzTmFtZSArPSBwZW5kQ2xhc3NlcyhvcHRpb25zLnJlbW92ZUNsYXNzLCBSRU1PVkVfQ0xBU1NfU1VGRklYKTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhlcmUgbWF5IGJlIGEgc2l0dWF0aW9uIHdoZXJlIGEgc3RydWN0dXJhbCBhbmltYXRpb24gaXMgY29tYmluZWQgdG9nZXRoZXJcbiAgICAgIC8vIHdpdGggQ1NTIGNsYXNzZXMgdGhhdCBuZWVkIHRvIHJlc29sdmUgYmVmb3JlIHRoZSBhbmltYXRpb24gaXMgY29tcHV0ZWQuXG4gICAgICAvLyBIb3dldmVyIHRoaXMgbWVhbnMgdGhhdCB0aGVyZSBpcyBubyBleHBsaWNpdCBDU1MgY29kZSB0byBibG9jayB0aGUgYW5pbWF0aW9uXG4gICAgICAvLyBmcm9tIGhhcHBlbmluZyAoYnkgc2V0dGluZyAwcyBub25lIGluIHRoZSBjbGFzcyBuYW1lKS4gSWYgdGhpcyBpcyB0aGUgY2FzZVxuICAgICAgLy8gd2UgbmVlZCB0byBhcHBseSB0aGUgY2xhc3NlcyBiZWZvcmUgdGhlIGZpcnN0IHJBRiBzbyB3ZSBrbm93IHRvIGNvbnRpbnVlIGlmXG4gICAgICAvLyB0aGVyZSBhY3R1YWxseSBpcyBhIGRldGVjdGVkIHRyYW5zaXRpb24gb3Iga2V5ZnJhbWUgYW5pbWF0aW9uXG4gICAgICBpZiAob3B0aW9ucy5hcHBseUNsYXNzZXNFYXJseSAmJiBhZGRSZW1vdmVDbGFzc05hbWUubGVuZ3RoKSB7XG4gICAgICAgIGFwcGx5QW5pbWF0aW9uQ2xhc3NlcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByZXBhcmF0aW9uQ2xhc3NlcyA9IFtzdHJ1Y3R1cmFsQ2xhc3NOYW1lLCBhZGRSZW1vdmVDbGFzc05hbWVdLmpvaW4oJyAnKS50cmltKCk7XG4gICAgICB2YXIgZnVsbENsYXNzTmFtZSA9IGNsYXNzZXMgKyAnICcgKyBwcmVwYXJhdGlvbkNsYXNzZXM7XG4gICAgICB2YXIgYWN0aXZlQ2xhc3NlcyA9IHBlbmRDbGFzc2VzKHByZXBhcmF0aW9uQ2xhc3NlcywgQUNUSVZFX0NMQVNTX1NVRkZJWCk7XG4gICAgICB2YXIgaGFzVG9TdHlsZXMgPSBzdHlsZXMudG8gJiYgT2JqZWN0LmtleXMoc3R5bGVzLnRvKS5sZW5ndGggPiAwO1xuICAgICAgdmFyIGNvbnRhaW5zS2V5ZnJhbWVBbmltYXRpb24gPSAob3B0aW9ucy5rZXlmcmFtZVN0eWxlIHx8ICcnKS5sZW5ndGggPiAwO1xuXG4gICAgICAvLyB0aGVyZSBpcyBubyB3YXkgd2UgY2FuIHRyaWdnZXIgYW4gYW5pbWF0aW9uIGlmIG5vIHN0eWxlcyBhbmRcbiAgICAgIC8vIG5vIGNsYXNzZXMgYXJlIGJlaW5nIGFwcGxpZWQgd2hpY2ggd291bGQgdGhlbiB0cmlnZ2VyIGEgdHJhbnNpdGlvbixcbiAgICAgIC8vIHVubGVzcyB0aGVyZSBhIGlzIHJhdyBrZXlmcmFtZSB2YWx1ZSB0aGF0IGlzIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnQuXG4gICAgICBpZiAoIWNvbnRhaW5zS2V5ZnJhbWVBbmltYXRpb25cbiAgICAgICAgICAgJiYgIWhhc1RvU3R5bGVzXG4gICAgICAgICAgICYmICFwcmVwYXJhdGlvbkNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGNsb3NlQW5kUmV0dXJuTm9vcEFuaW1hdG9yKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjYWNoZUtleSwgc3RhZ2dlcjtcbiAgICAgIGlmIChvcHRpb25zLnN0YWdnZXIgPiAwKSB7XG4gICAgICAgIHZhciBzdGFnZ2VyVmFsID0gcGFyc2VGbG9hdChvcHRpb25zLnN0YWdnZXIpO1xuICAgICAgICBzdGFnZ2VyID0ge1xuICAgICAgICAgIHRyYW5zaXRpb25EZWxheTogc3RhZ2dlclZhbCxcbiAgICAgICAgICBhbmltYXRpb25EZWxheTogc3RhZ2dlclZhbCxcbiAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IDAsXG4gICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDBcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhY2hlS2V5ID0gZ2NzSGFzaEZuKG5vZGUsIGZ1bGxDbGFzc05hbWUpO1xuICAgICAgICBzdGFnZ2VyID0gY29tcHV0ZUNhY2hlZENzc1N0YWdnZXJTdHlsZXMobm9kZSwgcHJlcGFyYXRpb25DbGFzc2VzLCBjYWNoZUtleSwgREVURUNUX1NUQUdHRVJfQ1NTX1BST1BFUlRJRVMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW9wdGlvbnMuJCRza2lwUHJlcGFyYXRpb25DbGFzc2VzKSB7XG4gICAgICAgICQkanFMaXRlLmFkZENsYXNzKGVsZW1lbnQsIHByZXBhcmF0aW9uQ2xhc3Nlcyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhcHBseU9ubHlEdXJhdGlvbjtcblxuICAgICAgaWYgKG9wdGlvbnMudHJhbnNpdGlvblN0eWxlKSB7XG4gICAgICAgIHZhciB0cmFuc2l0aW9uU3R5bGUgPSBbVFJBTlNJVElPTl9QUk9QLCBvcHRpb25zLnRyYW5zaXRpb25TdHlsZV07XG4gICAgICAgIGFwcGx5SW5saW5lU3R5bGUobm9kZSwgdHJhbnNpdGlvblN0eWxlKTtcbiAgICAgICAgdGVtcG9yYXJ5U3R5bGVzLnB1c2godHJhbnNpdGlvblN0eWxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuZHVyYXRpb24gPj0gMCkge1xuICAgICAgICBhcHBseU9ubHlEdXJhdGlvbiA9IG5vZGUuc3R5bGVbVFJBTlNJVElPTl9QUk9QXS5sZW5ndGggPiAwO1xuICAgICAgICB2YXIgZHVyYXRpb25TdHlsZSA9IGdldENzc1RyYW5zaXRpb25EdXJhdGlvblN0eWxlKG9wdGlvbnMuZHVyYXRpb24sIGFwcGx5T25seUR1cmF0aW9uKTtcblxuICAgICAgICAvLyB3ZSBzZXQgdGhlIGR1cmF0aW9uIHNvIHRoYXQgaXQgd2lsbCBiZSBwaWNrZWQgdXAgYnkgZ2V0Q29tcHV0ZWRTdHlsZSBsYXRlclxuICAgICAgICBhcHBseUlubGluZVN0eWxlKG5vZGUsIGR1cmF0aW9uU3R5bGUpO1xuICAgICAgICB0ZW1wb3JhcnlTdHlsZXMucHVzaChkdXJhdGlvblN0eWxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMua2V5ZnJhbWVTdHlsZSkge1xuICAgICAgICB2YXIga2V5ZnJhbWVTdHlsZSA9IFtBTklNQVRJT05fUFJPUCwgb3B0aW9ucy5rZXlmcmFtZVN0eWxlXTtcbiAgICAgICAgYXBwbHlJbmxpbmVTdHlsZShub2RlLCBrZXlmcmFtZVN0eWxlKTtcbiAgICAgICAgdGVtcG9yYXJ5U3R5bGVzLnB1c2goa2V5ZnJhbWVTdHlsZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVtSW5kZXggPSBzdGFnZ2VyXG4gICAgICAgICAgPyBvcHRpb25zLnN0YWdnZXJJbmRleCA+PSAwXG4gICAgICAgICAgICAgID8gb3B0aW9ucy5zdGFnZ2VySW5kZXhcbiAgICAgICAgICAgICAgOiBnY3NMb29rdXAuY291bnQoY2FjaGVLZXkpXG4gICAgICAgICAgOiAwO1xuXG4gICAgICB2YXIgaXNGaXJzdCA9IGl0ZW1JbmRleCA9PT0gMDtcblxuICAgICAgLy8gdGhpcyBpcyBhIHByZS1lbXB0aXZlIHdheSBvZiBmb3JjaW5nIHRoZSBzZXR1cCBjbGFzc2VzIHRvIGJlIGFkZGVkIGFuZCBhcHBsaWVkIElOU1RBTlRMWVxuICAgICAgLy8gd2l0aG91dCBjYXVzaW5nIGFueSBjb21iaW5hdGlvbiBvZiB0cmFuc2l0aW9ucyB0byBraWNrIGluLiBCeSBhZGRpbmcgYSBuZWdhdGl2ZSBkZWxheSB2YWx1ZVxuICAgICAgLy8gaXQgZm9yY2VzIHRoZSBzZXR1cCBjbGFzcycgdHJhbnNpdGlvbiB0byBlbmQgaW1tZWRpYXRlbHkuIFdlIGxhdGVyIHRoZW4gcmVtb3ZlIHRoZSBuZWdhdGl2ZVxuICAgICAgLy8gdHJhbnNpdGlvbiBkZWxheSB0byBhbGxvdyBmb3IgdGhlIHRyYW5zaXRpb24gdG8gbmF0dXJhbGx5IGRvIGl0J3MgdGhpbmcuIFRoZSBiZWF1dHkgaGVyZSBpc1xuICAgICAgLy8gdGhhdCBpZiB0aGVyZSBpcyBubyB0cmFuc2l0aW9uIGRlZmluZWQgdGhlbiBub3RoaW5nIHdpbGwgaGFwcGVuIGFuZCB0aGlzIHdpbGwgYWxzbyBhbGxvd1xuICAgICAgLy8gb3RoZXIgdHJhbnNpdGlvbnMgdG8gYmUgc3RhY2tlZCBvbiB0b3Agb2YgZWFjaCBvdGhlciB3aXRob3V0IGFueSBjaG9wcGluZyB0aGVtIG91dC5cbiAgICAgIGlmIChpc0ZpcnN0ICYmICFvcHRpb25zLnNraXBCbG9ja2luZykge1xuICAgICAgICBibG9ja1RyYW5zaXRpb25zKG5vZGUsIFNBRkVfRkFTVF9GT1JXQVJEX0RVUkFUSU9OX1ZBTFVFKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRpbWluZ3MgPSBjb21wdXRlVGltaW5ncyhub2RlLCBmdWxsQ2xhc3NOYW1lLCBjYWNoZUtleSk7XG4gICAgICB2YXIgcmVsYXRpdmVEZWxheSA9IHRpbWluZ3MubWF4RGVsYXk7XG4gICAgICBtYXhEZWxheSA9IE1hdGgubWF4KHJlbGF0aXZlRGVsYXksIDApO1xuICAgICAgbWF4RHVyYXRpb24gPSB0aW1pbmdzLm1heER1cmF0aW9uO1xuXG4gICAgICB2YXIgZmxhZ3MgPSB7fTtcbiAgICAgIGZsYWdzLmhhc1RyYW5zaXRpb25zICAgICAgICAgID0gdGltaW5ncy50cmFuc2l0aW9uRHVyYXRpb24gPiAwO1xuICAgICAgZmxhZ3MuaGFzQW5pbWF0aW9ucyAgICAgICAgICAgPSB0aW1pbmdzLmFuaW1hdGlvbkR1cmF0aW9uID4gMDtcbiAgICAgIGZsYWdzLmhhc1RyYW5zaXRpb25BbGwgICAgICAgID0gZmxhZ3MuaGFzVHJhbnNpdGlvbnMgJiYgdGltaW5ncy50cmFuc2l0aW9uUHJvcGVydHkgPT0gJ2FsbCc7XG4gICAgICBmbGFncy5hcHBseVRyYW5zaXRpb25EdXJhdGlvbiA9IGhhc1RvU3R5bGVzICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZmxhZ3MuaGFzVHJhbnNpdGlvbnMgJiYgIWZsYWdzLmhhc1RyYW5zaXRpb25BbGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IChmbGFncy5oYXNBbmltYXRpb25zICYmICFmbGFncy5oYXNUcmFuc2l0aW9ucykpO1xuICAgICAgZmxhZ3MuYXBwbHlBbmltYXRpb25EdXJhdGlvbiAgPSBvcHRpb25zLmR1cmF0aW9uICYmIGZsYWdzLmhhc0FuaW1hdGlvbnM7XG4gICAgICBmbGFncy5hcHBseVRyYW5zaXRpb25EZWxheSAgICA9IHRydXRoeVRpbWluZ1ZhbHVlKG9wdGlvbnMuZGVsYXkpICYmIChmbGFncy5hcHBseVRyYW5zaXRpb25EdXJhdGlvbiB8fCBmbGFncy5oYXNUcmFuc2l0aW9ucyk7XG4gICAgICBmbGFncy5hcHBseUFuaW1hdGlvbkRlbGF5ICAgICA9IHRydXRoeVRpbWluZ1ZhbHVlKG9wdGlvbnMuZGVsYXkpICYmIGZsYWdzLmhhc0FuaW1hdGlvbnM7XG4gICAgICBmbGFncy5yZWNhbGN1bGF0ZVRpbWluZ1N0eWxlcyA9IGFkZFJlbW92ZUNsYXNzTmFtZS5sZW5ndGggPiAwO1xuXG4gICAgICBpZiAoZmxhZ3MuYXBwbHlUcmFuc2l0aW9uRHVyYXRpb24gfHwgZmxhZ3MuYXBwbHlBbmltYXRpb25EdXJhdGlvbikge1xuICAgICAgICBtYXhEdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gPyBwYXJzZUZsb2F0KG9wdGlvbnMuZHVyYXRpb24pIDogbWF4RHVyYXRpb247XG5cbiAgICAgICAgaWYgKGZsYWdzLmFwcGx5VHJhbnNpdGlvbkR1cmF0aW9uKSB7XG4gICAgICAgICAgZmxhZ3MuaGFzVHJhbnNpdGlvbnMgPSB0cnVlO1xuICAgICAgICAgIHRpbWluZ3MudHJhbnNpdGlvbkR1cmF0aW9uID0gbWF4RHVyYXRpb247XG4gICAgICAgICAgYXBwbHlPbmx5RHVyYXRpb24gPSBub2RlLnN0eWxlW1RSQU5TSVRJT05fUFJPUCArIFBST1BFUlRZX0tFWV0ubGVuZ3RoID4gMDtcbiAgICAgICAgICB0ZW1wb3JhcnlTdHlsZXMucHVzaChnZXRDc3NUcmFuc2l0aW9uRHVyYXRpb25TdHlsZShtYXhEdXJhdGlvbiwgYXBwbHlPbmx5RHVyYXRpb24pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmbGFncy5hcHBseUFuaW1hdGlvbkR1cmF0aW9uKSB7XG4gICAgICAgICAgZmxhZ3MuaGFzQW5pbWF0aW9ucyA9IHRydWU7XG4gICAgICAgICAgdGltaW5ncy5hbmltYXRpb25EdXJhdGlvbiA9IG1heER1cmF0aW9uO1xuICAgICAgICAgIHRlbXBvcmFyeVN0eWxlcy5wdXNoKGdldENzc0tleWZyYW1lRHVyYXRpb25TdHlsZShtYXhEdXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXhEdXJhdGlvbiA9PT0gMCAmJiAhZmxhZ3MucmVjYWxjdWxhdGVUaW1pbmdTdHlsZXMpIHtcbiAgICAgICAgcmV0dXJuIGNsb3NlQW5kUmV0dXJuTm9vcEFuaW1hdG9yKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmRlbGF5ICE9IG51bGwpIHtcbiAgICAgICAgdmFyIGRlbGF5U3R5bGUgPSBwYXJzZUZsb2F0KG9wdGlvbnMuZGVsYXkpO1xuXG4gICAgICAgIGlmIChmbGFncy5hcHBseVRyYW5zaXRpb25EZWxheSkge1xuICAgICAgICAgIHRlbXBvcmFyeVN0eWxlcy5wdXNoKGdldENzc0RlbGF5U3R5bGUoZGVsYXlTdHlsZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZsYWdzLmFwcGx5QW5pbWF0aW9uRGVsYXkpIHtcbiAgICAgICAgICB0ZW1wb3JhcnlTdHlsZXMucHVzaChnZXRDc3NEZWxheVN0eWxlKGRlbGF5U3R5bGUsIHRydWUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHJlY2FsY3VsYXRlIHRoZSBkZWxheSB2YWx1ZSBzaW5jZSB3ZSB1c2VkIGEgcHJlLWVtcHRpdmUgbmVnYXRpdmVcbiAgICAgIC8vIGRlbGF5IHZhbHVlIGFuZCB0aGUgZGVsYXkgdmFsdWUgaXMgcmVxdWlyZWQgZm9yIHRoZSBmaW5hbCBldmVudCBjaGVja2luZy4gVGhpc1xuICAgICAgLy8gcHJvcGVydHkgd2lsbCBlbnN1cmUgdGhhdCB0aGlzIHdpbGwgaGFwcGVuIGFmdGVyIHRoZSBSQUYgcGhhc2UgaGFzIHBhc3NlZC5cbiAgICAgIGlmIChvcHRpb25zLmR1cmF0aW9uID09IG51bGwgJiYgdGltaW5ncy50cmFuc2l0aW9uRHVyYXRpb24gPiAwKSB7XG4gICAgICAgIGZsYWdzLnJlY2FsY3VsYXRlVGltaW5nU3R5bGVzID0gZmxhZ3MucmVjYWxjdWxhdGVUaW1pbmdTdHlsZXMgfHwgaXNGaXJzdDtcbiAgICAgIH1cblxuICAgICAgbWF4RGVsYXlUaW1lID0gbWF4RGVsYXkgKiBPTkVfU0VDT05EO1xuICAgICAgbWF4RHVyYXRpb25UaW1lID0gbWF4RHVyYXRpb24gKiBPTkVfU0VDT05EO1xuICAgICAgaWYgKCFvcHRpb25zLnNraXBCbG9ja2luZykge1xuICAgICAgICBmbGFncy5ibG9ja1RyYW5zaXRpb24gPSB0aW1pbmdzLnRyYW5zaXRpb25EdXJhdGlvbiA+IDA7XG4gICAgICAgIGZsYWdzLmJsb2NrS2V5ZnJhbWVBbmltYXRpb24gPSB0aW1pbmdzLmFuaW1hdGlvbkR1cmF0aW9uID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhZ2dlci5hbmltYXRpb25EZWxheSA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdnZXIuYW5pbWF0aW9uRHVyYXRpb24gPT09IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmZyb20pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2xlYW51cFN0eWxlcykge1xuICAgICAgICAgIHJlZ2lzdGVyUmVzdG9yYWJsZVN0eWxlcyhyZXN0b3JlU3R5bGVzLCBub2RlLCBPYmplY3Qua2V5cyhvcHRpb25zLmZyb20pKTtcbiAgICAgICAgfVxuICAgICAgICBhcHBseUFuaW1hdGlvbkZyb21TdHlsZXMoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmbGFncy5ibG9ja1RyYW5zaXRpb24gfHwgZmxhZ3MuYmxvY2tLZXlmcmFtZUFuaW1hdGlvbikge1xuICAgICAgICBhcHBseUJsb2NraW5nKG1heER1cmF0aW9uKTtcbiAgICAgIH0gZWxzZSBpZiAoIW9wdGlvbnMuc2tpcEJsb2NraW5nKSB7XG4gICAgICAgIGJsb2NrVHJhbnNpdGlvbnMobm9kZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICAvLyBUT0RPKG1hdHNrbyk6IGZvciAxLjUgY2hhbmdlIHRoaXMgY29kZSB0byBoYXZlIGFuIGFuaW1hdG9yIG9iamVjdCBmb3IgYmV0dGVyIGRlYnVnZ2luZ1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJCR3aWxsQW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgZW5kOiBlbmRGbixcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChhbmltYXRpb25DbG9zZWQpIHJldHVybjtcblxuICAgICAgICAgIHJ1bm5lckhvc3QgPSB7XG4gICAgICAgICAgICBlbmQ6IGVuZEZuLFxuICAgICAgICAgICAgY2FuY2VsOiBjYW5jZWxGbixcbiAgICAgICAgICAgIHJlc3VtZTogbnVsbCwgLy90aGlzIHdpbGwgYmUgc2V0IGR1cmluZyB0aGUgc3RhcnQoKSBwaGFzZVxuICAgICAgICAgICAgcGF1c2U6IG51bGxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcnVubmVyID0gbmV3ICQkQW5pbWF0ZVJ1bm5lcihydW5uZXJIb3N0KTtcblxuICAgICAgICAgIHdhaXRVbnRpbFF1aWV0KHN0YXJ0KTtcblxuICAgICAgICAgIC8vIHdlIGRvbid0IGhhdmUgYWNjZXNzIHRvIHBhdXNlL3Jlc3VtZSB0aGUgYW5pbWF0aW9uXG4gICAgICAgICAgLy8gc2luY2UgaXQgaGFzbid0IHJ1biB5ZXQuIEFuaW1hdGVSdW5uZXIgd2lsbCB0aGVyZWZvcmVcbiAgICAgICAgICAvLyBzZXQgbm9vcCBmdW5jdGlvbnMgZm9yIHJlc3VtZSBhbmQgcGF1c2UgYW5kIHRoZXkgd2lsbFxuICAgICAgICAgIC8vIGxhdGVyIGJlIG92ZXJyaWRkZW4gb25jZSB0aGUgYW5pbWF0aW9uIGlzIHRyaWdnZXJlZFxuICAgICAgICAgIHJldHVybiBydW5uZXI7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIGVuZEZuKCkge1xuICAgICAgICBjbG9zZSgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjYW5jZWxGbigpIHtcbiAgICAgICAgY2xvc2UodHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNsb3NlKHJlamVjdGVkKSB7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgICAgICAvLyBpZiB0aGUgcHJvbWlzZSBoYXMgYmVlbiBjYWxsZWQgYWxyZWFkeSB0aGVuIHdlIHNob3VsZG4ndCBjbG9zZVxuICAgICAgICAvLyB0aGUgYW5pbWF0aW9uIGFnYWluXG4gICAgICAgIGlmIChhbmltYXRpb25DbG9zZWQgfHwgKGFuaW1hdGlvbkNvbXBsZXRlZCAmJiBhbmltYXRpb25QYXVzZWQpKSByZXR1cm47XG4gICAgICAgIGFuaW1hdGlvbkNsb3NlZCA9IHRydWU7XG4gICAgICAgIGFuaW1hdGlvblBhdXNlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghb3B0aW9ucy4kJHNraXBQcmVwYXJhdGlvbkNsYXNzZXMpIHtcbiAgICAgICAgICAkJGpxTGl0ZS5yZW1vdmVDbGFzcyhlbGVtZW50LCBwcmVwYXJhdGlvbkNsYXNzZXMpO1xuICAgICAgICB9XG4gICAgICAgICQkanFMaXRlLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGFjdGl2ZUNsYXNzZXMpO1xuXG4gICAgICAgIGJsb2NrS2V5ZnJhbWVBbmltYXRpb25zKG5vZGUsIGZhbHNlKTtcbiAgICAgICAgYmxvY2tUcmFuc2l0aW9ucyhub2RlLCBmYWxzZSk7XG5cbiAgICAgICAgZm9yRWFjaCh0ZW1wb3JhcnlTdHlsZXMsIGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgLy8gVGhlcmUgaXMgb25seSBvbmUgd2F5IHRvIHJlbW92ZSBpbmxpbmUgc3R5bGUgcHJvcGVydGllcyBlbnRpcmVseSBmcm9tIGVsZW1lbnRzLlxuICAgICAgICAgIC8vIEJ5IHVzaW5nIGByZW1vdmVQcm9wZXJ0eWAgdGhpcyB3b3JrcywgYnV0IHdlIG5lZWQgdG8gY29udmVydCBjYW1lbC1jYXNlZCBDU1NcbiAgICAgICAgICAvLyBzdHlsZXMgZG93biB0byBoeXBoZW5hdGVkIHZhbHVlcy5cbiAgICAgICAgICBub2RlLnN0eWxlW2VudHJ5WzBdXSA9ICcnO1xuICAgICAgICB9KTtcblxuICAgICAgICBhcHBseUFuaW1hdGlvbkNsYXNzZXMoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIGFwcGx5QW5pbWF0aW9uU3R5bGVzKGVsZW1lbnQsIG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXN0b3JlU3R5bGVzKS5sZW5ndGgpIHtcbiAgICAgICAgICBmb3JFYWNoKHJlc3RvcmVTdHlsZXMsIGZ1bmN0aW9uKHZhbHVlLCBwcm9wKSB7XG4gICAgICAgICAgICB2YWx1ZSA/IG5vZGUuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsdWUpXG4gICAgICAgICAgICAgICAgICA6IG5vZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGUgcmVhc29uIHdoeSB3ZSBoYXZlIHRoaXMgb3B0aW9uIGlzIHRvIGFsbG93IGEgc3luY2hyb25vdXMgY2xvc2luZyBjYWxsYmFja1xuICAgICAgICAvLyB0aGF0IGlzIGZpcmVkIGFzIFNPT04gYXMgdGhlIGFuaW1hdGlvbiBlbmRzICh3aGVuIHRoZSBDU1MgaXMgcmVtb3ZlZCkgb3IgaWZcbiAgICAgICAgLy8gdGhlIGFuaW1hdGlvbiBuZXZlciB0YWtlcyBvZmYgYXQgYWxsLiBBIGdvb2QgZXhhbXBsZSBpcyBhIGxlYXZlIGFuaW1hdGlvbiBzaW5jZVxuICAgICAgICAvLyB0aGUgZWxlbWVudCBtdXN0IGJlIHJlbW92ZWQganVzdCBhZnRlciB0aGUgYW5pbWF0aW9uIGlzIG92ZXIgb3IgZWxzZSB0aGUgZWxlbWVudFxuICAgICAgICAvLyB3aWxsIGFwcGVhciBvbiBzY3JlZW4gZm9yIG9uZSBhbmltYXRpb24gZnJhbWUgY2F1c2luZyBhbiBvdmVyYmVhcmluZyBmbGlja2VyLlxuICAgICAgICBpZiAob3B0aW9ucy5vbkRvbmUpIHtcbiAgICAgICAgICBvcHRpb25zLm9uRG9uZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHByZXBhcmF0aW9uIGZ1bmN0aW9uIGZhaWxzIHRoZW4gdGhlIHByb21pc2UgaXMgbm90IHNldHVwXG4gICAgICAgIGlmIChydW5uZXIpIHtcbiAgICAgICAgICBydW5uZXIuY29tcGxldGUoIXJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhcHBseUJsb2NraW5nKGR1cmF0aW9uKSB7XG4gICAgICAgIGlmIChmbGFncy5ibG9ja1RyYW5zaXRpb24pIHtcbiAgICAgICAgICBibG9ja1RyYW5zaXRpb25zKG5vZGUsIGR1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmbGFncy5ibG9ja0tleWZyYW1lQW5pbWF0aW9uKSB7XG4gICAgICAgICAgYmxvY2tLZXlmcmFtZUFuaW1hdGlvbnMobm9kZSwgISFkdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2xvc2VBbmRSZXR1cm5Ob29wQW5pbWF0b3IoKSB7XG4gICAgICAgIHJ1bm5lciA9IG5ldyAkJEFuaW1hdGVSdW5uZXIoe1xuICAgICAgICAgIGVuZDogZW5kRm4sXG4gICAgICAgICAgY2FuY2VsOiBjYW5jZWxGblxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzaG91bGQgZmx1c2ggdGhlIGNhY2hlIGFuaW1hdGlvblxuICAgICAgICB3YWl0VW50aWxRdWlldChub29wKTtcbiAgICAgICAgY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICQkd2lsbEFuaW1hdGU6IGZhbHNlLFxuICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBydW5uZXI7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlbmQ6IGVuZEZuXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uQ2xvc2VkKSByZXR1cm47XG4gICAgICAgIGlmICghbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnRUaW1lLCBldmVudHMgPSBbXTtcblxuICAgICAgICAvLyBldmVuIHRob3VnaCB3ZSBvbmx5IHBhdXNlIGtleWZyYW1lIGFuaW1hdGlvbnMgaGVyZSB0aGUgcGF1c2UgZmxhZ1xuICAgICAgICAvLyB3aWxsIHN0aWxsIGhhcHBlbiB3aGVuIHRyYW5zaXRpb25zIGFyZSB1c2VkLiBPbmx5IHRoZSB0cmFuc2l0aW9uIHdpbGxcbiAgICAgICAgLy8gbm90IGJlIHBhdXNlZCBzaW5jZSB0aGF0IGlzIG5vdCBwb3NzaWJsZS4gSWYgdGhlIGFuaW1hdGlvbiBlbmRzIHdoZW5cbiAgICAgICAgLy8gcGF1c2VkIHRoZW4gaXQgd2lsbCBub3QgY29tcGxldGUgdW50aWwgdW5wYXVzZWQgb3IgY2FuY2VsbGVkLlxuICAgICAgICB2YXIgcGxheVBhdXNlID0gZnVuY3Rpb24ocGxheUFuaW1hdGlvbikge1xuICAgICAgICAgIGlmICghYW5pbWF0aW9uQ29tcGxldGVkKSB7XG4gICAgICAgICAgICBhbmltYXRpb25QYXVzZWQgPSAhcGxheUFuaW1hdGlvbjtcbiAgICAgICAgICAgIGlmICh0aW1pbmdzLmFuaW1hdGlvbkR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGJsb2NrS2V5ZnJhbWVBbmltYXRpb25zKG5vZGUsIGFuaW1hdGlvblBhdXNlZCk7XG4gICAgICAgICAgICAgIGFuaW1hdGlvblBhdXNlZFxuICAgICAgICAgICAgICAgICAgPyB0ZW1wb3JhcnlTdHlsZXMucHVzaCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgIDogcmVtb3ZlRnJvbUFycmF5KHRlbXBvcmFyeVN0eWxlcywgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoYW5pbWF0aW9uUGF1c2VkICYmIHBsYXlBbmltYXRpb24pIHtcbiAgICAgICAgICAgIGFuaW1hdGlvblBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY2hlY2tpbmcgdGhlIHN0YWdnZXIgZHVyYXRpb24gcHJldmVudHMgYW4gYWNjaWRlbnRseSBjYXNjYWRlIG9mIHRoZSBDU1MgZGVsYXkgc3R5bGVcbiAgICAgICAgLy8gYmVpbmcgaW5oZXJpdGVkIGZyb20gdGhlIHBhcmVudC4gSWYgdGhlIHRyYW5zaXRpb24gZHVyYXRpb24gaXMgemVybyB0aGVuIHdlIGNhbiBzYWZlbHlcbiAgICAgICAgLy8gcmVseSB0aGF0IHRoZSBkZWxheSB2YWx1ZSBpcyBhbiBpbnRlbnRpYWwgc3RhZ2dlciBkZWxheSBzdHlsZS5cbiAgICAgICAgdmFyIG1heFN0YWdnZXIgPSBpdGVtSW5kZXggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCh0aW1pbmdzLnRyYW5zaXRpb25EdXJhdGlvbiAmJiBzdGFnZ2VyLnRyYW5zaXRpb25EdXJhdGlvbiA9PT0gMCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGltaW5ncy5hbmltYXRpb25EdXJhdGlvbiAmJiBzdGFnZ2VyLmFuaW1hdGlvbkR1cmF0aW9uID09PSAwKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAmJiBNYXRoLm1heChzdGFnZ2VyLmFuaW1hdGlvbkRlbGF5LCBzdGFnZ2VyLnRyYW5zaXRpb25EZWxheSk7XG4gICAgICAgIGlmIChtYXhTdGFnZ2VyKSB7XG4gICAgICAgICAgJHRpbWVvdXQodHJpZ2dlckFuaW1hdGlvblN0YXJ0LFxuICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IobWF4U3RhZ2dlciAqIGl0ZW1JbmRleCAqIE9ORV9TRUNPTkQpLFxuICAgICAgICAgICAgICAgICAgIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cmlnZ2VyQW5pbWF0aW9uU3RhcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMgd2lsbCBkZWNvcmF0ZSB0aGUgZXhpc3RpbmcgcHJvbWlzZSBydW5uZXIgd2l0aCBwYXVzZS9yZXN1bWUgbWV0aG9kc1xuICAgICAgICBydW5uZXJIb3N0LnJlc3VtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHBsYXlQYXVzZSh0cnVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBydW5uZXJIb3N0LnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcGxheVBhdXNlKGZhbHNlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiB0cmlnZ2VyQW5pbWF0aW9uU3RhcnQoKSB7XG4gICAgICAgICAgLy8ganVzdCBpbmNhc2UgYSBzdGFnZ2VyIGFuaW1hdGlvbiBraWNrcyBpbiB3aGVuIHRoZSBhbmltYXRpb25cbiAgICAgICAgICAvLyBpdHNlbGYgd2FzIGNhbmNlbGxlZCBlbnRpcmVseVxuICAgICAgICAgIGlmIChhbmltYXRpb25DbG9zZWQpIHJldHVybjtcblxuICAgICAgICAgIGFwcGx5QmxvY2tpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgZm9yRWFjaCh0ZW1wb3JhcnlTdHlsZXMsIGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gZW50cnlbMF07XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBlbnRyeVsxXTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgYXBwbHlBbmltYXRpb25DbGFzc2VzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAgICQkanFMaXRlLmFkZENsYXNzKGVsZW1lbnQsIGFjdGl2ZUNsYXNzZXMpO1xuXG4gICAgICAgICAgaWYgKGZsYWdzLnJlY2FsY3VsYXRlVGltaW5nU3R5bGVzKSB7XG4gICAgICAgICAgICBmdWxsQ2xhc3NOYW1lID0gbm9kZS5jbGFzc05hbWUgKyAnICcgKyBwcmVwYXJhdGlvbkNsYXNzZXM7XG4gICAgICAgICAgICBjYWNoZUtleSA9IGdjc0hhc2hGbihub2RlLCBmdWxsQ2xhc3NOYW1lKTtcblxuICAgICAgICAgICAgdGltaW5ncyA9IGNvbXB1dGVUaW1pbmdzKG5vZGUsIGZ1bGxDbGFzc05hbWUsIGNhY2hlS2V5KTtcbiAgICAgICAgICAgIHJlbGF0aXZlRGVsYXkgPSB0aW1pbmdzLm1heERlbGF5O1xuICAgICAgICAgICAgbWF4RGVsYXkgPSBNYXRoLm1heChyZWxhdGl2ZURlbGF5LCAwKTtcbiAgICAgICAgICAgIG1heER1cmF0aW9uID0gdGltaW5ncy5tYXhEdXJhdGlvbjtcblxuICAgICAgICAgICAgaWYgKG1heER1cmF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmxhZ3MuaGFzVHJhbnNpdGlvbnMgPSB0aW1pbmdzLnRyYW5zaXRpb25EdXJhdGlvbiA+IDA7XG4gICAgICAgICAgICBmbGFncy5oYXNBbmltYXRpb25zID0gdGltaW5ncy5hbmltYXRpb25EdXJhdGlvbiA+IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGZsYWdzLmFwcGx5QW5pbWF0aW9uRGVsYXkpIHtcbiAgICAgICAgICAgIHJlbGF0aXZlRGVsYXkgPSB0eXBlb2Ygb3B0aW9ucy5kZWxheSAhPT0gXCJib29sZWFuXCIgJiYgdHJ1dGh5VGltaW5nVmFsdWUob3B0aW9ucy5kZWxheSlcbiAgICAgICAgICAgICAgICAgID8gcGFyc2VGbG9hdChvcHRpb25zLmRlbGF5KVxuICAgICAgICAgICAgICAgICAgOiByZWxhdGl2ZURlbGF5O1xuXG4gICAgICAgICAgICBtYXhEZWxheSA9IE1hdGgubWF4KHJlbGF0aXZlRGVsYXksIDApO1xuICAgICAgICAgICAgdGltaW5ncy5hbmltYXRpb25EZWxheSA9IHJlbGF0aXZlRGVsYXk7XG4gICAgICAgICAgICBkZWxheVN0eWxlID0gZ2V0Q3NzRGVsYXlTdHlsZShyZWxhdGl2ZURlbGF5LCB0cnVlKTtcbiAgICAgICAgICAgIHRlbXBvcmFyeVN0eWxlcy5wdXNoKGRlbGF5U3R5bGUpO1xuICAgICAgICAgICAgbm9kZS5zdHlsZVtkZWxheVN0eWxlWzBdXSA9IGRlbGF5U3R5bGVbMV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWF4RGVsYXlUaW1lID0gbWF4RGVsYXkgKiBPTkVfU0VDT05EO1xuICAgICAgICAgIG1heER1cmF0aW9uVGltZSA9IG1heER1cmF0aW9uICogT05FX1NFQ09ORDtcblxuICAgICAgICAgIGlmIChvcHRpb25zLmVhc2luZykge1xuICAgICAgICAgICAgdmFyIGVhc2VQcm9wLCBlYXNlVmFsID0gb3B0aW9ucy5lYXNpbmc7XG4gICAgICAgICAgICBpZiAoZmxhZ3MuaGFzVHJhbnNpdGlvbnMpIHtcbiAgICAgICAgICAgICAgZWFzZVByb3AgPSBUUkFOU0lUSU9OX1BST1AgKyBUSU1JTkdfS0VZO1xuICAgICAgICAgICAgICB0ZW1wb3JhcnlTdHlsZXMucHVzaChbZWFzZVByb3AsIGVhc2VWYWxdKTtcbiAgICAgICAgICAgICAgbm9kZS5zdHlsZVtlYXNlUHJvcF0gPSBlYXNlVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZsYWdzLmhhc0FuaW1hdGlvbnMpIHtcbiAgICAgICAgICAgICAgZWFzZVByb3AgPSBBTklNQVRJT05fUFJPUCArIFRJTUlOR19LRVk7XG4gICAgICAgICAgICAgIHRlbXBvcmFyeVN0eWxlcy5wdXNoKFtlYXNlUHJvcCwgZWFzZVZhbF0pO1xuICAgICAgICAgICAgICBub2RlLnN0eWxlW2Vhc2VQcm9wXSA9IGVhc2VWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRpbWluZ3MudHJhbnNpdGlvbkR1cmF0aW9uKSB7XG4gICAgICAgICAgICBldmVudHMucHVzaChUUkFOU0lUSU9ORU5EX0VWRU5UKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGltaW5ncy5hbmltYXRpb25EdXJhdGlvbikge1xuICAgICAgICAgICAgZXZlbnRzLnB1c2goQU5JTUFUSU9ORU5EX0VWRU5UKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgIHZhciB0aW1lclRpbWUgPSBtYXhEZWxheVRpbWUgKyBDTE9TSU5HX1RJTUVfQlVGRkVSICogbWF4RHVyYXRpb25UaW1lO1xuICAgICAgICAgIHZhciBlbmRUaW1lID0gc3RhcnRUaW1lICsgdGltZXJUaW1lO1xuXG4gICAgICAgICAgdmFyIGFuaW1hdGlvbnNEYXRhID0gZWxlbWVudC5kYXRhKEFOSU1BVEVfVElNRVJfS0VZKSB8fCBbXTtcbiAgICAgICAgICB2YXIgc2V0dXBGYWxsYmFja1RpbWVyID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoYW5pbWF0aW9uc0RhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbWVyRGF0YSA9IGFuaW1hdGlvbnNEYXRhWzBdO1xuICAgICAgICAgICAgc2V0dXBGYWxsYmFja1RpbWVyID0gZW5kVGltZSA+IGN1cnJlbnRUaW1lckRhdGEuZXhwZWN0ZWRFbmRUaW1lO1xuICAgICAgICAgICAgaWYgKHNldHVwRmFsbGJhY2tUaW1lcikge1xuICAgICAgICAgICAgICAkdGltZW91dC5jYW5jZWwoY3VycmVudFRpbWVyRGF0YS50aW1lcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhbmltYXRpb25zRGF0YS5wdXNoKGNsb3NlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2V0dXBGYWxsYmFja1RpbWVyKSB7XG4gICAgICAgICAgICB2YXIgdGltZXIgPSAkdGltZW91dChvbkFuaW1hdGlvbkV4cGlyZWQsIHRpbWVyVGltZSwgZmFsc2UpO1xuICAgICAgICAgICAgYW5pbWF0aW9uc0RhdGFbMF0gPSB7XG4gICAgICAgICAgICAgIHRpbWVyOiB0aW1lcixcbiAgICAgICAgICAgICAgZXhwZWN0ZWRFbmRUaW1lOiBlbmRUaW1lXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYW5pbWF0aW9uc0RhdGEucHVzaChjbG9zZSk7XG4gICAgICAgICAgICBlbGVtZW50LmRhdGEoQU5JTUFURV9USU1FUl9LRVksIGFuaW1hdGlvbnNEYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbGVtZW50Lm9uKGV2ZW50cy5qb2luKCcgJyksIG9uQW5pbWF0aW9uUHJvZ3Jlc3MpO1xuICAgICAgICAgIGlmIChvcHRpb25zLnRvKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jbGVhbnVwU3R5bGVzKSB7XG4gICAgICAgICAgICAgIHJlZ2lzdGVyUmVzdG9yYWJsZVN0eWxlcyhyZXN0b3JlU3R5bGVzLCBub2RlLCBPYmplY3Qua2V5cyhvcHRpb25zLnRvKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcHBseUFuaW1hdGlvblRvU3R5bGVzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uQW5pbWF0aW9uRXhwaXJlZCgpIHtcbiAgICAgICAgICB2YXIgYW5pbWF0aW9uc0RhdGEgPSBlbGVtZW50LmRhdGEoQU5JTUFURV9USU1FUl9LRVkpO1xuXG4gICAgICAgICAgLy8gdGhpcyB3aWxsIGJlIGZhbHNlIGluIHRoZSBldmVudCB0aGF0IHRoZSBlbGVtZW50IHdhc1xuICAgICAgICAgIC8vIHJlbW92ZWQgZnJvbSB0aGUgRE9NICh2aWEgYSBsZWF2ZSBhbmltYXRpb24gb3Igc29tZXRoaW5nXG4gICAgICAgICAgLy8gc2ltaWxhcilcbiAgICAgICAgICBpZiAoYW5pbWF0aW9uc0RhdGEpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYW5pbWF0aW9uc0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgYW5pbWF0aW9uc0RhdGFbaV0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRGF0YShBTklNQVRFX1RJTUVSX0tFWSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25BbmltYXRpb25Qcm9ncmVzcyhldmVudCkge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHZhciBldiA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQ7XG4gICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGV2LiRtYW51YWxUaW1lU3RhbXAgfHwgZXYudGltZVN0YW1wIHx8IERhdGUubm93KCk7XG5cbiAgICAgICAgICAvKiBGaXJlZm94IChvciBwb3NzaWJseSBqdXN0IEdlY2tvKSBsaWtlcyB0byBub3Qgcm91bmQgdmFsdWVzIHVwXG4gICAgICAgICAgICogd2hlbiBhIG1zIG1lYXN1cmVtZW50IGlzIHVzZWQgZm9yIHRoZSBhbmltYXRpb24gKi9cbiAgICAgICAgICB2YXIgZWxhcHNlZFRpbWUgPSBwYXJzZUZsb2F0KGV2LmVsYXBzZWRUaW1lLnRvRml4ZWQoRUxBUFNFRF9USU1FX01BWF9ERUNJTUFMX1BMQUNFUykpO1xuXG4gICAgICAgICAgLyogJG1hbnVhbFRpbWVTdGFtcCBpcyBhIG1vY2tlZCB0aW1lU3RhbXAgdmFsdWUgd2hpY2ggaXMgc2V0XG4gICAgICAgICAgICogd2l0aGluIGJyb3dzZXJUcmlnZ2VyKCkuIFRoaXMgaXMgb25seSBoZXJlIHNvIHRoYXQgdGVzdHMgY2FuXG4gICAgICAgICAgICogbW9jayBhbmltYXRpb25zIHByb3Blcmx5LiBSZWFsIGV2ZW50cyBmYWxsYmFjayB0byBldmVudC50aW1lU3RhbXAsXG4gICAgICAgICAgICogb3IsIGlmIHRoZXkgZG9uJ3QsIHRoZW4gYSB0aW1lU3RhbXAgaXMgYXV0b21hdGljYWxseSBjcmVhdGVkIGZvciB0aGVtLlxuICAgICAgICAgICAqIFdlJ3JlIGNoZWNraW5nIHRvIHNlZSBpZiB0aGUgdGltZVN0YW1wIHN1cnBhc3NlcyB0aGUgZXhwZWN0ZWQgZGVsYXksXG4gICAgICAgICAgICogYnV0IHdlJ3JlIHVzaW5nIGVsYXBzZWRUaW1lIGluc3RlYWQgb2YgdGhlIHRpbWVTdGFtcCBvbiB0aGUgMm5kXG4gICAgICAgICAgICogcHJlLWNvbmRpdGlvbiBzaW5jZSBhbmltYXRpb25zIHNvbWV0aW1lcyBjbG9zZSBvZmYgZWFybHkgKi9cbiAgICAgICAgICBpZiAoTWF0aC5tYXgodGltZVN0YW1wIC0gc3RhcnRUaW1lLCAwKSA+PSBtYXhEZWxheVRpbWUgJiYgZWxhcHNlZFRpbWUgPj0gbWF4RHVyYXRpb24pIHtcbiAgICAgICAgICAgIC8vIHdlIHNldCB0aGlzIGZsYWcgdG8gZW5zdXJlIHRoYXQgaWYgdGhlIHRyYW5zaXRpb24gaXMgcGF1c2VkIHRoZW4sIHdoZW4gcmVzdW1lZCxcbiAgICAgICAgICAgIC8vIHRoZSBhbmltYXRpb24gd2lsbCBhdXRvbWF0aWNhbGx5IGNsb3NlIGl0c2VsZiBzaW5jZSB0cmFuc2l0aW9ucyBjYW5ub3QgYmUgcGF1c2VkLlxuICAgICAgICAgICAgYW5pbWF0aW9uQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfV07XG59XTtcblxudmFyICQkQW5pbWF0ZUNzc0RyaXZlclByb3ZpZGVyID0gWyckJGFuaW1hdGlvblByb3ZpZGVyJywgZnVuY3Rpb24oJCRhbmltYXRpb25Qcm92aWRlcikge1xuICAkJGFuaW1hdGlvblByb3ZpZGVyLmRyaXZlcnMucHVzaCgnJCRhbmltYXRlQ3NzRHJpdmVyJyk7XG5cbiAgdmFyIE5HX0FOSU1BVEVfU0hJTV9DTEFTU19OQU1FID0gJ25nLWFuaW1hdGUtc2hpbSc7XG4gIHZhciBOR19BTklNQVRFX0FOQ0hPUl9DTEFTU19OQU1FID0gJ25nLWFuY2hvcic7XG5cbiAgdmFyIE5HX09VVF9BTkNIT1JfQ0xBU1NfTkFNRSA9ICduZy1hbmNob3Itb3V0JztcbiAgdmFyIE5HX0lOX0FOQ0hPUl9DTEFTU19OQU1FID0gJ25nLWFuY2hvci1pbic7XG5cbiAgZnVuY3Rpb24gaXNEb2N1bWVudEZyYWdtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlICYmIG5vZGUucGFyZW50Tm9kZS5ub2RlVHlwZSA9PT0gMTE7XG4gIH1cblxuICB0aGlzLiRnZXQgPSBbJyRhbmltYXRlQ3NzJywgJyRyb290U2NvcGUnLCAnJCRBbmltYXRlUnVubmVyJywgJyRyb290RWxlbWVudCcsICckc25pZmZlcicsICckJGpxTGl0ZScsICckZG9jdW1lbnQnLFxuICAgICAgIGZ1bmN0aW9uKCRhbmltYXRlQ3NzLCAgICRyb290U2NvcGUsICAgJCRBbmltYXRlUnVubmVyLCAgICRyb290RWxlbWVudCwgICAkc25pZmZlciwgICAkJGpxTGl0ZSwgICAkZG9jdW1lbnQpIHtcblxuICAgIC8vIG9ubHkgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IHRoZXNlIHByb3BlcnRpZXMgY2FuIHJlbmRlciBhbmltYXRpb25zXG4gICAgaWYgKCEkc25pZmZlci5hbmltYXRpb25zICYmICEkc25pZmZlci50cmFuc2l0aW9ucykgcmV0dXJuIG5vb3A7XG5cbiAgICB2YXIgYm9keU5vZGUgPSAkZG9jdW1lbnRbMF0uYm9keTtcbiAgICB2YXIgcm9vdE5vZGUgPSBnZXREb21Ob2RlKCRyb290RWxlbWVudCk7XG5cbiAgICB2YXIgcm9vdEJvZHlFbGVtZW50ID0ganFMaXRlKFxuICAgICAgLy8gdGhpcyBpcyB0byBhdm9pZCB1c2luZyBzb21ldGhpbmcgdGhhdCBleGlzdHMgb3V0c2lkZSBvZiB0aGUgYm9keVxuICAgICAgLy8gd2UgYWxzbyBzcGVjaWFsIGNhc2UgdGhlIGRvYyBmcmFnZW1lbnQgY2FzZSBiZWNhdXNlIG91ciB1bml0IHRlc3QgY29kZVxuICAgICAgLy8gYXBwZW5kcyB0aGUgJHJvb3RFbGVtZW50IHRvIHRoZSBib2R5IGFmdGVyIHRoZSBhcHAgaGFzIGJlZW4gYm9vdHN0cmFwcGVkXG4gICAgICBpc0RvY3VtZW50RnJhZ21lbnQocm9vdE5vZGUpIHx8IGJvZHlOb2RlLmNvbnRhaW5zKHJvb3ROb2RlKSA/IHJvb3ROb2RlIDogYm9keU5vZGVcbiAgICApO1xuXG4gICAgdmFyIGFwcGx5QW5pbWF0aW9uQ2xhc3NlcyA9IGFwcGx5QW5pbWF0aW9uQ2xhc3Nlc0ZhY3RvcnkoJCRqcUxpdGUpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGluaXREcml2ZXJGbihhbmltYXRpb25EZXRhaWxzKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9uRGV0YWlscy5mcm9tICYmIGFuaW1hdGlvbkRldGFpbHMudG9cbiAgICAgICAgICA/IHByZXBhcmVGcm9tVG9BbmNob3JBbmltYXRpb24oYW5pbWF0aW9uRGV0YWlscy5mcm9tLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25EZXRhaWxzLnRvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25EZXRhaWxzLmNsYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkRldGFpbHMuYW5jaG9ycylcbiAgICAgICAgICA6IHByZXBhcmVSZWd1bGFyQW5pbWF0aW9uKGFuaW1hdGlvbkRldGFpbHMpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJDc3NDbGFzc2VzKGNsYXNzZXMpIHtcbiAgICAgIC8vcmVtb3ZlIGFsbCB0aGUgYG5nLWAgc3R1ZmZcbiAgICAgIHJldHVybiBjbGFzc2VzLnJlcGxhY2UoL1xcYm5nLVxcUytcXGIvZywgJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVuaXF1ZVZhbHVlcyhhLCBiKSB7XG4gICAgICBpZiAoaXNTdHJpbmcoYSkpIGEgPSBhLnNwbGl0KCcgJyk7XG4gICAgICBpZiAoaXNTdHJpbmcoYikpIGIgPSBiLnNwbGl0KCcgJyk7XG4gICAgICByZXR1cm4gYS5maWx0ZXIoZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHJldHVybiBiLmluZGV4T2YodmFsKSA9PT0gLTE7XG4gICAgICB9KS5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZUFuY2hvcmVkQW5pbWF0aW9uKGNsYXNzZXMsIG91dEFuY2hvciwgaW5BbmNob3IpIHtcbiAgICAgIHZhciBjbG9uZSA9IGpxTGl0ZShnZXREb21Ob2RlKG91dEFuY2hvcikuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgIHZhciBzdGFydGluZ0NsYXNzZXMgPSBmaWx0ZXJDc3NDbGFzc2VzKGdldENsYXNzVmFsKGNsb25lKSk7XG5cbiAgICAgIG91dEFuY2hvci5hZGRDbGFzcyhOR19BTklNQVRFX1NISU1fQ0xBU1NfTkFNRSk7XG4gICAgICBpbkFuY2hvci5hZGRDbGFzcyhOR19BTklNQVRFX1NISU1fQ0xBU1NfTkFNRSk7XG5cbiAgICAgIGNsb25lLmFkZENsYXNzKE5HX0FOSU1BVEVfQU5DSE9SX0NMQVNTX05BTUUpO1xuXG4gICAgICByb290Qm9keUVsZW1lbnQuYXBwZW5kKGNsb25lKTtcblxuICAgICAgdmFyIGFuaW1hdG9ySW4sIGFuaW1hdG9yT3V0ID0gcHJlcGFyZU91dEFuaW1hdGlvbigpO1xuXG4gICAgICAvLyB0aGUgdXNlciBtYXkgbm90IGVuZCB1cCB1c2luZyB0aGUgYG91dGAgYW5pbWF0aW9uIGFuZFxuICAgICAgLy8gb25seSBtYWtpbmcgdXNlIG9mIHRoZSBgaW5gIGFuaW1hdGlvbiBvciB2aWNlLXZlcnNhLlxuICAgICAgLy8gSW4gZWl0aGVyIGNhc2Ugd2Ugc2hvdWxkIGFsbG93IHRoaXMgYW5kIG5vdCBhc3N1bWUgdGhlXG4gICAgICAvLyBhbmltYXRpb24gaXMgb3ZlciB1bmxlc3MgYm90aCBhbmltYXRpb25zIGFyZSBub3QgdXNlZC5cbiAgICAgIGlmICghYW5pbWF0b3JPdXQpIHtcbiAgICAgICAgYW5pbWF0b3JJbiA9IHByZXBhcmVJbkFuaW1hdGlvbigpO1xuICAgICAgICBpZiAoIWFuaW1hdG9ySW4pIHtcbiAgICAgICAgICByZXR1cm4gZW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXJ0aW5nQW5pbWF0b3IgPSBhbmltYXRvck91dCB8fCBhbmltYXRvckluO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHJ1bm5lcjtcblxuICAgICAgICAgIHZhciBjdXJyZW50QW5pbWF0aW9uID0gc3RhcnRpbmdBbmltYXRvci5zdGFydCgpO1xuICAgICAgICAgIGN1cnJlbnRBbmltYXRpb24uZG9uZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRBbmltYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgaWYgKCFhbmltYXRvckluKSB7XG4gICAgICAgICAgICAgIGFuaW1hdG9ySW4gPSBwcmVwYXJlSW5BbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgaWYgKGFuaW1hdG9ySW4pIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QW5pbWF0aW9uID0gYW5pbWF0b3JJbi5zdGFydCgpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRBbmltYXRpb24uZG9uZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRBbmltYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgZW5kKCk7XG4gICAgICAgICAgICAgICAgICBydW5uZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudEFuaW1hdGlvbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaW4gdGhlIGV2ZW50IHRoYXQgdGhlcmUgaXMgbm8gYGluYCBhbmltYXRpb25cbiAgICAgICAgICAgIGVuZCgpO1xuICAgICAgICAgICAgcnVubmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBydW5uZXIgPSBuZXcgJCRBbmltYXRlUnVubmVyKHtcbiAgICAgICAgICAgIGVuZDogZW5kRm4sXG4gICAgICAgICAgICBjYW5jZWw6IGVuZEZuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gcnVubmVyO1xuXG4gICAgICAgICAgZnVuY3Rpb24gZW5kRm4oKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudEFuaW1hdGlvbikge1xuICAgICAgICAgICAgICBjdXJyZW50QW5pbWF0aW9uLmVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gY2FsY3VsYXRlQW5jaG9yU3R5bGVzKGFuY2hvcikge1xuICAgICAgICB2YXIgc3R5bGVzID0ge307XG5cbiAgICAgICAgdmFyIGNvb3JkcyA9IGdldERvbU5vZGUoYW5jaG9yKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAvLyB3ZSBpdGVyYXRlIGRpcmVjdGx5IHNpbmNlIHNhZmFyaSBtZXNzZXMgdXAgYW5kIGRvZXNuJ3QgcmV0dXJuXG4gICAgICAgIC8vIGFsbCB0aGUga2V5cyBmb3IgdGhlIGNvb2RzIG9iamVjdCB3aGVuIGl0ZXJhdGVkXG4gICAgICAgIGZvckVhY2goWyd3aWR0aCcsJ2hlaWdodCcsJ3RvcCcsJ2xlZnQnXSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gY29vcmRzW2tleV07XG4gICAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgIHZhbHVlICs9IGJvZHlOb2RlLnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgdmFsdWUgKz0gYm9keU5vZGUuc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0eWxlc1trZXldID0gTWF0aC5mbG9vcih2YWx1ZSkgKyAncHgnO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcHJlcGFyZU91dEFuaW1hdGlvbigpIHtcbiAgICAgICAgdmFyIGFuaW1hdG9yID0gJGFuaW1hdGVDc3MoY2xvbmUsIHtcbiAgICAgICAgICBhZGRDbGFzczogTkdfT1VUX0FOQ0hPUl9DTEFTU19OQU1FLFxuICAgICAgICAgIGRlbGF5OiB0cnVlLFxuICAgICAgICAgIGZyb206IGNhbGN1bGF0ZUFuY2hvclN0eWxlcyhvdXRBbmNob3IpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJlYWQgdGhlIGNvbW1lbnQgd2l0aGluIGBwcmVwYXJlUmVndWxhckFuaW1hdGlvbmAgdG8gdW5kZXJzdGFuZFxuICAgICAgICAvLyB3aHkgdGhpcyBjaGVjayBpcyBuZWNlc3NhcnlcbiAgICAgICAgcmV0dXJuIGFuaW1hdG9yLiQkd2lsbEFuaW1hdGUgPyBhbmltYXRvciA6IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldENsYXNzVmFsKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuYXR0cignY2xhc3MnKSB8fCAnJztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcHJlcGFyZUluQW5pbWF0aW9uKCkge1xuICAgICAgICB2YXIgZW5kaW5nQ2xhc3NlcyA9IGZpbHRlckNzc0NsYXNzZXMoZ2V0Q2xhc3NWYWwoaW5BbmNob3IpKTtcbiAgICAgICAgdmFyIHRvQWRkID0gZ2V0VW5pcXVlVmFsdWVzKGVuZGluZ0NsYXNzZXMsIHN0YXJ0aW5nQ2xhc3Nlcyk7XG4gICAgICAgIHZhciB0b1JlbW92ZSA9IGdldFVuaXF1ZVZhbHVlcyhzdGFydGluZ0NsYXNzZXMsIGVuZGluZ0NsYXNzZXMpO1xuXG4gICAgICAgIHZhciBhbmltYXRvciA9ICRhbmltYXRlQ3NzKGNsb25lLCB7XG4gICAgICAgICAgdG86IGNhbGN1bGF0ZUFuY2hvclN0eWxlcyhpbkFuY2hvciksXG4gICAgICAgICAgYWRkQ2xhc3M6IE5HX0lOX0FOQ0hPUl9DTEFTU19OQU1FICsgJyAnICsgdG9BZGQsXG4gICAgICAgICAgcmVtb3ZlQ2xhc3M6IE5HX09VVF9BTkNIT1JfQ0xBU1NfTkFNRSArICcgJyArIHRvUmVtb3ZlLFxuICAgICAgICAgIGRlbGF5OiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJlYWQgdGhlIGNvbW1lbnQgd2l0aGluIGBwcmVwYXJlUmVndWxhckFuaW1hdGlvbmAgdG8gdW5kZXJzdGFuZFxuICAgICAgICAvLyB3aHkgdGhpcyBjaGVjayBpcyBuZWNlc3NhcnlcbiAgICAgICAgcmV0dXJuIGFuaW1hdG9yLiQkd2lsbEFuaW1hdGUgPyBhbmltYXRvciA6IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGVuZCgpIHtcbiAgICAgICAgY2xvbmUucmVtb3ZlKCk7XG4gICAgICAgIG91dEFuY2hvci5yZW1vdmVDbGFzcyhOR19BTklNQVRFX1NISU1fQ0xBU1NfTkFNRSk7XG4gICAgICAgIGluQW5jaG9yLnJlbW92ZUNsYXNzKE5HX0FOSU1BVEVfU0hJTV9DTEFTU19OQU1FKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlRnJvbVRvQW5jaG9yQW5pbWF0aW9uKGZyb20sIHRvLCBjbGFzc2VzLCBhbmNob3JzKSB7XG4gICAgICB2YXIgZnJvbUFuaW1hdGlvbiA9IHByZXBhcmVSZWd1bGFyQW5pbWF0aW9uKGZyb20sIG5vb3ApO1xuICAgICAgdmFyIHRvQW5pbWF0aW9uID0gcHJlcGFyZVJlZ3VsYXJBbmltYXRpb24odG8sIG5vb3ApO1xuXG4gICAgICB2YXIgYW5jaG9yQW5pbWF0aW9ucyA9IFtdO1xuICAgICAgZm9yRWFjaChhbmNob3JzLCBmdW5jdGlvbihhbmNob3IpIHtcbiAgICAgICAgdmFyIG91dEVsZW1lbnQgPSBhbmNob3JbJ291dCddO1xuICAgICAgICB2YXIgaW5FbGVtZW50ID0gYW5jaG9yWydpbiddO1xuICAgICAgICB2YXIgYW5pbWF0b3IgPSBwcmVwYXJlQW5jaG9yZWRBbmltYXRpb24oY2xhc3Nlcywgb3V0RWxlbWVudCwgaW5FbGVtZW50KTtcbiAgICAgICAgaWYgKGFuaW1hdG9yKSB7XG4gICAgICAgICAgYW5jaG9yQW5pbWF0aW9ucy5wdXNoKGFuaW1hdG9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIG5vIHBvaW50IGluIGRvaW5nIGFueXRoaW5nIHdoZW4gdGhlcmUgYXJlIG5vIGVsZW1lbnRzIHRvIGFuaW1hdGVcbiAgICAgIGlmICghZnJvbUFuaW1hdGlvbiAmJiAhdG9BbmltYXRpb24gJiYgYW5jaG9yQW5pbWF0aW9ucy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBhbmltYXRpb25SdW5uZXJzID0gW107XG5cbiAgICAgICAgICBpZiAoZnJvbUFuaW1hdGlvbikge1xuICAgICAgICAgICAgYW5pbWF0aW9uUnVubmVycy5wdXNoKGZyb21BbmltYXRpb24uc3RhcnQoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRvQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhbmltYXRpb25SdW5uZXJzLnB1c2godG9BbmltYXRpb24uc3RhcnQoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yRWFjaChhbmNob3JBbmltYXRpb25zLCBmdW5jdGlvbihhbmltYXRpb24pIHtcbiAgICAgICAgICAgIGFuaW1hdGlvblJ1bm5lcnMucHVzaChhbmltYXRpb24uc3RhcnQoKSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgcnVubmVyID0gbmV3ICQkQW5pbWF0ZVJ1bm5lcih7XG4gICAgICAgICAgICBlbmQ6IGVuZEZuLFxuICAgICAgICAgICAgY2FuY2VsOiBlbmRGbiAvLyBDU1MtZHJpdmVuIGFuaW1hdGlvbnMgY2Fubm90IGJlIGNhbmNlbGxlZCwgb25seSBlbmRlZFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJCRBbmltYXRlUnVubmVyLmFsbChhbmltYXRpb25SdW5uZXJzLCBmdW5jdGlvbihzdGF0dXMpIHtcbiAgICAgICAgICAgIHJ1bm5lci5jb21wbGV0ZShzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHJ1bm5lcjtcblxuICAgICAgICAgIGZ1bmN0aW9uIGVuZEZuKCkge1xuICAgICAgICAgICAgZm9yRWFjaChhbmltYXRpb25SdW5uZXJzLCBmdW5jdGlvbihydW5uZXIpIHtcbiAgICAgICAgICAgICAgcnVubmVyLmVuZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXBhcmVSZWd1bGFyQW5pbWF0aW9uKGFuaW1hdGlvbkRldGFpbHMpIHtcbiAgICAgIHZhciBlbGVtZW50ID0gYW5pbWF0aW9uRGV0YWlscy5lbGVtZW50O1xuICAgICAgdmFyIG9wdGlvbnMgPSBhbmltYXRpb25EZXRhaWxzLm9wdGlvbnMgfHwge307XG5cbiAgICAgIGlmIChhbmltYXRpb25EZXRhaWxzLnN0cnVjdHVyYWwpIHtcbiAgICAgICAgb3B0aW9ucy5ldmVudCA9IGFuaW1hdGlvbkRldGFpbHMuZXZlbnQ7XG4gICAgICAgIG9wdGlvbnMuc3RydWN0dXJhbCA9IHRydWU7XG4gICAgICAgIG9wdGlvbnMuYXBwbHlDbGFzc2VzRWFybHkgPSB0cnVlO1xuXG4gICAgICAgIC8vIHdlIHNwZWNpYWwgY2FzZSB0aGUgbGVhdmUgYW5pbWF0aW9uIHNpbmNlIHdlIHdhbnQgdG8gZW5zdXJlIHRoYXRcbiAgICAgICAgLy8gdGhlIGVsZW1lbnQgaXMgcmVtb3ZlZCBhcyBzb29uIGFzIHRoZSBhbmltYXRpb24gaXMgb3Zlci4gT3RoZXJ3aXNlXG4gICAgICAgIC8vIGEgZmxpY2tlciBtaWdodCBhcHBlYXIgb3IgdGhlIGVsZW1lbnQgbWF5IG5vdCBiZSByZW1vdmVkIGF0IGFsbFxuICAgICAgICBpZiAoYW5pbWF0aW9uRGV0YWlscy5ldmVudCA9PT0gJ2xlYXZlJykge1xuICAgICAgICAgIG9wdGlvbnMub25Eb25lID0gb3B0aW9ucy5kb21PcGVyYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gV2UgYXNzaWduIHRoZSBwcmVwYXJhdGlvbkNsYXNzZXMgYXMgdGhlIGFjdHVhbCBhbmltYXRpb24gZXZlbnQgc2luY2VcbiAgICAgIC8vIHRoZSBpbnRlcm5hbHMgb2YgJGFuaW1hdGVDc3Mgd2lsbCBqdXN0IHN1ZmZpeCB0aGUgZXZlbnQgdG9rZW4gdmFsdWVzXG4gICAgICAvLyB3aXRoIGAtYWN0aXZlYCB0byB0cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgICBpZiAob3B0aW9ucy5wcmVwYXJhdGlvbkNsYXNzZXMpIHtcbiAgICAgICAgb3B0aW9ucy5ldmVudCA9IGNvbmNhdFdpdGhTcGFjZShvcHRpb25zLmV2ZW50LCBvcHRpb25zLnByZXBhcmF0aW9uQ2xhc3Nlcyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhbmltYXRvciA9ICRhbmltYXRlQ3NzKGVsZW1lbnQsIG9wdGlvbnMpO1xuXG4gICAgICAvLyB0aGUgZHJpdmVyIGxvb2t1cCBjb2RlIGluc2lkZSBvZiAkJGFuaW1hdGlvbiBhdHRlbXB0cyB0byBzcGF3biBhXG4gICAgICAvLyBkcml2ZXIgb25lIGJ5IG9uZSB1bnRpbCBhIGRyaXZlciByZXR1cm5zIGEuJCR3aWxsQW5pbWF0ZSBhbmltYXRvciBvYmplY3QuXG4gICAgICAvLyAkYW5pbWF0ZUNzcyB3aWxsIGFsd2F5cyByZXR1cm4gYW4gb2JqZWN0LCBob3dldmVyLCBpdCB3aWxsIHBhc3MgaW5cbiAgICAgIC8vIGEgZmxhZyBhcyBhIGhpbnQgYXMgdG8gd2hldGhlciBhbiBhbmltYXRpb24gd2FzIGRldGVjdGVkIG9yIG5vdFxuICAgICAgcmV0dXJuIGFuaW1hdG9yLiQkd2lsbEFuaW1hdGUgPyBhbmltYXRvciA6IG51bGw7XG4gICAgfVxuICB9XTtcbn1dO1xuXG4vLyBUT0RPKG1hdHNrbyk6IHVzZSBjYWNoaW5nIGhlcmUgdG8gc3BlZWQgdGhpbmdzIHVwIGZvciBkZXRlY3Rpb25cbi8vIFRPRE8obWF0c2tvKTogYWRkIGRvY3VtZW50YXRpb25cbi8vICBieSB0aGUgdGltZS4uLlxuXG52YXIgJCRBbmltYXRlSnNQcm92aWRlciA9IFsnJGFuaW1hdGVQcm92aWRlcicsIGZ1bmN0aW9uKCRhbmltYXRlUHJvdmlkZXIpIHtcbiAgdGhpcy4kZ2V0ID0gWyckaW5qZWN0b3InLCAnJCRBbmltYXRlUnVubmVyJywgJyQkanFMaXRlJyxcbiAgICAgICBmdW5jdGlvbigkaW5qZWN0b3IsICAgJCRBbmltYXRlUnVubmVyLCAgICQkanFMaXRlKSB7XG5cbiAgICB2YXIgYXBwbHlBbmltYXRpb25DbGFzc2VzID0gYXBwbHlBbmltYXRpb25DbGFzc2VzRmFjdG9yeSgkJGpxTGl0ZSk7XG4gICAgICAgICAvLyAkYW5pbWF0ZUpzKGVsZW1lbnQsICdlbnRlcicpO1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudCwgY2xhc3Nlcywgb3B0aW9ucykge1xuICAgICAgLy8gdGhlIGBjbGFzc2VzYCBhcmd1bWVudCBpcyBvcHRpb25hbCBhbmQgaWYgaXQgaXMgbm90IHVzZWRcbiAgICAgIC8vIHRoZW4gdGhlIGNsYXNzZXMgd2lsbCBiZSByZXNvbHZlZCBmcm9tIHRoZSBlbGVtZW50J3MgY2xhc3NOYW1lXG4gICAgICAvLyBwcm9wZXJ0eSBhcyB3ZWxsIGFzIG9wdGlvbnMuYWRkQ2xhc3Mvb3B0aW9ucy5yZW1vdmVDbGFzcy5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIGlzT2JqZWN0KGNsYXNzZXMpKSB7XG4gICAgICAgIG9wdGlvbnMgPSBjbGFzc2VzO1xuICAgICAgICBjbGFzc2VzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IHByZXBhcmVBbmltYXRpb25PcHRpb25zKG9wdGlvbnMpO1xuICAgICAgaWYgKCFjbGFzc2VzKSB7XG4gICAgICAgIGNsYXNzZXMgPSBlbGVtZW50LmF0dHIoJ2NsYXNzJykgfHwgJyc7XG4gICAgICAgIGlmIChvcHRpb25zLmFkZENsYXNzKSB7XG4gICAgICAgICAgY2xhc3NlcyArPSAnICcgKyBvcHRpb25zLmFkZENsYXNzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnJlbW92ZUNsYXNzKSB7XG4gICAgICAgICAgY2xhc3NlcyArPSAnICcgKyBvcHRpb25zLnJlbW92ZUNsYXNzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBjbGFzc2VzVG9BZGQgPSBvcHRpb25zLmFkZENsYXNzO1xuICAgICAgdmFyIGNsYXNzZXNUb1JlbW92ZSA9IG9wdGlvbnMucmVtb3ZlQ2xhc3M7XG5cbiAgICAgIC8vIHRoZSBsb29rdXBBbmltYXRpb25zIGZ1bmN0aW9uIHJldHVybnMgYSBzZXJpZXMgb2YgYW5pbWF0aW9uIG9iamVjdHMgdGhhdCBhcmVcbiAgICAgIC8vIG1hdGNoZWQgdXAgd2l0aCBvbmUgb3IgbW9yZSBvZiB0aGUgQ1NTIGNsYXNzZXMuIFRoZXNlIGFuaW1hdGlvbiBvYmplY3RzIGFyZVxuICAgICAgLy8gZGVmaW5lZCB2aWEgdGhlIG1vZHVsZS5hbmltYXRpb24gZmFjdG9yeSBmdW5jdGlvbi4gSWYgbm90aGluZyBpcyBkZXRlY3RlZCB0aGVuXG4gICAgICAvLyB3ZSBkb24ndCByZXR1cm4gYW55dGhpbmcgd2hpY2ggdGhlbiBtYWtlcyAkYW5pbWF0aW9uIHF1ZXJ5IHRoZSBuZXh0IGRyaXZlci5cbiAgICAgIHZhciBhbmltYXRpb25zID0gbG9va3VwQW5pbWF0aW9ucyhjbGFzc2VzKTtcbiAgICAgIHZhciBiZWZvcmUsIGFmdGVyO1xuICAgICAgaWYgKGFuaW1hdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBhZnRlckZuLCBiZWZvcmVGbjtcbiAgICAgICAgaWYgKGV2ZW50ID09ICdsZWF2ZScpIHtcbiAgICAgICAgICBiZWZvcmVGbiA9ICdsZWF2ZSc7XG4gICAgICAgICAgYWZ0ZXJGbiA9ICdhZnRlckxlYXZlJzsgLy8gVE9ETyhtYXRza28pOiBnZXQgcmlkIG9mIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiZWZvcmVGbiA9ICdiZWZvcmUnICsgZXZlbnQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBldmVudC5zdWJzdHIoMSk7XG4gICAgICAgICAgYWZ0ZXJGbiA9IGV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50ICE9PSAnZW50ZXInICYmIGV2ZW50ICE9PSAnbW92ZScpIHtcbiAgICAgICAgICBiZWZvcmUgPSBwYWNrYWdlQW5pbWF0aW9ucyhlbGVtZW50LCBldmVudCwgb3B0aW9ucywgYW5pbWF0aW9ucywgYmVmb3JlRm4pO1xuICAgICAgICB9XG4gICAgICAgIGFmdGVyICA9IHBhY2thZ2VBbmltYXRpb25zKGVsZW1lbnQsIGV2ZW50LCBvcHRpb25zLCBhbmltYXRpb25zLCBhZnRlckZuKTtcbiAgICAgIH1cblxuICAgICAgLy8gbm8gbWF0Y2hpbmcgYW5pbWF0aW9uc1xuICAgICAgaWYgKCFiZWZvcmUgJiYgIWFmdGVyKSByZXR1cm47XG5cbiAgICAgIGZ1bmN0aW9uIGFwcGx5T3B0aW9ucygpIHtcbiAgICAgICAgb3B0aW9ucy5kb21PcGVyYXRpb24oKTtcbiAgICAgICAgYXBwbHlBbmltYXRpb25DbGFzc2VzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGNsb3NlQWN0aXZlQW5pbWF0aW9ucztcbiAgICAgICAgICB2YXIgY2hhaW4gPSBbXTtcblxuICAgICAgICAgIGlmIChiZWZvcmUpIHtcbiAgICAgICAgICAgIGNoYWluLnB1c2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgY2xvc2VBY3RpdmVBbmltYXRpb25zID0gYmVmb3JlKGZuKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjaGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNoYWluLnB1c2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgYXBwbHlPcHRpb25zKCk7XG4gICAgICAgICAgICAgIGZuKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFwcGx5T3B0aW9ucygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhZnRlcikge1xuICAgICAgICAgICAgY2hhaW4ucHVzaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICBjbG9zZUFjdGl2ZUFuaW1hdGlvbnMgPSBhZnRlcihmbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgYW5pbWF0aW9uQ2xvc2VkID0gZmFsc2U7XG4gICAgICAgICAgdmFyIHJ1bm5lciA9IG5ldyAkJEFuaW1hdGVSdW5uZXIoe1xuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZW5kQW5pbWF0aW9ucygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGVuZEFuaW1hdGlvbnModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkJEFuaW1hdGVSdW5uZXIuY2hhaW4oY2hhaW4sIG9uQ29tcGxldGUpO1xuICAgICAgICAgIHJldHVybiBydW5uZXI7XG5cbiAgICAgICAgICBmdW5jdGlvbiBvbkNvbXBsZXRlKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkNsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICBhcHBseU9wdGlvbnMoKTtcbiAgICAgICAgICAgIGFwcGx5QW5pbWF0aW9uU3R5bGVzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgcnVubmVyLmNvbXBsZXRlKHN1Y2Nlc3MpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGVuZEFuaW1hdGlvbnMoY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICBpZiAoIWFuaW1hdGlvbkNsb3NlZCkge1xuICAgICAgICAgICAgICAoY2xvc2VBY3RpdmVBbmltYXRpb25zIHx8IG5vb3ApKGNhbmNlbGxlZCk7XG4gICAgICAgICAgICAgIG9uQ29tcGxldGUoY2FuY2VsbGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIGV4ZWN1dGVBbmltYXRpb25GbihmbiwgZWxlbWVudCwgZXZlbnQsIG9wdGlvbnMsIG9uRG9uZSkge1xuICAgICAgICB2YXIgYXJncztcbiAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgIGNhc2UgJ2FuaW1hdGUnOlxuICAgICAgICAgICAgYXJncyA9IFtlbGVtZW50LCBvcHRpb25zLmZyb20sIG9wdGlvbnMudG8sIG9uRG9uZV07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3NldENsYXNzJzpcbiAgICAgICAgICAgIGFyZ3MgPSBbZWxlbWVudCwgY2xhc3Nlc1RvQWRkLCBjbGFzc2VzVG9SZW1vdmUsIG9uRG9uZV07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2FkZENsYXNzJzpcbiAgICAgICAgICAgIGFyZ3MgPSBbZWxlbWVudCwgY2xhc3Nlc1RvQWRkLCBvbkRvbmVdO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdyZW1vdmVDbGFzcyc6XG4gICAgICAgICAgICBhcmdzID0gW2VsZW1lbnQsIGNsYXNzZXNUb1JlbW92ZSwgb25Eb25lXTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGFyZ3MgPSBbZWxlbWVudCwgb25Eb25lXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5wdXNoKG9wdGlvbnMpO1xuXG4gICAgICAgIHZhciB2YWx1ZSA9IGZuLmFwcGx5KGZuLCBhcmdzKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUuc3RhcnQpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN0YXJ0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgJCRBbmltYXRlUnVubmVyKSB7XG4gICAgICAgICAgICB2YWx1ZS5kb25lKG9uRG9uZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gb3B0aW9uYWwgb25FbmQgLyBvbkNhbmNlbCBjYWxsYmFja1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub29wO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBncm91cEV2ZW50ZWRBbmltYXRpb25zKGVsZW1lbnQsIGV2ZW50LCBvcHRpb25zLCBhbmltYXRpb25zLCBmbk5hbWUpIHtcbiAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yRWFjaChhbmltYXRpb25zLCBmdW5jdGlvbihhbmkpIHtcbiAgICAgICAgICB2YXIgYW5pbWF0aW9uID0gYW5pW2ZuTmFtZV07XG4gICAgICAgICAgaWYgKCFhbmltYXRpb24pIHJldHVybjtcblxuICAgICAgICAgIC8vIG5vdGUgdGhhdCBhbGwgb2YgdGhlc2UgYW5pbWF0aW9ucyB3aWxsIHJ1biBpbiBwYXJhbGxlbFxuICAgICAgICAgIG9wZXJhdGlvbnMucHVzaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBydW5uZXI7XG4gICAgICAgICAgICB2YXIgZW5kUHJvZ3Jlc3NDYjtcblxuICAgICAgICAgICAgdmFyIHJlc29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgb25BbmltYXRpb25Db21wbGV0ZSA9IGZ1bmN0aW9uKHJlamVjdGVkKSB7XG4gICAgICAgICAgICAgIGlmICghcmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgKGVuZFByb2dyZXNzQ2IgfHwgbm9vcCkocmVqZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJ1bm5lci5jb21wbGV0ZSghcmVqZWN0ZWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBydW5uZXIgPSBuZXcgJCRBbmltYXRlUnVubmVyKHtcbiAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBvbkFuaW1hdGlvbkNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgb25BbmltYXRpb25Db21wbGV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGVuZFByb2dyZXNzQ2IgPSBleGVjdXRlQW5pbWF0aW9uRm4oYW5pbWF0aW9uLCBlbGVtZW50LCBldmVudCwgb3B0aW9ucywgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHZhciBjYW5jZWxsZWQgPSByZXN1bHQgPT09IGZhbHNlO1xuICAgICAgICAgICAgICBvbkFuaW1hdGlvbkNvbXBsZXRlKGNhbmNlbGxlZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5lcjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbnM7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBhY2thZ2VBbmltYXRpb25zKGVsZW1lbnQsIGV2ZW50LCBvcHRpb25zLCBhbmltYXRpb25zLCBmbk5hbWUpIHtcbiAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBncm91cEV2ZW50ZWRBbmltYXRpb25zKGVsZW1lbnQsIGV2ZW50LCBvcHRpb25zLCBhbmltYXRpb25zLCBmbk5hbWUpO1xuICAgICAgICBpZiAob3BlcmF0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB2YXIgYSxiO1xuICAgICAgICAgIGlmIChmbk5hbWUgPT09ICdiZWZvcmVTZXRDbGFzcycpIHtcbiAgICAgICAgICAgIGEgPSBncm91cEV2ZW50ZWRBbmltYXRpb25zKGVsZW1lbnQsICdyZW1vdmVDbGFzcycsIG9wdGlvbnMsIGFuaW1hdGlvbnMsICdiZWZvcmVSZW1vdmVDbGFzcycpO1xuICAgICAgICAgICAgYiA9IGdyb3VwRXZlbnRlZEFuaW1hdGlvbnMoZWxlbWVudCwgJ2FkZENsYXNzJywgb3B0aW9ucywgYW5pbWF0aW9ucywgJ2JlZm9yZUFkZENsYXNzJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChmbk5hbWUgPT09ICdzZXRDbGFzcycpIHtcbiAgICAgICAgICAgIGEgPSBncm91cEV2ZW50ZWRBbmltYXRpb25zKGVsZW1lbnQsICdyZW1vdmVDbGFzcycsIG9wdGlvbnMsIGFuaW1hdGlvbnMsICdyZW1vdmVDbGFzcycpO1xuICAgICAgICAgICAgYiA9IGdyb3VwRXZlbnRlZEFuaW1hdGlvbnMoZWxlbWVudCwgJ2FkZENsYXNzJywgb3B0aW9ucywgYW5pbWF0aW9ucywgJ2FkZENsYXNzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zLmNvbmNhdChhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGIpIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zLmNvbmNhdChiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3BlcmF0aW9ucy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICAvLyBUT0RPKG1hdHNrbyk6IGFkZCBkb2N1bWVudGF0aW9uXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBzdGFydEFuaW1hdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBydW5uZXJzID0gW107XG4gICAgICAgICAgaWYgKG9wZXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3JFYWNoKG9wZXJhdGlvbnMsIGZ1bmN0aW9uKGFuaW1hdGVGbikge1xuICAgICAgICAgICAgICBydW5uZXJzLnB1c2goYW5pbWF0ZUZuKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcnVubmVycy5sZW5ndGggPyAkJEFuaW1hdGVSdW5uZXIuYWxsKHJ1bm5lcnMsIGNhbGxiYWNrKSA6IGNhbGxiYWNrKCk7XG5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gZW5kRm4ocmVqZWN0KSB7XG4gICAgICAgICAgICBmb3JFYWNoKHJ1bm5lcnMsIGZ1bmN0aW9uKHJ1bm5lcikge1xuICAgICAgICAgICAgICByZWplY3QgPyBydW5uZXIuY2FuY2VsKCkgOiBydW5uZXIuZW5kKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb29rdXBBbmltYXRpb25zKGNsYXNzZXMpIHtcbiAgICAgIGNsYXNzZXMgPSBpc0FycmF5KGNsYXNzZXMpID8gY2xhc3NlcyA6IGNsYXNzZXMuc3BsaXQoJyAnKTtcbiAgICAgIHZhciBtYXRjaGVzID0gW10sIGZsYWdNYXAgPSB7fTtcbiAgICAgIGZvciAodmFyIGk9MDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtsYXNzID0gY2xhc3Nlc1tpXSxcbiAgICAgICAgICAgIGFuaW1hdGlvbkZhY3RvcnkgPSAkYW5pbWF0ZVByb3ZpZGVyLiQkcmVnaXN0ZXJlZEFuaW1hdGlvbnNba2xhc3NdO1xuICAgICAgICBpZiAoYW5pbWF0aW9uRmFjdG9yeSAmJiAhZmxhZ01hcFtrbGFzc10pIHtcbiAgICAgICAgICBtYXRjaGVzLnB1c2goJGluamVjdG9yLmdldChhbmltYXRpb25GYWN0b3J5KSk7XG4gICAgICAgICAgZmxhZ01hcFtrbGFzc10gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG4gIH1dO1xufV07XG5cbnZhciAkJEFuaW1hdGVKc0RyaXZlclByb3ZpZGVyID0gWyckJGFuaW1hdGlvblByb3ZpZGVyJywgZnVuY3Rpb24oJCRhbmltYXRpb25Qcm92aWRlcikge1xuICAkJGFuaW1hdGlvblByb3ZpZGVyLmRyaXZlcnMucHVzaCgnJCRhbmltYXRlSnNEcml2ZXInKTtcbiAgdGhpcy4kZ2V0ID0gWyckJGFuaW1hdGVKcycsICckJEFuaW1hdGVSdW5uZXInLCBmdW5jdGlvbigkJGFuaW1hdGVKcywgJCRBbmltYXRlUnVubmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGluaXREcml2ZXJGbihhbmltYXRpb25EZXRhaWxzKSB7XG4gICAgICBpZiAoYW5pbWF0aW9uRGV0YWlscy5mcm9tICYmIGFuaW1hdGlvbkRldGFpbHMudG8pIHtcbiAgICAgICAgdmFyIGZyb21BbmltYXRpb24gPSBwcmVwYXJlQW5pbWF0aW9uKGFuaW1hdGlvbkRldGFpbHMuZnJvbSk7XG4gICAgICAgIHZhciB0b0FuaW1hdGlvbiA9IHByZXBhcmVBbmltYXRpb24oYW5pbWF0aW9uRGV0YWlscy50byk7XG4gICAgICAgIGlmICghZnJvbUFuaW1hdGlvbiAmJiAhdG9BbmltYXRpb24pIHJldHVybjtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhbmltYXRpb25SdW5uZXJzID0gW107XG5cbiAgICAgICAgICAgIGlmIChmcm9tQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgIGFuaW1hdGlvblJ1bm5lcnMucHVzaChmcm9tQW5pbWF0aW9uLnN0YXJ0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9BbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgYW5pbWF0aW9uUnVubmVycy5wdXNoKHRvQW5pbWF0aW9uLnN0YXJ0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkJEFuaW1hdGVSdW5uZXIuYWxsKGFuaW1hdGlvblJ1bm5lcnMsIGRvbmUpO1xuXG4gICAgICAgICAgICB2YXIgcnVubmVyID0gbmV3ICQkQW5pbWF0ZVJ1bm5lcih7XG4gICAgICAgICAgICAgIGVuZDogZW5kRm5GYWN0b3J5KCksXG4gICAgICAgICAgICAgIGNhbmNlbDogZW5kRm5GYWN0b3J5KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcnVubmVyO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBlbmRGbkZhY3RvcnkoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBmb3JFYWNoKGFuaW1hdGlvblJ1bm5lcnMsIGZ1bmN0aW9uKHJ1bm5lcikge1xuICAgICAgICAgICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB3ZSBjYW5ub3QgY2FuY2VsIGFuaW1hdGlvbnMgZm9yIGdyb3VwcyBqdXN0IHlldC4gMS41K1xuICAgICAgICAgICAgICAgICAgcnVubmVyLmVuZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBkb25lKHN0YXR1cykge1xuICAgICAgICAgICAgICBydW5uZXIuY29tcGxldGUoc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJlcGFyZUFuaW1hdGlvbihhbmltYXRpb25EZXRhaWxzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJlcGFyZUFuaW1hdGlvbihhbmltYXRpb25EZXRhaWxzKSB7XG4gICAgICAvLyBUT0RPKG1hdHNrbyk6IG1ha2Ugc3VyZSB0byBjaGVjayBmb3IgZ3JvdXBlZCBhbmltYXRpb25zIGFuZCBkZWxlZ2F0ZSBkb3duIHRvIG5vcm1hbCBhbmltYXRpb25zXG4gICAgICB2YXIgZWxlbWVudCA9IGFuaW1hdGlvbkRldGFpbHMuZWxlbWVudDtcbiAgICAgIHZhciBldmVudCA9IGFuaW1hdGlvbkRldGFpbHMuZXZlbnQ7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFuaW1hdGlvbkRldGFpbHMub3B0aW9ucztcbiAgICAgIHZhciBjbGFzc2VzID0gYW5pbWF0aW9uRGV0YWlscy5jbGFzc2VzO1xuICAgICAgcmV0dXJuICQkYW5pbWF0ZUpzKGVsZW1lbnQsIGV2ZW50LCBjbGFzc2VzLCBvcHRpb25zKTtcbiAgICB9XG4gIH1dO1xufV07XG5cbnZhciBOR19BTklNQVRFX0FUVFJfTkFNRSA9ICdkYXRhLW5nLWFuaW1hdGUnO1xudmFyIE5HX0FOSU1BVEVfUElOX0RBVEEgPSAnJG5nQW5pbWF0ZVBpbic7XG52YXIgJCRBbmltYXRlUXVldWVQcm92aWRlciA9IFsnJGFuaW1hdGVQcm92aWRlcicsIGZ1bmN0aW9uKCRhbmltYXRlUHJvdmlkZXIpIHtcbiAgdmFyIFBSRV9ESUdFU1RfU1RBVEUgPSAxO1xuICB2YXIgUlVOTklOR19TVEFURSA9IDI7XG5cbiAgdmFyIHJ1bGVzID0gdGhpcy5ydWxlcyA9IHtcbiAgICBza2lwOiBbXSxcbiAgICBjYW5jZWw6IFtdLFxuICAgIGpvaW46IFtdXG4gIH07XG5cbiAgZnVuY3Rpb24gaXNBbGxvd2VkKHJ1bGVUeXBlLCBlbGVtZW50LCBjdXJyZW50QW5pbWF0aW9uLCBwcmV2aW91c0FuaW1hdGlvbikge1xuICAgIHJldHVybiBydWxlc1tydWxlVHlwZV0uc29tZShmdW5jdGlvbihmbikge1xuICAgICAgcmV0dXJuIGZuKGVsZW1lbnQsIGN1cnJlbnRBbmltYXRpb24sIHByZXZpb3VzQW5pbWF0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc0FuaW1hdGlvbkNsYXNzZXMob3B0aW9ucywgYW5kKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGEgPSAob3B0aW9ucy5hZGRDbGFzcyB8fCAnJykubGVuZ3RoID4gMDtcbiAgICB2YXIgYiA9IChvcHRpb25zLnJlbW92ZUNsYXNzIHx8ICcnKS5sZW5ndGggPiAwO1xuICAgIHJldHVybiBhbmQgPyBhICYmIGIgOiBhIHx8IGI7XG4gIH1cblxuICBydWxlcy5qb2luLnB1c2goZnVuY3Rpb24oZWxlbWVudCwgbmV3QW5pbWF0aW9uLCBjdXJyZW50QW5pbWF0aW9uKSB7XG4gICAgLy8gaWYgdGhlIG5ldyBhbmltYXRpb24gaXMgY2xhc3MtYmFzZWQgdGhlbiB3ZSBjYW4ganVzdCB0YWNrIHRoYXQgb25cbiAgICByZXR1cm4gIW5ld0FuaW1hdGlvbi5zdHJ1Y3R1cmFsICYmIGhhc0FuaW1hdGlvbkNsYXNzZXMobmV3QW5pbWF0aW9uLm9wdGlvbnMpO1xuICB9KTtcblxuICBydWxlcy5za2lwLnB1c2goZnVuY3Rpb24oZWxlbWVudCwgbmV3QW5pbWF0aW9uLCBjdXJyZW50QW5pbWF0aW9uKSB7XG4gICAgLy8gdGhlcmUgaXMgbm8gbmVlZCB0byBhbmltYXRlIGFueXRoaW5nIGlmIG5vIGNsYXNzZXMgYXJlIGJlaW5nIGFkZGVkIGFuZFxuICAgIC8vIHRoZXJlIGlzIG5vIHN0cnVjdHVyYWwgYW5pbWF0aW9uIHRoYXQgd2lsbCBiZSB0cmlnZ2VyZWRcbiAgICByZXR1cm4gIW5ld0FuaW1hdGlvbi5zdHJ1Y3R1cmFsICYmICFoYXNBbmltYXRpb25DbGFzc2VzKG5ld0FuaW1hdGlvbi5vcHRpb25zKTtcbiAgfSk7XG5cbiAgcnVsZXMuc2tpcC5wdXNoKGZ1bmN0aW9uKGVsZW1lbnQsIG5ld0FuaW1hdGlvbiwgY3VycmVudEFuaW1hdGlvbikge1xuICAgIC8vIHdoeSBzaG91bGQgd2UgdHJpZ2dlciBhIG5ldyBzdHJ1Y3R1cmFsIGFuaW1hdGlvbiBpZiB0aGUgZWxlbWVudCB3aWxsXG4gICAgLy8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBET00gYW55d2F5P1xuICAgIHJldHVybiBjdXJyZW50QW5pbWF0aW9uLmV2ZW50ID09ICdsZWF2ZScgJiYgbmV3QW5pbWF0aW9uLnN0cnVjdHVyYWw7XG4gIH0pO1xuXG4gIHJ1bGVzLnNraXAucHVzaChmdW5jdGlvbihlbGVtZW50LCBuZXdBbmltYXRpb24sIGN1cnJlbnRBbmltYXRpb24pIHtcbiAgICAvLyBpZiB0aGVyZSBpcyBhbiBvbmdvaW5nIGN1cnJlbnQgYW5pbWF0aW9uIHRoZW4gZG9uJ3QgZXZlbiBib3RoZXIgcnVubmluZyB0aGUgY2xhc3MtYmFzZWQgYW5pbWF0aW9uXG4gICAgcmV0dXJuIGN1cnJlbnRBbmltYXRpb24uc3RydWN0dXJhbCAmJiBjdXJyZW50QW5pbWF0aW9uLnN0YXRlID09PSBSVU5OSU5HX1NUQVRFICYmICFuZXdBbmltYXRpb24uc3RydWN0dXJhbDtcbiAgfSk7XG5cbiAgcnVsZXMuY2FuY2VsLnB1c2goZnVuY3Rpb24oZWxlbWVudCwgbmV3QW5pbWF0aW9uLCBjdXJyZW50QW5pbWF0aW9uKSB7XG4gICAgLy8gdGhlcmUgY2FuIG5ldmVyIGJlIHR3byBzdHJ1Y3R1cmFsIGFuaW1hdGlvbnMgcnVubmluZyBhdCB0aGUgc2FtZSB0aW1lXG4gICAgcmV0dXJuIGN1cnJlbnRBbmltYXRpb24uc3RydWN0dXJhbCAmJiBuZXdBbmltYXRpb24uc3RydWN0dXJhbDtcbiAgfSk7XG5cbiAgcnVsZXMuY2FuY2VsLnB1c2goZnVuY3Rpb24oZWxlbWVudCwgbmV3QW5pbWF0aW9uLCBjdXJyZW50QW5pbWF0aW9uKSB7XG4gICAgLy8gaWYgdGhlIHByZXZpb3VzIGFuaW1hdGlvbiBpcyBhbHJlYWR5IHJ1bm5pbmcsIGJ1dCB0aGUgbmV3IGFuaW1hdGlvbiB3aWxsXG4gICAgLy8gYmUgdHJpZ2dlcmVkLCBidXQgdGhlIG5ldyBhbmltYXRpb24gaXMgc3RydWN0dXJhbFxuICAgIHJldHVybiBjdXJyZW50QW5pbWF0aW9uLnN0YXRlID09PSBSVU5OSU5HX1NUQVRFICYmIG5ld0FuaW1hdGlvbi5zdHJ1Y3R1cmFsO1xuICB9KTtcblxuICBydWxlcy5jYW5jZWwucHVzaChmdW5jdGlvbihlbGVtZW50LCBuZXdBbmltYXRpb24sIGN1cnJlbnRBbmltYXRpb24pIHtcbiAgICB2YXIgbk8gPSBuZXdBbmltYXRpb24ub3B0aW9ucztcbiAgICB2YXIgY08gPSBjdXJyZW50QW5pbWF0aW9uLm9wdGlvbnM7XG5cbiAgICAvLyBpZiB0aGUgZXhhY3Qgc2FtZSBDU1MgY2xhc3MgaXMgYWRkZWQvcmVtb3ZlZCB0aGVuIGl0J3Mgc2FmZSB0byBjYW5jZWwgaXRcbiAgICByZXR1cm4gKG5PLmFkZENsYXNzICYmIG5PLmFkZENsYXNzID09PSBjTy5yZW1vdmVDbGFzcykgfHwgKG5PLnJlbW92ZUNsYXNzICYmIG5PLnJlbW92ZUNsYXNzID09PSBjTy5hZGRDbGFzcyk7XG4gIH0pO1xuXG4gIHRoaXMuJGdldCA9IFsnJCRyQUYnLCAnJHJvb3RTY29wZScsICckcm9vdEVsZW1lbnQnLCAnJGRvY3VtZW50JywgJyQkSGFzaE1hcCcsXG4gICAgICAgICAgICAgICAnJCRhbmltYXRpb24nLCAnJCRBbmltYXRlUnVubmVyJywgJyR0ZW1wbGF0ZVJlcXVlc3QnLCAnJCRqcUxpdGUnLCAnJCRmb3JjZVJlZmxvdycsXG4gICAgICAgZnVuY3Rpb24oJCRyQUYsICAgJHJvb3RTY29wZSwgICAkcm9vdEVsZW1lbnQsICAgJGRvY3VtZW50LCAgICQkSGFzaE1hcCxcbiAgICAgICAgICAgICAgICAkJGFuaW1hdGlvbiwgICAkJEFuaW1hdGVSdW5uZXIsICAgJHRlbXBsYXRlUmVxdWVzdCwgICAkJGpxTGl0ZSwgICAkJGZvcmNlUmVmbG93KSB7XG5cbiAgICB2YXIgYWN0aXZlQW5pbWF0aW9uc0xvb2t1cCA9IG5ldyAkJEhhc2hNYXAoKTtcbiAgICB2YXIgZGlzYWJsZWRFbGVtZW50c0xvb2t1cCA9IG5ldyAkJEhhc2hNYXAoKTtcbiAgICB2YXIgYW5pbWF0aW9uc0VuYWJsZWQgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gcG9zdERpZ2VzdFRhc2tGYWN0b3J5KCkge1xuICAgICAgdmFyIHBvc3REaWdlc3RDYWxsZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmdW5jdGlvbihmbikge1xuICAgICAgICAvLyB3ZSBvbmx5IGlzc3VlIGEgY2FsbCB0byBwb3N0RGlnZXN0IGJlZm9yZVxuICAgICAgICAvLyBpdCBoYXMgZmlyc3QgcGFzc2VkLiBUaGlzIHByZXZlbnRzIGFueSBjYWxsYmFja3NcbiAgICAgICAgLy8gZnJvbSBub3QgZmlyaW5nIG9uY2UgdGhlIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkXG4gICAgICAgIC8vIHNpbmNlIGl0IHdpbGwgYmUgb3V0IG9mIHRoZSBkaWdlc3QgY3ljbGUuXG4gICAgICAgIGlmIChwb3N0RGlnZXN0Q2FsbGVkKSB7XG4gICAgICAgICAgZm4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLiQkcG9zdERpZ2VzdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBvc3REaWdlc3RDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBXYWl0IHVudGlsIGFsbCBkaXJlY3RpdmUgYW5kIHJvdXRlLXJlbGF0ZWQgdGVtcGxhdGVzIGFyZSBkb3dubG9hZGVkIGFuZFxuICAgIC8vIGNvbXBpbGVkLiBUaGUgJHRlbXBsYXRlUmVxdWVzdC50b3RhbFBlbmRpbmdSZXF1ZXN0cyB2YXJpYWJsZSBrZWVwcyB0cmFjayBvZlxuICAgIC8vIGFsbCBvZiB0aGUgcmVtb3RlIHRlbXBsYXRlcyBiZWluZyBjdXJyZW50bHkgZG93bmxvYWRlZC4gSWYgdGhlcmUgYXJlIG5vXG4gICAgLy8gdGVtcGxhdGVzIGN1cnJlbnRseSBkb3dubG9hZGluZyB0aGVuIHRoZSB3YXRjaGVyIHdpbGwgc3RpbGwgZmlyZSBhbnl3YXkuXG4gICAgdmFyIGRlcmVnaXN0ZXJXYXRjaCA9ICRyb290U2NvcGUuJHdhdGNoKFxuICAgICAgZnVuY3Rpb24oKSB7IHJldHVybiAkdGVtcGxhdGVSZXF1ZXN0LnRvdGFsUGVuZGluZ1JlcXVlc3RzID09PSAwOyB9LFxuICAgICAgZnVuY3Rpb24oaXNFbXB0eSkge1xuICAgICAgICBpZiAoIWlzRW1wdHkpIHJldHVybjtcbiAgICAgICAgZGVyZWdpc3RlcldhdGNoKCk7XG5cbiAgICAgICAgLy8gTm93IHRoYXQgYWxsIHRlbXBsYXRlcyBoYXZlIGJlZW4gZG93bmxvYWRlZCwgJGFuaW1hdGUgd2lsbCB3YWl0IHVudGlsXG4gICAgICAgIC8vIHRoZSBwb3N0IGRpZ2VzdCBxdWV1ZSBpcyBlbXB0eSBiZWZvcmUgZW5hYmxpbmcgYW5pbWF0aW9ucy4gQnkgaGF2aW5nIHR3b1xuICAgICAgICAvLyBjYWxscyB0byAkcG9zdERpZ2VzdCBjYWxscyB3ZSBjYW4gZW5zdXJlIHRoYXQgdGhlIGZsYWcgaXMgZW5hYmxlZCBhdCB0aGVcbiAgICAgICAgLy8gdmVyeSBlbmQgb2YgdGhlIHBvc3QgZGlnZXN0IHF1ZXVlLiBTaW5jZSBhbGwgb2YgdGhlIGFuaW1hdGlvbnMgaW4gJGFuaW1hdGVcbiAgICAgICAgLy8gdXNlICRwb3N0RGlnZXN0LCBpdCdzIGltcG9ydGFudCB0aGF0IHRoZSBjb2RlIGJlbG93IGV4ZWN1dGVzIGF0IHRoZSBlbmQuXG4gICAgICAgIC8vIFRoaXMgYmFzaWNhbGx5IG1lYW5zIHRoYXQgdGhlIHBhZ2UgaXMgZnVsbHkgZG93bmxvYWRlZCBhbmQgY29tcGlsZWQgYmVmb3JlXG4gICAgICAgIC8vIGFueSBhbmltYXRpb25zIGFyZSB0cmlnZ2VyZWQuXG4gICAgICAgICRyb290U2NvcGUuJCRwb3N0RGlnZXN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRyb290U2NvcGUuJCRwb3N0RGlnZXN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gd2UgY2hlY2sgZm9yIG51bGwgZGlyZWN0bHkgaW4gdGhlIGV2ZW50IHRoYXQgdGhlIGFwcGxpY2F0aW9uIGFscmVhZHkgY2FsbGVkXG4gICAgICAgICAgICAvLyAuZW5hYmxlZCgpIHdpdGggd2hhdGV2ZXIgYXJndW1lbnRzIHRoYXQgaXQgcHJvdmlkZWQgaXQgd2l0aFxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbnNFbmFibGVkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGFuaW1hdGlvbnNFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIHZhciBjYWxsYmFja1JlZ2lzdHJ5ID0ge307XG5cbiAgICAvLyByZW1lbWJlciB0aGF0IHRoZSBjbGFzc05hbWVGaWx0ZXIgaXMgc2V0IGR1cmluZyB0aGUgcHJvdmlkZXIvY29uZmlnXG4gICAgLy8gc3RhZ2UgdGhlcmVmb3JlIHdlIGNhbiBvcHRpbWl6ZSBoZXJlIGFuZCBzZXR1cCBhIGhlbHBlciBmdW5jdGlvblxuICAgIHZhciBjbGFzc05hbWVGaWx0ZXIgPSAkYW5pbWF0ZVByb3ZpZGVyLmNsYXNzTmFtZUZpbHRlcigpO1xuICAgIHZhciBpc0FuaW1hdGFibGVDbGFzc05hbWUgPSAhY2xhc3NOYW1lRmlsdGVyXG4gICAgICAgICAgICAgID8gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgICAgICAgIDogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZUZpbHRlci50ZXN0KGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgIH07XG5cbiAgICB2YXIgYXBwbHlBbmltYXRpb25DbGFzc2VzID0gYXBwbHlBbmltYXRpb25DbGFzc2VzRmFjdG9yeSgkJGpxTGl0ZSk7XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVBbmltYXRpb25PcHRpb25zKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBtZXJnZUFuaW1hdGlvbk9wdGlvbnMoZWxlbWVudCwgb3B0aW9ucywge30pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRDYWxsYmFja3MocGFyZW50LCBlbGVtZW50LCBldmVudCkge1xuICAgICAgdmFyIHRhcmdldE5vZGUgPSBnZXREb21Ob2RlKGVsZW1lbnQpO1xuICAgICAgdmFyIHRhcmdldFBhcmVudE5vZGUgPSBnZXREb21Ob2RlKHBhcmVudCk7XG5cbiAgICAgIHZhciBtYXRjaGVzID0gW107XG4gICAgICB2YXIgZW50cmllcyA9IGNhbGxiYWNrUmVnaXN0cnlbZXZlbnRdO1xuICAgICAgaWYgKGVudHJpZXMpIHtcbiAgICAgICAgZm9yRWFjaChlbnRyaWVzLCBmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgIGlmIChlbnRyeS5ub2RlLmNvbnRhaW5zKHRhcmdldE5vZGUpKSB7XG4gICAgICAgICAgICBtYXRjaGVzLnB1c2goZW50cnkuY2FsbGJhY2spO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09ICdsZWF2ZScgJiYgZW50cnkubm9kZS5jb250YWlucyh0YXJnZXRQYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGVudHJ5LmNhbGxiYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgb246IGZ1bmN0aW9uKGV2ZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBub2RlID0gZXh0cmFjdEVsZW1lbnROb2RlKGNvbnRhaW5lcik7XG4gICAgICAgIGNhbGxiYWNrUmVnaXN0cnlbZXZlbnRdID0gY2FsbGJhY2tSZWdpc3RyeVtldmVudF0gfHwgW107XG4gICAgICAgIGNhbGxiYWNrUmVnaXN0cnlbZXZlbnRdLnB1c2goe1xuICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgb2ZmOiBmdW5jdGlvbihldmVudCwgY29udGFpbmVyLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZW50cmllcyA9IGNhbGxiYWNrUmVnaXN0cnlbZXZlbnRdO1xuICAgICAgICBpZiAoIWVudHJpZXMpIHJldHVybjtcblxuICAgICAgICBjYWxsYmFja1JlZ2lzdHJ5W2V2ZW50XSA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgOiBmaWx0ZXJGcm9tUmVnaXN0cnkoZW50cmllcywgY29udGFpbmVyLCBjYWxsYmFjayk7XG5cbiAgICAgICAgZnVuY3Rpb24gZmlsdGVyRnJvbVJlZ2lzdHJ5KGxpc3QsIG1hdGNoQ29udGFpbmVyLCBtYXRjaENhbGxiYWNrKSB7XG4gICAgICAgICAgdmFyIGNvbnRhaW5lck5vZGUgPSBleHRyYWN0RWxlbWVudE5vZGUobWF0Y2hDb250YWluZXIpO1xuICAgICAgICAgIHJldHVybiBsaXN0LmZpbHRlcihmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgdmFyIGlzTWF0Y2ggPSBlbnRyeS5ub2RlID09PSBjb250YWluZXJOb2RlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFtYXRjaENhbGxiYWNrIHx8IGVudHJ5LmNhbGxiYWNrID09PSBtYXRjaENhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybiAhaXNNYXRjaDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgcGluOiBmdW5jdGlvbihlbGVtZW50LCBwYXJlbnRFbGVtZW50KSB7XG4gICAgICAgIGFzc2VydEFyZyhpc0VsZW1lbnQoZWxlbWVudCksICdlbGVtZW50JywgJ25vdCBhbiBlbGVtZW50Jyk7XG4gICAgICAgIGFzc2VydEFyZyhpc0VsZW1lbnQocGFyZW50RWxlbWVudCksICdwYXJlbnRFbGVtZW50JywgJ25vdCBhbiBlbGVtZW50Jyk7XG4gICAgICAgIGVsZW1lbnQuZGF0YShOR19BTklNQVRFX1BJTl9EQVRBLCBwYXJlbnRFbGVtZW50KTtcbiAgICAgIH0sXG5cbiAgICAgIHB1c2g6IGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBvcHRpb25zLCBkb21PcGVyYXRpb24pIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIG9wdGlvbnMuZG9tT3BlcmF0aW9uID0gZG9tT3BlcmF0aW9uO1xuICAgICAgICByZXR1cm4gcXVldWVBbmltYXRpb24oZWxlbWVudCwgZXZlbnQsIG9wdGlvbnMpO1xuICAgICAgfSxcblxuICAgICAgLy8gdGhpcyBtZXRob2QgaGFzIGZvdXIgc2lnbmF0dXJlczpcbiAgICAgIC8vICAoKSAtIGdsb2JhbCBnZXR0ZXJcbiAgICAgIC8vICAoYm9vbCkgLSBnbG9iYWwgc2V0dGVyXG4gICAgICAvLyAgKGVsZW1lbnQpIC0gZWxlbWVudCBnZXR0ZXJcbiAgICAgIC8vICAoZWxlbWVudCwgYm9vbCkgLSBlbGVtZW50IHNldHRlcjxGMzc+XG4gICAgICBlbmFibGVkOiBmdW5jdGlvbihlbGVtZW50LCBib29sKSB7XG4gICAgICAgIHZhciBhcmdDb3VudCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGFyZ0NvdW50ID09PSAwKSB7XG4gICAgICAgICAgLy8gKCkgLSBHbG9iYWwgZ2V0dGVyXG4gICAgICAgICAgYm9vbCA9ICEhYW5pbWF0aW9uc0VuYWJsZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGhhc0VsZW1lbnQgPSBpc0VsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAgICAgICBpZiAoIWhhc0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIChib29sKSAtIEdsb2JhbCBzZXR0ZXJcbiAgICAgICAgICAgIGJvb2wgPSBhbmltYXRpb25zRW5hYmxlZCA9ICEhZWxlbWVudDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBnZXREb21Ob2RlKGVsZW1lbnQpO1xuICAgICAgICAgICAgdmFyIHJlY29yZEV4aXN0cyA9IGRpc2FibGVkRWxlbWVudHNMb29rdXAuZ2V0KG5vZGUpO1xuXG4gICAgICAgICAgICBpZiAoYXJnQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgLy8gKGVsZW1lbnQpIC0gRWxlbWVudCBnZXR0ZXJcbiAgICAgICAgICAgICAgYm9vbCA9ICFyZWNvcmRFeGlzdHM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyAoZWxlbWVudCwgYm9vbCkgLSBFbGVtZW50IHNldHRlclxuICAgICAgICAgICAgICBib29sID0gISFib29sO1xuICAgICAgICAgICAgICBpZiAoIWJvb2wpIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZEVsZW1lbnRzTG9va3VwLnB1dChub2RlLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZWNvcmRFeGlzdHMpIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZEVsZW1lbnRzTG9va3VwLnJlbW92ZShub2RlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib29sO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBxdWV1ZUFuaW1hdGlvbihlbGVtZW50LCBldmVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIG5vZGUsIHBhcmVudDtcbiAgICAgIGVsZW1lbnQgPSBzdHJpcENvbW1lbnRzRnJvbUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBub2RlID0gZ2V0RG9tTm9kZShlbGVtZW50KTtcbiAgICAgICAgcGFyZW50ID0gZWxlbWVudC5wYXJlbnQoKTtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IHByZXBhcmVBbmltYXRpb25PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgICAvLyB3ZSBjcmVhdGUgYSBmYWtlIHJ1bm5lciB3aXRoIGEgd29ya2luZyBwcm9taXNlLlxuICAgICAgLy8gVGhlc2UgbWV0aG9kcyB3aWxsIGJlY29tZSBhdmFpbGFibGUgYWZ0ZXIgdGhlIGRpZ2VzdCBoYXMgcGFzc2VkXG4gICAgICB2YXIgcnVubmVyID0gbmV3ICQkQW5pbWF0ZVJ1bm5lcigpO1xuXG4gICAgICAvLyB0aGlzIGlzIHVzZWQgdG8gdHJpZ2dlciBjYWxsYmFja3MgaW4gcG9zdERpZ2VzdCBtb2RlXG4gICAgICB2YXIgcnVuSW5OZXh0UG9zdERpZ2VzdE9yTm93ID0gcG9zdERpZ2VzdFRhc2tGYWN0b3J5KCk7XG5cbiAgICAgIGlmIChpc0FycmF5KG9wdGlvbnMuYWRkQ2xhc3MpKSB7XG4gICAgICAgIG9wdGlvbnMuYWRkQ2xhc3MgPSBvcHRpb25zLmFkZENsYXNzLmpvaW4oJyAnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuYWRkQ2xhc3MgJiYgIWlzU3RyaW5nKG9wdGlvbnMuYWRkQ2xhc3MpKSB7XG4gICAgICAgIG9wdGlvbnMuYWRkQ2xhc3MgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNBcnJheShvcHRpb25zLnJlbW92ZUNsYXNzKSkge1xuICAgICAgICBvcHRpb25zLnJlbW92ZUNsYXNzID0gb3B0aW9ucy5yZW1vdmVDbGFzcy5qb2luKCcgJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLnJlbW92ZUNsYXNzICYmICFpc1N0cmluZyhvcHRpb25zLnJlbW92ZUNsYXNzKSkge1xuICAgICAgICBvcHRpb25zLnJlbW92ZUNsYXNzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuZnJvbSAmJiAhaXNPYmplY3Qob3B0aW9ucy5mcm9tKSkge1xuICAgICAgICBvcHRpb25zLmZyb20gPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy50byAmJiAhaXNPYmplY3Qob3B0aW9ucy50bykpIHtcbiAgICAgICAgb3B0aW9ucy50byA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoZXJlIGFyZSBzaXR1YXRpb25zIHdoZXJlIGEgZGlyZWN0aXZlIGlzc3VlcyBhbiBhbmltYXRpb24gZm9yXG4gICAgICAvLyBhIGpxTGl0ZSB3cmFwcGVyIHRoYXQgY29udGFpbnMgb25seSBjb21tZW50IG5vZGVzLi4uIElmIHRoaXNcbiAgICAgIC8vIGhhcHBlbnMgdGhlbiB0aGVyZSBpcyBubyB3YXkgd2UgY2FuIHBlcmZvcm0gYW4gYW5pbWF0aW9uXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIHJ1bm5lcjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNsYXNzTmFtZSA9IFtub2RlLmNsYXNzTmFtZSwgb3B0aW9ucy5hZGRDbGFzcywgb3B0aW9ucy5yZW1vdmVDbGFzc10uam9pbignICcpO1xuICAgICAgaWYgKCFpc0FuaW1hdGFibGVDbGFzc05hbWUoY2xhc3NOYW1lKSkge1xuICAgICAgICBjbG9zZSgpO1xuICAgICAgICByZXR1cm4gcnVubmVyO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXNTdHJ1Y3R1cmFsID0gWydlbnRlcicsICdtb3ZlJywgJ2xlYXZlJ10uaW5kZXhPZihldmVudCkgPj0gMDtcblxuICAgICAgLy8gdGhpcyBpcyBhIGhhcmQgZGlzYWJsZSBvZiBhbGwgYW5pbWF0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIG9yIG9uXG4gICAgICAvLyB0aGUgZWxlbWVudCBpdHNlbGYsIHRoZXJlZm9yZSAgdGhlcmUgaXMgbm8gbmVlZCB0byBjb250aW51ZSBmdXJ0aGVyXG4gICAgICAvLyBwYXN0IHRoaXMgcG9pbnQgaWYgbm90IGVuYWJsZWRcbiAgICAgIHZhciBza2lwQW5pbWF0aW9ucyA9ICFhbmltYXRpb25zRW5hYmxlZCB8fCBkaXNhYmxlZEVsZW1lbnRzTG9va3VwLmdldChub2RlKTtcbiAgICAgIHZhciBleGlzdGluZ0FuaW1hdGlvbiA9ICghc2tpcEFuaW1hdGlvbnMgJiYgYWN0aXZlQW5pbWF0aW9uc0xvb2t1cC5nZXQobm9kZSkpIHx8IHt9O1xuICAgICAgdmFyIGhhc0V4aXN0aW5nQW5pbWF0aW9uID0gISFleGlzdGluZ0FuaW1hdGlvbi5zdGF0ZTtcblxuICAgICAgLy8gdGhlcmUgaXMgbm8gcG9pbnQgaW4gdHJhdmVyc2luZyB0aGUgc2FtZSBjb2xsZWN0aW9uIG9mIHBhcmVudCBhbmNlc3RvcnMgaWYgYSBmb2xsb3d1cFxuICAgICAgLy8gYW5pbWF0aW9uIHdpbGwgYmUgcnVuIG9uIHRoZSBzYW1lIGVsZW1lbnQgdGhhdCBhbHJlYWR5IGRpZCBhbGwgdGhhdCBjaGVja2luZyB3b3JrXG4gICAgICBpZiAoIXNraXBBbmltYXRpb25zICYmICghaGFzRXhpc3RpbmdBbmltYXRpb24gfHwgZXhpc3RpbmdBbmltYXRpb24uc3RhdGUgIT0gUFJFX0RJR0VTVF9TVEFURSkpIHtcbiAgICAgICAgc2tpcEFuaW1hdGlvbnMgPSAhYXJlQW5pbWF0aW9uc0FsbG93ZWQoZWxlbWVudCwgcGFyZW50LCBldmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChza2lwQW5pbWF0aW9ucykge1xuICAgICAgICBjbG9zZSgpO1xuICAgICAgICByZXR1cm4gcnVubmVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTdHJ1Y3R1cmFsKSB7XG4gICAgICAgIGNsb3NlQ2hpbGRBbmltYXRpb25zKGVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbmV3QW5pbWF0aW9uID0ge1xuICAgICAgICBzdHJ1Y3R1cmFsOiBpc1N0cnVjdHVyYWwsXG4gICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgY2xvc2U6IGNsb3NlLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICBydW5uZXI6IHJ1bm5lclxuICAgICAgfTtcblxuICAgICAgaWYgKGhhc0V4aXN0aW5nQW5pbWF0aW9uKSB7XG4gICAgICAgIHZhciBza2lwQW5pbWF0aW9uRmxhZyA9IGlzQWxsb3dlZCgnc2tpcCcsIGVsZW1lbnQsIG5ld0FuaW1hdGlvbiwgZXhpc3RpbmdBbmltYXRpb24pO1xuICAgICAgICBpZiAoc2tpcEFuaW1hdGlvbkZsYWcpIHtcbiAgICAgICAgICBpZiAoZXhpc3RpbmdBbmltYXRpb24uc3RhdGUgPT09IFJVTk5JTkdfU1RBVEUpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gcnVubmVyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXJnZUFuaW1hdGlvbk9wdGlvbnMoZWxlbWVudCwgZXhpc3RpbmdBbmltYXRpb24ub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdBbmltYXRpb24ucnVubmVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYW5jZWxBbmltYXRpb25GbGFnID0gaXNBbGxvd2VkKCdjYW5jZWwnLCBlbGVtZW50LCBuZXdBbmltYXRpb24sIGV4aXN0aW5nQW5pbWF0aW9uKTtcbiAgICAgICAgaWYgKGNhbmNlbEFuaW1hdGlvbkZsYWcpIHtcbiAgICAgICAgICBpZiAoZXhpc3RpbmdBbmltYXRpb24uc3RhdGUgPT09IFJVTk5JTkdfU1RBVEUpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgd2lsbCBlbmQgdGhlIGFuaW1hdGlvbiByaWdodCBhd2F5IGFuZCBpdCBpcyBzYWZlXG4gICAgICAgICAgICAvLyB0byBkbyBzbyBzaW5jZSB0aGUgYW5pbWF0aW9uIGlzIGFscmVhZHkgcnVubmluZyBhbmQgdGhlXG4gICAgICAgICAgICAvLyBydW5uZXIgY2FsbGJhY2sgY29kZSB3aWxsIHJ1biBpbiBhc3luY1xuICAgICAgICAgICAgZXhpc3RpbmdBbmltYXRpb24ucnVubmVyLmVuZCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXhpc3RpbmdBbmltYXRpb24uc3RydWN0dXJhbCkge1xuICAgICAgICAgICAgLy8gdGhpcyBtZWFucyB0aGF0IHRoZSBhbmltYXRpb24gaXMgcXVldWVkIGludG8gYSBkaWdlc3QsIGJ1dFxuICAgICAgICAgICAgLy8gaGFzbid0IHN0YXJ0ZWQgeWV0LiBUaGVyZWZvcmUgaXQgaXMgc2FmZSB0byBydW4gdGhlIGNsb3NlXG4gICAgICAgICAgICAvLyBtZXRob2Qgd2hpY2ggd2lsbCBjYWxsIHRoZSBydW5uZXIgbWV0aG9kcyBpbiBhc3luYy5cbiAgICAgICAgICAgIGV4aXN0aW5nQW5pbWF0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgd2lsbCBtZXJnZSB0aGUgbmV3IGFuaW1hdGlvbiBvcHRpb25zIGludG8gZXhpc3RpbmcgYW5pbWF0aW9uIG9wdGlvbnNcbiAgICAgICAgICAgIG1lcmdlQW5pbWF0aW9uT3B0aW9ucyhlbGVtZW50LCBleGlzdGluZ0FuaW1hdGlvbi5vcHRpb25zLCBuZXdBbmltYXRpb24ub3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdBbmltYXRpb24ucnVubmVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhIGpvaW5lZCBhbmltYXRpb24gbWVhbnMgdGhhdCB0aGlzIGFuaW1hdGlvbiB3aWxsIHRha2Ugb3ZlciB0aGUgZXhpc3Rpbmcgb25lXG4gICAgICAgICAgLy8gc28gYW4gZXhhbXBsZSB3b3VsZCBpbnZvbHZlIGEgbGVhdmUgYW5pbWF0aW9uIHRha2luZyBvdmVyIGFuIGVudGVyLiBUaGVuIHdoZW5cbiAgICAgICAgICAvLyB0aGUgcG9zdERpZ2VzdCBraWNrcyBpbiB0aGUgZW50ZXIgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAgICAgIHZhciBqb2luQW5pbWF0aW9uRmxhZyA9IGlzQWxsb3dlZCgnam9pbicsIGVsZW1lbnQsIG5ld0FuaW1hdGlvbiwgZXhpc3RpbmdBbmltYXRpb24pO1xuICAgICAgICAgIGlmIChqb2luQW5pbWF0aW9uRmxhZykge1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nQW5pbWF0aW9uLnN0YXRlID09PSBSVU5OSU5HX1NUQVRFKSB7XG4gICAgICAgICAgICAgIG5vcm1hbGl6ZUFuaW1hdGlvbk9wdGlvbnMoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhcHBseUdlbmVyYXRlZFByZXBhcmF0aW9uQ2xhc3NlcyhlbGVtZW50LCBpc1N0cnVjdHVyYWwgPyBldmVudCA6IG51bGwsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgIGV2ZW50ID0gbmV3QW5pbWF0aW9uLmV2ZW50ID0gZXhpc3RpbmdBbmltYXRpb24uZXZlbnQ7XG4gICAgICAgICAgICAgIG9wdGlvbnMgPSBtZXJnZUFuaW1hdGlvbk9wdGlvbnMoZWxlbWVudCwgZXhpc3RpbmdBbmltYXRpb24ub3B0aW9ucywgbmV3QW5pbWF0aW9uLm9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgIC8vd2UgcmV0dXJuIHRoZSBzYW1lIHJ1bm5lciBzaW5jZSBvbmx5IHRoZSBvcHRpb24gdmFsdWVzIG9mIHRoaXMgYW5pbWF0aW9uIHdpbGxcbiAgICAgICAgICAgICAgLy9iZSBmZWQgaW50byB0aGUgYGV4aXN0aW5nQW5pbWF0aW9uYC5cbiAgICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nQW5pbWF0aW9uLnJ1bm5lcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vcm1hbGl6YXRpb24gaW4gdGhpcyBjYXNlIG1lYW5zIHRoYXQgaXQgcmVtb3ZlcyByZWR1bmRhbnQgQ1NTIGNsYXNzZXMgdGhhdFxuICAgICAgICAvLyBhbHJlYWR5IGV4aXN0IChhZGRDbGFzcykgb3IgZG8gbm90IGV4aXN0IChyZW1vdmVDbGFzcykgb24gdGhlIGVsZW1lbnRcbiAgICAgICAgbm9ybWFsaXplQW5pbWF0aW9uT3B0aW9ucyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgLy8gd2hlbiB0aGUgb3B0aW9ucyBhcmUgbWVyZ2VkIGFuZCBjbGVhbmVkIHVwIHdlIG1heSBlbmQgdXAgbm90IGhhdmluZyB0byBkb1xuICAgICAgLy8gYW4gYW5pbWF0aW9uIGF0IGFsbCwgdGhlcmVmb3JlIHdlIHNob3VsZCBjaGVjayB0aGlzIGJlZm9yZSBpc3N1aW5nIGEgcG9zdFxuICAgICAgLy8gZGlnZXN0IGNhbGxiYWNrLiBTdHJ1Y3R1cmFsIGFuaW1hdGlvbnMgd2lsbCBhbHdheXMgcnVuIG5vIG1hdHRlciB3aGF0LlxuICAgICAgdmFyIGlzVmFsaWRBbmltYXRpb24gPSBuZXdBbmltYXRpb24uc3RydWN0dXJhbDtcbiAgICAgIGlmICghaXNWYWxpZEFuaW1hdGlvbikge1xuICAgICAgICAvLyBhbmltYXRlIChmcm9tL3RvKSBjYW4gYmUgcXVpY2tseSBjaGVja2VkIGZpcnN0LCBvdGhlcndpc2Ugd2UgY2hlY2sgaWYgYW55IGNsYXNzZXMgYXJlIHByZXNlbnRcbiAgICAgICAgaXNWYWxpZEFuaW1hdGlvbiA9IChuZXdBbmltYXRpb24uZXZlbnQgPT09ICdhbmltYXRlJyAmJiBPYmplY3Qua2V5cyhuZXdBbmltYXRpb24ub3B0aW9ucy50byB8fCB7fSkubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBoYXNBbmltYXRpb25DbGFzc2VzKG5ld0FuaW1hdGlvbi5vcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc1ZhbGlkQW5pbWF0aW9uKSB7XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICAgIGNsZWFyRWxlbWVudEFuaW1hdGlvblN0YXRlKGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gcnVubmVyO1xuICAgICAgfVxuXG4gICAgICAvLyB0aGUgY291bnRlciBrZWVwcyB0cmFjayBvZiBjYW5jZWxsZWQgYW5pbWF0aW9uc1xuICAgICAgdmFyIGNvdW50ZXIgPSAoZXhpc3RpbmdBbmltYXRpb24uY291bnRlciB8fCAwKSArIDE7XG4gICAgICBuZXdBbmltYXRpb24uY291bnRlciA9IGNvdW50ZXI7XG5cbiAgICAgIG1hcmtFbGVtZW50QW5pbWF0aW9uU3RhdGUoZWxlbWVudCwgUFJFX0RJR0VTVF9TVEFURSwgbmV3QW5pbWF0aW9uKTtcblxuICAgICAgJHJvb3RTY29wZS4kJHBvc3REaWdlc3QoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhbmltYXRpb25EZXRhaWxzID0gYWN0aXZlQW5pbWF0aW9uc0xvb2t1cC5nZXQobm9kZSk7XG4gICAgICAgIHZhciBhbmltYXRpb25DYW5jZWxsZWQgPSAhYW5pbWF0aW9uRGV0YWlscztcbiAgICAgICAgYW5pbWF0aW9uRGV0YWlscyA9IGFuaW1hdGlvbkRldGFpbHMgfHwge307XG5cbiAgICAgICAgLy8gaWYgYWRkQ2xhc3MvcmVtb3ZlQ2xhc3MgaXMgY2FsbGVkIGJlZm9yZSBzb21ldGhpbmcgbGlrZSBlbnRlciB0aGVuIHRoZVxuICAgICAgICAvLyByZWdpc3RlcmVkIHBhcmVudCBlbGVtZW50IG1heSBub3QgYmUgcHJlc2VudC4gVGhlIGNvZGUgYmVsb3cgd2lsbCBlbnN1cmVcbiAgICAgICAgLy8gdGhhdCBhIGZpbmFsIHZhbHVlIGZvciBwYXJlbnQgZWxlbWVudCBpcyBvYnRhaW5lZFxuICAgICAgICB2YXIgcGFyZW50RWxlbWVudCA9IGVsZW1lbnQucGFyZW50KCkgfHwgW107XG5cbiAgICAgICAgLy8gYW5pbWF0ZS9zdHJ1Y3R1cmFsL2NsYXNzLWJhc2VkIGFuaW1hdGlvbnMgYWxsIGhhdmUgcmVxdWlyZW1lbnRzLiBPdGhlcndpc2UgdGhlcmVcbiAgICAgICAgLy8gaXMgbm8gcG9pbnQgaW4gcGVyZm9ybWluZyBhbiBhbmltYXRpb24uIFRoZSBwYXJlbnQgbm9kZSBtdXN0IGFsc28gYmUgc2V0LlxuICAgICAgICB2YXIgaXNWYWxpZEFuaW1hdGlvbiA9IHBhcmVudEVsZW1lbnQubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAoYW5pbWF0aW9uRGV0YWlscy5ldmVudCA9PT0gJ2FuaW1hdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBhbmltYXRpb25EZXRhaWxzLnN0cnVjdHVyYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGhhc0FuaW1hdGlvbkNsYXNzZXMoYW5pbWF0aW9uRGV0YWlscy5vcHRpb25zKSk7XG5cbiAgICAgICAgLy8gdGhpcyBtZWFucyB0aGF0IHRoZSBwcmV2aW91cyBhbmltYXRpb24gd2FzIGNhbmNlbGxlZFxuICAgICAgICAvLyBldmVuIGlmIHRoZSBmb2xsb3ctdXAgYW5pbWF0aW9uIGlzIHRoZSBzYW1lIGV2ZW50XG4gICAgICAgIGlmIChhbmltYXRpb25DYW5jZWxsZWQgfHwgYW5pbWF0aW9uRGV0YWlscy5jb3VudGVyICE9PSBjb3VudGVyIHx8ICFpc1ZhbGlkQW5pbWF0aW9uKSB7XG4gICAgICAgICAgLy8gaWYgYW5vdGhlciBhbmltYXRpb24gZGlkIG5vdCB0YWtlIG92ZXIgdGhlbiB3ZSBuZWVkXG4gICAgICAgICAgLy8gdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGRvbU9wZXJhdGlvbiBhbmQgb3B0aW9ucyBhcmVcbiAgICAgICAgICAvLyBoYW5kbGVkIGFjY29yZGluZ2x5XG4gICAgICAgICAgaWYgKGFuaW1hdGlvbkNhbmNlbGxlZCkge1xuICAgICAgICAgICAgYXBwbHlBbmltYXRpb25DbGFzc2VzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgYXBwbHlBbmltYXRpb25TdHlsZXMoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gaWYgdGhlIGV2ZW50IGNoYW5nZWQgZnJvbSBzb21ldGhpbmcgbGlrZSBlbnRlciB0byBsZWF2ZSB0aGVuIHdlIGRvXG4gICAgICAgICAgLy8gaXQsIG90aGVyd2lzZSBpZiBpdCdzIHRoZSBzYW1lIHRoZW4gdGhlIGVuZCByZXN1bHQgd2lsbCBiZSB0aGUgc2FtZSB0b29cbiAgICAgICAgICBpZiAoYW5pbWF0aW9uQ2FuY2VsbGVkIHx8IChpc1N0cnVjdHVyYWwgJiYgYW5pbWF0aW9uRGV0YWlscy5ldmVudCAhPT0gZXZlbnQpKSB7XG4gICAgICAgICAgICBvcHRpb25zLmRvbU9wZXJhdGlvbigpO1xuICAgICAgICAgICAgcnVubmVyLmVuZCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGluIHRoZSBldmVudCB0aGF0IHRoZSBlbGVtZW50IGFuaW1hdGlvbiB3YXMgbm90IGNhbmNlbGxlZCBvciBhIGZvbGxvdy11cCBhbmltYXRpb25cbiAgICAgICAgICAvLyBpc24ndCBhbGxvd2VkIHRvIGFuaW1hdGUgZnJvbSBoZXJlIHRoZW4gd2UgbmVlZCB0byBjbGVhciB0aGUgc3RhdGUgb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgICAvLyBzbyB0aGF0IGFueSBmdXR1cmUgYW5pbWF0aW9ucyB3b24ndCByZWFkIHRoZSBleHBpcmVkIGFuaW1hdGlvbiBkYXRhLlxuICAgICAgICAgIGlmICghaXNWYWxpZEFuaW1hdGlvbikge1xuICAgICAgICAgICAgY2xlYXJFbGVtZW50QW5pbWF0aW9uU3RhdGUoZWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcyBjb21iaW5lZCBtdWx0aXBsZSBjbGFzcyB0byBhZGRDbGFzcyAvIHJlbW92ZUNsYXNzIGludG8gYSBzZXRDbGFzcyBldmVudFxuICAgICAgICAvLyBzbyBsb25nIGFzIGEgc3RydWN0dXJhbCBldmVudCBkaWQgbm90IHRha2Ugb3ZlciB0aGUgYW5pbWF0aW9uXG4gICAgICAgIGV2ZW50ID0gIWFuaW1hdGlvbkRldGFpbHMuc3RydWN0dXJhbCAmJiBoYXNBbmltYXRpb25DbGFzc2VzKGFuaW1hdGlvbkRldGFpbHMub3B0aW9ucywgdHJ1ZSlcbiAgICAgICAgICAgID8gJ3NldENsYXNzJ1xuICAgICAgICAgICAgOiBhbmltYXRpb25EZXRhaWxzLmV2ZW50O1xuXG4gICAgICAgIG1hcmtFbGVtZW50QW5pbWF0aW9uU3RhdGUoZWxlbWVudCwgUlVOTklOR19TVEFURSk7XG4gICAgICAgIHZhciByZWFsUnVubmVyID0gJCRhbmltYXRpb24oZWxlbWVudCwgZXZlbnQsIGFuaW1hdGlvbkRldGFpbHMub3B0aW9ucyk7XG5cbiAgICAgICAgcmVhbFJ1bm5lci5kb25lKGZ1bmN0aW9uKHN0YXR1cykge1xuICAgICAgICAgIGNsb3NlKCFzdGF0dXMpO1xuICAgICAgICAgIHZhciBhbmltYXRpb25EZXRhaWxzID0gYWN0aXZlQW5pbWF0aW9uc0xvb2t1cC5nZXQobm9kZSk7XG4gICAgICAgICAgaWYgKGFuaW1hdGlvbkRldGFpbHMgJiYgYW5pbWF0aW9uRGV0YWlscy5jb3VudGVyID09PSBjb3VudGVyKSB7XG4gICAgICAgICAgICBjbGVhckVsZW1lbnRBbmltYXRpb25TdGF0ZShnZXREb21Ob2RlKGVsZW1lbnQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbm90aWZ5UHJvZ3Jlc3MocnVubmVyLCBldmVudCwgJ2Nsb3NlJywge30pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGlzIHdpbGwgdXBkYXRlIHRoZSBydW5uZXIncyBmbG93LWNvbnRyb2wgZXZlbnRzIGJhc2VkIG9uXG4gICAgICAgIC8vIHRoZSBgcmVhbFJ1bm5lcmAgb2JqZWN0LlxuICAgICAgICBydW5uZXIuc2V0SG9zdChyZWFsUnVubmVyKTtcbiAgICAgICAgbm90aWZ5UHJvZ3Jlc3MocnVubmVyLCBldmVudCwgJ3N0YXJ0Jywge30pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBydW5uZXI7XG5cbiAgICAgIGZ1bmN0aW9uIG5vdGlmeVByb2dyZXNzKHJ1bm5lciwgZXZlbnQsIHBoYXNlLCBkYXRhKSB7XG4gICAgICAgIHJ1bkluTmV4dFBvc3REaWdlc3RPck5vdyhmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gZmluZENhbGxiYWNrcyhwYXJlbnQsIGVsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgICBpZiAoY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gZG8gbm90IG9wdGltaXplIHRoaXMgY2FsbCBoZXJlIHRvIFJBRiBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBrbm93IGhvdyBoZWF2eSB0aGUgY2FsbGJhY2sgY29kZSBoZXJlIHdpbGxcbiAgICAgICAgICAgIC8vIGJlIGFuZCBpZiB0aGlzIGNvZGUgaXMgYnVmZmVyZWQgdGhlbiB0aGlzIGNhblxuICAgICAgICAgICAgLy8gbGVhZCB0byBhIHBlcmZvcm1hbmNlIHJlZ3Jlc3Npb24uXG4gICAgICAgICAgICAkJHJBRihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZm9yRWFjaChjYWxsYmFja3MsIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZWxlbWVudCwgcGhhc2UsIGRhdGEpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJ1bm5lci5wcm9ncmVzcyhldmVudCwgcGhhc2UsIGRhdGEpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjbG9zZShyZWplY3QpIHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgICAgIGNsZWFyR2VuZXJhdGVkQ2xhc3NlcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgYXBwbHlBbmltYXRpb25DbGFzc2VzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBhcHBseUFuaW1hdGlvblN0eWxlcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgb3B0aW9ucy5kb21PcGVyYXRpb24oKTtcbiAgICAgICAgcnVubmVyLmNvbXBsZXRlKCFyZWplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlQ2hpbGRBbmltYXRpb25zKGVsZW1lbnQpIHtcbiAgICAgIHZhciBub2RlID0gZ2V0RG9tTm9kZShlbGVtZW50KTtcbiAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUucXVlcnlTZWxlY3RvckFsbCgnWycgKyBOR19BTklNQVRFX0FUVFJfTkFNRSArICddJyk7XG4gICAgICBmb3JFYWNoKGNoaWxkcmVuLCBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICB2YXIgc3RhdGUgPSBwYXJzZUludChjaGlsZC5nZXRBdHRyaWJ1dGUoTkdfQU5JTUFURV9BVFRSX05BTUUpKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkRldGFpbHMgPSBhY3RpdmVBbmltYXRpb25zTG9va3VwLmdldChjaGlsZCk7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICBjYXNlIFJVTk5JTkdfU1RBVEU6XG4gICAgICAgICAgICBhbmltYXRpb25EZXRhaWxzLnJ1bm5lci5lbmQoKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgICBjYXNlIFBSRV9ESUdFU1RfU1RBVEU6XG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uRGV0YWlscykge1xuICAgICAgICAgICAgICBhY3RpdmVBbmltYXRpb25zTG9va3VwLnJlbW92ZShjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJFbGVtZW50QW5pbWF0aW9uU3RhdGUoZWxlbWVudCkge1xuICAgICAgdmFyIG5vZGUgPSBnZXREb21Ob2RlKGVsZW1lbnQpO1xuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoTkdfQU5JTUFURV9BVFRSX05BTUUpO1xuICAgICAgYWN0aXZlQW5pbWF0aW9uc0xvb2t1cC5yZW1vdmUobm9kZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNNYXRjaGluZ0VsZW1lbnQobm9kZU9yRWxtQSwgbm9kZU9yRWxtQikge1xuICAgICAgcmV0dXJuIGdldERvbU5vZGUobm9kZU9yRWxtQSkgPT09IGdldERvbU5vZGUobm9kZU9yRWxtQik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXJlQW5pbWF0aW9uc0FsbG93ZWQoZWxlbWVudCwgcGFyZW50RWxlbWVudCwgZXZlbnQpIHtcbiAgICAgIHZhciBib2R5RWxlbWVudCA9IGpxTGl0ZSgkZG9jdW1lbnRbMF0uYm9keSk7XG4gICAgICB2YXIgYm9keUVsZW1lbnREZXRlY3RlZCA9IGlzTWF0Y2hpbmdFbGVtZW50KGVsZW1lbnQsIGJvZHlFbGVtZW50KSB8fCBlbGVtZW50WzBdLm5vZGVOYW1lID09PSAnSFRNTCc7XG4gICAgICB2YXIgcm9vdEVsZW1lbnREZXRlY3RlZCA9IGlzTWF0Y2hpbmdFbGVtZW50KGVsZW1lbnQsICRyb290RWxlbWVudCk7XG4gICAgICB2YXIgcGFyZW50QW5pbWF0aW9uRGV0ZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHZhciBhbmltYXRlQ2hpbGRyZW47XG5cbiAgICAgIHZhciBwYXJlbnRIb3N0ID0gZWxlbWVudC5kYXRhKE5HX0FOSU1BVEVfUElOX0RBVEEpO1xuICAgICAgaWYgKHBhcmVudEhvc3QpIHtcbiAgICAgICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEhvc3Q7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChwYXJlbnRFbGVtZW50ICYmIHBhcmVudEVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgIGlmICghcm9vdEVsZW1lbnREZXRlY3RlZCkge1xuICAgICAgICAgIC8vIGFuZ3VsYXIgZG9lc24ndCB3YW50IHRvIGF0dGVtcHQgdG8gYW5pbWF0ZSBlbGVtZW50cyBvdXRzaWRlIG9mIHRoZSBhcHBsaWNhdGlvblxuICAgICAgICAgIC8vIHRoZXJlZm9yZSB3ZSBuZWVkIHRvIGVuc3VyZSB0aGF0IHRoZSByb290RWxlbWVudCBpcyBhbiBhbmNlc3RvciBvZiB0aGUgY3VycmVudCBlbGVtZW50XG4gICAgICAgICAgcm9vdEVsZW1lbnREZXRlY3RlZCA9IGlzTWF0Y2hpbmdFbGVtZW50KHBhcmVudEVsZW1lbnQsICRyb290RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IHBhcmVudEVsZW1lbnRbMF07XG4gICAgICAgIGlmIChwYXJlbnROb2RlLm5vZGVUeXBlICE9PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAvLyBubyBwb2ludCBpbiBpbnNwZWN0aW5nIHRoZSAjZG9jdW1lbnQgZWxlbWVudFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRldGFpbHMgPSBhY3RpdmVBbmltYXRpb25zTG9va3VwLmdldChwYXJlbnROb2RlKSB8fCB7fTtcbiAgICAgICAgLy8gZWl0aGVyIGFuIGVudGVyLCBsZWF2ZSBvciBtb3ZlIGFuaW1hdGlvbiB3aWxsIGNvbW1lbmNlXG4gICAgICAgIC8vIHRoZXJlZm9yZSB3ZSBjYW4ndCBhbGxvdyBhbnkgYW5pbWF0aW9ucyB0byB0YWtlIHBsYWNlXG4gICAgICAgIC8vIGJ1dCBpZiBhIHBhcmVudCBhbmltYXRpb24gaXMgY2xhc3MtYmFzZWQgdGhlbiB0aGF0J3Mgb2tcbiAgICAgICAgaWYgKCFwYXJlbnRBbmltYXRpb25EZXRlY3RlZCkge1xuICAgICAgICAgIHBhcmVudEFuaW1hdGlvbkRldGVjdGVkID0gZGV0YWlscy5zdHJ1Y3R1cmFsIHx8IGRpc2FibGVkRWxlbWVudHNMb29rdXAuZ2V0KHBhcmVudE5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKGFuaW1hdGVDaGlsZHJlbikgfHwgYW5pbWF0ZUNoaWxkcmVuID09PSB0cnVlKSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gcGFyZW50RWxlbWVudC5kYXRhKE5HX0FOSU1BVEVfQ0hJTERSRU5fREFUQSk7XG4gICAgICAgICAgaWYgKGlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGFuaW1hdGVDaGlsZHJlbiA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZXJlIGlzIG5vIG5lZWQgdG8gY29udGludWUgdHJhdmVyc2luZyBhdCB0aGlzIHBvaW50XG4gICAgICAgIGlmIChwYXJlbnRBbmltYXRpb25EZXRlY3RlZCAmJiBhbmltYXRlQ2hpbGRyZW4gPT09IGZhbHNlKSBicmVhaztcblxuICAgICAgICBpZiAoIXJvb3RFbGVtZW50RGV0ZWN0ZWQpIHtcbiAgICAgICAgICAvLyBhbmd1bGFyIGRvZXNuJ3Qgd2FudCB0byBhdHRlbXB0IHRvIGFuaW1hdGUgZWxlbWVudHMgb3V0c2lkZSBvZiB0aGUgYXBwbGljYXRpb25cbiAgICAgICAgICAvLyB0aGVyZWZvcmUgd2UgbmVlZCB0byBlbnN1cmUgdGhhdCB0aGUgcm9vdEVsZW1lbnQgaXMgYW4gYW5jZXN0b3Igb2YgdGhlIGN1cnJlbnQgZWxlbWVudFxuICAgICAgICAgIHJvb3RFbGVtZW50RGV0ZWN0ZWQgPSBpc01hdGNoaW5nRWxlbWVudChwYXJlbnRFbGVtZW50LCAkcm9vdEVsZW1lbnQpO1xuICAgICAgICAgIGlmICghcm9vdEVsZW1lbnREZXRlY3RlZCkge1xuICAgICAgICAgICAgcGFyZW50SG9zdCA9IHBhcmVudEVsZW1lbnQuZGF0YShOR19BTklNQVRFX1BJTl9EQVRBKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRIb3N0KSB7XG4gICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQgPSBwYXJlbnRIb3N0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYm9keUVsZW1lbnREZXRlY3RlZCkge1xuICAgICAgICAgIC8vIHdlIGFsc28gbmVlZCB0byBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBpcyBvciB3aWxsIGJlIGFwYXJ0IG9mIHRoZSBib2R5IGVsZW1lbnRcbiAgICAgICAgICAvLyBvdGhlcndpc2UgaXQgaXMgcG9pbnRsZXNzIHRvIGV2ZW4gaXNzdWUgYW4gYW5pbWF0aW9uIHRvIGJlIHJlbmRlcmVkXG4gICAgICAgICAgYm9keUVsZW1lbnREZXRlY3RlZCA9IGlzTWF0Y2hpbmdFbGVtZW50KHBhcmVudEVsZW1lbnQsIGJvZHlFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWxsb3dBbmltYXRpb24gPSAhcGFyZW50QW5pbWF0aW9uRGV0ZWN0ZWQgfHwgYW5pbWF0ZUNoaWxkcmVuO1xuICAgICAgcmV0dXJuIGFsbG93QW5pbWF0aW9uICYmIHJvb3RFbGVtZW50RGV0ZWN0ZWQgJiYgYm9keUVsZW1lbnREZXRlY3RlZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXJrRWxlbWVudEFuaW1hdGlvblN0YXRlKGVsZW1lbnQsIHN0YXRlLCBkZXRhaWxzKSB7XG4gICAgICBkZXRhaWxzID0gZGV0YWlscyB8fCB7fTtcbiAgICAgIGRldGFpbHMuc3RhdGUgPSBzdGF0ZTtcblxuICAgICAgdmFyIG5vZGUgPSBnZXREb21Ob2RlKGVsZW1lbnQpO1xuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoTkdfQU5JTUFURV9BVFRSX05BTUUsIHN0YXRlKTtcblxuICAgICAgdmFyIG9sZFZhbHVlID0gYWN0aXZlQW5pbWF0aW9uc0xvb2t1cC5nZXQobm9kZSk7XG4gICAgICB2YXIgbmV3VmFsdWUgPSBvbGRWYWx1ZVxuICAgICAgICAgID8gZXh0ZW5kKG9sZFZhbHVlLCBkZXRhaWxzKVxuICAgICAgICAgIDogZGV0YWlscztcbiAgICAgIGFjdGl2ZUFuaW1hdGlvbnNMb29rdXAucHV0KG5vZGUsIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH1dO1xufV07XG5cbnZhciAkJEFuaW1hdGVBc3luY1J1bkZhY3RvcnkgPSBbJyQkckFGJywgZnVuY3Rpb24oJCRyQUYpIHtcbiAgdmFyIHdhaXRRdWV1ZSA9IFtdO1xuXG4gIGZ1bmN0aW9uIHdhaXRGb3JUaWNrKGZuKSB7XG4gICAgd2FpdFF1ZXVlLnB1c2goZm4pO1xuICAgIGlmICh3YWl0UXVldWUubGVuZ3RoID4gMSkgcmV0dXJuO1xuICAgICQkckFGKGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3YWl0UXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd2FpdFF1ZXVlW2ldKCk7XG4gICAgICB9XG4gICAgICB3YWl0UXVldWUgPSBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGFzc2VkID0gZmFsc2U7XG4gICAgd2FpdEZvclRpY2soZnVuY3Rpb24oKSB7XG4gICAgICBwYXNzZWQgPSB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgcGFzc2VkID8gY2FsbGJhY2soKSA6IHdhaXRGb3JUaWNrKGNhbGxiYWNrKTtcbiAgICB9O1xuICB9O1xufV07XG5cbnZhciAkJEFuaW1hdGVSdW5uZXJGYWN0b3J5ID0gWyckcScsICckc25pZmZlcicsICckJGFuaW1hdGVBc3luY1J1bicsXG4gICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oJHEsICAgJHNuaWZmZXIsICAgJCRhbmltYXRlQXN5bmNSdW4pIHtcblxuICB2YXIgSU5JVElBTF9TVEFURSA9IDA7XG4gIHZhciBET05FX1BFTkRJTkdfU1RBVEUgPSAxO1xuICB2YXIgRE9ORV9DT01QTEVURV9TVEFURSA9IDI7XG5cbiAgQW5pbWF0ZVJ1bm5lci5jaGFpbiA9IGZ1bmN0aW9uKGNoYWluLCBjYWxsYmFjaykge1xuICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICBuZXh0KCk7XG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gY2hhaW4ubGVuZ3RoKSB7XG4gICAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNoYWluW2luZGV4XShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgPT09IGZhbHNlKSB7XG4gICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbmRleCsrO1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgQW5pbWF0ZVJ1bm5lci5hbGwgPSBmdW5jdGlvbihydW5uZXJzLCBjYWxsYmFjaykge1xuICAgIHZhciBjb3VudCA9IDA7XG4gICAgdmFyIHN0YXR1cyA9IHRydWU7XG4gICAgZm9yRWFjaChydW5uZXJzLCBmdW5jdGlvbihydW5uZXIpIHtcbiAgICAgIHJ1bm5lci5kb25lKG9uUHJvZ3Jlc3MpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gb25Qcm9ncmVzcyhyZXNwb25zZSkge1xuICAgICAgc3RhdHVzID0gc3RhdHVzICYmIHJlc3BvbnNlO1xuICAgICAgaWYgKCsrY291bnQgPT09IHJ1bm5lcnMubGVuZ3RoKSB7XG4gICAgICAgIGNhbGxiYWNrKHN0YXR1cyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIEFuaW1hdGVSdW5uZXIoaG9zdCkge1xuICAgIHRoaXMuc2V0SG9zdChob3N0KTtcblxuICAgIHRoaXMuX2RvbmVDYWxsYmFja3MgPSBbXTtcbiAgICB0aGlzLl9ydW5JbkFuaW1hdGlvbkZyYW1lID0gJCRhbmltYXRlQXN5bmNSdW4oKTtcbiAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gIH1cblxuICBBbmltYXRlUnVubmVyLnByb3RvdHlwZSA9IHtcbiAgICBzZXRIb3N0OiBmdW5jdGlvbihob3N0KSB7XG4gICAgICB0aGlzLmhvc3QgPSBob3N0IHx8IHt9O1xuICAgIH0sXG5cbiAgICBkb25lOiBmdW5jdGlvbihmbikge1xuICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBET05FX0NPTVBMRVRFX1NUQVRFKSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kb25lQ2FsbGJhY2tzLnB1c2goZm4pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBwcm9ncmVzczogbm9vcCxcblxuICAgIGdldFByb21pc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLnByb21pc2UpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLnByb21pc2UgPSAkcShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBzZWxmLmRvbmUoZnVuY3Rpb24oc3RhdHVzKSB7XG4gICAgICAgICAgICBzdGF0dXMgPT09IGZhbHNlID8gcmVqZWN0KCkgOiByZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZTtcbiAgICB9LFxuXG4gICAgdGhlbjogZnVuY3Rpb24ocmVzb2x2ZUhhbmRsZXIsIHJlamVjdEhhbmRsZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFByb21pc2UoKS50aGVuKHJlc29sdmVIYW5kbGVyLCByZWplY3RIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvbWlzZSgpWydjYXRjaCddKGhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICAnZmluYWxseSc6IGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFByb21pc2UoKVsnZmluYWxseSddKGhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBwYXVzZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5ob3N0LnBhdXNlKSB7XG4gICAgICAgIHRoaXMuaG9zdC5wYXVzZSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZXN1bWU6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaG9zdC5yZXN1bWUpIHtcbiAgICAgICAgdGhpcy5ob3N0LnJlc3VtZSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaG9zdC5lbmQpIHtcbiAgICAgICAgdGhpcy5ob3N0LmVuZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fcmVzb2x2ZSh0cnVlKTtcbiAgICB9LFxuXG4gICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmhvc3QuY2FuY2VsKSB7XG4gICAgICAgIHRoaXMuaG9zdC5jYW5jZWwoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3Jlc29sdmUoZmFsc2UpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIGlmIChzZWxmLl9zdGF0ZSA9PT0gSU5JVElBTF9TVEFURSkge1xuICAgICAgICBzZWxmLl9zdGF0ZSA9IERPTkVfUEVORElOR19TVEFURTtcbiAgICAgICAgc2VsZi5fcnVuSW5BbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLl9yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIF9yZXNvbHZlOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgaWYgKHRoaXMuX3N0YXRlICE9PSBET05FX0NPTVBMRVRFX1NUQVRFKSB7XG4gICAgICAgIGZvckVhY2godGhpcy5fZG9uZUNhbGxiYWNrcywgZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICBmbihyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9kb25lQ2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gRE9ORV9DT01QTEVURV9TVEFURTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIEFuaW1hdGVSdW5uZXI7XG59XTtcblxudmFyICQkQW5pbWF0aW9uUHJvdmlkZXIgPSBbJyRhbmltYXRlUHJvdmlkZXInLCBmdW5jdGlvbigkYW5pbWF0ZVByb3ZpZGVyKSB7XG4gIHZhciBOR19BTklNQVRFX1JFRl9BVFRSID0gJ25nLWFuaW1hdGUtcmVmJztcblxuICB2YXIgZHJpdmVycyA9IHRoaXMuZHJpdmVycyA9IFtdO1xuXG4gIHZhciBSVU5ORVJfU1RPUkFHRV9LRVkgPSAnJCRhbmltYXRpb25SdW5uZXInO1xuXG4gIGZ1bmN0aW9uIHNldFJ1bm5lcihlbGVtZW50LCBydW5uZXIpIHtcbiAgICBlbGVtZW50LmRhdGEoUlVOTkVSX1NUT1JBR0VfS0VZLCBydW5uZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUnVubmVyKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnJlbW92ZURhdGEoUlVOTkVSX1NUT1JBR0VfS0VZKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJ1bm5lcihlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZGF0YShSVU5ORVJfU1RPUkFHRV9LRVkpO1xuICB9XG5cbiAgdGhpcy4kZ2V0ID0gWyckJGpxTGl0ZScsICckcm9vdFNjb3BlJywgJyRpbmplY3RvcicsICckJEFuaW1hdGVSdW5uZXInLCAnJCRIYXNoTWFwJywgJyQkckFGU2NoZWR1bGVyJyxcbiAgICAgICBmdW5jdGlvbigkJGpxTGl0ZSwgICAkcm9vdFNjb3BlLCAgICRpbmplY3RvciwgICAkJEFuaW1hdGVSdW5uZXIsICAgJCRIYXNoTWFwLCAgICQkckFGU2NoZWR1bGVyKSB7XG5cbiAgICB2YXIgYW5pbWF0aW9uUXVldWUgPSBbXTtcbiAgICB2YXIgYXBwbHlBbmltYXRpb25DbGFzc2VzID0gYXBwbHlBbmltYXRpb25DbGFzc2VzRmFjdG9yeSgkJGpxTGl0ZSk7XG5cbiAgICBmdW5jdGlvbiBzb3J0QW5pbWF0aW9ucyhhbmltYXRpb25zKSB7XG4gICAgICB2YXIgdHJlZSA9IHsgY2hpbGRyZW46IFtdIH07XG4gICAgICB2YXIgaSwgbG9va3VwID0gbmV3ICQkSGFzaE1hcCgpO1xuXG4gICAgICAvLyB0aGlzIGlzIGRvbmUgZmlyc3QgYmVmb3JlaGFuZCBzbyB0aGF0IHRoZSBoYXNobWFwXG4gICAgICAvLyBpcyBmaWxsZWQgd2l0aCBhIGxpc3Qgb2YgdGhlIGVsZW1lbnRzIHRoYXQgd2lsbCBiZSBhbmltYXRlZFxuICAgICAgZm9yIChpID0gMDsgaSA8IGFuaW1hdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IGFuaW1hdGlvbnNbaV07XG4gICAgICAgIGxvb2t1cC5wdXQoYW5pbWF0aW9uLmRvbU5vZGUsIGFuaW1hdGlvbnNbaV0gPSB7XG4gICAgICAgICAgZG9tTm9kZTogYW5pbWF0aW9uLmRvbU5vZGUsXG4gICAgICAgICAgZm46IGFuaW1hdGlvbi5mbixcbiAgICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhbmltYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHByb2Nlc3NOb2RlKGFuaW1hdGlvbnNbaV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmxhdHRlbih0cmVlKTtcblxuICAgICAgZnVuY3Rpb24gcHJvY2Vzc05vZGUoZW50cnkpIHtcbiAgICAgICAgaWYgKGVudHJ5LnByb2Nlc3NlZCkgcmV0dXJuIGVudHJ5O1xuICAgICAgICBlbnRyeS5wcm9jZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIHZhciBlbGVtZW50Tm9kZSA9IGVudHJ5LmRvbU5vZGU7XG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZWxlbWVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgbG9va3VwLnB1dChlbGVtZW50Tm9kZSwgZW50cnkpO1xuXG4gICAgICAgIHZhciBwYXJlbnRFbnRyeTtcbiAgICAgICAgd2hpbGUgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICBwYXJlbnRFbnRyeSA9IGxvb2t1cC5nZXQocGFyZW50Tm9kZSk7XG4gICAgICAgICAgaWYgKHBhcmVudEVudHJ5KSB7XG4gICAgICAgICAgICBpZiAoIXBhcmVudEVudHJ5LnByb2Nlc3NlZCkge1xuICAgICAgICAgICAgICBwYXJlbnRFbnRyeSA9IHByb2Nlc3NOb2RlKHBhcmVudEVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgKHBhcmVudEVudHJ5IHx8IHRyZWUpLmNoaWxkcmVuLnB1c2goZW50cnkpO1xuICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGZsYXR0ZW4odHJlZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHF1ZXVlLnB1c2godHJlZS5jaGlsZHJlbltpXSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVtYWluaW5nTGV2ZWxFbnRyaWVzID0gcXVldWUubGVuZ3RoO1xuICAgICAgICB2YXIgbmV4dExldmVsRW50cmllcyA9IDA7XG4gICAgICAgIHZhciByb3cgPSBbXTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSBxdWV1ZVtpXTtcbiAgICAgICAgICBpZiAocmVtYWluaW5nTGV2ZWxFbnRyaWVzIDw9IDApIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ0xldmVsRW50cmllcyA9IG5leHRMZXZlbEVudHJpZXM7XG4gICAgICAgICAgICBuZXh0TGV2ZWxFbnRyaWVzID0gMDtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHJvdyk7XG4gICAgICAgICAgICByb3cgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcm93LnB1c2goZW50cnkuZm4pO1xuICAgICAgICAgIGVudHJ5LmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGRFbnRyeSkge1xuICAgICAgICAgICAgbmV4dExldmVsRW50cmllcysrO1xuICAgICAgICAgICAgcXVldWUucHVzaChjaGlsZEVudHJ5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZW1haW5pbmdMZXZlbEVudHJpZXMtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb3cubGVuZ3RoKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2gocm93KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETyhtYXRza28pOiBkb2N1bWVudCB0aGUgc2lnbmF0dXJlIGluIGEgYmV0dGVyIHdheVxuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudCwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHByZXBhcmVBbmltYXRpb25PcHRpb25zKG9wdGlvbnMpO1xuICAgICAgdmFyIGlzU3RydWN0dXJhbCA9IFsnZW50ZXInLCAnbW92ZScsICdsZWF2ZSddLmluZGV4T2YoZXZlbnQpID49IDA7XG5cbiAgICAgIC8vIHRoZXJlIGlzIG5vIGFuaW1hdGlvbiBhdCB0aGUgY3VycmVudCBtb21lbnQsIGhvd2V2ZXJcbiAgICAgIC8vIHRoZXNlIHJ1bm5lciBtZXRob2RzIHdpbGwgZ2V0IGxhdGVyIHVwZGF0ZWQgd2l0aCB0aGVcbiAgICAgIC8vIG1ldGhvZHMgbGVhZGluZyBpbnRvIHRoZSBkcml2ZXIncyBlbmQvY2FuY2VsIG1ldGhvZHNcbiAgICAgIC8vIGZvciBub3cgdGhleSBqdXN0IHN0b3AgdGhlIGFuaW1hdGlvbiBmcm9tIHN0YXJ0aW5nXG4gICAgICB2YXIgcnVubmVyID0gbmV3ICQkQW5pbWF0ZVJ1bm5lcih7XG4gICAgICAgIGVuZDogZnVuY3Rpb24oKSB7IGNsb3NlKCk7IH0sXG4gICAgICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7IGNsb3NlKHRydWUpOyB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFkcml2ZXJzLmxlbmd0aCkge1xuICAgICAgICBjbG9zZSgpO1xuICAgICAgICByZXR1cm4gcnVubmVyO1xuICAgICAgfVxuXG4gICAgICBzZXRSdW5uZXIoZWxlbWVudCwgcnVubmVyKTtcblxuICAgICAgdmFyIGNsYXNzZXMgPSBtZXJnZUNsYXNzZXMoZWxlbWVudC5hdHRyKCdjbGFzcycpLCBtZXJnZUNsYXNzZXMob3B0aW9ucy5hZGRDbGFzcywgb3B0aW9ucy5yZW1vdmVDbGFzcykpO1xuICAgICAgdmFyIHRlbXBDbGFzc2VzID0gb3B0aW9ucy50ZW1wQ2xhc3NlcztcbiAgICAgIGlmICh0ZW1wQ2xhc3Nlcykge1xuICAgICAgICBjbGFzc2VzICs9ICcgJyArIHRlbXBDbGFzc2VzO1xuICAgICAgICBvcHRpb25zLnRlbXBDbGFzc2VzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgYW5pbWF0aW9uUXVldWUucHVzaCh7XG4gICAgICAgIC8vIHRoaXMgZGF0YSBpcyB1c2VkIGJ5IHRoZSBwb3N0RGlnZXN0IGNvZGUgYW5kIHBhc3NlZCBpbnRvXG4gICAgICAgIC8vIHRoZSBkcml2ZXIgc3RlcCBmdW5jdGlvblxuICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIHN0cnVjdHVyYWw6IGlzU3RydWN0dXJhbCxcbiAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgYmVmb3JlU3RhcnQ6IGJlZm9yZVN0YXJ0LFxuICAgICAgICBjbG9zZTogY2xvc2VcbiAgICAgIH0pO1xuXG4gICAgICBlbGVtZW50Lm9uKCckZGVzdHJveScsIGhhbmRsZURlc3Ryb3llZEVsZW1lbnQpO1xuXG4gICAgICAvLyB3ZSBvbmx5IHdhbnQgdGhlcmUgdG8gYmUgb25lIGZ1bmN0aW9uIGNhbGxlZCB3aXRoaW4gdGhlIHBvc3QgZGlnZXN0XG4gICAgICAvLyBibG9jay4gVGhpcyB3YXkgd2UgY2FuIGdyb3VwIGFuaW1hdGlvbnMgZm9yIGFsbCB0aGUgYW5pbWF0aW9ucyB0aGF0XG4gICAgICAvLyB3ZXJlIGFwYXJ0IG9mIHRoZSBzYW1lIHBvc3REaWdlc3QgZmx1c2ggY2FsbC5cbiAgICAgIGlmIChhbmltYXRpb25RdWV1ZS5sZW5ndGggPiAxKSByZXR1cm4gcnVubmVyO1xuXG4gICAgICAkcm9vdFNjb3BlLiQkcG9zdERpZ2VzdChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yRWFjaChhbmltYXRpb25RdWV1ZSwgZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAvLyB0aGUgZWxlbWVudCB3YXMgZGVzdHJveWVkIGVhcmx5IG9uIHdoaWNoIHJlbW92ZWQgdGhlIHJ1bm5lclxuICAgICAgICAgIC8vIGZvcm0gaXRzIHN0b3JhZ2UuIFRoaXMgbWVhbnMgd2UgY2FuJ3QgYW5pbWF0ZSB0aGlzIGVsZW1lbnRcbiAgICAgICAgICAvLyBhdCBhbGwgYW5kIGl0IGFscmVhZHkgaGFzIGJlZW4gY2xvc2VkIGR1ZSB0byBkZXN0cnVjdGlvbi5cbiAgICAgICAgICBpZiAoZ2V0UnVubmVyKGVudHJ5LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBhbmltYXRpb25zLnB1c2goZW50cnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbnRyeS5jbG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbm93IGFueSBmdXR1cmUgYW5pbWF0aW9ucyB3aWxsIGJlIGluIGFub3RoZXIgcG9zdERpZ2VzdFxuICAgICAgICBhbmltYXRpb25RdWV1ZS5sZW5ndGggPSAwO1xuXG4gICAgICAgIHZhciBncm91cGVkQW5pbWF0aW9ucyA9IGdyb3VwQW5pbWF0aW9ucyhhbmltYXRpb25zKTtcbiAgICAgICAgdmFyIHRvQmVTb3J0ZWRBbmltYXRpb25zID0gW107XG5cbiAgICAgICAgZm9yRWFjaChncm91cGVkQW5pbWF0aW9ucywgZnVuY3Rpb24oYW5pbWF0aW9uRW50cnkpIHtcbiAgICAgICAgICB0b0JlU29ydGVkQW5pbWF0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIGRvbU5vZGU6IGdldERvbU5vZGUoYW5pbWF0aW9uRW50cnkuZnJvbSA/IGFuaW1hdGlvbkVudHJ5LmZyb20uZWxlbWVudCA6IGFuaW1hdGlvbkVudHJ5LmVsZW1lbnQpLFxuICAgICAgICAgICAgZm46IGZ1bmN0aW9uIHRyaWdnZXJBbmltYXRpb25TdGFydCgpIHtcbiAgICAgICAgICAgICAgLy8gaXQncyBpbXBvcnRhbnQgdGhhdCB3ZSBhcHBseSB0aGUgYG5nLWFuaW1hdGVgIENTUyBjbGFzcyBhbmQgdGhlXG4gICAgICAgICAgICAgIC8vIHRlbXBvcmFyeSBjbGFzc2VzIGJlZm9yZSB3ZSBkbyBhbnkgZHJpdmVyIGludm9raW5nIHNpbmNlIHRoZXNlXG4gICAgICAgICAgICAgIC8vIENTUyBjbGFzc2VzIG1heSBiZSByZXF1aXJlZCBmb3IgcHJvcGVyIENTUyBkZXRlY3Rpb24uXG4gICAgICAgICAgICAgIGFuaW1hdGlvbkVudHJ5LmJlZm9yZVN0YXJ0KCk7XG5cbiAgICAgICAgICAgICAgdmFyIHN0YXJ0QW5pbWF0aW9uRm4sIGNsb3NlRm4gPSBhbmltYXRpb25FbnRyeS5jbG9zZTtcblxuICAgICAgICAgICAgICAvLyBpbiB0aGUgZXZlbnQgdGhhdCB0aGUgZWxlbWVudCB3YXMgcmVtb3ZlZCBiZWZvcmUgdGhlIGRpZ2VzdCBydW5zIG9yXG4gICAgICAgICAgICAgIC8vIGR1cmluZyB0aGUgUkFGIHNlcXVlbmNpbmcgdGhlbiB3ZSBzaG91bGQgbm90IHRyaWdnZXIgdGhlIGFuaW1hdGlvbi5cbiAgICAgICAgICAgICAgdmFyIHRhcmdldEVsZW1lbnQgPSBhbmltYXRpb25FbnRyeS5hbmNob3JzXG4gICAgICAgICAgICAgICAgICA/IChhbmltYXRpb25FbnRyeS5mcm9tLmVsZW1lbnQgfHwgYW5pbWF0aW9uRW50cnkudG8uZWxlbWVudClcbiAgICAgICAgICAgICAgICAgIDogYW5pbWF0aW9uRW50cnkuZWxlbWVudDtcblxuICAgICAgICAgICAgICBpZiAoZ2V0UnVubmVyKHRhcmdldEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wZXJhdGlvbiA9IGludm9rZUZpcnN0RHJpdmVyKGFuaW1hdGlvbkVudHJ5KTtcbiAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICBzdGFydEFuaW1hdGlvbkZuID0gb3BlcmF0aW9uLnN0YXJ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghc3RhcnRBbmltYXRpb25Gbikge1xuICAgICAgICAgICAgICAgIGNsb3NlRm4oKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgYW5pbWF0aW9uUnVubmVyID0gc3RhcnRBbmltYXRpb25GbigpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvblJ1bm5lci5kb25lKGZ1bmN0aW9uKHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgY2xvc2VGbighc3RhdHVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVBbmltYXRpb25SdW5uZXJzKGFuaW1hdGlvbkVudHJ5LCBhbmltYXRpb25SdW5uZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gc29ydCBlYWNoIG9mIHRoZSBhbmltYXRpb25zIGluIG9yZGVyIG9mIHBhcmVudCB0byBjaGlsZFxuICAgICAgICAvLyByZWxhdGlvbnNoaXBzLiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgY2hpbGQgY2xhc3NlcyBhcmUgYXBwbGllZCBhdCB0aGVcbiAgICAgICAgLy8gcmlnaHQgdGltZS5cbiAgICAgICAgJCRyQUZTY2hlZHVsZXIoc29ydEFuaW1hdGlvbnModG9CZVNvcnRlZEFuaW1hdGlvbnMpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcnVubmVyO1xuXG4gICAgICAvLyBUT0RPKG1hdHNrbyk6IGNoYW5nZSB0byByZWZlcmVuY2Ugbm9kZXNcbiAgICAgIGZ1bmN0aW9uIGdldEFuY2hvck5vZGVzKG5vZGUpIHtcbiAgICAgICAgdmFyIFNFTEVDVE9SID0gJ1snICsgTkdfQU5JTUFURV9SRUZfQVRUUiArICddJztcbiAgICAgICAgdmFyIGl0ZW1zID0gbm9kZS5oYXNBdHRyaWJ1dGUoTkdfQU5JTUFURV9SRUZfQVRUUilcbiAgICAgICAgICAgICAgPyBbbm9kZV1cbiAgICAgICAgICAgICAgOiBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoU0VMRUNUT1IpO1xuICAgICAgICB2YXIgYW5jaG9ycyA9IFtdO1xuICAgICAgICBmb3JFYWNoKGl0ZW1zLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgdmFyIGF0dHIgPSBub2RlLmdldEF0dHJpYnV0ZShOR19BTklNQVRFX1JFRl9BVFRSKTtcbiAgICAgICAgICBpZiAoYXR0ciAmJiBhdHRyLmxlbmd0aCkge1xuICAgICAgICAgICAgYW5jaG9ycy5wdXNoKG5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhbmNob3JzO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBncm91cEFuaW1hdGlvbnMoYW5pbWF0aW9ucykge1xuICAgICAgICB2YXIgcHJlcGFyZWRBbmltYXRpb25zID0gW107XG4gICAgICAgIHZhciByZWZMb29rdXAgPSB7fTtcbiAgICAgICAgZm9yRWFjaChhbmltYXRpb25zLCBmdW5jdGlvbihhbmltYXRpb24sIGluZGV4KSB7XG4gICAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmltYXRpb24uZWxlbWVudDtcbiAgICAgICAgICB2YXIgbm9kZSA9IGdldERvbU5vZGUoZWxlbWVudCk7XG4gICAgICAgICAgdmFyIGV2ZW50ID0gYW5pbWF0aW9uLmV2ZW50O1xuICAgICAgICAgIHZhciBlbnRlck9yTW92ZSA9IFsnZW50ZXInLCAnbW92ZSddLmluZGV4T2YoZXZlbnQpID49IDA7XG4gICAgICAgICAgdmFyIGFuY2hvck5vZGVzID0gYW5pbWF0aW9uLnN0cnVjdHVyYWwgPyBnZXRBbmNob3JOb2Rlcyhub2RlKSA6IFtdO1xuXG4gICAgICAgICAgaWYgKGFuY2hvck5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGVudGVyT3JNb3ZlID8gJ3RvJyA6ICdmcm9tJztcblxuICAgICAgICAgICAgZm9yRWFjaChhbmNob3JOb2RlcywgZnVuY3Rpb24oYW5jaG9yKSB7XG4gICAgICAgICAgICAgIHZhciBrZXkgPSBhbmNob3IuZ2V0QXR0cmlidXRlKE5HX0FOSU1BVEVfUkVGX0FUVFIpO1xuICAgICAgICAgICAgICByZWZMb29rdXBba2V5XSA9IHJlZkxvb2t1cFtrZXldIHx8IHt9O1xuICAgICAgICAgICAgICByZWZMb29rdXBba2V5XVtkaXJlY3Rpb25dID0ge1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbklEOiBpbmRleCxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBqcUxpdGUoYW5jaG9yKVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXBhcmVkQW5pbWF0aW9ucy5wdXNoKGFuaW1hdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdXNlZEluZGljZXNMb29rdXAgPSB7fTtcbiAgICAgICAgdmFyIGFuY2hvckdyb3VwcyA9IHt9O1xuICAgICAgICBmb3JFYWNoKHJlZkxvb2t1cCwgZnVuY3Rpb24ob3BlcmF0aW9ucywga2V5KSB7XG4gICAgICAgICAgdmFyIGZyb20gPSBvcGVyYXRpb25zLmZyb207XG4gICAgICAgICAgdmFyIHRvID0gb3BlcmF0aW9ucy50bztcblxuICAgICAgICAgIGlmICghZnJvbSB8fCAhdG8pIHtcbiAgICAgICAgICAgIC8vIG9ubHkgb25lIG9mIHRoZXNlIGlzIHNldCB0aGVyZWZvcmUgd2UgY2FuJ3QgaGF2ZSBhblxuICAgICAgICAgICAgLy8gYW5jaG9yIGFuaW1hdGlvbiBzaW5jZSBhbGwgdGhyZWUgcGllY2VzIGFyZSByZXF1aXJlZFxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZnJvbSA/IGZyb20uYW5pbWF0aW9uSUQgOiB0by5hbmltYXRpb25JRDtcbiAgICAgICAgICAgIHZhciBpbmRleEtleSA9IGluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoIXVzZWRJbmRpY2VzTG9va3VwW2luZGV4S2V5XSkge1xuICAgICAgICAgICAgICB1c2VkSW5kaWNlc0xvb2t1cFtpbmRleEtleV0gPSB0cnVlO1xuICAgICAgICAgICAgICBwcmVwYXJlZEFuaW1hdGlvbnMucHVzaChhbmltYXRpb25zW2luZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGZyb21BbmltYXRpb24gPSBhbmltYXRpb25zW2Zyb20uYW5pbWF0aW9uSURdO1xuICAgICAgICAgIHZhciB0b0FuaW1hdGlvbiA9IGFuaW1hdGlvbnNbdG8uYW5pbWF0aW9uSURdO1xuICAgICAgICAgIHZhciBsb29rdXBLZXkgPSBmcm9tLmFuaW1hdGlvbklELnRvU3RyaW5nKCk7XG4gICAgICAgICAgaWYgKCFhbmNob3JHcm91cHNbbG9va3VwS2V5XSkge1xuICAgICAgICAgICAgdmFyIGdyb3VwID0gYW5jaG9yR3JvdXBzW2xvb2t1cEtleV0gPSB7XG4gICAgICAgICAgICAgIHN0cnVjdHVyYWw6IHRydWUsXG4gICAgICAgICAgICAgIGJlZm9yZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBmcm9tQW5pbWF0aW9uLmJlZm9yZVN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgdG9BbmltYXRpb24uYmVmb3JlU3RhcnQoKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZyb21BbmltYXRpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB0b0FuaW1hdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjbGFzc2VzOiBjc3NDbGFzc2VzSW50ZXJzZWN0aW9uKGZyb21BbmltYXRpb24uY2xhc3NlcywgdG9BbmltYXRpb24uY2xhc3NlcyksXG4gICAgICAgICAgICAgIGZyb206IGZyb21BbmltYXRpb24sXG4gICAgICAgICAgICAgIHRvOiB0b0FuaW1hdGlvbixcbiAgICAgICAgICAgICAgYW5jaG9yczogW10gLy8gVE9ETyhtYXRza28pOiBjaGFuZ2UgdG8gcmVmZXJlbmNlIG5vZGVzXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyB0aGUgYW5jaG9yIGFuaW1hdGlvbnMgcmVxdWlyZSB0aGF0IHRoZSBmcm9tIGFuZCB0byBlbGVtZW50cyBib3RoIGhhdmUgYXQgbGVhc3RcbiAgICAgICAgICAgIC8vIG9uZSBzaGFyZWQgQ1NTIGNsYXNzIHdoaWNoIGVmZmljdGl2ZWx5IG1hcnJpZXMgdGhlIHR3byBlbGVtZW50cyB0b2dldGhlciB0byB1c2VcbiAgICAgICAgICAgIC8vIHRoZSBzYW1lIGFuaW1hdGlvbiBkcml2ZXIgYW5kIHRvIHByb3Blcmx5IHNlcXVlbmNlIHRoZSBhbmNob3IgYW5pbWF0aW9uLlxuICAgICAgICAgICAgaWYgKGdyb3VwLmNsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHByZXBhcmVkQW5pbWF0aW9ucy5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHByZXBhcmVkQW5pbWF0aW9ucy5wdXNoKGZyb21BbmltYXRpb24pO1xuICAgICAgICAgICAgICBwcmVwYXJlZEFuaW1hdGlvbnMucHVzaCh0b0FuaW1hdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYW5jaG9yR3JvdXBzW2xvb2t1cEtleV0uYW5jaG9ycy5wdXNoKHtcbiAgICAgICAgICAgICdvdXQnOiBmcm9tLmVsZW1lbnQsICdpbic6IHRvLmVsZW1lbnRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByZXBhcmVkQW5pbWF0aW9ucztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY3NzQ2xhc3Nlc0ludGVyc2VjdGlvbihhLGIpIHtcbiAgICAgICAgYSA9IGEuc3BsaXQoJyAnKTtcbiAgICAgICAgYiA9IGIuc3BsaXQoJyAnKTtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgYWEgPSBhW2ldO1xuICAgICAgICAgIGlmIChhYS5zdWJzdHJpbmcoMCwzKSA9PT0gJ25nLScpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBiLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoYWEgPT09IGJbal0pIHtcbiAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGFhKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZXMuam9pbignICcpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpbnZva2VGaXJzdERyaXZlcihhbmltYXRpb25EZXRhaWxzKSB7XG4gICAgICAgIC8vIHdlIGxvb3AgaW4gcmV2ZXJzZSBvcmRlciBzaW5jZSB0aGUgbW9yZSBnZW5lcmFsIGRyaXZlcnMgKGxpa2UgQ1NTIGFuZCBKUylcbiAgICAgICAgLy8gbWF5IGF0dGVtcHQgbW9yZSBlbGVtZW50cywgYnV0IGN1c3RvbSBkcml2ZXJzIGFyZSBtb3JlIHBhcnRpY3VsYXJcbiAgICAgICAgZm9yICh2YXIgaSA9IGRyaXZlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB2YXIgZHJpdmVyTmFtZSA9IGRyaXZlcnNbaV07XG4gICAgICAgICAgaWYgKCEkaW5qZWN0b3IuaGFzKGRyaXZlck5hbWUpKSBjb250aW51ZTsgLy8gVE9ETyhtYXRza28pOiByZW1vdmUgdGhpcyBjaGVja1xuXG4gICAgICAgICAgdmFyIGZhY3RvcnkgPSAkaW5qZWN0b3IuZ2V0KGRyaXZlck5hbWUpO1xuICAgICAgICAgIHZhciBkcml2ZXIgPSBmYWN0b3J5KGFuaW1hdGlvbkRldGFpbHMpO1xuICAgICAgICAgIGlmIChkcml2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkcml2ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGJlZm9yZVN0YXJ0KCkge1xuICAgICAgICBlbGVtZW50LmFkZENsYXNzKE5HX0FOSU1BVEVfQ0xBU1NOQU1FKTtcbiAgICAgICAgaWYgKHRlbXBDbGFzc2VzKSB7XG4gICAgICAgICAgJCRqcUxpdGUuYWRkQ2xhc3MoZWxlbWVudCwgdGVtcENsYXNzZXMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZUFuaW1hdGlvblJ1bm5lcnMoYW5pbWF0aW9uLCBuZXdSdW5uZXIpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbi5mcm9tICYmIGFuaW1hdGlvbi50bykge1xuICAgICAgICAgIHVwZGF0ZShhbmltYXRpb24uZnJvbS5lbGVtZW50KTtcbiAgICAgICAgICB1cGRhdGUoYW5pbWF0aW9uLnRvLmVsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZShhbmltYXRpb24uZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGUoZWxlbWVudCkge1xuICAgICAgICAgIGdldFJ1bm5lcihlbGVtZW50KS5zZXRIb3N0KG5ld1J1bm5lcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGFuZGxlRGVzdHJveWVkRWxlbWVudCgpIHtcbiAgICAgICAgdmFyIHJ1bm5lciA9IGdldFJ1bm5lcihlbGVtZW50KTtcbiAgICAgICAgaWYgKHJ1bm5lciAmJiAoZXZlbnQgIT09ICdsZWF2ZScgfHwgIW9wdGlvbnMuJCRkb21PcGVyYXRpb25GaXJlZCkpIHtcbiAgICAgICAgICBydW5uZXIuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2xvc2UocmVqZWN0ZWQpIHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgICAgIGVsZW1lbnQub2ZmKCckZGVzdHJveScsIGhhbmRsZURlc3Ryb3llZEVsZW1lbnQpO1xuICAgICAgICByZW1vdmVSdW5uZXIoZWxlbWVudCk7XG5cbiAgICAgICAgYXBwbHlBbmltYXRpb25DbGFzc2VzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBhcHBseUFuaW1hdGlvblN0eWxlcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgb3B0aW9ucy5kb21PcGVyYXRpb24oKTtcblxuICAgICAgICBpZiAodGVtcENsYXNzZXMpIHtcbiAgICAgICAgICAkJGpxTGl0ZS5yZW1vdmVDbGFzcyhlbGVtZW50LCB0ZW1wQ2xhc3Nlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKE5HX0FOSU1BVEVfQ0xBU1NOQU1FKTtcbiAgICAgICAgcnVubmVyLmNvbXBsZXRlKCFyZWplY3RlZCk7XG4gICAgICB9XG4gICAgfTtcbiAgfV07XG59XTtcblxuLyogZ2xvYmFsIGFuZ3VsYXJBbmltYXRlTW9kdWxlOiB0cnVlLFxuXG4gICAkJEFuaW1hdGVBc3luY1J1bkZhY3RvcnksXG4gICAkJHJBRlNjaGVkdWxlckZhY3RvcnksXG4gICAkJEFuaW1hdGVDaGlsZHJlbkRpcmVjdGl2ZSxcbiAgICQkQW5pbWF0ZVJ1bm5lckZhY3RvcnksXG4gICAkJEFuaW1hdGVRdWV1ZVByb3ZpZGVyLFxuICAgJCRBbmltYXRpb25Qcm92aWRlcixcbiAgICRBbmltYXRlQ3NzUHJvdmlkZXIsXG4gICAkJEFuaW1hdGVDc3NEcml2ZXJQcm92aWRlcixcbiAgICQkQW5pbWF0ZUpzUHJvdmlkZXIsXG4gICAkJEFuaW1hdGVKc0RyaXZlclByb3ZpZGVyLFxuKi9cblxuLyoqXG4gKiBAbmdkb2MgbW9kdWxlXG4gKiBAbmFtZSBuZ0FuaW1hdGVcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgbmdBbmltYXRlYCBtb2R1bGUgcHJvdmlkZXMgc3VwcG9ydCBmb3IgQ1NTLWJhc2VkIGFuaW1hdGlvbnMgKGtleWZyYW1lcyBhbmQgdHJhbnNpdGlvbnMpIGFzIHdlbGwgYXMgSmF2YVNjcmlwdC1iYXNlZCBhbmltYXRpb25zIHZpYVxuICogY2FsbGJhY2sgaG9va3MuIEFuaW1hdGlvbnMgYXJlIG5vdCBlbmFibGVkIGJ5IGRlZmF1bHQsIGhvd2V2ZXIsIGJ5IGluY2x1ZGluZyBgbmdBbmltYXRlYCB0aGUgYW5pbWF0aW9uIGhvb2tzIGFyZSBlbmFibGVkIGZvciBhbiBBbmd1bGFyIGFwcC5cbiAqXG4gKiA8ZGl2IGRvYy1tb2R1bGUtY29tcG9uZW50cz1cIm5nQW5pbWF0ZVwiPjwvZGl2PlxuICpcbiAqICMgVXNhZ2VcbiAqIFNpbXBseSBwdXQsIHRoZXJlIGFyZSB0d28gd2F5cyB0byBtYWtlIHVzZSBvZiBhbmltYXRpb25zIHdoZW4gbmdBbmltYXRlIGlzIHVzZWQ6IGJ5IHVzaW5nICoqQ1NTKiogYW5kICoqSmF2YVNjcmlwdCoqLiBUaGUgZm9ybWVyIHdvcmtzIHB1cmVseSBiYXNlZFxuICogdXNpbmcgQ1NTIChieSB1c2luZyBtYXRjaGluZyBDU1Mgc2VsZWN0b3JzL3N0eWxlcykgYW5kIHRoZSBsYXR0ZXIgdHJpZ2dlcnMgYW5pbWF0aW9ucyB0aGF0IGFyZSByZWdpc3RlcmVkIHZpYSBgbW9kdWxlLmFuaW1hdGlvbigpYC4gRm9yXG4gKiBib3RoIENTUyBhbmQgSlMgYW5pbWF0aW9ucyB0aGUgc29sZSByZXF1aXJlbWVudCBpcyB0byBoYXZlIGEgbWF0Y2hpbmcgYENTUyBjbGFzc2AgdGhhdCBleGlzdHMgYm90aCBpbiB0aGUgcmVnaXN0ZXJlZCBhbmltYXRpb24gYW5kIHdpdGhpblxuICogdGhlIEhUTUwgZWxlbWVudCB0aGF0IHRoZSBhbmltYXRpb24gd2lsbCBiZSB0cmlnZ2VyZWQgb24uXG4gKlxuICogIyMgRGlyZWN0aXZlIFN1cHBvcnRcbiAqIFRoZSBmb2xsb3dpbmcgZGlyZWN0aXZlcyBhcmUgXCJhbmltYXRpb24gYXdhcmVcIjpcbiAqXG4gKiB8IERpcmVjdGl2ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU3VwcG9ydGVkIEFuaW1hdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCB7QGxpbmsgbmcuZGlyZWN0aXZlOm5nUmVwZWF0I2FuaW1hdGlvbnMgbmdSZXBlYXR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVudGVyLCBsZWF2ZSBhbmQgbW92ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IHtAbGluayBuZ1JvdXRlLmRpcmVjdGl2ZTpuZ1ZpZXcjYW5pbWF0aW9ucyBuZ1ZpZXd9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZW50ZXIgYW5kIGxlYXZlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwge0BsaW5rIG5nLmRpcmVjdGl2ZTpuZ0luY2x1ZGUjYW5pbWF0aW9ucyBuZ0luY2x1ZGV9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlbnRlciBhbmQgbGVhdmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCB7QGxpbmsgbmcuZGlyZWN0aXZlOm5nU3dpdGNoI2FuaW1hdGlvbnMgbmdTd2l0Y2h9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVudGVyIGFuZCBsZWF2ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IHtAbGluayBuZy5kaXJlY3RpdmU6bmdJZiNhbmltYXRpb25zIG5nSWZ9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZW50ZXIgYW5kIGxlYXZlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwge0BsaW5rIG5nLmRpcmVjdGl2ZTpuZ0NsYXNzI2FuaW1hdGlvbnMgbmdDbGFzc30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhZGQgYW5kIHJlbW92ZSAodGhlIENTUyBjbGFzcyhlcykgcHJlc2VudCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCB7QGxpbmsgbmcuZGlyZWN0aXZlOm5nU2hvdyNhbmltYXRpb25zIG5nU2hvd30gJiB7QGxpbmsgbmcuZGlyZWN0aXZlOm5nSGlkZSNhbmltYXRpb25zIG5nSGlkZX0gICAgICAgICAgICB8IGFkZCBhbmQgcmVtb3ZlICh0aGUgbmctaGlkZSBjbGFzcyB2YWx1ZSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IHtAbGluayBuZy5kaXJlY3RpdmU6Zm9ybSNhbmltYXRpb24taG9va3MgZm9ybX0gJiB7QGxpbmsgbmcuZGlyZWN0aXZlOm5nTW9kZWwjYW5pbWF0aW9uLWhvb2tzIG5nTW9kZWx9ICAgIHwgYWRkIGFuZCByZW1vdmUgKGRpcnR5LCBwcmlzdGluZSwgdmFsaWQsIGludmFsaWQgJiBhbGwgb3RoZXIgdmFsaWRhdGlvbnMpIHxcbiAqIHwge0BsaW5rIG1vZHVsZTpuZ01lc3NhZ2VzI2FuaW1hdGlvbnMgbmdNZXNzYWdlc30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhZGQgYW5kIHJlbW92ZSAobmctYWN0aXZlICYgbmctaW5hY3RpdmUpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCB7QGxpbmsgbW9kdWxlOm5nTWVzc2FnZXMjYW5pbWF0aW9ucyBuZ01lc3NhZ2V9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVudGVyIGFuZCBsZWF2ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKlxuICogKE1vcmUgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGJ5IHZpc2l0aW5nIGVhY2ggdGhlIGRvY3VtZW50YXRpb24gYXNzb2NpYXRlZCB3aXRoIGVhY2ggZGlyZWN0aXZlLilcbiAqXG4gKiAjIyBDU1MtYmFzZWQgQW5pbWF0aW9uc1xuICpcbiAqIENTUy1iYXNlZCBhbmltYXRpb25zIHdpdGggbmdBbmltYXRlIGFyZSB1bmlxdWUgc2luY2UgdGhleSByZXF1aXJlIG5vIEphdmFTY3JpcHQgY29kZSBhdCBhbGwuIEJ5IHVzaW5nIGEgQ1NTIGNsYXNzIHRoYXQgd2UgcmVmZXJlbmNlIGJldHdlZW4gb3VyIEhUTUxcbiAqIGFuZCBDU1MgY29kZSB3ZSBjYW4gY3JlYXRlIGFuIGFuaW1hdGlvbiB0aGF0IHdpbGwgYmUgcGlja2VkIHVwIGJ5IEFuZ3VsYXIgd2hlbiBhbiB0aGUgdW5kZXJseWluZyBkaXJlY3RpdmUgcGVyZm9ybXMgYW4gb3BlcmF0aW9uLlxuICpcbiAqIFRoZSBleGFtcGxlIGJlbG93IHNob3dzIGhvdyBhbiBgZW50ZXJgIGFuaW1hdGlvbiBjYW4gYmUgbWFkZSBwb3NzaWJsZSBvbiBhbiBlbGVtZW50IHVzaW5nIGBuZy1pZmA6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBuZy1pZj1cImJvb2xcIiBjbGFzcz1cImZhZGVcIj5cbiAqICAgIEZhZGUgbWUgaW4gb3V0XG4gKiA8L2Rpdj5cbiAqIDxidXR0b24gbmctY2xpY2s9XCJib29sPXRydWVcIj5GYWRlIEluITwvYnV0dG9uPlxuICogPGJ1dHRvbiBuZy1jbGljaz1cImJvb2w9ZmFsc2VcIj5GYWRlIE91dCE8L2J1dHRvbj5cbiAqIGBgYFxuICpcbiAqIE5vdGljZSB0aGUgQ1NTIGNsYXNzICoqZmFkZSoqPyBXZSBjYW4gbm93IGNyZWF0ZSB0aGUgQ1NTIHRyYW5zaXRpb24gY29kZSB0aGF0IHJlZmVyZW5jZXMgdGhpcyBjbGFzczpcbiAqXG4gKiBgYGBjc3NcbiAqIC8mIzQyOyBUaGUgc3RhcnRpbmcgQ1NTIHN0eWxlcyBmb3IgdGhlIGVudGVyIGFuaW1hdGlvbiAmIzQyOy9cbiAqIC5mYWRlLm5nLWVudGVyIHtcbiAqICAgdHJhbnNpdGlvbjowLjVzIGxpbmVhciBhbGw7XG4gKiAgIG9wYWNpdHk6MDtcbiAqIH1cbiAqXG4gKiAvJiM0MjsgVGhlIGZpbmlzaGluZyBDU1Mgc3R5bGVzIGZvciB0aGUgZW50ZXIgYW5pbWF0aW9uICYjNDI7L1xuICogLmZhZGUubmctZW50ZXIubmctZW50ZXItYWN0aXZlIHtcbiAqICAgb3BhY2l0eToxO1xuICogfVxuICogYGBgXG4gKlxuICogVGhlIGtleSB0aGluZyB0byByZW1lbWJlciBoZXJlIGlzIHRoYXQsIGRlcGVuZGluZyBvbiB0aGUgYW5pbWF0aW9uIGV2ZW50ICh3aGljaCBlYWNoIG9mIHRoZSBkaXJlY3RpdmVzIGFib3ZlIHRyaWdnZXIgZGVwZW5kaW5nIG9uIHdoYXQncyBnb2luZyBvbikgdHdvXG4gKiBnZW5lcmF0ZWQgQ1NTIGNsYXNzZXMgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBlbGVtZW50OyBpbiB0aGUgZXhhbXBsZSBhYm92ZSB3ZSBoYXZlIGAubmctZW50ZXJgIGFuZCBgLm5nLWVudGVyLWFjdGl2ZWAuIEZvciBDU1MgdHJhbnNpdGlvbnMsIHRoZSB0cmFuc2l0aW9uXG4gKiBjb2RlICoqbXVzdCoqIGJlIGRlZmluZWQgd2l0aGluIHRoZSBzdGFydGluZyBDU1MgY2xhc3MgKGluIHRoaXMgY2FzZSBgLm5nLWVudGVyYCkuIFRoZSBkZXN0aW5hdGlvbiBjbGFzcyBpcyB3aGF0IHRoZSB0cmFuc2l0aW9uIHdpbGwgYW5pbWF0ZSB0b3dhcmRzLlxuICpcbiAqIElmIGZvciBleGFtcGxlIHdlIHdhbnRlZCB0byBjcmVhdGUgYW5pbWF0aW9ucyBmb3IgYGxlYXZlYCBhbmQgYG1vdmVgIChuZ1JlcGVhdCB0cmlnZ2VycyBtb3ZlKSB0aGVuIHdlIGNhbiBkbyBzbyB1c2luZyB0aGUgc2FtZSBDU1MgbmFtaW5nIGNvbnZlbnRpb25zOlxuICpcbiAqIGBgYGNzc1xuICogLyYjNDI7IG5vdyB0aGUgZWxlbWVudCB3aWxsIGZhZGUgb3V0IGJlZm9yZSBpdCBpcyByZW1vdmVkIGZyb20gdGhlIERPTSAmIzQyOy9cbiAqIC5mYWRlLm5nLWxlYXZlIHtcbiAqICAgdHJhbnNpdGlvbjowLjVzIGxpbmVhciBhbGw7XG4gKiAgIG9wYWNpdHk6MTtcbiAqIH1cbiAqIC5mYWRlLm5nLWxlYXZlLm5nLWxlYXZlLWFjdGl2ZSB7XG4gKiAgIG9wYWNpdHk6MDtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIFdlIGNhbiBhbHNvIG1ha2UgdXNlIG9mICoqQ1NTIEtleWZyYW1lcyoqIGJ5IHJlZmVyZW5jaW5nIHRoZSBrZXlmcmFtZSBhbmltYXRpb24gd2l0aGluIHRoZSBzdGFydGluZyBDU1MgY2xhc3M6XG4gKlxuICogYGBgY3NzXG4gKiAvJiM0MjsgdGhlcmUgaXMgbm8gbmVlZCB0byBkZWZpbmUgYW55dGhpbmcgaW5zaWRlIG9mIHRoZSBkZXN0aW5hdGlvblxuICogQ1NTIGNsYXNzIHNpbmNlIHRoZSBrZXlmcmFtZSB3aWxsIHRha2UgY2hhcmdlIG9mIHRoZSBhbmltYXRpb24gJiM0MjsvXG4gKiAuZmFkZS5uZy1sZWF2ZSB7XG4gKiAgIGFuaW1hdGlvbjogbXlfZmFkZV9hbmltYXRpb24gMC41cyBsaW5lYXI7XG4gKiAgIC13ZWJraXQtYW5pbWF0aW9uOiBteV9mYWRlX2FuaW1hdGlvbiAwLjVzIGxpbmVhcjtcbiAqIH1cbiAqXG4gKiBAa2V5ZnJhbWVzIG15X2ZhZGVfYW5pbWF0aW9uIHtcbiAqICAgZnJvbSB7IG9wYWNpdHk6MTsgfVxuICogICB0byB7IG9wYWNpdHk6MDsgfVxuICogfVxuICpcbiAqIEAtd2Via2l0LWtleWZyYW1lcyBteV9mYWRlX2FuaW1hdGlvbiB7XG4gKiAgIGZyb20geyBvcGFjaXR5OjE7IH1cbiAqICAgdG8geyBvcGFjaXR5OjA7IH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEZlZWwgZnJlZSBhbHNvIG1peCB0cmFuc2l0aW9ucyBhbmQga2V5ZnJhbWVzIHRvZ2V0aGVyIGFzIHdlbGwgYXMgYW55IG90aGVyIENTUyBjbGFzc2VzIG9uIHRoZSBzYW1lIGVsZW1lbnQuXG4gKlxuICogIyMjIENTUyBDbGFzcy1iYXNlZCBBbmltYXRpb25zXG4gKlxuICogQ2xhc3MtYmFzZWQgYW5pbWF0aW9ucyAoYW5pbWF0aW9ucyB0aGF0IGFyZSB0cmlnZ2VyZWQgdmlhIGBuZ0NsYXNzYCwgYG5nU2hvd2AsIGBuZ0hpZGVgIGFuZCBzb21lIG90aGVyIGRpcmVjdGl2ZXMpIGhhdmUgYSBzbGlnaHRseSBkaWZmZXJlbnRcbiAqIG5hbWluZyBjb252ZW50aW9uLiBDbGFzcy1iYXNlZCBhbmltYXRpb25zIGFyZSBiYXNpYyBlbm91Z2ggdGhhdCBhIHN0YW5kYXJkIHRyYW5zaXRpb24gb3Iga2V5ZnJhbWUgY2FuIGJlIHJlZmVyZW5jZWQgb24gdGhlIGNsYXNzIGJlaW5nIGFkZGVkXG4gKiBhbmQgcmVtb3ZlZC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBpZiB3ZSB3YW50ZWQgdG8gZG8gYSBDU1MgYW5pbWF0aW9uIGZvciBgbmdIaWRlYCB0aGVuIHdlIHBsYWNlIGFuIGFuaW1hdGlvbiBvbiB0aGUgYC5uZy1oaWRlYCBDU1MgY2xhc3M6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBuZy1zaG93PVwiYm9vbFwiIGNsYXNzPVwiZmFkZVwiPlxuICogICBTaG93IGFuZCBoaWRlIG1lXG4gKiA8L2Rpdj5cbiAqIDxidXR0b24gbmctY2xpY2s9XCJib29sPXRydWVcIj5Ub2dnbGU8L2J1dHRvbj5cbiAqXG4gKiA8c3R5bGU+XG4gKiAuZmFkZS5uZy1oaWRlIHtcbiAqICAgdHJhbnNpdGlvbjowLjVzIGxpbmVhciBhbGw7XG4gKiAgIG9wYWNpdHk6MDtcbiAqIH1cbiAqIDwvc3R5bGU+XG4gKiBgYGBcbiAqXG4gKiBBbGwgdGhhdCBpcyBnb2luZyBvbiBoZXJlIHdpdGggbmdTaG93L25nSGlkZSBiZWhpbmQgdGhlIHNjZW5lcyBpcyB0aGUgYC5uZy1oaWRlYCBjbGFzcyBpcyBhZGRlZC9yZW1vdmVkICh3aGVuIHRoZSBoaWRkZW4gc3RhdGUgaXMgdmFsaWQpLiBTaW5jZVxuICogbmdTaG93IGFuZCBuZ0hpZGUgYXJlIGFuaW1hdGlvbiBhd2FyZSB0aGVuIHdlIGNhbiBtYXRjaCB1cCBhIHRyYW5zaXRpb24gYW5kIG5nQW5pbWF0ZSBoYW5kbGVzIHRoZSByZXN0LlxuICpcbiAqIEluIGFkZGl0aW9uIHRoZSBhZGRpdGlvbiBhbmQgcmVtb3ZhbCBvZiB0aGUgQ1NTIGNsYXNzLCBuZ0FuaW1hdGUgYWxzbyBwcm92aWRlcyB0d28gaGVscGVyIG1ldGhvZHMgdGhhdCB3ZSBjYW4gdXNlIHRvIGZ1cnRoZXIgZGVjb3JhdGUgdGhlIGFuaW1hdGlvblxuICogd2l0aCBDU1Mgc3R5bGVzLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgbmctY2xhc3M9XCJ7b246b25PZmZ9XCIgY2xhc3M9XCJoaWdobGlnaHRcIj5cbiAqICAgSGlnaGxpZ2h0IHRoaXMgYm94XG4gKiA8L2Rpdj5cbiAqIDxidXR0b24gbmctY2xpY2s9XCJvbk9mZj0hb25PZmZcIj5Ub2dnbGU8L2J1dHRvbj5cbiAqXG4gKiA8c3R5bGU+XG4gKiAuaGlnaGxpZ2h0IHtcbiAqICAgdHJhbnNpdGlvbjowLjVzIGxpbmVhciBhbGw7XG4gKiB9XG4gKiAuaGlnaGxpZ2h0Lm9uLWFkZCB7XG4gKiAgIGJhY2tncm91bmQ6d2hpdGU7XG4gKiB9XG4gKiAuaGlnaGxpZ2h0Lm9uIHtcbiAqICAgYmFja2dyb3VuZDp5ZWxsb3c7XG4gKiB9XG4gKiAuaGlnaGxpZ2h0Lm9uLXJlbW92ZSB7XG4gKiAgIGJhY2tncm91bmQ6YmxhY2s7XG4gKiB9XG4gKiA8L3N0eWxlPlxuICogYGBgXG4gKlxuICogV2UgY2FuIGFsc28gbWFrZSB1c2Ugb2YgQ1NTIGtleWZyYW1lcyBieSBwbGFjaW5nIHRoZW0gd2l0aGluIHRoZSBDU1MgY2xhc3Nlcy5cbiAqXG4gKlxuICogIyMjIENTUyBTdGFnZ2VyaW5nIEFuaW1hdGlvbnNcbiAqIEEgU3RhZ2dlcmluZyBhbmltYXRpb24gaXMgYSBjb2xsZWN0aW9uIG9mIGFuaW1hdGlvbnMgdGhhdCBhcmUgaXNzdWVkIHdpdGggYSBzbGlnaHQgZGVsYXkgaW4gYmV0d2VlbiBlYWNoIHN1Y2Nlc3NpdmUgb3BlcmF0aW9uIHJlc3VsdGluZyBpbiBhXG4gKiBjdXJ0YWluLWxpa2UgZWZmZWN0LiBUaGUgbmdBbmltYXRlIG1vZHVsZSAodmVyc2lvbnMgPj0xLjIpIHN1cHBvcnRzIHN0YWdnZXJpbmcgYW5pbWF0aW9ucyBhbmQgdGhlIHN0YWdnZXIgZWZmZWN0IGNhbiBiZVxuICogcGVyZm9ybWVkIGJ5IGNyZWF0aW5nIGEgKipuZy1FVkVOVC1zdGFnZ2VyKiogQ1NTIGNsYXNzIGFuZCBhdHRhY2hpbmcgdGhhdCBjbGFzcyB0byB0aGUgYmFzZSBDU1MgY2xhc3MgdXNlZCBmb3JcbiAqIHRoZSBhbmltYXRpb24uIFRoZSBzdHlsZSBwcm9wZXJ0eSBleHBlY3RlZCB3aXRoaW4gdGhlIHN0YWdnZXIgY2xhc3MgY2FuIGVpdGhlciBiZSBhICoqdHJhbnNpdGlvbi1kZWxheSoqIG9yIGFuXG4gKiAqKmFuaW1hdGlvbi1kZWxheSoqIHByb3BlcnR5IChvciBib3RoIGlmIHlvdXIgYW5pbWF0aW9uIGNvbnRhaW5zIGJvdGggdHJhbnNpdGlvbnMgYW5kIGtleWZyYW1lIGFuaW1hdGlvbnMpLlxuICpcbiAqIGBgYGNzc1xuICogLm15LWFuaW1hdGlvbi5uZy1lbnRlciB7XG4gKiAgIC8mIzQyOyBzdGFuZGFyZCB0cmFuc2l0aW9uIGNvZGUgJiM0MjsvXG4gKiAgIHRyYW5zaXRpb246IDFzIGxpbmVhciBhbGw7XG4gKiAgIG9wYWNpdHk6MDtcbiAqIH1cbiAqIC5teS1hbmltYXRpb24ubmctZW50ZXItc3RhZ2dlciB7XG4gKiAgIC8mIzQyOyB0aGlzIHdpbGwgaGF2ZSBhIDEwMG1zIGRlbGF5IGJldHdlZW4gZWFjaCBzdWNjZXNzaXZlIGxlYXZlIGFuaW1hdGlvbiAmIzQyOy9cbiAqICAgdHJhbnNpdGlvbi1kZWxheTogMC4xcztcbiAqXG4gKiAgIC8mIzQyOyBBcyBvZiAxLjQuNCwgdGhpcyBtdXN0IGFsd2F5cyBiZSBzZXQ6IGl0IHNpZ25hbHMgbmdBbmltYXRlXG4gKiAgICAgdG8gbm90IGFjY2lkZW50YWxseSBpbmhlcml0IGEgZGVsYXkgcHJvcGVydHkgZnJvbSBhbm90aGVyIENTUyBjbGFzcyAmIzQyOy9cbiAqICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMHM7XG4gKiB9XG4gKiAubXktYW5pbWF0aW9uLm5nLWVudGVyLm5nLWVudGVyLWFjdGl2ZSB7XG4gKiAgIC8mIzQyOyBzdGFuZGFyZCB0cmFuc2l0aW9uIHN0eWxlcyAmIzQyOy9cbiAqICAgb3BhY2l0eToxO1xuICogfVxuICogYGBgXG4gKlxuICogU3RhZ2dlcmluZyBhbmltYXRpb25zIHdvcmsgYnkgZGVmYXVsdCBpbiBuZ1JlcGVhdCAoc28gbG9uZyBhcyB0aGUgQ1NTIGNsYXNzIGlzIGRlZmluZWQpLiBPdXRzaWRlIG9mIG5nUmVwZWF0LCB0byB1c2Ugc3RhZ2dlcmluZyBhbmltYXRpb25zXG4gKiBvbiB5b3VyIG93biwgdGhleSBjYW4gYmUgdHJpZ2dlcmVkIGJ5IGZpcmluZyBtdWx0aXBsZSBjYWxscyB0byB0aGUgc2FtZSBldmVudCBvbiAkYW5pbWF0ZS4gSG93ZXZlciwgdGhlIHJlc3RyaWN0aW9ucyBzdXJyb3VuZGluZyB0aGlzXG4gKiBhcmUgdGhhdCBlYWNoIG9mIHRoZSBlbGVtZW50cyBtdXN0IGhhdmUgdGhlIHNhbWUgQ1NTIGNsYXNzTmFtZSB2YWx1ZSBhcyB3ZWxsIGFzIHRoZSBzYW1lIHBhcmVudCBlbGVtZW50LiBBIHN0YWdnZXIgb3BlcmF0aW9uXG4gKiB3aWxsIGFsc28gYmUgcmVzZXQgaWYgb25lIG9yIG1vcmUgYW5pbWF0aW9uIGZyYW1lcyBoYXZlIHBhc3NlZCBzaW5jZSB0aGUgbXVsdGlwbGUgY2FsbHMgdG8gYCRhbmltYXRlYCB3ZXJlIGZpcmVkLlxuICpcbiAqIFRoZSBmb2xsb3dpbmcgY29kZSB3aWxsIGlzc3VlIHRoZSAqKm5nLWxlYXZlLXN0YWdnZXIqKiBldmVudCBvbiB0aGUgZWxlbWVudCBwcm92aWRlZDpcbiAqXG4gKiBgYGBqc1xuICogdmFyIGtpZHMgPSBwYXJlbnQuY2hpbGRyZW4oKTtcbiAqXG4gKiAkYW5pbWF0ZS5sZWF2ZShraWRzWzBdKTsgLy9zdGFnZ2VyIGluZGV4PTBcbiAqICRhbmltYXRlLmxlYXZlKGtpZHNbMV0pOyAvL3N0YWdnZXIgaW5kZXg9MVxuICogJGFuaW1hdGUubGVhdmUoa2lkc1syXSk7IC8vc3RhZ2dlciBpbmRleD0yXG4gKiAkYW5pbWF0ZS5sZWF2ZShraWRzWzNdKTsgLy9zdGFnZ2VyIGluZGV4PTNcbiAqICRhbmltYXRlLmxlYXZlKGtpZHNbNF0pOyAvL3N0YWdnZXIgaW5kZXg9NFxuICpcbiAqIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gKiAgIC8vc3RhZ2dlciBoYXMgcmVzZXQgaXRzZWxmXG4gKiAgICRhbmltYXRlLmxlYXZlKGtpZHNbNV0pOyAvL3N0YWdnZXIgaW5kZXg9MFxuICogICAkYW5pbWF0ZS5sZWF2ZShraWRzWzZdKTsgLy9zdGFnZ2VyIGluZGV4PTFcbiAqXG4gKiAgICRzY29wZS4kZGlnZXN0KCk7XG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIFN0YWdnZXIgYW5pbWF0aW9ucyBhcmUgY3VycmVudGx5IG9ubHkgc3VwcG9ydGVkIHdpdGhpbiBDU1MtZGVmaW5lZCBhbmltYXRpb25zLlxuICpcbiAqICMjIyBUaGUgYG5nLWFuaW1hdGVgIENTUyBjbGFzc1xuICpcbiAqIFdoZW4gbmdBbmltYXRlIGlzIGFuaW1hdGluZyBhbiBlbGVtZW50IGl0IHdpbGwgYXBwbHkgdGhlIGBuZy1hbmltYXRlYCBDU1MgY2xhc3MgdG8gdGhlIGVsZW1lbnQgZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uLlxuICogVGhpcyBpcyBhIHRlbXBvcmFyeSBDU1MgY2xhc3MgYW5kIGl0IHdpbGwgYmUgcmVtb3ZlZCBvbmNlIHRoZSBhbmltYXRpb24gaXMgb3ZlciAoZm9yIGJvdGggSmF2YVNjcmlwdCBhbmQgQ1NTLWJhc2VkIGFuaW1hdGlvbnMpLlxuICpcbiAqIFRoZXJlZm9yZSwgYW5pbWF0aW9ucyBjYW4gYmUgYXBwbGllZCB0byBhbiBlbGVtZW50IHVzaW5nIHRoaXMgdGVtcG9yYXJ5IGNsYXNzIGRpcmVjdGx5IHZpYSBDU1MuXG4gKlxuICogYGBgY3NzXG4gKiAuemlwcGVyLm5nLWFuaW1hdGUge1xuICogICB0cmFuc2l0aW9uOjAuNXMgbGluZWFyIGFsbDtcbiAqIH1cbiAqIC56aXBwZXIubmctZW50ZXIge1xuICogICBvcGFjaXR5OjA7XG4gKiB9XG4gKiAuemlwcGVyLm5nLWVudGVyLm5nLWVudGVyLWFjdGl2ZSB7XG4gKiAgIG9wYWNpdHk6MTtcbiAqIH1cbiAqIC56aXBwZXIubmctbGVhdmUge1xuICogICBvcGFjaXR5OjE7XG4gKiB9XG4gKiAuemlwcGVyLm5nLWxlYXZlLm5nLWxlYXZlLWFjdGl2ZSB7XG4gKiAgIG9wYWNpdHk6MDtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIChOb3RlIHRoYXQgdGhlIGBuZy1hbmltYXRlYCBDU1MgY2xhc3MgaXMgcmVzZXJ2ZWQgYW5kIGl0IGNhbm5vdCBiZSBhcHBsaWVkIG9uIGFuIGVsZW1lbnQgZGlyZWN0bHkgc2luY2UgbmdBbmltYXRlIHdpbGwgYWx3YXlzIHJlbW92ZVxuICogdGhlIENTUyBjbGFzcyBvbmNlIGFuIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkLilcbiAqXG4gKlxuICogIyMgSmF2YVNjcmlwdC1iYXNlZCBBbmltYXRpb25zXG4gKlxuICogbmdBbmltYXRlIGFsc28gYWxsb3dzIGZvciBhbmltYXRpb25zIHRvIGJlIGNvbnN1bWVkIGJ5IEphdmFTY3JpcHQgY29kZS4gVGhlIGFwcHJvYWNoIGlzIHNpbWlsYXIgdG8gQ1NTLWJhc2VkIGFuaW1hdGlvbnMgKHdoZXJlIHRoZXJlIGlzIGEgc2hhcmVkXG4gKiBDU1MgY2xhc3MgdGhhdCBpcyByZWZlcmVuY2VkIGluIG91ciBIVE1MIGNvZGUpIGJ1dCBpbiBhZGRpdGlvbiB3ZSBuZWVkIHRvIHJlZ2lzdGVyIHRoZSBKYXZhU2NyaXB0IGFuaW1hdGlvbiBvbiB0aGUgbW9kdWxlLiBCeSBtYWtpbmcgdXNlIG9mIHRoZVxuICogYG1vZHVsZS5hbmltYXRpb24oKWAgbW9kdWxlIGZ1bmN0aW9uIHdlIGNhbiByZWdpc3RlciB0aGUgYWlubWF0aW9uLlxuICpcbiAqIExldCdzIHNlZSBhbiBleGFtcGxlIG9mIGEgZW50ZXIvbGVhdmUgYW5pbWF0aW9uIHVzaW5nIGBuZ1JlcGVhdGA6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBuZy1yZXBlYXQ9XCJpdGVtIGluIGl0ZW1zXCIgY2xhc3M9XCJzbGlkZVwiPlxuICogICB7eyBpdGVtIH19XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICpcbiAqIFNlZSB0aGUgKipzbGlkZSoqIENTUyBjbGFzcz8gTGV0J3MgdXNlIHRoYXQgY2xhc3MgdG8gZGVmaW5lIGFuIGFuaW1hdGlvbiB0aGF0IHdlJ2xsIHN0cnVjdHVyZSBpbiBvdXIgbW9kdWxlIGNvZGUgYnkgdXNpbmcgYG1vZHVsZS5hbmltYXRpb25gOlxuICpcbiAqIGBgYGpzXG4gKiBteU1vZHVsZS5hbmltYXRpb24oJy5zbGlkZScsIFtmdW5jdGlvbigpIHtcbiAqICAgcmV0dXJuIHtcbiAqICAgICAvLyBtYWtlIG5vdGUgdGhhdCBvdGhlciBldmVudHMgKGxpa2UgYWRkQ2xhc3MvcmVtb3ZlQ2xhc3MpXG4gKiAgICAgLy8gaGF2ZSBkaWZmZXJlbnQgZnVuY3Rpb24gaW5wdXQgcGFyYW1ldGVyc1xuICogICAgIGVudGVyOiBmdW5jdGlvbihlbGVtZW50LCBkb25lRm4pIHtcbiAqICAgICAgIGpRdWVyeShlbGVtZW50KS5mYWRlSW4oMTAwMCwgZG9uZUZuKTtcbiAqXG4gKiAgICAgICAvLyByZW1lbWJlciB0byBjYWxsIGRvbmVGbiBzbyB0aGF0IGFuZ3VsYXJcbiAqICAgICAgIC8vIGtub3dzIHRoYXQgdGhlIGFuaW1hdGlvbiBoYXMgY29uY2x1ZGVkXG4gKiAgICAgfSxcbiAqXG4gKiAgICAgbW92ZTogZnVuY3Rpb24oZWxlbWVudCwgZG9uZUZuKSB7XG4gKiAgICAgICBqUXVlcnkoZWxlbWVudCkuZmFkZUluKDEwMDAsIGRvbmVGbik7XG4gKiAgICAgfSxcbiAqXG4gKiAgICAgbGVhdmU6IGZ1bmN0aW9uKGVsZW1lbnQsIGRvbmVGbikge1xuICogICAgICAgalF1ZXJ5KGVsZW1lbnQpLmZhZGVPdXQoMTAwMCwgZG9uZUZuKTtcbiAqICAgICB9XG4gKiAgIH1cbiAqIH1dKTtcbiAqIGBgYFxuICpcbiAqIFRoZSBuaWNlIHRoaW5nIGFib3V0IEpTLWJhc2VkIGFuaW1hdGlvbnMgaXMgdGhhdCB3ZSBjYW4gaW5qZWN0IG90aGVyIHNlcnZpY2VzIGFuZCBtYWtlIHVzZSBvZiBhZHZhbmNlZCBhbmltYXRpb24gbGlicmFyaWVzIHN1Y2ggYXNcbiAqIGdyZWVuc29jay5qcyBhbmQgdmVsb2NpdHkuanMuXG4gKlxuICogSWYgb3VyIGFuaW1hdGlvbiBjb2RlIGNsYXNzLWJhc2VkIChtZWFuaW5nIHRoYXQgc29tZXRoaW5nIGxpa2UgYG5nQ2xhc3NgLCBgbmdIaWRlYCBhbmQgYG5nU2hvd2AgdHJpZ2dlcnMgaXQpIHRoZW4gd2UgY2FuIHN0aWxsIGRlZmluZVxuICogb3VyIGFuaW1hdGlvbnMgaW5zaWRlIG9mIHRoZSBzYW1lIHJlZ2lzdGVyZWQgYW5pbWF0aW9uLCBob3dldmVyLCB0aGUgZnVuY3Rpb24gaW5wdXQgYXJndW1lbnRzIGFyZSBhIGJpdCBkaWZmZXJlbnQ6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBuZy1jbGFzcz1cImNvbG9yXCIgY2xhc3M9XCJjb2xvcmZ1bFwiPlxuICogICB0aGlzIGJveCBpcyBtb29keVxuICogPC9kaXY+XG4gKiA8YnV0dG9uIG5nLWNsaWNrPVwiY29sb3I9J3JlZCdcIj5DaGFuZ2UgdG8gcmVkPC9idXR0b24+XG4gKiA8YnV0dG9uIG5nLWNsaWNrPVwiY29sb3I9J2JsdWUnXCI+Q2hhbmdlIHRvIGJsdWU8L2J1dHRvbj5cbiAqIDxidXR0b24gbmctY2xpY2s9XCJjb2xvcj0nZ3JlZW4nXCI+Q2hhbmdlIHRvIGdyZWVuPC9idXR0b24+XG4gKiBgYGBcbiAqXG4gKiBgYGBqc1xuICogbXlNb2R1bGUuYW5pbWF0aW9uKCcuY29sb3JmdWwnLCBbZnVuY3Rpb24oKSB7XG4gKiAgIHJldHVybiB7XG4gKiAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIGNsYXNzTmFtZSwgZG9uZUZuKSB7XG4gKiAgICAgICAvLyBkbyBzb21lIGNvb2wgYW5pbWF0aW9uIGFuZCBjYWxsIHRoZSBkb25lRm5cbiAqICAgICB9LFxuICogICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlbGVtZW50LCBjbGFzc05hbWUsIGRvbmVGbikge1xuICogICAgICAgLy8gZG8gc29tZSBjb29sIGFuaW1hdGlvbiBhbmQgY2FsbCB0aGUgZG9uZUZuXG4gKiAgICAgfSxcbiAqICAgICBzZXRDbGFzczogZnVuY3Rpb24oZWxlbWVudCwgYWRkZWRDbGFzcywgcmVtb3ZlZENsYXNzLCBkb25lRm4pIHtcbiAqICAgICAgIC8vIGRvIHNvbWUgY29vbCBhbmltYXRpb24gYW5kIGNhbGwgdGhlIGRvbmVGblxuICogICAgIH1cbiAqICAgfVxuICogfV0pO1xuICogYGBgXG4gKlxuICogIyMgQ1NTICsgSlMgQW5pbWF0aW9ucyBUb2dldGhlclxuICpcbiAqIEFuZ3VsYXJKUyAxLjQgYW5kIGhpZ2hlciBoYXMgdGFrZW4gc3RlcHMgdG8gbWFrZSB0aGUgYW1hbGdhbWF0aW9uIG9mIENTUyBhbmQgSlMgYW5pbWF0aW9ucyBtb3JlIGZsZXhpYmxlLiBIb3dldmVyLCB1bmxpa2UgZWFybGllciB2ZXJzaW9ucyBvZiBBbmd1bGFyLFxuICogZGVmaW5pbmcgQ1NTIGFuZCBKUyBhbmltYXRpb25zIHRvIHdvcmsgb2ZmIG9mIHRoZSBzYW1lIENTUyBjbGFzcyB3aWxsIG5vdCB3b3JrIGFueW1vcmUuIFRoZXJlZm9yZSB0aGUgZXhhbXBsZSBiZWxvdyB3aWxsIG9ubHkgcmVzdWx0IGluICoqSlMgYW5pbWF0aW9ucyB0YWtpbmdcbiAqIGNoYXJnZSBvZiB0aGUgYW5pbWF0aW9uKio6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBuZy1pZj1cImJvb2xcIiBjbGFzcz1cInNsaWRlXCI+XG4gKiAgIFNsaWRlIGluIGFuZCBvdXRcbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogYGBganNcbiAqIG15TW9kdWxlLmFuaW1hdGlvbignLnNsaWRlJywgW2Z1bmN0aW9uKCkge1xuICogICByZXR1cm4ge1xuICogICAgIGVudGVyOiBmdW5jdGlvbihlbGVtZW50LCBkb25lRm4pIHtcbiAqICAgICAgIGpRdWVyeShlbGVtZW50KS5zbGlkZUluKDEwMDAsIGRvbmVGbik7XG4gKiAgICAgfVxuICogICB9XG4gKiB9XSk7XG4gKiBgYGBcbiAqXG4gKiBgYGBjc3NcbiAqIC5zbGlkZS5uZy1lbnRlciB7XG4gKiAgIHRyYW5zaXRpb246MC41cyBsaW5lYXIgYWxsO1xuICogICB0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMTAwcHgpO1xuICogfVxuICogLnNsaWRlLm5nLWVudGVyLm5nLWVudGVyLWFjdGl2ZSB7XG4gKiAgIHRyYW5zZm9ybTp0cmFuc2xhdGVZKDApO1xuICogfVxuICogYGBgXG4gKlxuICogRG9lcyB0aGlzIG1lYW4gdGhhdCBDU1MgYW5kIEpTIGFuaW1hdGlvbnMgY2Fubm90IGJlIHVzZWQgdG9nZXRoZXI/IERvIEpTLWJhc2VkIGFuaW1hdGlvbnMgYWx3YXlzIGhhdmUgaGlnaGVyIHByaW9yaXR5PyBXZSBjYW4gbWFrZSB1cCBmb3IgdGhlXG4gKiBsYWNrIG9mIENTUyBhbmltYXRpb25zIGJ5IHVzaW5nIHRoZSBgJGFuaW1hdGVDc3NgIHNlcnZpY2UgdG8gdHJpZ2dlciBvdXIgb3duIHR3ZWFrZWQtb3V0LCBDU1MtYmFzZWQgYW5pbWF0aW9ucyBkaXJlY3RseSBmcm9tXG4gKiBvdXIgb3duIEpTLWJhc2VkIGFuaW1hdGlvbiBjb2RlOlxuICpcbiAqIGBgYGpzXG4gKiBteU1vZHVsZS5hbmltYXRpb24oJy5zbGlkZScsIFsnJGFuaW1hdGVDc3MnLCBmdW5jdGlvbigkYW5pbWF0ZUNzcykge1xuICogICByZXR1cm4ge1xuICogICAgIGVudGVyOiBmdW5jdGlvbihlbGVtZW50KSB7XG4qICAgICAgICAvLyB0aGlzIHdpbGwgdHJpZ2dlciBgLnNsaWRlLm5nLWVudGVyYCBhbmQgYC5zbGlkZS5uZy1lbnRlci1hY3RpdmVgLlxuICogICAgICAgcmV0dXJuICRhbmltYXRlQ3NzKGVsZW1lbnQsIHtcbiAqICAgICAgICAgZXZlbnQ6ICdlbnRlcicsXG4gKiAgICAgICAgIHN0cnVjdHVyYWw6IHRydWVcbiAqICAgICAgIH0pO1xuICogICAgIH1cbiAqICAgfVxuICogfV0pO1xuICogYGBgXG4gKlxuICogVGhlIG5pY2UgdGhpbmcgaGVyZSBpcyB0aGF0IHdlIGNhbiBzYXZlIGJhbmR3aWR0aCBieSBzdGlja2luZyB0byBvdXIgQ1NTLWJhc2VkIGFuaW1hdGlvbiBjb2RlIGFuZCB3ZSBkb24ndCBuZWVkIHRvIHJlbHkgb24gYSAzcmQtcGFydHkgYW5pbWF0aW9uIGZyYW1ld29yay5cbiAqXG4gKiBUaGUgYCRhbmltYXRlQ3NzYCBzZXJ2aWNlIGlzIHZlcnkgcG93ZXJmdWwgc2luY2Ugd2UgY2FuIGZlZWQgaW4gYWxsIGtpbmRzIG9mIGV4dHJhIHByb3BlcnRpZXMgdGhhdCB3aWxsIGJlIGV2YWx1YXRlZCBhbmQgZmVkIGludG8gYSBDU1MgdHJhbnNpdGlvbiBvclxuICoga2V5ZnJhbWUgYW5pbWF0aW9uLiBGb3IgZXhhbXBsZSBpZiB3ZSB3YW50ZWQgdG8gYW5pbWF0ZSB0aGUgaGVpZ2h0IG9mIGFuIGVsZW1lbnQgd2hpbGUgYWRkaW5nIGFuZCByZW1vdmluZyBjbGFzc2VzIHRoZW4gd2UgY2FuIGRvIHNvIGJ5IHByb3ZpZGluZyB0aGF0XG4gKiBkYXRhIGludG8gYCRhbmltYXRlQ3NzYCBkaXJlY3RseTpcbiAqXG4gKiBgYGBqc1xuICogbXlNb2R1bGUuYW5pbWF0aW9uKCcuc2xpZGUnLCBbJyRhbmltYXRlQ3NzJywgZnVuY3Rpb24oJGFuaW1hdGVDc3MpIHtcbiAqICAgcmV0dXJuIHtcbiAqICAgICBlbnRlcjogZnVuY3Rpb24oZWxlbWVudCkge1xuICogICAgICAgcmV0dXJuICRhbmltYXRlQ3NzKGVsZW1lbnQsIHtcbiAqICAgICAgICAgZXZlbnQ6ICdlbnRlcicsXG4gKiAgICAgICAgIHN0cnVjdHVyYWw6IHRydWUsXG4gKiAgICAgICAgIGFkZENsYXNzOiAnbWFyb29uLXNldHRpbmcnLFxuICogICAgICAgICBmcm9tOiB7IGhlaWdodDowIH0sXG4gKiAgICAgICAgIHRvOiB7IGhlaWdodDogMjAwIH1cbiAqICAgICAgIH0pO1xuICogICAgIH1cbiAqICAgfVxuICogfV0pO1xuICogYGBgXG4gKlxuICogTm93IHdlIGNhbiBmaWxsIGluIHRoZSByZXN0IHZpYSBvdXIgdHJhbnNpdGlvbiBDU1MgY29kZTpcbiAqXG4gKiBgYGBjc3NcbiAqIC8mIzQyOyB0aGUgdHJhbnNpdGlvbiB0ZWxscyBuZ0FuaW1hdGUgdG8gbWFrZSB0aGUgYW5pbWF0aW9uIGhhcHBlbiAmIzQyOy9cbiAqIC5zbGlkZS5uZy1lbnRlciB7IHRyYW5zaXRpb246MC41cyBsaW5lYXIgYWxsOyB9XG4gKlxuICogLyYjNDI7IHRoaXMgZXh0cmEgQ1NTIGNsYXNzIHdpbGwgYmUgYWJzb3JiZWQgaW50byB0aGUgdHJhbnNpdGlvblxuICogc2luY2UgdGhlICRhbmltYXRlQ3NzIGNvZGUgaXMgYWRkaW5nIHRoZSBjbGFzcyAmIzQyOy9cbiAqIC5tYXJvb24tc2V0dGluZyB7IGJhY2tncm91bmQ6cmVkOyB9XG4gKiBgYGBcbiAqXG4gKiBBbmQgYCRhbmltYXRlQ3NzYCB3aWxsIGZpZ3VyZSBvdXQgdGhlIHJlc3QuIEp1c3QgbWFrZSBzdXJlIHRvIGhhdmUgdGhlIGBkb25lKClgIGNhbGxiYWNrIGZpcmUgdGhlIGBkb25lRm5gIGZ1bmN0aW9uIHRvIHNpZ25hbCB3aGVuIHRoZSBhbmltYXRpb24gaXMgb3Zlci5cbiAqXG4gKiBUbyBsZWFybiBtb3JlIGFib3V0IHdoYXQncyBwb3NzaWJsZSBiZSBzdXJlIHRvIHZpc2l0IHRoZSB7QGxpbmsgbmdBbmltYXRlLiRhbmltYXRlQ3NzICRhbmltYXRlQ3NzIHNlcnZpY2V9LlxuICpcbiAqICMjIEFuaW1hdGlvbiBBbmNob3JpbmcgKHZpYSBgbmctYW5pbWF0ZS1yZWZgKVxuICpcbiAqIG5nQW5pbWF0ZSBpbiBBbmd1bGFySlMgMS40IGNvbWVzIHBhY2tlZCB3aXRoIHRoZSBhYmlsaXR5IHRvIGNyb3NzLWFuaW1hdGUgZWxlbWVudHMgYmV0d2VlblxuICogc3RydWN0dXJhbCBhcmVhcyBvZiBhbiBhcHBsaWNhdGlvbiAobGlrZSB2aWV3cykgYnkgcGFpcmluZyB1cCBlbGVtZW50cyB1c2luZyBhbiBhdHRyaWJ1dGVcbiAqIGNhbGxlZCBgbmctYW5pbWF0ZS1yZWZgLlxuICpcbiAqIExldCdzIHNheSBmb3IgZXhhbXBsZSB3ZSBoYXZlIHR3byB2aWV3cyB0aGF0IGFyZSBtYW5hZ2VkIGJ5IGBuZy12aWV3YCBhbmQgd2Ugd2FudCB0byBzaG93XG4gKiB0aGF0IHRoZXJlIGlzIGEgcmVsYXRpb25zaGlwIGJldHdlZW4gdHdvIGNvbXBvbmVudHMgc2l0dWF0ZWQgaW4gd2l0aGluIHRoZXNlIHZpZXdzLiBCeSB1c2luZyB0aGVcbiAqIGBuZy1hbmltYXRlLXJlZmAgYXR0cmlidXRlIHdlIGNhbiBpZGVudGlmeSB0aGF0IHRoZSB0d28gY29tcG9uZW50cyBhcmUgcGFpcmVkIHRvZ2V0aGVyIGFuZCB3ZVxuICogY2FuIHRoZW4gYXR0YWNoIGFuIGFuaW1hdGlvbiwgd2hpY2ggaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIHZpZXcgY2hhbmdlcy5cbiAqXG4gKiBTYXkgZm9yIGV4YW1wbGUgd2UgaGF2ZSB0aGUgZm9sbG93aW5nIHRlbXBsYXRlIGNvZGU6XG4gKlxuICogYGBgaHRtbFxuICogPCEtLSBpbmRleC5odG1sIC0tPlxuICogPGRpdiBuZy12aWV3IGNsYXNzPVwidmlldy1hbmltYXRpb25cIj5cbiAqIDwvZGl2PlxuICpcbiAqIDwhLS0gaG9tZS5odG1sIC0tPlxuICogPGEgaHJlZj1cIiMvYmFubmVyLXBhZ2VcIj5cbiAqICAgPGltZyBzcmM9XCIuL2Jhbm5lci5qcGdcIiBjbGFzcz1cImJhbm5lclwiIG5nLWFuaW1hdGUtcmVmPVwiYmFubmVyXCI+XG4gKiA8L2E+XG4gKlxuICogPCEtLSBiYW5uZXItcGFnZS5odG1sIC0tPlxuICogPGltZyBzcmM9XCIuL2Jhbm5lci5qcGdcIiBjbGFzcz1cImJhbm5lclwiIG5nLWFuaW1hdGUtcmVmPVwiYmFubmVyXCI+XG4gKiBgYGBcbiAqXG4gKiBOb3csIHdoZW4gdGhlIHZpZXcgY2hhbmdlcyAob25jZSB0aGUgbGluayBpcyBjbGlja2VkKSwgbmdBbmltYXRlIHdpbGwgZXhhbWluZSB0aGVcbiAqIEhUTUwgY29udGVudHMgdG8gc2VlIGlmIHRoZXJlIGlzIGEgbWF0Y2ggcmVmZXJlbmNlIGJldHdlZW4gYW55IGNvbXBvbmVudHMgaW4gdGhlIHZpZXdcbiAqIHRoYXQgaXMgbGVhdmluZyBhbmQgdGhlIHZpZXcgdGhhdCBpcyBlbnRlcmluZy4gSXQgd2lsbCBzY2FuIGJvdGggdGhlIHZpZXcgd2hpY2ggaXMgYmVpbmdcbiAqIHJlbW92ZWQgKGxlYXZlKSBhbmQgaW5zZXJ0ZWQgKGVudGVyKSB0byBzZWUgaWYgdGhlcmUgYXJlIGFueSBwYWlyZWQgRE9NIGVsZW1lbnRzIHRoYXRcbiAqIGNvbnRhaW4gYSBtYXRjaGluZyByZWYgdmFsdWUuXG4gKlxuICogVGhlIHR3byBpbWFnZXMgbWF0Y2ggc2luY2UgdGhleSBzaGFyZSB0aGUgc2FtZSByZWYgdmFsdWUuIG5nQW5pbWF0ZSB3aWxsIG5vdyBjcmVhdGUgYVxuICogdHJhbnNwb3J0IGVsZW1lbnQgKHdoaWNoIGlzIGEgY2xvbmUgb2YgdGhlIGZpcnN0IGltYWdlIGVsZW1lbnQpIGFuZCBpdCB3aWxsIHRoZW4gYXR0ZW1wdFxuICogdG8gYW5pbWF0ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHNlY29uZCBpbWFnZSBlbGVtZW50IGluIHRoZSBuZXh0IHZpZXcuIEZvciB0aGUgYW5pbWF0aW9uIHRvXG4gKiB3b3JrIGEgc3BlY2lhbCBDU1MgY2xhc3MgY2FsbGVkIGBuZy1hbmNob3JgIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHRyYW5zcG9ydGVkIGVsZW1lbnQuXG4gKlxuICogV2UgY2FuIG5vdyBhdHRhY2ggYSB0cmFuc2l0aW9uIG9udG8gdGhlIGAuYmFubmVyLm5nLWFuY2hvcmAgQ1NTIGNsYXNzIGFuZCB0aGVuXG4gKiBuZ0FuaW1hdGUgd2lsbCBoYW5kbGUgdGhlIGVudGlyZSB0cmFuc2l0aW9uIGZvciB1cyBhcyB3ZWxsIGFzIHRoZSBhZGRpdGlvbiBhbmQgcmVtb3ZhbCBvZlxuICogYW55IGNoYW5nZXMgb2YgQ1NTIGNsYXNzZXMgYmV0d2VlbiB0aGUgZWxlbWVudHM6XG4gKlxuICogYGBgY3NzXG4gKiAuYmFubmVyLm5nLWFuY2hvciB7XG4gKiAgIC8mIzQyOyB0aGlzIGFuaW1hdGlvbiB3aWxsIGxhc3QgZm9yIDEgc2Vjb25kIHNpbmNlIHRoZXJlIGFyZVxuICogICAgICAgICAgdHdvIHBoYXNlcyB0byB0aGUgYW5pbWF0aW9uIChhbiBgaW5gIGFuZCBhbiBgb3V0YCBwaGFzZSkgJiM0MjsvXG4gKiAgIHRyYW5zaXRpb246MC41cyBsaW5lYXIgYWxsO1xuICogfVxuICogYGBgXG4gKlxuICogV2UgYWxzbyAqKm11c3QqKiBpbmNsdWRlIGFuaW1hdGlvbnMgZm9yIHRoZSB2aWV3cyB0aGF0IGFyZSBiZWluZyBlbnRlcmVkIGFuZCByZW1vdmVkXG4gKiAob3RoZXJ3aXNlIGFuY2hvcmluZyB3b3VsZG4ndCBiZSBwb3NzaWJsZSBzaW5jZSB0aGUgbmV3IHZpZXcgd291bGQgYmUgaW5zZXJ0ZWQgcmlnaHQgYXdheSkuXG4gKlxuICogYGBgY3NzXG4gKiAudmlldy1hbmltYXRpb24ubmctZW50ZXIsIC52aWV3LWFuaW1hdGlvbi5uZy1sZWF2ZSB7XG4gKiAgIHRyYW5zaXRpb246MC41cyBsaW5lYXIgYWxsO1xuICogICBwb3NpdGlvbjpmaXhlZDtcbiAqICAgbGVmdDowO1xuICogICB0b3A6MDtcbiAqICAgd2lkdGg6MTAwJTtcbiAqIH1cbiAqIC52aWV3LWFuaW1hdGlvbi5uZy1lbnRlciB7XG4gKiAgIHRyYW5zZm9ybTp0cmFuc2xhdGVYKDEwMCUpO1xuICogfVxuICogLnZpZXctYW5pbWF0aW9uLm5nLWxlYXZlLFxuICogLnZpZXctYW5pbWF0aW9uLm5nLWVudGVyLm5nLWVudGVyLWFjdGl2ZSB7XG4gKiAgIHRyYW5zZm9ybTp0cmFuc2xhdGVYKDAlKTtcbiAqIH1cbiAqIC52aWV3LWFuaW1hdGlvbi5uZy1sZWF2ZS5uZy1sZWF2ZS1hY3RpdmUge1xuICogICB0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTAwJSk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBOb3cgd2UgY2FuIGp1bXAgYmFjayB0byB0aGUgYW5jaG9yIGFuaW1hdGlvbi4gV2hlbiB0aGUgYW5pbWF0aW9uIGhhcHBlbnMsIHRoZXJlIGFyZSB0d28gc3RhZ2VzIHRoYXQgb2NjdXI6XG4gKiBhbiBgb3V0YCBhbmQgYW4gYGluYCBzdGFnZS4gVGhlIGBvdXRgIHN0YWdlIGhhcHBlbnMgZmlyc3QgYW5kIHRoYXQgaXMgd2hlbiB0aGUgZWxlbWVudCBpcyBhbmltYXRlZCBhd2F5XG4gKiBmcm9tIGl0cyBvcmlnaW4uIE9uY2UgdGhhdCBhbmltYXRpb24gaXMgb3ZlciB0aGVuIHRoZSBgaW5gIHN0YWdlIG9jY3VycyB3aGljaCBhbmltYXRlcyB0aGVcbiAqIGVsZW1lbnQgdG8gaXRzIGRlc3RpbmF0aW9uLiBUaGUgcmVhc29uIHdoeSB0aGVyZSBhcmUgdHdvIGFuaW1hdGlvbnMgaXMgdG8gZ2l2ZSBlbm91Z2ggdGltZVxuICogZm9yIHRoZSBlbnRlciBhbmltYXRpb24gb24gdGhlIG5ldyBlbGVtZW50IHRvIGJlIHJlYWR5LlxuICpcbiAqIFRoZSBleGFtcGxlIGFib3ZlIHNldHMgdXAgYSB0cmFuc2l0aW9uIGZvciBib3RoIHRoZSBpbiBhbmQgb3V0IHBoYXNlcywgYnV0IHdlIGNhbiBhbHNvIHRhcmdldCB0aGUgb3V0IG9yXG4gKiBpbiBwaGFzZXMgZGlyZWN0bHkgdmlhIGBuZy1hbmNob3Itb3V0YCBhbmQgYG5nLWFuY2hvci1pbmAuXG4gKlxuICogYGBgY3NzXG4gKiAuYmFubmVyLm5nLWFuY2hvci1vdXQge1xuICogICB0cmFuc2l0aW9uOiAwLjVzIGxpbmVhciBhbGw7XG4gKlxuICogICAvJiM0MjsgdGhlIHNjYWxlIHdpbGwgYmUgYXBwbGllZCBkdXJpbmcgdGhlIG91dCBhbmltYXRpb24sXG4gKiAgICAgICAgICBidXQgd2lsbCBiZSBhbmltYXRlZCBhd2F5IHdoZW4gdGhlIGluIGFuaW1hdGlvbiBydW5zICYjNDI7L1xuICogICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XG4gKiB9XG4gKlxuICogLmJhbm5lci5uZy1hbmNob3ItaW4ge1xuICogICB0cmFuc2l0aW9uOiAxcyBsaW5lYXIgYWxsO1xuICogfVxuICogYGBgXG4gKlxuICpcbiAqXG4gKlxuICogIyMjIEFuY2hvcmluZyBEZW1vXG4gKlxuICA8ZXhhbXBsZSBtb2R1bGU9XCJhbmNob3JpbmdFeGFtcGxlXCJcbiAgICAgICAgICAgbmFtZT1cImFuY2hvcmluZ0V4YW1wbGVcIlxuICAgICAgICAgICBpZD1cImFuY2hvcmluZ0V4YW1wbGVcIlxuICAgICAgICAgICBkZXBzPVwiYW5ndWxhci1hbmltYXRlLmpzO2FuZ3VsYXItcm91dGUuanNcIlxuICAgICAgICAgICBhbmltYXRpb25zPVwidHJ1ZVwiPlxuICAgIDxmaWxlIG5hbWU9XCJpbmRleC5odG1sXCI+XG4gICAgICA8YSBocmVmPVwiIy9cIj5Ib21lPC9hPlxuICAgICAgPGhyIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwidmlldy1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBuZy12aWV3IGNsYXNzPVwidmlld1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9maWxlPlxuICAgIDxmaWxlIG5hbWU9XCJzY3JpcHQuanNcIj5cbiAgICAgIGFuZ3VsYXIubW9kdWxlKCdhbmNob3JpbmdFeGFtcGxlJywgWyduZ0FuaW1hdGUnLCAnbmdSb3V0ZSddKVxuICAgICAgICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xuICAgICAgICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy8nLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXIgYXMgaG9tZSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkcm91dGVQcm92aWRlci53aGVuKCcvcHJvZmlsZS86aWQnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Byb2ZpbGUuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUNvbnRyb2xsZXIgYXMgcHJvZmlsZSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfV0pXG4gICAgICAgIC5ydW4oWyckcm9vdFNjb3BlJywgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICAgICAgICAgICRyb290U2NvcGUucmVjb3JkcyA9IFtcbiAgICAgICAgICAgIHsgaWQ6MSwgdGl0bGU6IFwiTWlzcyBCZXVsYWggUm9vYlwiIH0sXG4gICAgICAgICAgICB7IGlkOjIsIHRpdGxlOiBcIlRyZW50IE1vcmlzc2V0dGVcIiB9LFxuICAgICAgICAgICAgeyBpZDozLCB0aXRsZTogXCJNaXNzIEF2YSBQb3Vyb3NcIiB9LFxuICAgICAgICAgICAgeyBpZDo0LCB0aXRsZTogXCJSb2QgUG91cm9zXCIgfSxcbiAgICAgICAgICAgIHsgaWQ6NSwgdGl0bGU6IFwiQWJkdWwgUmljZVwiIH0sXG4gICAgICAgICAgICB7IGlkOjYsIHRpdGxlOiBcIkxhdXJpZSBSdXRoZXJmb3JkIFNyLlwiIH0sXG4gICAgICAgICAgICB7IGlkOjcsIHRpdGxlOiBcIk5ha2lhIE1jTGF1Z2hsaW5cIiB9LFxuICAgICAgICAgICAgeyBpZDo4LCB0aXRsZTogXCJKb3Jkb24gQmxhbmRhIERWTVwiIH0sXG4gICAgICAgICAgICB7IGlkOjksIHRpdGxlOiBcIlJob2RhIEhhbmRcIiB9LFxuICAgICAgICAgICAgeyBpZDoxMCwgdGl0bGU6IFwiQWxleGFuZHJlYSBTYXVlclwiIH1cbiAgICAgICAgICBdO1xuICAgICAgICB9XSlcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgW2Z1bmN0aW9uKCkge1xuICAgICAgICAgIC8vZW1wdHlcbiAgICAgICAgfV0pXG4gICAgICAgIC5jb250cm9sbGVyKCdQcm9maWxlQ29udHJvbGxlcicsIFsnJHJvb3RTY29wZScsICckcm91dGVQYXJhbXMnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkcm91dGVQYXJhbXMpIHtcbiAgICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludCgkcm91dGVQYXJhbXMuaWQsIDEwKTtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gJHJvb3RTY29wZS5yZWNvcmRzW2luZGV4IC0gMV07XG5cbiAgICAgICAgICB0aGlzLnRpdGxlID0gcmVjb3JkLnRpdGxlO1xuICAgICAgICAgIHRoaXMuaWQgPSByZWNvcmQuaWQ7XG4gICAgICAgIH1dKTtcbiAgICA8L2ZpbGU+XG4gICAgPGZpbGUgbmFtZT1cImhvbWUuaHRtbFwiPlxuICAgICAgPGgyPldlbGNvbWUgdG8gdGhlIGhvbWUgcGFnZTwvaDE+XG4gICAgICA8cD5QbGVhc2UgY2xpY2sgb24gYW4gZWxlbWVudDwvcD5cbiAgICAgIDxhIGNsYXNzPVwicmVjb3JkXCJcbiAgICAgICAgIG5nLWhyZWY9XCIjL3Byb2ZpbGUve3sgcmVjb3JkLmlkIH19XCJcbiAgICAgICAgIG5nLWFuaW1hdGUtcmVmPVwie3sgcmVjb3JkLmlkIH19XCJcbiAgICAgICAgIG5nLXJlcGVhdD1cInJlY29yZCBpbiByZWNvcmRzXCI+XG4gICAgICAgIHt7IHJlY29yZC50aXRsZSB9fVxuICAgICAgPC9hPlxuICAgIDwvZmlsZT5cbiAgICA8ZmlsZSBuYW1lPVwicHJvZmlsZS5odG1sXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZSByZWNvcmRcIiBuZy1hbmltYXRlLXJlZj1cInt7IHByb2ZpbGUuaWQgfX1cIj5cbiAgICAgICAge3sgcHJvZmlsZS50aXRsZSB9fVxuICAgICAgPC9kaXY+XG4gICAgPC9maWxlPlxuICAgIDxmaWxlIG5hbWU9XCJhbmltYXRpb25zLmNzc1wiPlxuICAgICAgLnJlY29yZCB7XG4gICAgICAgIGRpc3BsYXk6YmxvY2s7XG4gICAgICAgIGZvbnQtc2l6ZToyMHB4O1xuICAgICAgfVxuICAgICAgLnByb2ZpbGUge1xuICAgICAgICBiYWNrZ3JvdW5kOmJsYWNrO1xuICAgICAgICBjb2xvcjp3aGl0ZTtcbiAgICAgICAgZm9udC1zaXplOjEwMHB4O1xuICAgICAgfVxuICAgICAgLnZpZXctY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246cmVsYXRpdmU7XG4gICAgICB9XG4gICAgICAudmlldy1jb250YWluZXIgPiAudmlldy5uZy1hbmltYXRlIHtcbiAgICAgICAgcG9zaXRpb246YWJzb2x1dGU7XG4gICAgICAgIHRvcDowO1xuICAgICAgICBsZWZ0OjA7XG4gICAgICAgIHdpZHRoOjEwMCU7XG4gICAgICAgIG1pbi1oZWlnaHQ6NTAwcHg7XG4gICAgICB9XG4gICAgICAudmlldy5uZy1lbnRlciwgLnZpZXcubmctbGVhdmUsXG4gICAgICAucmVjb3JkLm5nLWFuY2hvciB7XG4gICAgICAgIHRyYW5zaXRpb246MC41cyBsaW5lYXIgYWxsO1xuICAgICAgfVxuICAgICAgLnZpZXcubmctZW50ZXIge1xuICAgICAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWCgxMDAlKTtcbiAgICAgIH1cbiAgICAgIC52aWV3Lm5nLWVudGVyLm5nLWVudGVyLWFjdGl2ZSwgLnZpZXcubmctbGVhdmUge1xuICAgICAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWCgwJSk7XG4gICAgICB9XG4gICAgICAudmlldy5uZy1sZWF2ZS5uZy1sZWF2ZS1hY3RpdmUge1xuICAgICAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgICB9XG4gICAgICAucmVjb3JkLm5nLWFuY2hvci1vdXQge1xuICAgICAgICBiYWNrZ3JvdW5kOnJlZDtcbiAgICAgIH1cbiAgICA8L2ZpbGU+XG4gIDwvZXhhbXBsZT5cbiAqXG4gKiAjIyMgSG93IGlzIHRoZSBlbGVtZW50IHRyYW5zcG9ydGVkP1xuICpcbiAqIFdoZW4gYW4gYW5jaG9yIGFuaW1hdGlvbiBvY2N1cnMsIG5nQW5pbWF0ZSB3aWxsIGNsb25lIHRoZSBzdGFydGluZyBlbGVtZW50IGFuZCBwb3NpdGlvbiBpdCBleGFjdGx5IHdoZXJlIHRoZSBzdGFydGluZ1xuICogZWxlbWVudCBpcyBsb2NhdGVkIG9uIHNjcmVlbiB2aWEgYWJzb2x1dGUgcG9zaXRpb25pbmcuIFRoZSBjbG9uZWQgZWxlbWVudCB3aWxsIGJlIHBsYWNlZCBpbnNpZGUgb2YgdGhlIHJvb3QgZWxlbWVudFxuICogb2YgdGhlIGFwcGxpY2F0aW9uICh3aGVyZSBuZy1hcHAgd2FzIGRlZmluZWQpIGFuZCBhbGwgb2YgdGhlIENTUyBjbGFzc2VzIG9mIHRoZSBzdGFydGluZyBlbGVtZW50IHdpbGwgYmUgYXBwbGllZC4gVGhlXG4gKiBlbGVtZW50IHdpbGwgdGhlbiBhbmltYXRlIGludG8gdGhlIGBvdXRgIGFuZCBgaW5gIGFuaW1hdGlvbnMgYW5kIHdpbGwgZXZlbnR1YWxseSByZWFjaCB0aGUgY29vcmRpbmF0ZXMgYW5kIG1hdGNoXG4gKiB0aGUgZGltZW5zaW9ucyBvZiB0aGUgZGVzdGluYXRpb24gZWxlbWVudC4gRHVyaW5nIHRoZSBlbnRpcmUgYW5pbWF0aW9uIGEgQ1NTIGNsYXNzIG9mIGAubmctYW5pbWF0ZS1zaGltYCB3aWxsIGJlIGFwcGxpZWRcbiAqIHRvIGJvdGggdGhlIHN0YXJ0aW5nIGFuZCBkZXN0aW5hdGlvbiBlbGVtZW50cyBpbiBvcmRlciB0byBoaWRlIHRoZW0gZnJvbSBiZWluZyB2aXNpYmxlICh0aGUgQ1NTIHN0eWxpbmcgZm9yIHRoZSBjbGFzc1xuICogaXM6IGB2aXNpYmlsaXR5OmhpZGRlbmApLiBPbmNlIHRoZSBhbmNob3IgcmVhY2hlcyBpdHMgZGVzdGluYXRpb24gdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYW5kIHRoZSBkZXN0aW5hdGlvbiBlbGVtZW50XG4gKiB3aWxsIGJlY29tZSB2aXNpYmxlIHNpbmNlIHRoZSBzaGltIGNsYXNzIHdpbGwgYmUgcmVtb3ZlZC5cbiAqXG4gKiAjIyMgSG93IGlzIHRoZSBtb3JwaGluZyBoYW5kbGVkP1xuICpcbiAqIENTUyBBbmNob3JpbmcgcmVsaWVzIG9uIHRyYW5zaXRpb25zIGFuZCBrZXlmcmFtZXMgYW5kIHRoZSBpbnRlcm5hbCBjb2RlIGlzIGludGVsbGlnZW50IGVub3VnaCB0byBmaWd1cmUgb3V0XG4gKiB3aGF0IENTUyBjbGFzc2VzIGRpZmZlciBiZXR3ZWVuIHRoZSBzdGFydGluZyBlbGVtZW50IGFuZCB0aGUgZGVzdGluYXRpb24gZWxlbWVudC4gVGhlc2UgZGlmZmVyZW50IENTUyBjbGFzc2VzXG4gKiB3aWxsIGJlIGFkZGVkL3JlbW92ZWQgb24gdGhlIGFuY2hvciBlbGVtZW50IGFuZCBhIHRyYW5zaXRpb24gd2lsbCBiZSBhcHBsaWVkICh0aGUgdHJhbnNpdGlvbiB0aGF0IGlzIHByb3ZpZGVkXG4gKiBpbiB0aGUgYW5jaG9yIGNsYXNzKS4gTG9uZyBzdG9yeSBzaG9ydCwgbmdBbmltYXRlIHdpbGwgZmlndXJlIG91dCB3aGF0IGNsYXNzZXMgdG8gYWRkIGFuZCByZW1vdmUgd2hpY2ggd2lsbFxuICogbWFrZSB0aGUgdHJhbnNpdGlvbiBvZiB0aGUgZWxlbWVudCBhcyBzbW9vdGggYW5kIGF1dG9tYXRpYyBhcyBwb3NzaWJsZS4gQmUgc3VyZSB0byB1c2Ugc2ltcGxlIENTUyBjbGFzc2VzIHRoYXRcbiAqIGRvIG5vdCByZWx5IG9uIERPTSBuZXN0aW5nIHN0cnVjdHVyZSBzbyB0aGF0IHRoZSBhbmNob3IgZWxlbWVudCBhcHBlYXJzIHRoZSBzYW1lIGFzIHRoZSBzdGFydGluZyBlbGVtZW50IChzaW5jZVxuICogdGhlIGNsb25lZCBlbGVtZW50IGlzIHBsYWNlZCBpbnNpZGUgb2Ygcm9vdCBlbGVtZW50IHdoaWNoIGlzIGxpa2VseSBjbG9zZSB0byB0aGUgYm9keSBlbGVtZW50KS5cbiAqXG4gKiBOb3RlIHRoYXQgaWYgdGhlIHJvb3QgZWxlbWVudCBpcyBvbiB0aGUgYDxodG1sPmAgZWxlbWVudCB0aGVuIHRoZSBjbG9uZWQgbm9kZSB3aWxsIGJlIHBsYWNlZCBpbnNpZGUgb2YgYm9keS5cbiAqXG4gKlxuICogIyMgVXNpbmcgJGFuaW1hdGUgaW4geW91ciBkaXJlY3RpdmUgY29kZVxuICpcbiAqIFNvIGZhciB3ZSd2ZSBleHBsb3JlZCBob3cgdG8gZmVlZCBpbiBhbmltYXRpb25zIGludG8gYW4gQW5ndWxhciBhcHBsaWNhdGlvbiwgYnV0IGhvdyBkbyB3ZSB0cmlnZ2VyIGFuaW1hdGlvbnMgd2l0aGluIG91ciBvd24gZGlyZWN0aXZlcyBpbiBvdXIgYXBwbGljYXRpb24/XG4gKiBCeSBpbmplY3RpbmcgdGhlIGAkYW5pbWF0ZWAgc2VydmljZSBpbnRvIG91ciBkaXJlY3RpdmUgY29kZSwgd2UgY2FuIHRyaWdnZXIgc3RydWN0dXJhbCBhbmQgY2xhc3MtYmFzZWQgaG9va3Mgd2hpY2ggY2FuIHRoZW4gYmUgY29uc3VtZWQgYnkgYW5pbWF0aW9ucy4gTGV0J3NcbiAqIGltYWdpbmUgd2UgaGF2ZSBhIGdyZWV0aW5nIGJveCB0aGF0IHNob3dzIGFuZCBoaWRlcyBpdHNlbGYgd2hlbiB0aGUgZGF0YSBjaGFuZ2VzXG4gKlxuICogYGBgaHRtbFxuICogPGdyZWV0aW5nLWJveCBhY3RpdmU9XCJvbk9yT2ZmXCI+SGkgdGhlcmU8L2dyZWV0aW5nLWJveD5cbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBuZ01vZHVsZS5kaXJlY3RpdmUoJ2dyZWV0aW5nQm94JywgWyckYW5pbWF0ZScsIGZ1bmN0aW9uKCRhbmltYXRlKSB7XG4gKiAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAqICAgICBhdHRycy4kb2JzZXJ2ZSgnYWN0aXZlJywgZnVuY3Rpb24odmFsdWUpIHtcbiAqICAgICAgIHZhbHVlID8gJGFuaW1hdGUuYWRkQ2xhc3MoZWxlbWVudCwgJ29uJykgOiAkYW5pbWF0ZS5yZW1vdmVDbGFzcyhlbGVtZW50LCAnb24nKTtcbiAqICAgICB9KTtcbiAqICAgfSk7XG4gKiB9XSk7XG4gKiBgYGBcbiAqXG4gKiBOb3cgdGhlIGBvbmAgQ1NTIGNsYXNzIGlzIGFkZGVkIGFuZCByZW1vdmVkIG9uIHRoZSBncmVldGluZyBib3ggY29tcG9uZW50LiBOb3cgaWYgd2UgYWRkIGEgQ1NTIGNsYXNzIG9uIHRvcCBvZiB0aGUgZ3JlZXRpbmcgYm94IGVsZW1lbnRcbiAqIGluIG91ciBIVE1MIGNvZGUgdGhlbiB3ZSBjYW4gdHJpZ2dlciBhIENTUyBvciBKUyBhbmltYXRpb24gdG8gaGFwcGVuLlxuICpcbiAqIGBgYGNzc1xuICogLyYjNDI7IG5vcm1hbGx5IHdlIHdvdWxkIGNyZWF0ZSBhIENTUyBjbGFzcyB0byByZWZlcmVuY2Ugb24gdGhlIGVsZW1lbnQgJiM0MjsvXG4gKiBncmVldGluZy1ib3gub24geyB0cmFuc2l0aW9uOjAuNXMgbGluZWFyIGFsbDsgYmFja2dyb3VuZDpncmVlbjsgY29sb3I6d2hpdGU7IH1cbiAqIGBgYFxuICpcbiAqIFRoZSBgJGFuaW1hdGVgIHNlcnZpY2UgY29udGFpbnMgYSB2YXJpZXR5IG9mIG90aGVyIG1ldGhvZHMgbGlrZSBgZW50ZXJgLCBgbGVhdmVgLCBgYW5pbWF0ZWAgYW5kIGBzZXRDbGFzc2AuIFRvIGxlYXJuIG1vcmUgYWJvdXQgd2hhdCdzXG4gKiBwb3NzaWJsZSBiZSBzdXJlIHRvIHZpc2l0IHRoZSB7QGxpbmsgbmcuJGFuaW1hdGUgJGFuaW1hdGUgc2VydmljZSBBUEkgcGFnZX0uXG4gKlxuICpcbiAqICMjIyBQcmV2ZW50aW5nIENvbGxpc2lvbnMgV2l0aCBUaGlyZCBQYXJ0eSBMaWJyYXJpZXNcbiAqXG4gKiBTb21lIHRoaXJkLXBhcnR5IGZyYW1ld29ya3MgcGxhY2UgYW5pbWF0aW9uIGR1cmF0aW9uIGRlZmF1bHRzIGFjcm9zcyBtYW55IGVsZW1lbnQgb3IgY2xhc3NOYW1lXG4gKiBzZWxlY3RvcnMgaW4gb3JkZXIgdG8gbWFrZSB0aGVpciBjb2RlIHNtYWxsIGFuZCByZXVzZWFibGUuIFRoaXMgY2FuIGxlYWQgdG8gaXNzdWVzIHdpdGggbmdBbmltYXRlLCB3aGljaFxuICogaXMgZXhwZWN0aW5nIGFjdHVhbCBhbmltYXRpb25zIG9uIHRoZXNlIGVsZW1lbnRzIGFuZCBoYXMgdG8gd2FpdCBmb3IgdGhlaXIgY29tcGxldGlvbi5cbiAqXG4gKiBZb3UgY2FuIHByZXZlbnQgdGhpcyB1bndhbnRlZCBiZWhhdmlvciBieSB1c2luZyBhIHByZWZpeCBvbiBhbGwgeW91ciBhbmltYXRpb24gY2xhc3NlczpcbiAqXG4gKiBgYGBjc3NcbiAqIC8mIzQyOyBwcmVmaXhlZCB3aXRoIGFuaW1hdGUtICYjNDI7L1xuICogLmFuaW1hdGUtZmFkZS1hZGQuYW5pbWF0ZS1mYWRlLWFkZC1hY3RpdmUge1xuICogICB0cmFuc2l0aW9uOjFzIGxpbmVhciBhbGw7XG4gKiAgIG9wYWNpdHk6MDtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIFlvdSB0aGVuIGNvbmZpZ3VyZSBgJGFuaW1hdGVgIHRvIGVuZm9yY2UgdGhpcyBwcmVmaXg6XG4gKlxuICogYGBganNcbiAqICRhbmltYXRlUHJvdmlkZXIuY2xhc3NOYW1lRmlsdGVyKC9hbmltYXRlLS8pO1xuICogYGBgXG4gKlxuICogVGhpcyBhbHNvIG1heSBwcm92aWRlIHlvdXIgYXBwbGljYXRpb24gd2l0aCBhIHNwZWVkIGJvb3N0IHNpbmNlIG9ubHkgc3BlY2lmaWMgZWxlbWVudHMgY29udGFpbmluZyBDU1MgY2xhc3MgcHJlZml4XG4gKiB3aWxsIGJlIGV2YWx1YXRlZCBmb3IgYW5pbWF0aW9uIHdoZW4gYW55IERPTSBjaGFuZ2VzIG9jY3VyIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiAjIyBDYWxsYmFja3MgYW5kIFByb21pc2VzXG4gKlxuICogV2hlbiBgJGFuaW1hdGVgIGlzIGNhbGxlZCBpdCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGNhbiBiZSB1c2VkIHRvIGNhcHR1cmUgd2hlbiB0aGUgYW5pbWF0aW9uIGhhcyBlbmRlZC4gVGhlcmVmb3JlIGlmIHdlIHdlcmUgdG8gdHJpZ2dlclxuICogYW4gYW5pbWF0aW9uICh3aXRoaW4gb3VyIGRpcmVjdGl2ZSBjb2RlKSB0aGVuIHdlIGNhbiBjb250aW51ZSBwZXJmb3JtaW5nIGRpcmVjdGl2ZSBhbmQgc2NvcGUgcmVsYXRlZCBhY3Rpdml0aWVzIGFmdGVyIHRoZSBhbmltYXRpb24gaGFzXG4gKiBlbmRlZCBieSBjaGFpbmluZyBvbnRvIHRoZSByZXR1cm5lZCBwcm9taXNlIHRoYXQgYW5pbWF0aW9uIG1ldGhvZCByZXR1cm5zLlxuICpcbiAqIGBgYGpzXG4gKiAvLyBzb21ld2hlcmUgd2l0aGluIHRoZSBkZXB0aHMgb2YgdGhlIGRpcmVjdGl2ZVxuICogJGFuaW1hdGUuZW50ZXIoZWxlbWVudCwgcGFyZW50KS50aGVuKGZ1bmN0aW9uKCkge1xuICogICAvL3RoZSBhbmltYXRpb24gaGFzIGNvbXBsZXRlZFxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiAoTm90ZSB0aGF0IGVhcmxpZXIgdmVyc2lvbnMgb2YgQW5ndWxhciBwcmlvciB0byB2MS40IHJlcXVpcmVkIHRoZSBwcm9taXNlIGNvZGUgdG8gYmUgd3JhcHBlZCB1c2luZyBgJHNjb3BlLiRhcHBseSguLi4pYC4gVGhpcyBpcyBub3QgdGhlIGNhc2VcbiAqIGFueW1vcmUuKVxuICpcbiAqIEluIGFkZGl0aW9uIHRvIHRoZSBhbmltYXRpb24gcHJvbWlzZSwgd2UgY2FuIGFsc28gbWFrZSB1c2Ugb2YgYW5pbWF0aW9uLXJlbGF0ZWQgY2FsbGJhY2tzIHdpdGhpbiBvdXIgZGlyZWN0aXZlcyBhbmQgY29udHJvbGxlciBjb2RlIGJ5IHJlZ2lzdGVyaW5nXG4gKiBhbiBldmVudCBsaXN0ZW5lciB1c2luZyB0aGUgYCRhbmltYXRlYCBzZXJ2aWNlLiBMZXQncyBzYXkgZm9yIGV4YW1wbGUgdGhhdCBhbiBhbmltYXRpb24gd2FzIHRyaWdnZXJlZCBvbiBvdXIgdmlld1xuICogcm91dGluZyBjb250cm9sbGVyIHRvIGhvb2sgaW50byB0aGF0OlxuICpcbiAqIGBgYGpzXG4gKiBuZ01vZHVsZS5jb250cm9sbGVyKCdIb21lUGFnZUNvbnRyb2xsZXInLCBbJyRhbmltYXRlJywgZnVuY3Rpb24oJGFuaW1hdGUpIHtcbiAqICAgJGFuaW1hdGUub24oJ2VudGVyJywgbmdWaWV3RWxlbWVudCwgZnVuY3Rpb24oZWxlbWVudCkge1xuICogICAgIC8vIHRoZSBhbmltYXRpb24gZm9yIHRoaXMgcm91dGUgaGFzIGNvbXBsZXRlZFxuICogICB9XSk7XG4gKiB9XSlcbiAqIGBgYFxuICpcbiAqIChOb3RlIHRoYXQgeW91IHdpbGwgbmVlZCB0byB0cmlnZ2VyIGEgZGlnZXN0IHdpdGhpbiB0aGUgY2FsbGJhY2sgdG8gZ2V0IGFuZ3VsYXIgdG8gbm90aWNlIGFueSBzY29wZS1yZWxhdGVkIGNoYW5nZXMuKVxuICovXG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lICRhbmltYXRlXG4gKiBAa2luZCBvYmplY3RcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBuZ0FuaW1hdGUgYCRhbmltYXRlYCBzZXJ2aWNlIGRvY3VtZW50YXRpb24gaXMgdGhlIHNhbWUgZm9yIHRoZSBjb3JlIGAkYW5pbWF0ZWAgc2VydmljZS5cbiAqXG4gKiBDbGljayBoZXJlIHtAbGluayBuZy4kYW5pbWF0ZSB0byBsZWFybiBtb3JlIGFib3V0IGFuaW1hdGlvbnMgd2l0aCBgJGFuaW1hdGVgfS5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nQW5pbWF0ZScsIFtdKVxuICAuZGlyZWN0aXZlKCduZ0FuaW1hdGVDaGlsZHJlbicsICQkQW5pbWF0ZUNoaWxkcmVuRGlyZWN0aXZlKVxuICAuZmFjdG9yeSgnJCRyQUZTY2hlZHVsZXInLCAkJHJBRlNjaGVkdWxlckZhY3RvcnkpXG5cbiAgLmZhY3RvcnkoJyQkQW5pbWF0ZVJ1bm5lcicsICQkQW5pbWF0ZVJ1bm5lckZhY3RvcnkpXG4gIC5mYWN0b3J5KCckJGFuaW1hdGVBc3luY1J1bicsICQkQW5pbWF0ZUFzeW5jUnVuRmFjdG9yeSlcblxuICAucHJvdmlkZXIoJyQkYW5pbWF0ZVF1ZXVlJywgJCRBbmltYXRlUXVldWVQcm92aWRlcilcbiAgLnByb3ZpZGVyKCckJGFuaW1hdGlvbicsICQkQW5pbWF0aW9uUHJvdmlkZXIpXG5cbiAgLnByb3ZpZGVyKCckYW5pbWF0ZUNzcycsICRBbmltYXRlQ3NzUHJvdmlkZXIpXG4gIC5wcm92aWRlcignJCRhbmltYXRlQ3NzRHJpdmVyJywgJCRBbmltYXRlQ3NzRHJpdmVyUHJvdmlkZXIpXG5cbiAgLnByb3ZpZGVyKCckJGFuaW1hdGVKcycsICQkQW5pbWF0ZUpzUHJvdmlkZXIpXG4gIC5wcm92aWRlcignJCRhbmltYXRlSnNEcml2ZXInLCAkJEFuaW1hdGVKc0RyaXZlclByb3ZpZGVyKTtcblxuXG59KSh3aW5kb3csIHdpbmRvdy5hbmd1bGFyKTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJvTWZwQW5cIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi9ub2RlX21vZHVsZXMvYW5ndWxhci1hbmltYXRlL2FuZ3VsYXItYW5pbWF0ZS5qc1wiLFwiLy4uLy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyLWFuaW1hdGVcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5yZXF1aXJlKCcuL2FuZ3VsYXItYW5pbWF0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSAnbmdBbmltYXRlJztcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJvTWZwQW5cIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi9ub2RlX21vZHVsZXMvYW5ndWxhci1hbmltYXRlL2luZGV4LmpzXCIsXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItYW5pbWF0ZVwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qKlxuICogQGxpY2Vuc2UgQW5ndWxhckpTIHYxLjQuOFxuICogKGMpIDIwMTAtMjAxNSBHb29nbGUsIEluYy4gaHR0cDovL2FuZ3VsYXJqcy5vcmdcbiAqIExpY2Vuc2U6IE1JVFxuICovXG4oZnVuY3Rpb24od2luZG93LCBhbmd1bGFyLCB1bmRlZmluZWQpIHsndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nZG9jIG1vZHVsZVxuICogQG5hbWUgbmdSb3V0ZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogIyBuZ1JvdXRlXG4gKlxuICogVGhlIGBuZ1JvdXRlYCBtb2R1bGUgcHJvdmlkZXMgcm91dGluZyBhbmQgZGVlcGxpbmtpbmcgc2VydmljZXMgYW5kIGRpcmVjdGl2ZXMgZm9yIGFuZ3VsYXIgYXBwcy5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKiBTZWUge0BsaW5rIG5nUm91dGUuJHJvdXRlI2V4YW1wbGUgJHJvdXRlfSBmb3IgYW4gZXhhbXBsZSBvZiBjb25maWd1cmluZyBhbmQgdXNpbmcgYG5nUm91dGVgLlxuICpcbiAqXG4gKiA8ZGl2IGRvYy1tb2R1bGUtY29tcG9uZW50cz1cIm5nUm91dGVcIj48L2Rpdj5cbiAqL1xuIC8qIGdsb2JhbCAtbmdSb3V0ZU1vZHVsZSAqL1xudmFyIG5nUm91dGVNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdSb3V0ZScsIFsnbmcnXSkuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcignJHJvdXRlJywgJFJvdXRlUHJvdmlkZXIpLFxuICAgICRyb3V0ZU1pbkVyciA9IGFuZ3VsYXIuJCRtaW5FcnIoJ25nUm91dGUnKTtcblxuLyoqXG4gKiBAbmdkb2MgcHJvdmlkZXJcbiAqIEBuYW1lICRyb3V0ZVByb3ZpZGVyXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVXNlZCBmb3IgY29uZmlndXJpbmcgcm91dGVzLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqIFNlZSB7QGxpbmsgbmdSb3V0ZS4kcm91dGUjZXhhbXBsZSAkcm91dGV9IGZvciBhbiBleGFtcGxlIG9mIGNvbmZpZ3VyaW5nIGFuZCB1c2luZyBgbmdSb3V0ZWAuXG4gKlxuICogIyMgRGVwZW5kZW5jaWVzXG4gKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nUm91dGUgYG5nUm91dGVgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICovXG5mdW5jdGlvbiAkUm91dGVQcm92aWRlcigpIHtcbiAgZnVuY3Rpb24gaW5oZXJpdChwYXJlbnQsIGV4dHJhKSB7XG4gICAgcmV0dXJuIGFuZ3VsYXIuZXh0ZW5kKE9iamVjdC5jcmVhdGUocGFyZW50KSwgZXh0cmEpO1xuICB9XG5cbiAgdmFyIHJvdXRlcyA9IHt9O1xuXG4gIC8qKlxuICAgKiBAbmdkb2MgbWV0aG9kXG4gICAqIEBuYW1lICRyb3V0ZVByb3ZpZGVyI3doZW5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUm91dGUgcGF0aCAobWF0Y2hlZCBhZ2FpbnN0IGAkbG9jYXRpb24ucGF0aGApLiBJZiBgJGxvY2F0aW9uLnBhdGhgXG4gICAqICAgIGNvbnRhaW5zIHJlZHVuZGFudCB0cmFpbGluZyBzbGFzaCBvciBpcyBtaXNzaW5nIG9uZSwgdGhlIHJvdXRlIHdpbGwgc3RpbGwgbWF0Y2ggYW5kIHRoZVxuICAgKiAgICBgJGxvY2F0aW9uLnBhdGhgIHdpbGwgYmUgdXBkYXRlZCB0byBhZGQgb3IgZHJvcCB0aGUgdHJhaWxpbmcgc2xhc2ggdG8gZXhhY3RseSBtYXRjaCB0aGVcbiAgICogICAgcm91dGUgZGVmaW5pdGlvbi5cbiAgICpcbiAgICogICAgKiBgcGF0aGAgY2FuIGNvbnRhaW4gbmFtZWQgZ3JvdXBzIHN0YXJ0aW5nIHdpdGggYSBjb2xvbjogZS5nLiBgOm5hbWVgLiBBbGwgY2hhcmFjdGVycyB1cFxuICAgKiAgICAgICAgdG8gdGhlIG5leHQgc2xhc2ggYXJlIG1hdGNoZWQgYW5kIHN0b3JlZCBpbiBgJHJvdXRlUGFyYW1zYCB1bmRlciB0aGUgZ2l2ZW4gYG5hbWVgXG4gICAqICAgICAgICB3aGVuIHRoZSByb3V0ZSBtYXRjaGVzLlxuICAgKiAgICAqIGBwYXRoYCBjYW4gY29udGFpbiBuYW1lZCBncm91cHMgc3RhcnRpbmcgd2l0aCBhIGNvbG9uIGFuZCBlbmRpbmcgd2l0aCBhIHN0YXI6XG4gICAqICAgICAgICBlLmcuYDpuYW1lKmAuIEFsbCBjaGFyYWN0ZXJzIGFyZSBlYWdlcmx5IHN0b3JlZCBpbiBgJHJvdXRlUGFyYW1zYCB1bmRlciB0aGUgZ2l2ZW4gYG5hbWVgXG4gICAqICAgICAgICB3aGVuIHRoZSByb3V0ZSBtYXRjaGVzLlxuICAgKiAgICAqIGBwYXRoYCBjYW4gY29udGFpbiBvcHRpb25hbCBuYW1lZCBncm91cHMgd2l0aCBhIHF1ZXN0aW9uIG1hcms6IGUuZy5gOm5hbWU/YC5cbiAgICpcbiAgICogICAgRm9yIGV4YW1wbGUsIHJvdXRlcyBsaWtlIGAvY29sb3IvOmNvbG9yL2xhcmdlY29kZS86bGFyZ2Vjb2RlKlxcL2VkaXRgIHdpbGwgbWF0Y2hcbiAgICogICAgYC9jb2xvci9icm93bi9sYXJnZWNvZGUvY29kZS93aXRoL3NsYXNoZXMvZWRpdGAgYW5kIGV4dHJhY3Q6XG4gICAqXG4gICAqICAgICogYGNvbG9yOiBicm93bmBcbiAgICogICAgKiBgbGFyZ2Vjb2RlOiBjb2RlL3dpdGgvc2xhc2hlc2AuXG4gICAqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZSBNYXBwaW5nIGluZm9ybWF0aW9uIHRvIGJlIGFzc2lnbmVkIHRvIGAkcm91dGUuY3VycmVudGAgb24gcm91dGVcbiAgICogICAgbWF0Y2guXG4gICAqXG4gICAqICAgIE9iamVjdCBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgICAtIGBjb250cm9sbGVyYCDigJMgYHsoc3RyaW5nfGZ1bmN0aW9uKCk9fWAg4oCTIENvbnRyb2xsZXIgZm4gdGhhdCBzaG91bGQgYmUgYXNzb2NpYXRlZCB3aXRoXG4gICAqICAgICAgbmV3bHkgY3JlYXRlZCBzY29wZSBvciB0aGUgbmFtZSBvZiBhIHtAbGluayBhbmd1bGFyLk1vZHVsZSNjb250cm9sbGVyIHJlZ2lzdGVyZWRcbiAgICogICAgICBjb250cm9sbGVyfSBpZiBwYXNzZWQgYXMgYSBzdHJpbmcuXG4gICAqICAgIC0gYGNvbnRyb2xsZXJBc2Ag4oCTIGB7c3RyaW5nPX1gIOKAkyBBbiBpZGVudGlmaWVyIG5hbWUgZm9yIGEgcmVmZXJlbmNlIHRvIHRoZSBjb250cm9sbGVyLlxuICAgKiAgICAgIElmIHByZXNlbnQsIHRoZSBjb250cm9sbGVyIHdpbGwgYmUgcHVibGlzaGVkIHRvIHNjb3BlIHVuZGVyIHRoZSBgY29udHJvbGxlckFzYCBuYW1lLlxuICAgKiAgICAtIGB0ZW1wbGF0ZWAg4oCTIGB7c3RyaW5nPXxmdW5jdGlvbigpPX1gIOKAkyBodG1sIHRlbXBsYXRlIGFzIGEgc3RyaW5nIG9yIGEgZnVuY3Rpb24gdGhhdFxuICAgKiAgICAgIHJldHVybnMgYW4gaHRtbCB0ZW1wbGF0ZSBhcyBhIHN0cmluZyB3aGljaCBzaG91bGQgYmUgdXNlZCBieSB7QGxpbmtcbiAgICogICAgICBuZ1JvdXRlLmRpcmVjdGl2ZTpuZ1ZpZXcgbmdWaWV3fSBvciB7QGxpbmsgbmcuZGlyZWN0aXZlOm5nSW5jbHVkZSBuZ0luY2x1ZGV9IGRpcmVjdGl2ZXMuXG4gICAqICAgICAgVGhpcyBwcm9wZXJ0eSB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgYHRlbXBsYXRlVXJsYC5cbiAgICpcbiAgICogICAgICBJZiBgdGVtcGxhdGVgIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICAgKlxuICAgKiAgICAgIC0gYHtBcnJheS48T2JqZWN0Pn1gIC0gcm91dGUgcGFyYW1ldGVycyBleHRyYWN0ZWQgZnJvbSB0aGUgY3VycmVudFxuICAgKiAgICAgICAgYCRsb2NhdGlvbi5wYXRoKClgIGJ5IGFwcGx5aW5nIHRoZSBjdXJyZW50IHJvdXRlXG4gICAqXG4gICAqICAgIC0gYHRlbXBsYXRlVXJsYCDigJMgYHtzdHJpbmc9fGZ1bmN0aW9uKCk9fWAg4oCTIHBhdGggb3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcGF0aCB0byBhbiBodG1sXG4gICAqICAgICAgdGVtcGxhdGUgdGhhdCBzaG91bGQgYmUgdXNlZCBieSB7QGxpbmsgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IG5nVmlld30uXG4gICAqXG4gICAqICAgICAgSWYgYHRlbXBsYXRlVXJsYCBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAgICpcbiAgICogICAgICAtIGB7QXJyYXkuPE9iamVjdD59YCAtIHJvdXRlIHBhcmFtZXRlcnMgZXh0cmFjdGVkIGZyb20gdGhlIGN1cnJlbnRcbiAgICogICAgICAgIGAkbG9jYXRpb24ucGF0aCgpYCBieSBhcHBseWluZyB0aGUgY3VycmVudCByb3V0ZVxuICAgKlxuICAgKiAgICAtIGByZXNvbHZlYCAtIGB7T2JqZWN0LjxzdHJpbmcsIGZ1bmN0aW9uPj19YCAtIEFuIG9wdGlvbmFsIG1hcCBvZiBkZXBlbmRlbmNpZXMgd2hpY2ggc2hvdWxkXG4gICAqICAgICAgYmUgaW5qZWN0ZWQgaW50byB0aGUgY29udHJvbGxlci4gSWYgYW55IG9mIHRoZXNlIGRlcGVuZGVuY2llcyBhcmUgcHJvbWlzZXMsIHRoZSByb3V0ZXJcbiAgICogICAgICB3aWxsIHdhaXQgZm9yIHRoZW0gYWxsIHRvIGJlIHJlc29sdmVkIG9yIG9uZSB0byBiZSByZWplY3RlZCBiZWZvcmUgdGhlIGNvbnRyb2xsZXIgaXNcbiAgICogICAgICBpbnN0YW50aWF0ZWQuXG4gICAqICAgICAgSWYgYWxsIHRoZSBwcm9taXNlcyBhcmUgcmVzb2x2ZWQgc3VjY2Vzc2Z1bGx5LCB0aGUgdmFsdWVzIG9mIHRoZSByZXNvbHZlZCBwcm9taXNlcyBhcmVcbiAgICogICAgICBpbmplY3RlZCBhbmQge0BsaW5rIG5nUm91dGUuJHJvdXRlIyRyb3V0ZUNoYW5nZVN1Y2Nlc3MgJHJvdXRlQ2hhbmdlU3VjY2Vzc30gZXZlbnQgaXNcbiAgICogICAgICBmaXJlZC4gSWYgYW55IG9mIHRoZSBwcm9taXNlcyBhcmUgcmVqZWN0ZWQgdGhlXG4gICAqICAgICAge0BsaW5rIG5nUm91dGUuJHJvdXRlIyRyb3V0ZUNoYW5nZUVycm9yICRyb3V0ZUNoYW5nZUVycm9yfSBldmVudCBpcyBmaXJlZC4gVGhlIG1hcCBvYmplY3RcbiAgICogICAgICBpczpcbiAgICpcbiAgICogICAgICAtIGBrZXlgIOKAkyBge3N0cmluZ31gOiBhIG5hbWUgb2YgYSBkZXBlbmRlbmN5IHRvIGJlIGluamVjdGVkIGludG8gdGhlIGNvbnRyb2xsZXIuXG4gICAqICAgICAgLSBgZmFjdG9yeWAgLSBge3N0cmluZ3xmdW5jdGlvbn1gOiBJZiBgc3RyaW5nYCB0aGVuIGl0IGlzIGFuIGFsaWFzIGZvciBhIHNlcnZpY2UuXG4gICAqICAgICAgICBPdGhlcndpc2UgaWYgZnVuY3Rpb24sIHRoZW4gaXQgaXMge0BsaW5rIGF1dG8uJGluamVjdG9yI2ludm9rZSBpbmplY3RlZH1cbiAgICogICAgICAgIGFuZCB0aGUgcmV0dXJuIHZhbHVlIGlzIHRyZWF0ZWQgYXMgdGhlIGRlcGVuZGVuY3kuIElmIHRoZSByZXN1bHQgaXMgYSBwcm9taXNlLCBpdCBpc1xuICAgKiAgICAgICAgcmVzb2x2ZWQgYmVmb3JlIGl0cyB2YWx1ZSBpcyBpbmplY3RlZCBpbnRvIHRoZSBjb250cm9sbGVyLiBCZSBhd2FyZSB0aGF0XG4gICAqICAgICAgICBgbmdSb3V0ZS4kcm91dGVQYXJhbXNgIHdpbGwgc3RpbGwgcmVmZXIgdG8gdGhlIHByZXZpb3VzIHJvdXRlIHdpdGhpbiB0aGVzZSByZXNvbHZlXG4gICAqICAgICAgICBmdW5jdGlvbnMuICBVc2UgYCRyb3V0ZS5jdXJyZW50LnBhcmFtc2AgdG8gYWNjZXNzIHRoZSBuZXcgcm91dGUgcGFyYW1ldGVycywgaW5zdGVhZC5cbiAgICpcbiAgICogICAgLSBgcmVkaXJlY3RUb2Ag4oCTIHsoc3RyaW5nfGZ1bmN0aW9uKCkpPX0g4oCTIHZhbHVlIHRvIHVwZGF0ZVxuICAgKiAgICAgIHtAbGluayBuZy4kbG9jYXRpb24gJGxvY2F0aW9ufSBwYXRoIHdpdGggYW5kIHRyaWdnZXIgcm91dGUgcmVkaXJlY3Rpb24uXG4gICAqXG4gICAqICAgICAgSWYgYHJlZGlyZWN0VG9gIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICAgKlxuICAgKiAgICAgIC0gYHtPYmplY3QuPHN0cmluZz59YCAtIHJvdXRlIHBhcmFtZXRlcnMgZXh0cmFjdGVkIGZyb20gdGhlIGN1cnJlbnRcbiAgICogICAgICAgIGAkbG9jYXRpb24ucGF0aCgpYCBieSBhcHBseWluZyB0aGUgY3VycmVudCByb3V0ZSB0ZW1wbGF0ZVVybC5cbiAgICogICAgICAtIGB7c3RyaW5nfWAgLSBjdXJyZW50IGAkbG9jYXRpb24ucGF0aCgpYFxuICAgKiAgICAgIC0gYHtPYmplY3R9YCAtIGN1cnJlbnQgYCRsb2NhdGlvbi5zZWFyY2goKWBcbiAgICpcbiAgICogICAgICBUaGUgY3VzdG9tIGByZWRpcmVjdFRvYCBmdW5jdGlvbiBpcyBleHBlY3RlZCB0byByZXR1cm4gYSBzdHJpbmcgd2hpY2ggd2lsbCBiZSB1c2VkXG4gICAqICAgICAgdG8gdXBkYXRlIGAkbG9jYXRpb24ucGF0aCgpYCBhbmQgYCRsb2NhdGlvbi5zZWFyY2goKWAuXG4gICAqXG4gICAqICAgIC0gYFtyZWxvYWRPblNlYXJjaD10cnVlXWAgLSB7Ym9vbGVhbj19IC0gcmVsb2FkIHJvdXRlIHdoZW4gb25seSBgJGxvY2F0aW9uLnNlYXJjaCgpYFxuICAgKiAgICAgIG9yIGAkbG9jYXRpb24uaGFzaCgpYCBjaGFuZ2VzLlxuICAgKlxuICAgKiAgICAgIElmIHRoZSBvcHRpb24gaXMgc2V0IHRvIGBmYWxzZWAgYW5kIHVybCBpbiB0aGUgYnJvd3NlciBjaGFuZ2VzLCB0aGVuXG4gICAqICAgICAgYCRyb3V0ZVVwZGF0ZWAgZXZlbnQgaXMgYnJvYWRjYXN0ZWQgb24gdGhlIHJvb3Qgc2NvcGUuXG4gICAqXG4gICAqICAgIC0gYFtjYXNlSW5zZW5zaXRpdmVNYXRjaD1mYWxzZV1gIC0ge2Jvb2xlYW49fSAtIG1hdGNoIHJvdXRlcyB3aXRob3V0IGJlaW5nIGNhc2Ugc2Vuc2l0aXZlXG4gICAqXG4gICAqICAgICAgSWYgdGhlIG9wdGlvbiBpcyBzZXQgdG8gYHRydWVgLCB0aGVuIHRoZSBwYXJ0aWN1bGFyIHJvdXRlIGNhbiBiZSBtYXRjaGVkIHdpdGhvdXQgYmVpbmdcbiAgICogICAgICBjYXNlIHNlbnNpdGl2ZVxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZWxmXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBZGRzIGEgbmV3IHJvdXRlIGRlZmluaXRpb24gdG8gdGhlIGAkcm91dGVgIHNlcnZpY2UuXG4gICAqL1xuICB0aGlzLndoZW4gPSBmdW5jdGlvbihwYXRoLCByb3V0ZSkge1xuICAgIC8vY29weSBvcmlnaW5hbCByb3V0ZSBvYmplY3QgdG8gcHJlc2VydmUgcGFyYW1zIGluaGVyaXRlZCBmcm9tIHByb3RvIGNoYWluXG4gICAgdmFyIHJvdXRlQ29weSA9IGFuZ3VsYXIuY29weShyb3V0ZSk7XG4gICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQocm91dGVDb3B5LnJlbG9hZE9uU2VhcmNoKSkge1xuICAgICAgcm91dGVDb3B5LnJlbG9hZE9uU2VhcmNoID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQocm91dGVDb3B5LmNhc2VJbnNlbnNpdGl2ZU1hdGNoKSkge1xuICAgICAgcm91dGVDb3B5LmNhc2VJbnNlbnNpdGl2ZU1hdGNoID0gdGhpcy5jYXNlSW5zZW5zaXRpdmVNYXRjaDtcbiAgICB9XG4gICAgcm91dGVzW3BhdGhdID0gYW5ndWxhci5leHRlbmQoXG4gICAgICByb3V0ZUNvcHksXG4gICAgICBwYXRoICYmIHBhdGhSZWdFeHAocGF0aCwgcm91dGVDb3B5KVxuICAgICk7XG5cbiAgICAvLyBjcmVhdGUgcmVkaXJlY3Rpb24gZm9yIHRyYWlsaW5nIHNsYXNoZXNcbiAgICBpZiAocGF0aCkge1xuICAgICAgdmFyIHJlZGlyZWN0UGF0aCA9IChwYXRoW3BhdGgubGVuZ3RoIC0gMV0gPT0gJy8nKVxuICAgICAgICAgICAgPyBwYXRoLnN1YnN0cigwLCBwYXRoLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICA6IHBhdGggKyAnLyc7XG5cbiAgICAgIHJvdXRlc1tyZWRpcmVjdFBhdGhdID0gYW5ndWxhci5leHRlbmQoXG4gICAgICAgIHtyZWRpcmVjdFRvOiBwYXRofSxcbiAgICAgICAgcGF0aFJlZ0V4cChyZWRpcmVjdFBhdGgsIHJvdXRlQ29weSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBwcm9wZXJ0eVxuICAgKiBAbmFtZSAkcm91dGVQcm92aWRlciNjYXNlSW5zZW5zaXRpdmVNYXRjaFxuICAgKiBAZGVzY3JpcHRpb25cbiAgICpcbiAgICogQSBib29sZWFuIHByb3BlcnR5IGluZGljYXRpbmcgaWYgcm91dGVzIGRlZmluZWRcbiAgICogdXNpbmcgdGhpcyBwcm92aWRlciBzaG91bGQgYmUgbWF0Y2hlZCB1c2luZyBhIGNhc2UgaW5zZW5zaXRpdmVcbiAgICogYWxnb3JpdGhtLiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuICAgKi9cbiAgdGhpcy5jYXNlSW5zZW5zaXRpdmVNYXRjaCA9IGZhbHNlO1xuXG4gICAvKipcbiAgICAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9IHBhdGhcbiAgICAqIEBwYXJhbSBvcHRzIHtPYmplY3R9IG9wdGlvbnNcbiAgICAqIEByZXR1cm4gez9PYmplY3R9XG4gICAgKlxuICAgICogQGRlc2NyaXB0aW9uXG4gICAgKiBOb3JtYWxpemVzIHRoZSBnaXZlbiBwYXRoLCByZXR1cm5pbmcgYSByZWd1bGFyIGV4cHJlc3Npb25cbiAgICAqIGFuZCB0aGUgb3JpZ2luYWwgcGF0aC5cbiAgICAqXG4gICAgKiBJbnNwaXJlZCBieSBwYXRoUmV4cCBpbiB2aXNpb25tZWRpYS9leHByZXNzL2xpYi91dGlscy5qcy5cbiAgICAqL1xuICBmdW5jdGlvbiBwYXRoUmVnRXhwKHBhdGgsIG9wdHMpIHtcbiAgICB2YXIgaW5zZW5zaXRpdmUgPSBvcHRzLmNhc2VJbnNlbnNpdGl2ZU1hdGNoLFxuICAgICAgICByZXQgPSB7XG4gICAgICAgICAgb3JpZ2luYWxQYXRoOiBwYXRoLFxuICAgICAgICAgIHJlZ2V4cDogcGF0aFxuICAgICAgICB9LFxuICAgICAgICBrZXlzID0gcmV0LmtleXMgPSBbXTtcblxuICAgIHBhdGggPSBwYXRoXG4gICAgICAucmVwbGFjZSgvKFsoKS5dKS9nLCAnXFxcXCQxJylcbiAgICAgIC5yZXBsYWNlKC8oXFwvKT86KFxcdyspKFtcXD9cXCpdKT8vZywgZnVuY3Rpb24oXywgc2xhc2gsIGtleSwgb3B0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25hbCA9IG9wdGlvbiA9PT0gJz8nID8gb3B0aW9uIDogbnVsbDtcbiAgICAgICAgdmFyIHN0YXIgPSBvcHRpb24gPT09ICcqJyA/IG9wdGlvbiA6IG51bGw7XG4gICAgICAgIGtleXMucHVzaCh7IG5hbWU6IGtleSwgb3B0aW9uYWw6ICEhb3B0aW9uYWwgfSk7XG4gICAgICAgIHNsYXNoID0gc2xhc2ggfHwgJyc7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgICsgKG9wdGlvbmFsID8gJycgOiBzbGFzaClcbiAgICAgICAgICArICcoPzonXG4gICAgICAgICAgKyAob3B0aW9uYWwgPyBzbGFzaCA6ICcnKVxuICAgICAgICAgICsgKHN0YXIgJiYgJyguKz8pJyB8fCAnKFteL10rKScpXG4gICAgICAgICAgKyAob3B0aW9uYWwgfHwgJycpXG4gICAgICAgICAgKyAnKSdcbiAgICAgICAgICArIChvcHRpb25hbCB8fCAnJyk7XG4gICAgICB9KVxuICAgICAgLnJlcGxhY2UoLyhbXFwvJFxcKl0pL2csICdcXFxcJDEnKTtcblxuICAgIHJldC5yZWdleHAgPSBuZXcgUmVnRXhwKCdeJyArIHBhdGggKyAnJCcsIGluc2Vuc2l0aXZlID8gJ2knIDogJycpO1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICogQG5nZG9jIG1ldGhvZFxuICAgKiBAbmFtZSAkcm91dGVQcm92aWRlciNvdGhlcndpc2VcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFNldHMgcm91dGUgZGVmaW5pdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCBvbiByb3V0ZSBjaGFuZ2Ugd2hlbiBubyBvdGhlciByb3V0ZSBkZWZpbml0aW9uXG4gICAqIGlzIG1hdGNoZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ30gcGFyYW1zIE1hcHBpbmcgaW5mb3JtYXRpb24gdG8gYmUgYXNzaWduZWQgdG8gYCRyb3V0ZS5jdXJyZW50YC5cbiAgICogSWYgY2FsbGVkIHdpdGggYSBzdHJpbmcsIHRoZSB2YWx1ZSBtYXBzIHRvIGByZWRpcmVjdFRvYC5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VsZlxuICAgKi9cbiAgdGhpcy5vdGhlcndpc2UgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBhcmFtcyA9IHtyZWRpcmVjdFRvOiBwYXJhbXN9O1xuICAgIH1cbiAgICB0aGlzLndoZW4obnVsbCwgcGFyYW1zKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuXG4gIHRoaXMuJGdldCA9IFsnJHJvb3RTY29wZScsXG4gICAgICAgICAgICAgICAnJGxvY2F0aW9uJyxcbiAgICAgICAgICAgICAgICckcm91dGVQYXJhbXMnLFxuICAgICAgICAgICAgICAgJyRxJyxcbiAgICAgICAgICAgICAgICckaW5qZWN0b3InLFxuICAgICAgICAgICAgICAgJyR0ZW1wbGF0ZVJlcXVlc3QnLFxuICAgICAgICAgICAgICAgJyRzY2UnLFxuICAgICAgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkcm91dGVQYXJhbXMsICRxLCAkaW5qZWN0b3IsICR0ZW1wbGF0ZVJlcXVlc3QsICRzY2UpIHtcblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBzZXJ2aWNlXG4gICAgICogQG5hbWUgJHJvdXRlXG4gICAgICogQHJlcXVpcmVzICRsb2NhdGlvblxuICAgICAqIEByZXF1aXJlcyAkcm91dGVQYXJhbXNcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjdXJyZW50IFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCByb3V0ZSBkZWZpbml0aW9uLlxuICAgICAqIFRoZSByb3V0ZSBkZWZpbml0aW9uIGNvbnRhaW5zOlxuICAgICAqXG4gICAgICogICAtIGBjb250cm9sbGVyYDogVGhlIGNvbnRyb2xsZXIgY29uc3RydWN0b3IgYXMgZGVmaW5lIGluIHJvdXRlIGRlZmluaXRpb24uXG4gICAgICogICAtIGBsb2NhbHNgOiBBIG1hcCBvZiBsb2NhbHMgd2hpY2ggaXMgdXNlZCBieSB7QGxpbmsgbmcuJGNvbnRyb2xsZXIgJGNvbnRyb2xsZXJ9IHNlcnZpY2UgZm9yXG4gICAgICogICAgIGNvbnRyb2xsZXIgaW5zdGFudGlhdGlvbi4gVGhlIGBsb2NhbHNgIGNvbnRhaW5cbiAgICAgKiAgICAgdGhlIHJlc29sdmVkIHZhbHVlcyBvZiB0aGUgYHJlc29sdmVgIG1hcC4gQWRkaXRpb25hbGx5IHRoZSBgbG9jYWxzYCBhbHNvIGNvbnRhaW46XG4gICAgICpcbiAgICAgKiAgICAgLSBgJHNjb3BlYCAtIFRoZSBjdXJyZW50IHJvdXRlIHNjb3BlLlxuICAgICAqICAgICAtIGAkdGVtcGxhdGVgIC0gVGhlIGN1cnJlbnQgcm91dGUgdGVtcGxhdGUgSFRNTC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSByb3V0ZXMgT2JqZWN0IHdpdGggYWxsIHJvdXRlIGNvbmZpZ3VyYXRpb24gT2JqZWN0cyBhcyBpdHMgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIGAkcm91dGVgIGlzIHVzZWQgZm9yIGRlZXAtbGlua2luZyBVUkxzIHRvIGNvbnRyb2xsZXJzIGFuZCB2aWV3cyAoSFRNTCBwYXJ0aWFscykuXG4gICAgICogSXQgd2F0Y2hlcyBgJGxvY2F0aW9uLnVybCgpYCBhbmQgdHJpZXMgdG8gbWFwIHRoZSBwYXRoIHRvIGFuIGV4aXN0aW5nIHJvdXRlIGRlZmluaXRpb24uXG4gICAgICpcbiAgICAgKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nUm91dGUgYG5nUm91dGVgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICAgICAqXG4gICAgICogWW91IGNhbiBkZWZpbmUgcm91dGVzIHRocm91Z2gge0BsaW5rIG5nUm91dGUuJHJvdXRlUHJvdmlkZXIgJHJvdXRlUHJvdmlkZXJ9J3MgQVBJLlxuICAgICAqXG4gICAgICogVGhlIGAkcm91dGVgIHNlcnZpY2UgaXMgdHlwaWNhbGx5IHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGVcbiAgICAgKiB7QGxpbmsgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IGBuZ1ZpZXdgfSBkaXJlY3RpdmUgYW5kIHRoZVxuICAgICAqIHtAbGluayBuZ1JvdXRlLiRyb3V0ZVBhcmFtcyBgJHJvdXRlUGFyYW1zYH0gc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogVGhpcyBleGFtcGxlIHNob3dzIGhvdyBjaGFuZ2luZyB0aGUgVVJMIGhhc2ggY2F1c2VzIHRoZSBgJHJvdXRlYCB0byBtYXRjaCBhIHJvdXRlIGFnYWluc3QgdGhlXG4gICAgICogVVJMLCBhbmQgdGhlIGBuZ1ZpZXdgIHB1bGxzIGluIHRoZSBwYXJ0aWFsLlxuICAgICAqXG4gICAgICogPGV4YW1wbGUgbmFtZT1cIiRyb3V0ZS1zZXJ2aWNlXCIgbW9kdWxlPVwibmdSb3V0ZUV4YW1wbGVcIlxuICAgICAqICAgICAgICAgIGRlcHM9XCJhbmd1bGFyLXJvdXRlLmpzXCIgZml4QmFzZT1cInRydWVcIj5cbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJpbmRleC5odG1sXCI+XG4gICAgICogICAgIDxkaXYgbmctY29udHJvbGxlcj1cIk1haW5Db250cm9sbGVyXCI+XG4gICAgICogICAgICAgQ2hvb3NlOlxuICAgICAqICAgICAgIDxhIGhyZWY9XCJCb29rL01vYnlcIj5Nb2J5PC9hPiB8XG4gICAgICogICAgICAgPGEgaHJlZj1cIkJvb2svTW9ieS9jaC8xXCI+TW9ieTogQ2gxPC9hPiB8XG4gICAgICogICAgICAgPGEgaHJlZj1cIkJvb2svR2F0c2J5XCI+R2F0c2J5PC9hPiB8XG4gICAgICogICAgICAgPGEgaHJlZj1cIkJvb2svR2F0c2J5L2NoLzQ/a2V5PXZhbHVlXCI+R2F0c2J5OiBDaDQ8L2E+IHxcbiAgICAgKiAgICAgICA8YSBocmVmPVwiQm9vay9TY2FybGV0XCI+U2NhcmxldCBMZXR0ZXI8L2E+PGJyLz5cbiAgICAgKlxuICAgICAqICAgICAgIDxkaXYgbmctdmlldz48L2Rpdj5cbiAgICAgKlxuICAgICAqICAgICAgIDxociAvPlxuICAgICAqXG4gICAgICogICAgICAgPHByZT4kbG9jYXRpb24ucGF0aCgpID0ge3skbG9jYXRpb24ucGF0aCgpfX08L3ByZT5cbiAgICAgKiAgICAgICA8cHJlPiRyb3V0ZS5jdXJyZW50LnRlbXBsYXRlVXJsID0ge3skcm91dGUuY3VycmVudC50ZW1wbGF0ZVVybH19PC9wcmU+XG4gICAgICogICAgICAgPHByZT4kcm91dGUuY3VycmVudC5wYXJhbXMgPSB7eyRyb3V0ZS5jdXJyZW50LnBhcmFtc319PC9wcmU+XG4gICAgICogICAgICAgPHByZT4kcm91dGUuY3VycmVudC5zY29wZS5uYW1lID0ge3skcm91dGUuY3VycmVudC5zY29wZS5uYW1lfX08L3ByZT5cbiAgICAgKiAgICAgICA8cHJlPiRyb3V0ZVBhcmFtcyA9IHt7JHJvdXRlUGFyYW1zfX08L3ByZT5cbiAgICAgKiAgICAgPC9kaXY+XG4gICAgICogICA8L2ZpbGU+XG4gICAgICpcbiAgICAgKiAgIDxmaWxlIG5hbWU9XCJib29rLmh0bWxcIj5cbiAgICAgKiAgICAgY29udHJvbGxlcjoge3tuYW1lfX08YnIgLz5cbiAgICAgKiAgICAgQm9vayBJZDoge3twYXJhbXMuYm9va0lkfX08YnIgLz5cbiAgICAgKiAgIDwvZmlsZT5cbiAgICAgKlxuICAgICAqICAgPGZpbGUgbmFtZT1cImNoYXB0ZXIuaHRtbFwiPlxuICAgICAqICAgICBjb250cm9sbGVyOiB7e25hbWV9fTxiciAvPlxuICAgICAqICAgICBCb29rIElkOiB7e3BhcmFtcy5ib29rSWR9fTxiciAvPlxuICAgICAqICAgICBDaGFwdGVyIElkOiB7e3BhcmFtcy5jaGFwdGVySWR9fVxuICAgICAqICAgPC9maWxlPlxuICAgICAqXG4gICAgICogICA8ZmlsZSBuYW1lPVwic2NyaXB0LmpzXCI+XG4gICAgICogICAgIGFuZ3VsYXIubW9kdWxlKCduZ1JvdXRlRXhhbXBsZScsIFsnbmdSb3V0ZSddKVxuICAgICAqXG4gICAgICogICAgICAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRyb3V0ZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24pIHtcbiAgICAgKiAgICAgICAgICAkc2NvcGUuJHJvdXRlID0gJHJvdXRlO1xuICAgICAqICAgICAgICAgICRzY29wZS4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICogICAgICAgICAgJHNjb3BlLiRyb3V0ZVBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcbiAgICAgKiAgICAgIH0pXG4gICAgICpcbiAgICAgKiAgICAgIC5jb250cm9sbGVyKCdCb29rQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHJvdXRlUGFyYW1zKSB7XG4gICAgICogICAgICAgICAgJHNjb3BlLm5hbWUgPSBcIkJvb2tDb250cm9sbGVyXCI7XG4gICAgICogICAgICAgICAgJHNjb3BlLnBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcbiAgICAgKiAgICAgIH0pXG4gICAgICpcbiAgICAgKiAgICAgIC5jb250cm9sbGVyKCdDaGFwdGVyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHJvdXRlUGFyYW1zKSB7XG4gICAgICogICAgICAgICAgJHNjb3BlLm5hbWUgPSBcIkNoYXB0ZXJDb250cm9sbGVyXCI7XG4gICAgICogICAgICAgICAgJHNjb3BlLnBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcbiAgICAgKiAgICAgIH0pXG4gICAgICpcbiAgICAgKiAgICAgLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAgKiAgICAgICAkcm91dGVQcm92aWRlclxuICAgICAqICAgICAgICAud2hlbignL0Jvb2svOmJvb2tJZCcsIHtcbiAgICAgKiAgICAgICAgIHRlbXBsYXRlVXJsOiAnYm9vay5odG1sJyxcbiAgICAgKiAgICAgICAgIGNvbnRyb2xsZXI6ICdCb29rQ29udHJvbGxlcicsXG4gICAgICogICAgICAgICByZXNvbHZlOiB7XG4gICAgICogICAgICAgICAgIC8vIEkgd2lsbCBjYXVzZSBhIDEgc2Vjb25kIGRlbGF5XG4gICAgICogICAgICAgICAgIGRlbGF5OiBmdW5jdGlvbigkcSwgJHRpbWVvdXQpIHtcbiAgICAgKiAgICAgICAgICAgICB2YXIgZGVsYXkgPSAkcS5kZWZlcigpO1xuICAgICAqICAgICAgICAgICAgICR0aW1lb3V0KGRlbGF5LnJlc29sdmUsIDEwMDApO1xuICAgICAqICAgICAgICAgICAgIHJldHVybiBkZWxheS5wcm9taXNlO1xuICAgICAqICAgICAgICAgICB9XG4gICAgICogICAgICAgICB9XG4gICAgICogICAgICAgfSlcbiAgICAgKiAgICAgICAud2hlbignL0Jvb2svOmJvb2tJZC9jaC86Y2hhcHRlcklkJywge1xuICAgICAqICAgICAgICAgdGVtcGxhdGVVcmw6ICdjaGFwdGVyLmh0bWwnLFxuICAgICAqICAgICAgICAgY29udHJvbGxlcjogJ0NoYXB0ZXJDb250cm9sbGVyJ1xuICAgICAqICAgICAgIH0pO1xuICAgICAqXG4gICAgICogICAgICAgLy8gY29uZmlndXJlIGh0bWw1IHRvIGdldCBsaW5rcyB3b3JraW5nIG9uIGpzZmlkZGxlXG4gICAgICogICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgICAqICAgICB9KTtcbiAgICAgKlxuICAgICAqICAgPC9maWxlPlxuICAgICAqXG4gICAgICogICA8ZmlsZSBuYW1lPVwicHJvdHJhY3Rvci5qc1wiIHR5cGU9XCJwcm90cmFjdG9yXCI+XG4gICAgICogICAgIGl0KCdzaG91bGQgbG9hZCBhbmQgY29tcGlsZSBjb3JyZWN0IHRlbXBsYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgZWxlbWVudChieS5saW5rVGV4dCgnTW9ieTogQ2gxJykpLmNsaWNrKCk7XG4gICAgICogICAgICAgdmFyIGNvbnRlbnQgPSBlbGVtZW50KGJ5LmNzcygnW25nLXZpZXddJykpLmdldFRleHQoKTtcbiAgICAgKiAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvY29udHJvbGxlclxcOiBDaGFwdGVyQ29udHJvbGxlci8pO1xuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9Cb29rIElkXFw6IE1vYnkvKTtcbiAgICAgKiAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvQ2hhcHRlciBJZFxcOiAxLyk7XG4gICAgICpcbiAgICAgKiAgICAgICBlbGVtZW50KGJ5LnBhcnRpYWxMaW5rVGV4dCgnU2NhcmxldCcpKS5jbGljaygpO1xuICAgICAqXG4gICAgICogICAgICAgY29udGVudCA9IGVsZW1lbnQoYnkuY3NzKCdbbmctdmlld10nKSkuZ2V0VGV4dCgpO1xuICAgICAqICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9jb250cm9sbGVyXFw6IEJvb2tDb250cm9sbGVyLyk7XG4gICAgICogICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL0Jvb2sgSWRcXDogU2NhcmxldC8pO1xuICAgICAqICAgICB9KTtcbiAgICAgKiAgIDwvZmlsZT5cbiAgICAgKiA8L2V4YW1wbGU+XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgKiBAbmFtZSAkcm91dGUjJHJvdXRlQ2hhbmdlU3RhcnRcbiAgICAgKiBAZXZlbnRUeXBlIGJyb2FkY2FzdCBvbiByb290IHNjb3BlXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogQnJvYWRjYXN0ZWQgYmVmb3JlIGEgcm91dGUgY2hhbmdlLiBBdCB0aGlzICBwb2ludCB0aGUgcm91dGUgc2VydmljZXMgc3RhcnRzXG4gICAgICogcmVzb2x2aW5nIGFsbCBvZiB0aGUgZGVwZW5kZW5jaWVzIG5lZWRlZCBmb3IgdGhlIHJvdXRlIGNoYW5nZSB0byBvY2N1ci5cbiAgICAgKiBUeXBpY2FsbHkgdGhpcyBpbnZvbHZlcyBmZXRjaGluZyB0aGUgdmlldyB0ZW1wbGF0ZSBhcyB3ZWxsIGFzIGFueSBkZXBlbmRlbmNpZXNcbiAgICAgKiBkZWZpbmVkIGluIGByZXNvbHZlYCByb3V0ZSBwcm9wZXJ0eS4gT25jZSAgYWxsIG9mIHRoZSBkZXBlbmRlbmNpZXMgYXJlIHJlc29sdmVkXG4gICAgICogYCRyb3V0ZUNoYW5nZVN1Y2Nlc3NgIGlzIGZpcmVkLlxuICAgICAqXG4gICAgICogVGhlIHJvdXRlIGNoYW5nZSAoYW5kIHRoZSBgJGxvY2F0aW9uYCBjaGFuZ2UgdGhhdCB0cmlnZ2VyZWQgaXQpIGNhbiBiZSBwcmV2ZW50ZWRcbiAgICAgKiBieSBjYWxsaW5nIGBwcmV2ZW50RGVmYXVsdGAgbWV0aG9kIG9mIHRoZSBldmVudC4gU2VlIHtAbGluayBuZy4kcm9vdFNjb3BlLlNjb3BlIyRvbn1cbiAgICAgKiBmb3IgbW9yZSBkZXRhaWxzIGFib3V0IGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbmd1bGFyRXZlbnQgU3ludGhldGljIGV2ZW50IG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge1JvdXRlfSBuZXh0IEZ1dHVyZSByb3V0ZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0ge1JvdXRlfSBjdXJyZW50IEN1cnJlbnQgcm91dGUgaW5mb3JtYXRpb24uXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgKiBAbmFtZSAkcm91dGUjJHJvdXRlQ2hhbmdlU3VjY2Vzc1xuICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBCcm9hZGNhc3RlZCBhZnRlciBhIHJvdXRlIGNoYW5nZSBoYXMgaGFwcGVuZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAqIFRoZSBgcmVzb2x2ZWAgZGVwZW5kZW5jaWVzIGFyZSBub3cgYXZhaWxhYmxlIGluIHRoZSBgY3VycmVudC5sb2NhbHNgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICoge0BsaW5rIG5nUm91dGUuZGlyZWN0aXZlOm5nVmlldyBuZ1ZpZXd9IGxpc3RlbnMgZm9yIHRoZSBkaXJlY3RpdmVcbiAgICAgKiB0byBpbnN0YW50aWF0ZSB0aGUgY29udHJvbGxlciBhbmQgcmVuZGVyIHRoZSB2aWV3LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFuZ3VsYXJFdmVudCBTeW50aGV0aWMgZXZlbnQgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7Um91dGV9IGN1cnJlbnQgQ3VycmVudCByb3V0ZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0ge1JvdXRlfFVuZGVmaW5lZH0gcHJldmlvdXMgUHJldmlvdXMgcm91dGUgaW5mb3JtYXRpb24sIG9yIHVuZGVmaW5lZCBpZiBjdXJyZW50IGlzXG4gICAgICogZmlyc3Qgcm91dGUgZW50ZXJlZC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBldmVudFxuICAgICAqIEBuYW1lICRyb3V0ZSMkcm91dGVDaGFuZ2VFcnJvclxuICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBCcm9hZGNhc3RlZCBpZiBhbnkgb2YgdGhlIHJlc29sdmUgcHJvbWlzZXMgYXJlIHJlamVjdGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFuZ3VsYXJFdmVudCBTeW50aGV0aWMgZXZlbnQgb2JqZWN0XG4gICAgICogQHBhcmFtIHtSb3V0ZX0gY3VycmVudCBDdXJyZW50IHJvdXRlIGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSB7Um91dGV9IHByZXZpb3VzIFByZXZpb3VzIHJvdXRlIGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSB7Um91dGV9IHJlamVjdGlvbiBSZWplY3Rpb24gb2YgdGhlIHByb21pc2UuIFVzdWFsbHkgdGhlIGVycm9yIG9mIHRoZSBmYWlsZWQgcHJvbWlzZS5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBldmVudFxuICAgICAqIEBuYW1lICRyb3V0ZSMkcm91dGVVcGRhdGVcbiAgICAgKiBAZXZlbnRUeXBlIGJyb2FkY2FzdCBvbiByb290IHNjb3BlXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogVGhlIGByZWxvYWRPblNlYXJjaGAgcHJvcGVydHkgaGFzIGJlZW4gc2V0IHRvIGZhbHNlLCBhbmQgd2UgYXJlIHJldXNpbmcgdGhlIHNhbWVcbiAgICAgKiBpbnN0YW5jZSBvZiB0aGUgQ29udHJvbGxlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbmd1bGFyRXZlbnQgU3ludGhldGljIGV2ZW50IG9iamVjdFxuICAgICAqIEBwYXJhbSB7Um91dGV9IGN1cnJlbnQgQ3VycmVudC9wcmV2aW91cyByb3V0ZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cblxuICAgIHZhciBmb3JjZVJlbG9hZCA9IGZhbHNlLFxuICAgICAgICBwcmVwYXJlZFJvdXRlLFxuICAgICAgICBwcmVwYXJlZFJvdXRlSXNVcGRhdGVPbmx5LFxuICAgICAgICAkcm91dGUgPSB7XG4gICAgICAgICAgcm91dGVzOiByb3V0ZXMsXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAbmdkb2MgbWV0aG9kXG4gICAgICAgICAgICogQG5hbWUgJHJvdXRlI3JlbG9hZFxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAgICogQ2F1c2VzIGAkcm91dGVgIHNlcnZpY2UgdG8gcmVsb2FkIHRoZSBjdXJyZW50IHJvdXRlIGV2ZW4gaWZcbiAgICAgICAgICAgKiB7QGxpbmsgbmcuJGxvY2F0aW9uICRsb2NhdGlvbn0gaGFzbid0IGNoYW5nZWQuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBBcyBhIHJlc3VsdCBvZiB0aGF0LCB7QGxpbmsgbmdSb3V0ZS5kaXJlY3RpdmU6bmdWaWV3IG5nVmlld31cbiAgICAgICAgICAgKiBjcmVhdGVzIG5ldyBzY29wZSBhbmQgcmVpbnN0YW50aWF0ZXMgdGhlIGNvbnRyb2xsZXIuXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmVsb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvcmNlUmVsb2FkID0gdHJ1ZTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgLy8gRG9uJ3Qgc3VwcG9ydCBjYW5jZWxsYXRpb24gb2YgYSByZWxvYWQgZm9yIG5vdy4uLlxuICAgICAgICAgICAgICBwcmVwYXJlUm91dGUoKTtcbiAgICAgICAgICAgICAgY29tbWl0Um91dGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAbmdkb2MgbWV0aG9kXG4gICAgICAgICAgICogQG5hbWUgJHJvdXRlI3VwZGF0ZVBhcmFtc1xuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAgICogQ2F1c2VzIGAkcm91dGVgIHNlcnZpY2UgdG8gdXBkYXRlIHRoZSBjdXJyZW50IFVSTCwgcmVwbGFjaW5nXG4gICAgICAgICAgICogY3VycmVudCByb3V0ZSBwYXJhbWV0ZXJzIHdpdGggdGhvc2Ugc3BlY2lmaWVkIGluIGBuZXdQYXJhbXNgLlxuICAgICAgICAgICAqIFByb3ZpZGVkIHByb3BlcnR5IG5hbWVzIHRoYXQgbWF0Y2ggdGhlIHJvdXRlJ3MgcGF0aCBzZWdtZW50XG4gICAgICAgICAgICogZGVmaW5pdGlvbnMgd2lsbCBiZSBpbnRlcnBvbGF0ZWQgaW50byB0aGUgbG9jYXRpb24ncyBwYXRoLCB3aGlsZVxuICAgICAgICAgICAqIHJlbWFpbmluZyBwcm9wZXJ0aWVzIHdpbGwgYmUgdHJlYXRlZCBhcyBxdWVyeSBwYXJhbXMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBuZXdQYXJhbXMgbWFwcGluZyBvZiBVUkwgcGFyYW1ldGVyIG5hbWVzIHRvIHZhbHVlc1xuICAgICAgICAgICAqL1xuICAgICAgICAgIHVwZGF0ZVBhcmFtczogZnVuY3Rpb24obmV3UGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50ICYmIHRoaXMuY3VycmVudC4kJHJvdXRlKSB7XG4gICAgICAgICAgICAgIG5ld1BhcmFtcyA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCB0aGlzLmN1cnJlbnQucGFyYW1zLCBuZXdQYXJhbXMpO1xuICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChpbnRlcnBvbGF0ZSh0aGlzLmN1cnJlbnQuJCRyb3V0ZS5vcmlnaW5hbFBhdGgsIG5ld1BhcmFtcykpO1xuICAgICAgICAgICAgICAvLyBpbnRlcnBvbGF0ZSBtb2RpZmllcyBuZXdQYXJhbXMsIG9ubHkgcXVlcnkgcGFyYW1zIGFyZSBsZWZ0XG4gICAgICAgICAgICAgICRsb2NhdGlvbi5zZWFyY2gobmV3UGFyYW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93ICRyb3V0ZU1pbkVycignbm9yb3V0JywgJ1RyaWVkIHVwZGF0aW5nIHJvdXRlIHdoZW4gd2l0aCBubyBjdXJyZW50IHJvdXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN0YXJ0JywgcHJlcGFyZVJvdXRlKTtcbiAgICAkcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3VjY2VzcycsIGNvbW1pdFJvdXRlKTtcblxuICAgIHJldHVybiAkcm91dGU7XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9uIHtzdHJpbmd9IGN1cnJlbnQgdXJsXG4gICAgICogQHBhcmFtIHJvdXRlIHtPYmplY3R9IHJvdXRlIHJlZ2V4cCB0byBtYXRjaCB0aGUgdXJsIGFnYWluc3RcbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0fVxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogQ2hlY2sgaWYgdGhlIHJvdXRlIG1hdGNoZXMgdGhlIGN1cnJlbnQgdXJsLlxuICAgICAqXG4gICAgICogSW5zcGlyZWQgYnkgbWF0Y2ggaW5cbiAgICAgKiB2aXNpb25tZWRpYS9leHByZXNzL2xpYi9yb3V0ZXIvcm91dGVyLmpzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN3aXRjaFJvdXRlTWF0Y2hlcihvbiwgcm91dGUpIHtcbiAgICAgIHZhciBrZXlzID0gcm91dGUua2V5cyxcbiAgICAgICAgICBwYXJhbXMgPSB7fTtcblxuICAgICAgaWYgKCFyb3V0ZS5yZWdleHApIHJldHVybiBudWxsO1xuXG4gICAgICB2YXIgbSA9IHJvdXRlLnJlZ2V4cC5leGVjKG9uKTtcbiAgICAgIGlmICghbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGZvciAodmFyIGkgPSAxLCBsZW4gPSBtLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2kgLSAxXTtcblxuICAgICAgICB2YXIgdmFsID0gbVtpXTtcblxuICAgICAgICBpZiAoa2V5ICYmIHZhbCkge1xuICAgICAgICAgIHBhcmFtc1trZXkubmFtZV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVJvdXRlKCRsb2NhdGlvbkV2ZW50KSB7XG4gICAgICB2YXIgbGFzdFJvdXRlID0gJHJvdXRlLmN1cnJlbnQ7XG5cbiAgICAgIHByZXBhcmVkUm91dGUgPSBwYXJzZVJvdXRlKCk7XG4gICAgICBwcmVwYXJlZFJvdXRlSXNVcGRhdGVPbmx5ID0gcHJlcGFyZWRSb3V0ZSAmJiBsYXN0Um91dGUgJiYgcHJlcGFyZWRSb3V0ZS4kJHJvdXRlID09PSBsYXN0Um91dGUuJCRyb3V0ZVxuICAgICAgICAgICYmIGFuZ3VsYXIuZXF1YWxzKHByZXBhcmVkUm91dGUucGF0aFBhcmFtcywgbGFzdFJvdXRlLnBhdGhQYXJhbXMpXG4gICAgICAgICAgJiYgIXByZXBhcmVkUm91dGUucmVsb2FkT25TZWFyY2ggJiYgIWZvcmNlUmVsb2FkO1xuXG4gICAgICBpZiAoIXByZXBhcmVkUm91dGVJc1VwZGF0ZU9ubHkgJiYgKGxhc3RSb3V0ZSB8fCBwcmVwYXJlZFJvdXRlKSkge1xuICAgICAgICBpZiAoJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcm91dGVDaGFuZ2VTdGFydCcsIHByZXBhcmVkUm91dGUsIGxhc3RSb3V0ZSkuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgIGlmICgkbG9jYXRpb25FdmVudCkge1xuICAgICAgICAgICAgJGxvY2F0aW9uRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21taXRSb3V0ZSgpIHtcbiAgICAgIHZhciBsYXN0Um91dGUgPSAkcm91dGUuY3VycmVudDtcbiAgICAgIHZhciBuZXh0Um91dGUgPSBwcmVwYXJlZFJvdXRlO1xuXG4gICAgICBpZiAocHJlcGFyZWRSb3V0ZUlzVXBkYXRlT25seSkge1xuICAgICAgICBsYXN0Um91dGUucGFyYW1zID0gbmV4dFJvdXRlLnBhcmFtcztcbiAgICAgICAgYW5ndWxhci5jb3B5KGxhc3RSb3V0ZS5wYXJhbXMsICRyb3V0ZVBhcmFtcyk7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHJvdXRlVXBkYXRlJywgbGFzdFJvdXRlKTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dFJvdXRlIHx8IGxhc3RSb3V0ZSkge1xuICAgICAgICBmb3JjZVJlbG9hZCA9IGZhbHNlO1xuICAgICAgICAkcm91dGUuY3VycmVudCA9IG5leHRSb3V0ZTtcbiAgICAgICAgaWYgKG5leHRSb3V0ZSkge1xuICAgICAgICAgIGlmIChuZXh0Um91dGUucmVkaXJlY3RUbykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcobmV4dFJvdXRlLnJlZGlyZWN0VG8pKSB7XG4gICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKGludGVycG9sYXRlKG5leHRSb3V0ZS5yZWRpcmVjdFRvLCBuZXh0Um91dGUucGFyYW1zKSkuc2VhcmNoKG5leHRSb3V0ZS5wYXJhbXMpXG4gICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkbG9jYXRpb24udXJsKG5leHRSb3V0ZS5yZWRpcmVjdFRvKG5leHRSb3V0ZS5wYXRoUGFyYW1zLCAkbG9jYXRpb24ucGF0aCgpLCAkbG9jYXRpb24uc2VhcmNoKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRxLndoZW4obmV4dFJvdXRlKS5cbiAgICAgICAgICB0aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKG5leHRSb3V0ZSkge1xuICAgICAgICAgICAgICB2YXIgbG9jYWxzID0gYW5ndWxhci5leHRlbmQoe30sIG5leHRSb3V0ZS5yZXNvbHZlKSxcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLCB0ZW1wbGF0ZVVybDtcblxuICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobG9jYWxzLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgbG9jYWxzW2tleV0gPSBhbmd1bGFyLmlzU3RyaW5nKHZhbHVlKSA/XG4gICAgICAgICAgICAgICAgICAgICRpbmplY3Rvci5nZXQodmFsdWUpIDogJGluamVjdG9yLmludm9rZSh2YWx1ZSwgbnVsbCwgbnVsbCwga2V5KTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlID0gbmV4dFJvdXRlLnRlbXBsYXRlKSkge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGVtcGxhdGUpKSB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlKG5leHRSb3V0ZS5wYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh0ZW1wbGF0ZVVybCA9IG5leHRSb3V0ZS50ZW1wbGF0ZVVybCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRlbXBsYXRlVXJsKSkge1xuICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgPSB0ZW1wbGF0ZVVybChuZXh0Um91dGUucGFyYW1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlVXJsKSkge1xuICAgICAgICAgICAgICAgICAgbmV4dFJvdXRlLmxvYWRlZFRlbXBsYXRlVXJsID0gJHNjZS52YWx1ZU9mKHRlbXBsYXRlVXJsKTtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gJHRlbXBsYXRlUmVxdWVzdCh0ZW1wbGF0ZVVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh0ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBsb2NhbHNbJyR0ZW1wbGF0ZSddID0gdGVtcGxhdGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuICRxLmFsbChsb2NhbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLlxuICAgICAgICAgIHRoZW4oZnVuY3Rpb24obG9jYWxzKSB7XG4gICAgICAgICAgICAvLyBhZnRlciByb3V0ZSBjaGFuZ2VcbiAgICAgICAgICAgIGlmIChuZXh0Um91dGUgPT0gJHJvdXRlLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKG5leHRSb3V0ZSkge1xuICAgICAgICAgICAgICAgIG5leHRSb3V0ZS5sb2NhbHMgPSBsb2NhbHM7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5jb3B5KG5leHRSb3V0ZS5wYXJhbXMsICRyb3V0ZVBhcmFtcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckcm91dGVDaGFuZ2VTdWNjZXNzJywgbmV4dFJvdXRlLCBsYXN0Um91dGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAobmV4dFJvdXRlID09ICRyb3V0ZS5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHJvdXRlQ2hhbmdlRXJyb3InLCBuZXh0Um91dGUsIGxhc3RSb3V0ZSwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge09iamVjdH0gdGhlIGN1cnJlbnQgYWN0aXZlIHJvdXRlLCBieSBtYXRjaGluZyBpdCBhZ2FpbnN0IHRoZSBVUkxcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwYXJzZVJvdXRlKCkge1xuICAgICAgLy8gTWF0Y2ggYSByb3V0ZVxuICAgICAgdmFyIHBhcmFtcywgbWF0Y2g7XG4gICAgICBhbmd1bGFyLmZvckVhY2gocm91dGVzLCBmdW5jdGlvbihyb3V0ZSwgcGF0aCkge1xuICAgICAgICBpZiAoIW1hdGNoICYmIChwYXJhbXMgPSBzd2l0Y2hSb3V0ZU1hdGNoZXIoJGxvY2F0aW9uLnBhdGgoKSwgcm91dGUpKSkge1xuICAgICAgICAgIG1hdGNoID0gaW5oZXJpdChyb3V0ZSwge1xuICAgICAgICAgICAgcGFyYW1zOiBhbmd1bGFyLmV4dGVuZCh7fSwgJGxvY2F0aW9uLnNlYXJjaCgpLCBwYXJhbXMpLFxuICAgICAgICAgICAgcGF0aFBhcmFtczogcGFyYW1zfSk7XG4gICAgICAgICAgbWF0Y2guJCRyb3V0ZSA9IHJvdXRlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIE5vIHJvdXRlIG1hdGNoZWQ7IGZhbGxiYWNrIHRvIFwib3RoZXJ3aXNlXCIgcm91dGVcbiAgICAgIHJldHVybiBtYXRjaCB8fCByb3V0ZXNbbnVsbF0gJiYgaW5oZXJpdChyb3V0ZXNbbnVsbF0sIHtwYXJhbXM6IHt9LCBwYXRoUGFyYW1zOnt9fSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaW50ZXJwb2xhdGlvbiBvZiB0aGUgcmVkaXJlY3QgcGF0aCB3aXRoIHRoZSBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW50ZXJwb2xhdGUoc3RyaW5nLCBwYXJhbXMpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCgoc3RyaW5nIHx8ICcnKS5zcGxpdCgnOicpLCBmdW5jdGlvbihzZWdtZW50LCBpKSB7XG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goc2VnbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHNlZ21lbnRNYXRjaCA9IHNlZ21lbnQubWF0Y2goLyhcXHcrKSg/Ols/Kl0pPyguKikvKTtcbiAgICAgICAgICB2YXIga2V5ID0gc2VnbWVudE1hdGNoWzFdO1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcmFtc1trZXldKTtcbiAgICAgICAgICByZXN1bHQucHVzaChzZWdtZW50TWF0Y2hbMl0gfHwgJycpO1xuICAgICAgICAgIGRlbGV0ZSBwYXJhbXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgIH1cbiAgfV07XG59XG5cbm5nUm91dGVNb2R1bGUucHJvdmlkZXIoJyRyb3V0ZVBhcmFtcycsICRSb3V0ZVBhcmFtc1Byb3ZpZGVyKTtcblxuXG4vKipcbiAqIEBuZ2RvYyBzZXJ2aWNlXG4gKiBAbmFtZSAkcm91dGVQYXJhbXNcbiAqIEByZXF1aXJlcyAkcm91dGVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBgJHJvdXRlUGFyYW1zYCBzZXJ2aWNlIGFsbG93cyB5b3UgdG8gcmV0cmlldmUgdGhlIGN1cnJlbnQgc2V0IG9mIHJvdXRlIHBhcmFtZXRlcnMuXG4gKlxuICogUmVxdWlyZXMgdGhlIHtAbGluayBuZ1JvdXRlIGBuZ1JvdXRlYH0gbW9kdWxlIHRvIGJlIGluc3RhbGxlZC5cbiAqXG4gKiBUaGUgcm91dGUgcGFyYW1ldGVycyBhcmUgYSBjb21iaW5hdGlvbiBvZiB7QGxpbmsgbmcuJGxvY2F0aW9uIGAkbG9jYXRpb25gfSdzXG4gKiB7QGxpbmsgbmcuJGxvY2F0aW9uI3NlYXJjaCBgc2VhcmNoKClgfSBhbmQge0BsaW5rIG5nLiRsb2NhdGlvbiNwYXRoIGBwYXRoKClgfS5cbiAqIFRoZSBgcGF0aGAgcGFyYW1ldGVycyBhcmUgZXh0cmFjdGVkIHdoZW4gdGhlIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSBgJHJvdXRlYH0gcGF0aCBpcyBtYXRjaGVkLlxuICpcbiAqIEluIGNhc2Ugb2YgcGFyYW1ldGVyIG5hbWUgY29sbGlzaW9uLCBgcGF0aGAgcGFyYW1zIHRha2UgcHJlY2VkZW5jZSBvdmVyIGBzZWFyY2hgIHBhcmFtcy5cbiAqXG4gKiBUaGUgc2VydmljZSBndWFyYW50ZWVzIHRoYXQgdGhlIGlkZW50aXR5IG9mIHRoZSBgJHJvdXRlUGFyYW1zYCBvYmplY3Qgd2lsbCByZW1haW4gdW5jaGFuZ2VkXG4gKiAoYnV0IGl0cyBwcm9wZXJ0aWVzIHdpbGwgbGlrZWx5IGNoYW5nZSkgZXZlbiB3aGVuIGEgcm91dGUgY2hhbmdlIG9jY3Vycy5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlIGAkcm91dGVQYXJhbXNgIGFyZSBvbmx5IHVwZGF0ZWQgKmFmdGVyKiBhIHJvdXRlIGNoYW5nZSBjb21wbGV0ZXMgc3VjY2Vzc2Z1bGx5LlxuICogVGhpcyBtZWFucyB0aGF0IHlvdSBjYW5ub3QgcmVseSBvbiBgJHJvdXRlUGFyYW1zYCBiZWluZyBjb3JyZWN0IGluIHJvdXRlIHJlc29sdmUgZnVuY3Rpb25zLlxuICogSW5zdGVhZCB5b3UgY2FuIHVzZSBgJHJvdXRlLmN1cnJlbnQucGFyYW1zYCB0byBhY2Nlc3MgdGhlIG5ldyByb3V0ZSdzIHBhcmFtZXRlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiAgLy8gR2l2ZW46XG4gKiAgLy8gVVJMOiBodHRwOi8vc2VydmVyLmNvbS9pbmRleC5odG1sIy9DaGFwdGVyLzEvU2VjdGlvbi8yP3NlYXJjaD1tb2J5XG4gKiAgLy8gUm91dGU6IC9DaGFwdGVyLzpjaGFwdGVySWQvU2VjdGlvbi86c2VjdGlvbklkXG4gKiAgLy9cbiAqICAvLyBUaGVuXG4gKiAgJHJvdXRlUGFyYW1zID09PiB7Y2hhcHRlcklkOicxJywgc2VjdGlvbklkOicyJywgc2VhcmNoOidtb2J5J31cbiAqIGBgYFxuICovXG5mdW5jdGlvbiAkUm91dGVQYXJhbXNQcm92aWRlcigpIHtcbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7IHJldHVybiB7fTsgfTtcbn1cblxubmdSb3V0ZU1vZHVsZS5kaXJlY3RpdmUoJ25nVmlldycsIG5nVmlld0ZhY3RvcnkpO1xubmdSb3V0ZU1vZHVsZS5kaXJlY3RpdmUoJ25nVmlldycsIG5nVmlld0ZpbGxDb250ZW50RmFjdG9yeSk7XG5cblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBuZ1ZpZXdcbiAqIEByZXN0cmljdCBFQ0FcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqICMgT3ZlcnZpZXdcbiAqIGBuZ1ZpZXdgIGlzIGEgZGlyZWN0aXZlIHRoYXQgY29tcGxlbWVudHMgdGhlIHtAbGluayBuZ1JvdXRlLiRyb3V0ZSAkcm91dGV9IHNlcnZpY2UgYnlcbiAqIGluY2x1ZGluZyB0aGUgcmVuZGVyZWQgdGVtcGxhdGUgb2YgdGhlIGN1cnJlbnQgcm91dGUgaW50byB0aGUgbWFpbiBsYXlvdXQgKGBpbmRleC5odG1sYCkgZmlsZS5cbiAqIEV2ZXJ5IHRpbWUgdGhlIGN1cnJlbnQgcm91dGUgY2hhbmdlcywgdGhlIGluY2x1ZGVkIHZpZXcgY2hhbmdlcyB3aXRoIGl0IGFjY29yZGluZyB0byB0aGVcbiAqIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGAkcm91dGVgIHNlcnZpY2UuXG4gKlxuICogUmVxdWlyZXMgdGhlIHtAbGluayBuZ1JvdXRlIGBuZ1JvdXRlYH0gbW9kdWxlIHRvIGJlIGluc3RhbGxlZC5cbiAqXG4gKiBAYW5pbWF0aW9uc1xuICogZW50ZXIgLSBhbmltYXRpb24gaXMgdXNlZCB0byBicmluZyBuZXcgY29udGVudCBpbnRvIHRoZSBicm93c2VyLlxuICogbGVhdmUgLSBhbmltYXRpb24gaXMgdXNlZCB0byBhbmltYXRlIGV4aXN0aW5nIGNvbnRlbnQgYXdheS5cbiAqXG4gKiBUaGUgZW50ZXIgYW5kIGxlYXZlIGFuaW1hdGlvbiBvY2N1ciBjb25jdXJyZW50bHkuXG4gKlxuICogQHNjb3BlXG4gKiBAcHJpb3JpdHkgNDAwXG4gKiBAcGFyYW0ge3N0cmluZz19IG9ubG9hZCBFeHByZXNzaW9uIHRvIGV2YWx1YXRlIHdoZW5ldmVyIHRoZSB2aWV3IHVwZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBhdXRvc2Nyb2xsIFdoZXRoZXIgYG5nVmlld2Agc2hvdWxkIGNhbGwge0BsaW5rIG5nLiRhbmNob3JTY3JvbGxcbiAqICAgICAgICAgICAgICAgICAgJGFuY2hvclNjcm9sbH0gdG8gc2Nyb2xsIHRoZSB2aWV3cG9ydCBhZnRlciB0aGUgdmlldyBpcyB1cGRhdGVkLlxuICpcbiAqICAgICAgICAgICAgICAgICAgLSBJZiB0aGUgYXR0cmlidXRlIGlzIG5vdCBzZXQsIGRpc2FibGUgc2Nyb2xsaW5nLlxuICogICAgICAgICAgICAgICAgICAtIElmIHRoZSBhdHRyaWJ1dGUgaXMgc2V0IHdpdGhvdXQgdmFsdWUsIGVuYWJsZSBzY3JvbGxpbmcuXG4gKiAgICAgICAgICAgICAgICAgIC0gT3RoZXJ3aXNlIGVuYWJsZSBzY3JvbGxpbmcgb25seSBpZiB0aGUgYGF1dG9zY3JvbGxgIGF0dHJpYnV0ZSB2YWx1ZSBldmFsdWF0ZWRcbiAqICAgICAgICAgICAgICAgICAgICBhcyBhbiBleHByZXNzaW9uIHlpZWxkcyBhIHRydXRoeSB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gICAgPGV4YW1wbGUgbmFtZT1cIm5nVmlldy1kaXJlY3RpdmVcIiBtb2R1bGU9XCJuZ1ZpZXdFeGFtcGxlXCJcbiAgICAgICAgICAgICBkZXBzPVwiYW5ndWxhci1yb3V0ZS5qczthbmd1bGFyLWFuaW1hdGUuanNcIlxuICAgICAgICAgICAgIGFuaW1hdGlvbnM9XCJ0cnVlXCIgZml4QmFzZT1cInRydWVcIj5cbiAgICAgIDxmaWxlIG5hbWU9XCJpbmRleC5odG1sXCI+XG4gICAgICAgIDxkaXYgbmctY29udHJvbGxlcj1cIk1haW5DdHJsIGFzIG1haW5cIj5cbiAgICAgICAgICBDaG9vc2U6XG4gICAgICAgICAgPGEgaHJlZj1cIkJvb2svTW9ieVwiPk1vYnk8L2E+IHxcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9Nb2J5L2NoLzFcIj5Nb2J5OiBDaDE8L2E+IHxcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9HYXRzYnlcIj5HYXRzYnk8L2E+IHxcbiAgICAgICAgICA8YSBocmVmPVwiQm9vay9HYXRzYnkvY2gvND9rZXk9dmFsdWVcIj5HYXRzYnk6IENoNDwvYT4gfFxuICAgICAgICAgIDxhIGhyZWY9XCJCb29rL1NjYXJsZXRcIj5TY2FybGV0IExldHRlcjwvYT48YnIvPlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZpZXctYW5pbWF0ZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgbmctdmlldyBjbGFzcz1cInZpZXctYW5pbWF0ZVwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxociAvPlxuXG4gICAgICAgICAgPHByZT4kbG9jYXRpb24ucGF0aCgpID0ge3ttYWluLiRsb2NhdGlvbi5wYXRoKCl9fTwvcHJlPlxuICAgICAgICAgIDxwcmU+JHJvdXRlLmN1cnJlbnQudGVtcGxhdGVVcmwgPSB7e21haW4uJHJvdXRlLmN1cnJlbnQudGVtcGxhdGVVcmx9fTwvcHJlPlxuICAgICAgICAgIDxwcmU+JHJvdXRlLmN1cnJlbnQucGFyYW1zID0ge3ttYWluLiRyb3V0ZS5jdXJyZW50LnBhcmFtc319PC9wcmU+XG4gICAgICAgICAgPHByZT4kcm91dGVQYXJhbXMgPSB7e21haW4uJHJvdXRlUGFyYW1zfX08L3ByZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpbGU+XG5cbiAgICAgIDxmaWxlIG5hbWU9XCJib29rLmh0bWxcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICBjb250cm9sbGVyOiB7e2Jvb2submFtZX19PGJyIC8+XG4gICAgICAgICAgQm9vayBJZDoge3tib29rLnBhcmFtcy5ib29rSWR9fTxiciAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cImNoYXB0ZXIuaHRtbFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIGNvbnRyb2xsZXI6IHt7Y2hhcHRlci5uYW1lfX08YnIgLz5cbiAgICAgICAgICBCb29rIElkOiB7e2NoYXB0ZXIucGFyYW1zLmJvb2tJZH19PGJyIC8+XG4gICAgICAgICAgQ2hhcHRlciBJZDoge3tjaGFwdGVyLnBhcmFtcy5jaGFwdGVySWR9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cImFuaW1hdGlvbnMuY3NzXCI+XG4gICAgICAgIC52aWV3LWFuaW1hdGUtY29udGFpbmVyIHtcbiAgICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcbiAgICAgICAgICBoZWlnaHQ6MTAwcHghaW1wb3J0YW50O1xuICAgICAgICAgIGJhY2tncm91bmQ6d2hpdGU7XG4gICAgICAgICAgYm9yZGVyOjFweCBzb2xpZCBibGFjaztcbiAgICAgICAgICBoZWlnaHQ6NDBweDtcbiAgICAgICAgICBvdmVyZmxvdzpoaWRkZW47XG4gICAgICAgIH1cblxuICAgICAgICAudmlldy1hbmltYXRlIHtcbiAgICAgICAgICBwYWRkaW5nOjEwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAudmlldy1hbmltYXRlLm5nLWVudGVyLCAudmlldy1hbmltYXRlLm5nLWxlYXZlIHtcbiAgICAgICAgICB0cmFuc2l0aW9uOmFsbCBjdWJpYy1iZXppZXIoMC4yNTAsIDAuNDYwLCAwLjQ1MCwgMC45NDApIDEuNXM7XG5cbiAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xuICAgICAgICAgIHdpZHRoOjEwMCU7XG4gICAgICAgICAgYm9yZGVyLWxlZnQ6MXB4IHNvbGlkIGJsYWNrO1xuXG4gICAgICAgICAgcG9zaXRpb246YWJzb2x1dGU7XG4gICAgICAgICAgdG9wOjA7XG4gICAgICAgICAgbGVmdDowO1xuICAgICAgICAgIHJpZ2h0OjA7XG4gICAgICAgICAgYm90dG9tOjA7XG4gICAgICAgICAgcGFkZGluZzoxMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnZpZXctYW5pbWF0ZS5uZy1lbnRlciB7XG4gICAgICAgICAgbGVmdDoxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC52aWV3LWFuaW1hdGUubmctZW50ZXIubmctZW50ZXItYWN0aXZlIHtcbiAgICAgICAgICBsZWZ0OjA7XG4gICAgICAgIH1cbiAgICAgICAgLnZpZXctYW5pbWF0ZS5uZy1sZWF2ZS5uZy1sZWF2ZS1hY3RpdmUge1xuICAgICAgICAgIGxlZnQ6LTEwMCU7XG4gICAgICAgIH1cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cInNjcmlwdC5qc1wiPlxuICAgICAgICBhbmd1bGFyLm1vZHVsZSgnbmdWaWV3RXhhbXBsZScsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSlcbiAgICAgICAgICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLFxuICAgICAgICAgICAgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgICAgICAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgICAgICAgICAgLndoZW4oJy9Cb29rLzpib29rSWQnLCB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Jvb2suaHRtbCcsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQm9va0N0cmwnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAnYm9vaydcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC53aGVuKCcvQm9vay86Ym9va0lkL2NoLzpjaGFwdGVySWQnLCB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NoYXB0ZXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhcHRlckN0cmwnLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY2hhcHRlcidcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICAgICAgfV0pXG4gICAgICAgICAgLmNvbnRyb2xsZXIoJ01haW5DdHJsJywgWyckcm91dGUnLCAnJHJvdXRlUGFyYW1zJywgJyRsb2NhdGlvbicsXG4gICAgICAgICAgICBmdW5jdGlvbigkcm91dGUsICRyb3V0ZVBhcmFtcywgJGxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgIHRoaXMuJHJvdXRlID0gJHJvdXRlO1xuICAgICAgICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgICAgICAgdGhpcy4kcm91dGVQYXJhbXMgPSAkcm91dGVQYXJhbXM7XG4gICAgICAgICAgfV0pXG4gICAgICAgICAgLmNvbnRyb2xsZXIoJ0Jvb2tDdHJsJywgWyckcm91dGVQYXJhbXMnLCBmdW5jdGlvbigkcm91dGVQYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IFwiQm9va0N0cmxcIjtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zID0gJHJvdXRlUGFyYW1zO1xuICAgICAgICAgIH1dKVxuICAgICAgICAgIC5jb250cm9sbGVyKCdDaGFwdGVyQ3RybCcsIFsnJHJvdXRlUGFyYW1zJywgZnVuY3Rpb24oJHJvdXRlUGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBcIkNoYXB0ZXJDdHJsXCI7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9ICRyb3V0ZVBhcmFtcztcbiAgICAgICAgICB9XSk7XG5cbiAgICAgIDwvZmlsZT5cblxuICAgICAgPGZpbGUgbmFtZT1cInByb3RyYWN0b3IuanNcIiB0eXBlPVwicHJvdHJhY3RvclwiPlxuICAgICAgICBpdCgnc2hvdWxkIGxvYWQgYW5kIGNvbXBpbGUgY29ycmVjdCB0ZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQoYnkubGlua1RleHQoJ01vYnk6IENoMScpKS5jbGljaygpO1xuICAgICAgICAgIHZhciBjb250ZW50ID0gZWxlbWVudChieS5jc3MoJ1tuZy12aWV3XScpKS5nZXRUZXh0KCk7XG4gICAgICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL2NvbnRyb2xsZXJcXDogQ2hhcHRlckN0cmwvKTtcbiAgICAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvQm9vayBJZFxcOiBNb2J5Lyk7XG4gICAgICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvTWF0Y2goL0NoYXB0ZXIgSWRcXDogMS8pO1xuXG4gICAgICAgICAgZWxlbWVudChieS5wYXJ0aWFsTGlua1RleHQoJ1NjYXJsZXQnKSkuY2xpY2soKTtcblxuICAgICAgICAgIGNvbnRlbnQgPSBlbGVtZW50KGJ5LmNzcygnW25nLXZpZXddJykpLmdldFRleHQoKTtcbiAgICAgICAgICBleHBlY3QoY29udGVudCkudG9NYXRjaCgvY29udHJvbGxlclxcOiBCb29rQ3RybC8pO1xuICAgICAgICAgIGV4cGVjdChjb250ZW50KS50b01hdGNoKC9Cb29rIElkXFw6IFNjYXJsZXQvKTtcbiAgICAgICAgfSk7XG4gICAgICA8L2ZpbGU+XG4gICAgPC9leGFtcGxlPlxuICovXG5cblxuLyoqXG4gKiBAbmdkb2MgZXZlbnRcbiAqIEBuYW1lIG5nVmlldyMkdmlld0NvbnRlbnRMb2FkZWRcbiAqIEBldmVudFR5cGUgZW1pdCBvbiB0aGUgY3VycmVudCBuZ1ZpZXcgc2NvcGVcbiAqIEBkZXNjcmlwdGlvblxuICogRW1pdHRlZCBldmVyeSB0aW1lIHRoZSBuZ1ZpZXcgY29udGVudCBpcyByZWxvYWRlZC5cbiAqL1xubmdWaWV3RmFjdG9yeS4kaW5qZWN0ID0gWyckcm91dGUnLCAnJGFuY2hvclNjcm9sbCcsICckYW5pbWF0ZSddO1xuZnVuY3Rpb24gbmdWaWV3RmFjdG9yeSgkcm91dGUsICRhbmNob3JTY3JvbGwsICRhbmltYXRlKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFQ0EnLFxuICAgIHRlcm1pbmFsOiB0cnVlLFxuICAgIHByaW9yaXR5OiA0MDAsXG4gICAgdHJhbnNjbHVkZTogJ2VsZW1lbnQnLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCAkZWxlbWVudCwgYXR0ciwgY3RybCwgJHRyYW5zY2x1ZGUpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRTY29wZSxcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LFxuICAgICAgICAgICAgcHJldmlvdXNMZWF2ZUFuaW1hdGlvbixcbiAgICAgICAgICAgIGF1dG9TY3JvbGxFeHAgPSBhdHRyLmF1dG9zY3JvbGwsXG4gICAgICAgICAgICBvbmxvYWRFeHAgPSBhdHRyLm9ubG9hZCB8fCAnJztcblxuICAgICAgICBzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCB1cGRhdGUpO1xuICAgICAgICB1cGRhdGUoKTtcblxuICAgICAgICBmdW5jdGlvbiBjbGVhbnVwTGFzdFZpZXcoKSB7XG4gICAgICAgICAgaWYgKHByZXZpb3VzTGVhdmVBbmltYXRpb24pIHtcbiAgICAgICAgICAgICRhbmltYXRlLmNhbmNlbChwcmV2aW91c0xlYXZlQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIHByZXZpb3VzTGVhdmVBbmltYXRpb24gPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjdXJyZW50U2NvcGUpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgICAgY3VycmVudFNjb3BlID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBwcmV2aW91c0xlYXZlQW5pbWF0aW9uID0gJGFuaW1hdGUubGVhdmUoY3VycmVudEVsZW1lbnQpO1xuICAgICAgICAgICAgcHJldmlvdXNMZWF2ZUFuaW1hdGlvbi50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwcmV2aW91c0xlYXZlQW5pbWF0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICB2YXIgbG9jYWxzID0gJHJvdXRlLmN1cnJlbnQgJiYgJHJvdXRlLmN1cnJlbnQubG9jYWxzLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGxvY2FscyAmJiBsb2NhbHMuJHRlbXBsYXRlO1xuXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRlbXBsYXRlKSkge1xuICAgICAgICAgICAgdmFyIG5ld1Njb3BlID0gc2NvcGUuJG5ldygpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSAkcm91dGUuY3VycmVudDtcblxuICAgICAgICAgICAgLy8gTm90ZTogVGhpcyB3aWxsIGFsc28gbGluayBhbGwgY2hpbGRyZW4gb2YgbmctdmlldyB0aGF0IHdlcmUgY29udGFpbmVkIGluIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgLy8gaHRtbC4gSWYgdGhhdCBjb250ZW50IGNvbnRhaW5zIGNvbnRyb2xsZXJzLCAuLi4gdGhleSBjb3VsZCBwb2xsdXRlL2NoYW5nZSB0aGUgc2NvcGUuXG4gICAgICAgICAgICAvLyBIb3dldmVyLCB1c2luZyBuZy12aWV3IG9uIGFuIGVsZW1lbnQgd2l0aCBhZGRpdGlvbmFsIGNvbnRlbnQgZG9lcyBub3QgbWFrZSBzZW5zZS4uLlxuICAgICAgICAgICAgLy8gTm90ZTogV2UgY2FuJ3QgcmVtb3ZlIHRoZW0gaW4gdGhlIGNsb25lQXR0Y2hGbiBvZiAkdHJhbnNjbHVkZSBhcyB0aGF0XG4gICAgICAgICAgICAvLyBmdW5jdGlvbiBpcyBjYWxsZWQgYmVmb3JlIGxpbmtpbmcgdGhlIGNvbnRlbnQsIHdoaWNoIHdvdWxkIGFwcGx5IGNoaWxkXG4gICAgICAgICAgICAvLyBkaXJlY3RpdmVzIHRvIG5vbiBleGlzdGluZyBlbGVtZW50cy5cbiAgICAgICAgICAgIHZhciBjbG9uZSA9ICR0cmFuc2NsdWRlKG5ld1Njb3BlLCBmdW5jdGlvbihjbG9uZSkge1xuICAgICAgICAgICAgICAkYW5pbWF0ZS5lbnRlcihjbG9uZSwgbnVsbCwgY3VycmVudEVsZW1lbnQgfHwgJGVsZW1lbnQpLnRoZW4oZnVuY3Rpb24gb25OZ1ZpZXdFbnRlcigpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXV0b1Njcm9sbEV4cClcbiAgICAgICAgICAgICAgICAgICYmICghYXV0b1Njcm9sbEV4cCB8fCBzY29wZS4kZXZhbChhdXRvU2Nyb2xsRXhwKSkpIHtcbiAgICAgICAgICAgICAgICAgICRhbmNob3JTY3JvbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBjbGVhbnVwTGFzdFZpZXcoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGNsb25lO1xuICAgICAgICAgICAgY3VycmVudFNjb3BlID0gY3VycmVudC5zY29wZSA9IG5ld1Njb3BlO1xuICAgICAgICAgICAgY3VycmVudFNjb3BlLiRlbWl0KCckdmlld0NvbnRlbnRMb2FkZWQnKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY29wZS4kZXZhbChvbmxvYWRFeHApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGVhbnVwTGFzdFZpZXcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbi8vIFRoaXMgZGlyZWN0aXZlIGlzIGNhbGxlZCBkdXJpbmcgdGhlICR0cmFuc2NsdWRlIGNhbGwgb2YgdGhlIGZpcnN0IGBuZ1ZpZXdgIGRpcmVjdGl2ZS5cbi8vIEl0IHdpbGwgcmVwbGFjZSBhbmQgY29tcGlsZSB0aGUgY29udGVudCBvZiB0aGUgZWxlbWVudCB3aXRoIHRoZSBsb2FkZWQgdGVtcGxhdGUuXG4vLyBXZSBuZWVkIHRoaXMgZGlyZWN0aXZlIHNvIHRoYXQgdGhlIGVsZW1lbnQgY29udGVudCBpcyBhbHJlYWR5IGZpbGxlZCB3aGVuXG4vLyB0aGUgbGluayBmdW5jdGlvbiBvZiBhbm90aGVyIGRpcmVjdGl2ZSBvbiB0aGUgc2FtZSBlbGVtZW50IGFzIG5nVmlld1xuLy8gaXMgY2FsbGVkLlxubmdWaWV3RmlsbENvbnRlbnRGYWN0b3J5LiRpbmplY3QgPSBbJyRjb21waWxlJywgJyRjb250cm9sbGVyJywgJyRyb3V0ZSddO1xuZnVuY3Rpb24gbmdWaWV3RmlsbENvbnRlbnRGYWN0b3J5KCRjb21waWxlLCAkY29udHJvbGxlciwgJHJvdXRlKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFQ0EnLFxuICAgIHByaW9yaXR5OiAtNDAwLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgdmFyIGN1cnJlbnQgPSAkcm91dGUuY3VycmVudCxcbiAgICAgICAgICBsb2NhbHMgPSBjdXJyZW50LmxvY2FscztcblxuICAgICAgJGVsZW1lbnQuaHRtbChsb2NhbHMuJHRlbXBsYXRlKTtcblxuICAgICAgdmFyIGxpbmsgPSAkY29tcGlsZSgkZWxlbWVudC5jb250ZW50cygpKTtcblxuICAgICAgaWYgKGN1cnJlbnQuY29udHJvbGxlcikge1xuICAgICAgICBsb2NhbHMuJHNjb3BlID0gc2NvcGU7XG4gICAgICAgIHZhciBjb250cm9sbGVyID0gJGNvbnRyb2xsZXIoY3VycmVudC5jb250cm9sbGVyLCBsb2NhbHMpO1xuICAgICAgICBpZiAoY3VycmVudC5jb250cm9sbGVyQXMpIHtcbiAgICAgICAgICBzY29wZVtjdXJyZW50LmNvbnRyb2xsZXJBc10gPSBjb250cm9sbGVyO1xuICAgICAgICB9XG4gICAgICAgICRlbGVtZW50LmRhdGEoJyRuZ0NvbnRyb2xsZXJDb250cm9sbGVyJywgY29udHJvbGxlcik7XG4gICAgICAgICRlbGVtZW50LmNoaWxkcmVuKCkuZGF0YSgnJG5nQ29udHJvbGxlckNvbnRyb2xsZXInLCBjb250cm9sbGVyKTtcbiAgICAgIH1cblxuICAgICAgbGluayhzY29wZSk7XG4gICAgfVxuICB9O1xufVxuXG5cbn0pKHdpbmRvdywgd2luZG93LmFuZ3VsYXIpO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIm9NZnBBblwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyLXJvdXRlL2FuZ3VsYXItcm91dGUuanNcIixcIi8uLi8uLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yb3V0ZVwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbnJlcXVpcmUoJy4vYW5ndWxhci1yb3V0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSAnbmdSb3V0ZSc7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwib01mcEFuXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGUvaW5kZXguanNcIixcIi8uLi8uLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yb3V0ZVwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTJcblxuLyoqXG4gKiBJZiBgQnVmZmVyLl91c2VUeXBlZEFycmF5c2A6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChjb21wYXRpYmxlIGRvd24gdG8gSUU2KVxuICovXG5CdWZmZXIuX3VzZVR5cGVkQXJyYXlzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gRGV0ZWN0IGlmIGJyb3dzZXIgc3VwcG9ydHMgVHlwZWQgQXJyYXlzLiBTdXBwb3J0ZWQgYnJvd3NlcnMgYXJlIElFIDEwKywgRmlyZWZveCA0KyxcbiAgLy8gQ2hyb21lIDcrLCBTYWZhcmkgNS4xKywgT3BlcmEgMTEuNissIGlPUyA0LjIrLiBJZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZ1xuICAvLyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsIHRoZW4gdGhhdCdzIHRoZSBzYW1lIGFzIG5vIGBVaW50OEFycmF5YCBzdXBwb3J0XG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIGFkZCBhbGwgdGhlIG5vZGUgQnVmZmVyIEFQSSBtZXRob2RzLiBUaGlzIGlzIGFuIGlzc3VlXG4gIC8vIGluIEZpcmVmb3ggNC0yOS4gTm93IGZpeGVkOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzhcbiAgdHJ5IHtcbiAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDApXG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICBhcnIuZm9vID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfVxuICAgIHJldHVybiA0MiA9PT0gYXJyLmZvbygpICYmXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgLy8gQ2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufSkoKVxuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyIChzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKVxuICAgIHJldHVybiBuZXcgQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pXG5cbiAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdFxuXG4gIC8vIFdvcmthcm91bmQ6IG5vZGUncyBiYXNlNjQgaW1wbGVtZW50YXRpb24gYWxsb3dzIGZvciBub24tcGFkZGVkIHN0cmluZ3NcbiAgLy8gd2hpbGUgYmFzZTY0LWpzIGRvZXMgbm90LlxuICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnICYmIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgc3ViamVjdCA9IHN0cmluZ3RyaW0oc3ViamVjdClcbiAgICB3aGlsZSAoc3ViamVjdC5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgICBzdWJqZWN0ID0gc3ViamVjdCArICc9J1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGxlbmd0aFxuICB2YXIgbGVuZ3RoXG4gIGlmICh0eXBlID09PSAnbnVtYmVyJylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdClcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpXG4gICAgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3ViamVjdCwgZW5jb2RpbmcpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0Lmxlbmd0aCkgLy8gYXNzdW1lIHRoYXQgb2JqZWN0IGlzIGFycmF5LWxpa2VcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy4nKVxuXG4gIHZhciBidWZcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAvLyBQcmVmZXJyZWQ6IFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgYnVmID0gQnVmZmVyLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGxlbmd0aCkpXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBUSElTIGluc3RhbmNlIG9mIEJ1ZmZlciAoY3JlYXRlZCBieSBgbmV3YClcbiAgICBidWYgPSB0aGlzXG4gICAgYnVmLmxlbmd0aCA9IGxlbmd0aFxuICAgIGJ1Zi5faXNCdWZmZXIgPSB0cnVlXG4gIH1cblxuICB2YXIgaVxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiB0eXBlb2Ygc3ViamVjdC5ieXRlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgIC8vIFNwZWVkIG9wdGltaXphdGlvbiAtLSB1c2Ugc2V0IGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIHR5cGVkIGFycmF5XG4gICAgYnVmLl9zZXQoc3ViamVjdClcbiAgfSBlbHNlIGlmIChpc0FycmF5aXNoKHN1YmplY3QpKSB7XG4gICAgLy8gVHJlYXQgYXJyYXktaXNoIG9iamVjdHMgYXMgYSBieXRlIGFycmF5XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpKVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0LnJlYWRVSW50OChpKVxuICAgICAgZWxzZVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0W2ldXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgYnVmLndyaXRlKHN1YmplY3QsIDAsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmICFub1plcm8pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZltpXSA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmXG59XG5cbi8vIFNUQVRJQyBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAncmF3JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gKGIpIHtcbiAgcmV0dXJuICEhKGIgIT09IG51bGwgJiYgYiAhPT0gdW5kZWZpbmVkICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHIsIGVuY29kaW5nKSB7XG4gIHZhciByZXRcbiAgc3RyID0gc3RyICsgJydcbiAgc3dpdGNoIChlbmNvZGluZyB8fCAndXRmOCcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAvIDJcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gdXRmOFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAncmF3JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggKiAyXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBhc3NlcnQoaXNBcnJheShsaXN0KSwgJ1VzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxuJyArXG4gICAgICAnbGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuJylcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKVxuICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGxpc3RbMF1cbiAgfVxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdG90YWxMZW5ndGggIT09ICdudW1iZXInKSB7XG4gICAgdG90YWxMZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsTGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIodG90YWxMZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKVxuICAgIHBvcyArPSBpdGVtLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZcbn1cblxuLy8gQlVGRkVSIElOU1RBTkNFIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIF9oZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGFzc2VydChzdHJMZW4gJSAyID09PSAwLCAnSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGJ5dGUgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgYXNzZXJ0KCFpc05hTihieXRlKSwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG4gICAgYnVmW29mZnNldCArIGldID0gYnl0ZVxuICB9XG4gIEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gaSAqIDJcbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gX3V0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gU3VwcG9ydCBib3RoIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbiAgLy8gYW5kIHRoZSBsZWdhY3kgKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIGlmICghaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHsgIC8vIGxlZ2FjeVxuICAgIHZhciBzd2FwID0gZW5jb2RpbmdcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIG9mZnNldCA9IGxlbmd0aFxuICAgIGxlbmd0aCA9IHN3YXBcbiAgfVxuXG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG4gIHN0YXJ0ID0gTnVtYmVyKHN0YXJ0KSB8fCAwXG4gIGVuZCA9IChlbmQgIT09IHVuZGVmaW5lZClcbiAgICA/IE51bWJlcihlbmQpXG4gICAgOiBlbmQgPSBzZWxmLmxlbmd0aFxuXG4gIC8vIEZhc3RwYXRoIGVtcHR5IHN0cmluZ3NcbiAgaWYgKGVuZCA9PT0gc3RhcnQpXG4gICAgcmV0dXJuICcnXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldF9zdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgc291cmNlID0gdGhpc1xuXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICghdGFyZ2V0X3N0YXJ0KSB0YXJnZXRfc3RhcnQgPSAwXG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnc291cmNlRW5kIDwgc291cmNlU3RhcnQnKVxuICBhc3NlcnQodGFyZ2V0X3N0YXJ0ID49IDAgJiYgdGFyZ2V0X3N0YXJ0IDwgdGFyZ2V0Lmxlbmd0aCxcbiAgICAgICd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCBzb3VyY2UubGVuZ3RoLCAnc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gc291cmNlLmxlbmd0aCwgJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpXG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgPCBlbmQgLSBzdGFydClcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0ICsgc3RhcnRcblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAobGVuIDwgMTAwIHx8ICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0X3N0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICB9IGVsc2Uge1xuICAgIHRhcmdldC5fc2V0KHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSwgdGFyZ2V0X3N0YXJ0KVxuICB9XG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gX3V0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXMgPSAnJ1xuICB2YXIgdG1wID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgaWYgKGJ1ZltpXSA8PSAweDdGKSB7XG4gICAgICByZXMgKz0gZGVjb2RlVXRmOENoYXIodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICAgICAgdG1wID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wICs9ICclJyArIGJ1ZltpXS50b1N0cmluZygxNilcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzICsgZGVjb2RlVXRmOENoYXIodG1wKVxufVxuXG5mdW5jdGlvbiBfYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspXG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpXG59XG5cbmZ1bmN0aW9uIF9oZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2krMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gY2xhbXAoc3RhcnQsIGxlbiwgMClcbiAgZW5kID0gY2xhbXAoZW5kLCBsZW4sIGxlbilcblxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIHJldHVybiBCdWZmZXIuX2F1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSlcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIHZhciBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQsIHRydWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgaSsrKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gICAgcmV0dXJuIG5ld0J1ZlxuICB9XG59XG5cbi8vIGBnZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpXG59XG5cbi8vIGBzZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgfSBlbHNlIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAyXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gICAgdmFsIHw9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldCArIDNdIDw8IDI0ID4+PiAwKVxuICB9IGVsc2Uge1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDFdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDJdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgM11cbiAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldF0gPDwgMjQgPj4+IDApXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLFxuICAgICAgICAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgdmFyIG5lZyA9IHRoaXNbb2Zmc2V0XSAmIDB4ODBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDAwMDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmZmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEZsb2F0IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRG91YmxlIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZilcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVyblxuXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgMik7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmZmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmLCAtMHg4MClcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgdGhpcy53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgdGhpcy53cml0ZVVJbnQ4KDB4ZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZiwgLTB4ODAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MTYoYnVmLCAweGZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgMHhmZmZmZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsXG4gICAgICAgICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gZmlsbCh2YWx1ZSwgc3RhcnQ9MCwgZW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGhcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gdmFsdWUuY2hhckNvZGVBdCgwKVxuICB9XG5cbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSwgJ3ZhbHVlIGlzIG5vdCBhIG51bWJlcicpXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdlbmQgPCBzdGFydCcpXG5cbiAgLy8gRmlsbCAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHRoaXMubGVuZ3RoLCAnc3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gdGhpcy5sZW5ndGgsICdlbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICB0aGlzW2ldID0gdmFsdWVcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXQgPSBbXVxuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIG91dFtpXSA9IHRvSGV4KHRoaXNbaV0pXG4gICAgaWYgKGkgPT09IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMpIHtcbiAgICAgIG91dFtpICsgMV0gPSAnLi4uJ1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBvdXQuam9pbignICcpICsgJz4nXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgICByZXR1cm4gKG5ldyBCdWZmZXIodGhpcykpLmJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKVxuICAgICAgICBidWZbaV0gPSB0aGlzW2ldXG4gICAgICByZXR1cm4gYnVmLmJ1ZmZlclxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAgfVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbnZhciBCUCA9IEJ1ZmZlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBdWdtZW50IGEgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIFVpbnQ4QXJyYXkgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9pc0J1ZmZlciA9IHRydWVcblxuICAvLyBzYXZlIHJlZmVyZW5jZSB0byBvcmlnaW5hbCBVaW50OEFycmF5IGdldC9zZXQgbWV0aG9kcyBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgYXJyLl9nZXQgPSBhcnIuZ2V0XG4gIGFyci5fc2V0ID0gYXJyLnNldFxuXG4gIC8vIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiBub2RlIDAuMTMrXG4gIGFyci5nZXQgPSBCUC5nZXRcbiAgYXJyLnNldCA9IEJQLnNldFxuXG4gIGFyci53cml0ZSA9IEJQLndyaXRlXG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0pTT04gPSBCUC50b0pTT05cbiAgYXJyLmNvcHkgPSBCUC5jb3B5XG4gIGFyci5zbGljZSA9IEJQLnNsaWNlXG4gIGFyci5yZWFkVUludDggPSBCUC5yZWFkVUludDhcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRVxuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFXG4gIGFyci5yZWFkVUludDMyTEUgPSBCUC5yZWFkVUludDMyTEVcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRVxuICBhcnIucmVhZEludDggPSBCUC5yZWFkSW50OFxuICBhcnIucmVhZEludDE2TEUgPSBCUC5yZWFkSW50MTZMRVxuICBhcnIucmVhZEludDE2QkUgPSBCUC5yZWFkSW50MTZCRVxuICBhcnIucmVhZEludDMyTEUgPSBCUC5yZWFkSW50MzJMRVxuICBhcnIucmVhZEludDMyQkUgPSBCUC5yZWFkSW50MzJCRVxuICBhcnIucmVhZEZsb2F0TEUgPSBCUC5yZWFkRmxvYXRMRVxuICBhcnIucmVhZEZsb2F0QkUgPSBCUC5yZWFkRmxvYXRCRVxuICBhcnIucmVhZERvdWJsZUxFID0gQlAucmVhZERvdWJsZUxFXG4gIGFyci5yZWFkRG91YmxlQkUgPSBCUC5yZWFkRG91YmxlQkVcbiAgYXJyLndyaXRlVUludDggPSBCUC53cml0ZVVJbnQ4XG4gIGFyci53cml0ZVVJbnQxNkxFID0gQlAud3JpdGVVSW50MTZMRVxuICBhcnIud3JpdGVVSW50MTZCRSA9IEJQLndyaXRlVUludDE2QkVcbiAgYXJyLndyaXRlVUludDMyTEUgPSBCUC53cml0ZVVJbnQzMkxFXG4gIGFyci53cml0ZVVJbnQzMkJFID0gQlAud3JpdGVVSW50MzJCRVxuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEVcbiAgYXJyLndyaXRlSW50MTZCRSA9IEJQLndyaXRlSW50MTZCRVxuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFXG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkVcbiAgYXJyLndyaXRlRmxvYXRMRSA9IEJQLndyaXRlRmxvYXRMRVxuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFXG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRVxuICBhcnIud3JpdGVEb3VibGVCRSA9IEJQLndyaXRlRG91YmxlQkVcbiAgYXJyLmZpbGwgPSBCUC5maWxsXG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdFxuICBhcnIudG9BcnJheUJ1ZmZlciA9IEJQLnRvQXJyYXlCdWZmZXJcblxuICByZXR1cm4gYXJyXG59XG5cbi8vIHNsaWNlKHN0YXJ0LCBlbmQpXG5mdW5jdGlvbiBjbGFtcCAoaW5kZXgsIGxlbiwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm4gZGVmYXVsdFZhbHVlXG4gIGluZGV4ID0gfn5pbmRleDsgIC8vIENvZXJjZSB0byBpbnRlZ2VyLlxuICBpZiAoaW5kZXggPj0gbGVuKSByZXR1cm4gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgaW5kZXggKz0gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gY29lcmNlIChsZW5ndGgpIHtcbiAgLy8gQ29lcmNlIGxlbmd0aCB0byBhIG51bWJlciAocG9zc2libHkgTmFOKSwgcm91bmQgdXBcbiAgLy8gaW4gY2FzZSBpdCdzIGZyYWN0aW9uYWwgKGUuZy4gMTIzLjQ1NikgdGhlbiBkbyBhXG4gIC8vIGRvdWJsZSBuZWdhdGUgdG8gY29lcmNlIGEgTmFOIHRvIDAuIEVhc3ksIHJpZ2h0P1xuICBsZW5ndGggPSB+fk1hdGguY2VpbCgrbGVuZ3RoKVxuICByZXR1cm4gbGVuZ3RoIDwgMCA/IDAgOiBsZW5ndGhcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoc3ViamVjdCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBBcnJheV0nXG4gIH0pKHN1YmplY3QpXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlpc2ggKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXkoc3ViamVjdCkgfHwgQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpIHx8XG4gICAgICBzdWJqZWN0ICYmIHR5cGVvZiBzdWJqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgdHlwZW9mIHN1YmplY3QubGVuZ3RoID09PSAnbnVtYmVyJ1xufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGlmIChiIDw9IDB4N0YpXG4gICAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSlcbiAgICBlbHNlIHtcbiAgICAgIHZhciBzdGFydCA9IGlcbiAgICAgIGlmIChiID49IDB4RDgwMCAmJiBiIDw9IDB4REZGRikgaSsrXG4gICAgICB2YXIgaCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHIuc2xpY2Uoc3RhcnQsIGkrMSkpLnN1YnN0cigxKS5zcGxpdCgnJScpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGgubGVuZ3RoOyBqKyspXG4gICAgICAgIGJ5dGVBcnJheS5wdXNoKHBhcnNlSW50KGhbal0sIDE2KSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoc3RyKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIHBvc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKVxuICAgICAgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBkZWNvZGVVdGY4Q2hhciAoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCkgLy8gVVRGIDggaW52YWxpZCBjaGFyXG4gIH1cbn1cblxuLypcbiAqIFdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHZhbHVlIGlzIGEgdmFsaWQgaW50ZWdlci4gVGhpcyBtZWFucyB0aGF0IGl0XG4gKiBpcyBub24tbmVnYXRpdmUuIEl0IGhhcyBubyBmcmFjdGlvbmFsIGNvbXBvbmVudCBhbmQgdGhhdCBpdCBkb2VzIG5vdFxuICogZXhjZWVkIHRoZSBtYXhpbXVtIGFsbG93ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHZlcmlmdWludCAodmFsdWUsIG1heCkge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPj0gMCwgJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnNpbnQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZklFRUU3NTQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxufVxuXG5mdW5jdGlvbiBhc3NlcnQgKHRlc3QsIG1lc3NhZ2UpIHtcbiAgaWYgKCF0ZXN0KSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCAnRmFpbGVkIGFzc2VydGlvbicpXG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwib01mcEFuXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXCIsXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xudmFyIGxvb2t1cCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblxuOyhmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cbiAgdmFyIEFyciA9ICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgPyBVaW50OEFycmF5XG4gICAgOiBBcnJheVxuXG5cdHZhciBQTFVTICAgPSAnKycuY2hhckNvZGVBdCgwKVxuXHR2YXIgU0xBU0ggID0gJy8nLmNoYXJDb2RlQXQoMClcblx0dmFyIE5VTUJFUiA9ICcwJy5jaGFyQ29kZUF0KDApXG5cdHZhciBMT1dFUiAgPSAnYScuY2hhckNvZGVBdCgwKVxuXHR2YXIgVVBQRVIgID0gJ0EnLmNoYXJDb2RlQXQoMClcblx0dmFyIFBMVVNfVVJMX1NBRkUgPSAnLScuY2hhckNvZGVBdCgwKVxuXHR2YXIgU0xBU0hfVVJMX1NBRkUgPSAnXycuY2hhckNvZGVBdCgwKVxuXG5cdGZ1bmN0aW9uIGRlY29kZSAoZWx0KSB7XG5cdFx0dmFyIGNvZGUgPSBlbHQuY2hhckNvZGVBdCgwKVxuXHRcdGlmIChjb2RlID09PSBQTFVTIHx8XG5cdFx0ICAgIGNvZGUgPT09IFBMVVNfVVJMX1NBRkUpXG5cdFx0XHRyZXR1cm4gNjIgLy8gJysnXG5cdFx0aWYgKGNvZGUgPT09IFNMQVNIIHx8XG5cdFx0ICAgIGNvZGUgPT09IFNMQVNIX1VSTF9TQUZFKVxuXHRcdFx0cmV0dXJuIDYzIC8vICcvJ1xuXHRcdGlmIChjb2RlIDwgTlVNQkVSKVxuXHRcdFx0cmV0dXJuIC0xIC8vbm8gbWF0Y2hcblx0XHRpZiAoY29kZSA8IE5VTUJFUiArIDEwKVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBOVU1CRVIgKyAyNiArIDI2XG5cdFx0aWYgKGNvZGUgPCBVUFBFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBVUFBFUlxuXHRcdGlmIChjb2RlIDwgTE9XRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gTE9XRVIgKyAyNlxuXHR9XG5cblx0ZnVuY3Rpb24gYjY0VG9CeXRlQXJyYXkgKGI2NCkge1xuXHRcdHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG5cblx0XHRpZiAoYjY0Lmxlbmd0aCAlIDQgPiAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuXHRcdH1cblxuXHRcdC8vIHRoZSBudW1iZXIgb2YgZXF1YWwgc2lnbnMgKHBsYWNlIGhvbGRlcnMpXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuXHRcdC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuXHRcdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lLCB0aGVuIHRoZSB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBpdCByZXByZXNlbnQgMiBieXRlc1xuXHRcdC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2Vcblx0XHR2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXHRcdHBsYWNlSG9sZGVycyA9ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAyKSA/IDIgOiAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMSkgPyAxIDogMFxuXG5cdFx0Ly8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5cdFx0YXJyID0gbmV3IEFycihiNjQubGVuZ3RoICogMyAvIDQgLSBwbGFjZUhvbGRlcnMpXG5cblx0XHQvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG5cdFx0bCA9IHBsYWNlSG9sZGVycyA+IDAgPyBiNjQubGVuZ3RoIC0gNCA6IGI2NC5sZW5ndGhcblxuXHRcdHZhciBMID0gMFxuXG5cdFx0ZnVuY3Rpb24gcHVzaCAodikge1xuXHRcdFx0YXJyW0wrK10gPSB2XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxOCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCAxMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA8PCA2KSB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAzKSlcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMDAwKSA+PiAxNilcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMCkgPj4gOClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPj4gNClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxMCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCA0KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpID4+IDIpXG5cdFx0XHRwdXNoKCh0bXAgPj4gOCkgJiAweEZGKVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdHJldHVybiBhcnJcblx0fVxuXG5cdGZ1bmN0aW9uIHVpbnQ4VG9CYXNlNjQgKHVpbnQ4KSB7XG5cdFx0dmFyIGksXG5cdFx0XHRleHRyYUJ5dGVzID0gdWludDgubGVuZ3RoICUgMywgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcblx0XHRcdG91dHB1dCA9IFwiXCIsXG5cdFx0XHR0ZW1wLCBsZW5ndGhcblxuXHRcdGZ1bmN0aW9uIGVuY29kZSAobnVtKSB7XG5cdFx0XHRyZXR1cm4gbG9va3VwLmNoYXJBdChudW0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcblx0XHRcdHJldHVybiBlbmNvZGUobnVtID4+IDE4ICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDEyICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDYgJiAweDNGKSArIGVuY29kZShudW0gJiAweDNGKVxuXHRcdH1cblxuXHRcdC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcblx0XHRmb3IgKGkgPSAwLCBsZW5ndGggPSB1aW50OC5sZW5ndGggLSBleHRyYUJ5dGVzOyBpIDwgbGVuZ3RoOyBpICs9IDMpIHtcblx0XHRcdHRlbXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArICh1aW50OFtpICsgMl0pXG5cdFx0XHRvdXRwdXQgKz0gdHJpcGxldFRvQmFzZTY0KHRlbXApXG5cdFx0fVxuXG5cdFx0Ly8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuXHRcdHN3aXRjaCAoZXh0cmFCeXRlcykge1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHR0ZW1wID0gdWludDhbdWludDgubGVuZ3RoIC0gMV1cblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDIpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz09J1xuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR0ZW1wID0gKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDJdIDw8IDgpICsgKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMTApXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPj4gNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDIpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9J1xuXHRcdFx0XHRicmVha1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXRcblx0fVxuXG5cdGV4cG9ydHMudG9CeXRlQXJyYXkgPSBiNjRUb0J5dGVBcnJheVxuXHRleHBvcnRzLmZyb21CeXRlQXJyYXkgPSB1aW50OFRvQmFzZTY0XG59KHR5cGVvZiBleHBvcnRzID09PSAndW5kZWZpbmVkJyA/ICh0aGlzLmJhc2U2NGpzID0ge30pIDogZXhwb3J0cykpXG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwib01mcEFuXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qc1wiLFwiLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYlwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIm9NZnBBblwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qc1wiLFwiLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaWVlZTc1NFwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIm9NZnBBblwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiLFwiLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3NcIikiXX0=
