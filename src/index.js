import Slide from './objects/slide.js'
import Command from './objects/command.js'
import LiveEditor from './objects/liveEditor.js'

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

let editor = new LiveEditor(document.getElementById("tree-view"), mathbox);