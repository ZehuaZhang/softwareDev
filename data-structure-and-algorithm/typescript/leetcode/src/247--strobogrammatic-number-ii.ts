/*
247. Strobogrammatic Number II

A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Find all strobogrammatic numbers that are of length = n.

Example:

Input:  n = 2
Output: ["11","69","88","96"]
*/

function findStrobogrammatic(size: number): string[] {
  const pairMap = new Map<string, string>([
    ['0', '0'],
    ['1', '1'],
    ['8', '8'],
    ['6', '9'],
    ['9', '6'],
  ]);
  return dfs(size);

  function dfs(count: number): string[] {
    if (count === 0) {
      return [''];
    }
    if (count === 1) {
      return ['0', '1', '8'];
    }

    const rslt: string[] = [];
    for (const mid of dfs(count - 2)) {
      for (const [left, right] of pairMap) {
        if (count !== size || left !== '0') {
          rslt.push(left + mid + right);
        }
      }
    }
    return rslt;
  }
}
