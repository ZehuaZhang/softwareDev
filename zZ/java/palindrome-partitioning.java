/**
 * Palindrome Partitioning
 * 
 * Given a string s, partition s such that every substring of the partition is a palindrome.
 * 
 * Return all possible palindrome partitioning of s.
 * 
 * For example, given s = "aab",
 * Return
 * 
 *   [
 *     ["aa","b"],
 *     ["a","a","b"]
 *   ]
 */

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<List<String>>();
        List<String> path = new ArrayList<String>();
        partitionHelper(s, 0, path, result);
        return result;
    }

    private void partitionHelper(String s, int start, List<String> path, List<List<String>> result) {
        if (start == s.length()) {
            result.add(new ArrayList<String>(path));
            return;
        }

        for (int end = start + 1; end < s.length(); ++end) {
            if (isPalindrome(s, start, end - 1)) {
                path.add(s.substring(start, end));
                partitionHelper(s, end, path, result);
                path.remove(path.size() - 1);
            }
        }
    }

    private isPalindrome(String s, int start, int end) {
        while (start < end) {
            if (s.charAt(start) != s.charAt(end)) {
                return false;
            }
            ++start;
            --end;
        }

        return true;
    }
}
