// 15. 3Sum
// Difficulty: Medium
// Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0?
// Find all unique triplets in the array which gives the sum of zero.

// Note: The solution set must not contain duplicate triplets.

// For example, given array S = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

// Time:  O(n^2)
// Space: O(1)

public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
        }
        Arrays.sort(nums);
        List<List<Integer>> lists = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; ++i) {
            if (i != 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            for (int low = i + 1, high = nums.length - 1; low < high;) {
                if (low != i + 1 && nums[low] == nums[low - 1]) {
                    ++low;
                    continue;
                }
                if (high != nums.length - 1 && nums[high] == nums[high + 1]) {
                    --high;
                    continue;
                }
                if (nums[low] + nums[high] + nums[i] > 0) {
                    --high;
                } else if (nums[low] + nums[high] + nums[i] == 0) {
                    List<Integer> aRes = new ArrayList<Integer>();
                    aRes.add(nums[i]);
                    aRes.add(nums[low]);
                    aRes.add(nums[high]);
                    lists.add(aRes);
                    ++low;
                    --high;
                } else {
                    ++low;
                }
            }
        }
        return lists;
    }
}
