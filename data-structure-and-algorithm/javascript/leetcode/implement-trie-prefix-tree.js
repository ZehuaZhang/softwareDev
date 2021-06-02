class TrieNode {
    constructor() {
        this.leaves = {}
        this.isWord = false
    }   
}

class Trie {
    constructor() {
        this.root = new TrieNode()
    }
    
    insert(word) {
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
        let node = this.root
        
        for (const character of word) {
            if (!node.leaves.hasOwnProperty(character)) {
                return false
            }
            node = node.leaves[character]
        }
        
        return node.isWord
    }
    
    startsWith(prefix) {
        let node = this.root
        
        for (const character of prefix) {
            if (!node.leaves.hasOwnProperty(character)) {
                return false
            }
            node = node.leaves[character]
        }
        
        return true
    }
}