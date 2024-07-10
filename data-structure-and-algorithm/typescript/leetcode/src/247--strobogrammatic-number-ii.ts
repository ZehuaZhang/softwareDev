/*
247. Strobogrammatic Number II

A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Find all strobogrammatic numbers that are of length = n.

Example:

Input:  n = 2
Output: ["11","69","88","96"]
*/

function findStrobogrammatic(size: number): string[] {
  const map = new Map([
    ['0', '0'],
    ['1', '1'],
    ['6', '9'],
    ['8', '8'],
    ['9', '6'],
  ]);

  return dfs(size);

  function dfs(cnt: number) {
    if (!cnt) {
      return [''];
    }

    if (cnt === 1) {
      return ['0', '1', '8'];
    }

    const rslt: string[] = [];
    for (const m of dfs(size - 2)) {
      for (const [l, r] of map) {
        if (l !== '0' || cnt !== size) {
          rslt.push(l + m + r);
        }
      }
    }

    return rslt;
  }
}