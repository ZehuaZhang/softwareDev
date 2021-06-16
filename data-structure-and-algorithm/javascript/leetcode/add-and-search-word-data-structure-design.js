class WordDictionary {
    constructor() {
        this.root = new TrieNode()
    }
    
    /**
     * 
     * @param { string } word 
     */
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
    
    /**
     * 
     * @param { string } word 
     * @returns 
     */
    search(word) {
        return this.searchHelper(word, 0, this.root)
    }
    
    /**
     * 
     * @param { string } word 
     * @param { number } index 
     * @param { TrieNode } node 
     * @returns 
     */
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

class TrieNode {
    constructor() {
        this.leaves = {}
        this.isWord = false
    }   
}