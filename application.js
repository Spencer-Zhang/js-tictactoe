var gameStarted
var currentPlayer
var board



function resetGame() {
  board = Array(9);
  gameStarted = true;
  currentPlayer = "O";
}

function clickBox(boxIndex) {
  if(board[boxIndex] == undefined) {
    board[boxIndex] = currentPlayer
    nextPlayer();
  }
}

function nextPlayer() {
  if(currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function printBoard() {
  for(i in board){
    if(board[i] != undefined) {
      $("#b" + i).text(board[i])
    }
  }
}



$(function() {
  resetGame();

  $('.box').click(function() {
    boxIndex = parseInt($(this).attr('id')[1]);
    clickBox(boxIndex);
    printBoard();
  })
})