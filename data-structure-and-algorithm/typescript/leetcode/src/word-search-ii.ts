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

import {Trie, TrieNode} from './data-structure/Trie';

function findWords(board: string[][], words: string[]): string[] {
  const trie = new Trie();
  const [rows, cols] = [board.length, board[0].length];
  const visited = [...Array(rows)].map(() => Array(cols).fill(false));
  for (const word of words) {
    trie.addWord(word);
  }
  const result = new Set<string>();
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      const char = board[i][j];
      if (trie.root.leaves.has(char)) {
        findWordsDfs(trie.root.leaves.get(char)!, i, j);
      }
    }
  }
  return [...result];

  function findWordsDfs(node: TrieNode, i: number, j: number): void {
    if (node.isWord) {
      result.add(node.word);
    }
    visited[i][j] = true;
    for (const [dx, dy] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const [x, y] = [i + dx, j + dy];
      if (
        x >= 0 &&
        x < rows &&
        y >= 0 &&
        y < cols &&
        node.leaves.has(board[x][y]) &&
        !visited[x][y]
      ) {
        findWordsDfs(node.leaves.get(board[x][y])!, x, y);
      }
    }
    visited[i][j] = false;
  }
}
