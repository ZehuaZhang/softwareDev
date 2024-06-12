/*
17. Letter Combinations of a Phone Number

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.


 

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

function letterCombinations(digits: string): string[] {
  const digitCharList = [
    '-',
    '',
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz',
  ];
  const result: string[] = [];
  dfs(0, '');
  return result.filter(Boolean);

  function dfs(idx: number, path: string) {
    if (idx === digits.length) {
      result.push(path);
      return;
    }
    const charList = digitCharList[digits.charCodeAt(idx) - '0'.charCodeAt(0)];
    for (const c of charList) {
      dfs(idx + 1, path + c);
    }
  }
}
