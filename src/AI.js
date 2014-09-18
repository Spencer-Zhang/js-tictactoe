var AI = {
  findBestMove: function(player) {
    // The Computer calculates the value of each position on the board.
    // The center of the board is worth the most, and corners are worth more than sides.
    var numMine, numOther;
    var valueChange, boxIndex, boxes, box, laneIndex, count;
    var weightMap = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var bestMove;

    // The computer checks each row, column, and diagonal
    for(laneIndex=0; laneIndex<8; laneIndex++) {
      boxes = LANES[laneIndex];
      count = game.countPieces(boxes);
      
      numMine = count[player];
      numOther = count.O + count.X - numMine;

      valueChange = 0;

      if(numOther === 0 && numMine === 2) { valueChange = 1000; }
      if(numOther === 2 && numMine === 0) { valueChange = 200; }
      if(numOther === 0 && numMine === 1) { valueChange = 20; }
      if(numOther === 1 && numMine === 0) { valueChange = 15; }
      if(numOther === 0 && numMine === 0) { valueChange = 10; }

      for(boxIndex in boxes) {
        box = boxes[boxIndex];
        weightMap[box] += valueChange;
      }
    }

    // Go through the value array and find the box position with the highest value
    bestMove = 0;
    for(boxIndex = 0; boxIndex < 9; boxIndex++) {
      if(game.board[boxIndex] !== undefined) { weightMap[boxIndex] = -500; }
      if(weightMap[boxIndex] > weightMap[bestMove]) {
        bestMove = boxIndex;
      }
    }

    return bestMove;
  }
}
