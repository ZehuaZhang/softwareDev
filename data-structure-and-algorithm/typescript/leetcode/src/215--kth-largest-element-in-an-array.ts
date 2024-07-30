/*
215. Kth Largest Element in an Array

Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

 

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
 

Constraints:

1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104
*/

function findKthLargest(nums: number[], k: number): number {
  const n = nums.length;
  let [l, r] = [0, n - 1];
  for (; l <= r; ) {
    const ri = l + Math.trunc(Math.random() * (r - l + 1));
    const mi = partition(ri);
    if (mi === k - 1) {
      return nums[mi];
    } else if (mi > k - 1) {
      r = mi - 1;
    } else {
      l = mi + 1;
    }
  }

  return nums[l];

  function partition(pi: number) {
    swap(pi, r);
    const p = nums[r];

    let [i, j] = [l, r - 1];
    while (i <= j) {
      while (i <= j && nums[i] > p) {
        ++i;
      }
      while (i <= j && nums[j] < p) {
        --j;
      }
      if (i <= j) {
        swap(i, j);
        ++i;
        --j;
      }
    }

    swap(i, r);
    return i;
  }

  function swap(i: number, j: number) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
}
