/**
Additive number is a string whose digits can form additive sequence.

A valid additive sequence should contain at least three numbers. Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.

Given a string containing only digits '0'-'9', write a function to determine if it's an additive number.

Note: Numbers in the additive sequence cannot have leading zeros, so sequence 1, 2, 03 or 1, 02, 3 is invalid.



Example 1:

Input: "112358"
Output: true
Explanation: The digits can form an additive sequence: 1, 1, 2, 3, 5, 8.
             1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
Example 2:

Input: "199100199"
Output: true
Explanation: The additive sequence is: 1, 99, 100, 199.
             1 + 99 = 100, 99 + 100 = 199


Constraints:

num consists only of digits '0'-'9'.
1 <= num.length <= 35
Follow up:
How would you handle overflow for very large input integers?
*/

import {runTestCaseList} from './util/test';

function isAdditiveNumber(num: string): boolean {
  for (let i = 1; i < num.length; ++i) {
    for (let j = i + 1; j < num.length; ++j) {
      for (
        let s1 = num.substring(0, i),
          s2 = num.substring(i, j),
          s3 = add(s1, s2),
          curr = s1 + s2 + s3;
        isValid(s1) && isValid(s2) && curr.length <= num.length;
        s1 = s2, s2 = s3, s3 = add(s1, s2), curr += s3
      ) {
        if (curr === num) {
          return true;
        }
      }
    }
  }
  return false;
}

function isValid(num: string): boolean {
  return num.length === 1 || num[0] !== '0';
}

function add(s1: string, s2: string): string {
  let carry = 0;
  const result = [];
  for (let i = 1; i <= Math.max(s1.length, s2.length) || carry; ++i) {
    const a = i <= s1.length ? Number(s1[s1.length - i]) : 0;
    const b = i <= s2.length ? Number(s2[s2.length - i]) : 0;
    const sum = a + b + carry;
    carry = Math.trunc(sum / 10);
    result.push(sum % 10);
  }

  return [...result].reverse().join('');
}

// tests

const testInputListCollection = [['112358'], ['199100199'], ['199001200']];

const expectedResultList = [true, true, false];

runTestCaseList(testInputListCollection, expectedResultList, isAdditiveNumber);

export {};
