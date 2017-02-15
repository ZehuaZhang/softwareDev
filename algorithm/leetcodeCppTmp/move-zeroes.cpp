// 283. Move Zeroes
// Difficulty: Easy

// Given an array nums, write a function to move all 0 to the end of it while maintaining the relative order of the non-zero elements.

// For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].

// Note:
// You must do this in-place without making a copy of the array.
// Minimize the total number of operations.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int idx = 0;
        for (auto num : nums) {
            if (num) {
                swap(nums[idx++], num);
            }
        }
    }
};