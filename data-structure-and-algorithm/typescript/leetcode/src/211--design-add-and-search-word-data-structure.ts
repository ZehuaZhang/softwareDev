/**
211. Design Add and Search Words Data Structure
Solved
Medium
Topics
Companies
Hint
Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
 

Example:

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
 

Constraints:

1 <= word.length <= 25
word in addWord consists of lowercase English letters.
word in search consist of '.' or lowercase English letters.
There will be at most 2 dots in word for search queries.
At most 104 calls will be made to addWord and search.
*/

class WordDictionary {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  addWord(word: string): void {
    let curr = this.root;
    for (const c of word) {
      if (!curr.leaves.has(c)) {
        curr.leaves.set(c, new TrieNode());
      }
      curr = curr.leaves.get(c);
    }
    curr.isWord = true;
  }

  search(word: string): boolean {
    return dfs(this.root, 0);

    function dfs(curr: TrieNode, i: number) {
      if (i === word.length) {
        return curr.isWord;
      }

      const c = word[i];
      if (c !== '.') {
        if (!curr.leaves.has(c)) {
          return false;
        }
        return dfs(curr.leaves.get(c), i + 1);
      }

      for (const node of curr.leaves.values()) {
        if (dfs(node, i + 1)) {
          return true;
        }
      }

      return false;
    }
  }
}

class TrieNode {
  leaves: Map<string, TrieNode>;
  isWord: boolean;

  constructor() {
    this.leaves = new Map<string, TrieNode>();
    this.isWord = false;
  }
}
