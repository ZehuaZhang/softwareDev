/**
 * Palindrome Partitioning II
 * 
 * Given a string s, partition s such that every substring of the partition is a palindrome.
 * 
 * Return the minimum cuts needed for a palindrome partitioning of s.
 * 
 * For example, given s = "aab",
 * Return 1 since the palindrome partitioning ["aa","b"] could be produced using 1 cut.
 */

public class Solution {
    public int minCut(String s) {
        if (s == null) {
            throw new NullPointerException();
        }

        int[] minCutFromIndex = new int[s.length() + 1];
        boolean[][] isPalindrome = new boolean[s.length()][s.length()];

        for (int i = s.length() - 1; i >= 0; --i) {
            for (int j = i; j < s.length(); ++j) {
                if (s.charAt(i) == s.charAt(j) && (j - i < 2 || isPalindrome[i + 1][j - 1])) {
                    isPalindrome[i][j] = true;
                    minCutFromIndex[i] = Math.min(minCutFromIndex[i], minCutFromIndex[j + 1] + 1);
                }
            }
        }

        return minCutFromIndex[0];
    }
}
