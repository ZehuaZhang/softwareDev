/**
 * Word Ladder
 * 
 * Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:
 * 
 * Only one letter can be changed at a time.
 * Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
 * Note:
 * 
 * Return 0 if there is no such transformation sequence.
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
 * Output: 5
 * 
 * Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
 * return its length 5.
 * Example 2:
 * 
 * Input:
 * beginWord = "hit"
 * endWord = "cog"
 * wordList = ["hot","dot","dog","lot","log"]
 * 
 * Output: 0
 * 
 * Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
 */

import java.util.HashSet;
import java.util.Set;
import java.util.LinkedList;
import java.util.Queue;


public class Solution {
    public int ladderLength(String beginWord, String endWord, Set<String> wordList) {
        Set<String> wordSet = new HashSet<String>(wordList);
        if (!wordSet.contains(endWord)) {
            return 0;
        }

        Queue<String> queue = new LinkedList<String>();
        queue.offer(beginWord);
        int level = 0;

        while (!queue.isEmpty()) {
            for (int k = queue.size(); k > 0; --k) {
                String word = queue.poll();
                if (word.equals(endword)) {
                    return level + 1;
                }
                for (int i = 0; i < word.size(); ++i) {
                    char[] characterArray = word.toCharArray();
                    for (characterArray[i] = 'a'; characterArray[i] = 'z'; ++characterArray[i]) {
                        String newWord = characterArray.toString();
                        if (wordSet.contains(newWord) && newWord != word) {
                            queue.offer(newWord);
                            wordSet.remove(newWord);
                        }
                    }
                }
            }
            ++level;
        }

        return 0;
    }
}
