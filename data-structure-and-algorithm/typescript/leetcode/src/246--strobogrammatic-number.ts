/*
246. Strobogrammatic Number

A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Write a function to determine if a number is strobogrammatic. The number is represented as a string.

Example 1:

Input:  "69"
Output: true
Example 2:

Input:  "88"
Output: true
Example 3:

Input:  "962"
Output: false

Note: Input length is greater than 1
*/

function isStrobogrammatic(num: string): boolean {
  const map = new Map([
    ['0', '0'],
    ['1', '1'],
    ['6', '9'],
    ['8', '8'],
    ['9', '6'],
  ]);

  const n = num.length;
  for (let i = 0; i <= n / 2; ++i) {
    if (!map.has(num[i]) || map.get(num[i]) !== num[n - 1 - i]) {
      return false;
    }
  }

  return true;
}