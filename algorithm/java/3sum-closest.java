// 16. 3Sum Closest
// Difficulty: Medium
// Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. 
// Return the sum of the three integers. You may assume that each input would have exactly one solution.

// For example, given array S = {-1 2 1 -4}, and target = 1.

// The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

// Time:  O(n^2)
// Space: O(1)

public class Solution {
    public int threeSumClosest(int[] nums, int target) {
        if (nums == null) {
            throw new NullPointerException();
        }
        int minDistance = Integer.MAX_VALUE;
        int res = 0;
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 2; ++i) {
            int j = i + 1;
            int k = nums.length - 1;
            while (j < k) {
                int sum = nums[i] + nums[j] + nums[k];
                if (Math.abs(sum - target) < minDistance) {
                    minDistance = Math.abs(sum - target);
                    res = sum;
                    if (minDistance == 0) break;
                }
                if (sum > target) {
                    --k;
                } else if (sum < target) {  // Should increase sum.
                    ++j;
                } else {
                    return target;
                }
            }
        }
        return res;
    }
}
