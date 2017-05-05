// 329. Longest Increasing Path in a Matrix
// Difficulty: Hard

// Given an integer matrix, find the length of the longest increasing path.

// From each cell, you can either move to four directions: left, right, up or down.
// You may NOT move diagonally or move outside of the boundary (i.e. wrap-around is not allowed).

// Example 1:

// nums = [
//   [9,9,4],
//   [6,6,8],
//   [2,1,1]
// ]
// Return 4
// The longest increasing path is [1, 2, 6, 9].

// Example 2:

// nums = [
//   [3,4,5],
//   [3,2,6],
//   [2,2,1]
// ]
// Return 4
// The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.

// Time:  O(m * n)
// Space: O(m * n)

// DFS + Memorization solution.
class Solution {
public:
  int longestIncreasingPath(vector<vector<int>>& matrix) {
    int result = 0;
    vector<vector<int>> maxLengths(matrix.size(), vector<int>(matrix[0].size()));
    for (int i = 0; i < matrix.size(); ++i) {
      for (int j = 0; j < matrix[0].size(); ++j) {
        result = max(result, longestpath(matrix, i, j, maxLengths));
      }
    }
    return result;
  }

private:
  int longestpath(const vector<vector<int>>& matrix, const int i, const int j, vector<vector<int>>& maxLengths) {
    if (maxLengths[i][j]) {
      return maxLengths[i][j];
    }    
    int maxDepth = 1;
    for (auto pos : vector<pair<int, int>> {{i, j - 1}, {i, j + 1}, {i - 1, j}, {i + 1, j}}) {
      const int x = pos.first, y = pos.second;
      if (x >= 0 && x < matrix.size() && y >= 0 && y < matrix[0].size() && matrix[x][y] > matrix[i][j]) {
        maxDepth = max(maxDepth, longestpath(matrix, x, y, maxLengths) + 1);
      }
    }
    return maxLengths[i][j] = maxDepth;
  }
};
