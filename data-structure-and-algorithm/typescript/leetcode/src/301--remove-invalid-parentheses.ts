/*
Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.

Return all the possible results. You may return the answer in any order.



Example 1:

Input: s = "()())()"
Output: ["(())()","()()()"]
Example 2:

Input: s = "(a)())()"
Output: ["(a())()","(a)()()"]
Example 3:

Input: s = ")("
Output: [""]


Constraints:

1 <= s.length <= 25
s consists of lowercase English letters and parentheses '(' and ')'.
There will be at most 20 parentheses in s.
*/

function removeInvalidParentheses(input: string): string[] {
  const result: string[] = [];
  removeInvalidParenthesesDfs(input, 0, 0, ['(', ')']);
  return result;

  function removeInvalidParenthesesDfs(
    input: string,
    i0: number,
    j0: number,
    pair: string[]
  ): void {
    let count = 0;
    for (let i = i0; i < input.length; ++i) {
      if (input[i] === pair[0]) {
        ++count;
      } else if (input[i] === pair[1]) {
        --count;
      }
      if (count < 0) {
        for (let j = j0; j <= i; ++j) {
          if (input[j] === pair[1] && (j === j0 || input[j] !== input[j - 1])) {
            removeInvalidParenthesesDfs(
              input.substring(0, j) + input.substring(j + 1),
              i,
              j,
              pair
            );
          }
        }
        return;
      }
    }
    const reversed = [...input].reverse().join('');
    if (pair[0] === '(') {
      removeInvalidParenthesesDfs(reversed, 0, 0, [')', '(']);
    } else {
      result.push(reversed);
    }
  }
}
