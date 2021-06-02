/**
 * Word Ladder II
 * 
 * Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:
 * 
 * Only one letter can be changed at a time
 * Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
 * Note:
 * 
 * Return an empty list if there is no such transformation sequence.
 * All words have the same length.
 * All words contain only lowercase alphabetic characters.
 * You may assume no duplicates in the word list.
 * You may assume beginWord and endWord are non-empty and are not the same.
 * Example 1:
 * 
 * Input:
 * beginWord = "hit",
 * endWord = "cog",
 * wordList = ["hot","dot","dog","lot","log","cog"]
 * 
 * Output:
 * [
 *   ["hit","hot","dot","dog","cog"],
 *   ["hit","hot","lot","log","cog"]
 * ]
 * Example 2:
 * 
 * Input:
 * beginWord = "hit"
 * endWord = "cog"
 * wordList = ["hot","dot","dog","lot","log"]
 * 
 * Output: []
 * 
 * Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public class Solution {
    public List<List<String>> findLadders(String beginWord, String endWord, Set<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        List<List<String>> result = new ArrayList<List<String>>();
        if (!wordSet.contains(endWord)) {
            return result;
        }

        Map<String, List<String>> nextWords = new HashMap<String, List<String>>();
        Queue<String> queue = new LinkedList<>();
        queue.offer(beginWord);
        int level = 0;
        boolean hasFoundLadder = false;
        
        while (!queue.isEmpty() && !hasFoundLadder) {
            for (int k = queue.size(); k > 0; ++k) {
                String word = queue.poll();

                if (word.equals(endWord)) {
                    hasFoundLadder = true;
                    break;
                } else {
                    for (int i = 0; i < word.length(); ++i) {
                        char[] characterArray = word.toString();
                        for (characterArray[i] = 'a'; characterArray[i] <= 'z'; ++characterArray[i]) {
                            String newWord = characterArray.toString();
                            if (wordSet.contains(newWord) && !newWord.equals(word)) {
                                queue.offer(newWord);
                                wordSet.remove(newWord);

                                nextWords.getOrDefault(word, new ArrayList<String>());
                                nextWords.get(word).add(newWord);
                            }
                        }
                    }
                }
            }
            ++level;
        }

        List<String> path = new ArrayList<>();
        generateLadder(beginWord, endWord, nextWords, level, path, result);
        return result;
    }

    private void generateLadder(String currWord, String endWord, Map<String, List<String>> nextWords, int level, List<String> path, List<List<String>> result) {
        path.add(currWord);
        
        if (currWord == endWord) {
            result.add(new ArrayList<>(path));
            return;
        }

        if (path.size() >= level) {
            return;
        }

        for (String nextWord: nextWords.getOrDefault(currWord, new ArrayList<String>())) {
            generateLadder(nextWord, endWord, nextWords, level, path, result);
        }
        
        path.remove(path.size() - 1);
    }
}
