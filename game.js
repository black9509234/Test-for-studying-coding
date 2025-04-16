const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class Conveyor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.item = null;
  }

  update() {
    if (this.item) {
      this.item.x += 1;
    }
  }

  draw() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(this.x, this.y, 40, 40);

    if (this.item) {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(this.item.x, this.y + 10, 20, 20);
    }
  }
}

class Item {
  constructor(x) {
    this.x = x;
  }
}

const conveyor = new Conveyor(100, 100);
conveyor.item = new Item(100);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  conveyor.update();
  conveyor.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();