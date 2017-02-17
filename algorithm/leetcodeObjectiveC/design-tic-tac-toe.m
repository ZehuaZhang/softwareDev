// 348. Design Tic-Tac-Toe
// Difficulty : Medium

// Design a Tic-tac-toe game that is played between two players on a n x n grid.

// You may assume the following rules:

// A move is guaranteed to be valid and is placed on an empty block.
// Once a winning condition is reached, no more moves is allowed.
// A player who succeeds in placing n of their marks in a horizontal, vertical, or diagonal row wins the game.
// Example:
// Given n = 3, assume that player 1 is "X" and player 2 is "O" in the board.

// TicTacToe toe = new TicTacToe(3);

// toe.move(0, 0, 1); -> Returns 0 (no one wins)
// |X| | |
// | | | | // Player 1 makes a move at (0, 0).
// | | | |

// toe.move(0, 2, 2); -> Returns 0 (no one wins)
// |X| |O|
// | | | | // Player 2 makes a move at (0, 2).
// | | | |

// toe.move(2, 2, 1); -> Returns 0 (no one wins)
// |X| |O|
// | | | | // Player 1 makes a move at (2, 2).
// | | |X|

// toe.move(1, 1, 2); -> Returns 0 (no one wins)
// |X| |O|
// | |O| | // Player 2 makes a move at (1, 1).
// | | |X|

// toe.move(2, 0, 1); -> Returns 0 (no one wins)
// |X| |O|
// | |O| | // Player 1 makes a move at (2, 0).
// |X| |X|

// toe.move(1, 0, 2); -> Returns 0 (no one wins)
// |X| |O|
// |O|O| | // Player 2 makes a move at (1, 0).
// |X| |X|

// toe.move(2, 1, 1); -> Returns 1 (player 1 wins)
// |X| |O|
// |O|O| | // Player 1 makes a move at (2, 1).
// |X|X|X|
// Follow up:
// Could you do better than O(n2) per move() operation?

// Hint:

// Could you trade extra space such that move() operation can be done in O(1)?
// You need two arrays: int rows[n], int cols[n], plus two variables: diagonal, anti_diagonal.

/**
 * Your TicTacToe object will be instantiated and called as such:
 * TicTacToe obj = new TicTacToe(n);
 * int param_1 = obj.move(row,col,player);
 */

// Time:  O(1), per move.
// Space: O(n^2)

#import <Foundation/Foundation.h>

@interface TicTacToe : NSObject
@end

@implementation TicTacToe

NSMutableArray* _rows;
NSMutableArray* _cols;
NSMutableArray* _diag;
NSMutableArray* _antiDiag;

-(instancetype)initWithSize:(int)n {
  self = [super init];
  if (self) {
    _rows = @[].mutableCopy;
    _cols = @[].mutableCopy;
    _diag = @[@0, @0].mutableCopy;
    _antiDiag = @[@0, @0].mutableCopy;
    for (int i = 0; i < n; i++) {
      _rows[i] = @[@0, @0].mutableCopy;
      _cols[i] = @[@0, @0].mutableCopy;
    }
  }
  return self;
}

/** Player {player} makes a move at ({row}, {col}).
 @param row The row of the board.
 @param col The column of the board.
 @param player The player, can be either 1 or 2.
 @return The current winning condition, can be either:
 0: No one wins.
 1: Player 1 wins.
 2: Player 2 wins. */
-(int)moveRow:(int)row col:(int)col player:(int)player {
  int i = player - 1;
  _rows[row][i] = @([_rows[row][i] intValue] + 1);
  _cols[col][i] = @([_cols[col][i] intValue] + 1);
  if (row == col) {
    _diag[i] = @([_diag[i] intValue] + 1);
  }
  if (col + row == _rows.count - 1) {
    _antiDiag[i] = @([_antiDiag[i] intValue] + 1);
  }
  if ([_rows[row][i] intValue] == _rows.count ||
      [_cols[col][i] intValue] == _cols.count ||
      [_diag[i] intValue] == _rows.count ||
      [_antiDiag[i] intValue] == _cols.count) {
    return player;
  }
  return 0;
}

@end