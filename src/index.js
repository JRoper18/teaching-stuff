import Slide from './objects/slide.js'
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
    position: [0, 0, 3],
});
let view = mathbox.cartesian({
    range: [
        [-6, 6],
        [-3, 3]
    ],
    scale: [2, 1],
});
view
    .axis({
        axis: 1,
        width: 10,
    }).axis({
        axis: 2,
        width: 10,
    }).grid({
        width: 2,
        divideX: 20,
        divideY: 10,
    }).interval({
  expr: function(emit, x, i, t){
    emit(x, Math.sin(x));
  },
  width: 64,
  channels: 2,
  }).line({
    width: 50,
    color: '#64d2b6'
  })
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
function onDocumentMouseDown( e ) {
    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
    var raycaster = new THREE.Raycaster();
    e.preventDefault();
    var mouseVector = new THREE.Vector3();
    raycaster.setFromCamera( mouse, three.camera );
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObject(THREE.scene.children[0].children[0]);
    console.log(intersects);
    for( var i = 0; i < intersects.length; i++ ) {
        var intersection = intersects[ i ],
        obj = intersection.object;
        console.log("Intersected object", obj);
    }
}