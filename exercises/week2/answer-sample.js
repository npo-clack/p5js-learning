function setup() {
  createCanvas(400, 400);
  // noLoop();
}

function draw() {
  background("#E0F4FF");

  fill("#FFEED9");
  rect(130, 100, 140, 200);
  rect(80, 90, 50, 100);
  rect(270, 90, 50, 100);

  fill("#B0926A");
  noStroke();
  circle(200, 300, 50);

  fill("#4F4A45");
  noStroke();
  circle(150, 150, 40);
  circle(250, 150, 40);
}
