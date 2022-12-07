/*
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

class TrieNode {
  constructor() {
    this.leaves = new Map();
    this.string = '';
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(s) {
    let curr = this.root;
    for (const c of s) {
      if (!curr.leaves.has(c)) {
        curr.leaves.set(c, new TrieNode());
      }
      curr = curr.leaves.get(c);
    }
    curr.string = s;
  }
}

function findWords(board, words) {
  const t = new Trie();
  const result = [];
  const visited = Array(board.length)
    .fill(0)
    .map(() => Array(board[0].length).fill(false));
  for (const word of words) {
    t.insert(word);
  }
  for (let i = 0; i < board.length; ++i) {
    for (let j = 0; j < board[0].length; ++j) {
      if (t.root.leaves.has(board[i][j])) {
        findWordsDFS(
          board,
          t.root.leaves.get(board[i][j]),
          i,
          j,
          visited,
          result
        );
      }
    }
  }
  return result;
}

function findWordsDFS(board, node, i, j, visited, result) {
  if (node.string.length !== 0) {
    result.push(node.string);
    node.string = '';
  }
  visited[i][j] = true;
  for (const [dx, dy] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    const x = i + dx,
      y = j + dy;
    if (
      x >= 0 &&
      x < board.length &&
      y >= 0 &&
      y < board[0].length &&
      node.leaves.has(board[x][y]) &&
      !visited[x][y]
    ) {
      findWordsDFS(board, node.leaves.get(board[x][y]), x, y, visited, result);
    }
  }
  visited[i][j] = false;
}
