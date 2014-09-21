var game = Game.getInstance();

describe("Game", function() {  
  beforeEach(function() {
    game.reset();
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

    it("should not fill a box if the game is already over", function() {
      game.board[0] = "X";
      game.board[1] = "X";
      game.board[2] = "X";
      game.playMove(3, "O");
      expect(game.board[3]).toEqual(undefined);
    })
  });



  describe("#winnerExists", function() {
    it("returns false if no player has won", function() {
      expect(game.winnerExists()).toEqual(false);;
    })

    it("return the winning player and lane if a row is filled", function() {
      game.board[0] = "X";
      game.board[1] = "X";
      game.board[2] = "X";
      expect(game.winnerExists()).toEqual(true);
    });
  });

  

  describe("#getWinnerData", function() {
    it("return the winning player and lane if a row is filled", function() {
      game.board[0] = "X";
      game.board[1] = "X";
      game.board[2] = "X";
      winner = game.getWinnerData();
      expect(winner.player).toEqual("X");
      expect(winner.lane).toEqual(0);
    });

    it("returns undefined if there is no winner", function() {
      expect(game.getWinnerData()).toEqual(undefined);
    });
  })

  

  describe("#isTied", function() {
    it("returns false if the board is not filled", function() {
      game.board = ["X", "O", "X", 
                    "X", undefined, "O", 
                    "O", "X", "X"];
      expect(game.isTied()).toEqual(false);
    })

    it("returns true if all spaces on the board are filled", function() {
      game.board = ["X", "O", "X", 
                    "X", "O", "O", 
                    "O", "X", "X"];
      expect(game.isTied()).toEqual(true);
    })

    if("returns false if all spaces on the board are filled, but a winner exists", function() {
      game.board = ["X", "O", "O", 
                    "O", "X", "O", 
                    "X", "O", "X"];
      expect(game.isTied()).toEqual(false);
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
