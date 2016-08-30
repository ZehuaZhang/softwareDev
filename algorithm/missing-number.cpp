268. Missing Number
Difficulty: Medium
Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

For example,
Given nums = [0, 1, 3] return 2.

Note:
Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?

// Time:  O(n)
// Space: O(1)

class Solution {
 public:
  int missingNumber(vector<int>& nums) {
    int num = 0;
    for (int i = 0; i < nums.size(); ++i) {
      num ^= nums[i] ^ (i + 1);
    }
    return num;
  }
};