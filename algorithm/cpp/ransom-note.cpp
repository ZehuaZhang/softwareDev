// 383. Ransom Note
// Difficulty: Easy

// Given an arbitrary ransom note string and another string containing letters from all the magazines,
// write a function that will return true 
// if the ransom note can be constructed from the magazines ; otherwise, it will return false.

// Each letter in the magazine string can only be used once in your ransom note.

// Note:
// You may assume that both strings contain only lowercase letters.

// canConstruct("a", "b") -> false
// canConstruct("aa", "ab") -> false
// canConstruct("aa", "aab") -> true

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  bool canConstruct(string ransomNote, string magazine) {
    unordered_map<char, int> cnt;
    for (const auto& c : ransomNote) {
      ++cnt[c];
    }
    for (const auto& c : magazine) {
      if (--cnt[c] == 0) {
        cnt.erase(c);
      }
    }
    return cnt.size() == 0;
  }
};

// Time:  O(n)
// Space: O(1)

class Solution2 {
public:
  bool canConstruct(string ransomNote, string magazine) {
    vector<int> counts(26);
    int letters = 0;
    for (const auto& c : ransomNote) {
      if (counts[c - 'a']++ == 0) {
        ++letters;
      }
    }
    for (const auto& c : magazine) {
      if (--counts[c - 'a'] == 0 && --letters == 0) {
        break;
      }
    }
    return letters == 0;
  }
};