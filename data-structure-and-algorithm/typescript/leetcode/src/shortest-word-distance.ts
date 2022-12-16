/*
243. Shortest Word Distance
Difficulty: Easy

Given a list of words and two words word1 and word2, return the shortest distance between these two words in the list.

For example,
Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

Given word1 = "coding", word2 = "practice", return 3.
Given word1 = "makes", word2 = "coding", return 1.

Note:
You may assume that word1 does not equal to word2, and word1 and word2 are both in the list.
*/

function shortestDistance(
  words: string[],
  word1: string,
  word2: string
): number {
  let result = Infinity;
  for (let i = 0, index1 = -1, index2 = -1; i < words.length; ++i) {
    if (words[i] === word1) {
      index1 = i;
    } else if (words[i] === word2) {
      index2 = i;
    }
    if (index1 !== -1 && index2 !== -1) {
      result = Math.min(result, Math.abs(index1 - index2));
    }
  }
  return result === Infinity ? -1 : result;
}
