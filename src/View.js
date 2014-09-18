var View = {
  showMessage: function(message) {
    $('.message').text(message);
  },

  clear: function() {
    var i;
    for(i=0; i<9; i++){
      $('#b' + i).css('background-color', 'white');
      $("#b" + i).text('');
    }
  },

  drawPieces: function() {
    var i;
    for(i=0; i<9; i++){
      if(game.board[i] !== undefined) {
        $("#b" + i).text(game.board[i]);
      }
    }
  },

  update: function() {
    var i, winner, boxIndex;
    this.clear();
    this.drawPieces();

    winner = game.checkWinner();
    if(winner) {
      for(boxIndex in LANES[winner.lane]) {
        $('#b' + LANES[winner.lane][boxIndex]).css('background-color', 'red');
      }
      this.showMessage("Player " + winner.player + " wins!");
    }
    else if(game.isTied()) {
      this.showMessage("Cat's game");
    }
    else {
      this.showMessage("");
    }
  }
}
