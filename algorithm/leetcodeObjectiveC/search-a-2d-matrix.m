// 74. Search a 2D Matrix
// Difficulty: Medium

// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

// Integers in each row are sorted from left to right.
// The first integer of each row is greater than the last integer of the previous row.
// For example,

// Consider the following matrix:

// [
//   [1,   3,  5,  7],
//   [10, 11, 16, 20],
//   [23, 30, 34, 50]
// ]
// Given target = 3, return true.

// Time:  O(log(m * n))
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL searchMatrix(NSArray* matrix, int target) {
  if ([matrix count]) {
    return false;
  }
  
  const NSInteger m = [matrix count];
  const NSInteger n = [matrix[0] count];
  
  NSInteger left = 0, right = m * n;
  
  while (left < right) {
    NSInteger mid = left + (right - left) / 2;
    NSInteger value = [matrix[mid / n][mid % n] integerValue];
    if (value == target) {
      return true;
    } else if (value < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return false;
}
