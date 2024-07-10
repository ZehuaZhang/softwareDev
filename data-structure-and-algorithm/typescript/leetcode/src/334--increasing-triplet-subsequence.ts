/*
334. Increasing Triplet Subsequence

Given an unsorted array return whether an increasing subsequence of length 3 exists or not in the array.

Formally the function should:

Return true if there exists  i, j, k
such that  arr[i]  <  arr[j]  <  arr[k]  given 0 ≤  i  <  j  <  k  ≤  n -1 else return false.

 

Your algorithm should run in O( n ) time complexity and O( 1 ) space complexity.

Examples:
Given [1, 2, 3, 4, 5],
return true.

Given [5, 4, 3, 2, 1],
return false.
*/

function increasingTriplet(nums: number[]): boolean {
  const rslt: number[] = [];
  for (const n of nums) {
      const i = gtEq(n);
      if (i === rslt.length) {
          rslt.push(n);
      } else {
          rslt[i] = n;
      }
  }

  return rslt.length >= 3;

  function gtEq(tgt: number) {
      let [l, r] = [0, rslt.length - 1];
      for (; l <= r;) {
          const m = l + Math.trunc((r - l) / 2);
          if (rslt[m] >= tgt) {
              r = m - 1;
          } else {
              l = m + 1;
          }
      }

      return l;
  }
};
