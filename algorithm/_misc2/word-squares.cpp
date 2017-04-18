// 425. Word Squares
// Difficulty: Hard

// Given a set of words (without duplicates), find all word squares you can build from them.

// A sequence of words forms a valid word square if the kth row and column read the exact same string, 
// where 0 ≤ k < max(numRows, numColumns).

// For example, the word sequence ["ball","area","lead","lady"] forms a word square
// because each word reads the same both horizontally and vertically.

// b a l l
// a r e a
// l e a d
// l a d y
// Note:

// There are at least 1 and at most 1000 words.
// All words will have the exact same length.
// Word length is at least 1 and at most 5.
// Each word contains only lowercase English alphabet a-z.


// Example 1:

// Input:
// ["area","lead","wall","lady","ball"]

// Output:
// [
//   [ "wall",
//     "area",
//     "lead",
//     "lady"
//   ],
//   [ "ball",
//     "area",
//     "lead",
//     "lady"
//   ]
// ]

// Explanation:
// The output consists of two word squares. The order of output does not matter
// (just the order of words in each word square matters).


// Example 2:

// Input:
// ["abat","baba","atan","atal"]

// Output:
// [
//   [ "baba",
//     "abat",
//     "baba",
//     "atan"
//   ],
//   [ "baba",
//     "abat",
//     "baba",
//     "atal"
//   ]
// ]

// Explanation:
// The output consists of two word squares. The order of output does not matter
// (just the order of words in each word square matters).

// Time:  O(n^2 * n!)
// Space: O(n^2)

class Solution {
public:
  vector<vector<string>> wordSquares(vector<string>& words) {
    vector<vector<string>> result;
    vector<string> curr;
    TrieNode* trie = buildTrie(words);
    
    for (const auto& word : words) {
      curr.emplace_back(word);
      wordSquaresHelper(words, trie, curr, result);
      curr.pop_back();
    }
    return result;
  }

private:
  void wordSquaresHelper(const vector<string>& words, TrieNode* trie, vector<string>& curr, vector<vector<string>>& result) {
    if (curr.size() >= words[0].length()) {
      return result.emplace_back(curr);
    }

    TrieNode* node = trie;     
    for (const auto& str : curr) {
      if (!(node = node->children[str[curr.size()] - 'a'])) {
        return;
      }
    }

    for (const auto& i : node.idx) {
      curr.emplace_back(words[i]);
      wordSquaresHelper(words, trie, curr, result);
      curr.pop_back();
    }
  }

  struct TrieNode {
    vector<int> idx;
    vector<TrieNode*> children;
    TrieNode() : children(26, nullptr) {}
  };

  TrieNode* buildTrie(const vector<string>& words) {
    TrieNode* root = new TrieNode();
    for (int i = 0; i < words.size(); ++i) {
      TrieNode* curr = root;
      for (const auto& c : words[i]) {
        if (!curr->children[c - 'a']) {
          curr->children[c - 'a'] = new TrieNode();
        }
        curr = curr->children[c - 'a'];
        curr->idx.push_back(i);
      }
    }
    return root;
  }
};