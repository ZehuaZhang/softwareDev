// 200. Number of Islands
// Difficulty: Medium

// Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
// You may assume all four edges of the grid are all surrounded by water.

// Example 1:

// 11110
// 11010
// 11000
// 00000
// Answer: 1

// Example 2:

// 11000
// 11000
// 00100
// 00011
// Answer: 3

#import <Foundation/Foundation.h>

void numIslandsDFS(NSArray* grid, NSMutableArray** visited, NSInteger x, NSInteger y) {
  if (x < 0 || x >= [grid count] ||
      y < 0 || y >= [grid[0] count]) {
    return;
  }
  if ([grid[x][y] intValue] != '1' || [(*visited)[x][y] boolValue]) {
    return;
  }
  (*visited)[x][y] = @(YES);
  numIslandsDFS(grid, visited, x - 1, y);
  numIslandsDFS(grid, visited, x + 1, y);
  numIslandsDFS(grid, visited, x, y - 1);
  numIslandsDFS(grid, visited, x, y + 1);
}

int numIslands(NSArray* grid) {
  if (![grid count] || ![grid[0] count]) {
    return 0;
  }
  NSInteger m = [grid count], n = [grid[0] count];
  int result = 0;
  NSMutableArray* visited = @[].mutableCopy;
  for (NSInteger i = 0; i < m; i++) {
    [visited addObject:@[].mutableCopy];
    for (NSInteger j = 0; j < n; j++) {
      [visited[i] addObject:@(NO)];
    }
  }
  
  for (NSInteger i = 0; i < m; ++i) {
    for (NSInteger j = 0; j < n; ++j) {
      if ([grid[i][j] charValue]== '1' && ![visited[i][j] boolValue]) {
        numIslandsDFS(grid, &visited, i, j);
        ++result;
      }
    }
  }
  return result;
}
