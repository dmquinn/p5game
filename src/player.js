var x1 = 0;
var x2;

var scrollSpeed = 2;

class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.enemy = new Enemy();
  }

  preload() {
    x2 = windowWidth;
    this.background.image = loadImage("./landscape.png");
    this.player.image = loadImage("./bats-derpy.gif");
    this.enemy.image = loadImage("./mosq.png");
  }
  draw() {
    clear();
    this.background.setup();
    this.background.draw();
    this.player.draw();
    this.enemy.draw();

    // now see if distance between two is less than sum of two radius'
    if (this.player.x === this.enemy.x) {
      console.log("hit");
    }
  }
}

class Background {
  constructor() {
    this.image;
  }
  setup() {
    createCanvas(windowWidth, windowHeight - 16);
  }
  draw() {
    image(this.image, x1, 0, windowWidth, windowHeight);
    image(this.image, x2, 0, windowWidth, windowHeight);

    x1 -= scrollSpeed;
    x2 -= scrollSpeed;

    if (x1 < -windowWidth) {
      x1 = windowWidth;
    }
    if (x2 < -windowWidth) {
      x2 = windowWidth;
    }
  }
}

let direction = "";
const [RIGHT, LEFT] = [1, -1];

class Player {
  constructor() {
    this.lives = 5;
    this.image;
    this.x = 100;
    this.h = 30;
    this.y = 50;
    this.speed = 5.5;
  }

  draw() {
    image(this.image, this.x, this.y, 100, 70);
  }
  moveRight() {
    if (this.x > windowWidth) {
      this.x = 0;
    } else this.x += 50;
  }
  moveLeft() {
    if (this.x < 0) {
      this.x = windowWidth - 20;
    } else this.x -= 50;
  }
  moveUp() {
    if (this.y < 0) {
      this.y = windowHeight - 20;
    }
    this.y -= 50;
  }
  moveDown() {
    if (this.y > windowHeight) {
      this.y = 0;
    } else this.y += 50;
  }
}

class Enemy {
  constructor() {
    this.image;
    this.x = Math.floor(Math.random() * 1000);
    this.h = 30;
    this.y = Math.floor(Math.random() * 800);
    this.speed = 5.5;
  }
  draw() {
    image(this.image, this.x, this.y, 100, 70);
  }
}
