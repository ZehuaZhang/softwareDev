/**
 * Substring with Concatenation of All Words
 *  
 * You are given a string, s, and a list of words, words, that are all of the same length.
 * Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.
 * 
 * For example, given:
 * s: "barfoothefoobarman"
 * words: ["foo", "bar"]
 * 
 * You should return the indices: [0,9].
 * (order does not matter).
 */

import java.util.Map;

public class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        if (s == null || words == null) {
            throw new NullPointerException();
        }

        List<Integer> result = new ArrayList<>();
        if (s.length() == 0 || words.length == 0) {
            return result;
        }

        int wordLength = words[0].length();
        int wordListCount = words.length;
        int dictLength = wordLength * wordListCount;

        Map<String, Integer> wordCountMap = new HashMap<String, Integer>();
        for (String word : words) {
            int count = wordCountMap.getOrDefault(word, 0) + 1;
            wordCountMap.put(word, count);
        }

        for (int i = 0; i <= s.length() - dictLength; ++i) {
            Map<String, Integer> currWordCountMap = new HashMap<String, Integer>();
            int j = 0;
            for (j = 0; j < wordListCount; ++j) {
                String word = s.substring(i + j * wordLength, i + (j + 1) * wordLength);
                if (!wordCountMap.containsKey(word)) {
                    break;
                }
                int wordCount = currWordCountMap.getOrDefault(word, 0) + 1;
                if (wordCount > wordCountMap.get(word)) {
                    break;
                }
                currWordCountMap.put(word, wordCount);
            }

            if (j == wordListCount) {
                result.add(j);
            }
        }

        return result;
    }
}