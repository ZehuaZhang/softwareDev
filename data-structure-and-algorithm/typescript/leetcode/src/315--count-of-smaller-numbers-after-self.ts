/*
315. Count of Smaller Numbers After Self

You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].



Example 1:

Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.
Example 2:

Input: nums = [-1]
Output: [0]
Example 3:

Input: nums = [-1,-1]
Output: [0,0]


Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
*/

function countSmaller(nums: number[]): number[] {
  const n = nums.length;
  const ni: [number, number][] = [];
  for (let i = 0; i < n; ++i) {
    ni.push([nums[i], i]);
  }

  const rslt = Array(n).fill(0);
  mergeSort(0, n - 1);

  return rslt;

  function mergeSort(l: number, r: number) {
    if (r <= l) {
      return;
    }

    const m = l + Math.trunc((r - l) / 2);
    mergeSort(l, m);
    mergeSort(m + 1, r);

    const t: [number, number][] = [];

    for (let i = l, j = m + 1; i <= m; ++i) {
      for (; j <= r && ni[j][0] < ni[i][0]; ++j) {
        t.push(ni[j]);
      }
      t.push(ni[i]);
      rslt[ni[i][1]] += j - (m + 1);
    }

    ni.splice(l, t.length, ...t);
  }
}
