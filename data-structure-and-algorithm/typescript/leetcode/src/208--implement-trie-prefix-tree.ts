/*
208. Implement Trie (Prefix Tree)

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.


Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True


Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, search, and startsWith.
*/

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let curr = this.root;
    for (const c of word) {
      if (!curr.leaves.has(c)) {
        curr.leaves.set(c, new TrieNode());
      }
      curr = curr.leaves.get(c);
    }
    curr.isWord = true;
    curr.word = word;
  }

  search(word: string): boolean {
    return dfs(this.root, 0);

    function dfs(node: TrieNode, idx: number) {
      if (idx === word.length) {
        return node.isWord;
      }

      const c = word[idx];
      if (c !== ".") {
        if (!node.leaves.has(c)) {
          return false;
        }
        return dfs(node.leaves.get(c), idx + 1);
      }

      for (const leaf of node.leaves.values()) {
        if (dfs(leaf, idx + 1)) {
          return true;
        }
      }

      return false;
    }
  }

  startsWith(prefix: string): boolean {
    let curr = this.root;
    for (const c of prefix) {
      if (!curr.leaves.has(c)) {
        return false;
      }
      curr = curr.leaves.get(c);
    }
    return true;
  }
}

class TrieNode {
  isWord: boolean;
  word: string;
  leaves: Map<string, TrieNode>;
  constructor() {
    this.isWord = false;
    this.word = "";
    this.leaves = new Map();
  }
}
