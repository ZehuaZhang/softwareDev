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

function findAnagrams(s: string, p: string): number[] {
  const n = p.length;

  const cnts = Array(256).fill(0);
  for (const c of p) {
    ++cnts[c.charCodeAt(0)];
  }

  const rslt: number[] = [];
  let cnt = n;
  for (let l = 0, r = 0; r < s.length; ++r) {
    if (--cnts[s.charCodeAt(r)] >= 0) {
      --cnt;
    }

    if (!cnt) {
      rslt.push(l);
    }

    if (r - l + 1 === n) {
      if (++cnts[s.charCodeAt(l++)] >= 1) {
        ++cnt;
      }
    }
  }

  return rslt;
}
