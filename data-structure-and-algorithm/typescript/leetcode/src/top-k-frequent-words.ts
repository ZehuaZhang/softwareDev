/*
Given a non-empty list of words, return the k most frequent elements.

Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.

Example 1:
Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
Output: ["i", "love"]
Explanation: "i" and "love" are the two most frequent words.
    Note that "i" comes before "love" due to a lower alphabetical order.
Example 2:
Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
Output: ["the", "is", "sunny", "day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
    with the number of occurrence being 4, 3, 2 and 1 respectively.
Note:
You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
Input words contain only lowercase letters.
Follow up:
Try to solve it in O(n log k) time and O(n) extra space.
*/

function topKFrequent(words: string[], kth: number): string[] {
  const countMap = new Map<string, number>();
  for (const word of words) {
    countMap.set(word, (countMap.get(word) || 0) + 1);
  }
  const bucket: string[][] = [...Array(words.length + 1)].map(() => []);
  for (const [word, count] of countMap.entries()) {
    bucket[count].push(word);
  }
  const result: string[] = [];
  for (let i = bucket.length - 1; i >= 1; --i) {
    for (let j = 0; j < bucket[i].length; ++j) {
      result.push(bucket[i][j]);
      if (result.length === kth) {
        return result;
      }
    }
  }
  return result.sort();
}
