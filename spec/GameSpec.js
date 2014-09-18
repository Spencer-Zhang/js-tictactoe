describe("Game", function() {
  beforeEach(function() {
    game = new Game();
  })

  describe("#reset", function() {
    it("should create a blank board", function() {
      var i;
      expect(game.board.length).toEqual(9);
      for(i=0; i<9; i++) {
        expect(game.board[i]).toEqual(undefined);
      }
    });
  });

  describe("#countPieces", function() {
    beforeEach(function() {
      game.board[0] = "O";
      game.board[1] = "X";
      game.board[2] = "O";
      game.board[3] = "X";
      game.board[4] = "O";
    })

    it("should return the correct number of Os and Xs in a lane", function() {
      count = game.countPieces([0,1,2])
      expect(count.O).toEqual(2);
      expect(count.X).toEqual(1);

      count = game.countPieces([3,4,5])
      expect(count.O).toEqual(1);
      expect(count.X).toEqual(1);
    })

    it("should return the total number of Os and Xs if no parameter is given", function() {
      count = game.countPieces()
      expect(count.O).toEqual(3);
      expect(count.X).toEqual(2);
    })
  })

  describe("#playMove", function() {
    it("should fill an empty box", function() {
      game.playMove(0, "O");
      expect(game.board[0]).toEqual("O");
    });

    it("should not fill a box that's already filled", function() {
      game.playMove(0, "O");
      game.playMove(0, "X");
      expect(game.board[0]).toEqual("O");
    });
  });

  describe("#checkWinner", function() {
    it("returns falsy if no player has won", function() {
      expect(game.checkWinner()).toBeFalsy();
    })

    it("return the winning player and lane if a row is filled", function() {
      game.board[0] = "X";
      game.board[1] = "X";
      game.board[2] = "X";
      winner = game.checkWinner()
      expect(winner.player).toEqual("X");
      expect(winner.lane).toEqual(0);
    });
  });

  describe("#isTied", function() {
    it("returns true if all spaces on the board are filled", function() {
      game.board = ["X", "O", "X", 
                    "X", "O", "O", 
                    "O", "X", "X"];
      expect(game.isTied()).toEqual(true);
    })
  })

  describe("#isPlaying", function() {
    it("returns true when the board is blank", function() {
      expect(game.isPlaying()).toEqual(true);
    })

    it("returns false if all spaces on the board are filled", function() {
      game.board = ["X", "O", "X", 
                    "X", "O", "O", 
                    "O", "X", "X"];
      expect(game.isPlaying()).toEqual(false);
    })

    it("return false if a row is filled", function() {
      game.board[0] = "X";
      game.board[1] = "X";
      game.board[2] = "X";
      expect(game.isPlaying()).toEqual(false);
    });
  })
});



describe("AI", function() {
  describe("#findBestMove", function() {
    beforeEach(function() {
      game = new Game();
    })

    it("should prioritize the center position on a blank board", function() {
      expect(AI.findBestMove("X")).toEqual(4);
    });

    it("should play in a corner if the opponent plays center first", function() {
      game.board[4] = "O";
      expect([0, 2,6,8]).toContain(AI.findBestMove("X"));
    })

    it("should complete one of its own lanes if possible", function() {
      game.board[0] = "X";
      game.board[1] = "X";
      expect(AI.findBestMove("X")).toEqual(2);
    });

    it("should block the other player's lanes if needed", function() {
      game.board[0] = "O";
      game.board[1] = "O";
      expect(AI.findBestMove("X")).toEqual(2);
    });

    it("should prioritize completing its own lane over blocking the enemy", function() {
      game.board[0] = "X";
      game.board[1] = "X";
      game.board[3] = "O";
      game.board[4] = "O";
      expect(AI.findBestMove("X")).toEqual(2);
      expect(AI.findBestMove("O")).toEqual(5);
    });

    describe('Specific board positions', function() {
      it("Case 1", function() {
        game.board[1] = "O";
        game.board[3] = "O";
        game.board[4] = "X";
        expect([0, 2, 6]).toContain(AI.findBestMove("X"));
      })

      it("Case 2", function() {
        game.board[5] = "O";
        game.board[7] = "O";
        game.board[4] = "X";
        expect([2, 6, 8]).toContain(AI.findBestMove("X"));
      })
    })
  })
});
