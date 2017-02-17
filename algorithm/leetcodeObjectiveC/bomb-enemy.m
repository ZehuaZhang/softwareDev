// 361. Bomb Enemy
// Difficulty : Medium

// Given a 2D grid, each cell is either a wall 'W', an enemy 'E' or empty '0' (the number zero),
// return the maximum enemies you can kill using one bomb.
// The bomb kills all the enemies in the same row and column from the planted point
// until it hits the wall since the wall is too strong to be destroyed.
// Note that you can only put the bomb at an empty cell.

// Example:
// For the given grid

// 0 E 0 0
// E 0 W E
// 0 E 0 0

// return 3. (Placing a bomb at (1,1) kills 3 enemies)

// Time:  O(m * n)
// Space: O(m * n)

#import <Foundation/Foundation.h>

int maxKilledEnemies(NSArray* grid) {
  if (![grid count] || ![grid[0] count]) {
    return 0;
  }
  NSInteger m = grid.count, n = [grid[0] count];
  int rowCnt = 0, colCnt[n];
  int result = 0;
  
  for (int i = 0; i < m; ++i) {
    for (int j = 0; j < n; ++j) {
      if (j == 0 || [grid[i][j - 1] charValue] == 'W') {
        rowCnt = 0;
        for (int k = j; k < n && [grid[i][k] charValue] != 'W'; ++k) {
          rowCnt += [grid[i][k] charValue] == 'E';
        }
      }
      if (i == 0 || [grid[i - 1][j] charValue] == 'W') {
        colCnt[j] = 0;
        for (int k = i; k < m && [grid[k][j] charValue] != 'W'; ++k) {
          colCnt[j] += [grid[k][j] charValue] == 'E';
        }
      }
      if ([grid[i][j] charValue] == '0') {
        result = MAX(result, rowCnt + colCnt[j]);
      }
    }
  }
  return result;
}