/*
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

class TrieNode {
    constructor() {
        this.leaves = new Map();
        this.isWord = false;
    }
}

class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word) {
        let curr = this.root;
        for (const c of word) {
            if (!curr.leaves.has(c)) {
                curr.leaves.set(c, new TrieNode());
            }
            curr = curr.leaves.get(c);
        }
        curr.isWord = true;
    }

    search(word) {
        return dfs(word, 0, this.root)

        function dfs(word, index, node) {
            if (index === word.length) {
                return node.isWord;
            }
            const c = word[index];
            if (c !== '.') {
                if (!node.leaves.has(c)) {
                    return false;
                }
                return dfs(word, index + 1, node.leaves.get(c));
            }
            for (const next of node.leaves.values()) {
                if (dfs(word, index + 1, next)) {
                    return true;
                }
            }
            return false;
        }
    }
}