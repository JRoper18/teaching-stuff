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

	'use strict';

	var _slide = __webpack_require__(1);

	var _slide2 = _interopRequireDefault(_slide);

	var _command = __webpack_require__(2);

	var _command2 = _interopRequireDefault(_command);

	var _liveEditor = __webpack_require__(3);

	var _liveEditor2 = _interopRequireDefault(_liveEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	var mathbox = mathBox({
		width: 10,
		element: document.getElementById("slide-display")
	});
	if (mathbox.fallback) throw "WebGL not supported";
	var three = mathbox.three;
	window.mathbox = mathbox;
	window.three = three;
	three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

	var view = mathbox.cartesian({
	  range: [[-3, 3], [-1, 1], [-1, 1]],
	  scale: [3, 1, 1],
	})

	var present =
	view.present({
	  index: 2
	})
	var camera = view.camera({
	  lookAt: [0, 0, 0],
	}, {
	  position: function (t) { return [-3, 3, -3] },
	});
	let s = new Slide([
		new Command("grid", {
			axes: [1, 2],
			width: 2,
			color: 0x2fff90,
			depth: .5
		}),
		new Command("interval", {
			width: 64,
			channels: 2,
			expr: ["x, Math.sin(x + t)", "x, Math.cos(x + t)"]
		}),

		new Command("line", {
			width: 50,
			color: "red"
		})
	])
	s.play(mathbox);

	let editor = new LiveEditor(document.getElementById("content"), mathbox); 

	*/
	var schema = {
		title: "Element Schema",
		type: "object",
		properties: {}
	};
	var options = {
		mode: "tree"
	};
	var editor = new JSONEditor(document.getElementById("content"), options, {
		"Array": [1, 2, 3],
		"Boolean": true,
		"Null": null,
		"Number": 123,
		"Object": { "a": "b", "c": "d" },
		"String": "Hello World"
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _command = __webpack_require__(2);

	var _command2 = _interopRequireDefault(_command);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Slide = function () {
	  function Slide(onPlay) {
	    _classCallCheck(this, Slide);

	    //Where onPlay and onTransition are arrays of commands.
	    this.commands = onPlay;
	  }

	  _createClass(Slide, [{
	    key: "add",
	    value: function add(type) {
	      this.commands.push(new _command2.default(type, this.getDefaultParams(type)));
	    }
	  }, {
	    key: "play",
	    value: function play() {
	      var mathbox = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.mathbox;

	      var present = mathbox.select("present");
	      var slide = present.slide().reveal({
	        duration: 2
	      }).end().slide().reveal();
	      for (var index in this.commands) {
	        this.commands[index].execute(slide);
	      }
	    }
	  }, {
	    key: "getDefaultParams",
	    value: function getDefaultParams(type) {
	      switch (type) {
	        case "line":
	          return {
	            width: 50,
	            color: "red"
	          };
	        case "grid":
	          return {
	            axes: [1, 2],
	            width: 2,
	            color: "black",
	            depth: .5
	          };
	      }
	    }
	  }]);

	  return Slide;
	}();

	exports.default = Slide;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Command = function () {
		function Command(type, parameters, id) {
			_classCallCheck(this, Command);

			this.type = type;
			this.parameters = parameters;
			this.id = id;
			if (this.type == "interval") {
				if (this.parameters.expr) {
					//Parse functions as acutal functions, not just strings
					this.parameters.items = this.parameters.expr.length;
					var withEmitCall = [];
					for (var index in this.parameters.expr) {
						withEmitCall.push("emit(" + this.parameters.expr[index] + ")");
					}
					var combinedStr = withEmitCall.join(";\n");
					this.parameters.expr = new Function("emit", "x", "i", "t", combinedStr);
				}
			}
		}

		_createClass(Command, [{
			key: "execute",
			value: function execute(mathbox) {
				var toAdd = mathbox;
				var added = toAdd[this.type](this.parameters);
			}
		}]);

		return Command;
	}();

	exports.default = Command;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slide = __webpack_require__(1);

	var _slide2 = _interopRequireDefault(_slide);

	var _command = __webpack_require__(2);

	var _command2 = _interopRequireDefault(_command);

	var _slideEditor = __webpack_require__(4);

	var _slideEditor2 = _interopRequireDefault(_slideEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LiveEditor = function () {
		function LiveEditor(element, mathbox) {
			_classCallCheck(this, LiveEditor);

			var schema = {
				title: "Element Schema",
				type: "object",
				properties: {}
			};
			this.editor = new JSONEditor(element, { schema: schema }, this.getJSON(mathbox.select("present").toMarkup()));
		}

		_createClass(LiveEditor, [{
			key: 'searchJSON',
			value: function searchJSON() {
				var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.json.root;
				var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
				//Searches a json element for something with id: id
				//Check this element
				if (json === null) {
					return null;
				}
				if (json["@attributes"] === undefined) {
					return null;
				}
				if (json["@attributes"].id == id) {
					if (id == 1) {
						return {
							"parent": null,
							"name": "root",
							"obj": json
						};
					}
					return { //This is a child, so handle setting the parent from the parent. 
						"parent": null,
						"name": null,
						"obj": json
					};
				}
				//Check children
				for (var child in json) {
					if (json.hasOwnProperty(child) && child != "#text" && child != "@attributes") {
						if (json[child].constructor == Array) {
							//Go through children of array, too
							for (var index in json[child]) {
								var current = json[child][index];
								var possible = this.searchJSON(current, id);
								if (possible != null) {
									return {
										"parent": json["@attributes"].id,
										"name": child,
										"obj": possible.obj
									};
								}
							}
						} else {
							var _possible = this.searchJSON(json[child], id);
							if (_possible != null) {
								if (_possible.name != null) {
									return _possible;
								}
								return {
									"parent": json["@attributes"]["id"],
									"name": child,
									"obj": _possible.obj
								};
							}
						}
					}
				}
				return null;
			}
		}, {
			key: 'getJSON',
			value: function getJSON(xml) {
				var stringToParse = xml;
				stringToParse = stringToParse.replace(/{/g, '"');
				stringToParse = stringToParse.replace(/}/g, '"');
				//Now go through and fix any function brackets that were replaced with "", and preset functions so that they can be built later (remove function and args)
				var matchPositions = [];
				var regex = /function/g;
				var match = regex.exec(stringToParse);
				while (match != null) {
					matchPositions.push(match.index);
					match = regex.exec(stringToParse);
				}
				var unFunctioned = stringToParse;
				for (var index in matchPositions) {
					//Remove function, args, and extra quotes. 
					var afterFunctionDeclaration = unFunctioned.substr(matchPositions[index], stringToParse.length);
					var firstQuoteLocation = afterFunctionDeclaration.indexOf('"');
					var functionDelcaration = afterFunctionDeclaration.substr(0, firstQuoteLocation);
					var lastQuoteLocation = afterFunctionDeclaration.substr(firstQuoteLocation + 1, afterFunctionDeclaration.length).indexOf('"');
					var functionBody = afterFunctionDeclaration.substr(firstQuoteLocation + 1, lastQuoteLocation);
					var afterBody = '"' + stringToParse.substr(3 + matchPositions[index] + firstQuoteLocation + lastQuoteLocation, stringToParse.length);
					stringToParse = stringToParse.substr(0, matchPositions[index]) + functionBody + afterBody;
				}
				//Brackets are fixed! 
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(stringToParse, "text/xml");
				return this.xmlToJson(xmlDoc);
			}
		}, {
			key: 'xmlToJson',
			value: function xmlToJson(xml) {

				// Create the return object
				var obj = {};

				if (xml.nodeType == 1) {
					// element
					// do attributes
					if (xml.attributes.length > 0) {
						obj["@attributes"] = {};
						for (var j = 0; j < xml.attributes.length; j++) {
							var attribute = xml.attributes.item(j);
							obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
						}
					}
				} else if (xml.nodeType == 3) {
					// text
					obj = xml.nodeValue;
				}

				// do children
				if (xml.hasChildNodes()) {
					for (var i = 0; i < xml.childNodes.length; i++) {
						var item = xml.childNodes.item(i);
						var nodeName = item.nodeName;
						if (typeof obj[nodeName] == "undefined") {
							obj[nodeName] = this.xmlToJson(item);
						} else {
							if (typeof obj[nodeName].push == "undefined") {
								var old = obj[nodeName];
								obj[nodeName] = [];
								obj[nodeName].push(old);
							}
							obj[nodeName].push(this.xmlToJson(item));
						}
					}
				}
				return obj;
			}
		}]);

		return LiveEditor;
	}();

	exports.default = LiveEditor;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _command = __webpack_require__(2);

	var _command2 = _interopRequireDefault(_command);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SlideEditor = function () {
		function SlideEditor(slide, element) {
			_classCallCheck(this, SlideEditor);

			this.slide = slide;
			this.element = element;
		}

		_createClass(SlideEditor, [{
			key: 'addElement',
			value: function addElement(type) {
				this.slide.add(type);
			}
		}, {
			key: 'addTreeEditor',
			value: function addTreeEditor(type) {}
		}, {
			key: 'change',
			value: function change() {
				//Find the differences between the new model and the old. 
			}
		}]);

		return SlideEditor;
	}();

	exports.default = SlideEditor;

/***/ }
/******/ ]);