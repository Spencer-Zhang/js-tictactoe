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



function showMessage(message) {
  $('.message').text(message);
}


function resetGame() {
  var boxId
  board = Array(9);
  gameStarted = true;
  currentPlayer = "O";
  showMessage("");

  for(boxId=0; boxId<9; boxId++) {
    $('#b' + boxId).css('background-color', 'white')
  }
}

function clickBox(boxIndex) {
  if(board[boxIndex] == undefined) {
    board[boxIndex] = currentPlayer
    printBoard();
    nextPlayer();
  }
}

function checkVictoryConditions() {
  var index, numO, numX, path, j, box, n
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
      for(j in path) {
        $('#b' + path[j]).css('background-color', 'red') 
      }
      if(numO == 3) { showMessage("Congratulations! You win!"); }
      if(numX == 3) { showMessage("Computer wins"); }
    }
  }

  if(gameStarted == true) {
    n = 0
    for(i in board) {
      if(board[i] != undefined) {
        n += 1;
      }
    }
    if(n == 9) {
      gameStarted = false;
      showMessage("Cat's game");
    }
  }
}

function nextPlayer() {
  checkVictoryConditions()
  if(gameStarted == true) {
    if(currentPlayer == "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
      computerMove();
    }
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
  var numO, numX
  var valueChange, boxIndex, pathIndex
  var valueArray = [5, 0, 5, 0, 25, 0, 5, 0, 5];

  // The computer checks each row, column, and diagonal
  for(pathIndex in PATHS) {
    numO = 0;
    numX = 0;
    path = PATHS[pathIndex];
    valueChange = 0;

    for(j in path) {
      box = path[j];
      if(board[box] == "O") { numO += 1; }
      if(board[box] == "X") { numX += 1; }
    }

    // If it can win on the next turn, the most valuable move is the winning move.
    if(numX == 2 && numO == 0) { valueChange = 500; }

    // Otherwise, if the player can win, the most valuable move is one that blocks the player.
    if(numO == 2 && numX == 0) { valueChange = 200; }

    // If a path contains exactly one O, its value goes up.
    // The AI prioritizes blocking the player over winning the game itself.
    if(numO == 1 && numX == 0) { valueChange = 10; }

    // If a path contains one X and one O, its value goes down.
    if(numO == 1 && numX == 1) { valueChange = -50; }

    for(j in path) {
      box = path[j]
      valueArray[box] += valueChange;
    }
  }

  // Go through the value array and find the box position with the highest value
  bestMove = 0
  for(boxIndex = 0; boxIndex < 9; boxIndex++) {
    if(board[boxIndex] != undefined) { valueArray[boxIndex] = -500 }
    if(valueArray[boxIndex] > valueArray[bestMove]) {
      bestMove = boxIndex;
    }
  }

  clickBox(bestMove);
}



$(function() {
  resetGame();

  $('.box').click(function() {
    if(gameStarted == true && currentPlayer == "O") {
      boxIndex = parseInt($(this).attr('id')[1]);
      clickBox(boxIndex);
    }
  })

  $('button').click(function() {
    resetGame();
    printBoard();
  })
})