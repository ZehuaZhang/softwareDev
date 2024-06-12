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

function findLadders(
  beginWord: string,
  endWord: string,
  wordList: string[]
): string[][] {
  const set = new Set<string>(wordList);
  if (!set.has(endWord)) {
    return [];
  }
  const q: string[] = [beginWord];
  const nodes: string[][] = [];
  let found = false;
  while (q.length && !found) {
    nodes.push([...q]);
    for (let len = q.length; len && !found; --len) {
      const w = q.shift();
      for (const word of set) {
        if (isConnected(w, word)) {
          if (word === endWord) {
            found = true;
            break;
          }
          q.push(word);
          set.delete(word);
        }
      }
    }
  }

  if (!found) {
    return [];
  }

  const result: string[][] = [[endWord]];
  for (let lvl = nodes.length - 1; lvl >= 0; --lvl) {
    const len = result.length;
    for (let i = 0; i < len; ++i) {
      const list = result.shift();
      const last = list[0];
      for (const word of nodes[lvl]) {
        if (isConnected(last, word)) {
          result.push([word, ...list]);
        }
      }
    }
  }

  return result;

  function isConnected(a: string, b: string) {
    let cnt = 0;
    for (let i = 0; i < a.length && cnt < 2; ++i) {
      if (a[i] !== b[i]) {
        ++cnt;
      }
    }
    return cnt === 1;
  }
}
