// 208. Implement Trie (Prefix Tree)
// Difficulty: Medium

// Implement a trie with insert, search, and startsWith methods.

// Note:
// You may assume that all inputs are consist of lowercase letters a-z.

// Time:  O(n), per operation
// Space: O(1)

class TrieNode {
public:
  // Initialize your data structure here.
  TrieNode() : isString(false) {
  }
  bool isString;
  unordered_map<char, TrieNode*> leaves;
};

class Trie {
public:
  Trie() {
    _root = new TrieNode();
  }

  // Inserts a word into the trie.
  void insert(string word) {
    TrieNode* curr = _root;
    for (auto c : word) {
      if (!curr->leaves.count(c)) {
        curr->leaves[c] = new TrieNode();
      }
      curr = curr->leaves[c];
    }
    curr->isString = true;
  }

  // Returns if the word is in the trie.
  bool search(string word) {
    TrieNode* node = childSearch(word);
    return node ? node->isString : false;   
  }

  // Returns if there is any word in the trie that starts with the given prefix.
  bool startsWith(string prefix) {
    return childSearch(prefix) != nullptr;
  }

  // return last character of word in Trie
  TrieNode* childSearch(const string& word) {
    TrieNode* curr = _root;
    for (const auto& c : word) {
      if (!curr->leaves.count(c)) {
        return nullptr;
      }
      curr = curr->leaves[c];
    }
    return curr;
  }

private:
  TrieNode* _root;
};

// Your Trie object will be instantiated and called as such:
// Trie trie;
// trie.insert("somestring");
// trie.search("key");
