import MathboxEditor from './objects/MathboxEditor.js'
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
//Setup the tree view.


let test = new MathboxEditor(mathbox);
test.addElement("interval", {expr: function(emit, x, i, t){emit(x, 1)}, width: 30, channels: 2})
test.addElement("line", {width: 30, color: 'white'})
console.log(test.searchJSON());
