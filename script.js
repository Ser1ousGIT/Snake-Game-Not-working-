// script.js
let gameBoard = document.getElementById("gameBoard");
let startGameBtn = document.getElementById("startGame");
let snake = [{ x: 200, y: 200 }];
let snakeDirection = { x: 20, y: 0 };
let food = { x: 0, y: 0 };
let gameInterval;
const boardSize = 600;

// Start Game
startGameBtn.addEventListener("click", startGame);

function startGame() {
  snake = [{ x: 200, y: 200 }];
  snakeDirection = { x: 20, y: 0 };
  placeFood();
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 200);
}


function gameLoop() {
    updateSnakePosition();
    if (checkCollision()) {
      clearInterval(gameInterval);
      alert("Game Over!");
    } else {
      if (checkFoodCollision()) {
        placeFood();
      } else {
        snake.pop(); // Remove last part if not eating food
      }
      drawGame();
    }
  }
  

  function updateSnakePosition() {
    const head = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
    snake.unshift(head);
  }
  

  function placeFood() {
    food.x = Math.floor(Math.random() * (boardSize / 20)) * 20;
    food.y = Math.floor(Math.random() * (boardSize / 20)) * 20;
  }
  
  function checkFoodCollision() {
    return snake[0].x === food.x && snake[0].y === food.y;
  }
  

  function checkCollision() {
    // Check wall collision
    if (snake[0].x < 0 || snake[0].x >= boardSize || snake[0].y < 0 || snake[0].y >= boardSize) {
      return true;
    }
    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return false;
  }
  

  function drawGame() {
    gameBoard.innerHTML = ""; // Clear the board
    snake.forEach(segment => {
      const snakeElement = document.createElement("div");
      snakeElement.style.left = `${segment.x}px`;
      snakeElement.style.top = `${segment.y}px`;
      snakeElement.classList.add("snake");
      gameBoard.appendChild(snakeElement);
    });
    const foodElement = document.createElement("div");
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
  }

  
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -20 };
        break;
      case "ArrowDown":
        if (snakeDirection.y === 0) snakeDirection = { x: 0, y: 20 };
        break;
      case "ArrowLeft":
        if (snakeDirection.x === 0) snakeDirection = { x: -20, y: 0 };
        break;
      case "ArrowRight":
        if (snakeDirection.x === 0) snakeDirection = { x: 20, y: 0 };
        break;
    }
  });


  let score = 0;


function checkFoodCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
    return true;
  }
  return false;
}


function checkCollision() {
  // Check wall collision
  if (snake[0].x < 0 || snake[0].x >= boardSize || snake[0].y < 0 || snake[0].y >= boardSize) {
    endGame();
    return true;
  }
  // Check self-collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      endGame();
      return true;
    }
  }
  return false;
}


function endGame() {
  clearInterval(gameInterval); // Stop the game loop
  alert("Game Over!");
  score = 0; // Reset the score
  document.getElementById("score").textContent = `Score: ${score}`; // Update the displayed score
}
