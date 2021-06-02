/**
 * Subsets
 * 
 * Given a set of distinct integers, S, return all possible subsets.
 * 
 * Note:
 * 
 * Elements in a subset must be in non-descending order.
 * The solution set must not contain duplicate subsets.
 *  
 * 
 * For example,
 * If S = [1,2,3], a solution is:
 * 
 * [
 *   [3],
 *   [1],
 *   [2],
 *   [1,2,3],
 *   [1,3],
 *   [2,3],
 *   [1,2],
 *   []
 * ]
 */

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
        }

        Arrays.sort(nums);

        List<List<Integer>> result = new ArrayList<List<Integer>>();
        List<Integer> path = new ArrayList<>();
        subsetsHelper(nums, 0, path, result);
        return result;
    }

    private void subsetsHelper(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        result.add(path);
        for (int i = start; i < nums.length; ++i) {
            path.add(nums[i]);
            subsetsHelper(nums, i + 1, path, result);
            path.remove(path.size() - 1);
        }
    }
}
