// 244. Shortest Word Distance II
// Difficulty : Medium

// This is a follow up of Shortest Word Distance. The only difference is now you are given the list of words
// and your method will be called repeatedly many times with different parameters. How would you optimize it?

// Design a class which receives a list of words in the constructor, and implements a method that takes two words word1
// and word2 and return the shortest distance between these two words in the list.

// For example,
// Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

// Given word1 = “coding”, word2 = “practice”, return 3.
// Given word1 = "makes", word2 = "coding", return 1.

// Note:
// You may assume that word1 does not equal to word2, and word1 and word2 are both in the list.

// Time:  ctor: O(n), shortest: O(a + b), a, b is occurences of word1, word2
// Space: O(n)

class WordDistance {
  wordIndexListMap: Map<string, number[]>;
  constructor(wordList: string[]) {
    this.wordIndexListMap = new Map<string, number[]>();
    for (let i = 0; i < wordList.length; ++i) {
      const word = wordList[i];
      if (!this.wordIndexListMap.has(word)) {
        this.wordIndexListMap.set(word, []);
      }
      this.wordIndexListMap.get(word)!.push(i);
    }
  }

  shortest(word1: string, word2: string): number {
    const indexList1 = this.wordIndexListMap.get(word1) || [];
    const indexList2 = this.wordIndexListMap.get(word2) || [];

    let result = Infinity;
    for (
      let index1 = 0, index2 = 0;
      index1 < indexList1.length && index2 < indexList2.length;

    ) {
      result = Math.min(result, Math.abs(index1 - index2));

      if (index1 < index2) {
        ++index1;
      } else {
        ++index2;
      }
    }

    return result === Infinity ? -1 : result;
  }
}
