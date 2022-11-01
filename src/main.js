const game = new Game();
function preload() {
  game.preload();
}
function draw() {
  game.draw();
}
function keyPressed() {
  if (keyCode === 39) {
    game.player.moveRight();
  }

  if (keyCode === 37) {
    game.player.moveLeft();
  }

  if (keyCode === 38) {
    game.player.moveUp();
  }

  if (keyCode === 40) {
    game.player.moveDown();
  }
}
