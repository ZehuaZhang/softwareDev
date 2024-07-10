/*
248. Strobogrammatic Number III

A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Write a function to count the total strobogrammatic numbers that exist in the range of low <= num <= high.

Example:

Input: low = "50", high = "100"
Output: 3
Explanation: 69, 88, and 96 are three strobogrammatic numbers.
Note:
Because the range might be a large number, the low and high numbers are represented as string.
*/

function strobogrammaticInRange(low: string, high: string): number {
  let rslt = 0;

  for (const m of ['', '0', '1', '8']) {
    dfs(m);
  }

  return rslt;

  function dfs(m: string) {
    if (Number(m) >= Number(low) && Number(m) <= Number(high) && String(Number(m)) === m) {
      ++rslt;
    }

    if (m.length + 2 > high.length || Number(m) >= Number(high)) {
      return;
    }

    for (const [l, r] of [
      ['0', '0'],
      ['1', '1'],
      ['8', '8'],
      ['6', '9'],
      ['9', '6']
    ]) {
      dfs(l + m + r);
    }
  }
}