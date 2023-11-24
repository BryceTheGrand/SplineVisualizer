let t = 0;
let splinePoints = [];
let points;
let visualizationDepth = 10;
let speed = 0.001

function setup() {
  createCanvas(600, 600);
  points = [
    createVector(width/3, 0),
    createVector(50, -100),
    createVector(width/2, -275),
    createVector(width-50, -100),
    createVector(3*width/4, 0),
    createVector(width/2, 50),
    createVector(width/3, 100),
    createVector(width/4, 200),
    createVector(width/2, 275)
  ];
  colorMode(HSB);
}

function lrp(a, b, t) {
  return createVector((1-t)*a.x + t*b.x, (1-t)*a.y + t*b.y);
}

function drawLines() {
  fill(255);
  for (let i = 0; i < points.length-1; i++) {
    line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    circle(points[i+1].x, points[i+1].y, 5);
  }
  circle(points[0].x, points[0].y, 5);
}

function interpAll(ps) {
  let interped = [];
  for (let i = 0; i < ps.length - 1; i++) {
    interped.push(lrp(ps[i], ps[i+1], t%1));
  }
  return interped;
}

function draw() {
  background(15);
  translate(0, height/2);
  stroke(255);
  let p1 = createVector(0, 0);
  let p2 = createVector(width/2, 0);
  let p3 = createVector(width, 100);
  drawLines();
  let interped = points;
  let n = points.length;
  while (n > 1) {
    interped = interpAll(interped);
    stroke(255 * (n - 2) / points.length, 50, 100);
    fill(255 * (n - 2) / points.length, 50, 100);
    if (n > points.length - visualizationDepth - 1) {
      for (let i = 0; i < interped.length - 1; i++) {
        line(interped[i].x, interped[i].y, interped[i+1].x, interped[i+1].y);
      }
      for (let p of interped) {
        circle(p.x, p.y, 5);
      }
    }
    n = interped.length;
  }
  splinePoints.push(interped[0]);
  noFill();
  beginShape()
  for (let p of splinePoints) {
    vertex(p.x, p.y);
  }
  endShape();
  t += speed;
  if (t > 1) {
    t = 0;
    splinePoints = [];
  }
}