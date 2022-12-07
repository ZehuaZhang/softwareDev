/*
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.



 

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]
 

Constraints:

0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].
*/

/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
    const map = ['_', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    const result = [];
    letterCombinationsDFS(digits, map, 0, '', result);
    return result.filter(Boolean);
}

function letterCombinationsDFS(digits, map, index, path, result) {
    if (index === digits.length) {
        result.push(path);
        return;
    }

    for (const c of map[digits[index] - '0']) {
        letterCombinationsDFS(digits, map, index + 1, path + c, result);
    }
}