/*
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
*/

function isStrobogrammatic(num: string): boolean {
  const pairMap = new Map<string, string>([
    ['0', '0'],
    ['1', '1'],
    ['8', '8'],
    ['6', '9'],
    ['9', '6'],
  ]);
  for (let i = 0; i <= num.length / 2; ++i) {
    if (
      !pairMap.has(num[i]) ||
      pairMap.get(num[i]) !== num[num.length - 1 - i]
    ) {
      return false;
    }
  }
  return true;
}
