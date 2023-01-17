/*
318. Maximum Product of Word Lengths
Difficulty: Medium

Given a string array words, find the maximum value of length(word[i]) * length(word[j])
where the two words do not share common letters. You may assume that each word will contain only lower case letters.
If no such two words exist, return 0.

Example 1:
Given ["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]
Return 16
The two words can be "abcw", "xtfn".

Example 2:
Given ["a", "ab", "abc", "d", "cd", "bcd", "abcd"]
Return 4
The two words can be "ab", "cd".

Example 3:
Given ["a", "aa", "aaa", "aaaa"]
Return 0
No such pair of words.

Time:  O(nlogn) ~ O(n^2)
Space: O(n)
Sorting + Pruning + Bit Manipulation
*/

function maxProduct(words: string[]): number {
  words.sort((a, b) => b.length - a.length);
  const {length} = words;
  const bits = Array(length).fill(0);
  for (let i = 0; i < length; ++i) {
    for (const char of words[i]) {
      bits[i] |= 1 << (char.charCodeAt(0) - 'a'.charCodeAt(0));
    }
  }
  let result = 0;
  for (
    let i = 0;
    i + 1 < length && Math.pow(words[i].length, 2) > result;
    ++i
  ) {
    for (
      let j = i + 1;
      j < length && words[i].length * words[j].length > result;
      ++j
    ) {
      if ((bits[i] & bits[j]) === 0) {
        result = words[i].length * words[j].length;
      }
    }
  }
  return result;
}
