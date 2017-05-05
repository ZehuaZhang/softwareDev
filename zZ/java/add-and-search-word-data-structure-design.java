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

public class WordDictionary {
    private class TrieNode {
        boolean isWord;
        char c;
        Map<Character, TrieNode> hm;
        TrieNode() {
            isWord = false;
            leaves = new HashMap<>();
        }
    }
    
    // Adds a word into the data structure.
    private TrieNode root;
    public WordDictionary() {
        root = new TrieNode();
    }
    public void addWord(String word) {
        TrieNode cur = root;
        for (int i = 0; i < word.length(); ++i) {
            if (!cur.leaves.containsKey(word.charAt(i))) {
                TrieNode node = new TrieNode();
                node.c = word.charAt(i);
                cur.leaves.put(word.charAt(i), node);
            }
            cur = cur.leaves.get(word.charAt(i));
        }
        cur.isWord = true;
    }

    // Returns if the word is in the data structure. A word could
    // contain the dot character '.' to represent any one letter.
    public boolean search(String word) {
        return search(word, root, 0);
    }
    
    public boolean search(String word, TrieNode node, int index) {        
        if (index == word.length()) {
            return node.isWord;
        }
        if (node.leaves.containsKey(word.charAt(index))) {
            return search(word, node.leaves.get(word.charAt(index)), index + 1);
        } else if (word.charAt(index) == '.') {
            for(TrieNode leaf : node.leaves.values()) {
                if (search(word, leaf, index + 1)) {
                    return true;
                }
            }
        }
        return false;
    }
}

// Your WordDictionary object will be instantiated and called as such:
// WordDictionary wordDictionary = new WordDictionary();
// wordDictionary.addWord("word");
// wordDictionary.search("pattern");
