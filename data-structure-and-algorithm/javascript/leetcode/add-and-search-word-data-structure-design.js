/**
Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
 

Example:

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
 

Constraints:

1 <= word.length <= 500
word in addWord consists lower-case English letters.
word in search consist of  '.' or lower-case English letters.
At most 50000 calls will be made to addWord and search.
*/

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