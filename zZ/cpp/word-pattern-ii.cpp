// 291. Word Pattern II
// Difficulty : Hard 

// Given a pattern and a string str, find if str follows the same pattern.

// Here follow means a full match, such that there is a bijection between a letter in pattern 
// and a non-empty substring in str.

// Examples:

// pattern = "abab", str = "redblueredblue" should return true.
// pattern = "aaaa", str = "asdasdasdasd" should return true.
// pattern = "aabb", str = "xyzabcxzyabc" should return false.


// Notes:
// You may assume both pattern and str contains only lowercase letters.

// Time:  O(n * C(n - 1, c - 1)), n is length of str, c is unique count of pattern,
//                                there are H(n - c, c - 1) = C(n - 1, c - 1) possible splits of string,
//                                and each one costs O(n) to check if it matches the word pattern.
// Space: O(n + c) 

class Solution {
public:
  bool wordPatternMatch(string pattern, string str) {
    unordered_map<string, char> w2p;
    unordered_map<char, string> p2w;
    return match(pattern, str, 0, 0, w2p, p2w);
  }

  bool match(const string& pattern, const string& str, const int i, const int j,
    unordered_map<string, char>& w2p, unordered_map<char, string>& p2w) {
    if (i == pattern.length() && j == str.length()) {
      return true;
    }
    if (i == pattern.length() || j == str.length()) {
      return false;
    }
    
    if (p2w.count(pattern[i])) {
      const string& w = p2w[pattern[i]];
      if (w == str.substr(j, w.length())) {
        return match(pattern, str, i + 1, j + w.length(), w2p, p2w);
      }
    } else {
      for (int k = j; k < str.length(); ++k) {
        const string w = str.substr(j, k - j + 1);
        const char p = pattern[i];
        if (!w2p.count(w)) {
          w2p[w] = p, p2w[p] = w;
          if (match(pattern, str, i + 1, k + 1, w2p, p2w)) {
            return true;
          }
          w2p.erase(w), p2w.erase(p);
        }
      }
    }
    return false;
  }
};
