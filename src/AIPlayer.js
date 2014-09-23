function AIPlayer() {
  this.takeTurn = function(player) {
    var move = pickRandom(this.findBestMoves(player));
    game().playMove(move, player);
  }

  this.findBestMoves = function(player) {
    var outcomes, bestOutcome, i;
    var bestMoves = [];

    outcomes = testPossibleMoves(game().board, player);
    bestOutcome = maximum(outcomes);

    for(i in outcomes) {
      if(outcomes[i] == bestOutcome) { bestMoves.push(parseInt(i)); }
    }

    return bestMoves;
  }



  // Private

  var game = Game.getInstance;

  function cloneBoard(board) {
    var i;
    var newBoard = Array(9);
    for(i = 0; i < 9; i++) {
      newBoard[i] = board[i];
    }
    return newBoard;
  }

  function pickRandom(array) {
    var randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  function maximum(array) {
    var max, i;
    for(i in array) {
      if(max == undefined || array[i] > max) { max = array[i]; }
    }
    return max;
  }



  var memo = {}

  var status = {
    WIN: 10,
    TIE: 0,
    LOSE:-10
  }

  function checkStoppingConditions(board, player) {
    var otherPlayer = (player === "X" ? "O" : "X");
    var testGame, count, depth;

    if(memo[[board,player]] === undefined) {
      testGame = new GameClass(board); 
      count = testGame.countPiecesOnBoard();
      depth = count.O + count.X;

      if(testGame.isWinner(player) )          { memo[[board, player]] = status.WIN - depth; }
      else if(testGame.isWinner(otherPlayer)) { memo[[board, player]] = status.LOSE + depth; }
      else if(testGame.isTied())              { memo[[board, player]] = status.TIE; }
    }
  }

  function predictOutcome(board, player) {
    var worstOutcome, outcomes;
    var otherPlayer = player === "X" ? "O" : "X";

    checkStoppingConditions(board, player);
    if(memo[[board, player]] !== undefined) { return memo[[board, player]]; }

    outcomes = testPossibleMoves(board, otherPlayer);
    worstOutcome = -1 * maximum(outcomes);

    memo[[board, player]] = worstOutcome;
    return worstOutcome;
  }

  function testPossibleMoves(board, player) {
    var outcomes = [];
    var newBoard, boxIndex;

    for(boxIndex = 0; boxIndex < 9; boxIndex++) {
      if(board[boxIndex] === undefined) {
        newBoard = cloneBoard(board);
        newBoard[boxIndex] = player;
        outcomes[boxIndex] = predictOutcome(newBoard, player);
      };
    }
    return outcomes;
  }
}
