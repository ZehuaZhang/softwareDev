// 36. Valid Sudoku
// Difficulty: Easy

// Determine if a Sudoku is valid, according to: Sudoku Puzzles - The Rules.

// The Sudoku board could be partially filled, where empty cells are filled with the character '.'.

// Note:
// A valid Sudoku board (partially filled) is not necessarily solvable. Only the filled cells need to be validated.

// Time:  O(9^2)
// Space: O(9)

// Better performance solution.
class Solution {
public:
  bool isValidSudoku(const vector<vector<char>>& board) {
    vector<bool> used(9, false);
    for (int k = 0; k < 9; ++k) {
      fill(used, used + 9, false);
      for (int col = 0; col < 9; col++) {
        if (!isValid(board[k][col], used)) {
          return false;
        }
      }
      fill(used, used + 9, false);
      for (int row = 0; row < 9; row++) {
        if (!isValid(board[row][k], used)) {
          return false;
        }
      }
    }

    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        fill(used, used + 9, false);
        for (int row = i * 3; row < i * 3 + 3; row++) {
          for (int col = j * 3; col < j * 3 + 3; col++) {
            if (!isValid(board[row][col], used)) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

private:
  bool isValid(char c, vector<bool>& used) {
    if (c == '.') {
      return true;
    }
    if (used[c - '1']) {
      return false;
    }
    return used[c - '1'] = true;
  }
};