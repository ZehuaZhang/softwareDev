/*
A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Write a function to count the total strobogrammatic numbers that exist in the range of low <= num <= high.

Example:

Input: low = "50", high = "100"
Output: 3
Explanation: 69, 88, and 96 are three strobogrammatic numbers.
Note:
Because the range might be a large number, the low and high numbers are represented as string.
*/

let count;
function strobogrammaticInRange(low, high) {
  count = 0;
  for (const s of ['', '0', '1', '8']) {
    dfs(low, high, s);
  }
  return count;
}

function dfs(low, high, s) {
  if (
    Number(s) >= Number(low) &&
    Number(s) <= Number(high) &&
    Number(s).toString() === s
  ) {
    ++count;
  }
  if (s.length + 2 > high.length) {
    return;
  }
  for (const [left, right] of [
    ['0', '0'],
    ['1', '1'],
    ['8', '8'],
    ['6', '9'],
    ['9', '6'],
  ]) {
    dfs(low, high, left + s + right);
  }
}
