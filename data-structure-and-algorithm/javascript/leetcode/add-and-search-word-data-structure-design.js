// 211. Add and Search Word - Data structure design

// Design a data structure that supports the following two operations:

// void addWord(word)
// bool search(word)
// search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means it can represent any one letter.

// Example:

// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true
// Note:
// You may assume that all words are consist of lowercase letters a-z.

class TrieNode {
    constructor() {
        this.leaves = {};
        this.isWord = false;
    }
}

class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param { string } word 
     */
    addWord(word) {
        let curr = root;
        for (const char of word) {
            if (curr.leaves.hasOwnProperty(char)) {
                curr.leaves[char] = new TrieNode(); 
            }
            curr = curr.leaves[char];
        }
        curr.isWord = true;
    }

    /**
     * @param { string } word
     * @returns { boolean } 
     */
    search(word) {
        return this.searchWord(word, this.root, 0);
    }

    /**
     * @param { string } word
     * @param { TrieNode } node
     * @param { number } index
     * @returns { boolean }
     */
    searchWord(word, node, index) {
        if (index === word.length) {
            return node.isWord;
        }

        const char = word[index];
        if (char !== '.') {
            if (!node.hasOwnProperty(char)) {
                return false;
            }
            return this.searchWord(word, node.leaves[char], index + 1);
        }

        for (const leaf of Object.keys(node.leaves)) {
            if (this.searchWord(word, leaf, index + 1)) {
                return true;
            }
        }

        return false;
    }
}