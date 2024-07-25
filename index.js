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

//Shapes preview
drawShape(70, 70, radius * 0.95, 0.2, 7);
drawShape(120, 120, radius * 0.8, inset, 4);
drawShape(180, 180, radius + 0.5, inset, 5);

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
    drawShape(radius / 0.5, radius / 5, radius * 0.95, 0.2, 7);

    //Second shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = '#b2a6ce';
    ctx.strokeStyle = 'purple';
    drawShape(radius / 1.25, radius / 5, radius, inset, 4);

    //Third shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = 'purple';
    ctx.strokeStyle = 'black';
    drawShape(radius / 1.5, radius / 5, radius + 0.5, inset, 5);

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
