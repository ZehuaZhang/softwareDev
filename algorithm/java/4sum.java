// 18. 4Sum
// Difficulty: Medium
// Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? 
// Find all unique quadruplets in the array which gives the sum of target.

// Note: The solution set must not contain duplicate quadruplets.

// For example, given array S = [1, 0, -1, 0, -2, 2], and target = 0.

// A solution set is:
// [
//   [-1,  0, 0, 1],
//   [-2, -1, 1, 2],
//   [-2,  0, 0, 2]
// ]

// Time:  O(n^3)
// Space: O(1)

public class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        if (nums == null) throw new NullPointerException();
        Arrays.sort(nums);
        int n = nums.length;
        
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < n - 3; ++i) {
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            for (int j = i + 1; j < n - 2; ++j) {
                if (j > i + 1 && nums[j] == nums[j - 1]) {
                    continue;
                }
                int sum = nums[i] + nums[j];
                for (int low = j + 1, high = n - 1; low < high;) {
                    if (low > j + 1 && nums[low] == nums[low - 1]) {
                        ++low;
                        continue;
                    }
                    if (high < n - 1 && nums[high] == nums[high + 1]) {
                        --high;
                        continue;
                    }
                    if (sum + nums[low] + nums[high] == target) {
                        List<Integer> aRes = new ArrayList<>();
                        aRes.add(nums[i]);
                        aRes.add(nums[j]);
                        aRes.add(nums[low]);
                        aRes.add(nums[high]);
                        res.add(aRes);
                        ++low;
                        --high;
                    } else if (sum + nums[low] + nums[high] < target) {
                        ++low;
                    } else {
                        --high;
                    }
                }
            }
        }
        return res;
    }
}
