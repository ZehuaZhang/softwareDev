/**
 * Implement Trie (Prefix Tree)
 * 
 * Implement a trie with insert, search, and startsWith methods.
 * 
 * Note:
 * You may assume that all inputs are consist of lowercase letters a-z.
 */

import java.util.HashMap;
import java.util.Map;

public class Trie {
    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode node = root;

        for (char letter : word.toCharArray()) {
            if (!node.leaves.containsKey(letter)) {
                node.leaves.put(letter, new TrieNode());
            }

            node = node.leaves.get(letter);
        }

        node.isWord = true;
    }

    public boolean search(String word) {
        TrieNode node = root;

        for (char letter : word.toCharArray()) {
            if (!node.leaves.containsKey(letter)) {
                return false;
            }
            node = node.leaves.get(letter);
        }

        return node.isWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode node = root;

        for (char letter : prefix.toCharArray()) {
            if (!node.leaves.containsKey(letter)) {
                return false;
            }

            node = node.leaves.get(letter);
        }

        return true;
    }

    private TrieNode root;
}

class TrieNode {
    Map<Character, TrieNode> leaves;
    boolean isWord;

    TrieNode() {
        leaves = new HashMap<>();
        isWord = false;
    }
}