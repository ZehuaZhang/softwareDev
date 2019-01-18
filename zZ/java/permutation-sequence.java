/**
 * Permutation Sequence 序列排序
 *
 * The set [1,2,3,...,n] contains a total of n! unique permutations.
 * 
 * By listing and labeling all of the permutations in order, we get the following sequence for n = 3:
 * 
 * "123"
 * "132"
 * "213"
 * "231"
 * "312"
 * "321"
 * Given n and k, return the kth permutation sequence.
 * 
 * Note:
 * 
 * Given n will be between 1 and 9 inclusive.
 * Given k will be between 1 and n! inclusive.
 * Example 1:
 * 
 * Input: n = 3, k = 3
 * Output: "213"
 * Example 2:
 * 
 * Input: n = 4, k = 9
 * Output: "2314"
 */

public class Solution {
    public String getPermutation(int n, int k) {
        int[] array = new int[n];
        for (int i = 0; i < n; ++n) {
            array[i] = i + 1;
        }

        while (--k) {
            nextPermutation(array);
        }

        return array;
    }

    public void nextPermutation(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
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
