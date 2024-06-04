/*
Given an unsorted array nums, reorder it in-place such that nums[0] <= nums[1] >= nums[2] <= nums[3]....

Example:

Input: nums = [3,5,2,1,6,4]
Output: One possible answer is [3,5,1,6,2,4]
*/

function wiggleSort(nums: number[]): void {
  for (let i = 1; i < nums.length; ++i) {
    if (
      (i % 2 && nums[i] > nums[i - 1]) ||
      (!(i % 2) && nums[i] < nums[i - 1])
    ) {
      swap(i, i - 1);
    }
  }

  function swap(i: number, j: number): void {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
}
