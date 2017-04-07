// 79. Word Search
// Difficulty: Medium

// Given a 2D board and a word, find if the word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cell,
//  where "adjacent" cells are those horizontally or vertically neighboring. 
//  The same letter cell may not be used more than once.

// For example,
// Given board =

// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]
// word = "ABCCED", -> returns true,
// word = "SEE", -> returns true,
// word = "ABCB", -> returns false.

// Time Complexity: O(m * n * 4 ^ p), where m is board width, n is board height, p is word length
// Space Complexity: O(m * n + p)

class Solution {
public:
  bool exist(vector<vector<char>>& board, string word) {
    const int m = board.size();
    const int n = board.front().size();
    vector<vector<bool>> visited(m, vector<bool>(n, false));
    for (int i = 0; i < m; ++i) {
      for (int j = 0; j < n; ++j) {
        if (exist(board, word, 0, i, j, visited)) {
          return true;
        }
      }
    }
    return false;
  }
private:
  bool exist(vector<vector<char>>& board, string word, int index, int i, int j,
    vector<vector<bool>>& visited) {
    if (index == word.size()) {
      return true;
    }
    if (i < 0 || j < 0 || i >= board.size() || j >= board.front().size() || 
      visited[i][j] || board[i][j] != word[index]) {
      return false;
    }

    visited[i][j] = true;
    if (exist(board, word, index + 1,  i + 1, j, visited) ||
      exist(board, word, index + 1,  i, j + 1, visited) ||
      exist(board, word, index + 1,  i - 1, j, visited) ||
      exist(board, word, index + 1,  i, j - 1, visited)) {
      return true;
    }
    visited[i][j] = false;

    return false;
  }
};
