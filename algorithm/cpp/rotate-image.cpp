// 48. Rotate Image
// Difficulty: Medium

// You are given an n x n 2D matrix representing an image.

// Rotate the image by 90 degrees (clockwise).

// Follow up:
// Could you do this in-place?

// Time:  O(n^2)
// Space: O(1)

class Solution {
public:
  void rotate(vector<vector<int>>& matrix) {
    const int n = matrix.size();
    for (int i = 0; i < n / 2; i++) {
      for (int j = 0; j < n; j++) {
        swap(matrix[i][j], matrix[n - 1 - i][j]);
      }
    }
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < i; j++) {
        swap(matrix[i][j], matrix[j][i]);
      }
    }
  }
};