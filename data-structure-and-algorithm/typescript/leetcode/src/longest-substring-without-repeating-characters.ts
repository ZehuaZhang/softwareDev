/*
Given a string s, find the length of the longest substring without repeating characters.



Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
Example 4:

Input: s = ""
Output: 0


Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
*/

function lengthOfLongestSubstring(input: string): number {
  const indexMap = new Map<string, number>();
  let result = 0;
  let left = 0;
  for (let right = 0; right < input.length; ++right) {
    const prev = indexMap.get(input[right])!;
    if (indexMap.has(input[right]) && prev >= left) {
      left = prev + 1;
    }
    indexMap.set(input[right], right);
    result = Math.max(result, right - left + 1);
  }

  return result;
}
