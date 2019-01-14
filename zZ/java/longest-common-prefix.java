/**
 * Longest Common Prefix
 * 
 * Write a function to find the longest common prefix string amongst an array of strings.
 * 
 * If there is no common prefix, return an empty string "".
 * 
 * Example 1:
 * 
 * Input: ["flower","flow","flight"]
 * Output: "fl"
 * Example 2:
 * 
 * Input: ["dog","racecar","car"]
 * Output: ""
 * Explanation: There is no common prefix among the input strings.
 * Note:
 * 
 * All given inputs are in lowercase letters a-z.
 */

public class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null) throw new NullPointerException();
        if (strs.length == 0) return ""; 
        for (int i = 0; i < strs.length; i ++) {
            if (strs[i] == null) return "";
        }
        for (int i = 0; ; i++) {
            for (int j = 0; j < strs.length; j++) {
                if (i == strs[j].length()) return strs[0].substring(0, i);
            }
            for (int j = 1; j < strs.length; j++) {
                if (strs[j].charAt(i) != strs[j-1].charAt(i))
                    return strs[0].substring(0, i);
            }
        }
    }
}

public class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null) {
            throw new NullPointerException();
        }

        if (strs.length == 0) {
            return "";
        }

        for (int j = 0; j < strs[0].length(); ++j) {
            for (int i = 0; i < strs.length - 1; ++i) {
                if (strs[i] == null || strs[i + 1] == null) {
                    return "";
                }
                if (j >= strs[i].length() ||
                    j >= strs[i + 1].length() ||
                    strs[i].charAt(j) != strs[i + 1].charAt(j)) {
                        return strs[i].substring(0, j);
                    }
            }
        }

        return strs[0];
    }
}
