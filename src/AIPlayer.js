var globalMemo;

function AIPlayer(gameInstance) {
  this.findBestMove = function(player) {
    if(winnable(player)) { return(winningMove(player)); }
    return bestMove = getRandom(this.findBestMoves(player));
  }

  this.findBestMoves = function(player) {
    var boxIndex;
    var board;

    var highestValue = -5;
    var bestMoves = [];

    for(boxIndex = 0; boxIndex < 9; boxIndex++) {
      if(game.board[boxIndex] === undefined) {
        board = cloneBoard(game.board);
        board[boxIndex] = player;

        if(this.evaluateBoardPosition(board, player) > highestValue) {
          bestMoves = [];
          highestValue = this.evaluateBoardPosition(board, player);
        };

        if(this.evaluateBoardPosition(board, player) === highestValue) {
          bestMoves.push(boxIndex);
        }
      }
    }

    return bestMoves;
  }

  // Private

  var game = gameInstance;
  var memo = {}


  function winnable(player) {
    for(laneIndex = 0; laneIndex < 8; laneIndex++) {
      lane = LANES[laneIndex];
      count = game.countPieces(lane, game.board);
      if(count[player] === 2 && count.O+count.X === 2) {
        console.log([lane,player])
        return true;
      }
    }
    return false;
  }

  function winningMove(player) {
    for(laneIndex = 0; laneIndex < 8; laneIndex++) {
      lane = LANES[laneIndex];
      count = game.countPieces(lane, game.board);
      if(count[player] === 2 && count.O+count.X === 2) {
        for(boxIndex in lane) {
          box = lane[boxIndex];
          if(game.board[box] === undefined) { return box }
        }
      }
    }
  }



  var status = {
    WIN: 1,
    TIE: 0,
    LOSE:-1
  }

  function testForEndpoint(board, player) {
    var laneIndex, lane, count;
    var otherPlayer = player === "X" ? "O" : "X";

    if(memo[[board, player]] === undefined) {

      for(laneIndex = 0; laneIndex < 8; laneIndex++) {
        lane = LANES[laneIndex];
        count = game.countPieces(lane, board);

        if(count[player] === 3) {
          memo[[board, player]] = status.WIN;
        }
        if(count[otherPlayer] === 3) {
          memo[[board, player]] = status.LOSE;
        }
      }

      count = game.countPieces(undefined, board);
      if(count.X + count.O === 9) {
        memo[[board, player]] = memo[[board, player]] || status.TIE; 
      }
    }
  }

  this.evaluateBoardPosition = function(board, player) {
    var boxIndex;
    var lowestValue = 1;
    var otherPlayer = player === "X" ? "O" : "X";

    testForEndpoint(board, player);
    if(memo[[board, player]] !== undefined) { return memo[[board, player]] }

    for(boxIndex = 0; boxIndex < 9; boxIndex++) {
      if(board[boxIndex] === undefined) {
        newBoard = cloneBoard(board);
        newBoard[boxIndex] = otherPlayer;
        value = -1 * this.evaluateBoardPosition(newBoard, otherPlayer);

        if(value < lowestValue) {lowestValue = value;}
      };
    }

    memo[[board, player]] = lowestValue;
    return lowestValue;
  }

  function cloneBoard(board) {
    var newBoard = Array(9)
    for(i = 0; i < 9; i++) {
      newBoard[i] = board[i];
    }
    return newBoard;
  }

  function getRandom(array) {
    var randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }
}