// 340. Longest Substring with At Most K Distinct Characters
// Difficulty : Hard 

// Given a string, find the length of the longest substring T that contains at most k distinct characters.

// For example, Given s = “eceba” and k = 2,

// T is "ece" which its length is 3.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int lengthOfLongestSubstringKDistinct(string s, int k) {
    int maxLen = 0, start = 0;
    unordered_map<char, int> distinctChar;
    for (int i = 0; i < s.size(); ++i) {
      ++distinctChar[s[i]];
      while (distinctChar.size() > k) {
        if (--distinctChar[s[start]] == 0) {
          distinctChar.erase(s[start]);
        }
        ++start;
      }
      maxLen = max(maxLen, i - start + 1);
    }
    return maxLen;
  }
};
