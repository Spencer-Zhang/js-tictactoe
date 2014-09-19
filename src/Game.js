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

  function init() {
    instance = new GameClass();
  }

  return {
    getInstance: function() {
      if(!instance) { init(); }
      return instance;
    }
  };
}();



function GameClass() {
  this.board = Array(9);
  this.currentPlayer = "O";

  this.reset = function() {
    this.board = Array(9);
    this.currentPlayer = "O";
  }

  this.countPieces = function(lane, board) {
    var boxIndex, box;
    var count = { O: 0, X: 0 };
    lane = lane || [0,1,2,3,4,5,6,7,8];
    board = board || this.board;

    for(boxIndex in lane) {
      box = lane[boxIndex];
      if(board[box] == "O") { count.O += 1; }
      if(board[box] == "X") { count.X += 1; }
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
    var count = this.countPieces();
    return(count.O + count.X === 9);
  }

  this.winnerExists = function() {
    var laneIndex, lane, count;

    for(laneIndex=0; laneIndex<8; laneIndex++) {
      lane = LANES[laneIndex];
      count = this.countPieces(lane);
      
      if(count.O === 3 || count.X === 3) {
        return true;
      }
    }
    return false;
  }

  this.getWinnerData = function() {
    var laneIndex, lane, count;

    for(laneIndex=0; laneIndex<8; laneIndex++) {
      lane = LANES[laneIndex];
      count = this.countPieces(lane);
      
      if(count.O === 3 || count.X === 3) {
        if(count.O === 3) { return {player:"O", lane:laneIndex}; }
        if(count.X === 3) { return {player:"X", lane:laneIndex}; }
      }
    }
  }
};
