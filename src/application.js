$(function() {
  var game = Game.getInstance();
  var display = new Display();
  var cpuPlayer = new AIPlayer();
  var humanPlayer = "O";

  $('.box').click(function() {
    var boxIndex = parseInt($(this).attr('id')[1]);

    if(game.isPlaying() === true && game.currentPlayer == humanPlayer) {
      game.playMove(boxIndex, game.currentPlayer);
      if(game.currentPlayer != humanPlayer) { cpuPlayer.takeTurn(game.currentPlayer); }
      display.update();
    }
  });

  $('button').click(function() {
    humanPlayer = $('.player-select input:checked').attr('value');
    game.reset();
    if(game.currentPlayer != humanPlayer) { cpuPlayer.takeTurn(game.currentPlayer); }
    display.update();
  });
});
