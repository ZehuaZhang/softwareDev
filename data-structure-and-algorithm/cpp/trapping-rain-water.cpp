// 42. Trapping Rain Water
// Difficulty: Hard

// Given n non-negative integers representing an elevation map where the width of each bar is 1, 
// compute how much water it is able to trap after raining.

// For example, 
// Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.

// Time : O(n)
// Space: O(1)

class Solution {
public:
  int trap(vector<int>& height) {
    int level = 0, res = 0;
    for (int left = 0, right = height.size() - 1; left < right) {
      int lower = height[height[left] < height[right] ? left++ : right--];
      level = max(level, lower);
      res += level - lower;
    }
    return res;
  }
};