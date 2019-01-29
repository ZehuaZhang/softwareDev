/**
 * Longest Substring with At Most Two Distinct Characters
 * 
 * Given a string S, find the length of the longest substring T that contains at most two distinct characters.
 * For example,
 * Given S = “eceba”,
 * T is “ece” which its length is 3.
 */

import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int lengthOfLongestSubstringTwoDistinct(String s) {
        Map<Character, Integer> characterCount = new HashMap<>();

        int maxLength = 0;
        int start = 0;
        int distinctCount = 2;
        for (int i = 0; i < s.length(); ++i) {
            characterCount.put(s.charAt(i), characterCount.getOrDefault(s.charAt(i), 0) + 1);

            while (characterCount.size() > distinctCount) {
                characterCount.put(s.charAt(start), characterCount.get(s.charAt(start)) - 1);
                if (characterCount.get(s.charAt(start)) == 0) {
                    characterCount.remove(s.charAt(start));
                }
                ++start;
            }

            maxLength = Math.max(maxLength, i - start + 1);
        }

        return maxLength;
    }
}
