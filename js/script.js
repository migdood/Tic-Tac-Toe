function GameBoard() {
  const board = Array(9).fill(null);

  const placeMarker = (position, marker) => {
    if (board[position] === null) {
      board[position] = marker;
      return true;
    } else {
      return false;
    }
  };

  const checkWin = () => {
    // Win logic here
  };

  const resetBoard = () => {
    board = Array(9).fill(null);
  };

  //return { board, placeMarker, checkWin, resetBoard };
}

function Player(name, marker) {
  this.Name = name;
  this.Marker = marker;
}
let Migdood = new Player("Migdood", "X");
GameBoard();
console.log(GameManager.board);

const GameManager = {};
