/**
 * Regular Expression Matching
 * 
 * Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.
 * 
 * '.' Matches any single character.
 * '*' Matches zero or more of the preceding element.
 * The matching should cover the entire input string (not partial).
 * 
 * Note:
 * s could be empty and contains only lowercase letters a-z.
 * p could be empty and contains only lowercase letters a-z, and characters like . or *.
 * Example 1:
 * 
 * Input:
 * s = "aa"
 * p = "a"
 * Output: false
 * Explanation: "a" does not match the entire string "aa".
 * Example 2:
 * 
 * Input:
 * s = "aa"
 * p = "a*"
 * Output: true
 * Explanation: '*' means zero or more of the precedeng element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
 * Example 3:
 * 
 * Input:
 * s = "ab"
 * p = ".*"
 * Output: true
 * Explanation: ".*" means "zero or more (*) of any character (.)".
 * Example 4:
 * 
 * Input:
 * s = "aab"
 * p = "c*a*b"
 * Output: true
 * Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore it matches "aab".
 * Example 5:
 * 
 * Input:
 * s = "mississippi"
 * p = "mis*is*p*."
 * Output: false
*/

public class Solution {
    public boolean isMatch(String s, String p) {
        if (s == null || p == null) {
            throw new NullPointerException();
        }

        int sLength = s.length(), pLength = p.length();
        if (sLength == 0 && pLength == 0) {
            return true;
        }
        if (pLength == 0 && sLength != 0) {
            return false;
        }

        if (pLength == 1) {
            if (sLength != 1) {
                return false;
            }
            
            return (
                p.charAt(0) == '.' || 
                p.charAt(0) == s.charAt(0)
            );
        } else {
            if (p.charAt(1) != '*') {
                if (sLength == 0) {
                    return false;
                }
                if (p.charAt(0) == '.' || p.charAt(0) == s.charAt(0)) {
                    return isMatch(s.substring(1), p.substring(1));
                }
            } else {
                if (isMatch(s, p.substring(2))) {
                    return true;
                }
                if (p.charAt(0) == '.') {
                    for (int i = 1; i <= sLength; ++i) {
                        if (isMatch(s.substring(i), p.substring(2))) {
                            return true;
                        }
                    }
                } else {
                    for (int i = 0; i < sLength && s.charAt(i) == p.charAt(0); ++i) {
                        if (isMatch(s.substring(i + 1), p.substring(2))) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }
}