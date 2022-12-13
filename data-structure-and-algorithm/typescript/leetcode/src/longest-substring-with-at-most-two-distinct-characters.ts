/*
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

function lengthOfLongestSubstringTwoDistinct(input: string): number {
  const k = 2;
  const countList = Array(128).fill(0);
  let result = 0;
  for (let count = 0, left = 0, right = 0; right < input.length; ++right) {
    if (++countList[input[right].charCodeAt(0)] === 1) {
      ++count;
    }
    for (; count > k; ++left) {
      if (--countList[input[left].charCodeAt(0)] === 0) {
        --count;
      }
    }
    result = Math.max(result, right - left + 1);
  }
  return result;
}
