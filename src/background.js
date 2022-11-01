class Bar {
  constructor(x, y, l) {
    this.x = x - l / 2;
    this.h = 30;
    this.y = y;
    this.l = l;
    this.speed = 5.5;
  }

  show() {
    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x + this.l >= width) {
      this.x = width - this.l;
    }
    fill("#FFAA00");
    rect(this.x, this.y, this.l, this.h, 10);
  }

  move(dir) {
    this.x += dir * this.speed;
  }
}

class Ball {
  constructor(x, y, r, g) {
    this.pos = createVector(x, y);
    this.d = r;
    this.r = r / 2;
    this.v = p5.Vector.random2D();
    this.go = g;
  }

  update(bar) {
    if (!(bar instanceof Bar) || this.go == false) {
      return false;
    }

    this.v.setMag(6);
    this.pos.add(this.v);
    let x = this.pos.x;
    let y = this.pos.y;
    if (x - this.r <= 0 || x + this.r >= width) {
      this.v.x *= -1;
    }
    if (y - this.r <= 0) {
      this.v.y *= -1;
    }
    if (y + this.r >= height) {
      this.go = false;
      this.v.setMag(0);
    }

    if (y + this.r >= bar.y && x >= bar.x && x <= bar.x + bar.l) {
      this.v.y *= -1;
    }
  }

  show() {
    fill("#FF0A13");
    circle(this.pos.x, this.pos.y, this.d);
  }
}

class Brik {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.h = 30;
    this.l = 100;
    this.state = 2;
  }

  show() {
    if (this.state >= 0) {
      fill(col[this.state]);
      rect(this.x, this.y, this.l, this.h);
    }
  }

  updateState() {
    this.state--;
    return this.state < 0;
  }
}

const col = ["#E22D2D", "#FAA300", "#9BC53D"];

let bar;
let ball;
let briks = [];
const nBriks = 1;
let direction = "";
const [RIGHT, LEFT] = [1, -1];

function setup() {
  createCanvas(700, 600);

  init(false);
}

function draw() {
  background(0);

  console.log(briks.length);
  for (let b = briks.length - 1; b >= 0; b--) {
    let brik = briks[b];
    if (
      ball.pos.x > brik.x &&
      ball.pos.x < brik.x + brik.l &&
      ball.pos.y + ball.r > brik.y &&
      ball.pos.y - ball.r < brik.y + brik.h
    ) {
      if (brik.state >= 0) {
        ball.v.y *= -1;
        if (brik.updateState()) {
          briks.slice(b, 1);
        }
      }
    }

    brik.show();
  }

  // Update ball
  ball.update(bar);

  // Checking key for controlling bar
  barControl();

  // Showing elements
  bar.show();
  ball.show();
}

// init takes 1 parameter g; if g is true, the ball moves; if g is false ball stay still
function init(g) {
  briks = [];
  bar = new Bar(width / 2, height - 60, 150);
  ball = new Ball(width / 2, height / 2, 30, g);

  let space1 = (width - 500) / 6;
  let space2 = (width - 300) / 4;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 5; j++) {
      briks.push(new Brik(j * (100 + space1) + space1, 50 * (i + 1)));
    }
  }

  for (let j = 0; j < 3; j++) {
    briks.push(new Brik(j * (100 + space2) + space2, 150));
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    direction = "left";
  } else if (keyCode === RIGHT_ARROW) {
    direction = "right";
  }
  if (keyCode === 32) {
    init(true);
  }
}

function barControl() {
  // Script for smooth bar control
  if (direction === "left") {
    bar.move(LEFT);
  } else if (direction === "right") {
    bar.move(RIGHT);
  }

  if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
    direction = "";
  }
}
