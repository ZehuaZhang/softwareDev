/**
 * Combination Sum III
 * 
 * Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.
 * 
 * Ensure that numbers within the set are sorted in ascending order.
 * 
 * 
 * Example 1:
 * 
 * Input: k = 3, n = 7
 * 
 * Output:
 * 
 * [[1,2,4]]
 * 
 * Example 2:
 * 
 * Input: k = 3, n = 9
 * 
 * Output:
 * 
 * [[1,2,6], [1,3,5], [2,3,4]]
 */

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        combinationSum3Helper(k, n, 1, path, result);
        return result;
    }

    private void combinationSum3Helper(int k, int n, int level, List<Integer> path, List<List<Integer>> result) {
        if (path.size == k && n == 0) {
            result.add(path);
        } else {
            for (int i = level; i <= 9; ++i) {
                if (n - i < 0) {
                    break;
                }

                path.add(i);
                combinationSum3Helper(k, n - i, i + 1, path, result);
                path.remove(path.size() - 1);
            } 
        }
    }
}
