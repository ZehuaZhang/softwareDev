/**
 * Shortest Palindrome 
 * 
 * Given a string S, you are allowed to convert it to a palindrome by adding characters in front of it.
 * Find and return the shortest palindrome you can find by performing this transformation.
 * 
 * For example:
 * 
 * Given "aacecaaa", return "aaacecaaa".
 * 
 * Given "abcd", return "dcbabcd".
 */

public class Solution {
    public String shortestPalindrome(String s) {
        int subPalindromeEndIndex = s.length();

        for (int left = 0, right = s.length() - 1; left < right;) {
            if (s.charAt(left) == s.charAt(right)) {
                ++left;
                --right;
            } else {
                left = 0;
                right = --end;
            }
        }

        return new StringBuilder(s.substring(subPalindromeEndIndex + 1)).reverse().toString() + s;
    }
}
