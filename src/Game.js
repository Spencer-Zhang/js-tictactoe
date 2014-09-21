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



var Game = function() {
  // Singleton
  var instance;

  return {
    getInstance: function() {
      if(!instance) { this.reset(); }
      return instance;
    },

    reset: function() {
      instance = new GameClass();
    }
  };
}();



function GameClass(board) {
  this.board = board || Array(9);
  this.currentPlayer = "O";

  this.countPiecesOnBoard = function() {
    return this.countPieces([0,1,2,3,4,5,6,7,8])
  }

  this.countPiecesInLane = function(index) {
    return this.countPieces(LANES[index])
  }

  this.countPieces = function(boxes) {
    var boxIndex, box;
    var count = { O: 0, X: 0 };

    for(boxIndex in boxes) {
      box = boxes[boxIndex];
      if(this.board[box] == "O") { count.O += 1; }
      if(this.board[box] == "X") { count.X += 1; }
    }
    return count;
  }

  this.playMove = function(boxIndex, player) {
    if(this.isPlaying() && this.board[boxIndex] === undefined) {
      this.board[boxIndex] = player;
      this.advanceTurn();
    }
  }

  this.advanceTurn = function() {
    if(this.currentPlayer === "X") {
      this.currentPlayer = "O";
    } else {
      this.currentPlayer = "X";
    }
  }

  this.isPlaying = function() {
    return(this.winnerExists() === false && this.isTied() === false);
  }

  this.isTied = function() {
    var count = this.countPiecesOnBoard();
    return(!this.winnerExists() && count.O + count.X === 9);
  }

  this.winnerExists = function() {
    var laneIndex, count;

    for(laneIndex=0; laneIndex<8; laneIndex++) {
      count = this.countPiecesInLane(laneIndex);
      
      if(count.O === 3 || count.X === 3) {
        return true;
      }
    }
    return false;
  }

  this.getWinnerData = function() {
    var laneIndex, count;

    for(laneIndex=0; laneIndex<8; laneIndex++) {
      count = this.countPiecesInLane(laneIndex);
      
      if(count.O === 3 || count.X === 3) {
        if(count.O === 3) { return {player:"O", lane:LANES[laneIndex]}; }
        if(count.X === 3) { return {player:"X", lane:LANES[laneIndex]}; }
      }
    }
  }
};
