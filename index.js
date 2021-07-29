const width = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
let squares = [];
let score = 0;

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];


function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement("div");
    //put sqaure in grid
    grid.appendChild(square);
    //put square in squares array
    squares.push(square);

    if (layout[i] === 0) {
      squares[i].classList.add("pac-dot");
    } else if (layout[i] === 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] === 2) {
      squares[i].classList.add("ghost-lair");
    } else if (layout[i] === 3) {
      squares[i].classList.add("power-pallet");
    }
  }
}
createBoard();

//starting position of packman
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add("pacman");

function control(e) {

  squares[pacmanCurrentIndex].classList.remove("pacman");
  switch (e.keyCode) {
    case 40:
      console.log("down");
      if (
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        pacmanCurrentIndex + width < width * width &&
        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex += width;
      break;
    case 38:
      console.log("up");
      if (
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        pacmanCurrentIndex - width >= 0 &&
        !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex -= width;
      break;
    case 37:
      console.log("left");
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        pacmanCurrentIndex % width !== 0 &&
        !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex -= 1;
      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391;
      }
      break;
    case 39:
      console.log("right");
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        pacmanCurrentIndex % width < width - 1 &&
        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex += 1;
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364;
      }
      break;
  }
  squares[pacmanCurrentIndex].classList.add("pacman");
  pacDoEaten();
  powerPalleteEaten();
  checkForWin();
  checkForGameOver();
}
document.addEventListener("keyup", control);

function pacDoEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
    score++;
    scoreDisplay.innerHTML = score;
  }
}
function powerPalleteEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("power-pallet")) {
    squares[pacmanCurrentIndex].classList.remove("power-pallet");
    score += 10;
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unscareGhosts, 10000);
  }
}

function unscareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}
const ghosts = [
  new Ghost("blinky", 348, 250),
  new Ghost("inky", 376, 400),
  new Ghost("pinky", 351, 300),
  new Ghost("clyde", 379, 500),
];

ghosts.forEach((ghost) => {
  squares[ghost.currentIndex].classList.add(ghost.className);
  squares[ghost.currentIndex].classList.add("ghost");
});
ghosts.forEach((ghost) => moveGhost(ghost));

function moveGhost(ghost) {
  console.log("moved ghost");
  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];
  console.log(direction);

  ghost.timerId = setInterval(function () {
    if (
      !squares[ghost.currentIndex + direction].classList.contains("wall") &&
      !squares[ghost.currentIndex + direction].classList.contains("ghost")
    ) {
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(ghost.className);
      squares[ghost.currentIndex].classList.add("ghost");
    } else direction = directions[Math.floor(Math.random() * directions.length)];

    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }

    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains("pacman")
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );

      ghost.currentIndex = ghost.startIndex;
      score += 100;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    }
    checkForGameOver();
  }, ghost.speed);
}

function checkForGameOver() {
  if (
    squares[pacmanCurrentIndex].classList.contains("ghost") &&
    !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", control);
    scoreDisplay.innerHTML = "Game Over";
  }
}
function checkForWin() {
  if (score === 274) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", control);
    scoreDisplay.innerHTML = "You Won!";
  }
}
