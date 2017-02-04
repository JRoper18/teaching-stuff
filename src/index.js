
/*
import Slide from './objects/slide.js'
import Command from './objects/command.js'
import SlideEditor from './objects/slideEditor.js'
var mathbox = mathBox({
		width: 10,
		element: document.getElementById("slide-display")
});
if (mathbox.fallback) throw "WebGL not supported";
var three = mathbox.three;
window.three = three;
 three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

window.onkeydown = function (e) {
	switch (e.keyCode) {
		case 37:
		case 38:
		present.set('index', present.get('index') - 1);
		break;
		case 39:
		case 40:
		present.set('index', present.get('index') + 1);
		break;
	}
}


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

let test = new SlideEditor(s)
window.slideEdit = test;
slideEdit.refreshMathbox();
*/

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('content')
);