var Display = {
  game: Game.getInstance(),

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
      if(this.game.board[i] !== undefined) {
        $("#b" + i).text(this.game.board[i]);
      }
    }
  },

  showStatus: function() {
    if(this.game.winnerExists()) {
      winner = this.game.getWinnerData();
      for(boxIndex in LANES[winner.lane]) {
        $('#b' + LANES[winner.lane][boxIndex]).css('background-color', 'red');
      }
      this.showMessage("Player " + winner.player + " wins!");
    }
    else if(this.game.isTied()) {
      this.showMessage("Cat's game");
    }
    else {
      this.showMessage("");
    }
  },

  update: function() {
    var i, winner, boxIndex;
    this.clear();
    this.drawPieces();
    this.showStatus();
  }
}
