/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.


Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
Example 4:

Input: s = "([)]"
Output: false
Example 5:

Input: s = "{[]}"
Output: true


Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
*/

import {Stack} from './data-structure/Stack';

function isValidParenthesis(input: string): boolean {
  const left = '([{';
  const parenthesisMap = new Map<string, string>([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ]);
  const stack = new Stack<string>();
  for (const char of input) {
    if (left.includes(char)) {
      stack.push(char);
    } else if (parenthesisMap.get(char) !== stack.peek()) {
      return false;
    } else {
      stack.pop();
    }
  }

  return stack.isEmpty();
}
