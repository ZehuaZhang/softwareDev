/*
301. Remove Invalid Parentheses

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

function removeInvalidParentheses(s: string): string[] {
  const rslt: string[] = [];
  dfs(s, 0, 0, ["(", ")"]);

  return rslt;

  function dfs(ss: string, i0: number, j0: number, pr: [string, string]) {
    let cnt = 0;
    for (let i = i0; i < ss.length; ++i) {
      if (ss[i] === pr[0]) {
        ++cnt;
      } else if (ss[i] === pr[1]) {
        --cnt;
      }

      if (cnt < 0) {
        for (let j = j0; j <= i; ++j) {
          if (ss[j] === pr[1] && (j === j0 || ss[j] !== ss[j - 1])) {
            dfs(ss.substring(0, j) + ss.substring(j + 1), i, j, pr);
          }
        }
        return;
      }
    }

    const rs = [...ss].reverse().join("");
    if (pr[0] === "(") {
      return dfs(rs, 0, 0, [")", "("]);
    }
    return rslt.push(rs);
  }
}
