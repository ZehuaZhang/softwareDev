// 469. Convex Polygon
// Difficulty: Medium 

// Given a list of points that form a polygon when joined sequentially,
// find if this polygon is convex (Convex polygon definition).

// Note:

// There are at least 3 and at most 10,000 points.
// Coordinates are in the range -10,000 to 10,000.
// You may assume the polygon formed by given points is always a simple polygon (Simple polygon definition).
// In other words, we ensure that exactly two edges intersect at each vertex,
// and that edges otherwise don't intersect each other.
// Example 1:

// [[0,0],[0,1],[1,1],[1,0]]

// Answer: True

// Example 2:

// [[0,0],[0,10],[10,10],[10,0],[5,5]]

// Answer: False

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  bool isConvex(vector<vector<int>>& points) {
    const auto det = [](const vector<vector<int>>& A) {
      return A[0][0] * A[1][1] - A[0][1] * A[1][0]; // dx1 * dy2 - dx2 * dy1, => normal vector
    };
    long n = points.size(), prev = 0, curr;
    for (int i = 0; i < n; ++i) {
      vector<vector<int>> A;
      for (int j = 1; j < 3; ++j) {
        A.push_back({points[(i + j) % n][0] - points[i][0], points[(i + j) % n][1] - points[i][1]});
      }
      if (curr = det(A)) {
        if (curr * prev < 0) {
          return false;
        }
        prev = curr;
      }
    }
    return true;
  }
};