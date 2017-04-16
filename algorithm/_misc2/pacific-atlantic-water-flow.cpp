// 417. Pacific Atlantic Water Flow
// Difficulty: Medium

// Given an m x n matrix of non-negative integers representing the height of each unit cell in a continent, 
// the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean" touches the right and bottom edges.

// Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.

// Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.

// Note:
// The order of returned grid coordinates does not matter.
// Both m and n are less than 150.
// Example:

// Given the following 5x5 matrix:

//   Pacific ~   ~   ~   ~   ~ 
//        ~  1   2   2   3  (5) *
//        ~  3   2   3  (4) (4) *
//        ~  2   4  (5)  3   1  *
//        ~ (6) (7)  1   4   5  *
//        ~ (5)  1   1   2   4  *
//           *   *   *   *   * Atlantic

// Return:

// [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).

// Time:  O(m * n)
// Space: O(m * n)

class Solution {
public:
  vector<pair<int, int>> pacificAtlantic(vector<vector<int>>& matrix) {
    const auto m = matrix.size(), n = matrix[0].size();
    vector<vector<int>> visited(m, vector<int>(n));
    vector<pair<int, int>> res;

    for (int i = 0; i < m; ++i) {
      pacificAtlanticHelper(matrix, i, 0, numeric_limits<int>::min(), PACIFIC, visited, res);
      pacificAtlanticHelper(matrix, i, n - 1, numeric_limits<int>::min(), ATLANTIC, visited, res);
    }
    for (int j = 0; j < n; ++j) {
      pacificAtlanticHelper(matrix, 0, j, numeric_limits<int>::min(), PACIFIC, visited, res);
      pacificAtlanticHelper(matrix, m - 1, j, numeric_limits<int>::min(), ATLANTIC, visited, res);
    }
    return res;
  }

private:
  void pacificAtlanticHelper(const vector<vector<int>>& matrix, int x, int y, int prevHeight, int prevVisit,
   vector<vector<int>>& visited, vector<pair<int, int>>& res) {

    if (x < 0 || x >= matrix.size() || y < 0 || y >= matrix[0].size() ||
      matrix[x][y] < prevHeight || (visited[x][y] | prevVisit) == visited[x][y]) {
      return;
    }
    
    visited[x][y] |= prevVisit;
    if (visited[x][y] == (PACIFIC | ATLANTIC)) {
      res.emplace_back(x, y);
    }

    for (const auto& dir : vector<pair<int, int>>{ {0, -1}, {0, 1}, {-1, 0}, {1, 0} }) {
      pacificAtlanticHelper(matrix, x + dir.first, y + dir.second, matrix[x][y], visited[x][y], visited, res);
    }
  }

  enum ocean {
    PACIFIC = 1,
    ATLANTIC = 2,
  };
};
