// 416. Partition Equal Subset Sum
// Difficulty: Medium

// Given a non-empty array containing only positive integers,
// find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

// Note:
// Each of the array element will not exceed 100.
// The array size will not exceed 200.
// Example 1:

// Input: [1, 5, 11, 5]

// Output: true

// Explanation: The array can be partitioned as [1, 5, 5] and [11].
// Example 2:

// Input: [1, 2, 3, 5]

// Output: false

// Explanation: The array cannot be partitioned into equal sum subsets.

// Time:  O(n * s), s is the sum of nums.
// Space: O(s)

class Solution {
public:
  bool canPartition(vector<int>& nums) {
    const auto sum = accumulate(nums.cbegin(), nums.cend(), 0);
    if (sum % 2) {
      return false;
    }

    vector<bool> dp(sum / 2 + 1);
    dp[0]  = true;
    for (const auto& num : nums) {
      for (int i = sum / 2; i >= num; --i) {
        dp[i] = dp[i] || dp[i - num];
      }
    }
    return dp.back();
  }
};