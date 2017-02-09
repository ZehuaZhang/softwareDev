// 54. Spiral Matrix
// Difficulty: Medium
// Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.

// For example,
// Given the following matrix:

// [
//  [ 1, 2, 3 ],
//  [ 4, 5, 6 ],
//  [ 7, 8, 9 ]
// ]
// You should return [1,2,3,6,9,8,7,4,5].

// Time:  O(m * n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* spiralOrder(NSArray *matrix) {
  NSMutableArray *arr = @[].mutableCopy;
  
  NSInteger top = 0;
  NSInteger bottom = [matrix count] - 1;
  NSInteger left = 0;
  NSInteger right = [matrix count] ? [matrix[0] count] - 1 : 0;
  
  while (left <= right) {
    for (NSInteger j = left; j <= right; j++) {
      [arr addObject:matrix[top][j]];
    }
    for (NSInteger i = top + 1; i <= bottom; i++) {
      [arr addObject:matrix[i][right]];
    }
    for (NSInteger j = right - 1; j >= left; j--) {
      [arr addObject:matrix[bottom][j]];
    }
    for (NSInteger i = bottom - 1; i >= top + 1; i--) {
      [arr addObject:matrix[i][left]];
    }
    left++;
    right--;
    top++;
    bottom--;
  }
  return [arr copy];
}