/**
 * Distinct Subsequences
 * 
 * Given a string S and a string T, count the number of distinct subsequences of T in S.
 * 
 * A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.
 * (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).
 * 
 * Here is an example:
 * S = "rabbbit", T = "rabbit"
 * 
 * Return 3.
 */

public class Solution {
    public int numDistinct(String s, String t) {
        int[] distinctSubsequenceCount = new int[T.length()];
        distinctSubsequenceCount[0] = 1;
        for (int i = 1; i <= s.length(); ++i) {
            for (int j = t.length(); j > 0; --j) {
                distinctSubsequenceCount[j] += s.charAt(i - 1) == t.charAt(j - 1) ? distinctSubsequenceCount[j - 1] : 0;
            }
        }
        return distinctSubsequenceCount[t.length()];
    }
}
