/*
Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.



Example 1:

Input: input = "(()"
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

import {Stack} from './data-structure/Stack';

function longestValidParentheses(input: string): number {
  let result = 0;
  const index = new Stack<number>();
  index.push(-1);
  for (let i = 0; i < input.length; ++i) {
    if (input[i] === '(') {
      index.push(i);
    } else {
      index.pop();
      if (index.size === 0) {
        index.push(i);
      } else {
        result = Math.max(result, i - index.peek());
      }
    }
  }
  return result;
}
