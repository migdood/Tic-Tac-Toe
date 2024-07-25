const txtField = document.getElementById("textField");
const btnSubmit = document.getElementById("btnSubmit");

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
  let winner = false;

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
        for (const pattern of winPattern) {
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
    console.log("Board has been reset.");
    console.log(board);
  };

  return { board, placeMarker, checkWin, resetBoard, winner };
}

const gameManager = () => {
  const GameBoard = gameBoard();

  let players = {
    player: true,
    bot: false,
  };

  function playerTurn() {
    console.log("Did anyone win: " + GameBoard.winner);

    if (!GameBoard.winner) {
      let playerChoice = txtField.value;
      return new Promise((resolve, reject) => {
        btnSubmit.addEventListener("click", () => {
          playerChoice = txtField.value;
          txtField.value = "";
          if (playerChoice === "reset") {
            let confirmation = prompt("Are you sure you wish to RESET?", "y");

            if (confirmation == "yes" || confirmation == "y") {
              resolve(GameBoard.resetBoard());
            }
          } else {
            "click",
              resolve(
                GameBoard.placeMarker(playerChoice, "X"),
                (players.player = false),
                (players.bot = true),
                turnManager()
              );
          }
        });
      });
    }
  }

  function botTurn() {
    let playBotTurn = GameBoard.placeMarker(getRandomInt(0, 8), "O");

    if (playBotTurn == false) {
      console.error("Playing again since picked a full place last time.");
      playBotTurn;
    }
    players.bot = false;
    players.player = true;
    turnManager();
  }

  function turnManager() {
    if (players.player == true) {
      playerTurn();
    } else if (players.bot == true) {
      botTurn();
    }
  }

  function startGame() {
    GameBoard.resetBoard();
    turnManager();
  }

  return { playerTurn, botTurn, turnManager, startGame };
};

gameManager().startGame();
// gameBoard.placeMarker(0, "X");
// gameManager.botTurn();
// gameBoard.placeMarker(1, "X");
// gameBoard.placeMarker(2, "O");
// gameBoard.placeMarker(3, "X");
// gameBoard.placeMarker(4, "O");
// gameBoard.placeMarker(5, "X");
// gameBoard.placeMarker(6, "O");
// gameBoard.placeMarker(7, "O");
