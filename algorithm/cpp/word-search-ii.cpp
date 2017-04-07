// 212. Word Search II
// Difficulty: Hard

// Given a 2D board and a list of words from the dictionary, find all words in the board.

// Each word must be constructed from letters of sequentially adjacent cell, 
// where "adjacent" cells are those horizontally or vertically neighboring.
// The same letter cell may not be used more than once in a word.

// For example,
// Given words = ["oath","pea","eat","rain"] and board =

// [
//   ['o','a','a','n'],
//   ['e','t','a','e'],
//   ['i','h','k','r'],
//   ['i','f','l','v']
// ]
// Return ["eat","oath"].

// Note:
// You may assume that all inputs are consist of lowercase letters a-z.

// Time:  O(m * n * h), h is height of trie
// Space: O(26^h)

class Solution {
public:
  vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
    vector<vector<bool>> visited(board.size(), vector<bool>(board[0].size(), false));
    TrieNode trie;
    for (const auto& word : words) {
      trie.Insert(word);
    }
    unordered_set<string> result;
    string path;
    for (int i = 0; i < board.size(); ++i) {
      for (int j = 0; j < board[0].size(); ++j) {
        findWordsDFS(board, visited, trie, i, j, path, result);
      }
    }
    return vector<string>(result.begin(), result.end());
  }
    
  void findWordsDFS(vector<vector<char>>& grid, vector<vector<bool>>& visited, TrieNode& trie,
    int i, int j, string cur, unordered_set<string>& result) {
    if (!trie || i < 0 || i >= grid.size() || j < 0 || j >= grid[0].size() ||
      !trie.leaves[grid[i][j]] || visited[i][j]) {
      return;
    }

    if (trie.isString) {
      result.insert(path);
    }

    visited[i][j] = true;
    for (const auto& d :  vector<pair<int, int>>{ {0, -1}, {0, 1}, {-1, 0}, {1, 0} }) {
      int I = i + d.first, J = j + d.second;
      findWordsDFS(grid, visited, trie.leaves[grid[i][j]], I, J, path + grid[i][j], result);
    }
    visited[i][j] = false;
  }

private:
  struct TrieNode {
    bool isString = false;
    unordered_map<char, TrieNode*> leaves;

    void Insert(const string& s) {
      TrieNode* p = this;
      for (const auto& c : s) {
        if (!p->leaves.count(c)) {
          p->leaves[c] = new TrieNode;
        }
        p = p->leaves[c];
      }
      
      p->isString = true;
    }

    ~TrieNode() {
      leaves.clear();
    }
  };
};
