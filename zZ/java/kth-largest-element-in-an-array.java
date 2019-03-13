/**
 * Kth Largest Element in an Array
 * 
 * Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * 
 * Example 1:
 * 
 * Input: [3,2,1,5,6,4] and k = 2
 * Output: 5
 * Example 2:
 * 
 * Input: [3,2,3,1,2,4,5,5,6] and k = 4
 * Output: 4
 * Note: 
 * You may assume k is always valid, 1 ≤ k ≤ array's length.
 */

import java.util.Random;

public class Solution {
    public int findKthLargest(int[] nums, int k) {
        int left = 0, right = nums.length - 1;
        Random random = new Random();
        while (left <= right) {
            int pivotIndex = left + random.nextInt(right - left + 1);
            int newPivotIndex = getPartitionIndex(nums, left, right, pivotIndex);
            
            if (newPivotIndex == k - 1) {
                return nums[newPivotIndex];
            } else if (newPivotIndex > k - 1) {
                right = newPivotIndex - 1;
            } else {
                left = newPivotIndex + 1;
            }
        }

        return nums[left];
    }

    private int getPartitionIndex(int[] nums, int left, int right, int pivotIndex) {
        swap(nums, right, pivotIndex);
        
        int pivot = nums[right];
        int newPivotIndex = left;
        for (int i = left; i < right; ++i) {
            if (nums[i] >= pivot) {
                swap(nums, i, newPivotIndex++);
            }
        }

        swap(nums, right, newPivotIndex);

        return newPivotIndex;
    }

    private void swap(int[] nums, int i, int j) {
        int swapValue = nums[i];
        nums[i] = nums[j];
        nums[j] = swapValue;
    }
}
