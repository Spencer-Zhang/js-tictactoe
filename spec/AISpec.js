var game = Game.getInstance;
var cpuPlayer = new AIPlayer();

describe("AIPlayer", function() {

  describe("#findBestMoves", function() {
    beforeEach(function() {
      Game.reset();
    })

    it("should play in a corner if the opponent plays center first", function() {
      game().board[4] = "O";
      expect(cpuPlayer.findBestMoves("X")).toEqual([0,2,6,8]);
    })

    it("should complete one of its own lanes if possible", function() {
      game().board[0] = "X";
      game().board[1] = "X";
      expect(cpuPlayer.findBestMoves("X")).toEqual([2]);
    });

    it("should block the other player's lanes if needed", function() {
      game().board[0] = "O";
      game().board[1] = "O";
      game().board[4] = "X";
      expect(cpuPlayer.findBestMoves("X")).toEqual([2]);
    });

    it("should prioritize completing its own lane over blocking the enemy", function() {
      game().board = ["X", "X",    ,
                      "O", "O",    ,
                         ,    ,    ];
      expect(cpuPlayer.findBestMoves("X")).toEqual([2]);
      expect(cpuPlayer.findBestMoves("O")).toEqual([5]);
    });



    describe('Specific board positions', function() {
      it("Case 1", function() {
        game().board[1] = "O";
        game().board[3] = "O";
        game().board[4] = "X";
        expect(cpuPlayer.findBestMoves("X")).toEqual([0, 2, 6]);
      })

      it("Case 2", function() {
        game().board[5] = "O";
        game().board[7] = "O";
        game().board[4] = "X";
        expect(cpuPlayer.findBestMoves("X")).toEqual([2, 6, 8]);
      })

      it("Case 3", function() {
        game().board[0] = "O";
        game().board[4] = "X";
        game().board[8] = "O";
        expect(cpuPlayer.findBestMoves("X")).toEqual([1,3,5,7]);
      })

      it("Case 4", function() {
        game().board = ["O", "X", "O",
                           , "X",    ,
                        "X", "O", "O"];
        expect(cpuPlayer.findBestMoves("X")).toEqual([5]);
      })

    })
  })
});
