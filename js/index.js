var mathbox = mathBox({
  width: 10
});
if (mathbox.fallback) throw "WebGL not supported";

var three = mathbox.three;

var camera = mathbox.camera({
  proxy: true,
  position: [0, 0, 3],
});
let view = mathbox.cartesian({
  range: [[-6, 6], [-3, 3]],
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
    color: '#64d2b6'
  })
