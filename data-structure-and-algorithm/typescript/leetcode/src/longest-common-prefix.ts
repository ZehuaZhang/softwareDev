/*
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
strs[i] consists of only lower-case English letters.
*/

function longestCommonPrefix(inputList: string[]): string {
  let result = '';

  for (let j = 0; j < inputList[0].length; ++j) {
    for (let i = 1; i < inputList.length; ++i) {
      if (inputList[i][j] !== inputList[0][j]) {
        return result;
      }
    }
    result += inputList[0][j];
  }

  return result;
}
