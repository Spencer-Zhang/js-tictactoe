function AIPlayer() {
  this.takeTurn = function(player) {
    var move = pickRandom(this.findBestMoves(player));
    game().playMove(move, player);
  }

  this.findBestMoves = function(player) {
    var boxIndex, board;
    var bestOutcome = status.LOSE;
    var bestMoves = [];

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



  var memo = {}

  var status = {
    WIN: 10,
    TIE: 0,
    LOSE:-10
  }

  function checkStoppingConditions(board, player, depth) {
    var otherPlayer = player === "X" ? "O" : "X";
    var testGame;

    if(memo[[board,player]] === undefined) {
      testGame = new GameClass(board); 

      if(testGame.isWinner(player) )          { memo[[board, player]] = status.WIN - depth; }
      else if(testGame.isWinner(otherPlayer)) { memo[[board, player]] = status.LOSE + depth; }
      else if(testGame.isTied())              { memo[[board, player]] = status.TIE; }
    }
  }

  function predictOutcome(board, player, depth) {
    depth = depth || 0;
    var boxIndex, newBoard, outcome;
    var worstPossibleOutcome = status.WIN;
    var otherPlayer = player === "X" ? "O" : "X";

    checkStoppingConditions(board, player, depth);
    if(memo[[board, player]] !== undefined) { return memo[[board, player]]; }

    for(boxIndex = 0; boxIndex < 9; boxIndex++) {
      if(board[boxIndex] === undefined) {
        newBoard = cloneBoard(board);
        newBoard[boxIndex] = otherPlayer;
        outcome = -1 * predictOutcome(newBoard, otherPlayer, depth + 1);

        if(outcome < worstPossibleOutcome) {worstPossibleOutcome = outcome;}
      };
    }

    memo[[board, player]] = worstPossibleOutcome;
    return worstPossibleOutcome;
  }
}
