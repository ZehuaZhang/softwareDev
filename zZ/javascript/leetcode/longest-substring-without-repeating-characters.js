// 3. Longest Substring Without Repeating Characters

// Given a string, find the length of the longest substring without repeating characters.

// Example 1:

// Input: "abcabcbb"
// Output: 3 
// Explanation: The answer is "abc", with the length of 3. 
// Example 2:

// Input: "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3. 
//              Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if (!isString(s)) {
        throw "invalid input of string"
    }
    
    const indexMap = {}
    
    let result = 0
    let leftIndex = 0
    s.split("").forEach((character, index) => {
        if (indexMap.hasOwnProperty(character) && 
            indexMap[character] >= leftIndex) {
            
            leftIndex = indexMap[character] + 1
        }
        indexMap[character] = index
        result = Math.max(result, index - leftIndex + 1)
    })

    return result
};

function isString(text) {
    return typeof text === 'string'
}