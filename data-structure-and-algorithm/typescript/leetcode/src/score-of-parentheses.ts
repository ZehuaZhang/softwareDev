/*
Given a balanced parentheses string s, compute the score of the string based on the following rule:

() has score 1
AB has score A + B, where A and B are balanced parentheses strings.
(A) has score 2 * A, where A is a balanced parentheses string.


Example 1:

Input: s = "()"
Output: 1
Example 2:

Input: s = "(())"
Output: 2
Example 3:

Input: s = "()()"
Output: 2
Example 4:

Input: s = "(()(()))"
Output: 6


Note:

s is a balanced parentheses string, containing only ( and ).
2 <= s.length <= 50
*/

function scoreOfParentheses(s) {
  let result = 0,
    cnt = 0;
  for (let i = 0; i < s.length; ++i) {
    if (s[i] === '(') {
      ++cnt;
    } else {
      --cnt;
    }
    if (s[i] === ')' && s[i - 1] === '(') {
      result += Math.pow(2, cnt);
    }
  }
  return result;
}
