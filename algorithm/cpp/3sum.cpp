// 15. 3Sum
// Difficulty: Medium

// Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0?
// Find all unique triplets in the array which gives the sum of zero.

// Note: The solution set must not contain duplicate triplets.

// For example, given array S = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

// Time:  O(n^2)
// Space: O(1)

class Solution {
public:
  vector<vector<int>> threeSum(vector<int> &nums) {
    vector<vector<int>> ans;
    const int target = 0;

    sort(nums.begin(), nums.end());

    for (int i = 0; i < nums.size() - 2; ++i) {
      if (i != 0 && nums[i] == nums[i - 1]) {
        continue;
      }
      for (int left = i + 1, right = nums.size() - 1; left < right; ) {
        if (left != i + 1  && nums[left] == nums[left - 1]) {
          ++left;
          continue;
        }
        if (right != nums.size() - 1 && nums[right] == nums[right + 1]) {
          --right;
          continue;
        } 
        const int sum = nums[i] + nums[left] + nums[right];
        if (sum > target) {
          --right;
        } else if (sum < target) {
          ++left;
        } else {
          ans.push_back({nums[i], nums[left], nums[right]});
          ++left, --right;
        }
      }
    }
    return ans;
  }
};
