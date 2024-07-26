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

//*  x, y - coordinates of the center of the shape
//*  Radius - outer radius

//*  Inset - proportion between outer and inner radius. Controls the spiky look of the shape.
//*  Result of multiplication(radius * inset) is in pixels.
//*  If value of inset is close to 1 - result is more circle-like shape(polygon).
//*  If value of inset is close to 0 - results in more star-like shape.
//*  Combo of high inset(1+) and high number of sides(8+) can lead to shape distortion.
//*  Value between 0.3 and 0.7 gives the best results.

//*  n - number of sides, if value is close to 1 - shape looks like a line.

function drawShape(x, y, radius, inset, n) {
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - radius); //start coordinates

  //* Every time this loop runs, we draw first line from the center to the inner radius,
  //* then rotate the canvas by half of the circle(Math.PI) and draw the second line from the center to the outer radius.
  //* We use Math.PI(half circle) instead of Math.PI * 2(full circle) because this loop creates 2 segments every time it runs.
  for (let i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n); // rotate half circle(180 deg / 3.14 rad) by n
    ctx.lineTo(0, 0 - radius * inset); // first drawn segment, outer radius
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - radius); // second drawn segment, inner radius
  }

  ctx.restore();
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

// Generate random values for shape properties
const generateRadius = () => Math.random() * 100;
const generateInset = () => Math.random();
const generateSides = () => Math.floor(Math.random() * 10) + 3;
const generateColor = () => `rgba(
${Math.floor(Math.random() * 256)},
${Math.floor(Math.random() * 256)},
${Math.floor(Math.random() * 256)}, 
${(Math.random() * (1 - 0.1) + 0.1).toFixed(1)})`;
const generateX = () => Math.random() * 50;
const generateY = () => Math.random() * 50;

const shapeProperties = {
  Shape1: {
    randomX: generateX(),
    randomY: generateY(),
    randomRadius: generateRadius(),
    randomInset: generateInset(),
    randomSides: generateSides(),
    randomColor: generateColor(),
  },
  Shape2: {
    randomX: generateX(),
    randomY: generateY(),
    randomRadius: generateRadius(),
    randomInset: generateInset(),
    randomSides: generateSides(),
    randomColor: generateColor(),
  },
  Shape3: {
    randomX: generateX(),
    randomY: generateY(),
    randomRadius: generateRadius(),
    randomInset: generateInset(),
    randomSides: generateSides(),
    randomColor: generateColor(),
  },
};

// Shapes preview
drawShape(
  60,
  70,
  radius,
  shapeProperties.Shape1.randomInset,
  shapeProperties.Shape1.randomSides
);
drawShape(
  60,
  190,
  radius,
  shapeProperties.Shape2.randomInset,
  shapeProperties.Shape2.randomSides
);
drawShape(
  60,
  310,
  radius,
  shapeProperties.Shape3.randomInset,
  shapeProperties.Shape3.randomSides
);

// Rotate shape + draw
window.addEventListener('mousemove', e => {
  if (isDrawing) {
    ctx.save();
    ctx.translate(e.x, e.y);

    // First shape
    ctx.rotate(angle);
    ctx.fillStyle = shapeProperties.Shape1.randomColor;
    ctx.strokeStyle = shapeProperties.Shape1.randomColor;

    drawShape(
      shapeProperties.Shape1.randomX,
      shapeProperties.Shape1.randomY,
      shapeProperties.Shape1.randomRadius,
      shapeProperties.Shape1.randomInset,
      shapeProperties.Shape1.randomSides
    );

    // Second shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = shapeProperties.Shape2.randomColor;
    ctx.strokeStyle = shapeProperties.Shape2.randomColor;

    drawShape(
      shapeProperties.Shape2.randomX,
      shapeProperties.Shape2.randomY,
      shapeProperties.Shape2.randomRadius,
      shapeProperties.Shape2.randomInset,
      shapeProperties.Shape2.randomSides
    );

    // Third shape
    ctx.rotate(-angle * 3);
    ctx.fillStyle = shapeProperties.Shape3.randomColor;
    ctx.strokeStyle = shapeProperties.Shape3.randomColor;

    drawShape(
      shapeProperties.Shape3.randomX,
      shapeProperties.Shape3.randomY,
      shapeProperties.Shape3.randomRadius,
      shapeProperties.Shape3.randomInset,
      shapeProperties.Shape3.randomSides
    );

    angle += 0.1;
    ctx.restore();
  }
});

// State changes
window.addEventListener('mousedown', () => {
  isDrawing = true;
});

window.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Reset
function resetCanvas() {
  // Reset shape properties
  shapeProperties.Shape1.randomX = generateX();
  shapeProperties.Shape1.randomY = generateY();
  shapeProperties.Shape1.randomRadius = generateRadius();
  shapeProperties.Shape1.randomInset = generateInset();
  shapeProperties.Shape1.randomSides = generateSides();
  shapeProperties.Shape1.randomColor = generateColor();

  shapeProperties.Shape2.randomX = generateX();
  shapeProperties.Shape2.randomY = generateY();
  shapeProperties.Shape2.randomRadius = generateRadius();
  shapeProperties.Shape2.randomInset = generateInset();
  shapeProperties.Shape2.randomSides = generateSides();
  shapeProperties.Shape2.randomColor = generateColor();

  shapeProperties.Shape3.randomX = generateX();
  shapeProperties.Shape3.randomY = generateY();
  shapeProperties.Shape3.randomRadius = generateRadius();
  shapeProperties.Shape3.randomInset = generateInset();
  shapeProperties.Shape3.randomSides = generateSides();
  shapeProperties.Shape3.randomColor = generateColor();

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw preview shapes
  drawShape(
    60,
    70,
    radius,
    shapeProperties.Shape1.randomInset,
    shapeProperties.Shape1.randomSides
  );
  drawShape(
    60,
    190,
    radius,
    shapeProperties.Shape2.randomInset,
    shapeProperties.Shape2.randomSides
  );
  drawShape(
    60,
    310,
    radius,
    shapeProperties.Shape3.randomInset,
    shapeProperties.Shape3.randomSides
  );
}

button.addEventListener('click', () => {
  resetCanvas();
});

// Hotkey for reset
window.addEventListener('keydown', e => {
  if (e.key === 'r' || e.key === 'к') {
    resetCanvas();
  }
});

// Block drawing over button, change color
button.addEventListener('mouseover', () => {
  button.style.backgroundColor = 'rgb(204, 219, 209)';
  isDrawing = false;
});
button.addEventListener('mouseout', () => {
  button.style.backgroundColor = 'white';
});
