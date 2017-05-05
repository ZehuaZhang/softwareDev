// 279. Perfect Squares
// Difficulty: Medium

// Given a positive integer n, find the least number of perfect square numbers
// (for example, 1, 4, 9, 16, ...) which sum to n.

// For example, given n = 12, return 3 because 12 = 4 + 4 + 4; given n = 13, return 2 because 13 = 4 + 9.

// Time:  O(n * sqrt(n))
// Space: O(n)

#import <Foundation/Foundation.h>

int numSquares(int n) {
  NSMutableArray* minSquares = @[@0].mutableCopy;
  while (minSquares.count <= n) {
    int squares = INT_MAX;
    for (NSInteger i = 1; i * i <= minSquares.count; ++i) {
      squares = MIN(squares, [minSquares[minSquares.count - i * i] intValue] + 1);
    }
    [minSquares addObject:@(squares)];
  }
  return [minSquares[n] intValue];
}