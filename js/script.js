const buttons = Array.from(document.querySelectorAll("button"));

// const button1 = document.getElementById("button1");
// const button2 = document.getElementById("button2");
// const button3 = document.getElementById("button3");
// const button4 = document.getElementById("button4");
// const button5 = document.getElementById("button5");
// const button6 = document.getElementById("button6");
// const button7 = document.getElementById("button7");
// const button8 = document.getElementById("button8");
let winner = false;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameBoard() {
  let board = [];

  const placeMarker = (position, marker) => {
    if (board[position] == null) {
      board[position] = marker;
      console.log(marker + " Added to the board.");
      console.log(board);
      checkWin();
      return true;
    } else {
      console.error("Couldn't add to the board.");
      return false;
    }
  };

  const checkWin = () => {
    let winningMarker = ["X", "O"];
    if (!winner) {
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
            return marker;
          }
        }
      }
      checkDraw();
    }
  };

  const checkDraw = () => {
    if (!board.includes(null) && !winner) {
      return "DRAW";
    } else {
      return console.log("Keep Playing");
    }
  };

  const resetBoard = () => {
    board = Array(9).fill(null);
    console.warn("Board has been reset.");
    console.log(board);
  };

  return { board, placeMarker, checkWin, resetBoard };
}

const gameManager = () => {
  let playerChoice;
  const GameBoard = gameBoard();

  let players = {
    player: true,
    bot: false,
  };

  function playerTurn() {
    console.log("Did anyone win: " + winner);

    if (!winner) {
      const handleClick = (event) => {
        const playerChoice = parseInt(
          event.target.id.replace("button", ""),
          10
        );

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

      buttons.forEach((button) =>
        button.addEventListener("click", handleClick)
      );
    }
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
    if (!winner) {
      if (players.player == true) {
        playerTurn();
      } else if (players.bot == true) {
        botTurn();
      }
    }
  }

  function startGame() {
    GameBoard.resetBoard();
    turnManager();
  }

  return { playerTurn, botTurn, turnManager, startGame };
};

function ScreenController() {}
gameManager().startGame();
