// Deprecated version of the AI code.
// See AIPlayer.js for the new version.

function AIPlayer(gameInstance) {

  this.findBestMove = function(player) {
    calculateValuesOfMoves(player);
    accountForEdgeCase(player);
    removeIllegalMoves();
    return moveWithHighestValue();
  }



  // Private

  var game = gameInstance;
  var valueMap = [];
  var TOP_PRIORITY = 1000, NORMAL_PRIORITY = 10;

  function calculateValuesOfMoves(player) {
    var numMine, numOther;
    var laneIndex, lane, count;

    valueMap = [ 0, 0, 0, 
                 0, 0, 0, 
                 0, 0, 0 ];

    for(laneIndex=0; laneIndex<8; laneIndex++) {
      lane = LANES[laneIndex];
      addValue(lane, calculateLaneValue(lane, player));
    }
  }

  function addValue(lane, value) {
    var boxIndex, box;
    for(boxIndex in lane) {
      box = lane[boxIndex];
      valueMap[box] += value;
    }
  }

  function calculateLaneValue(lane, player) {
    var count = game.countPieces(lane);      
    var numMine = count[player];
    var numOther = count.O + count.X - numMine;

    if(numOther === 0 && numMine === 2) { return(1.0 * TOP_PRIORITY); }
    if(numOther === 2 && numMine === 0) { return(0.2 * TOP_PRIORITY); }

    if(numOther === 0 && numMine === 1) { return(2.0 * NORMAL_PRIORITY); }
    if(numOther === 1 && numMine === 0) { return(1.5 * NORMAL_PRIORITY); }
    if(numOther === 0 && numMine === 0) { return(1.0 * NORMAL_PRIORITY); }

    return 0;
  }

  function accountForEdgeCase(player) {
    var myPiece = player;
    var otherPiece = myPiece === "O" ? "X" : "O";
    var count = game.countPieces();

    if(count.O + count.X === 3 && game.board[4] === myPiece) {
      if( (game.board[0] === otherPiece && game.board[8] === otherPiece) || (game.board[2] === otherPiece && game.board[6] === otherPiece) ) {
        addValue([0,2,6,8], -TOP_PRIORITY);
      }
    };
  }

  function removeIllegalMoves() {
    for(boxIndex=0; boxIndex<9; boxIndex++) {
      if(game.board[boxIndex] !== undefined) {
        valueMap[boxIndex] = -1;
      }
    }
  }

  function moveWithHighestValue() {
    var maxValue = Math.max.apply(Math, valueMap);
    return valueMap.indexOf(maxValue);
  }
}