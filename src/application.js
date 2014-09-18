//TODO:
// Make Game an object instead of an object literal.
// Improve readability of checkWinner
// Improve readability of findBestMove
// Improve test coverage of findBestMove

$(function() {
  var startNewGame = function() {
    game = new Game();
    if(game.currentPlayer != humanPlayer) { game.playMove(AI.findBestMove(game.currentPlayer), game.currentPlayer); }
    View.update();
  }
  var humanPlayer = "O";

  startNewGame();

  $('.box').click(function() {
    var boxIndex;
    if(game.isPlaying() === true && game.currentPlayer == humanPlayer) {
      boxIndex = parseInt($(this).attr('id')[1]);

      game.playMove(boxIndex, game.currentPlayer);
      if(game.currentPlayer != humanPlayer) { game.playMove(AI.findBestMove(game.currentPlayer), game.currentPlayer); }
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
