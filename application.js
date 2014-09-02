var gameStarted
var currentPlayer
var board

var PATHS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];



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

function checkVictoryConditions() {
  var index, numO, numX, path, j, box
  for(index in PATHS) {
    numO = 0;
    numX = 0;
    path = PATHS[index];
    valueChange = 0;

    for(j in path) {
      box = path[j];
      if(board[box] == "O") {
        numO += 1;
      }
      if(board[box] == "X") {
        numX += 1;
      }
    }

    if(numO == 3 || numX == 3) {
      gameStarted = false;

    }

  }
}

function nextPlayer() {
  checkVictoryConditions()
  if(currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function printBoard() {
  var i
  for(i=0; i<9; i++){
    if(board[i] != undefined) {
      $("#b" + i).text(board[i])
    } else {
      $("#b" + i).text('')
    }
  }
}


function computerMove() {
  // The Computer calculates the value of each position on the board.
  // The center of the board is worth the most, and corners are worth more than sides.
  var numO, numX, valueChange, boxIndex, index
  var valueArray = [5, 0, 5, 0, 10, 0, 5, 0, 5];

  // The computer checks each row, column, and diagonal

  for(index in PATHS) {
    numO = 0;
    numX = 0;
    path = PATHS[index];
    valueChange = 0;

    for(j in path) {
      box = path[j];
      if(board[box] == "O") {
        numO += 1;
      }
      if(board[box] == "X") {
        numX += 1;
      }
    }

    if(numO + numX < 3) {
      // If it can win on the next turn, the most valuable move is the winning move.
      if(numX == 2) {
        valueChange = 500;
      }

      // Otherwise, if the player can win, the most valuable move is one that blocks the player.
      if(numO == 2) {
        valueChange = 200;
      }

      // If a path contains one X and one O, its value goes down.
      if(numO == 1 && numX == 1) {
        valueChange = -10;
      }
    }

    for(j in path) {
      box = path[j]
      valueArray[box] += valueChange;
    }
  }

  console.log(valueArray)

  // Go through the value array and find the box position with the highest value
  boxIndex = 0
  for(index = 0; index < 9; index++) {
    if(board[index] != undefined) { valueArray[index] = -500 }
    if(valueArray[index] > valueArray[boxIndex]) {
      boxIndex = index;
    }
  }

  clickBox(boxIndex);
  printBoard();
}



$(function() {
  resetGame();

  $('.box').click(function() {
    if(gameStarted == true && currentPlayer == "O") {
      boxIndex = parseInt($(this).attr('id')[1]);
      clickBox(boxIndex);
      printBoard();
      computerMove();
    }
  })

  $('button').click(function() {
    resetGame();
    printBoard();
  })
})