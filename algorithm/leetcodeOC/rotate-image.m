// 48. Rotate Image
// Difficulty: Medium
// You are given an n x n 2D matrix representing an image.

// Rotate the image by 90 degrees (clockwise).

// Follow up:
// Could you do this in-place?

// Time:  O(n^2)
// Space: O(1)

#import <Foundation/Foundation.h>

void swap(NSMutableArray** matrix, NSInteger i1, NSInteger j1, NSInteger i2, NSInteger j2) {
  NSNumber* num1 = [[*matrix objectAtIndex:i1] objectAtIndex:j1];
  NSNumber* num2 = [[*matrix objectAtIndex:i2] objectAtIndex:j2];
  [[*matrix objectAtIndex:i1] replaceObjectAtIndex:j1 withObject:num2];
  [[*matrix objectAtIndex:i2] replaceObjectAtIndex:j2 withObject:num1];
}

void rotate(NSMutableArray** matrix) {
  NSInteger n = [*matrix count];
  // horizontal
  for (NSInteger i = 0; i < n / 2; i++) {
    for (NSInteger j = 0; j < n; j++) {
      swap(matrix, i, j, n - 1 - i, j);
    }
  }
  // diagonal
  for (NSInteger i = 0; i < n; i++) {
    for (NSInteger j = 0; j < i; j++) {
      swap(matrix, i, j, j, i);
    }
  }
}