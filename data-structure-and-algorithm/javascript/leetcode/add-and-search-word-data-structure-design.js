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
        this.leaves = {}
        this.isWord = false
    }   
}

class WordDictionary {
    constructor() {
        this.root = new TrieNode()
    }
    
    addWord(word) {
        let node = this.root
        
        for (const character of word) {
            if (!node.leaves.hasOwnProperty(character)) {
                node.leaves[character] = new TrieNode()
            }
            node = node.leaves[character]
        }
        
        node.isWord = true
    }
    
    search(word) {
        return this.searchHelper(word, 0, this.root)
    }
    
    searchHelper(word, index, node) {
        if (!node) {
            return false
        }
        
        if (index === word.length) {
            return node.isWord
        }
        
        if (word[index] === '.') {
            return Object.keys(node.leaves).filter(character => node.leaves.hasOwnProperty(character))
                .some(character => this.searchHelper(word, index + 1, node.leaves[character]))
        }
        
        if (!node.leaves.hasOwnProperty(word[index])) {
            return false
        }
        
        return this.searchHelper(word, index + 1, node.leaves[word[index]])
    }
}