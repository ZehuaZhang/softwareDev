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

function lengthOfLongestSubstringKDistinct(s, k) {
  const map = Array(128).fill(0);
  let result = 0;
  for (let count = 0, left = 0, i = 0; i < s.length; ++i) {
    if (++map[s[i].charCodeAt()] === 1) {
      ++count;
    }
    for (; count > k; ++left) {
      if (--map[s[left].charCodeAt()] === 0) {
        --count;
      }
    }
    result = Math.max(result, i - left + 1);
  }
  return result;
}
