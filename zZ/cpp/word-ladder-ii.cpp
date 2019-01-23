// 126. Word Ladder II
// Difficulty : Hard

// Given two words (start and end), and a dictionary,
// find all shortest transformation sequence(s) from start to end, such that:

// Only one letter can be changed at a time
// Each intermediate word must exist in the dictionary
// For example,

// Given:
// start = "hit"
// end = "cog"
// dict = ["hot","dot","dog","lot","log"]
// Return
//   [
//     ["hit","hot","dot","dog","cog"],
//     ["hit","hot","lot","log","cog"]
//   ]
// Note:
// All words have the same length.
// All words contain only lowercase alphabetic characters.

class Solution {
public:
  vector<vector<string>> findLadders(string beginWord, string endWord, unordered_set<string>& wordDict) {
    unordered_map<string, int> pathLength;
    unordered_map<string, vector<string>> nextWords;
    queue<string> q;
    pathLength[beginWord] = 1;
    q.push(beginWord);

    vector<vector<string>> result;
    int minLevel = INT_MAX;
    while (!q.empty()) {
      string word = q.front(); q.pop();
      for (int i = 0; i < word.size(); ++i) {
        string newWord = word;
        for (char ch = 'a'; ch <= 'z'; ++ch) {
          newWord[i] = ch;
          if (newWord == endWord) {
            minLevel = pathLength[word] + 1;
            nextWords[word].push_back(newWord);
          } else if (wordDict.count(newWord) && !pathLength.count(newWord) && minLevel == INT_MAX) {
            nextWords[word].push_back(newWord);
            q.push(newWord);
            pathLength[newWord] = pathLength[word] + 1;
          }
        }
      }
    }
    if (minLevel == INT_MAX) {
      return {};
    }
    vector<string> path;
    genPath(nextWords, beginWord, endWord, path, result);
    return result;
  }

  void genPath(unordered_map<string, vector<string>>& nextWords, const string& curr, const string& end,  
    vector<string>& path, vector<vector<string>>& result) {
    path.push_back(curr);
    if (curr == end) {
      result.push_back(path);
    }
    for (auto next : nextWords[curr]) {
      genPath(nextWords, next, end, path, result);
    }
    path.pop_back();
  }
};