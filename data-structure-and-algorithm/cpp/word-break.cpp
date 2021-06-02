// 139. Word Break
// Difficulty: Medium

// Given a string s and a dictionary of words dict, 
// determine if s can be segmented into a space-separated sequence of one or more dictionary words.

// For example, given
// s = "leetcode",
// dict = ["leet", "code"].

// Return true because "leetcode" can be segmented as "leet code".

// Time:  O(n * l^2), l is the max length of the words.
// Space: O(n)

class Solution {
public:
  bool wordBreak(string s, unordered_set<string>& wordDict) {
    vector<bool> f(s.size() + 1, false);
    f[0] = true;
    for (int i = 1; i <= s.size(); i++) {
      for (int j = 0; j < i; j++) {
        if (f[j] && wordDict.count(s.substr(j, i - j))) {
          f[i] = true;
          break;
        }
      }
    }
    return f[s.size()];
  }
};
