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
ctx.fillStyle = 'rgb(204, 219, 209)';
let hue = 0;
let isDrawing = false;

const button = document.createElement('button');
button.textContent = 'Reset';
document.body.appendChild(button);
button.style.fontSize = '50px';
button.style.position = 'fixed';
button.style.top = '10px';
button.style.right = '10px';
button.style.visibility = 'visible';
button.style.backgroundColor = 'white';

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
const randomColorShape1 = `rgba(${Math.floor(
  Math.random() * 256
)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
  Math.random() * 256
)}, ${Math.random().toFixed(1)})`;

const randomColorShape2 = `rgba(${Math.floor(
  Math.random() * 256
)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
  Math.random() * 256
)}, ${Math.random().toFixed(1)})`;

const randomColorShape3 = `rgba(${Math.floor(
  Math.random() * 256
)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
  Math.random() * 256
)}, ${Math.random().toFixed(1)})`;

const randomRadiusShape1 = Math.random() * 100;
const randomInsetShape1 = Math.random();
const randomSidesShape1 = Math.floor(Math.random() * 10) + 3;

const randomRadiusShape2 = Math.random() * 100;
const randomInsetShape2 = Math.random();
const randomSidesShape2 = Math.floor(Math.random() * 10) + 3;

const randomRadiusShape3 = Math.random() * 100;
const randomInsetShape3 = Math.random();
const randomSidesShape3 = Math.floor(Math.random() * 10) + 3;

//Shapes preview
drawShape(60, 70, randomRadiusShape1, randomInsetShape1, randomSidesShape1);
drawShape(150, 160, randomRadiusShape2, randomInsetShape2, randomSidesShape2);
drawShape(240, 250, randomRadiusShape3, randomInsetShape3, randomSidesShape3);

let angle = 0;

//Rotate shape + draw
window.addEventListener('mousemove', e => {
  if (isDrawing) {
    ctx.save();
    ctx.translate(e.x, e.y);

    //First shape
    ctx.rotate(angle);
    ctx.fillStyle = randomColorShape1;
    ctx.strokeStyle = randomColorShape1;

    drawShape(
      radius / 0.5,
      radius / 5,
      randomRadiusShape1,
      randomInsetShape2,
      randomSidesShape3
    );

    //Second shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = randomColorShape2;
    ctx.strokeStyle = randomColorShape2;

    drawShape(
      radius / 1.25,
      radius / 5,
      randomRadiusShape2,
      randomInsetShape2,
      randomSidesShape2
    );

    //Third shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = randomColorShape3;
    ctx.strokeStyle = randomColorShape3;
    drawShape(
      radius / 1.5,
      radius / 5,
      randomRadiusShape3,
      randomInsetShape3,
      randomSidesShape3
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

button.addEventListener('click', () => {
  restartPage();
});

button.addEventListener('mouseover', () => {
  button.style.backgroundColor = 'rgb(204, 219, 209)';
  isDrawing = false;
});
button.addEventListener('mouseout', () => {
  button.style.backgroundColor = 'white';
});

function restartPage() {
  window.location.reload();
}

window.addEventListener('keydown', e => {
  if (e.key === 'r') {
    restartPage();
  }
});
