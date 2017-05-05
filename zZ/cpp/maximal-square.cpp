// 221. Maximal Square
// Difficulty: Medium

// Given a 2D binary matrix filled with 0 and 1, find the largest square containing only 1 and return its area.

// For example, given the following matrix:

// 1 0 1 0 0
// 1 0 1 1 1
// 1 1 1 1 1
// 1 0 0 1 0
// Return 4.

// Time:  O(n^2)
// Space: O(n)

// DP with rolling window.
class Solution {
public:
  int maximalSquare(vector<vector<char>>& A) {
    if (matrix.empty()) {
      return 0;
    }
    const int m = matrix.size();
    const int n = matrix[0].size();
    vector<int> H(n, 0);
    vector<int> L(n, 0);
    vector<int> R(n, n);
    int ret = 0;
    for (int i = 0; i < m; ++i) {
      int left = 0, right = n;
      // calculate L(i, j) from left to right
      for (int j = 0; j < n; ++j) {
        if (matrix[i][j] == '1') {
          ++H[j];
          L[j] = max(L[j], left);
        } else {
          left = j+1;
          H[j] = 0; L[j] = 0; 
        }
      }

      // calculate R(i, j) from right to left
      for (int j = n-1; j >= 0; --j) {
        if (matrix[i][j] == '1') {
          R[j] = min(R[j], right);
        } else {
          right = j;
          R[j] = n;
        }

        int side = min(H[j], R[j] - L[j]);
        ret = max(ret, side * side);
      }
    }
    return ret;
  }
};