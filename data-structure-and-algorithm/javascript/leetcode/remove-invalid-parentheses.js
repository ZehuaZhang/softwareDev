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

function removeInvalidParentheses(s) {
    const result = [];
    dfs(s, 0, 0, ['(', ')'], result);
    return result;   
}

function dfs(s, i0, j0, pair, result) {
    let cnt = 0;
    for (let i = i0; i < s.length; ++i) {
        if (s[i] === pair[0]) {
            ++cnt;
        } else if (s[i] === pair[1]) {
            --cnt;
        }
        if (cnt < 0) {
            for (let j = j0; j <= i; ++j) {
                if (s[j] === pair[1] && (j === j0 || s[j] !== s[j - 1])) {
                    dfs(s.substring(0, j) + s.substring(j + 1), i, j, pair, result);
                }
            }
            return;
        }
    }
    const rs = [...s].reverse().join("");
    if (pair[0] === "(") {
        dfs(rs, 0, 0, [")", "("], result);
    } else {
        result.push(rs);
    }
}