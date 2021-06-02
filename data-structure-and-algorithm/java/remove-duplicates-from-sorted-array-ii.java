/**
 * Remove Duplicates from Sorted Array II
 * 
 * Follow up for "Remove Duplicates":
 * What if duplicates are allowed at most twice?
 * 
 * For example,
 * Given sorted array A = [1,1,1,2,2,3],
 * 
 * Your function should return length = 5, and A is now [1,1,2,2,3].
 */

public class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
        }

        int maxTimeElementCouldAppear = 2;
        int index = maxTimeElementCouldAppear;
        for (int i = maxTimeElementCouldAppear; i < nums.length; ++i) {
            if (nums[i] != nums[index - maxTimeElementCouldAppear]) {
                nums[index++] = nums[i];
            }
        }  
        return index;
    }
}
