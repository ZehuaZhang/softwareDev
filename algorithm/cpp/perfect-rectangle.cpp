// 391. Perfect Rectangle
// Difficulty : Hard 

// Given N axis-aligned rectangles where N > 0
// determine if they all together form an exact cover of a rectangular region.

// Each rectangle is represented as a bottom-left point and a top-right point.
// For example, a unit square is represented as [1,1,2,2].
// (coordinate of bottom-left point is (1, 1) and top-right point is (2, 2)).

// Example 1:

// rectangles = [
//   [1,1,3,3],
//   [3,1,4,2],
//   [3,2,4,4],
//   [1,3,2,4],
//   [2,3,3,4]
// ]

// Return true. All 5 rectangles together form an exact cover of a rectangular region.


// Example 2:

// rectangles = [
//   [1,1,2,3],
//   [1,3,2,4],
//   [3,1,4,2],
//   [3,2,4,4]
// ]

// Return false. Because there is a gap between the two rectangular regions.

// Example 3:

// rectangles = [
//   [1,1,3,3],
//   [3,1,4,2],
//   [1,3,2,4],
//   [3,2,4,4]
// ]

// Return false. Because there is a gap in the top center.

// Example 4:

// rectangles = [
//   [1,1,3,3],
//   [3,1,4,2],
//   [1,3,2,4],
//   [2,2,4,4]
// ]

// Return false. Because two of the rectangles overlap with each other.

// Time:  O(n)
// Space: O(n)

class Solution {
public:
  bool isRectangleCover(vector<vector<int>>& rectangles) {
    unordered_set<string> points;
    int minX = INT_MAX, minY = INT_MAX, maxX = INT_MIN, maxY = INT_MIN;
    int area = 0;
    for (auto rect : rectangles) {
      minX = min(minX, rect[0]);
      minY = min(minY, rect[1]);
      maxX = max(maxX, rect[2]);
      maxY = max(maxY, rect[3]);
      area += (rect[2] - rect[0]) * (rect[3] - rect[1]);
      string s1 = to_string(rect[0]) + "_" + to_string(rect[1]); // bottom-left
      string s2 = to_string(rect[0]) + "_" + to_string(rect[3]); // top-left
      string s3 = to_string(rect[2]) + "_" + to_string(rect[3]); // top-right
      string s4 = to_string(rect[2]) + "_" + to_string(rect[1]); // bottom-right
      for (auto s : vector<string>{ s1, s2, s3, s4 }) {
        if (points.count(s)) {
          points.erase(s);
        } else {
          points.insert(s);
        }
      }
    }
    string t1 = to_string(minX) + "_" + to_string(minY);
    string t2 = to_string(minX) + "_" + to_string(maxY);
    string t3 = to_string(maxX) + "_" + to_string(maxY);
    string t4 = to_string(maxX) + "_" + to_string(minY);
    if (!points.count(t1) || !points.count(t2) || !points.count(t3) || !points.count(t4) || points.size() != 4) {
      return false;
    }
    return area == (maxX - minX) * (maxY - minY);
  }
};