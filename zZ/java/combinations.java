/**
 * Combinations
 * 
 * Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.
 * 
 * For example,
 * If n = 4 and k = 2, a solution is:
 * 
 * [
 *   [2,4],
 *   [3,4],
 *   [2,3],
 *   [1,2],
 *   [1,3],
 *   [1,4],
 * ]
 */

import java.awt.List;
import java.util.ArrayList;

public class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<List<Integer>>();
        List<Integer> path = new ArrayList<>();
        combineHelper(1, k, n, path, result);
        return result;
    }

    private combineHelper(int start, int k, int n, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == k) {
            result.add(path);
        } else {
            for (int i = start; i <= n; ++i) {
                path.add(i);
                combineHelper(i, k, n, path, result);
                path.remove(path.size() - 1);
            }
        }
    }
}
