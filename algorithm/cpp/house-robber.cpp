// 198. House Robber
// Difficulty: Easy

// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, 
// the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and 
// it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given a list of non-negative integers representing the amount of money of each house, 
// determine the maximum amount of money you can rob tonight without alerting the police.

// Time:  O(n)
// Space: O(n)
// DP
class Solution {
public:
  int rob(vector<int> &num) {
    if (num.size() <= 1) {
      return num.empty() ? 0 : num[0];
    }
    int curr = nums[0], prev = 0, prevPrev = 0;
    for (int i = 1; i < num.size(); ++i) {
      prevPrev = prev;
      prev = curr;
      curr = max(nums[i] + prevPrev, prev);
    }
    return curr;
  }
};