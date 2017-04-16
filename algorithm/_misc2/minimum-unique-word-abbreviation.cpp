// 411. Minimum Unique Word Abbreviation
// Difficulty: Hard

// A string such as "word" contains the following abbreviations:

// ["word", "1ord", "w1rd", "wo1d", "wor1", "2rd", "w2d", "wo2", "1o1d", "1or1", "w1r1", "1o2", "2r1", "3d", "w3", "4"]
// Given a target string and a set of strings in a dictionary,
// find an abbreviation of this target string with thesmallest possible length
// such that it does not conflict with abbreviations of the strings in the dictionary.

// Each number or letter in the abbreviation is considered length = 1. For example, the abbreviation "a32bc" has length = 4.

// Note:

// In the case of multiple answers as shown in the second example below, you may return any one of them.
// Assume length of target string = m, and dictionary size = n. You may assume that m ≤ 21, n ≤ 1000, and log2(n) + m ≤ 20.

// Examples:

// "apple", ["blade"] -> "a4" (because "5" or "4e" conflicts with "blade")

// "apple", ["plain", "amber", "blade"] -> "1p3" (other valid answers include "ap3", "a3e", "2p2", "3le", "3l1").

// Time:  O(2^n)
// Space: O(n)

class Solution {
public:
  string minAbbreviation(string target, vector<string>& dictionary) {
    priority_queue<pair<int, string>, vector<pair<int, string>>, greater<pair<int, string>>> q;
    generate(target, q);
    while (!q.empty()) {
      auto top = q.top(); q.pop();
      bool noConflict = true;
      for (string word : dictionary) {
        if (valid(word, top.second)) {
          noConflict = false;
          break;
        }
      }
      if (noConflict) {
        return top.second;
      }
    }
    return "";
  }

private:
  void generate(string target, priority_queue<pair<int, string>, vector<pair<int, string>>, greater<pair<int, string>>> &q) {
    for (int i = 0; i < pow(2, target.size()); ++i) {
      string out;
      int cnt = 0, len = 0;
      for (int j = 0; j <= target.size(); ++j) {
        if ((i >> j) & 1) {
          ++cnt;
        } else {
          if (cnt) {
            out += to_string(cnt);
            cnt = 0;
            ++len;
          }
          if (j < target.size()) {
            out += target[j];
            ++len;
          }
        }
      }
      q.emplace(len, out);
    }
  }

  bool valid(string word, string abbr) {
    int i = 0, digit = 0;
    for (const auto& c : abbr) {
      if (isdigit(c)) {
        if (digit == 0 && c == '0') {
          return false;
        } 
        digit = digit * 10 + c - '0';
      } else {
        i += digit;
        digit = 0;
        if (i >= word.length() || word[i++] != c) {
          return false;
        }
      }
    }
    return i + digit == word.length();
  }
};