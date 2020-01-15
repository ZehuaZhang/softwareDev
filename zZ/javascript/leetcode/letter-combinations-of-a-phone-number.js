// 17. Letter Combinations of a Phone Number

// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.

// A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

// Example:

// Input: "23"
// Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
// Note:

// Although the above answer is in lexicographical order, your answer could be in any order you want.

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!isString(digits)) {
        throw "invalid input string"
    }
    
    const digitToLetterMap = [
        ' ', '', 'abc', 'def', 'ghi', 'jkl', 'mno',
        'pqrs', 'tuv', 'wxyz'
    ]
    
    const result = []
    
    if (digits.length === 0) {
        return result
    }
    
    letterCombinationsHelper(digits, digitToLetterMap, 0, "", result)
    
    return result
};

function letterCombinationsHelper(digits, digitToLetterMap, index, resultEntry, result) {
    if (index === digits.length) {
        result.push(resultEntry)
        return
    }
    
    for (const letter of digitToLetterMap[digits[index] - '0']) {
        resultEntry += letter
        letterCombinationsHelper(digits, digitToLetterMap, index + 1, resultEntry, result)
        resultEntry = resultEntry.substring(0, resultEntry.length - 1)
    }
}

function isString(item) {
    return typeof item === 'string'
}