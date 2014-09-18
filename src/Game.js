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
  var instance;

  function init() {
    instance = new GameClass();
    instance.reset();
  }

  return {
    getInstance: function() {
      if(!instance) {
        init();
      }
      return instance;
    },
  };
}();



function GameClass() {
  this.reset = function() {
    this.board = Array(9);
    this.currentPlayer = "O";
  }

  this.countPieces = function(boxes) {
    boxes = boxes || [0,1,2,3,4,5,6,7,8];
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
    if(this.board[boxIndex] !== "X" && this.board[boxIndex] !== "O") {
      this.board[boxIndex] = player;
      this.advanceTurn();
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
    var laneIndex, boxes, count;

    for(laneIndex=0; laneIndex<8; laneIndex++) {
      boxes = LANES[laneIndex];
      count = this.countPieces(boxes);
      
      if(count.O === 3 || count.X === 3) {
        return true;
      }
    }
    return false;
  }

  this.getWinnerData = function() {
    var laneIndex, boxes, count;

    for(laneIndex=0; laneIndex<8; laneIndex++) {
      boxes = LANES[laneIndex];
      count = this.countPieces(boxes);
      
      if(count.O === 3 || count.X === 3) {
        if(count.O === 3) { return {player:"O", lane:laneIndex}; }
        if(count.X === 3) { return {player:"X", lane:laneIndex}; }
      }
    }
  }

  this.advanceTurn = function() {
    if(this.isPlaying() === true) {
      if(this.currentPlayer === "X") {
        this.currentPlayer = "O";
      } else {
        this.currentPlayer = "X";
      }
    }
  }
};
