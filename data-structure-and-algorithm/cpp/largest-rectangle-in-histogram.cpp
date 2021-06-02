// 84. Largest Rectangle in Histogram
// Difficulty: Hard

// Given n non-negative integers representing the histogram bar height where the width of each bar is 1,
// find the area of largest rectangle in the histogram.

// For example,
// Given heights = [1,3,2,4],
// return 6.

// |
// |            __
// |      __   |  |
// |     |  |__|  |
// |   __|  |  |  |
// |__|__|__|__|__|___


// Time:  O(n)
// Space: O(n)

class Solution {
public:
  int largestRectangleArea(vector<int>& heights) {
    heights.push_back(0); // for final calculate
    stack<int> idx;
    int maxArea = 0;

    for (int i = 0; i < heights.size();) {
      if (idx.empty() || heights[i] > heights[idx.top()]) {
        idx.emplace(i++);
      } else {
        int height = heights[idx.top()]; idx.pop();
        int len = idx.empty() ? i : i - idx.top() - 1;
        maxArea = max(maxArea, height * len);
      }
    }
    return maxArea;
  }
};
