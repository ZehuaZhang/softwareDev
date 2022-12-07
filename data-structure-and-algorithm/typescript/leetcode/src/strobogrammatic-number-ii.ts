/*
A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Find all strobogrammatic numbers that are of length = n.

Example:

Input:  n = 2
Output: ["11","69","88","96"]
*/

function findStrobogrammatic(n) {
  const map = new Map([
    ['0', '0'],
    ['1', '1'],
    ['8', '8'],
    ['6', '9'],
    ['9', '6'],
  ]);
  return dfs(n, n);
}

function dfs(n, k) {
  if (!k) {
    return [''];
  }
  if (k === 1) {
    return ['0', '1', '8'];
  }

  const path = [];
  for (const mid of dfs(n, k - 2)) {
    for (const [left, right] of map) {
      if (k !== n || left !== '0') {
        result.push(left + num + right);
      }
    }
  }
  return result;
}
