/**
 * Word Break II 
 * 
 * Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.
 * 
 * Note:
 * 
 * The same word in the dictionary may be reused multiple times in the segmentation.
 * You may assume the dictionary does not contain duplicate words.
 * Example 1:
 * 
 * Input:
 * s = "catsanddog"
 * wordDict = ["cat", "cats", "and", "sand", "dog"]
 * Output:
 * [
 *   "cats and dog",
 *   "cat sand dog"
 * ]
 * Example 2:
 * 
 * Input:
 * s = "pineapplepenapple"
 * wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
 * Output:
 * [
 *   "pine apple pen apple",
 *   "pineapple pen apple",
 *   "pine applepen apple"
 * ]
 * Explanation: Note that you are allowed to reuse a dictionary word.
 * Example 3:
 * 
 * Input:
 * s = "catsandog"
 * wordDict = ["cats", "dog", "sand", "and", "cat"]
 * Output:
 * []
 */

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<String> wordBreak(String s, Set<String> wordDict) {
        boolean[] canBreak = new boolean[s.length() + 1];
        boolean[][] isWord = new boolean[s.length()][s.length()];

        canBreak[0] = true;
        for (int i = 0; i <= s.length(); ++i) {
            for (int j = 0; j < i; ++j) {
                if (canBreak[j] && wordDict.contains(s.substring(j, i))) {
                    canBreak[i] = true;
                    isWord[j][i - 1] = true;
                }
            }
        }

        List<String> result = new ArrayList<String>();
        if (canBreak[s.length()]) {
            List<String> path = new ArrayList<String>();
            generateWordBreak(s, 0, isWord, path, result);
        }
        return result;
    }

    private void generateWordBreak(String s, int start, boolean[][] isWord, List<String> path, List<String> result) {
        if (start == s.length()) {
            result.add(String.join(" ", path));
        } else {
            for (int i = start; i < s.length(); ++i) {
                if (isWord[start][i]) {
                    path.add(s.substring(start, i + 1));
                    generateWordBreak(s, i + 1, isWord, path, result);
                    path.remove(path.size() - 1);
                }
            }
        }
    }
}
