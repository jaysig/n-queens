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
  var solution;

  placePiece(0, emptyBoard(n), 0,function(board){
    return solution = copyBoardBitsToArray(board);
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  placePiece(0, emptyBoard(n), 0,function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;

  piecePlacerQ(0, emptyBoard(n), 0, 0, 0, function(board){
   return solution = copyBoardBitsToArray(board);
  });

  if (!solution) {
    solution = new Board({'n': n}).rows();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
 var solutionCount = 0;

  piecePlacerQ(0, emptyBoard(n), 0, 0, 0,function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var placePiece = function(currentRow, board, colBits, onFind) {
  if (currentRow === board.length) {
    return onFind(board);
  }

  var bit, result, possibilities = ~colBits & ((1 << board.length)-1);
  while (bit = (possibilities & -possibilities)){
    //bit represents the place where we are placing our next queen
    possibilities -= bit;
    board[currentRow] = bit | 0;
    result = placePiece(currentRow + 1,board, colBits | bit, onFind);
    if(result) {
      return result;
    }
    board[currentRow] = 0;
  }
};

var piecePlacerQ = function(currentRow, board, colBits, majDiagBits, minDiagBits, onFind) {
  if (currentRow === board.length) {
    return onFind(board);
  }

  var bit, result, possibilities = ~(colBits | majDiagBits | minDiagBits) & ((1 << board.length)-1);
  while (bit = (possibilities & -possibilities)){
    //bit represents the place where we are placing our next queen
    possibilities -= bit;
    board[currentRow] = bit | 0;
    result = piecePlacerQ(currentRow + 1,board, colBits | bit, (majDiagBits | bit) << 1, (minDiagBits | bit) >> 1, onFind);
    if(result) {
      return result;
    }
    board[currentRow] = 0;
  }
};

var copyBoardBitsToArray = function(board) {
  var arr = [];
  for(var u = 0; u < board.length; u++) {
    arr[u] = [];
    for(var w = 0; w<board.length; w++) {
      arr[u][w] = board[u] >> (board.length - w - 1) & 1;
    }
  }
  return arr;
};

var emptyBoard = function(n){
  var board = [];
  for(var z =0;z<n;z++){
    board[z]=0;
  }
  return board;
};
