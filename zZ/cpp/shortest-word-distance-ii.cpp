// 244. Shortest Word Distance II
// Difficulty : Medium

// This is a follow up of Shortest Word Distance. The only difference is now you are given the list of words 
// and your method will be called repeatedly many times with different parameters. How would you optimize it?

// Design a class which receives a list of words in the constructor, and implements a method that takes two words word1 
// and word2 and return the shortest distance between these two words in the list.

// For example,
// Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

// Given word1 = “coding”, word2 = “practice”, return 3.
// Given word1 = "makes", word2 = "coding", return 1.

// Note:
// You may assume that word1 does not equal to word2, and word1 and word2 are both in the list.

// Time:  ctor: O(n), shortest: O(a + b), a, b is occurences of word1, word2
// Space: O(n)

class WordDistance {
public:
  WordDistance(vector<string> words) {
    for (int i = 0; i < words.size(); ++i) {
      idx[words[i]].emplace_back(i);
    }
  }

  int shortest(string word1, string word2) {
    const vector<int>& idx1 = idx[word1];
    const vector<int>& idx2 = idx[word2];

    int dist = INT_MAX;
    for (int i = 0, j = 0; i < idx1.size() && j < idx2.size();) {
      dist = min(dist, abs(idx1[i] - idx2[j]));
      idx1[i] < idx2[j] ? ++i : ++j;
    }
    return dist;
  }

private:
  unordered_map<string, vector<int>> idx;
};
