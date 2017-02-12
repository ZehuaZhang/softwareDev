// 213. House Robber II
// Difficulty: Medium

// Note: This is an extension of House Robber.

// After robbing those houses on that street, the thief has found himself a new place for his thievery 
// so that he will not get too much attention. This time, all houses at this place are arranged in a circle. 
// That means the first house is the neighbor of the last one. 
// Meanwhile, the security system for these houses remain the same as for those in the previous street.

// Given a list of non-negative integers representing the amount of money of each house, 
// determine the maximum amount of money you can rob tonight without alerting the police.


// Time:  O(n)
// Space: O(1)

class Solution {
public:
    int rob(vector<int>& nums) {
        if (nums.size() == 0) {
            return 0;
        }
        if (nums.size() == 1) {
            return nums[0];
        }

        return max(robRange(nums, 0, nums.size() - 1), // Include the first one of nums without the last one.
                   robRange(nums, 1, nums.size()));    // Include the last one of nums without the first one.
    }

    int robRange(vector<int>& nums, int start, int end) {
        int curr = nums[start], prev = 0, prevPrev = 0;
        for (int i = start + 1; i < end; ++i) {
            prevPrev = prev;
            prev = curr;
            curr = max(nums[i] + prevPrev, prev);
        }
        return curr;
    }
};
