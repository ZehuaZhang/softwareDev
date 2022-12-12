/*
Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.



Example 1:

Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
Example 2:

Input: s = "abab", p = "ab"
Output: [0,1,2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".


Constraints:

1 <= s.length, p.length <= 3 * 104
s and p consist of lowercase English letters.
*/

function findAnagrams(string: string, anagram: string): number[] {
  const result: number[] = [];
  const charCountList = Array(256).fill(0);
  for (const char of anagram) {
    ++charCountList[char.charCodeAt(0)];
  }
  for (
    let left = 0, right = 0, count = anagram.length;
    right < string.length;
    ++right
  ) {
    if (--charCountList[string[right].charCodeAt(0)] >= 0) {
      --count;
    }
    if (!count) {
      result.push(left);
    }
    if (right - left + 1 === anagram.length) {
      if (++charCountList[string[left].charCodeAt(0)] >= 1) {
        ++count;
      }
      ++left;
    }
  }
  return result;
}
