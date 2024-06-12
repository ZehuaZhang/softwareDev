/*
212. Word Search II

Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

 

Example 1:


Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
Example 2:


Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
 

Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 12
board[i][j] is a lowercase English letter.
1 <= words.length <= 3 * 104
1 <= words[i].length <= 10
words[i] consists of lowercase English letters.
All the strings of words are unique.
*/

function findWords(board: string[][], words: string[]): string[] {
  const [m, n] = [board.length, board[0].length];
  const seen = [...Array(m)].map(() => Array(n).fill(false));
  const trie = new Trie();

  for (const word of words) {
    trie.addWord(word);
  }

  const rslt = new Set<string>();

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      const c = board[i][j];
      if (trie.root.leaves.has(c) && !seen[i][j]) {
        dfs(trie.root.leaves.get(c), i, j);
      }
    }
  }

  return [...rslt];

  function dfs(node: TrieNode, i: number, j: number) {
    if (node.isWord) {
      rslt.add(node.word);
    }

    seen[i][j] = true;

    for (const [dx, dy] of [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ]) {
      let x = i + dx,
        y = j + dy;
      if (
        x >= 0 &&
        x < m &&
        y >= 0 &&
        y < n &&
        node.leaves.has(board[x][y]) &&
        !seen[x][y]
      ) {
        dfs(node.leaves.get(board[x][y]), x, y);
      }
    }

    seen[i][j] = false;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  addWord(word: string) {
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
}

class TrieNode {
  leaves: Map<string, TrieNode>;
  isWord: boolean;
  word: string;

  constructor() {
    this.leaves = new Map<string, TrieNode>();
    this.isWord = false;
    this.word = '';
  }
}
