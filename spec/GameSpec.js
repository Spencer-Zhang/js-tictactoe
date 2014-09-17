describe("Game", function() {
  beforeEach(function() {
    Game.reset();
  })

  describe("#reset", function() {
    it("should start a new game", function() {
      expect(Game.isPlaying).toEqual(true);
    })

    it("should create a blank board", function() {
      var i;
      expect(Game.board.length).toEqual(9);
      for(i=0; i<9; i++) {
        expect(Game.board[i]).toEqual(undefined);
      }
    });
  });

  describe("#countPieces", function() {
    beforeEach(function() {
      Game.board[0] = "O";
      Game.board[1] = "X";
      Game.board[2] = "O";
      Game.board[3] = "X";
      Game.board[4] = "O";
    })

    it("should return the correct number of Os and Xs in a lane", function() {
      count = Game.countPieces([0,1,2])
      expect(count.O).toEqual(2);
      expect(count.X).toEqual(1);

      count = Game.countPieces([3,4,5])
      expect(count.O).toEqual(1);
      expect(count.X).toEqual(1);
    })

    it("should return the total number of Os and Xs if no parameter is given", function() {
      count = Game.countPieces()
      expect(count.O).toEqual(3);
      expect(count.X).toEqual(2);
    })
  })

  describe("#clickBox", function() {
    it("should fill an empty box", function() {
      Game.clickBox(0, "O");
      expect(Game.board[0]).toEqual("O");
    });

    it("should not fill a box that's already filled", function() {
      Game.clickBox(0, "O");
      Game.clickBox(0, "X");
      expect(Game.board[0]).toEqual("O");
    });
  });

  describe("checkVictoryConditions", function() {
    it("does not end the game if conditions are not met", function() {
      Game.checkVictoryConditions();
      expect(Game.isPlaying).toEqual(true);
    });

    it("ends the game if a player wins", function() {
      Game.board[0] = "X";
      Game.board[1] = "X";
      Game.board[2] = "X";
      Game.checkVictoryConditions();
      expect(Game.isPlaying).toEqual(false);
    });

    it("ends the game if all spaces on the board are filled", function() {
      Game.board = ["X", "O", "X", 
                    "X", "O", "O", 
                    "O", "X", "X"];
      Game.checkVictoryConditions();
      expect(Game.isPlaying).toEqual(false);
    })
  })
});



describe("#findBestMove", function() {
  beforeEach(function() {
    Game.reset();
  })

  it("should prioritize the center position on a blank board", function() {
    expect(findBestMove("X")).toEqual(4);
  });

  it("should play in a corner if the opponent plays center first", function() {
    Game.board[4] = "O";
    expect([0, 2,6,8]).toContain(findBestMove("X"));
  })

  it("should complete one of its own lanes if possible", function() {
    Game.board[0] = "X";
    Game.board[1] = "X";
    expect(findBestMove("X")).toEqual(2);
  });

  it("should block the other player's lanes if needed", function() {
    Game.board[0] = "O";
    Game.board[1] = "O";
    expect(findBestMove("X")).toEqual(2);
  });

  it("should prioritize completing its own lane over blocking the enemy", function() {
    Game.board[0] = "X";
    Game.board[1] = "X";
    Game.board[3] = "O";
    Game.board[4] = "O";
    expect(findBestMove("X")).toEqual(2);
    expect(findBestMove("O")).toEqual(5);
  });
})