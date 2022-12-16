/*
30. Substring with Concatenation of All Words

You are given a string, s, and a list of words, words, that are all of the same length. Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.

Example 1:

Input:
  s = "barfoothefoobarman",
  words = ["foo","bar"]
Output: [0,9]
Explanation: Substrings starting at index 0 and 9 are "barfoo" and "foobar" respectively.
The output order does not matter, returning [9,0] is fine too.
Example 2:

Input:
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
Output: []
*/

function findSubstringWithWords(input: string, words: string[]): number[] {
  const countMap = new Map<string, number>();
  for (const word of words) {
    countMap.set(word, (countMap.get(word) || 0) + 1);
  }

  const length = words[0].length;

  const result = [];
  for (let i = length; i <= input.length; ++i) {
    const word = input.substring(i - length, i);
    if (countMap.has(word)) {
      const countMapCopy = new Map<string, number>(countMap.entries());

      for (let j = i; j <= input.length; j += length) {
        const word = input.substring(j - length, j);

        if (countMapCopy.has(word)) {
          countMapCopy.set(word, countMapCopy.get(word)! - 1);
        } else {
          break;
        }

        if (countMapCopy.get(word) === 0) {
          countMapCopy.delete(word);
        }
      }

      if (countMapCopy.size === 0) {
        result.push(i - length);
      }
    }
  }

  return result;
}
