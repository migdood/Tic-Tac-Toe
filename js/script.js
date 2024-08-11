// ===================
// Variabls
// ===================
const overlay = document.getElementById("overlay");
const playButton = document.getElementById("play-btn");
const overlayHeader = document.getElementById("overlay-header");
const buttons = Array.from(document.querySelectorAll("button"));
const footerPicture = document.getElementById("footerPicture");
let winner = false;
let draw = false;
// ===================
// GameBoard Logic
// ===================
function gameBoard() {
  let board = [];

  const placeMarker = (position, marker) => {
    if (board[position] != null) {
      console.error("Couldn't add to the board.");
      return false;
    } else {
      board[position] = marker;
      console.log(marker + " Added to the board.");
      console.log(board);
      screenWriter();
      checkWin();
      return true;
    }
  };

  const checkWin = () => {
    let winningMarker = ["X", "O"];
    const winPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let marker of winningMarker) {
      for (let pattern of winPattern) {
        if (pattern.every((item) => board[item] == marker)) {
          console.log("The winner is: " + marker);
          winner = true;
          winnerOverlay(marker);
          return marker;
        }
      }
    }
    checkDraw();
  };

  const checkDraw = () => {
    if (!board.includes(null) && !winner) {
      console.log("It's a draw.");
      winnerOverlay();
      return (draw = true);
    } else {
      return console.log("Keep Playing");
    }
  };

  const resetBoard = () => {
    board = Array(9).fill(null);
    winner = false;
    draw = false;
    buttons.forEach((button) => (button.innerText = ""));
    console.warn("Board has been reset.");
    console.log(board);
  };

  function screenWriter() {
    for (let i = 0; i < board.length; i++) {
      // If statement to display null values as empty strings
      buttons[i].innerText = board[i] !== null ? board[i] : "";
    }
  }

  return { board, placeMarker, checkWin, resetBoard, screenWriter };
}
// ===================
// GameManager
// ===================
const gameManager = () => {
  const GameBoard = gameBoard();

  let players = {
    player: true,
    bot: false,
  };

  function playerTurn() {
    console.log("Did anyone win: " + winner);

    const handleClick = (event) => {
      const playerChoice = parseInt(event.target.id.replace("button", ""), 10);

      if (GameBoard.placeMarker(playerChoice, "X")) {
        players.player = false;
        players.bot = true;
        buttons.forEach((button) =>
          button.removeEventListener("click", handleClick)
        );
        turnManager();
      } else {
        console.error("Invalid Move");
      }
    };

    buttons.forEach((button) => button.addEventListener("click", handleClick));
  }

  function botTurn() {
    let botPlayed = false;

    while (!botPlayed) {
      let randomPosition = getRandomInt(0, 8);
      botPlayed = GameBoard.placeMarker(randomPosition, "O");

      if (!botPlayed) {
        console.error(
          "Position " + randomPosition + " is already taken. Trying again."
        );
      }
    }

    players.bot = false;
    players.player = true;
    turnManager();
  }

  function turnManager() {
    if (winner || draw) {
      return;
    }

    if (players.player) {
      playerTurn();
    } else if (players.bot) {
      botTurn();
    }
  }

  function startGame() {
    GameBoard.resetBoard();
    turnManager();
  }

  return { playerTurn, botTurn, turnManager, startGame };
};
// ===================
// Functions
// ===================
function removeOverlay() {
  overlay.style.transform = "translateY(-100%)";
  setTimeout(() => {
    gameManager().startGame();
    playButton.removeEventListener("click", removeOverlay);
  }, 100);
}

function winnerOverlay(marker = "default") {
  overlay.style.transform = "translateY(0%)";
  playButton.innerText = "Play Again";
  playButton.addEventListener("click", removeOverlay);
  if (marker == "X") {
    overlayHeader.innerText = `${marker} is the winner!!! \n You ROCK!!!`;
  } else if (marker == "O") {
    overlayHeader.innerText = `${marker} is the winner!!! \n You STINK!!!`;
  } else {
    overlayHeader.innerText = `It's a boring ol' draw...`;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// ===================
// EventListeners
// ===================
playButton.addEventListener("click", removeOverlay);

document.addEventListener("DOMContentLoaded", () => gameManager().startGame());

footerPicture.addEventListener("mouseenter", () => {
  footerPicture.animate({ transform: ["rotate(0deg)", "rotate(360deg)"] }, 550);
});
