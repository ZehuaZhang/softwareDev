// 5. Longest Palindromic Substring

// Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

// Example 1:

// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.
// Example 2:

// Input: "cbbd"
// Output: "bb"

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (!isString(s)) {
        throw "invalid input string"
    }
    
    let leftIndex = 0
    let rightIndex = 0
    let length = 0
    
    const isPalindrome = createArray(false, s.length, s.length)
    
    for (let i = 0; i < s.length; ++i) {
        for (let j = 0; j < i; ++j) {
            if ((s[j] === s[i]) &&
                (i - j < 2 || isPalindrome[j + 1][i - 1])) {
                isPalindrome[j][i] = true
            }
            
            if (isPalindrome[j][i] && length < i - j + 1) {
                leftIndex = j
                rightIndex = i
                length = i - j + 1
            }
        }
        isPalindrome[i][i] = true
    }
    
    return s.substring(leftIndex, rightIndex + 1)
};

function isString(item) {
    return typeof item === "string"
}

function createArray(value, ...dimensions) {
    if (dimensions.length === 1) {
        return Array(dimensions[0]).fill(value)
    }
    
    return Array.from(
        { length: dimensions[0] },
        element => createArray(value, ...dimensions.slice(1))
    )
}