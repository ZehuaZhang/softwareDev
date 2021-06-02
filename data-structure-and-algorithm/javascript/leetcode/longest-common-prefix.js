// 14. Longest Common Prefix

// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:

// Input: ["flower","flow","flight"]
// Output: "fl"
// Example 2:

// Input: ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.
// Note:

// All given inputs are in lowercase letters a-z.

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (!isArray(strs)) {
        throw "invalid input array"
    }
    
    let result = ""
    if (strs.length === 0) {
        return result
    }
    
    for (let j = 0; j < strs[0].length; ++j) {
        for (let i = 1; i < strs.length; ++i) {
            if (strs[i][j] !== strs[0][j]) {
                return result
            }
        }
        result += strs[0][j]
    }
    
    return result
};

function isArray(item) {
    return Array.isArray(item)
}