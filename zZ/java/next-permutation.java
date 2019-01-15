/**
 * Next Permutation
 *  
 * Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.
 * 
 * If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).
 * 
 * The replacement must be in-place, do not allocate extra memory.
 * 
 * Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
 * 1,2,3 → 1,3,2
 * 3,2,1 → 1,2,3
 * 1,1,5 → 1,5,1
 */

public class Solution {
    public void nextPermutation(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
        }

        if (nums.length == 0 || nums.length == 1) {
            return;
        }

        int i = nums.length - 1;
        while (i - 1 >= 0 && nums[i - 1] >= nums[i]) {
            --i;
        }

        if (i == 0) {
            for (int j = 0; j < nums.length / 2; ++j) {
                swap(nums, j, nums.length - 1 - j);
            }
        } else {
            int j = nums.length - 1;
            for (; nums[j] <= nums[i - 1]; --j);
            swap(nums, i - 1, j);
            Arrays.sort(nums, i, nums.length);
        }
    }

    private void swap(int[] nums, int i, int j) {
        nums[i] = nums[i] ^ nums[j];
        nums[j] = nums[i] ^ nums[j];
        nums[i] = nums[i] ^ nums[j];
    }
}