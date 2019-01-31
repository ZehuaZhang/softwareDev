/**
 * Add and Search Word - Data structure design
 * 
 * Design a data structure that supports the following two operations:
 * 
 * void addWord(word)
 * bool search(word)
 * search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means it can represent any one letter.
 * 
 * For example:
 * 
 * addWord("bad")
 * addWord("dad")
 * addWord("mad")
 * search("pad") -> false
 * search("bad") -> true
 * search(".ad") -> true
 * search("b..") -> true
 * Note:
 * You may assume that all words are consist of lowercase letters a-z.
 * 
 * click to show hint.
 * 
 * You should be familiar with how a Trie works. If not, please work on this problem: Implement Trie (Prefix Tree) first.
 */

import java.util.HashMap;
import java.util.Map;

public class WordDictionary {
    public WordDictionary() {
        root = new TrieNode();
    }

    public void addWord(String word) {
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
        return searchHelper(word, root, 0);
    }

    private boolean searchHelper(String word, TrieNode node, int position) {
        if (position == word.length()) {
            return node != null && node.isWord;
        }

        if (word.charAt(position) == '.') {
            for (TrieNode leaf : node.leaves.values()) {
                if (searchHelper(word, leaf, position + 1)) {
                    return true;
                }
            }
        } else {
            if (!node.leaves.containsKey(word.charAt(position))) {
                return false;
            }
            return searchHelper(word, node.leaves.get(word.charAt(position)), position + 1);
        }

        return false;
    }

    private TrieNode root;

    private class TrieNode {
        Map<Character, TrieNode> leaves;
        boolean isWord;

        TrieNode() {
            leaves = new HashMap<>();
            isWord = false;
        }
    }
}