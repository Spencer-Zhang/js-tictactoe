var AI = {
  game: Game.getInstance(),
  moveValueMap: [],

  addValue: function(boxes, value) {
    for(boxIndex in boxes) {
      box = boxes[boxIndex];
      this.moveValueMap[box] += value;
    }
  },

  calculateValuesOfPossibleMoves: function(player) {
    var numMine, numOther;
    var laneIndex, boxes, count;
    var TOP_PRIORITY = 1000;
    var NORMAL_PRIORITY = 10;

    this.moveValueMap = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for(laneIndex=0; laneIndex<8; laneIndex++) {
      boxes = LANES[laneIndex];
      count = this.game.countPieces(boxes);      
      numMine = count[player];
      numOther = count.O + count.X - numMine;

      if(numOther === 0 && numMine === 2) { this.addValue(boxes, 1.0 * TOP_PRIORITY); }
      if(numOther === 2 && numMine === 0) { this.addValue(boxes, 0.2 * TOP_PRIORITY); }

      if(numOther === 0 && numMine === 1) { this.addValue(boxes, 2.0 * NORMAL_PRIORITY); }
      if(numOther === 1 && numMine === 0) { this.addValue(boxes, 1.5 * NORMAL_PRIORITY); }
      if(numOther === 0 && numMine === 0) { this.addValue(boxes, 1.0 * NORMAL_PRIORITY); }
    }
  },

  moveWithHighestValue: function() {
    var boxIndex
    var highestValue = -1;
    var highestIndex;

    for(boxIndex = 0; boxIndex < 9; boxIndex++) {
      if(this.game.board[boxIndex] === undefined && this.moveValueMap[boxIndex] > highestValue) {
        highestValue = this.moveValueMap[boxIndex];
        highestIndex = boxIndex;
      }
    }

    return highestIndex;
  },

  findBestMove: function(player) {
    this.calculateValuesOfPossibleMoves(player)    
    return this.moveWithHighestValue();
  }
}