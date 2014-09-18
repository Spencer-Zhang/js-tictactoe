var AI = {
  findBestMove: function(player) {
    // The Computer calculates the value of each position on the board.
    // The center of the board is worth the most, and corners are worth more than sides.
    var numMine, numOther;
    var valueChange, boxIndex, boxes, box, laneIndex, count;
    var valueArray = [5, 0, 5, 0, 25, 0, 5, 0, 5];
    var bestMove;

    // The computer checks each row, column, and diagonal
    for(laneIndex=0; laneIndex<8; laneIndex++) {
      boxes = LANES[laneIndex];
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
}
