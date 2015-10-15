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
  var solutions = []; //fixme
  //iterate through row 0
    //with row 0 as a starting point
    //check at each index how many rooks can be on the rest of the board
    //when we find a successful configuration
      //increment count
      //push solution to array
  //check hasAnyConflicts based on thi

  //place a rook somewhere
  //look through other squares and, if no col or row conflicts, place another rook
  //count how many rooks we've placed

  //take starting location, place rook there
  //check through other spaces - where else can we place rooks with no conflicts?
  //create new board of size n
  /*
  [1,0,0]
  [0,1,0]
  [0,0,1]

  [1,0,0]
  [0,0,1]
  [0,1,0]

  [0,1,0]
  [1,0,0]
  [0,0,1]



  [1,0]
  [0,0]

  [1,1]
  [0,0]
  [1,0]
  [1,0]
  [1,0]
  [0,1]

  [1,1]
  [0,0]

  [0,0,0]

  recurse([0,0,0]);
    recurse([1,0,0]);
    recurse([0,1,0]); [1,0,0]
    recurse([0,0,1]);[1,0,0]

  var recurse = function (startNode) {
    if (baseCase) {
      return;
    }

    for (var i = 0; i < 3; i++) {
      startNode[i] = 1;
      [1,0,0]
      //recurse(startNode);
      startNode[i] = 0;
      [0,0,0]
    }
  }

  var recurse = function (startNode) {
    if (baseCase) {
      return;
    }

    for (var i = 0; i < 3; i++) {
      startNode[i] = 1;
      //recurse(startNode);
      startNode[i] = 0;
    }
  }

                           11
                      12        3
                    14   15         6
                                    7

  var addTen = function((1 node)) {
    node.value = node.value + 10;
    for (var i = 0; i < children.length; i++) {
      addTen(children[i]);
    }
  }
        var addTen = function((2 node)) {
            node.value = node.value + 10;
           for (var i = 0; i < children.length; i++) {
              addTen(children[i]);
             }
            }

                                    var addTen = function((4 node)) {
                                     node.value = node.value + 10;
                                    for (var i = 0; i < children.length; i++) {
                                     addTen(children[i]);
                                      }
                                    }

                                    var addTen = function((5 node)) {
                                     node.value = node.value + 10;
                                    for (var i = 0; i < children.length; i++) {
                                     addTen(children[i]);
                                      }
                                    }

var arr = [1, 2, 3]
var solutions = [];
solutions.push[arr];
arr[0] = 5;
[5,2,3]
console.log(solutions[0]);


  [1,1]
  */
  var board = new Board({'n': n});

  var piecePlacer = function(currentRow, board, occupied) {
    //Node is a board configuration
    if (currentRow === n) {
      solutions.push(copyBoard(board));
      return;
    }

    if (solutions[0]) {
      return;
    }
    for (var col = 0; col < n; col++) {
      //if column is occupied
        //do nothing
      if (!occupied[col]) {
        occupied[col] = true;
        board.togglePiece(currentRow, col);
        piecePlacer(currentRow + 1, board, occupied);
        occupied[col] = false;
        board.togglePiece(currentRow, col);
      }
    }
  };

  piecePlacer(0, board, []);


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions[0]));
  return solutions[0];
};

var copyBoard = function(board) {
  var arr = board.rows();
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i].slice());
  }
  return result;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = [];

  var board = new Board({'n': n});

  var piecePlacer = function(currentRow, board, occupied) {
    //Node is a board configuration
    if (currentRow === n) {
      solutions.push(copyBoard(board));
      return;
    }

    for (var col = 0; col < n; col++) {
      //if column is occupied
        //do nothing
      if (!occupied[col]) {
        occupied[col] = true;
        board.togglePiece(currentRow, col);
        piecePlacer(currentRow + 1, board, occupied);
        occupied[col] = false;
        board.togglePiece(currentRow, col);
      }
    }
  };

  piecePlacer(0, board, []);

  console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
  return solutions.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = [];

  var board = new Board({'n': n});

  var piecePlacer = function(currentRow, board, colOccupied, majDiagOccupied, minDiagOccupied) {
    //Node is a board configuration
    if (currentRow === n) {
      solutions.push(copyBoard(board));
      return;
    }

    for (var col = 0; col < n; col++) {
      //if column is occupied
        //do nothing
      if (solutions[0]) {
        return;
      }
      if (!colOccupied[col] && !majDiagOccupied[col - currentRow] && !minDiagOccupied[col + currentRow]) {
        colOccupied[col] = true;
        majDiagOccupied[col - currentRow] = true;
        minDiagOccupied[col + currentRow] = true;
        board.togglePiece(currentRow, col);
        piecePlacer(currentRow + 1, board, colOccupied, majDiagOccupied, minDiagOccupied);
        colOccupied[col] = false;
        majDiagOccupied[col - currentRow] = false;
        minDiagOccupied[col + currentRow] = false;
        board.togglePiece(currentRow, col);
      }
    }
  };

  piecePlacer(0, board, [], [], []);

  if (solutions.length === 0) {
    solutions.push(new Board({'n': n}).rows());
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions[0]));
  return solutions[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
 var solutions = [];

  var board = new Board({'n': n});

  var piecePlacer = function(currentRow, board, colOccupied, majDiagOccupied, minDiagOccupied) {
    //Node is a board configuration
    if (currentRow === n) {
      solutions.push(copyBoard(board));
      return;
    }

    for (var col = 0; col < n; col++) {
      //if column is occupied
        //do nothing
      if (!colOccupied[col] && !majDiagOccupied[col - currentRow] && !minDiagOccupied[col + currentRow]) {
        colOccupied[col] = true;
        majDiagOccupied[col - currentRow] = true;
        minDiagOccupied[col + currentRow] = true;
        board.togglePiece(currentRow, col);
        piecePlacer(currentRow + 1, board, colOccupied, majDiagOccupied, minDiagOccupied);
        colOccupied[col] = false;
        majDiagOccupied[col - currentRow] = false;
        minDiagOccupied[col + currentRow] = false;
        board.togglePiece(currentRow, col);
      }
    }
  };

  piecePlacer(0, board, [], [], []);

  console.log('Number of solutions for ' + n + ' queens:', solutions.length);
  return solutions.length;
};
