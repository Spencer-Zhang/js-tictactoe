var View = {
  updateDisplay: function() {
    var showMessage = function(message) {
      $('.message').text(message);
    };

    var i, winner, boxIndex;

    for(i=0; i<9; i++){
      $('#b' + i).css('background-color', 'white');
      if(Game.board[i] !== undefined) {
        $("#b" + i).text(Game.board[i]);
      } else {
        $("#b" + i).text('');
      }
    }

    winner = Game.checkWinner();
    if(winner) {
      for(boxIndex in LANES[winner.lane]) {
        $('#b' + LANES[winner.lane][boxIndex]).css('background-color', 'red');
      }
      showMessage("Player " + winner.player + " wins!");
    }
    else if(Game.isTied()) {
      showMessage("Cat's game");
    }
    else {
      showMessage("");
    }
  }
}
