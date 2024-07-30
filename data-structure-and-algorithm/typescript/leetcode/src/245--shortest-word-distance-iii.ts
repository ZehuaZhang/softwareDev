/*
245. Shortest Word Distance III

This is a follow up of Shortest Word Distance. The only difference is now word1 could be the same as word2.

Given a list of words and two words word1 and word2, return the shortest distance between these two words in the list.

word1 and word2 may be the same and they represent two individual words in the list.

For example,
Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

Given word1 = “makes”, word2 = “coding”, return 1.
Given word1 = "makes", word2 = "makes", return 3.

Note:
You may assume word1 and word2 are both in the list.
*/

function shortestWordDistance(
  words: string[],
  word1: string,
  word2: string
): number {
  let rslt = Infinity;
  for (let i1 = -1, i2 = -1, i = 0; i < words.length; ++i) {
    const w = words[i];
    if (w === word1) {
      if (i1 !== -1 && w === word2) {
        rslt = Math.min(rslt, i - i1);
      }
      i1 = i;
    } else if (w === word2) {
      i2 = i;
    }
    if (i1 !== -1 && i2 !== -1) {
      rslt = Math.min(rslt, Math.abs(i2 - i1));
    }
  }

  return rslt;
}
