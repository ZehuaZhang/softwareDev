// 22. Generate Parentheses

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// For example, given n = 3, a solution set is:

// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    if (!isNumber(n)) {
        throw "invalid input type"
    }
    
    if (n === 0) {
        return [""]
    }
    
    if (n === 1) {
        return ["()"]
    }
    
    const result = []
    for (let i = 0; i < n; ++i) {
        for (const inner of generateParenthesis(i)) {
            for (const outer of generateParenthesis(n - 1 - i)) {
                result.push(`(${inner})${outer}`)
            }
        }
    }
    
    return result
};

function isNumber(item) {
    return typeof item === 'number'
}