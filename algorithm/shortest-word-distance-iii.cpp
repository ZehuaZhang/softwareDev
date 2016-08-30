245. Shortest Word Distance III
Diffifulty: Medium

This is a follow up of Shortest Word Distance. The only difference is now word1 could be the same as word2.

Given a list of words and two words word1 and word2, return the shortest distance between these two words in the list.

word1 and word2 may be the same and they represent two individual words in the list.

For example,
Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

Given word1 = “makes”, word2 = “coding”, return 1.
Given word1 = "makes", word2 = "makes", return 3.

Note:
You may assume word1 and word2 are both in the list.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    int shortestWordDistance(vector<string>& words, string word1, string word2) {
        int dist = INT_MAX;
        for (int i = 0, index1 = -1, index2 = -1; i < words.size(); ++i) {
            if (words[i] == word1) {
                if (index1 != -1) {
                    dist = min(dist, abs(index1 - i));
                }
                index1 = i;
            } else if (words[i] == word2) {
                index2 = i;
            }
            if (index1 != -1 && index2 != -1) {
                dist = min(dist, abs(index1 - index2));
            }
        }
        return dist;
    }
};
