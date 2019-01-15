/**
 * Permutations
 * 
 * Given a collection of numbers, return all possible permutations.
 * 
 * For example,
 * [1,2,3] have the following permutations:
 * [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], and [3,2,1].
 */

public class Solution {
    public List<List<Integer>> permute(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
        }

        List<list<Integer>> result = new ArrayList<List<Integer>>();
        List<Integer> path = new ArrayList<Integer>();
        boolean[] visited = new int[nums.length];

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
                }
            }
        }
    }
}
