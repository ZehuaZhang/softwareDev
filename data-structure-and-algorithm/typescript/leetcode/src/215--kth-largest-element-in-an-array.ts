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
  let l = 0,
    r = n - 1;
  while (l <= r) {
    const rI = l + Math.trunc(Math.random() * (r - l + 1));
    const pI = partition(rI);

    if (pI === k - 1) {
      return nums[pI];
    } else if (pI > k - 1) {
      r = pI - 1;
    } else {
      l = pI + 1;
    }
  }
  return nums[l];

  function partition(p: number) {
    swap(p, r);

    let i = l;
    let j = r - 1;
    while (i <= j) {
      while (nums[i] > nums[r]) {
        ++i;
      }
      while (nums[j] < nums[r]) {
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
    const tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
  }
}
