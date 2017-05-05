// 136. Single Number 
// Difficulty: Easy

// Given an array of integers, every element appears twice except for one. Find that single one.

// Note:
// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int singleNumber(vector<int>& nums) {
    return accumulate(nums.cbegin(), nums.cend(), 0, bit_xor<int>());
  }
};
