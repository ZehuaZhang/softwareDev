/*
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.



Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4


Constraints:

1 <= k <= nums.length <= 104
-104 <= nums[i] <= 104
*/

function findKthLargest(nums: number[], kth: number): number {
  return findKth((nums, a, b) => nums[b] - nums[a]);

  function findKth(
    compare: (nums: number[], a: number, b: number) => number
  ): number {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      const randomIndex = left + Math.trunc(Math.random() * (right - left + 1));
      const partitionIndex = partition(nums, left, right, randomIndex);

      if (partitionIndex === kth - 1) {
        return nums[kth - 1];
      } else if (partitionIndex > kth - 1) {
        right = partitionIndex - 1;
      } else {
        left = partitionIndex + 1;
      }
    }

    return nums[left];

    function partition(
      items: number[],
      left: number,
      right: number,
      pivotIndex: number
    ): number {
      swap(items, right, pivotIndex);

      let nextPivotIndex = left;
      for (let index = left; index < right; ++index) {
        if (compare(items, index, right) < 0) {
          swap(items, nextPivotIndex++, index);
        }
      }

      swap(items, nextPivotIndex, right);
      return nextPivotIndex;
    }

    function swap(items: number[], i: number, j: number): void {
      const temp = items[i];
      items[i] = items[j];
      items[j] = temp;
    }
  }
}
