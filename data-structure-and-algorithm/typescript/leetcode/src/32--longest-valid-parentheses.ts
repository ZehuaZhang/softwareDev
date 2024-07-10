/*
32. Longest Valid Parentheses

Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses 
substring
.

 

Example 1:

Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
Example 2:

Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
Example 3:

Input: s = ""
Output: 0
 

Constraints:

0 <= s.length <= 3 * 104
s[i] is '(', or ')'.
*/

function longestValidParentheses(s: string): number {
  const idx: number[] = [-1];
  let rslt = 0;

  for (let i = 0; i < s.length; ++i) {
      if (s[i] === '(') {
          idx.push(i);
      } else {
          idx.pop();
          if (!idx.length) {
              idx.push(i);
          } else {
              rslt = Math.max(rslt, i - idx[idx.length - 1]);
          }
      }
  }

  return rslt;
};
