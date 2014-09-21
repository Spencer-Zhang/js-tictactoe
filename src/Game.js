var LANES = {
  TOP_ROW: [0,1,2],
  MIDDLE_ROW: [3,4,5],
  BOTTOM_ROW: [6,7,8],
  LEFT_COLUMN: [0,3,6],
  MIDDLE_COLUMN: [1,4,7],
  RIGHT_COLUMN: [2,5,8],
  DOWNWARD_DIAGONAL: [0,4,8],
  UPWARD_DIAGONAL: [2,4,6]
};



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
    return(this.getWinningLanes().length > 0);
  }

  this.isWinner = function(player) {
    var winningLanes = this.getWinningLanes()
    for(index in winningLanes) {
      box = winningLanes[index][0]
      if(this.board[box] === player) {
        return true;
      }
    }
    return false;
  }

  this.getWinningLanes = function() {
    var laneIndex, count;
    var winningLanes = [];

    for(laneIndex in LANES) {
      count = this.countPiecesInLane(laneIndex);
      if(count.O === 3 || count.X === 3) { winningLanes.push(LANES[laneIndex]); }
    }

    return winningLanes;
  }
};
