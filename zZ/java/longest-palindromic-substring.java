/**
 * Longest Palindromic Substring
 * 
 * Given a string S, find the longest palindromic substring in S. You may assume that the maximum length of S is 1000, and there exists one unique longest palindromic substring.
 */

public class Solution {
    public String longestPalindrome(String s) {
        if (s == null) {
            throw new NullPointerException();
        }

        if (s.length() == 0) {
            return "";
        }

        int length = 1;
        int left = 0, right = 0;
        boolean[][] isPalindrome = new boolean[s.length()][s.length()];

        for (int i = 0; i < s.length(); ++i) {
            for (int j = 0; j < i; ++j) {
                isPalindrome[j][i] = 
                    s.charAt(i) == s.charAt(j) ||
                    (i - j < 2 || dp[j + 1][i - 1]);
                
                if (isPalindrome[j][i] && length < i - j + 1) {
                    length = i - j + 1;
                    left = j;
                    right = i;
                }
            }

            isPalindrome[i][i] = true;
        }

        return s.substring(left, right + 1);
    }
}