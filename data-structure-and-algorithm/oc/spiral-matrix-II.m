// 59. Spiral Matrix II
// Difficulty: Medium
// Given an integer n, generate a square matrix filled with elements from 1 to n2 in spiral order.

// For example,
// Given n = 3,

// You should return the following matrix:
// [
//  [ 1, 2, 3 ],
//  [ 8, 9, 4 ],
//  [ 7, 6, 5 ]
// ]

// Time:  O(n^2)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* generateMatrix(int n) {
  NSMutableArray *arr = [NSMutableArray arrayWithCapacity:n];
  
  for (int i = 0; i < n; i++) {
    arr[i] = [NSMutableArray arrayWithCapacity:n];
    for (int j = 0; j < n; j++) {
      [arr[i] addObject:@0];
    }
  }
  NSInteger digit = 1;
  
  NSInteger top = 0;
  NSInteger bottom = n - 1;
  NSInteger left = 0;
  NSInteger right = n - 1;
  
  while (left <= right) {
    for (NSInteger j = left; j <= right; j++) {
      arr[top][j] = @(digit++);
    }
    for (NSInteger i = top + 1; i <= bottom; i++) {
      arr[i][right] = @(digit++);
    }
    for (NSInteger j = right - 1; j >= left; j--) {
      arr[bottom][j] = @(digit++);
    }
    for (NSInteger i = bottom - 1; i >= top + 1; i--) {
      arr[i][left] = @(digit++);
    }
    left++;
    right--;
    top++;
    bottom--;
  }
  return [arr copy];
}