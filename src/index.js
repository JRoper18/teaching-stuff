import Slide from './objects/slide.js'
import Command from './objects/command.js'
import LiveEditor from './objects/liveEditor.js'
JSONEditor.defaults.options.theme = 'bootstrap2';
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
  position: function (t) { return [0, 0, -3] },
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
		expr: ["x, Math.sin(x + t)"]
	}),
	new Command("line", {
		width: 50,
		color: "red"
	})
])
s.play(mathbox);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
setTimeout(function(){
	three.Loop.stop();
}, 200)
function click(){
	raycaster.setFromCamera( mouse, three.camera );
	console.log(three.scene);
	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( three.scene.children[0].children );
	console.log(intersects);
	for ( var i = 0; i < intersects.length; i++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );
	}
}
function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
let editor = new LiveEditor(document.getElementById("tree-view"), mathbox);
document.getElementById("update-btn").onclick = function(){
	editor.update();
}
window.addEventListener( 'mousemove', onMouseMove, false );
document.getElementById("slide-display").addEventListener( 'click', click, false );

