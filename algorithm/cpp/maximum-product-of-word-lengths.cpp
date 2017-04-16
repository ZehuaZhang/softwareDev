// 318. Maximum Product of Word Lengths 
// Difficulty: Medium

// Given a string array words, find the maximum value of length(word[i]) * length(word[j]) 
// where the two words do not share common letters. You may assume that each word will contain only lower case letters. 
// If no such two words exist, return 0.

// Example 1:
// Given ["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]
// Return 16
// The two words can be "abcw", "xtfn".

// Example 2:
// Given ["a", "ab", "abc", "d", "cd", "bcd", "abcd"]
// Return 4
// The two words can be "ab", "cd".

// Example 3:
// Given ["a", "aa", "aaa", "aaaa"]
// Return 0
// No such pair of words.

// Time:  O(nlogn) ~ O(n^2)
// Space: O(n)
// Sorting + Pruning + Bit Manipulation

class Solution {
public:
  int maxProduct(vector<string>& words) {
    sort(words.begin(), words.end(), [](const string& a, const string& b) { 
      return a.length() > b.length(); 
    });
    vector<int> bits(words.size());
    for (int i = 0; i < words.size(); ++i) {
      for (const auto& c : words[i]) {
        bits[i] |= (1 << (c - 'a'));
      }
    }
    int maxLen = 0;
    for (int i = 0; i + 1 < words.size() && pow(words[i].length(), 2) > maxLen; ++i) {
      for (int j = i + 1; j < words.size() && words[i].length() * words[j].length() > maxLen; ++j) {
        if (!(bits[i] & bits[j])) {
          maxLen = words[i].length() * words[j].length();
        }
      }
    }
    return maxLen;
  }
};
