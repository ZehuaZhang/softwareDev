/*
127. Word Ladder

A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

 

Example 1:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
Example 2:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
 

Constraints:

1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.
*/

function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const set = new Set(wordList);

  if (!set.has(endWord)) {
      return 0;
  }

  const q: string[] = [beginWord];
  let rslt = 1;

  while (q.length) {
      for (let l = q.length; l; --l) {
          const w = q.shift();
          for (const word of set) {
              if (isOneCharDiff(w, word)) {
                  if (word === endWord) {
                      return ++rslt;
                  }
                  q.push(word);
                  set.delete(word);
              }
          }
      }
      ++rslt;
  }

  return 0;

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
