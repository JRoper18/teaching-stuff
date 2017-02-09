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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = function () {
	function Command(type, parameters) {
		var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

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
			var toAdd = this.id == 0 ? mathbox : mathbox.select("#" + this.id);
			var added = toAdd[this.type](this.parameters);
		}
	}]);

	return Command;
}();

exports.default = Command;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _command = __webpack_require__(0);

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
      }).end().end().slide();
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slide = __webpack_require__(1);

var _slide2 = _interopRequireDefault(_slide);

var _command = __webpack_require__(0);

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LiveEditor = function () {
	function LiveEditor(element, mathbox) {
		_classCallCheck(this, LiveEditor);

		var schema = {
			definitions: {
				attr_width: {
					type: "integer",
					minimum: 0,
					exclusiveMinimum: true
				},
				attr_color: {
					type: "string",
					format: "color"
				},
				line_attr: {
					type: "object",
					properties: {
						color: { $ref: "#/definitions/attr_color" },
						width: { $ref: "#/definitions/attr_width" }
					}
				},
				line: {
					type: "object",
					properties: {
						"@	attributes": { $ref: "#/definitions/line_attr" }
					},
					defaultProperties: []
				}
			},
			title: "Presentation",
			type: "object",
			properties: {
				line: {
					$ref: "#/definitions/line"
				}

			},
			defaultProperties: []
		};
		this.mathbox = mathbox;
		var options = {
			schema: schema
		};
		this.editor = new JSONEditor(element, options);
		this.editor.setValue(this.getJSON(this.mathbox.select("line").toMarkup()));
		this.lastJSON = this.editor.getValue();
	}

	_createClass(LiveEditor, [{
		key: 'update',
		value: function update() {
			//Find the differences between the last json and the new one. 
			var commands = this.getJSONDiff(this.lastJSON, this.editor.getValue());
			for (var index in commands) {
				commands[index].execute(this.mathbox);
			}
			this.lastJSON = this.editor.getValue();
		}
	}, {
		key: 'getJSONDiff',
		value: function getJSONDiff(before, after) {
			var parentElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			var commands = [];
			if (before == after) {
				//Nothing! 
			} else if (before.constructor == Array || after.constructor == Array) {
				for (var i = 0; i < Math.max(before.length, after.length); i++) {
					if (after[i] === undefined) {
						//We must've removed something. 
						commands.push(new _command2.default("remove", "*", parentElement["@attributes"].id));
					} else if (before[i] === undefined) {
						//Added something
						commands.push(new _command2.default(after.constructor.name, after[i]["@attributes"], parentElement["@attributes"].id));
					} else {
						var newCommands = this.getJSONDiff(before[i], after[i]);
						commands = commands.concat(newCommands);
					}
				}
			} else if (before.constructor == Array) {
				//Before is an array but after isn't. Something was removed. 
				for (var _i = 1; _i < before.length; _i++) {
					commands.push(new _command2.default("remove", before[_i]["@attributes"].id));
				}
			} else if (after.constructor == Array) {
				//After is an array but before isn't. Something was added. 
				for (var _i2 = 1; _i2 < after.length; _i2++) {
					commands.push(new _command2.default(parentElement.constructor.name, after[_i2]["@attributes"], parentElement["@attributes"].id));
				}
			} else {
				//Neither before or after are arrays. Compare their values
				var beforeAttributes = before["@attributes"];
				var afterAttributes = after["@attributes"];
				var propertiesToChange = {};
				if (beforeAttributes !== undefined && afterAttributes != undefined) {
					for (var property in afterAttributes) {
						if (afterAttributes.hasOwnProperty(property) && afterAttributes[property] != beforeAttributes[property]) {
							propertiesToChange[property] = afterAttributes[property];
						}
					}
					if (JSON.stringify(propertiesToChange) != "{}") {
						commands.push(new _command2.default("set", propertiesToChange, beforeAttributes.id));
					}
				}
				for (var child in after) {
					if (after.hasOwnProperty(child) && child != "@attributes") {
						var _newCommands = this.getJSONDiff(before[child], after[child], after);
						commands = commands.concat(_newCommands);
					}
				}
			}
			return commands;
		}
	}, {
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
			delete obj["#text"];
			return obj;
		}
	}]);

	return LiveEditor;
}();

exports.default = LiveEditor;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slide = __webpack_require__(1);

var _slide2 = _interopRequireDefault(_slide);

var _command = __webpack_require__(0);

var _command2 = _interopRequireDefault(_command);

var _liveEditor = __webpack_require__(2);

var _liveEditor2 = _interopRequireDefault(_liveEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

JSONEditor.defaults.options.theme = 'bootstrap2';
var WIDTH = 640;
var HEIGHT = 480;

// Vanilla Three.js
var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, .01, 1000);
window.scene = scene;
// Insert into document
document.body.appendChild(renderer.domElement);

// MathBox context
var context = new MathBox.Context(renderer, scene, camera).init();
var mathbox = context.api;

// Set size
renderer.setSize(WIDTH, HEIGHT);
context.resize({ viewWidth: WIDTH, viewHeight: HEIGHT });
document.getElementById('slide-display').appendChild(renderer.domElement);
// Place camera and set background
camera.position.set(0, 0, 3);
renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

// MathBox elements
var view = mathbox.cartesian({
	range: [[-3, 3], [-1, 1], [-1, 1]],
	scale: [3, 1, 1]
});

var present = view.present({
	index: 2
});
var s = new _slide2.default([new _command2.default("grid", {
	axes: [1, 2],
	width: 2,
	color: 0x2fff90,
	depth: .5
}), new _command2.default("interval", {
	width: 64,
	channels: 2,
	expr: ["x, Math.sin(x + t)"]
}), new _command2.default("line", {
	width: 50,
	color: "red"
})]);
s.play(mathbox);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
function click() {
	raycaster.setFromCamera(mouse, camera);
	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects(scene.children, true);
	console.log(intersects);
	for (var i = 0; i < intersects.length; i++) {
		intersects[i].object.material.color.set(0xffff00);
	}
}
function onMouseMove(event) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = (event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width * 2 - 1;
	mouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;
}
var editor = new _liveEditor2.default(document.getElementById("tree-view"), mathbox);
document.getElementById("update-btn").onclick = function () {
	editor.update();
};
window.addEventListener('mousemove', onMouseMove, false);
document.getElementById("slide-display").addEventListener('click', click, false);

var frame = function frame() {
	requestAnimationFrame(frame);
	context.frame();
	renderer.render(scene, camera);
};

requestAnimationFrame(frame);

/***/ })
/******/ ]);