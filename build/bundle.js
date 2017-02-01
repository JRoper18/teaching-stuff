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

	var _MathboxEditor = __webpack_require__(1);

	var _MathboxEditor2 = _interopRequireDefault(_MathboxEditor);

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
	//Setup the tree view.


	var test = new _MathboxEditor2.default(mathbox);
	test.addElement("interval", { expr: function expr(emit, x, i, t) {
	        emit(x, 1);
	    }, width: 30, channels: 2 });
	test.addElement("line", { width: 30, color: 'white' });
	test.refreshMathbox();

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

	var MathboxEditor = function () {
		function MathboxEditor(mathbox, element) {
			_classCallCheck(this, MathboxEditor);

			this.mathbox = mathbox;
			this.element = element;
			this.json = this.getJSON();
		}

		_createClass(MathboxEditor, [{
			key: "addElement",
			value: function addElement(type, data) {
				this.mathbox[type](data);
			}
		}, {
			key: "refreshMathbox",
			value: function refreshMathbox() {
				//First, we generate a list of addElement commands from our json.
				var commands = [];
				//You want to add the elements in order. Do that with their IDs	
				var outOfIds = false;
				var index = 1;
				while (!outOfIds) {
					var objectWithId = this.searchJSON(this.json.root, index);
					alert(objectWithId);
					if (objectWithId === null) {
						//Reahced the last ID
						outOfIds = true;
					}
					var type = objectWithId.constructor;
					var data = objectWithId["@attributes"];
					commands.push(new _command2.default(type, data));
					index++;
				}
				console.log(commands);
			}
		}, {
			key: "searchJSON",
			value: function searchJSON() {
				var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.json.root;
				var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
				//Searches a json element for something with id: id
				//Check this element
				if (json["@attributes"] === undefined) {
					return null;
				}
				if (json["@attributes"].id == id) {
					return json;
				}
				//Check children
				for (var child in json) {
					if (json.hasOwnProperty(child) && (child != "#text" || child != "@attributes")) {
						if (json[child].constructor === Array) {
							//This is for when we have multiple of the same type of object when parsing xml, and it's bundled
							for (var subChild in json[child]) {
								if (json[child].hasOwnProperty(subChild) && (subChild != "#text" || subChild != "@attributes")) {
									var possible = this.searchJSON(json[child][subChild], id);
									if (possible != null) {
										return possible;
									}
								}
							}
						} else {
							var _possible = this.searchJSON(json[child], id);
							if (_possible != null) {
								return _possible;
							}
						}
					}
				}
				return null;
			}
		}, {
			key: "getJSON",
			value: function getJSON() {
				var xml = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.mathbox.toMarkup();

				var stringToParse = xml;
				stringToParse = stringToParse.replace(/{/g, '"');
				stringToParse = stringToParse.replace(/}/g, '"');
				//Now go through and fix any function brackets that were replaced with ""
				var matchPositions = [];
				var regex = /function/g;
				var match = regex.exec(stringToParse);
				while (match != null) {
					matchPositions.push(match.index);
					match = regex.exec(stringToParse);
				}
				var unFunctioned = stringToParse;
				for (var index in matchPositions) {
					//Replace the first " with a {
					var temp = unFunctioned.substr(matchPositions[index], stringToParse.length);
					var badQuoteIndex = matchPositions[index] + temp.indexOf('"');
					stringToParse = stringToParse.substr(0, badQuoteIndex) + "{" + stringToParse.substr(badQuoteIndex + 1, stringToParse.length);
					//Replace the next " with a } : assume we have no strings in our function
					temp = unFunctioned.substr(badQuoteIndex + 1, unFunctioned.length);
					badQuoteIndex = badQuoteIndex + temp.indexOf('"') + 1;
					stringToParse = stringToParse.substr(0, badQuoteIndex) + "}" + stringToParse.substr(badQuoteIndex + 1, stringToParse.length);
				}
				//Brackets are fixed! 
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(stringToParse, "text/xml");
				return this.xmlToJson(xmlDoc);
			}
		}, {
			key: "xmlToJson",
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

		return MathboxEditor;
	}();

	exports.default = MathboxEditor;

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
		function Command(type, parameters) {
			_classCallCheck(this, Command);

			this.type = type;
			this.parameters = parameters;
		}

		_createClass(Command, [{
			key: "execute",
			value: function execute(mathbox) {
				mathbox[this.type](this.parameters);
			}
		}]);

		return Command;
	}();

	exports.default = Command;

/***/ }
/******/ ]);