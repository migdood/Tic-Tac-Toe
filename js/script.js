const GameBoard = () => {
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

  return { board, placeMarker, checkWin, resetBoard };
};

const Player = (name, marker) => {
  return { name, marker };
};
GameBoard.placeMarker
console.log(GameBoard.board)
const GameManager = {};
