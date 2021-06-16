class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }
    
    /**
     * 
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
     * 
     * @param { string } word 
     * @returns 
     */
    search(word) {
        return this.searchWord(word, this.root, 0);
    }

    /**
     * 
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

class TrieNode {
    constructor() {
        this.leaves = {}
        this.isWord = false
    }   
}