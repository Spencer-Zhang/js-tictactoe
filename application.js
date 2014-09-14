var humanPlayer = "O";

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

var Game = {
  isPlaying: false,
  currentPlayer: "O",
  board: [],
  lanes: {},

  reset: function() {
    var boxId, index;
    this.board = Array(9);
    this.isPlaying = true;
    this.currentPlayer = "O";

    this.lanes = {};
    for(index=0; index<9; index++) {
      this.lanes[index] = {boxes: LANES[index], count: {"O": 0, "X": 0}};
    }

    showMessage("");

    for(boxId=0; boxId<9; boxId++) {
      $('#b' + boxId).css('background-color', 'white');
    }

    updateBoard();

    if(Game.currentPlayer != humanPlayer) { Game.clickBox(findBestMove("X"), Game.currentPlayer); }
  },

  clickBox: function(boxIndex, player) {
    var laneIndex, lane;
    
    if(this.board[boxIndex] === undefined) {
      this.board[boxIndex] = this.currentPlayer;

      for(laneIndex in this.lanes) {
        if(this.lanes[laneIndex]) {
          lane = this.lanes[laneIndex];
          if($.inArray(boxIndex, lane.boxes) != -1) {
            lane.count[player] += 1;
          }
        }
      }

      updateBoard();
      nextPlayer();
    }
  },

  checkVictoryConditions: function() {
    var laneIndex, lane, boxIndex;

    for(laneIndex in this.lanes) {
      if(this.lanes[laneIndex]) {
        lane = this.lanes[laneIndex];
        if(lane.count.O === 3 || lane.count.X === 3) {
          this.isPlaying = false;
          for(boxIndex in lane.boxes) {
            if(lane.boxes[boxIndex]) {
              $('#b' + lane.boxes[boxIndex]).css('background-color', 'red');
            }
          }
          if(lane.count.O === 3) { showMessage("Player O wins!"); }
          if(lane.count.X === 3) { showMessage("Player X wins!"); }
        }
      }
    }

    if(this.isPlaying === true) {
      var n = 0;
      for(boxIndex in this.board) {
        if(this.board[boxIndex] !== undefined) {
          n += 1;
        }
      }
      if(n == 9) {
        this.isPlaying = false;
        showMessage("Cat's game");
      }
    }
  }
};



function showMessage(message) {
  $('.message').text(message);
}



function nextPlayer() {
  Game.checkVictoryConditions();
  if(Game.isPlaying === true) {
    if(Game.currentPlayer == "X") {
      Game.currentPlayer = "O";
    } else {
      Game.currentPlayer = "X";
    }

    if(Game.currentPlayer != humanPlayer) { Game.clickBox(findBestMove(Game.currentPlayer), Game.currentPlayer); }
  }
}

function updateBoard() {
  var i;
  for(i=0; i<9; i++){
    if(Game.board[i] !== undefined) {
      $("#b" + i).text(Game.board[i]);
    } else {
      $("#b" + i).text('');
    }
  }
}


function findBestMove(player) {
  // The Computer calculates the value of each position on the board.
  // The center of the board is worth the most, and corners are worth more than sides.
  var numMine, numOther;
  var valueChange, boxIndex, box, laneIndex, lane;
  var valueArray = [5, 0, 5, 0, 25, 0, 5, 0, 5];
  var bestMove;

  // The computer checks each row, column, and diagonal
  for(laneIndex in Game.lanes) {
    if(Game.lanes[laneIndex]) {
      lane = Game.lanes[laneIndex];
      
      if(player === "O") {
        numMine = lane.count.O;
        numOther = lane.count.X;
      } else {
        numMine = lane.count.X;
        numOther = lane.count.O;
      }
  
      valueChange = 0;
  
      // If it can win on the next turn, the most valuable move is the winning move.
      if(numMine === 2 && numOther === 0) { valueChange = 1000; }
  
      // Otherwise, if the player can win, the most valuable move is one that blocks the player.
      if(numOther === 2 && numMine === 0) { valueChange = 200; }
  
      // If a lane contains exactly one O, its value goes up.
      // The AI prioritizes blocking the player over winning the game itself.
      if(numOther === 1 && numMine === 0) { valueChange = 10; }
  
      // If a lane contains one X and one O, its value goes down.
      if(numOther === 1 && numMine === 1) { valueChange = -50; }
  
      for(boxIndex in lane.boxes) {
        if(lane.boxes[boxIndex]) {
          box = lane.boxes[boxIndex];
          valueArray[box] += valueChange;
        }
      }
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



$(function() {
  Game.reset();

  $('.box').click(function() {
    var boxIndex;
    if(Game.isPlaying === true && Game.currentPlayer == humanPlayer) {
      boxIndex = parseInt($(this).attr('id')[1]);
      Game.clickBox(boxIndex, Game.currentPlayer);
    }
  });

  $('button').click(function() {
    Game.reset();
  });

  $('.player-select input').change(function() {
    humanPlayer = $(this).attr('value');
    Game.reset();
  });
});
