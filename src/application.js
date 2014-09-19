$(function() {
  var game = Game.getInstance();
  var display = new Display(game);
  var cpuPlayer = new AIPlayer(game);
  var humanPlayer = "O";

  $('.box').click(function() {
    var boxIndex = parseInt($(this).attr('id')[1]);

    if(game.isPlaying() === true && game.currentPlayer == humanPlayer) {
      game.playMove(boxIndex, game.currentPlayer);
      if(game.currentPlayer != humanPlayer) { game.playMove(cpuPlayer.findBestMove(game.currentPlayer), game.currentPlayer); }
      display.update();
    }
  });

  $('button').click(function() {
    humanPlayer = $('.player-select input:checked').attr('value');
    game.reset();
    if(game.currentPlayer != humanPlayer) { game.playMove(cpuPlayer.findBestMove(game.currentPlayer), game.currentPlayer); }
    display.update();
  });
});
