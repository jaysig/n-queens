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
  emptyBoard(n);

  piecePlacer(0, emptyBoard(n), 0,function(board){
    for(var u=0; u< n;u++){
      solution[u]=[];
      for(var w = 0;w<n;w++){
        solution[u][w] = board[u] >> (n-w-1) & 1;
      }
    }
    return solution;
  });


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

var piecePlacer = function(currentRow, board, colBits, onFind) {
  if (currentRow === board.length) {
    return onFind(board);
  }
  var possibilities = ~colBits & ((1 << board.length)-1);
  var bit;
  var result;
  while (bit = (possibilities & -possibilities)){
    //bit represents the place where we are placing our next queen
    possibilities -= bit;
    board[currentRow]= bit | 0;
    result = piecePlacer(currentRow + 1,board, colBits | bit, onFind);
    if(result){
      return result;
    }
    board[currentRow]=0;
  }
};

var copyBoard = function(board) {
  var arr = board.rows();
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i].slice());
  }
  return result;
};
var emptyBoard = function(n){
  var board = [];
  for(var z =0;z<n;z++){
    board[z]=0;
  }
  return board;
}


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionsCount = 0;
  //var board = emptyBoard(n);


  piecePlacer(0, emptyBoard(n), 0,function(){
    solutionsCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionsCount);
  return solutionsCount;
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
