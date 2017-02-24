// 324. Wiggle Sort II
// Difficulty : Medium 

// Given an unsorted array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....

// Example:
// (1) Given nums = [1, 5, 1, 1, 6, 4], one possible answer is [1, 4, 1, 5, 1, 6]. 
// (2) Given nums = [1, 3, 2, 2, 3, 1], one possible answer is [2, 3, 1, 3, 1, 2].

// Note:
// You may assume all input has valid answer.

// Follow Up:
// Can you do it in O(n) time and/or in-place with O(1) extra space?

// Time:  O(n) ~ O(n^2), O(n) on average.
// Space: O(1)

// Tri Partition (aka Dutch National Flag Problem) with virtual index solution. (44ms)
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        int mid = (nums.size() - 1) / 2;
        nth_element(nums.begin(), nums.begin() + mid, nums.end());  // O(n) ~ O(n^2) time
        reversedTriPartitionWithVI(nums, nums[mid]);  // O(n) time, O(1) space
    }

    void reversedTriPartitionWithVI(vector<int>& nums, int val) {
        const int N = nums.size() / 2 * 2 + 1;
        // put after tri-partition
        // put small numbers, from [mid, 0] to even positions starting 0
        // put large numbers, from [nums.size() - 1, 0] to odd positions starting 1
        #define Nums(i) nums[(1 + 2 * (i)) % N]
        for (int i = 0, j = 0, n = nums.size() - 1; j <= n;) {
            if (Nums(j) > val) {
                swap(Nums(i++), Nums(j++));
            } else if (Nums(j) < val) {
                swap(Nums(j), Nums(n--));
            } else {
                ++j;
            }
        }
    }
};