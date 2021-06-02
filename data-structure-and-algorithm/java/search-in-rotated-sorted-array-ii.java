/**
 * Search in Rotated Sorted Array II 
 * 
 * Follow up for "Search in Rotated Sorted Array":
 * What if duplicates are allowed?
 * 
 * Would this affect the run-time complexity? How and why?
 * 
 * Write a function to determine if a given target is in the array.
 */

public class Solution {
    public boolean search(int[] nums, int target) {
        if (nums == null) {
            throw new NullPointerException();
        }

        for (int left = 0, right = nums.length - 1; left <= right;) {
            int middle = left + (right - left) / 2;
            if (nums[middle] == target) {
                return true;
            } else if (nums[middle] < nums[right]) {
                if (nums[middle] < target && target <= nums[right]) {
                    left = middle + 1;
                } else {
                    right = middle - 1;
                }
            } else if (nums[middle] > nums[right]) {
                if (nums[left] <= target && target < nums[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            } else {
                --right;
            }
        }
        
        return false;
    }
}
