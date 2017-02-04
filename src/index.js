import Slide from './objects/slide.js'
import Command from './objects/command.js'
var mathbox = mathBox({
		width: 10,
		element: document.getElementById("slide-display")
});
if (mathbox.fallback) throw "WebGL not supported";
var three = mathbox.three;
window.three = three;
 three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

if (window == top)
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
	//console.log(present.get('index'));
  }

setInterval(function () {
  present.set('index', (present.get('index') + 1) % (present.get('length') + 1));
}, 2000);

var view = mathbox.cartesian({
  range: [[-1, 1], [-1, 1], [-1, 1]],
  scale: [1, 1, 1],
})

var present =
view.present({
  index: 1
})

var camera = view.camera({
  lookAt: [0, 0, 0],
}, {
  position: function (t) { return [-3, 3, -3] },
});
let s = new Slide([
	new Command("grid", {
		axes: [1, 3],
		width: 2,
		color: 0x2fff90,
		depth: .5
	}),
	new Command("interval", {
		width: 64,
		channels: 2,
		expr: "emit(x, Math.sin(x + t))"
	}),
	new Command("line", {
		width: 50,
		color: "blue"
	})
])
s.play(mathbox);

console.log(mathbox.toMarkup());
