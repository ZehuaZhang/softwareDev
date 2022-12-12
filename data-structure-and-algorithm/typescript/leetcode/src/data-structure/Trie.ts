export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  addWord(word: string): void {
    let curr = this.root;
    for (const char of word) {
      if (!curr.leaves.has(char)) {
        curr.leaves.set(char, new TrieNode());
      }
      curr = curr.leaves.get(char)!;
    }
    curr.isWord = true;
  }

  // search term could contain '.'
  search(word: string): boolean {
    return searchDFS(this.root, 0);

    function searchDFS(node: TrieNode, index: number): boolean {
      if (index === word.length) {
        return node.isWord;
      }

      const char = word[index];
      if (char !== '.') {
        if (!node.leaves.has(char)) {
          return false;
        }
        return searchDFS(node.leaves.get(char)!, index + 1);
      }

      for (const leaf of node.leaves.values()) {
        if (searchDFS(leaf, index + 1)) {
          return true;
        }
      }

      return false;
    }
  }

  startsWith(prefix: string): boolean {
    let node = this.root;

    for (const char of prefix) {
      if (!node.leaves.has(char)) {
        return false;
      }
      node = node.leaves.get(char)!;
    }

    return true;
  }
}

export class TrieNode {
  leaves: Map<string, TrieNode>;
  isWord: boolean;

  constructor() {
    this.leaves = new Map();
    this.isWord = false;
  }
}
