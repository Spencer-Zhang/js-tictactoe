function AIPlayer() {
  this.takeTurn = function(player) {
    var move = pickRandom(this.findBestMoves(player));
    game().playMove(move, player);
  }

  this.findBestMoves = function(player) {
    var boxIndex, board;
    var bestOutcome = status.LOSE;
    var bestMoves = [];

    if(winnable(player)) { return([getWinningMove(player)]); }

    for(boxIndex = 0; boxIndex < 9; boxIndex++) {
      if(game().board[boxIndex] === undefined) {
        board = cloneBoard(game().board);
        board[boxIndex] = player;

        if(predictOutcome(board, player) > bestOutcome) {
          bestMoves = [];
          bestOutcome = predictOutcome(board, player);
        };

        if(predictOutcome(board, player) === bestOutcome) {
          bestMoves.push(boxIndex);
        }
      }
    }

    return bestMoves;
  }



  // Private

  var game = Game.getInstance;

  function cloneBoard(board) {
    var newBoard = Array(9)
    for(i = 0; i < 9; i++) {
      newBoard[i] = board[i];
    }
    return newBoard;
  }

  function pickRandom(array) {
    var randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  function winnable(player) {
    for(laneIndex in LANES) {
      count = game().countPiecesInLane(laneIndex);
      if(count[player] === 2 && count.O+count.X === 2) { return true; }
    }
    return false;
  }

  function getWinningMove(player) {
    for(laneIndex in LANES) {
      lane = LANES[laneIndex];
      count = game().countPiecesInLane(laneIndex);
      if(count[player] === 2 && count.O+count.X === 2) {
        for(boxIndex in lane) {
          box = lane[boxIndex];
          if(game().board[box] === undefined) { return box }
        }
      }
    }
  }



  var memo = {}

  var status = {
    WIN: 1,
    TIE: 0,
    LOSE:-1
  }

  function checkStoppingConditions(board, player) {
    var laneIndex, lane, count;
    var otherPlayer = player === "X" ? "O" : "X";
    var tempGame;

    if(memo[[board,player]] === undefined) {
      tempGame = new GameClass(board); 

      if(!tempGame.isPlaying()) {
        if(tempGame.winnerExists()) {
          if( tempGame.getWinnerData().player === player ) { memo[[board, player]] = status.WIN }
          else { memo[[board, player]] = status.LOSE }
        }

        if(tempGame.isTied()) { memo[[board, player]] = status.TIE }
      }
    }
  }

  function predictOutcome(board, player) {
    var boxIndex, newBoard, outcome;
    var worstPossibleOutcome = status.WIN;
    var otherPlayer = player === "X" ? "O" : "X";

    checkStoppingConditions(board, player);
    if(memo[[board, player]] !== undefined) { return memo[[board, player]]; }

    for(boxIndex = 0; boxIndex < 9; boxIndex++) {
      if(board[boxIndex] === undefined) {
        newBoard = cloneBoard(board);
        newBoard[boxIndex] = otherPlayer;
        outcome = -1 * predictOutcome(newBoard, otherPlayer);

        if(outcome < worstPossibleOutcome) {worstPossibleOutcome = outcome;}
      };
    }

    memo[[board, player]] = worstPossibleOutcome;
    return worstPossibleOutcome;
  }
}
