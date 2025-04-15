const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 160, y: 160 }];
let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box
};
let direction = "RIGHT";

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  let head = { ...snake[0] };
  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  // Game over
  if (
    head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game);
    alert("게임 오버!");
    return;
  }

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
  } else {
    snake.pop(); // remove tail
  }

  snake.unshift(head); // add new head
}

const game = setInterval(draw, 100);