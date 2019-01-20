/**
 * Subsets II
 * 
 * Given a collection of integers that might contain duplicates, S, return all possible subsets.
 * 
 * Note:
 * 
 * Elements in a subset must be in non-descending order.
 * The solution set must not contain duplicate subsets.
 *  
 * 
 * For example,
 * If S = [1,2,2], a solution is:
 * 
 * [
 *   [2],
 *   [1],
 *   [1,2,2],
 *   [2,2],
 *   [1,2],
 *   []
 * ]
 */

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
        }

        List<List<Integer>> result = new ArrayList<List<Integer>>();
        List<Integer> path = new ArrayList<>();
        Arrays.sort(nums);
        subsetWithDupHelper(nums, 0, path, result);
        return result;
    }

    private void subsetWithDupHelper(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        result.add(new ArrayList<Integer>(path));
        for (int i = start; i < nums.length; ++i) {
            path.add(nums[i]);
            subsetWithDupHelper(nums, i + 1, path, result);
            path.remove(path.size() - 1);
            while (i + 1 < nums.length && nums[i] == nums[i + 1]) {
                ++i;
            }
        }
    }
}
