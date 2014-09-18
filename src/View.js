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
      if(Game.board[i] !== undefined) {
        $("#b" + i).text(Game.board[i]);
      }
    }
  },

  update: function() {
    var i, winner, boxIndex;
    this.clear();
    this.drawPieces();

    winner = Game.checkWinner();
    if(winner) {
      for(boxIndex in LANES[winner.lane]) {
        $('#b' + LANES[winner.lane][boxIndex]).css('background-color', 'red');
      }
      this.showMessage("Player " + winner.player + " wins!");
    }
    else if(Game.isTied()) {
      this.showMessage("Cat's game");
    }
    else {
      this.showMessage("");
    }
  }
}
