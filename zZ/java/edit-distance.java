/**
 * Edit Distance
 * 
 * Given two words word1 and word2, find the minimum number of steps required to convert word1 to word2. (each operation is counted as 1 step.)
 * 
 * You have the following 3 operations permitted on a word:
 * 
 * a) Insert a character
 * b) Delete a character
 * c) Replace a character
 */

public class Solution {
    public int minDistance(String word1, String word2) {
        if (word1 == null || word2 == null) {
            throw new NullPointerException();
        }

        int word1Length = word1.length(), word2Length = word2.length();
        int[][] minDistance = new int[word1Length + 1][word2Length + 1];
        for (int i = 0; i <= word1Length; ++i) {
            minDistance[i][0] = i;
        }
        for (int j = 0; j <= word2Length; ++j) {
            minDistance[0][j] = j;
        }

        for (int i = 1; i <= word1Length; ++i) {
            for (int j = 1; j <= word2Length; ++j) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    minDistance[i][j] = minDistance[i - 1][j - 1];
                } else {
                    minDistance[i][j] = Math.min(minDistance[i - 1][j - 1], Math.min(minDistance[i - 1][j], minDistance[i][j - 1])) + 1;
                }
            }
        }

        return minDistance[word1Length][word2Length];
    }
}
