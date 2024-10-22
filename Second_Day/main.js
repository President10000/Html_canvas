let canvas = document.querySelector("canvas");
if (!canvas) {
  console.error("Canvas element not found");
}
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// for the sqaure
// ctx.fillStyle = "green";
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = "blue";
// ctx.fillRect(150, 150, 100, 100);
// ctx.fillStyle = "aqua";
// ctx.fillRect(200, 200, 100, 100);

// ctx.stroke();

// line start here

// ctx.beginPath();
// ctx.moveTo(50, 400);
// ctx.lineTo(349, 100);
// ctx.lineTo(449, 400);
// ctx.strokeStyle = "#fa34a3";

// ctx.stroke();

//Circle starts here
// ctx.beginPath();
// ctx.arc(300, 300, 30, 6.2831853, false);
// ctx.strokeStyle = "blue";

// console.log(Math.PI * 2);

// ctx.stroke();

// for randon color generation

function randomcolor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// second color option
// function randomcolor() {
//   let letters = ["#662400", "#B33F00", "#FF6B1A", "#006663", "#00B4AD"];
//   let color;

//   color = letters[Math.floor(Math.random() * 6)];

//   return color;
// }

// // for making circles
// for (let i = 0; i < 100; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;

//   ctx.beginPath();
//   ctx.arc(x, y, 30, 6.2831853, false);
//   ctx.strokeStyle = randomcolor();

//   ctx.stroke();
// }

// make a object for the multiple circle

// let x = Math.random() * window.innerWidth;
// let y = Math.random() * window.innerHeight;
// let dx = (Math.random() - 0.5) * 8;
// let dy = (Math.random() - 0.5) * 8;
// let radius = 30;
let mouse = {
  x: undefined,
  y: undefined,
};
let maxRadius = 40;
let minRadius = 2;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  console.log(mouse);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// this is the object for the individual circle
function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = minRadius;
  this.color = color;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.stroke();
  };

  this.update = function () {
    // then increment x by one
    if (this.x + radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + radius > innerHeight || this.y - radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y < -30
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}
function drawLinesBetweenCircles(circleArray) {
  for (let i = 0; i < circleArray.length; i++) {
    for (let j = i + 1; j < circleArray.length; j++) {
      ctx.beginPath();
      ctx.moveTo(circleArray[i].x, circleArray[i].y);
      ctx.lineTo(circleArray[j].x, circleArray[j].y);

      ctx.strokeStyle = circleArray[i].color;
      ctx.stroke();
    }
  }
}

// calling object in the loop
circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < 5; i++) {
    let color = randomcolor();
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;
    circleArray.push(new Circle(x, y, dx, dy, radius, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  // clearing canvas
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  drawLinesBetweenCircles(circleArray);
}

init();

animate();
