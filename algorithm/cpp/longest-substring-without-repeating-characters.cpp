// 3. Longest Substring Without Repeating Characters
// Difficulty: Medium

// Given a string, find the length of the longest substring without repeating characters.

// Examples:
// Given "abcabcbb", the answer is "abc", which the length is 3.

// Given "bbbbb", the answer is "b", with the length of 1.

// Given "pwwkew", the answer is "wke", with the length of 3. 
// Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int lengthOfLongestSubstring(string s) {
    unordered_map<char, size_t> idx;
    size_t start = 0, ans = 0;

    for (size_t i = 0; i < s.size(); ++i) {
      if (idx.count(s[i]) && idx[s[i]] >= start) {
        start = idx[s[i]] + 1; 
      }
      idx[s[i]] = i;
      ans = max(ans, i - start);
    }
    return ans;
  }
};
