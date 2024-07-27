const txtField = document.getElementById("textField");
const btnSubmit = document.getElementById("btnSubmit");
let winner = false;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Player(name, marker) {
  this.Name = name;
  this.Marker = marker;
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
    console.log("Did anyone win: " + GameBoard.winner);

    if (!GameBoard.winner) {
      return new Promise((resolve, reject) => {
        const handleClick = () => {
          playerChoice = txtField.value;
          txtField.value = "";

          btnSubmit.removeEventListener("click", handleClick);
          if (playerChoice === "reset") {
            let confirmation = prompt("Are you sure you wish to RESET?", "y");

            if (confirmation == "yes" || confirmation == "y") {
              GameBoard.resetBoard();
              reject();
            }
          } else {
            if (GameBoard.placeMarker(playerChoice, "X")) {
              players.player = false;
              players.bot = true;
              resolve();
            } else {
              reject("Invalid Move");
              playerTurn();
            }
          }
        };
        btnSubmit.addEventListener("click", handleClick);
      })
        .then(turnManager)
        .catch(console.error);
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

gameManager().startGame();
