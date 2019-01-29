/**
 * Maximum Product Subarray
 * 
 * Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.
 * 
 * Example 1:
 * 
 * Input: [2,3,-2,4]
 * Output: 6
 * Explanation: [2,3] has the largest product 6.
 * Example 2:
 * 
 * Input: [-2,0,-1]
 * Output: 0
 * Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
 */

public class Solution {
    public int maxProduct(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
        }

        if (nums.length <= 1) {
            throw new IllegalArgumentException();
        }

        int result = nums[0], max = nums[0], min = nums[0];
        for (int i = 1; i < nums.length; ++i) {
            int currMax = max;
            int currMin = min;
            max = Math.max(Math.max(nums[i], nums[i] * currMax), nums[i] * currMin);
            min = Math.min(Math.min(nums[i], nums[i] * currMin), nums[i] * currMin);
            result = Math.max(result, max);
        }

        return result;
    }
}
