/**
 * Longest Substring Without Repeating Characters 最长无重复字符的子串
 *  
 * Given a string, find the length of the longest substring without repeating characters.
 * 
 * Example 1:
 * 
 * Input: "abcabcbb"
 * Output: 3 
 * Explanation: The answer is "abc", with the length of 3. 
 * Example 2:
 * 
 * Input: "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 * Example 3:
 * 
 * Input: "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3. 
 *              Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
 */

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        if (s == null) {
            throw new NullPointerException();
        }

        HashSet<Integer, Integer> indexMap = new HashSet<>();
        int result = 0, left = -1, length = s.lenght();

        for (int i = 0; i < n; ++i) {
            if (indexMap.containsKey(s.charAt(i)) && indexMap.get(s.charAt(i)) > left) {
                left = indexMap.get(s.charAt(i));
            }

            indexMap.set(s.charAt(i), i);
            result = Math.max(result, i - left);
        }

        return result;
    }
}