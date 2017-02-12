// 211. Add and Search Word - Data structure design
// Difficulty: Medium

// Design a data structure that supports the following two operations:

// void addWord(word)
// bool search(word)
// search(word) can search a literal word or a regular expression string containing only letters a-z or .
// . means it can represent any one letter.

// Your WordDictionary object will be instantiated and called as such:
// WordDictionary wordDictionary;
// wordDictionary.addWord("word");
// wordDictionary.search("pattern");

// For example:

// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true
// Note:
// You may assume that all words are consist of lowercase letters a-z.

// Hint:
// You should be familiar with how a Trie works. If not, please work on this problem: Implement Trie (Prefix Tree) first.

// Time:  O(min(n, h)), per operation
// Space: O(min(n, h))

class WordDictionary {
public:
    struct TrieNode {
        bool isString = false;
        unordered_map<char, TrieNode *> leaves;
    };

    WordDictionary() {
        _root = new TrieNode();
        _root->isString = false;
    }

    // Adds a word into the data structure.
    void addWord(string word) {
            TrieNode* curr = _root;
            for (const auto& c : word) {
                if (!curr->leaves.count(c)) {
                    curr->leaves[c] = new TrieNode();
                }
                curr = curr->leaves[c];
            }
            curr->isString = true;
    }

    // Returns if the word is in the data structure. A word could
    // contain the dot character '.' to represent any one letter.
    bool search(string word) {
        return searchWord(word, _root, 0);
    }

    bool searchWord(string word, TrieNode *node, int index) {
        if (index == word.length()) {
            return node->isString;
        }
        // Match the char.
        if (node->leaves.count(word[index])) {
            return searchWord(word, node->leaves[word[index]], index + 1);
        } else if (word[index] == '.') {  // Skip the char.
            for (auto leaf : node->leaves) {
                if (searchWord(word, leaf.second, index + 1)) {
                    return true;
                }
            }
        }
        return false;
    }

private:
    TrieNode *_root;
};
