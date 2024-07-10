/*
126. Word Ladder II

A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words [beginWord, s1, s2, ..., sk].

 

Example 1:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Explanation: There are 2 shortest transformation sequences:
"hit" -> "hot" -> "dot" -> "dog" -> "cog"
"hit" -> "hot" -> "lot" -> "log" -> "cog"
Example 2:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
 

Constraints:

1 <= beginWord.length <= 5
endWord.length == beginWord.length
1 <= wordList.length <= 500
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.
The sum of all shortest transformation sequences does not exceed 105.
*/

function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
  const set = new Set(wordList);
  const q: string[] = [beginWord];
  const rslt: string[][] = [];
  if (!set.has(endWord)) {
      return rslt;
  }

  let fnd = false;
  const lvls: string[][] = [];
  while (q.length && !fnd) {
      lvls.push([...q]);
      for (let l = q.length; l && !fnd; --l) {
          const w = q.shift();
          for (const word of set) {
              if (isOneCharDiff(w, word)) {
                  if (word === endWord) {
                      fnd = true;
                      break;
                  } else {
                      q.push(word);
                      set.delete(word);
                  }
              }
          }
      }
  }

  if (!fnd) {
      return rslt;
  }

  rslt.push([endWord]);

  for (let i = lvls.length - 1; i >= 0; --i) {
      const l = rslt.length;
      for (let j = 0; j < l; ++j) {
          const list = rslt.shift();
          const w = list[0];
          for (const word of lvls[i]) {
              if (isOneCharDiff(w, word)) {
                  rslt.push([word, ...list]);
              }
          }
      }
  }

  return rslt;

  function isOneCharDiff(a: string, b: string) {
      let cnt = 0;
      for (let i = 0; i < a.length && cnt < 2; ++i) {
          if (a[i] !== b[i]) {
              ++cnt;
          }
      }

      return cnt === 1;
  }
};
