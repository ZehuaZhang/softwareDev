/**
 * Minimum Window Substring
 * 
 * Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).
 * 
 * Example:
 * 
 * Input: S = "ADOBECODEBANC", T = "ABC"
 * Output: "BANC"
 * Note:
 * 
 * If there is no such window in S that covers all characters in T, return the empty string "".
 * If there is such window, you are guaranteed that there will always be only one unique minimum window in S.
 */

import java.util.HashMap;
import java.util.Map;

public class Solution {
    public String minWindow(String s, String t) {
        if (s == null || t == null) {
            throw new NullPointerException();
        }

        Map<Character, Integer> letterCount = new HashMap<>();
        for (int i = 0; i < t.length(); ++i) {
            int count = letterCount.getOrDefault(t.charAt(i), 0) + 1;
            letterCount.put(t.charAt(i), count);
        }
        
        String result;
        int left = 0, count = 0, minLength = Integer.MAX_VALUE;
        for (int right = 0; right < s.length(); ++right) {
            
            // extend substring to the right by one character
            if (letterCount.containsKey(s.charAt(right))) {
                letterCount.put(s.charAt(right), letterCount.get(s.charAt(right)) - 1);

                if (letterCount.get(s.charAt(right)) >= 0) {
                    ++count;
                }
            }

            // update minimum window when characters in t are all in substring
            while (count == t.length()) {
                if (minLength > right - left + 1) {
                    minLength = right - left + 1;
                    result = s.substring(left, right + 1); 
                }

                // shrink substring from the left by one character
                if (letterCount.containsKey(s.charAt(left))) {
                    letterCount.put(s.charAt(left), letterCount.get(s.charAt(left) + 1));

                    if (letterCount.get(s.charAt(left)) > 0) {
                        --count;
                    }
                }
                ++left;
            }
        }

        return result;
    }
}
