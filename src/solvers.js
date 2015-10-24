/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  var board = new Board({
    'n': n
  });
  var piecePlacer = function(board, currentRow, occupied) {
    //For the length of the board
    //Check if a piece can go there
    // solution = []; //Need an empty array to hold the solution
    if (currentRow === n) {
      solution.push(copyBoard(board)); //board)
      return;
    }
    if (solution[0]) { //If there's one solution. Stop cycling.
      return;
    }
    for (var col = 0; col < n; col++) {
      //Check if occupied. Not sure how
      if (!occupied[col]) {
        //If so Toogle the Piece
        occupied[col] = true;
        board.togglePiece(currentRow, col);
        //piecePlacer on row +1 Col +1
        piecePlacer(board, currentRow + 1, occupied);
        occupied[col] = false;
        board.togglePiece(currentRow, col);
      }
    }
  };
  piecePlacer(board, 0, []);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution[0];
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = [];
  var board = new Board({
    'n': n
  });
  var piecePlacer = function(board, currentRow, occupied) {
    //For the length of the board
    //Check if a piece can go there
    // solution = []; //Need an empty array to hold the solution
    if (currentRow === n) {
      solutions.push(copyBoard(board)); //board)
      return;
    }
    for (var col = 0; col < n; col++) {
      //Check if occupied. Not sure how
      if (!occupied[col]) {
        //If so Toogle the Piece
        occupied[col] = true;
        board.togglePiece(currentRow, col);
        //piecePlacer on row +1 Col +1
        piecePlacer(board, currentRow + 1, occupied);
        occupied[col] = false;
        board.togglePiece(currentRow, col);
      }
    }
  };
  piecePlacer(board, 0, []);
  console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
  return solutions.length;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var copyBoard = function(board) {
  var arr = board.rows(); //gives us arrays of all the rows
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i].slice());
  }
  return result;
};
