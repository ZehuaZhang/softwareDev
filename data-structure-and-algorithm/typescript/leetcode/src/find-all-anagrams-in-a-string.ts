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

function findAnagrams(s, p) {
  const result = [];
  const map = Array(256).fill(0);
  for (const c of p) {
    ++map[c.charCodeAt()];
  }
  for (let left = 0, right = 0, count = p.length; right < s.length; ++right) {
    console.log(count, right, s[right]);
    if (--map[s[right].charCodeAt()] >= 0) {
      --count;
    }
    if (!count) {
      result.push(left);
    }
    if (right - left + 1 === p.length) {
      if (++map[s[left].charCodeAt()] >= 1) {
        ++count;
      }
      ++left;
    }
  }
  return result;
}
