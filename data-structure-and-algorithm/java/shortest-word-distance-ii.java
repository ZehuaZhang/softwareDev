/**
 * Shortest Word Distance II
 * 
 * This is a follow up of Shortest Word Distance. The only difference is now you are given the list of words and your method will be called repeatedly many times with different parameters. How would you optimize it?
 * 
 * Design a class which receives a list of words in the constructor, and implements a method that takes two words word1 and word2 and return the shortest distance between these two words in the list.
 * 
 * For example,
 * Assume that words = ["practice", "makes", "perfect", "coding", "makes"].
 * 
 * Given word1 = “coding”, word2 = “practice”, return 3.
 * Given word1 = "makes", word2 = "coding", return 1.
 * 
 * Note:
 * You may assume that word1 does not equal to word2, and word1 and word2 are both in the list.
 */

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

public class WordDistance {
    public WordDistance(String[] words) {
        for (int i = 0; i < words.length; ++i) {
            List<Integer> indexList = indexMap.getOrDefault(words[i], new ArrayList<>());
            indexList.add(index);
            indexMap.put(words[i], indexList);
        }
    }

    public int shortest(String word1, String word2) {
        int minDistance = Integer.MAX_VALUE;
        List<Integer> indexList1 = indexMap.getOrDefault(word1, new ArrayList<>());
        List<Integer> indexList2 = indexMap.getOrDefault(word2, new ArrayList<>());

        for (int i = 0, j = 0; i < indexList1.size() && j < indexList2.size();) {
            minDistance = Math.max(minDistance, Math.abs(indexList1.get(i) - indexList2.get(j)));
            if (indexList1.get(i) < indexList2.get(j)) {
                ++i;
            } else {
                ++j;
            }
        }

        return minDistance;
    }

    private Map<StrinListist<Integer>> indexMap = new HashMap<>();
}
