// 73. Set Matrix Zeroes
// Difficulty: Medium

// Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in place.

// Follow up:
// Did you use extra space?
// A straight forward solution using O(mn) space is probably a bad idea.
// A simple improvement uses O(m + n) space, but still not the best solution.
// Could you devise a constant space solution?

// Time:  O(m * n)
// Space: O(1)

#import <Foundation/Foundation.h>

void setZeroes(NSArray** matrix) {
  if (![*matrix count]) {
    return;
  }
  
  bool hasZero = NO;
  int firstRowZero = -1, firstColZero = -1;
  
  for (int i = 0; i < [*matrix count]; ++i) {
    for (int j = 0; j < [(*matrix)[0] count]; ++j) {
      if ([matrix[i][j] intValue] == 0) {
        // set first zero found
        if (!hasZero) {
          firstRowZero = i;
          firstColZero = j;
          hasZero = YES;
        }
        // cast shadows of every zero element, onto 1st found-zero col & row
        (*matrix)[firstRowZero][j] = @0;
        (*matrix)[i][firstColZero] = @0;
      }
    }
  }
  
  if (hasZero) {
    // process shadows
    for (int i = 0; i < [*matrix count]; ++i) {
      if (i == firstRowZero) {
        continue;
      }
      for (int j = 0; j < [matrix[0] count]; ++j) {
        if (j == firstColZero) {
          continue;
        }
        if ([(*matrix)[firstRowZero][j] intValue] == 0 || [(*matrix)[i][firstColZero] intValue] == 0) {
          (*matrix)[i][j] = @0;
        }
      }
    }
    // process 1st found-zero col
    for (int i = 0; i < [*matrix count]; ++i) {
      (*matrix)[i][firstColZero] = @0;
    }
    // process 1st found-zero row
    for (int j = 0; j < [(*matrix)[0] count]; ++j) {
      (*matrix)[firstRowZero][j] = @0;
    }
  }
}