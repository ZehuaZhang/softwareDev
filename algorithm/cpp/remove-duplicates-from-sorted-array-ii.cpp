// 80. Remove Duplicates from Sorted Array II
// Difficulty: Medium

// Follow up for "Remove Duplicates":
// What if duplicates are allowed at most twice?

// For example,
// Given sorted array nums = [1,1,1,2,2,3],

// Your function should return length = 5, with the first five elements of nums being 1, 1, 2, 2 and 3. 
// It doesnt matter what you leave beyond the new length.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        const int k = 2; // element appears at most k times

        if (nums.size() <= k) {
            return nums.size();
        }

        int index = k;
        for (int i = k; i < nums.size(); i++) {
            if (nums[i] != nums[index - k]) {
                nums[index++] = nums[i];
            }
        }
        return index;
    }
};
