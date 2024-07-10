/*
159. Longest Substring with At Most Two Distinct Characters
Given a string s , find the length of the longest substring t  that contains at most 2 distinct characters.

Example 1:

Input: "eceba"
Output: 3
Explanation: t is "ece" which its length is 3.
Example 2:

Input: "ccaabbb"
Output: 5
Explanation: t is "aabbb" which its length is 5.
*/

function lengthOfLongestSubstringTwoDistinct(s: string): number {
  const k = 2;
  const cnts = Array(256).fill(0);
  let cnt = 0;
  let rslt = 0;
  for (let l = 0, r = 0; r < s.length; ++r) {
    if (++cnts[s.charCodeAt(r)] === 1) {
      ++cnt;
    }

    for (; cnt > k; ++l) {
      if (--cnts[s.charCodeAt(l)] === 0) {
        --cnt;
      }
    }

    rslt = Math.max(rslt, r - l + 1);
  }

  return rslt;
}