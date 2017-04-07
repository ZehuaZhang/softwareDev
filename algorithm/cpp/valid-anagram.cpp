// 242. Valid Anagram
// Difficulty: Easy

// Given two strings s and t, write a function to determine if t is an anagram of s.

// For example,
// s = "anagram", t = "nagaram", return true.
// s = "rat", t = "car", return false.

// Note:
// You may assume the string contains only lowercase alphabets.

// Follow up:
// What if the inputs contain unicode characters? How would you adapt your solution to such case?

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  bool isAnagram(string s, string t) {
    if (s.length() != t.length()) {
      return false;
    }

    unordered_map<char, int> count;

    for (const auto& c: s) {
      ++count[tolower(c)];
    }

    for (const auto& c: t) {
      if (--count[tolower(c)] < 0) {
        return false;
      }
    }

    return true;
  }
};