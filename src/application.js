//TODO:
// Make Game an object instead of an object literal.
// Improve readability of checkWinner
// Improve readability of findBestMove
// Improve test coverage of findBestMove

$(function() {
  var startNewGame = function() {
    Game.reset();
    if(Game.currentPlayer != humanPlayer) { Game.clickBox(AI.findBestMove(Game.currentPlayer), Game.currentPlayer); }
    View.updateDisplay();
  }
  var humanPlayer = "O";

  startNewGame();

  $('.box').click(function() {
    var boxIndex;
    if(Game.isPlaying() === true && Game.currentPlayer == humanPlayer) {
      boxIndex = parseInt($(this).attr('id')[1]);

      Game.clickBox(boxIndex, Game.currentPlayer);
      if(Game.currentPlayer != humanPlayer) { Game.clickBox(AI.findBestMove(Game.currentPlayer), Game.currentPlayer); }
      View.updateDisplay();
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
