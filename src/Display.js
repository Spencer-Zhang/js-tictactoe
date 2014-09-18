function Display(gameInstance) {
  
  this.update = function() {
    var i, winner, boxIndex;
    clear();
    drawPieces();
    showStatus();
  }



  // Private

  var game = gameInstance;

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
      if(game.board[i] !== undefined) {
        $("#b" + i).text(game.board[i]);
      }
    }
  };

  function showStatus() {
    if(game.winnerExists()) {
      winner = game.getWinnerData();
      for(boxIndex in LANES[winner.lane]) {
        $('#b' + LANES[winner.lane][boxIndex]).css('background-color', 'red');
      }
      showMessage("Player " + winner.player + " wins!");
    }
    else if(game.isTied()) {
      showMessage("Cat's game");
    }
    else {
      showMessage("");
    }
  };
}
