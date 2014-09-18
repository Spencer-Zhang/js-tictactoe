//TODO:
// Make Game an object instead of an object literal.
// Improve readability of checkWinner
// Improve readability of findBestMove
// Improve test coverage of findBestMove

$(function() {
  var startNewGame = function() {
    Game.reset();
    if(Game.currentPlayer != humanPlayer) { Game.playMove(AI.findBestMove(Game.currentPlayer), Game.currentPlayer); }
    View.update();
  }
  var humanPlayer = "O";

  startNewGame();

  $('.box').click(function() {
    var boxIndex;
    if(Game.isPlaying() === true && Game.currentPlayer == humanPlayer) {
      boxIndex = parseInt($(this).attr('id')[1]);

      Game.playMove(boxIndex, Game.currentPlayer);
      if(Game.currentPlayer != humanPlayer) { Game.playMove(AI.findBestMove(Game.currentPlayer), Game.currentPlayer); }
      View.update();
    }
  });

  $('button').click(function() {
    startNewGame();
  });

  $('.player-select input').change(function() {
    humanPlayer = $(this).attr('value');
    startNewGame();    
  });
});
