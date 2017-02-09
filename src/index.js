import Slide from './objects/slide.js'
import Command from './objects/command.js'
import LiveEditor from './objects/liveEditor.js'
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
  scale: [3, 1, 1],
})

var present =
view.present({
  index: 2
})
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
function click(){
	raycaster.setFromCamera( mouse, camera );
	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects(scene.children, true);
	for ( var i = 0; i < intersects.length; i++ ) {
		intersects[ i ].object.material.color.set( 0xffff00 );
	}
}
function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.width ) * 2 - 1;
	mouse.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.height ) * 2 + 1;

}
let editor = new LiveEditor(document.getElementById("tree-view"), mathbox);
document.getElementById("update-btn").onclick = function(){
	editor.update();
}
window.addEventListener( 'mousemove', onMouseMove, false );
document.getElementById("slide-display").addEventListener( 'click', click, false );


let frame = function () {
  requestAnimationFrame(frame);
  context.frame();
  renderer.render(scene, camera);
};

requestAnimationFrame(frame);