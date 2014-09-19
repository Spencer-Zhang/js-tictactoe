var game = Game.getInstance();
var cpuPlayer = new AIPlayer(game);

describe("AIPlayer", function() {

  describe("#findBestMove", function() {
    beforeEach(function() {
      game.reset();
    })

    it("should prioritize the center position on a blank board", function() {
      expect(cpuPlayer.findBestMove("X")).toEqual(4);
    });

    it("should play in a corner if the opponent plays center first", function() {
      game.board[4] = "O";
      expect([0, 2,6,8]).toContain(cpuPlayer.findBestMove("X"));
    })

    it("should complete one of its own lanes if possible", function() {
      game.board[0] = "X";
      game.board[1] = "X";
      expect(cpuPlayer.findBestMove("X")).toEqual(2);
    });

    it("should block the other player's lanes if needed", function() {
      game.board[0] = "O";
      game.board[1] = "O";
      expect(cpuPlayer.findBestMove("X")).toEqual(2);
    });

    it("should prioritize completing its own lane over blocking the enemy", function() {
      game.board[0] = "X";
      game.board[1] = "X";
      game.board[3] = "O";
      game.board[4] = "O";
      expect(cpuPlayer.findBestMove("X")).toEqual(2);
      expect(cpuPlayer.findBestMove("O")).toEqual(5);
    });



    describe('Specific board positions', function() {
      it("Case 1", function() {
        game.board[1] = "O";
        game.board[3] = "O";
        game.board[4] = "X";
        expect([0, 2, 6]).toContain(cpuPlayer.findBestMove("X"));
      })

      it("Case 2", function() {
        game.board[5] = "O";
        game.board[7] = "O";
        game.board[4] = "X";
        expect([2, 6, 8]).toContain(cpuPlayer.findBestMove("X"));
      })

      it("Case 3", function() {
        game.board[3] = "O";
        game.board[4] = "X";
        game.board[5] = "O";
        expect([0,2,6,8]).toContain(cpuPlayer.findBestMove("X"));
        game.board[0] = "X";
        game.board[8] = "O";
        expect([1,2]).toContain(cpuPlayer.findBestMove("X"));
      })

      it("Case 4", function() {
        game.board[0] = "O";
        game.board[4] = "X";
        game.board[8] = "O";
        expect([1,3,5,7]).toContain(cpuPlayer.findBestMove("X"));
      })
    })
  })
});
