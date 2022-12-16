/*
Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....

You may assume the input array always has a valid answer.



Example 1:

Input: nums = [1,5,1,1,6,4]
Output: [1,6,1,5,1,4]
Explanation: [1,4,1,5,1,6] is also accepted.
Example 2:

Input: nums = [1,3,2,2,3,1]
Output: [2,3,1,3,1,2]


Constraints:

1 <= nums.length <= 5 * 104
0 <= nums[i] <= 5000
It is guaranteed that there will be an answer for the given input nums.


Follow Up: Can you do it in O(n) time and/or in-place with O(1) extra space?
*/

import {findKth} from './algorithm/bound';

function wiggleSortII(nums: number[]): void {
  const mid = (nums.length + 1) >> 1;
  const median = findKth(nums, mid, (a, b) => a - b);

  for (let left = 0, right = nums.length - 1, i = 0; i <= right; ) {
    if (nums[index(i)] > median) {
      swap(index(i++), index(left++));
    } else if (nums[index(i)] < median) {
      swap(index(i), index(right--));
    } else {
      i++;
    }
  }

  function swap(i: number, j: number): void {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }

  function index(i: number): number {
    return (2 * i + 1) % (nums.length | 1);
  }
}
