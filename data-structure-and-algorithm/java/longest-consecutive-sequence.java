/**
 * Longest Consecutive Sequence
 * 
 * Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
 * 
 * Your algorithm should run in O(n) complexity.
 * 
 * Example:
 * 
 * Input: [100, 4, 200, 1, 3, 2]
 * Output: 4
 * Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4
 */

import java.util.HashSet;
import java.util.Set;

public class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();

        for (int num : nums) {
            set.add(num);
        }

        int maxLength = 0;

        for (int num : nums) {
            if (!set.contains(num)) {
                continue;
            }

            set.remove(num);
            int length = 1;

            for (int lesser = num - 1; set.contains(lesser); --lesser) {
                set.remove(lesser);
                ++length;
            }

            for (int greater = num + 1; set.contains(greater); ++greater) {
                set.remove(greater);
                ++length;
            }

            maxLength = Math.max(maxLength, length);
        }

        return maxLength;
    }
}
