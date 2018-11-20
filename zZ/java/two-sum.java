// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:

// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].


public class Solution {
    public int[] twoSum(int[] nums, int target) {
        if (nums == null) {
            throw new NullPointerException();
        }
        int[] result = new int[2];
        HashMap<Integer, Integer> candidates = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums.length; ++i) {
            int difference = target - nums[i];
            if (candidates.containsKey(difference)) {
                result[0] = candidates.get(difference);
                result[1] = i;
                break;
            }
            candidates.put(nums[i], i);
        }
        return result;
    }
}
