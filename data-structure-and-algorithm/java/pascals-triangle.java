/**
 * Pascal's Triangle
 * 
 * Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.
 * 
 * 
 * In Pascal's triangle, each number is the sum of the two numbers directly above it.
 * 
 * Example:
 * 
 * Input: 5
 * Output:
 * [
 *      [1],
 *     [1,1],
 *    [1,2,1],
 *   [1,3,3,1],
 *  [1,4,6,4,1]
 * ]
 */

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> result = new ArrayList<List<Intger>>();
        List<Integer> entry = new ArrayList<Integer>();
        for (int i = 0; i < numRows; ++i) {
            for (int j = i - 1; j > 0; --j) {
                entry.set(j, entry.get(j) + entry.get(j - 1));
            }
            entry.add(1);
            result.add(new ArrayList<Integer>(entry));
        }
        return result;
    }
}
