// 10. Regular Expression Matching

// Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.

// '.' Matches any single character.
// '*' Matches zero or more of the preceding element.
// The matching should cover the entire input string (not partial).

// Note:

// s could be empty and contains only lowercase letters a-z.
// p could be empty and contains only lowercase letters a-z, and characters like . or *.
// Example 1:

// Input:
// s = "aa"
// p = "a"
// Output: false
// Explanation: "a" does not match the entire string "aa".
// Example 2:

// Input:
// s = "aa"
// p = "a*"
// Output: true
// Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
// Example 3:

// Input:
// s = "ab"
// p = ".*"
// Output: true
// Explanation: ".*" means "zero or more (*) of any character (.)".
// Example 4:

// Input:
// s = "aab"
// p = "c*a*b"
// Output: true
// Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore, it matches "aab".
// Example 5:

// Input:
// s = "mississippi"
// p = "mis*is*p*."
// Output: false

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
let memory

var isMatch = function(s, p) {
    if (!isString(s) || !isString(p)) {
        throw "invalid input value"
    }
    
    return isMatchHelper(s, p, 0, 0)
}

function isString(item) {
    return typeof item === 'string'
}


function isMatchHelper(s, p, i, j) {
    if (j === p.length) {
        return i === s.length
    }
    
    if (p[j + 1] !== '*') {
        if (s[i] === p[j] || (p[j] === '.' && i !== s.length)) {
            return isMatchHelper(s, p, i + 1, j + 1)
        }
        return false
    }
    while (s[i] === p[j] || (p[j] === '.' && i !== s.length)) {
        if (isMatchHelper(s, p, i, j + 2)) {
            return true
        }
        ++i
    }
    return isMatchHelper(s, p, i, j + 2)
}