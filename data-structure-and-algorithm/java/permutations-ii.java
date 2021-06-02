/**
 * Permutations II
 * 
 * Given a collection of numbers that might contain duplicates, return all possible unique permutations.
 * 
 * For example,
 * [1,1,2] have the following unique permutations:
 * [1,1,2], [1,2,1], and [2,1,1].
 */

import java.util.Arrays;

public class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
        }

        List<list<Integer>> result = new ArrayList<List<Integer>>();
        List<Integer> path = new ArrayList<Integer>();
        boolean[] visited = new int[nums.length];

        Arrays.sort(nums);
        permuteHelper(nums, visited, 0, path, result);

        return result;
    }

    public void permuteHelper(int[] nums, boolean[] visited, int start, List<Integer> path, List<List<Integer>> result) {
        if (start == nums.length) {
            result.add(path);
        } else {
            for (int i = start; i < nums.length; ++i) {
                if (visited[i] == false) {
                    visited[i] = true;
                    path.add(nums[i]);
                    permuteHelper(nums, visited, i + 1, path, result);
                    path.remove(path.size() - 1);
                    visited[i] = false;
                    for (; i < nums.length - 1 && nums[i] == nums[i + 1]; ++i);
                }
            }
        }
    }
}
