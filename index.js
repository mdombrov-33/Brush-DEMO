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

const radius = 50;
const inset = 0.5;
const n = 10;
let angle = 0;

//  radius - outer radius
//  inset - proportion between outer and inner radius, result in pixels. If value is close to 1 - more circle-like shape(polygon)
//  n - number of sides
function drawShape(x, y, radius, inset, n) {
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - radius); //start coordinates

  for (let i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n); //inner radius
    ctx.lineTo(0, 0 - radius * inset); //first drawn segment, inner radius
    ctx.rotate(Math.PI / n); //rotate half circle by n
    ctx.lineTo(0, 0 - radius); //second second segment, outer radius
  }

  ctx.restore();
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

// Generate random values for shape properties
const generateRadius = () => {
  return Math.random() * 100;
};

const generateInset = () => {
  return Math.random();
};

const generateSides = () => {
  return Math.floor(Math.random() * 10) + 3;
};

const generateColor = () => {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, ${Math.random().toFixed(1)})`;
};

const shapeProperties = {
  Shape1: {
    randomRadiusShape1: generateRadius(),
    randomInsetShape1: generateInset(),
    randomSidesShape1: generateSides(),
    randomColorShape1: generateColor(),
  },
  Shape2: {
    randomRadiusShape2: generateRadius(),
    randomInsetShape2: generateInset(),
    randomSidesShape2: generateSides(),
    randomColorShape2: generateColor(),
  },
  Shape3: {
    randomRadiusShape3: generateRadius(),
    randomInsetShape3: generateInset(),
    randomSidesShape3: generateSides(),
    randomColorShape3: generateColor(),
  },
};

//Shapes preview
drawShape(
  60,
  70,
  radius,
  shapeProperties.Shape1.randomInsetShape1,
  shapeProperties.Shape1.randomSidesShape1
);
drawShape(
  150,
  160,
  radius,
  shapeProperties.Shape2.randomInsetShape2,
  shapeProperties.Shape2.randomSidesShape2
);
drawShape(
  240,
  250,
  radius,
  shapeProperties.Shape3.randomInsetShape3,
  shapeProperties.Shape3.randomSidesShape3
);

//Rotate shape + draw
window.addEventListener('mousemove', e => {
  if (isDrawing) {
    ctx.save();
    ctx.translate(e.x, e.y);

    //First shape
    ctx.rotate(angle);
    ctx.fillStyle = shapeProperties.Shape1.randomColorShape1;
    ctx.strokeStyle = shapeProperties.Shape1.randomColorShape1;

    drawShape(
      radius / 0.5,
      radius / 5,
      shapeProperties.Shape1.randomRadiusShape1,
      shapeProperties.Shape1.randomInsetShape1,
      shapeProperties.Shape1.randomSidesShape1
    );

    //Second shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = shapeProperties.Shape2.randomColorShape2;
    ctx.strokeStyle = shapeProperties.Shape2.randomColorShape2;

    drawShape(
      radius / 1.25,
      radius / 5,
      shapeProperties.Shape2.randomRadiusShape2,
      shapeProperties.Shape2.randomInsetShape2,
      shapeProperties.Shape2.randomSidesShape2
    );

    //Third shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = shapeProperties.Shape3.randomColorShape3;
    ctx.strokeStyle = shapeProperties.Shape3.randomColorShape3;

    drawShape(
      radius / 1.5,
      radius / 5,
      shapeProperties.Shape3.randomRadiusShape3,
      shapeProperties.Shape3.randomInsetShape3,
      shapeProperties.Shape3.randomSidesShape3
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

//Reset
function restartPage() {
  window.location.reload();
}

button.addEventListener('click', () => {
  restartPage();
});

window.addEventListener('keydown', e => {
  if (e.key === 'r') {
    restartPage();
  }
});

//Button
button.addEventListener('mouseover', () => {
  button.style.backgroundColor = 'rgb(204, 219, 209)';
  isDrawing = false;
});
button.addEventListener('mouseout', () => {
  button.style.backgroundColor = 'white';
});
