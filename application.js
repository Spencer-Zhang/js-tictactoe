var humanPlayer = "O";

var LANES = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];



function updateDisplay() {
  var showMessage = function(message) {
    $('.message').text(message);
  }

  var i, winner;
  for(i=0; i<9; i++){
    $('#b' + i).css('background-color', 'white');
    if(Game.board[i] !== undefined) {
      $("#b" + i).text(Game.board[i]);
    } else {
      $("#b" + i).text('');
    }
  }

  winner = Game.checkWinner();
  if(winner) {
    for(boxIndex in LANES[winner.lane]) {
      $('#b' + LANES[winner.lane][boxIndex]).css('background-color', 'red');
    }
    showMessage("Player " + winner.player + " wins!");
  }
  else if(Game.isTied()) {
    showMessage("Cat's game");
  }
  else {
    showMessage("");
  }
}



var Game = {
  reset: function() {
    var boxId, index;
    this.board = Array(9);
    this.isPlaying = true;
    this.currentPlayer = "O";

    if(this.currentPlayer != humanPlayer) { this.clickBox(findBestMove("X"), this.currentPlayer); }
  },

  countPieces: function(boxes) {
    boxes = boxes || [0,1,2,3,4,5,6,7,8];
    var boxIndex;
    var count = { O: 0, X: 0 };
    for(boxIndex in boxes) {
      box = boxes[boxIndex];
      if(this.board[box] == "O") { count.O += 1; }
      if(this.board[box] == "X") { count.X += 1; }
    }
    return count;
  },

  clickBox: function(boxIndex, player) {
    if(this.board[boxIndex] !== "X" && this.board[boxIndex] !== "O") {
      this.board[boxIndex] = this.currentPlayer;
      this.advanceTurn();
    }
  },

  isPlaying: function() {
    return(this.checkWinner() === false && this.isTied() === false)
  },

  checkWinner: function() {
    var laneIndex, boxes, count;

    for(laneIndex=0; laneIndex<8; laneIndex++) {
      boxes = LANES[laneIndex];
      count = this.countPieces(boxes);

      if(count.O === 3 || count.X === 3) {
        if(count.O === 3) { return {player:"O", lane:laneIndex}; }
        if(count.X === 3) { return {player:"X", lane:laneIndex}; }
      }
    }
    return false;
  },

  isTied: function() {
    var count = this.countPieces();
    return(count.O + count.X === 9);
  },

  advanceTurn: function() {
    if(this.isPlaying === true) {
      if(this.currentPlayer === "X") {
        this.currentPlayer = "O";
      } else {
        this.currentPlayer = "X";
      }
    }
  }
};



function findBestMove(player) {
  // The Computer calculates the value of each position on the board.
  // The center of the board is worth the most, and corners are worth more than sides.
  var numMine, numOther;
  var valueChange, boxIndex, box, laneIndex, count;
  var valueArray = [5, 0, 5, 0, 25, 0, 5, 0, 5];
  var bestMove;

  // The computer checks each row, column, and diagonal
  for(laneIndex=0; laneIndex<8; laneIndex++) {
    boxes = LANES[laneIndex]
    count = Game.countPieces(boxes);
    
    numMine = count[player];
    numOther = count.O + count.X - numMine;

    valueChange = 0;

    // If it can win on the next turn, the most valuable move is the winning move.
    if(numMine === 2 && numOther === 0) { valueChange = 1000; }

    // Otherwise, if the player can win, the most valuable move is one that blocks the player.
    if(numOther === 2 && numMine === 0) { valueChange = 200; }

    // If a lane contains exactly one O, its value goes up.
    if(numOther === 1 && numMine === 0) { valueChange = 10; }

    // If a lane contains one X and one O, its value goes down.
    if(numOther === 1 && numMine === 1) { valueChange = -50; }

    for(boxIndex in boxes) {
      box = boxes[boxIndex];
      valueArray[box] += valueChange;
    }
  }

  // Go through the value array and find the box position with the highest value
  bestMove = 0;
  for(boxIndex = 0; boxIndex < 9; boxIndex++) {
    if(Game.board[boxIndex] !== undefined) { valueArray[boxIndex] = -500; }
    if(valueArray[boxIndex] > valueArray[bestMove]) {
      bestMove = boxIndex;
    }
  }

  return bestMove;
}



$(function() {
  Game.reset();

  $('.box').click(function() {
    var boxIndex;
    if(Game.isPlaying === true && Game.currentPlayer == humanPlayer) {
      boxIndex = parseInt($(this).attr('id')[1]);

      Game.clickBox(boxIndex, Game.currentPlayer);
      if(Game.currentPlayer != humanPlayer) { Game.clickBox(findBestMove(Game.currentPlayer), Game.currentPlayer); }

      updateDisplay();
    }
  });

  $('button').click(function() {
    Game.reset();
    updateDisplay();
  });

  $('.player-select input').change(function() {
    humanPlayer = $(this).attr('value');
    Game.reset();
    updateDisplay();
  });
});
