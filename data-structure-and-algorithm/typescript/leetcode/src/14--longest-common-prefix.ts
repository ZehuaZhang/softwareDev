/*
14. Longest Common Prefix

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

 

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.
*/

function longestCommonPrefix(strs: string[]): string {
  let result = '';
  strs.sort();
  const first = strs[0];
  const last = strs[strs.length - 1];
  for (let i = 0; i < first.length; ++i) {
    if (first[i] !== last[i]) {
      return result;
    }
    result += first[i];
  }

  return result;
}
