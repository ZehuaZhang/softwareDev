// 259. 3Sum Smaller
// Difficulty : Medium 

// Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n 
// that satisfy the condition nums[i] + nums[j] + nums[k] < target.

// For example, given nums = [-2, 0, 1, 3], and target = 2.

// Return 2. Because there are two triplets which sums are less than 2:

// [-2, 0, 1]
// [-2, 0, 3]
// Follow up:
// Could you solve it in O(n2) runtime?

// Time:  O(n^2)
// Space: O(1)

public class Solution {
    public int threeSumSmaller(int[] nums, int target) {
        Array.sort(nums);
        int count = 0;
        for (int i = 0; i < nums.length - 2; ++i) {
            for (int j = i + 1, k = nums.length - 1; j < k;) {
                if (nums[i] + nums[j] + nums[k] < target) {
                    count += k - j;
                    ++j;
                } else {
                    --k;
                }
            }
        }
        return count;
    }
}
