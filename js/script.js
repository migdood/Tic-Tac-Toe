function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameBoard() {
  let board = [];
  let Winner = false;

  const placeMarker = (position, marker) => {
    if (board[position] == null) {
      board[position] = marker;
      console.log("Added to the board.");
      console.log(board);
      checkWin();
      return true;
    } else {
      console.log("Couldn't add to the board.");
      return false;
    }
  };

  const checkWin = () => {
    let winningMarker = ["X", "O"];
    if (Winner == false) {
      for (let i = 0; i < winningMarker.length; i++) {
        if (
          board[0] == winningMarker[i] &&
          board[1] == winningMarker[i] &&
          board[2] == winningMarker[i]
        ) {
          console.log(winningMarker[i] + " is the winner.");
          Winner = true;
          return i;
        } else if (
          board[3] == winningMarker[i] &&
          board[4] == winningMarker[i] &&
          board[5] == winningMarker[i]
        ) {
          console.log(winningMarker[i] + " is the winner.");
          Winner = true;
          return i;
        } else if (
          board[6] == winningMarker[i] &&
          board[7] == winningMarker[i] &&
          board[8] == winningMarker[i]
        ) {
          console.log(winningMarker[i] + " is the winner.");
          Winner = true;
          return i;
        } else if (
          board[0] == winningMarker[i] &&
          board[3] == winningMarker[i] &&
          board[6] == winningMarker[i]
        ) {
          console.log(winningMarker[i] + " is the winner.");
          Winner = true;
          return i;
        } else if (
          board[1] == winningMarker[i] &&
          board[4] == winningMarker[i] &&
          board[7] == winningMarker[i]
        ) {
          console.log(winningMarker[i] + " is the winner.");
          Winner = true;
          return i;
        } else if (
          board[2] == winningMarker[i] &&
          board[5] == winningMarker[i] &&
          board[8] == winningMarker[i]
        ) {
          console.log(winningMarker[i] + " is the winner.");
          Winner = true;
          return i;
        } else if (
          board[0] == winningMarker[i] &&
          board[4] == winningMarker[i] &&
          board[8] == winningMarker[i]
        ) {
          console.log(winningMarker[i] + " is the winner.");
          Winner = true;
          return i;
        } else if (
          board[2] == winningMarker[i] &&
          board[4] == winningMarker[i] &&
          board[6] == winningMarker[i]
        ) {
          console.log(winningMarker[i] + " is the winner.");
          Winner = true;
          return i;
        } else {
          checkDraw();
        }
      }
    }
  };

  const checkDraw = () => {
    if (!board.includes(null) && Winner != true) {
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
  resetBoard();

  return { board, placeMarker, checkWin, resetBoard };
}

function Player(name, marker) {
  this.Name = name;
  this.Marker = marker;
}

const gameManager = () => {
  const GameBoard = gameBoard();
  let players = {
    player: true,
    bot: false,
  };

  function playerTurn() {
    if (GameBoard.Winner != true) {
      let playerChoice = prompt("Where do you want to place your Marker?");
      if (playerChoice === "reset") {
        let confirmation = prompt("Are you sure you wish to RESET?", "y");
        if (confirmation == "yes" || confirmation == "y") {
          GameBoard.resetBoard();
        }
      } else {
        GameBoard.placeMarker(playerChoice, "X");
        players.player = false;
        players.bot = true;
        turnManager();
      }
    }
  }

  function botTurn() {
    GameBoard.placeMarker(getRandomInt(0, 8), "O");
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
