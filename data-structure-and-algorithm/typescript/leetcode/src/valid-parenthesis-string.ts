/*
Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".


Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "(*)"
Output: true
Example 3:

Input: s = "(*))"
Output: true


Constraints:

1 <= s.length <= 100
s[i] is '(', ')' or '*'.
*/

function checkValidString(input: string): boolean {
  // count of "(" when "*" is considered ")" and "("
  let [left, right] = [0, 0];
  for (const char of input) {
    if (char === '(') {
      ++left;
      ++right;
    } else {
      if (left > 0) {
        --left;
      }
      if (char === ')') {
        --right;
      } else {
        ++right;
      }
    }
    if (right < 0) {
      return false;
    }
  }
  return left === 0;
}
