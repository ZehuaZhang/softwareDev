/*
Given an array of strings arr. String s is a concatenation of a sub-sequence of arr which have unique characters.

Return the maximum possible length of s.



Example 1:

Input: arr = ["un","iq","ue"]
Output: 4
Explanation: All possible concatenations are "","un","iq","ue","uniq" and "ique".
Maximum length is 4.
Example 2:

Input: arr = ["cha","r","act","ers"]
Output: 6
Explanation: Possible solutions are "chaers" and "acters".
Example 3:

Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
Output: 26


Constraints:

1 <= arr.length <= 16
1 <= arr[i].length <= 26
arr[i] contains only lower case English letters.
*/

function maxLength(inputList: string[]): number {
  const cache = new Map<string, number>();
  return maxLengthDfs('', 0);

  function maxLengthDfs(path: string, start: number): number {
    if (cache.has(path)) {
      return cache.get(path)!;
    }

    const letterSet = new Set<string>();
    for (const char of path) {
      if (letterSet.has(char)) {
        cache.set(path, 0);
        return 0;
      }
      letterSet.add(char);
    }
    let max = path.length;
    for (let i = start; i < inputList.length; ++i) {
      max = Math.max(max, maxLengthDfs(path + inputList[i], i + 1));
    }
    cache.set(path, max);
    return cache.get(path)!;
  }
}

function maxLength_BitCount(inputList: string[]): number {
  const dp = [0];
  let result = 0;
  for (const input of inputList) {
    let a = 0;
    let dup = 0;
    for (const char of input) {
      const bit = 1 << (char.charCodeAt(0) - 'a'.charCodeAt(0));
      dup |= a & bit;
      a |= bit;
    }
    if (dup > 0) {
      continue;
    }
    for (let i = dp.length - 1; i >= 0; --i) {
      if (dp[i] & a) {
        continue;
      }
      const bitset = dp[i] | a;
      dp.push(bitset);
      result = Math.max(result, bitCount(bitset));
    }
  }
  return result;

  function bitCount(n: number) {
    return n.toString(2).match(/1/g)!.length;
  }
}
