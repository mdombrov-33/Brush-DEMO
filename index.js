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
// ctx.globalCompositeOperation = 'hue';

function drawShape(x, y, radius, inset, n) {
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - radius);

  for (let i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - radius * inset);
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - radius);
  }

  ctx.restore();
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
const radius = 50;
const inset = 0.5;
const n = 10;

//Shape preview
drawShape(70, 70, radius * 0.95, 0.2, 5);
drawShape(120, 120, radius, inset, n);

let angle = 0;

//Rotate shape + draw
window.addEventListener('mousemove', e => {
  if (isDrawing) {
    ctx.save();
    ctx.translate(e.x, e.y);

    ctx.rotate(angle);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'grey';
    drawShape(0, 0, radius, 1, 3);

    ctx.rotate(-angle * 3);
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'purple';
    drawShape(radius / 1.25, radius / 5, radius, inset, n);

    ctx.rotate(-angle * 3);
    drawShape(radius / 1.5, radius / 5, radius + 0.5, inset, n);

    angle += 0.1;
    ctx.restore();
  }
});

window.addEventListener('mousedown', e => {
  isDrawing = true;
});

window.addEventListener('mouseup', e => {
  isDrawing = false;
});
