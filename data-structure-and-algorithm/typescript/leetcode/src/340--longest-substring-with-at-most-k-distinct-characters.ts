/*
Given a string, find the length of the longest substring T that contains at most k distinct characters.

Example 1:

Input: s = "eceba", k = 2
Output: 3
Explanation: T is "ece" which its length is 3.
Example 2:

Input: s = "aa", k = 1
Output: 2
Explanation: T is "aa" which its length is 2.
*/

function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
  const n = s.length;
  const cnts = Array(256).fill(0);
  let rslt = 0;
  let cnt = 0;
  for (let l = 0, r = 0; r < n; ++r) {
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
