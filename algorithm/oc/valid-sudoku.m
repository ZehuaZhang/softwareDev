// 36. Valid Sudoku
// Difficulty: Easy

// Determine if a Sudoku is valid, according to: Sudoku Puzzles - The Rules.

// The Sudoku board could be partially filled, where empty cells are filled with the character '.'.

// Note:
// A valid Sudoku board (partially filled) is not necessarily solvable. Only the filled cells need to be validated.

// Time:  O(9^2)
// Space: O(9)

#import <Foundation/Foundation.h>

BOOL isValid(char c, BOOL *used) {
  if (c == '.') {
    return YES;
  }
  if (used[c - '1']) {
    return NO;
  }
  return used[c - '1'] = YES;
}

BOOL isValidSudoku(NSArray* board) {
  BOOL used[9];
  
  for (int k = 0; k < 9; ++k) {
    memset(used, NO, sizeof(BOOL) * 9);
    // check row
    for (int col = 0; col < 9; col++) {
      if (!isValid([board[k][col] charValue], used)) {
        return NO;
      }
    }
    
    memset(used, NO, sizeof(BOOL) * 9);
    // check row
    for (int row = 0; row < 9; row++) {
      if (!isValid([board[row][k] charValue], used)) {
        return NO;
      }
    }
  }
  
  // check each 3x3
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      memset(used, NO, sizeof(BOOL) * 9);
      
      for (int row = i * 3; row < i * 3 + 3; row++) {
        for (int col = j * 3; col < j * 3 + 3; col++) {
          if (!isValid([board[row][col] charValue], used)) {
            return NO;
          }
        }
      }
    }
  }
  return YES;
}