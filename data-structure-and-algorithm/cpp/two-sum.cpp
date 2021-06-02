// 1. Two Sum
// Difficulty: Easy

// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution.

// Example:
// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

// Time:  O(n)
// Space: O(n)

class Solution {
public:
  vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> idx;
    for (int i = 0; i < nums.size(); ++i) {
      if (idx.count(target - nums[i])) {
        return {idx[target - nums[i]], i};
      }
      idx[nums[i]] = i;
    }
    return {};
  }
};
