function Display() {
  
  this.update = function() {
    var i, winner, boxIndex;
    clear();
    drawPieces();
    highlightWinningLanes();
    showStatus();
  }



  // Private

  var game = Game.getInstance;

  function showMessage(message) {
    $('.message').text(message);
  };

  function clear() {
    var i;
    for(i=0; i<9; i++){
      $('#b' + i).css('background-color', 'white');
      $("#b" + i).text('');
    }
  };

  function drawPieces() {
    var i;
    for(i=0; i<9; i++){
      if(game().board[i] !== undefined) {
        $("#b" + i).text(game().board[i]);
      }
    }
  };

  function highlightWinningLanes() {
    var lane, box;
    var winningLanes = game().getWinningLanes();
    console.log(winningLanes);
    for(laneIndex in winningLanes) {
      lane = winningLanes[laneIndex];
      for(boxIndex in lane) {
        box = lane[boxIndex];
        $('#b' + box).css('background-color', 'red');
      }
    }
  }

  function showStatus() {
    if(game().isWinner("O"))      {showMessage("Player O wins!");}
    else if(game().isWinner("X")) {showMessage("Player X wins!");}
    else if(game().isTied())      {showMessage("Cat's game");}
    else                          {showMessage("");}
  };
}
