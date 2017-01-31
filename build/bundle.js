/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slide = __webpack_require__(1);

	var _slide2 = _interopRequireDefault(_slide);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mathbox = mathBox({
	    width: 10,
	    element: document.getElementById("slide-display")
	});
	if (mathbox.fallback) throw "WebGL not supported";

	var three = mathbox.three;

	window.scene = three.scene;

	//Setup default camera and cartesion coordinates
	var camera = mathbox.camera({
	    proxy: true,
	    position: [0, 0, 3]
	});
	var view = mathbox.cartesian({
	    range: [[-6, 6], [-3, 3]],
	    scale: [2, 1]
	});
	view.axis({
	    axis: 1,
	    width: 10
	}).axis({
	    axis: 2,
	    width: 10
	}).grid({
	    width: 2,
	    divideX: 20,
	    divideY: 10
	}).interval({
	    expr: function expr(emit, x, i, t) {
	        emit(x, Math.sin(x));
	    },
	    width: 64,
	    channels: 2
	}).line({
	    width: 50,
	    color: '#64d2b6'
	});
	document.addEventListener('mousedown', onDocumentMouseDown, false);
	function onDocumentMouseDown(e) {
	    var mouse = new THREE.Vector2();
	    mouse.x = event.clientX / window.innerWidth * 2 - 1;
	    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	    var raycaster = new THREE.Raycaster();
	    e.preventDefault();
	    var mouseVector = new THREE.Vector3();
	    raycaster.setFromCamera(mouse, three.camera);
	    // calculate objects intersecting the picking ray
	    var intersects = raycaster.intersectObjects(three.scene.children);
	    console.log(intersects.length);
	    for (var i = 0; i < intersects.length; i++) {
	        var intersection = intersects[i],
	            obj = intersection.object;
	        console.log("Intersected object", obj);
	    }
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Slide = function () {
	  function Slide(onPlay, onTransition) {
	    _classCallCheck(this, Slide);

	    //Where onPlay and onTransition are arrays of commands.
	    this.play = onPlay;
	    this.transition = onTransition;
	  }

	  _createClass(Slide, [{
	    key: "play",
	    value: function play(mathbox) {
	      for (command in this.play) {
	        command.execute(mathbox);
	      }
	    }
	  }, {
	    key: "transition",
	    value: function transition(mathbox) {
	      for (command in this.transition) {
	        command.execute(mathbox);
	      }
	    }
	  }]);

	  return Slide;
	}();

	exports.default = Slide;

/***/ }
/******/ ]);