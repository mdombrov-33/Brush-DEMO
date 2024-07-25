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
let angle = 0;

//  radius - outer radius
//  inset - proportion between outer and inner radius, result of multiplication is in pixels. If value is close to 1 - more circle-like shape(polygon)
//  n - number of sides
function drawShape(x, y, radius, inset, n) {
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - radius); //start coordinates

  for (let i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n); //rotate half circle by n
    ctx.lineTo(0, 0 - radius * inset); //first drawn segment, inner radius
    ctx.rotate(Math.PI / n);
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

const generateX = () => {
  return Math.random() * 50;
};

const generateY = () => {
  return Math.random() * 50;
};

const shapeProperties = {
  Shape1: {
    randomX: generateX(),
    randomY: generateY(),
    randomRadiusShape: generateRadius(),
    randomInsetShape: generateInset(),
    randomSidesShape: generateSides(),
    randomColorShape: generateColor(),
  },
  Shape2: {
    randomX: generateX(),
    randomY: generateY(),
    randomRadiusShape: generateRadius(),
    randomInsetShape: generateInset(),
    randomSidesShape: generateSides(),
    randomColorShape: generateColor(),
  },
  Shape3: {
    randomX: generateX(),
    randomY: generateY(),
    randomRadiusShape: generateRadius(),
    randomInsetShape: generateInset(),
    randomSidesShape: generateSides(),
    randomColorShape: generateColor(),
  },
};

//Shapes preview
drawShape(
  60,
  70,
  radius,
  shapeProperties.Shape1.randomInsetShape,
  shapeProperties.Shape1.randomSidesShape
);
drawShape(
  60,
  190,
  radius,
  shapeProperties.Shape2.randomInsetShape,
  shapeProperties.Shape2.randomSidesShape
);
drawShape(
  60,
  310,
  radius,
  shapeProperties.Shape3.randomInsetShape,
  shapeProperties.Shape3.randomSidesShape
);

//Rotate shape + draw
window.addEventListener('mousemove', e => {
  if (isDrawing) {
    ctx.save();
    ctx.translate(e.x, e.y);

    //First shape
    ctx.rotate(angle);
    ctx.fillStyle = shapeProperties.Shape1.randomColorShape;
    ctx.strokeStyle = shapeProperties.Shape1.randomColorShape;

    drawShape(
      shapeProperties.Shape1.randomX,
      shapeProperties.Shape1.randomY,
      shapeProperties.Shape1.randomRadiusShape,
      shapeProperties.Shape1.randomInsetShape,
      shapeProperties.Shape1.randomSidesShape
    );

    //Second shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = shapeProperties.Shape2.randomColorShape;
    ctx.strokeStyle = shapeProperties.Shape2.randomColorShape;

    drawShape(
      shapeProperties.Shape2.randomX,
      shapeProperties.Shape2.randomY,
      shapeProperties.Shape2.randomRadiusShape,
      shapeProperties.Shape2.randomInsetShape,
      shapeProperties.Shape2.randomSidesShape
    );

    //Third shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = shapeProperties.Shape3.randomColorShape;
    ctx.strokeStyle = shapeProperties.Shape3.randomColorShape;

    drawShape(
      shapeProperties.Shape3.randomX,
      shapeProperties.Shape3.randomY,
      shapeProperties.Shape3.randomRadiusShape,
      shapeProperties.Shape3.randomInsetShape,
      shapeProperties.Shape3.randomSidesShape
    );

    angle += 0.1;
    ctx.restore();
  }
});

//State changes
window.addEventListener('mousedown', () => {
  isDrawing = true;
});

window.addEventListener('mouseup', () => {
  isDrawing = false;
});

//Reset
function resetCanvas() {
  // Reset shape properties
  shapeProperties.Shape1.randomX = generateX();
  shapeProperties.Shape1.randomY = generateY();
  shapeProperties.Shape1.randomRadiusShape = generateRadius();
  shapeProperties.Shape1.randomInsetShape = generateInset();
  shapeProperties.Shape1.randomSidesShape = generateSides();
  shapeProperties.Shape1.randomColorShape = generateColor();

  shapeProperties.Shape2.randomX = generateX();
  shapeProperties.Shape2.randomY = generateY();
  shapeProperties.Shape2.randomRadiusShape = generateRadius();
  shapeProperties.Shape2.randomInsetShape = generateInset();
  shapeProperties.Shape2.randomSidesShape = generateSides();
  shapeProperties.Shape2.randomColorShape = generateColor();

  shapeProperties.Shape3.randomX = generateX();
  shapeProperties.Shape3.randomY = generateY();
  shapeProperties.Shape3.randomRadiusShape = generateRadius();
  shapeProperties.Shape3.randomInsetShape = generateInset();
  shapeProperties.Shape3.randomSidesShape = generateSides();
  shapeProperties.Shape3.randomColorShape = generateColor();

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw preview shapes
  drawShape(
    60,
    70,
    radius,
    shapeProperties.Shape1.randomInsetShape,
    shapeProperties.Shape1.randomSidesShape
  );
  drawShape(
    60,
    190,
    radius,
    shapeProperties.Shape2.randomInsetShape,
    shapeProperties.Shape2.randomSidesShape
  );
  drawShape(
    60,
    310,
    radius,
    shapeProperties.Shape3.randomInsetShape,
    shapeProperties.Shape3.randomSidesShape
  );
}

button.addEventListener('click', () => {
  resetCanvas();
});

window.addEventListener('keydown', e => {
  if (e.key === 'r') {
    resetCanvas();
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
