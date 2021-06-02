import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Word Search II
 * 
 * Given a 2D board and a list of words from the dictionary, find all words in the board.
 * 
 * Each word must be constructed from letters of sequentially adjacent cell,
 * where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
 * 
 * For example,
 * Given words = ["oath","pea","eat","rain"] and board =
 * 
 * [
 *   ['o','a','a','n'],
 *   ['e','t','a','e'],
 *   ['i','h','k','r'],
 *   ['i','f','l','v']
 * ]
 * Return ["eat","oath"].
 * 
 * Note:
 * You may assume that all inputs are consist of lowercase letters a-z.
 * 
 * click to show hint.
 * 
 * You would need to optimize your backtracking to pass the larger test. Could you stop backtracking earlier?
 * 
 * If the current candidate does not exist in all words' prefix, you could stop backtracking immediately.
 * What kind of data structure could answer such query efficiently?
 * Does a hash table work?
 * Why or why not?
 * How about a Trie?
 * If you would like to learn how to implement a basic trie, please work on this problem: Implement Trie (Prefix Tree) first.
 */

public class Solution {
	public List<List<String>> findWords(char[][] board, Set<String> words) {
		List<String> result = new ArrayList<>();
		boolean[][] visited = new boolean[board.length][board[0].length];

		Trie trie = new Trie();
		for (String word : words) {
			trie.addWord(word);
		}

		for (int i = 0; i < board.length; ++i) {
			for (int j = 0; j < board[0].length; ++j) {
				findWordsHelper(board, trie.getRoot(), i, j, "", visited, result);
			}
		}
	
		return result;
	}

	public void findWordsHelper(char[][] board, TrieNode node, int x, int y, String path, boolean[][] visited, List<String> result) {
		if (node.isString) {
			result.add(path);
		} else {
			int[][] dirs = new int[][] {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

			for (int[] dir : dirs) {
				int nextX = x + dir[0];
				int nextY = y + dir[1];
				if (
					nextX >= 0 && nextX < board.length && nextY >= 0 && nextY < board[0].length &&
					!visited[nextX][nextY] &&
					node.leaves.containsKey(board[nextX][nextY])) {
					
					visited[nextX][nextY] = true;
					findWordsHelper(board, node.leaves.get(board[nextX][nextY]), nextX, nextY, path + board[nextX][nextY], visited, result);
					visited[nextX][nextY] = false;
				}
			}
		}
	}

	private class Trie {
		public Trie() {
			root = new TrieNode();
		}

		public TrieNode getRoot() {
			return root;
		}

		public void addWord(String word) {
			TrieNode node = root;

			for (char letter : word.toCharArray()) {
				if (!node.leaves.containsKey(letter)) {
					node.leaves.put(letter, new TrieNode());
				}
				node = node.leaves.get(letter);
			}
			
			node.isString = true;
		}

		public boolean searchWord(String word) {
			TrieNode node = root;

			for (char letter : word.toCharArray()) {
				if (!node.leaves.containsKey(letter)) {
					return false;
				}
			}

			return node.isString;
		}

		private TrieNode root;
	}

	private class TrieNode {
		Map<Character, TrieNode> leaves;
		boolean isString;

		TrieNode() {
			leaves = new HashMap<>();
			isString = false;
		}
	}
}
