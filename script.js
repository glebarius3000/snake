const playboard = document.querySelector(".play-board");
const scoreEl = document.querySelector(".score");
const recordEl = document.querySelector(".record");
const controls = document.querySelectorAll(".controls i");
let snakeX = 5;
let snakeY = 5;
let velocityX = 0;
let velocityY = 0;
let foodX;
let foodY;
let snakeBody = [];
let setIntervalId;
let gameOver = false;
let snakeColor;
let foodColor;
let score = 0;
let record = localStorage.getItem("record");
recordEl.textContent = record;
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let index = 0; index < 6; index++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const handleGameover = () => {
  clearInterval(setIntervalId);
  alert("game over");
  location.reload();
};
const changeDirections = (event) => {
  if (event.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (event.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (event.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (event.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  }
};
controls.forEach((button) =>
  button.addEventListener("click", () =>
    changeDirections({ key: button.dataset.key })
  )
);
const foodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};
const initGame = () => {
  if (gameOver) return handleGameover();
  let html = `<i class="food fa-solid fa-apple-whole" style="color: ${foodColor};grid-area:${foodY}/${foodX}"></i>`;
  if (snakeX === foodX && snakeY === foodY) {
    foodPosition();
    snakeBody.push([foodY, foodX]);
    score++;
    record = score >= record ? score : record;
    localStorage.setItem("record", record);
    scoreEl.textContent = score;
    recordEl.textContent = record;
  }
  snakeX += velocityX;
  snakeY += velocityY;
  for (let index = snakeBody.length - 1; index > 0; index--) {
    snakeBody[index] = snakeBody[index - 1];
  }
  snakeBody[0] = [snakeX, snakeY];
  if (snakeX <= 0 || snakeY <= 0 || snakeX > 30 || snakeY > 30) {
    return (gameOver = true);
  }
  for (let index = 0; index < snakeBody.length; index++) {
    html += `<div class="head" style="background-color: ${snakeColor};grid-area:${snakeBody[index][1]}/${snakeBody[index][0]}"></div>`;
    if (
      index !== 0 &&
      snakeBody[0][1] === snakeBody[index][1] &&
      snakeBody[0][0] === snakeBody[index][0]
    ) {
      gameOver = true;
    }
  }

  playboard.innerHTML = html;
};
const newGame = () => {
  snakeColor = getRandomColor();
  foodColor = getRandomColor();
  foodPosition();
  setIntervalId = setInterval(initGame, 100);
};
document.addEventListener("keydown", changeDirections);
newGame();
