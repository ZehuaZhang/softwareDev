// 140. Word Break II
// Difficulty: Hard

// Given a string s and a dictionary of words dict, add spaces in s to construct a sentence 
// where each word is a valid dictionary word.

// Return all such possible sentences.

// For example, given
// s = "catsanddog",
// dict = ["cat", "cats", "and", "sand", "dog"].

// A solution is ["cats and dog", "cat sand dog"].

// Time:  O(n * l^2 + n * r), l is the max length of the words, 
//                            r is the number of the results.
// Space: O(n^2)

class Solution {
public:
  vector<string> wordBreak(string s, unordered_set<string>& wordDict) {
    const int n = s.length();
    vector<bool> canBreak(n + 1, false);
    vector<vector<bool>> valid(n, vector<bool>(n, false));
    canBreak[0] = true;
    for (int i = 1; i <= n; ++i) {
      for (int j = 0; j < i; ++j) {
        if (canBreak[j] && wordDict.count(s.substr(j, i - j))) {
          valid[j][i - 1] = true;
          canBreak[i] = true;
        }
      }
    }

    vector<string> result, path;
    if (canBreak[n]) {
      wordBreakHelper(s, valid, 0, path, result);
    }
    return result;
  }

private:
  void wordBreakHelper(const string& s, const vector<vector<bool>>& valid,
    int start, vector<string>& path, vector<string>& result) {
    if (start == s.length()) {
      ostringstream os;
      copy(path.begin(), prev(path.end()), ostream_iterator<string>(os, " ".c_str()));
      os << path.back();
      result.emplace_back(os.str());
      return;
    }
    for (int i = start; i < s.length(); ++i) {
      if (valid[start][i]) {
        path.emplace_back(s.substr(start, i - start + 1));
        wordBreakHelper(s, valid, i + 1, path, result);
        path.pop_back();
      }
    }
  }
};
