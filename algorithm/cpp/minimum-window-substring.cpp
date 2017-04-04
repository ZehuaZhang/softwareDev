// 76. Minimum Window Substring
// Difficulty: Hard

// Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

// For example,
// S = "ADOBECODEBANC"
// T = "ABC"
// Minimum window is "BANC".

// Note:
// If there is no such window in S that covers all characters in T, return the empty string "".

// If there are multiple such windows, you are guaranteed that there will always be only one unique minimum window in S.

// Time:  O(n)
// Space: O(k)

class Solution {
public:
  string minWindow(string s, string t) {
    if (t.size() > s.size()) {
      return "";
    }
    unordered_map<char, int> cntT;
    for (char c : t) {
      ++cntT[c];
    }
    string result = "";
    int left = 0, count = 0, minLen = s.size() + 1;
    for (int right = 0; right < s.size(); ++right) {
      if (cntT.count(s[right]) && cntT[s[right]]-- > 0) {
        ++count;
      }
      while (count == t.size()) {
        if (right - left + 1 < minLen) {
          minLen = right - left + 1;
          result = s.substr(left, minLen);
        }
        if (cntT.count(s[left]) && ++cntT[s[left]] > 0) {
          --count;
        }
        ++left;
      }
    }
    return result;
  }
};
