/**
 * First Missing Positive
 * 
 * Given an unsorted integer array, find the smallest missing positive integer.
 * 
 * Example 1:
 * 
 * Input: [1,2,0]
 * Output: 3
 * Example 2:
 * 
 * Input: [3,4,-1,1]
 * Output: 2
 * Example 3:
 * 
 * Input: [7,8,9,11,12]
 * Output: 1
 * Note:
 * 
 * Your algorithm should run in O(n) time and uses constant extra space.
 */

public class Solution {
    public int firstMissingPositive(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
        }
        
        bucketSort(nums);

        int i = 0;
        for (; i < nums.length && nums[i] == i + 1; ++i);
        return i + 1;
    }

    private void bucketSort(int[] nums) {
        for (int i = 0; i < nums.length;) {
            if (nums[i] > 0 &&
                nums[i] <= nums.length &&
                nums[i] != nums[nums[i] - 1]) {
                swap(nums, i, nums[i] - 1);
            } else {
                ++i;
            }
        }
    }

    private void swap(int[] nums, int i, int j) {
        int swap = nums[i];
        nums[i] = nums[j];
        nums[j] = swap;
    }
}
