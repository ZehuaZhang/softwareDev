// 130. Surrounded Regions
// Difficulty: Medium

// Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.

// A region is captured by flipping all 'O's into 'X's in that surrounded region.

// For example,
// X X X X
// X O O X
// X X O X
// X O X X
// After running your function, the board should be:

// X X X X
// X X X X
// X X X X
// X O X X

// Time:  O(m * n)
// Space: O(m + n)

class Solution {
public:
  void solve(vector<vector<char>>& board) {
    queue<pair<int, int>> q;
    for (int i = 0; i < board.size(); ++i) {
      q.emplace(i, 0);
      q.emplace(i, board[0].size() - 1);
    }
    for (int j = 0; j < board[0].size(); ++j) {
      q.emplace(0, j);
      q.emplace(board.size() - 1, j);
    }

    while (!q.empty()) {
      int i, j;
      tie(i, j) = q.front(); q.pop();
      if (board[i][j] == 'O') {
        board[i][j] = 'V';
        for (auto dir : vector<pair<int, int>>{ {0, -1}, {0, 1}, {-1, 0}, {1, 0} }) {
          const int x = i + dir.first, y = j + dir.second;
          if (0 <= x  && x < board.size() && 0 <= y && y < board[0].size() && board[x][y] == 'O') {
            q.emplace(x, y);
          }
        }
      }
    }

    for (int i = 0; i < board.size(); ++i) {
      for (int j = 0; j < board[0].size(); ++j) {
        if (board[i][j] != 'V') {
          board[i][j] = 'X';
        } else {
          board[i][j] = 'O';
        }
      }
    }
  }
};
