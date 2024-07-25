const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = 'black';
ctx.fillStyle = 'grey';
let hue = 0;
let isDrawing = false;

//radius - outer radius; inset - modifier(proportion between outer and inner radius); n - number of sides
function drawShape(x, y, radius, inset, n) {
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - radius); //start coordinates

  for (let i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n); //inner radius
    ctx.lineTo(0, 0 - radius * inset);
    ctx.rotate(Math.PI / n); //rotate half circle by n
    ctx.lineTo(0, 0 - radius); //outer radius
  }

  ctx.restore();
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
const radius = 50;
const inset = 0.5;
const n = 10;

// Generate random values for shape parameters
const randomRadius1 = Math.random() * 100;
const randomInset1 = Math.random();
const randomSides1 = Math.floor(Math.random() * 10) + 3;

const randomRadius2 = Math.random() * 100;
const randomInset2 = Math.random();
const randomSides2 = Math.floor(Math.random() * 10) + 3;

const randomRadius3 = Math.random() * 100;
const randomInset3 = Math.random();
const randomSides3 = Math.floor(Math.random() * 10) + 3;

//Shapes preview
drawShape(60, 70, randomRadius1, randomInset1, randomSides1);
drawShape(150, 160, randomRadius2, randomInset2, randomSides2);
drawShape(240, 250, randomRadius3, randomInset3, randomSides3);

let angle = 0;

//Rotate shape + draw
window.addEventListener('mousemove', e => {
  if (isDrawing) {
    ctx.save();
    ctx.translate(e.x, e.y);

    //First shape
    ctx.rotate(angle);
    ctx.fillStyle = '#683bd9';
    ctx.strokeStyle = 'black';
    drawShape(
      radius / 0.5,
      radius / 5,
      randomRadius1,
      randomInset1,
      randomSides1
    );

    //Second shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = '#b2a6ce';
    ctx.strokeStyle = 'purple';
    drawShape(
      radius / 1.25,
      radius / 5,
      randomRadius2,
      randomInset2,
      randomSides2
    );

    //Third shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = 'purple';
    ctx.strokeStyle = 'black';
    drawShape(
      radius / 1.5,
      radius / 5,
      randomRadius3,
      randomInset3,
      randomSides3
    );

    angle += 0.1;
    ctx.restore();
  }
});

//State changes
window.addEventListener('mousedown', e => {
  isDrawing = true;
});

window.addEventListener('mouseup', e => {
  isDrawing = false;
});
