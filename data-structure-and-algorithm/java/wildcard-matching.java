/**
 * Wildcard Matching 
 * 
 * Implement wildcard pattern matching with support for '?' and '*'.
 * 
 * '?' Matches any single character.
 * '*' Matches any sequence of characters (including the empty sequence).
 * 
 * The matching should cover the entire input string (not partial).
 * 
 * The function prototype should be:
 * bool isMatch(const char *s, const char *p)
 * 
 * Some examples:
 * isMatch("aa","a") → false
 * isMatch("aa","aa") → true
 * isMatch("aaa","aa") → false
 * isMatch("aa", "*") → true
 * isMatch("aa", "a*") → true
 * isMatch("ab", "?*") → true
 * isMatch("aab", "c*a*b") → false
 */

public class Solution {
    public boolean isMatch(String s, String p) {
        if (s == null || p == null) {
            throw new NullPointerException();
        }

        int sIndex = 0, pIndex = 0;
        int sStarIndex = 0, pStarIndex = 0;

        while (sIndex < s.length()) {
            if (s.charAt(sIndex) == p.charAt(pIndex) || p.charAt(pIndex) == '?') {
                ++sIndex;
                ++pIndex;
            } else if (p.charAt(pIndex) == '*') {
                pStarIndex = pIndex++;
                sStarIndex = sIndex;
            } else if (pStarIndex > 0) {
                pIndex = pStarIndex + 1;
                sIndex = ++sStarIndex;
            } else {
                return false;
            }
        }
        
        while (p.charAt(pIndex) == '*') {
            ++pIndex;
        }
        return pIndex == p.length();
    }
}

