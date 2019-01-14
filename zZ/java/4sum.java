/**
 * 4Sum
 *  
 * Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
 * 
 * Note:
 * Elements in a quadruplet (a,b,c,d) must be in non-descending order. (ie, a ≤ b ≤ c ≤ d)
 * The solution set must not contain duplicate quadruplets.
 *     For example, given array S = {1 0 -1 0 -2 2}, and target = 0.
 * 
 *     A solution set is:
 *     (-1,  0, 0, 1)
 *     (-2, -1, 1, 2)
 *     (-2,  0, 0, 2)
 */

public class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        if (nums == null) {
            throw new NullPointerException();
        }

        Arrays.sort(nums);

        int n = nums.length;
        for (int i = 0; i < n - 3; ++i) {
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            
            for (int j = i + 1; j < n - 2; ++j) {
                if (j > i + 1 && nums[j] == nums[j - 1]) {
                    continue;
                }

                for (int left = j + 1, right = n - 1; left < right;) {
                    if (left > j + 1 && nums[left] == nums[left - 1]) {
                        ++left;
                        continue;
                    }
                    if (right < n - 1 && nums[right] == nums[right + 1]) {
                        --right;
                        continue;
                    }

                    int sum = nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        List<Integer> entryOfResult = new ArrayList<>();
                        entryOfResult.add(nums[i]);
                        entryOfResult.add(nums[j]);
                        entryOfResult.add(nums[left]);
                        entryOfResult.add(nums[right]);
                        result.add(entryOfResult);

                        ++left;
                        --right;
                    } else if (sum < target) {
                        ++left;
                    } else {
                        --right;
                    }
                }
            }
        }

        return result;
    }
}
