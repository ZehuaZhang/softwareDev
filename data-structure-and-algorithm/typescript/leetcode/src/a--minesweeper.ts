// 529. Minesweeper

// Let's play the minesweeper game (Wikipedia, online game)!

// You are given a 2D char matrix representing the game board. 'M' represents an unrevealed mine, 'E' represents an unrevealed empty square, 'B' represents a revealed blank square that has no adjacent (above, below, left, right, and all 4 diagonals) mines, digit ('1' to '8') represents how many mines are adjacent to this revealed square, and finally 'X' represents a revealed mine.

// Now given the next click position (row and column indices) among all the unrevealed squares ('M' or 'E'), return the board after revealing this position according to the following rules:

// If a mine ('M') is revealed, then the game is over - change it to 'X'.
// If an empty square ('E') with no adjacent mines is revealed, then change it to revealed blank ('B') and all of its adjacent unrevealed squares should be revealed recursively.
// If an empty square ('E') with at least one adjacent mine is revealed, then change it to a digit ('1' to '8') representing the number of adjacent mines.
// Return the board when no more squares will be revealed.

// Example 1:

// Input:

// [['E', 'E', 'E', 'E', 'E'],
//  ['E', 'E', 'M', 'E', 'E'],
//  ['E', 'E', 'E', 'E', 'E'],
//  ['E', 'E', 'E', 'E', 'E']]

// Click : [3,0]

// Output:

// [['B', '1', 'E', '1', 'B'],
//  ['B', '1', 'M', '1', 'B'],
//  ['B', '1', '1', '1', 'B'],
//  ['B', 'B', 'B', 'B', 'B']]

function updateBoard(board: string[][], click: number[]): string[][] {
  const [rows, cols] = [board.length, board[0].length];
  const [row, col] = click;

  if (board[row][col] === 'M') {
    board[row][col] = 'X';
    return board;
  }

  updateBoardHelper(row, col);
  return board;

  function updateBoardHelper(row: number, col: number): void {
    if (board[row][col] === 'B') {
      return;
    }

    const mines = countMines(row, col);
    if (mines) {
      board[row][col] = mines.toString();
      return;
    }

    board[row][col] = 'B';

    for (const [dx, dy] of [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ]) {
      const [x, y] = [row + dx, col + dy];

      if (x >= 0 && x < board.length && y >= 0 && y < board[0].length) {
        updateBoardHelper(x, y);
      }
    }
  }

  function countMines(row: number, col: number): number {
    let count = 0;
    for (const [dx, dy] of [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ]) {
      const [x, y] = [row + dx, col + dy];
      if (
        x >= 0 &&
        x < board.length &&
        y >= 0 &&
        y < board[0].length &&
        board[x][y] === 'M'
      ) {
        ++count;
      }
    }
    return count;
  }
}
