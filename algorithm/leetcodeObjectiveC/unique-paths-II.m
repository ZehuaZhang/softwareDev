// 63. Unique Paths II
// Difficulty: Medium

// Follow up for "Unique Paths":

// Now consider if some obstacles are added to the grids. How many unique paths would there be?

// An obstacle and empty space is marked as 1 and 0 respectively in the grid.

// For example,
// There is one obstacle in the middle of a 3x3 grid as illustrated below.

// [
//   [0,0,0],
//   [0,1,0],
//   [0,0,0]
// ]
// The total number of unique paths is 2.

// Note: m and n will be at most 100.

// Time : O(m * n)
// Space: O(n)

#import <Foundation/Foundation.h>

int uniquePathsWithObstacles(NSArray* obstacleGrid) {
  const NSInteger m = [obstacleGrid count];
  const NSInteger n = [obstacleGrid[0] count];
  if ([obstacleGrid[0][0] intValue] || [obstacleGrid[m - 1][n - 1] intValue]) {
    return 0;
  }
  int f[n];
  memset(f, 0, sizeof(int) * n);
  f[0] = 1;
  for (int i = 0; i < m; i++) {
    f[0] = [obstacleGrid[i][0] boolValue]  ? 0 : f[0];
    for (int j = 1; j < n; j++) {
      f[j] = [obstacleGrid[i][j] boolValue] ? 0 : (f[j] + f[j - 1]);
    }
  }
  return f[n - 1];
}

